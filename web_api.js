const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Groq = require('groq-sdk');
const OpenAI = require('openai');

const { generateQuiz, generateAnnualSubjectQuiz, SUBJECT_EXAMS } = require('./quiz_generator.js');
const { generateCertificateCard, generateCertificateHTML, getGradeTitle } = require('./certificate_generator.js');
const { redeemLicenseKey, getUserLicenseInfo } = require('./license_manager.js');
const irregularVerbs = require('./irregular_verbs.js');

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + '_studyai_secret_salt_2026').digest('hex');
}

/**
 * Creates the Express Web API Router
 */
function createWebAPIRouter({ db, curriculum, bot, SUPER_ADMIN_IDS, checkVIP, checkYearlyVIP, getNextGroqKey, getNextGeminiKey }) {
  const router = express.Router();

  // In-memory quiz sessions: { quizSessionId: { questions, correctAnswers, createdAt } }
  const activeQuizSessions = new Map();

  // Periodic cleanup of quiz sessions older than 2 hours
  setInterval(() => {
    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
    for (const [id, s] of activeQuizSessions.entries()) {
      if (s.createdAt < twoHoursAgo) activeQuizSessions.delete(id);
    }
  }, 30 * 60 * 1000);

  // Helper: AI Text Generator for Web Chat
  async function generateAIAnswer(userText, context = {}) {
    // 1. Try Groq (Fastest)
    if (typeof getNextGroqKey === 'function') {
      const groqKey = getNextGroqKey();
      if (groqKey) {
        try {
          const groq = new Groq({ apiKey: groqKey });
          const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
              {
                role: 'system',
                content: `You are Teacher Sorn (គ្រូសន), an expert English teacher at Teacher SSOnline English Institute (វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline).
You speak Khmer and English fluently.
Explain concepts clearly in Khmer and provide practical English examples.
Current lesson context: ${context.lessonTitle || 'General English'}.
Keep responses helpful, concise, well-formatted, and encouraging. Always refer to yourself as គ្រូសន (Teacher Sorn).`
              },
              { role: 'user', content: userText }
            ],
            temperature: 0.6,
            max_tokens: 800
          });
          if (completion.choices?.[0]?.message?.content) {
            return completion.choices[0].message.content;
          }
        } catch (err) {
          console.warn('Web API Groq error:', err.message);
        }
      }
    }

    // 2. Try Gemini
    if (typeof getNextGeminiKey === 'function') {
      const geminiKey = getNextGeminiKey();
      if (geminiKey) {
        try {
          const genAI = new GoogleGenerativeAI(geminiKey);
          const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
          const prompt = `You are Teacher Sorn (គ្រូសន), English teacher at Teacher SSOnline Institute.
Explain clearly in Khmer with English examples. Current lesson: ${context.lessonTitle || 'English Study'}.
Student Question: ${userText}`;
          const result = await model.generateContent(prompt);
          return result.response.text();
        } catch (err) {
          console.warn('Web API Gemini error:', err.message);
        }
      }
    }

    return "សួស្តី! ខ្ញុំគឺគ្រូសន (Teacher Sorn) នៃវិទ្យាស្ថាន Teacher SSOnline។ សូមសាកល្បងសួរម្តងទៀតណា៎!";
  }

  // ==========================================
  // 1. AUTHENTICATION & SYNC ENDPOINTS
  // ==========================================

  /**
   * Telegram WebApp Authentication
   * Called automatically when WebApp is opened inside Telegram
   */
  router.post('/auth/telegram', async (req, res) => {
    try {
      const { id, first_name, last_name, username } = req.body;
      if (!id) {
        return res.status(400).json({ error: 'Missing Telegram User ID' });
      }

      const userId = id.toString();
      const displayName = [first_name, last_name].filter(Boolean).join(' ') || username || `User ${userId}`;

      if (db) {
        // Ensure profile is updated
        await db.ref(`users/${userId}/profile`).update({
          name: displayName,
          username: username || '',
          lastWebLogin: Date.now(),
          isTelegram: true
        });
      }

      const isVIP = checkVIP ? await checkVIP(userId) : false;
      const yearly = checkYearlyVIP ? await checkYearlyVIP(userId) : { eligible: false };

      // Fetch user progress and stats
      let completedLessons = {};
      let subjectCerts = {};
      if (db) {
        const snap = await db.ref(`users/${userId}`).once('value');
        const data = snap.val() || {};
        completedLessons = data.completed_lessons || {};
        subjectCerts = data.subject_certifications || {};
      }

      return res.json({
        success: true,
        user: {
          id: userId,
          name: displayName,
          username: username || '',
          isTelegram: true,
          isVIP,
          yearlyEligible: yearly.eligible,
          vipDetails: yearly,
          completedLessonsCount: Object.keys(completedLessons).length,
          certificatesCount: Object.keys(subjectCerts).length
        }
      });
    } catch (err) {
      console.error('Telegram auth error:', err);
      res.status(500).json({ error: 'Internal server error during Telegram auth' });
    }
  });

  /**
   * Register with Username, Password & Gmail
   * STRICT REQUIREMENT: Gmail (@gmail.com) connection is required!
   */
  router.post('/auth/register', async (req, res) => {
    try {
      const { username, password, fullName, gmail, syncCode } = req.body;

      if (!username || !password || !fullName || !gmail) {
        return res.status(400).json({ error: 'សូមបំពេញព័ត៌មានទាំងអស់ (ឈ្មោះពេញ, Username, Password, Gmail)!' });
      }

      const cleanUser = username.trim().toLowerCase();
      const cleanGmail = gmail.trim().toLowerCase();
      const cleanName = fullName.trim();

      // Validate Username
      if (!/^[a-zA-Z0-9_]{3,25}$/.test(cleanUser)) {
        return res.status(400).json({ error: 'Username ត្រូវតែមាន 3 ដល់ 25 តួអក្សរ (អក្សរអង់គ្លេស ឬលេខ)!' });
      }

      // Validate Password
      if (password.length < 4) {
        return res.status(400).json({ error: 'Password ត្រូវមានយ៉ាងតិច 4 តួអក្សរឡើងទៅ!' });
      }

      // Validate Gmail requirement (@gmail.com)
      if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(cleanGmail)) {
        return res.status(400).json({ error: 'តម្រូវឱ្យភ្ជាប់ជាមួយគណនី Gmail (@gmail.com) ត្រឹមត្រូវប៉ុណ្ណោះ!' });
      }

      if (!db) {
        return res.status(500).json({ error: 'ប្រព័ន្ធទិន្នន័យមិនទាន់ភ្ជាប់!' });
      }

      // Check if username already exists
      const userSnap = await db.ref(`web_users/${cleanUser}`).once('value');
      if (userSnap.exists()) {
        return res.status(400).json({ error: `Username "${cleanUser}" នេះមានអ្នកប្រើរួចហើយ! សូមជ្រើសរើស Username ផ្សេង។` });
      }

      // Check if sync code is provided to link Telegram immediately
      let linkedTelegramId = null;
      if (syncCode) {
        const cleanCode = syncCode.toString().trim();
        const codeSnap = await db.ref(`sync_codes/${cleanCode}`).once('value');
        const codeData = codeSnap.val();
        if (codeData && codeData.expiresAt > Date.now()) {
          linkedTelegramId = codeData.telegramId.toString();
        }
      }

      const webUserId = `web_${cleanUser}`;
      const passwordHashed = hashPassword(password);

      const record = {
        username: cleanUser,
        fullName: cleanName,
        gmail: cleanGmail,
        passwordHash: passwordHashed,
        userId: webUserId,
        createdAt: Date.now(),
        gmailVerified: true,
        linkedTelegramId
      };

      await db.ref(`web_users/${cleanUser}`).set(record);

      // Initialize user profile in global users collection
      const effectiveUserId = linkedTelegramId || webUserId;
      await db.ref(`users/${effectiveUserId}/profile`).update({
        name: cleanName,
        username: cleanUser,
        gmail: cleanGmail,
        registeredAt: Date.now(),
        isWebUser: true,
        linkedTelegramId
      });

      const isVIP = checkVIP ? await checkVIP(effectiveUserId) : false;

      return res.json({
        success: true,
        message: 'ចុះឈ្មោះ និងភ្ជាប់គណនី Gmail ជោគជ័យ!',
        user: {
          id: effectiveUserId,
          name: cleanName,
          username: cleanUser,
          gmail: cleanGmail,
          isTelegram: !!linkedTelegramId,
          linkedTelegramId,
          isVIP
        }
      });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ error: 'មានបញ្ហាក្នុងការចុះឈ្មោះ សូមព្យាយាមម្តងទៀត' });
    }
  });

  /**
   * Login with Username & Password
   */
  router.post('/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'សូមបញ្ចូល Username និង Password!' });
      }

      const cleanUser = username.trim().toLowerCase();
      if (!db) {
        return res.status(500).json({ error: 'ប្រព័ន្ធទិន្នន័យមិនទាន់ភ្ជាប់!' });
      }

      const snap = await db.ref(`web_users/${cleanUser}`).once('value');
      const account = snap.val();

      if (!account) {
        return res.status(401).json({ error: 'មិនមានគណនី Username នេះក្នុងប្រព័ន្ធទេ!' });
      }

      const hashed = hashPassword(password);
      if (account.passwordHash !== hashed) {
        return res.status(401).json({ error: 'ពាក្យសម្ងាត់ (Password) មិនត្រឹមត្រូវទេ!' });
      }

      // If this web user has linked their Telegram account, use their Telegram ID so all data is synced!
      const effectiveUserId = account.linkedTelegramId || account.userId;
      const isVIP = checkVIP ? await checkVIP(effectiveUserId) : false;
      const yearly = checkYearlyVIP ? await checkYearlyVIP(effectiveUserId) : { eligible: false };

      return res.json({
        success: true,
        message: 'ចូលគណនីជោគជ័យ!',
        user: {
          id: effectiveUserId,
          name: account.fullName || account.username,
          username: account.username,
          gmail: account.gmail,
          isTelegram: !!account.linkedTelegramId,
          linkedTelegramId: account.linkedTelegramId || null,
          isVIP,
          yearlyEligible: yearly.eligible,
          vipDetails: yearly
        }
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'មានបញ្ហាក្នុងការចូលគណនី' });
    }
  });

  /**
   * Link Web Account to Telegram using 6-Digit Sync Code
   */
  router.post('/auth/sync-code', async (req, res) => {
    try {
      const { code, currentUserId } = req.body;
      if (!code) {
        return res.status(400).json({ error: 'សូមបញ្ចូលលេខកូដ ៦ ខ្ទង់!' });
      }

      const cleanCode = code.toString().trim();
      if (!db) return res.status(500).json({ error: 'ប្រព័ន្ធទិន្នន័យមិនទាន់ភ្ជាប់!' });

      const snap = await db.ref(`sync_codes/${cleanCode}`).once('value');
      const syncData = snap.val();

      if (!syncData) {
        return res.status(404).json({ error: 'លេខកូដមិនត្រឹមត្រូវ ឬមិនមានក្នុងប្រព័ន្ធ!' });
      }

      if (syncData.expiresAt && syncData.expiresAt < Date.now()) {
        return res.status(400).json({ error: 'លេខកូដនេះបានផុតកំណត់ហើយ! សូមវាយ /link លើ Telegram Bot ដើម្បីយកកូដថ្មី។' });
      }

      const telegramUserId = syncData.telegramId.toString();

      // If user is currently logged in with a web account, link it
      if (currentUserId && currentUserId.startsWith('web_')) {
        const username = currentUserId.replace('web_', '');
        await db.ref(`web_users/${username}`).update({
          linkedTelegramId: telegramUserId,
          linkedAt: Date.now()
        });
      }

      // Remove used sync code
      await db.ref(`sync_codes/${cleanCode}`).remove();

      // Fetch Telegram profile
      const tgSnap = await db.ref(`users/${telegramUserId}`).once('value');
      const tgData = tgSnap.val() || {};
      const tgProfile = tgData.profile || {};

      const isVIP = checkVIP ? await checkVIP(telegramUserId) : false;
      const yearly = checkYearlyVIP ? await checkYearlyVIP(telegramUserId) : { eligible: false };

      return res.json({
        success: true,
        message: 'ភ្ជាប់គណនី Telegram ដោយជោគជ័យ! ទិន្នន័យទាំងអស់ត្រូវបាន Sync ជាមួយគ្នា។',
        user: {
          id: telegramUserId,
          name: syncData.name || tgProfile.name || `User ${telegramUserId}`,
          username: syncData.username || tgProfile.username || '',
          isTelegram: true,
          isVIP,
          yearlyEligible: yearly.eligible,
          vipDetails: yearly,
          completedLessonsCount: Object.keys(tgData.completed_lessons || {}).length,
          certificatesCount: Object.keys(tgData.subject_certifications || {}).length
        }
      });
    } catch (err) {
      console.error('Sync code error:', err);
      res.status(500).json({ error: 'មានបញ្ហាក្នុងការផ្ទៀងផ្ទាត់កូដ' });
    }
  });

  // ==========================================
  // 2. USER PROFILE & STATS
  // ==========================================

  router.get('/user/profile/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) return res.status(400).json({ error: 'Missing userId' });

      if (!db) return res.status(500).json({ error: 'Database disconnected' });

      const snap = await db.ref(`users/${userId}`).once('value');
      const data = snap.val() || {};
      const profile = data.profile || {};
      const completedLessons = data.completed_lessons || {};
      const subjectCerts = data.subject_certifications || {};

      const isVIP = checkVIP ? await checkVIP(userId) : false;
      const yearly = checkYearlyVIP ? await checkYearlyVIP(userId) : { eligible: false };

      // Calculate total quiz points
      let totalQuizScore = 0;
      let totalPossible = 0;
      Object.values(completedLessons).forEach(l => {
        totalQuizScore += l.score || 0;
        totalPossible += l.total || 10;
      });

      return res.json({
        success: true,
        profile: {
          id: userId,
          name: profile.name || `សិស្ស ID ${userId}`,
          username: profile.username || '',
          gmail: profile.gmail || null,
          isVIP,
          vipDetails: yearly,
          completedLessons,
          subjectCerts,
          stats: {
            completedLessonsCount: Object.keys(completedLessons).length,
            certificatesCount: Object.keys(subjectCerts).length,
            totalScore: totalQuizScore,
            totalPossible
          }
        }
      });
    } catch (err) {
      console.error('Get profile error:', err);
      res.status(500).json({ error: 'Error loading user profile' });
    }
  });

  // ==========================================
  // 3. CURRICULUM & LESSONS
  // ==========================================

  router.get('/curriculum', (req, res) => {
    try {
      const summaryMonths = curriculum.months.map(m => ({
        id: m.id,
        title: m.title,
        weeksCount: m.weeks.length,
        weeks: m.weeks.map(w => ({
          id: w.id,
          title: w.title,
          lessonsCount: w.lessons.length,
          lessons: w.lessons.map(l => ({
            id: l.id,
            title: l.title
          }))
        }))
      }));

      res.json({ success: true, months: summaryMonths });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch curriculum' });
    }
  });

  router.get('/lesson/:monthId/:weekId/:lessonId', (req, res) => {
    try {
      const { monthId, weekId, lessonId } = req.params;
      const month = curriculum.months.find(m => m.id === monthId);
      if (!month) return res.status(404).json({ error: 'Month not found' });

      const week = month.weeks.find(w => w.id === weekId);
      if (!week) return res.status(404).json({ error: 'Week not found' });

      const lesson = week.lessons.find(l => l.id === lessonId);
      if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

      res.json({
        success: true,
        month: { id: month.id, title: month.title },
        week: { id: week.id, title: week.title },
        lesson: {
          id: lesson.id,
          title: lesson.title,
          content: lesson.content
        }
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch lesson' });
    }
  });

  // ==========================================
  // 4. QUIZ ENGINE & ANNUAL EXAMS
  // ==========================================

  router.get('/annual-exams', (req, res) => {
    const list = Object.entries(SUBJECT_EXAMS).map(([key, item]) => ({
      key,
      id: item.id,
      title: item.title,
      shortTitle: item.shortTitle,
      description: item.description,
      icon: item.icon
    }));
    res.json({ success: true, exams: list });
  });

  /**
   * Get Quiz Questions (Lesson or Annual Exam)
   */
  router.get('/quiz/start', async (req, res) => {
    try {
      const { type, monthId, weekId, lessonId, subjectKey, userId } = req.query;
      let rawQuestions = [];
      let quizTitle = '';

      if (type === 'annual') {
        if (!SUBJECT_EXAMS[subjectKey]) {
          return res.status(400).json({ error: 'Invalid annual subject key' });
        }

        // Yearly VIP check if userId provided
        if (userId && checkYearlyVIP) {
          const yearly = await checkYearlyVIP(userId);
          if (!yearly.eligible) {
            return res.status(403).json({
              error: '🔒 ការប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ គឺសម្រាប់តែសិស្សដែលបង់ប្រាក់ប្រចាំឆ្នាំ (30$/ឆ្នាំ) ឬសន្សំគ្រប់ ១ ឆ្នាំប៉ុណ្ណោះ!',
              isLocked: true
            });
          }
        }

        rawQuestions = generateAnnualSubjectQuiz(curriculum, subjectKey, 20);
        quizTitle = SUBJECT_EXAMS[subjectKey].title;
      } else {
        // Lesson quiz
        const qList = generateQuiz(curriculum, monthId, weekId, lessonId);
        rawQuestions = qList || [];
        const m = curriculum.months.find(m => m.id === monthId);
        const w = m?.weeks.find(w => w.id === weekId);
        const l = w?.lessons.find(l => l.id === lessonId);
        quizTitle = l ? l.title : 'Lesson Quiz';
      }

      if (!rawQuestions || rawQuestions.length === 0) {
        return res.status(404).json({ error: 'មិនអាចបង្កើតសំណួរសម្រាប់មេរៀននេះបានទេ' });
      }

      // Create a quiz session with question ID and without sending correct answers to client
      const sessionId = 'qs_' + Math.random().toString(36).substring(2, 10);
      const safeQuestions = rawQuestions.map((q, idx) => ({
        id: idx,
        question: q.question,
        options: q.options
      }));

      // Store in memory for secure verification
      activeQuizSessions.set(sessionId, {
        rawQuestions,
        createdAt: Date.now(),
        type,
        monthId,
        weekId,
        lessonId,
        subjectKey,
        quizTitle
      });

      res.json({
        success: true,
        sessionId,
        quizTitle,
        total: rawQuestions.length,
        questions: safeQuestions
      });
    } catch (err) {
      console.error('Quiz start error:', err);
      res.status(500).json({ error: 'Failed to start quiz' });
    }
  });

  /**
   * Submit Quiz Answers
   */
  router.post('/quiz/submit', async (req, res) => {
    try {
      const { sessionId, userId, answers, studentName } = req.body;
      if (!sessionId || !userId || !answers) {
        return res.status(400).json({ error: 'Missing quiz submission parameters' });
      }

      const session = activeQuizSessions.get(sessionId);
      if (!session) {
        return res.status(400).json({ error: 'Quiz session has expired. Please restart the quiz.' });
      }

      const { rawQuestions, type, monthId, weekId, lessonId, subjectKey, quizTitle } = session;
      const total = rawQuestions.length;
      let score = 0;
      const review = [];

      for (let i = 0; i < total; i++) {
        const q = rawQuestions[i];
        const studentAns = answers[i] !== undefined ? answers[i] : null;
        const isCorrect = studentAns === q.correct;
        if (isCorrect) score++;

        review.push({
          question: q.question,
          options: q.options,
          studentAnswer: studentAns !== null ? q.options[studentAns] : 'មិនបានឆ្លើយ',
          correctAnswer: q.options[q.correct],
          isCorrect
        });
      }

      const percent = Math.round((score / total) * 100);
      let grade = 'F';
      if (percent >= 90) grade = 'A';
      else if (percent >= 80) grade = 'B';
      else if (percent >= 70) grade = 'C';
      else if (percent >= 60) grade = 'D';

      const isPassed = ['A', 'B', 'C'].includes(grade);
      const isAnnualExam = type === 'annual';

      let certId = null;
      let certData = null;

      if (isPassed && db) {
        const effectiveName = studentName || `សិស្ស ID ${userId}`;
        const dateStr = new Date().toLocaleDateString('km-KH');

        // Check if existing certId exists
        const refPath = isAnnualExam
          ? `users/${userId}/subject_certifications/${subjectKey}`
          : `users/${userId}/completed_lessons/${monthId}-${weekId}-${lessonId}`;

        try {
          const prevSnap = await db.ref(refPath).once('value');
          const prevVal = prevSnap.val();
          certId = (prevVal && prevVal.certId) ? prevVal.certId : Math.random().toString(36).substring(2, 8).toUpperCase();

          // Save completion record
          if (isAnnualExam) {
            await db.ref(`users/${userId}/subject_certifications/${subjectKey}`).set({
              certId,
              subjectKey,
              subjectTitle: quizTitle,
              studentName: effectiveName,
              grade,
              score,
              total,
              percent,
              dateStr,
              completedAt: Date.now()
            });
          } else {
            const lessonKey = `${monthId}-${weekId}-${lessonId}`;
            await db.ref(`users/${userId}/completed_lessons/${lessonKey}`).set({
              certId,
              lessonId: lessonKey,
              lessonTitle: quizTitle,
              monthId,
              weekId,
              studentName: effectiveName,
              grade,
              score,
              total,
              percent,
              dateStr,
              completedAt: Date.now()
            });
          }

          // Save global certificate record for QR Code
          certData = {
            certId,
            userId: userId.toString(),
            studentName: effectiveName,
            title: quizTitle,
            lessonTitle: quizTitle,
            grade,
            score,
            total,
            percent,
            dateStr,
            isAnnualExam,
            subjectKey: isAnnualExam ? subjectKey : null,
            lessonId: isAnnualExam ? null : `${monthId}-${weekId}-${lessonId}`,
            issuedAt: Date.now(),
            director: 'លីម សន (Lim Sorn)',
            instructor: 'TeacherSornAiBot',
            schoolName: 'វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline'
          };

          await db.ref(`certificates/${certId}`).set(certData);
        } catch (e) {
          console.error('Quiz completion database error:', e);
        }
      }

      // Remove session
      activeQuizSessions.delete(sessionId);

      res.json({
        success: true,
        isPassed,
        score,
        total,
        percent,
        grade,
        gradeTitle: getGradeTitle(grade),
        certId,
        certData,
        review
      });
    } catch (err) {
      console.error('Quiz submit error:', err);
      res.status(500).json({ error: 'Failed to evaluate quiz' });
    }
  });

  // ==========================================
  // 5. CERTIFICATES & REFRESH ENDPOINTS
  // ==========================================

  router.get('/certificates/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) return res.status(400).json({ error: 'Missing userId' });
      if (!db) return res.status(500).json({ error: 'Database disconnected' });

      const snap = await db.ref(`users/${userId}`).once('value');
      const data = snap.val() || {};
      const annualCerts = data.subject_certifications || {};
      const lessonComps = data.completed_lessons || {};

      const list = [];
      for (const [key, val] of Object.entries(annualCerts)) {
        list.push({ ...val, subjectKey: key, isAnnualExam: true });
      }
      for (const [key, val] of Object.entries(lessonComps)) {
        if (['A', 'B', 'C'].includes(val.grade) || (val.percent && val.percent >= 70)) {
          list.push({ ...val, lessonId: key, isAnnualExam: false });
        }
      }

      res.json({ success: true, certificates: list });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch certificates' });
    }
  });

  router.post('/certificates/refresh', async (req, res) => {
    try {
      const { userId, certId, studentName, title, isAnnualExam, subjectKey, lessonId } = req.body;
      if (!userId || !certId) {
        return res.status(400).json({ error: 'Missing userId or certId' });
      }
      if (!db) return res.status(500).json({ error: 'Database disconnected' });

      // Fetch existing certificate
      const snap = await db.ref(`certificates/${certId}`).once('value');
      let cert = snap.val();

      const effectiveName = studentName || (cert && cert.studentName) || `សិស្ស ID ${userId}`;
      const effectiveTitle = title || (cert && cert.title) || 'វិញ្ញាបនបត្រផ្លូវការ';
      const dateStr = (cert && cert.dateStr) || new Date().toLocaleDateString('km-KH');

      const updatedCert = {
        certId,
        userId: userId.toString(),
        studentName: effectiveName,
        title: effectiveTitle,
        grade: cert?.grade || 'A',
        score: cert?.score || 10,
        total: cert?.total || 10,
        percent: cert?.percent || 100,
        dateStr,
        isAnnualExam: cert ? !!cert.isAnnualExam : !!isAnnualExam,
        subjectKey: cert?.subjectKey || subjectKey || null,
        lessonId: cert?.lessonId || lessonId || null,
        director: 'លីម សន (Lim Sorn)',
        instructor: 'TeacherSornAiBot',
        schoolName: 'វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline',
        lastRefreshedAt: Date.now()
      };

      await db.ref(`certificates/${certId}`).update(updatedCert);

      // Backfill to user records
      if (updatedCert.isAnnualExam && updatedCert.subjectKey) {
        await db.ref(`users/${userId}/subject_certifications/${updatedCert.subjectKey}`).update({
          studentName: effectiveName,
          lastRefreshedAt: Date.now()
        });
      } else if (updatedCert.lessonId) {
        await db.ref(`users/${userId}/completed_lessons/${updatedCert.lessonId}`).update({
          studentName: effectiveName,
          lastRefreshedAt: Date.now()
        });
      }

      res.json({
        success: true,
        message: 'វិញ្ញាបនបត្រត្រូវបាន Refresh និងអាប់ដេតជោគជ័យ!',
        certData: updatedCert
      });
    } catch (err) {
      console.error('Cert refresh error:', err);
      res.status(500).json({ error: 'Failed to refresh certificate' });
    }
  });

  router.get('/certificates/html/:certId', async (req, res) => {
    try {
      const { certId } = req.params;
      const cleanCertId = (certId || '').replace(/^CERT-/i, '').trim().toUpperCase();
      if (!cleanCertId || !db) return res.status(400).send('Invalid certId or DB disconnected');

      const snap = await db.ref(`certificates/${cleanCertId}`).once('value');
      const cert = snap.val();
      if (!cert) return res.status(404).send('Certificate not found');

      const html = await generateCertificateHTML(cert);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.send(html);
    } catch (err) {
      res.status(500).send('Error rendering certificate');
    }
  });

  // ==========================================
  // 6. AUDIO TTS & AI CHAT
  // ==========================================

  router.post('/tts', async (req, res) => {
    try {
      const { text, lang } = req.body;
      if (!text) return res.status(400).json({ error: 'Missing text parameter' });

      // Clean text of emojis & markdown
      let cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
      cleanText = cleanText.replace(/[*_#`]/g, '').trim();

      const isEnglish = (lang === 'en') || /[a-zA-Z]{4,}/.test(cleanText);
      const voice = isEnglish ? 'en-US-AriaNeural' : 'km-KH-SreymomNeural';

      const edgeTts = new MsEdgeTTS();
      await edgeTts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const stream = edgeTts.toStream(cleanText);

      const chunks = [];
      await new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('end', resolve);
        stream.on('error', reject);
      });

      const buffer = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Length', buffer.length);
      res.send(buffer);
    } catch (err) {
      console.error('TTS error:', err);
      res.status(500).json({ error: 'Audio generation failed' });
    }
  });

  router.post('/chat', async (req, res) => {
    try {
      const { userId, message, lessonTitle } = req.body;
      if (!message) return res.status(400).json({ error: 'Missing message' });

      const reply = await generateAIAnswer(message, { lessonTitle });
      res.json({ success: true, reply });
    } catch (err) {
      res.status(500).json({ error: 'Chat AI error' });
    }
  });

  // ==========================================
  // 7. VIP LICENSE & IRREGULAR VERBS
  // ==========================================

  router.post('/vip/redeem', async (req, res) => {
    try {
      const { userId, licenseKey } = req.body;
      if (!userId || !licenseKey) {
        return res.status(400).json({ error: 'Missing userId or licenseKey' });
      }
      if (!db) return res.status(500).json({ error: 'Database disconnected' });

      const result = await redeemLicenseKey(db, userId, licenseKey.trim());
      if (result.success) {
        res.json({ success: true, message: result.message, days: result.days, label: result.label });
      } else {
        res.status(400).json({ error: result.message });
      }
    } catch (err) {
      res.status(500).json({ error: 'License redemption error' });
    }
  });

  router.get('/verbs', (req, res) => {
    res.json({ success: true, verbs: irregularVerbs });
  });

  return router;
}

module.exports = { createWebAPIRouter };
