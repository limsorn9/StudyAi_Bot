const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Groq = require('groq-sdk');
const OpenAI = require('openai');

const { generateQuiz, generateBeginnerFinalExam, generateAnnualSubjectQuiz, SUBJECT_EXAMS } = require('./quiz_generator.js');
const { generateCertificateCard, generateCertificateHTML, getGradeTitle } = require('./certificate_generator.js');
const { redeemLicenseKey, getUserLicenseInfo } = require('./license_manager.js');
const irregularVerbs = require('./irregular_verbs.js');
const { sendOtpEmail, sendConfirmEmail } = require('./mailer.js');
const beginnerCourse = require('./beginner_curriculum.js');

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + '_studyai_secret_salt_2026').digest('hex');
}

function parseDeviceName(userAgent) {
  if (!userAgent) return 'Web Browser';
  let browser = 'Web Browser';
  let os = 'Device';

  if (userAgent.includes('Edg/')) browser = 'Edge';
  else if (userAgent.includes('Chrome/')) browser = 'Chrome';
  else if (userAgent.includes('Safari/') && !userAgent.includes('Chrome')) browser = 'Safari';
  else if (userAgent.includes('Firefox/')) browser = 'Firefox';
  else if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) browser = 'Internet Explorer';

  if (userAgent.includes('Windows NT 10.0')) os = 'Windows 10/11';
  else if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('iPhone')) os = 'iPhone';
  else if (userAgent.includes('iPad')) os = 'iPad';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('Macintosh') || userAgent.includes('Mac OS')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';

  return `${browser} on ${os}`;
}

/**
 * Creates the Express Web API Router
 */
function createWebAPIRouter({ db, auth, curriculum, bot, SUPER_ADMIN_IDS, checkVIP, checkYearlyVIP, getNextGroqKey, getNextGeminiKey }) {
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

  /**
   * Check VIP across linked accounts (Telegram ↔ Web).
   * If the primary userId doesn't have VIP but has a linked account that does,
   * the linked account's subscription is synced and VIP is returned true.
   */
  async function checkVIPCrossLinked(userId) {
    if (!checkVIP || !db) return false;
    if (!userId) return false;

    const primary = await checkVIP(userId);
    if (primary) return true;

    // Check linked account
    try {
      const profSnap = await db.ref(`users/${userId}/profile`).once('value');
      const prof = profSnap.val() || {};
      const linkedId = prof.linkedTelegramId || prof.linkedWebUserId;
      if (!linkedId) return false;

      const linkedVIP = await checkVIP(linkedId);
      if (linkedVIP) {
        // Sync subscription to primary account
        const subSnap = await db.ref(`users/${linkedId}/subscription`).once('value');
        const sub = subSnap.val();
        if (sub && sub.expiresAt && sub.expiresAt > Date.now()) {
          await db.ref(`users/${userId}/subscription`).set({
            ...sub,
            syncedFromLinked: true,
            syncedAt: Date.now()
          });
        }
        return true;
      }
    } catch (e) {
      console.error('[checkVIPCrossLinked] Error:', e.message);
    }
    return false;
  }

  /**
   * Verify if a user is an authorized Admin / Super Admin
   */
  async function isUserAdmin(userId) {
    if (!userId) return false;
    const strId = userId.toString().trim();
    if (SUPER_ADMIN_IDS && SUPER_ADMIN_IDS.some(id => id.toString().trim() === strId)) return true;
    if (db) {
      try {
        const snap = await db.ref(`users/${strId}/profile`).once('value');
        const prof = snap.val() || {};
        if (prof.role === 'admin' || prof.isAdmin === true) return true;
        if (prof.linkedTelegramId && SUPER_ADMIN_IDS && SUPER_ADMIN_IDS.some(id => id.toString().trim() === prof.linkedTelegramId.toString().trim())) return true;
      } catch (e) {}
    }
    return false;
  }



  // ==========================================
  // MULTI-ENGINE AI & KEY ROTATION SYSTEM
  // ==========================================

  const allGroqKeys = (process.env.GROQ_API_KEYS || process.env.GROQ_API_KEY || "").split(',').map(k => k.trim()).filter(Boolean);
  let localGroqIdx = 0;
  function getGroqApiKey() {
    if (typeof getNextGroqKey === 'function') {
      const k = getNextGroqKey();
      if (k) return k;
    }
    if (allGroqKeys.length > 0) {
      const k = allGroqKeys[localGroqIdx % allGroqKeys.length];
      localGroqIdx++;
      return k;
    }
    return null;
  }

  const allGeminiKeys = (process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || "").split(',').map(k => k.trim()).filter(Boolean);
  let localGeminiIdx = 0;
  function getGeminiApiKey() {
    if (typeof getNextGeminiKey === 'function') {
      const k = getNextGeminiKey();
      if (k) return k;
    }
    if (allGeminiKeys.length > 0) {
      const k = allGeminiKeys[localGeminiIdx % allGeminiKeys.length];
      localGeminiIdx++;
      return k;
    }
    return null;
  }

  const GEMINI_MODELS_POOL = [
    'gemini-flash-lite-latest',
    'gemini-3.8-flash',
    'gemini-flash-latest',
    'gemini-2.5-flash-lite',
    'gemini-2.5-pro'
  ];

  const GROQ_MODELS_POOL = [
    'llama-3.3-70b-versatile',
    'llama-3.1-8b-instant',
    'mixtral-8x7b-32768'
  ];

  /**
   * Universal AI Text Generator for Web App & Teacher Sorn Tutor
   * Features:
   * - Automatic engine fallback: Groq -> Gemini -> OpenAI
   * - Key rotation across all configured keys
   * - Context-aware (current lesson, student progress, mode)
   * - Persistent memory sync with Firebase database
   */
  async function generateAIAnswer(userText, options = {}) {
    const {
      lessonTitle = '',
      userId = null,
      preferredAI = 'auto',
      mode = 'chat',
      extraContext = '',
      clientHistory = [],
      tutor = 'sorn'
    } = options;

    const isPiseth = tutor === 'piseth' || (lessonTitle && (lessonTitle.includes('ថ្នាក់ដំបូង') || lessonTitle.includes('Beginner') || lessonTitle.includes('Piseth') || lessonTitle.includes('ពិសិដ្ឋ')));

    // 1. Build Persona System Prompt based on Instructor (Teacher Piseth vs Teacher Sorn)
    let systemPrompt = '';
    if (isPiseth) {
      systemPrompt = `You are Teacher Piseth (អ្នកគ្រូពិសិដ្ឋ), a gentle, loving, patient, and highly encouraging female English teacher specializing in beginner foundation, phonics, and elementary English at Teacher SSOnline English Academy (វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline).
You speak warm, kind, and polite Khmer (ភាសាខ្មែរ) and crystal clear, simple American English.
Always refer to yourself as អ្នកគ្រូពិសិដ្ឋ (Teacher Piseth) or អ្នកគ្រូ when replying in Khmer.
Address the student warmly and affectionately as កូនៗ, ប្អូន, or សិស្សជាទីស្រឡាញ់.
Explain everything in the simplest, friendliest, step-by-step manner. Include clear pronunciation guides (សូរសព្ទ), lots of friendly emojis (🌟, 📚, 💖, 👏), and easy beginner examples.
Always encourage and praise the student's effort!`;
    } else {
      systemPrompt = `You are Teacher Sorn (គ្រូសន), a renowned and encouraging English teacher at Teacher SSOnline English Institute (វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline).
You speak fluent Khmer (ភាសាខ្មែរ) and natural American/British English.
Always refer to yourself as គ្រូសន (Teacher Sorn) when replying in Khmer.
Structure your answers clearly using clean Markdown, bold headers, bullet points, and practical examples.
Keep your tone warm, friendly, professional, and educational.`;
    }

    if (mode === 'grammar') {
      systemPrompt += `\n\n[SPECIAL MODE: GRAMMAR ANALYZER & WRITING COACH]
Analyze the student's English input: "${userText}"
Format your response with:
1. 📊 ស្ថានភាពវេយ្យាករណ៍ (Grammar Status): [✅ ត្រឹមត្រូវល្អ / ⚠️ មានចំណុចត្រូវកែ / ❌ មានកំហុសវេយ្យាករណ៍]
2. ✍️ ប្រយោគកែតម្រូវត្រឹមត្រូវ (Corrected English): [Write corrected sentence in bold]
3. 💡 ការពន្យល់ក្បោះក្បាយជាភាសាខ្មែរ (Khmer Explanation): [Explain clearly why each correction was made]
4. 📝 ឧទាហរណ៍ប្រើប្រាស់បន្ថែម (Natural Examples): [Provide 2 natural sentences in English + Khmer translation]`;
    } else if (mode === 'translate') {
      systemPrompt += `\n\n[SPECIAL MODE: BILINGUAL TRANSLATOR & VOCABULARY COACH]
Accurately translate the text between Khmer and English:
1. 🔄 ការបកប្រែត្រឹមត្រូវ (Accurate Translation): [Clear natural translation]
2. 🗣️ ការបញ្ចេញសំឡេង (Pronunciation / Phonetics): [IPA and Khmer sound phonetic approximation]
3. 📖 ការពន្យល់ពាក្យគន្លឹះ (Key Vocabulary & Nuance): [Explain words used]
4. 📝 ឧទាហរណ៍ជាក់ស្តែង (2 Example Sentences): [Provide 2 natural bilingual sentences]`;
    } else if (mode === 'verb') {
      systemPrompt += `\n\n[SPECIAL MODE: IRREGULAR VERBS ASSISTANT]
Provide a complete guide for the requested verb:
1. 📋 ទម្រង់កិរិយាសព្ទទាំង ៣ (3 Forms):
   • V1 (Base Form): ...
   • V2 (Past Simple): ...
   • V3 (Past Participle): ...
   • V-ing (Present Participle): ...
2. 🇰🇭 អត្ថន័យជាភាសាខ្មែរ (Khmer Meaning): ...
3. 📝 ឧទាហរណ៍ក្នុងកាលនីមួយៗ (Examples in Tenses):
   • Present Simple: ...
   • Past Simple: ...
   • Present Perfect: ...
4. ⚠️ កំហុសដែលសិស្សឧស្សាហ៍ច្រឡំ (Common Pitfalls & Tips): ...`;
    } else if (mode === 'pronounce') {
      systemPrompt += `\n\n[SPECIAL MODE: PRONUNCIATION & SPEAKING COACH]
Provide practical English pronunciation coaching:
1. 🗣️ ការអានតាមសូរសព្ទ (IPA & Khmer Phonetics): [Clear phonetic spelling readable by Khmer learners]
2. 🎯 ការសង្កត់សំឡេង (Stress & Syllables): [Show syllables with stressed syllable capitalized]
3. 💡 គន្លឹះបញ្ចេញសំឡេង (Pronunciation Tips): [Mouth shape, tongue position, silent letters]
4. 🔊 ប្រយោគសម្រាប់ហាត់និយាយ (Practice Sentence): [A practical sentence to practice out loud]`;
    } else {
      if (lessonTitle) {
        systemPrompt += `\n\nCurrent Lesson Context: The student is studying "${lessonTitle}". Relate your answer to this lesson when relevant.`;
      }
      if (extraContext) {
        systemPrompt += `\nAdditional Context: ${extraContext}`;
      }
    }

    // 2. Fetch past conversation memory from Firebase (if userId available)
    let pastContextText = '';
    const conversationMessages = [];

    if (userId && db) {
      try {
        const snap = await db.ref(`users/${userId}/history`).limitToLast(8).once('value');
        const historyItems = snap.val();
        if (historyItems) {
          const sorted = Object.values(historyItems)
            .filter(i => i.role && i.text)
            .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));

          for (const item of sorted) {
            const role = item.role === 'ai' ? 'assistant' : 'user';
            conversationMessages.push({ role, content: item.text });
            pastContextText += `${item.role === 'user' ? 'Student' : 'Teacher Sorn'}: ${item.text}\n`;
          }
        }
      } catch (err) {
        console.warn('Web API history fetch note:', err.message);
      }
    }

    // Fall back to client-provided history if Firebase history was empty
    if (conversationMessages.length === 0 && Array.isArray(clientHistory) && clientHistory.length > 0) {
      for (const item of clientHistory.slice(-6)) {
        if (item.content) {
          const role = item.role === 'ai' || item.role === 'assistant' ? 'assistant' : 'user';
          conversationMessages.push({ role, content: item.content });
          pastContextText += `${role === 'user' ? 'Student' : 'Teacher Sorn'}: ${item.content}\n`;
        }
      }
    }

    // 3. Execution Engine with Fallback
    const enginesToTry = [];
    if (preferredAI === 'groq') {
      enginesToTry.push('groq', 'gemini', 'openai');
    } else if (preferredAI === 'gemini') {
      enginesToTry.push('gemini', 'groq', 'openai');
    } else if (preferredAI === 'openai') {
      enginesToTry.push('openai', 'groq', 'gemini');
    } else {
      // Auto: Try Groq first for lightning speed, then Gemini, then OpenAI
      enginesToTry.push('groq', 'gemini', 'openai');
    }

    let finalAnswer = null;
    let successfulProvider = 'AI';
    let successfulModel = '';

    for (const engine of enginesToTry) {
      if (finalAnswer) break;

      // --- A. GROQ ENGINE ---
      if (engine === 'groq') {
        const maxGroqTries = Math.max(allGroqKeys.length || 1, 2);
        for (let kTry = 0; kTry < maxGroqTries; kTry++) {
          const groqKey = getGroqApiKey();
          if (!groqKey) break;

          for (const modelName of GROQ_MODELS_POOL) {
            try {
              const groq = new Groq({ apiKey: groqKey });
              const groqMsgs = [
                { role: 'system', content: systemPrompt },
                ...conversationMessages,
                { role: 'user', content: userText }
              ];

              const completion = await groq.chat.completions.create({
                model: modelName,
                messages: groqMsgs,
                temperature: 0.65,
                max_tokens: 1200
              });

              const reply = completion.choices?.[0]?.message?.content;
              if (reply && reply.trim().length > 0) {
                finalAnswer = reply.trim();
                successfulProvider = 'Groq';
                successfulModel = modelName;
                break;
              }
            } catch (err) {
              console.warn(`Groq (${modelName}) attempt failed:`, err.message);
            }
          }
          if (finalAnswer) break;
        }
      }

      // --- B. GEMINI ENGINE ---
      if (engine === 'gemini') {
        const maxGeminiTries = Math.max(allGeminiKeys.length || 1, 2);
        for (let kTry = 0; kTry < maxGeminiTries; kTry++) {
          const geminiKey = getGeminiApiKey();
          if (!geminiKey) break;

          for (const modelName of GEMINI_MODELS_POOL) {
            try {
              const genAI = new GoogleGenerativeAI(geminiKey);
              const model = genAI.getGenerativeModel({ model: modelName });

              let promptWithContext = `${systemPrompt}\n\n`;
              if (pastContextText) {
                promptWithContext += `[Past Conversation Context]\n${pastContextText}\n`;
              }
              promptWithContext += `Student: ${userText}\nTeacher Sorn:`;

              const result = await model.generateContent(promptWithContext);
              const reply = result?.response?.text();
              if (reply && reply.trim().length > 0) {
                finalAnswer = reply.trim();
                successfulProvider = 'Gemini';
                successfulModel = modelName;
                break;
              }
            } catch (err) {
              console.warn(`Gemini (${modelName}) attempt failed:`, err.message);
            }
          }
          if (finalAnswer) break;
        }
      }

      // --- C. OPENAI ENGINE ---
      if (engine === 'openai') {
        const openaiKey = process.env.OPENAI_API_KEY;
        if (openaiKey && openaiKey !== 'YOUR_OPENAI_KEY') {
          for (const modelName of ['gpt-4o-mini', 'gpt-3.5-turbo']) {
            try {
              const openai = new OpenAI({ apiKey: openaiKey });
              const openaiMsgs = [
                { role: 'system', content: systemPrompt },
                ...conversationMessages,
                { role: 'user', content: userText }
              ];

              const completion = await openai.chat.completions.create({
                model: modelName,
                messages: openaiMsgs,
                temperature: 0.7,
                max_tokens: 1200
              });

              const reply = completion.choices?.[0]?.message?.content;
              if (reply && reply.trim().length > 0) {
                finalAnswer = reply.trim();
                successfulProvider = 'OpenAI';
                successfulModel = modelName;
                break;
              }
            } catch (err) {
              console.warn(`OpenAI (${modelName}) attempt failed:`, err.message);
            }
          }
        }
      }
    }

    if (!finalAnswer) {
      finalAnswer = `សួស្តីប្អូន! ខ្ញុំគឺគ្រូសន (Teacher Sorn) នៃវិទ្យាស្ថាន Teacher SSOnline។\n\nប្រព័ន្ធកំពុងមមាញឹកបន្តិច សូមសាកល្បងចុចផ្ញើសំណួរម្តងទៀតណា៎ ឬសាកល្បងប្តូរម៉ាស៊ីន AI (AI Engine) ខាងលើ! 🌟`;
      successfulProvider = 'System';
      successfulModel = 'fallback';
    }

    // 4. Save to Firebase History for cross-device & telegram sync
    if (userId && db) {
      try {
        await db.ref(`users/${userId}/history`).push({
          role: 'user',
          text: userText,
          timestamp: Date.now()
        });
        await db.ref(`users/${userId}/history`).push({
          role: 'ai',
          text: finalAnswer,
          provider: successfulProvider,
          model: successfulModel,
          timestamp: Date.now()
        });
      } catch (err) {
        console.warn('Failed to save chat to history:', err.message);
      }
    }

    return {
      reply: finalAnswer,
      provider: successfulProvider,
      model: successfulModel,
      timestamp: Date.now()
    };
  }

  // ==========================================
  // DEVICE & SESSION MANAGEMENT HELPERS
  // ==========================================

  async function createDeviceSession(userId, deviceId, userAgent, ip) {
    const cleanDeviceId = deviceId && typeof deviceId === 'string' && deviceId.length > 5 
      ? deviceId 
      : `dev_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const sessionToken = `sess_${crypto.randomBytes(24).toString('hex')}`;
    const deviceName = parseDeviceName(userAgent);

    const sessionData = {
      deviceId: cleanDeviceId,
      sessionToken,
      deviceName,
      userAgent: (userAgent || '').substring(0, 200),
      ip: ip || 'unknown',
      createdAt: Date.now(),
      lastActive: Date.now(),
      revoked: false
    };

    if (db) {
      await db.ref(`users/${userId}/sessions/${cleanDeviceId}`).set(sessionData);
    }

    return sessionData;
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
      const { id, first_name, last_name, username, deviceId, userAgent } = req.body;
      if (!id) {
        return res.status(400).json({ error: 'Missing Telegram User ID' });
      }

      const userId = id.toString();
      const displayName = [first_name, last_name].filter(Boolean).join(' ') || username || `User ${userId}`;

      if (db) {
        await db.ref(`users/${userId}/profile`).update({
          name: displayName,
          username: username || '',
          lastWebLogin: Date.now(),
          isTelegram: true
        });
      }

      const isVIP = await checkVIPCrossLinked(userId);
      const yearly = checkYearlyVIP ? await checkYearlyVIP(userId) : { eligible: false };

      let completedLessons = {};
      let subjectCerts = {};
      let profile = {};
      if (db) {
        const snap = await db.ref(`users/${userId}`).once('value');
        const data = snap.val() || {};
        completedLessons = data.completed_lessons || {};
        subjectCerts = data.subject_certifications || {};
        profile = data.profile || {};
      }

      const session = await createDeviceSession(userId, deviceId, userAgent || req.headers['user-agent'], req.ip);

      return res.json({
        success: true,
        user: {
          id: userId,
          name: profile.name || displayName,
          username: username || profile.username || '',
          khmerName: profile.khmerName || null,
          photoUrl: profile.photoUrl || profile.avatar || null,
          phone: profile.phone || null,
          isTelegram: true,
          isVIP,
          yearlyEligible: yearly.eligible,
          vipDetails: yearly,
          completedLessonsCount: Object.keys(completedLessons).length,
          certificatesCount: Object.keys(subjectCerts).length
        },
        deviceId: session.deviceId,
        sessionToken: session.sessionToken
      });
    } catch (err) {
      console.error('Telegram auth error:', err);
      res.status(500).json({ error: 'Internal server error during Telegram auth' });
    }
  });

  /**
   * 1-Click Telegram Web Login / Auto-Enroll Token Generation
   */
  router.post('/auth/telegram-web-token', async (req, res) => {
    try {
      const { currentUserId } = req.body || {};
      const token = 'tg_' + crypto.randomBytes(8).toString('hex');
      if (db) {
        await db.ref(`telegram_web_auth/${token}`).set({
          createdAt: Date.now(),
          expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
          verified: false,
          currentUserId: currentUserId || null
        });
      }
      const botUsername = process.env.TELEGRAM_BOT_USERNAME || 'StudyAiEngKH_bot';
      return res.json({
        success: true,
        token,
        botUsername,
        botUrl: `https://t.me/${botUsername}?start=auth_${token}`
      });
    } catch (err) {
      console.error('Create telegram token error:', err);
      res.status(500).json({ error: 'Failed to create Telegram login token' });
    }
  });

  /**
   * Poll Status of Telegram Web Login Token
   */
  router.get('/auth/telegram-web-token/status', async (req, res) => {
    try {
      const { token, deviceId, userAgent } = req.query;
      if (!token) return res.status(400).json({ error: 'Missing token' });

      if (!db) return res.status(500).json({ error: 'Database disconnected' });

      const snap = await db.ref(`telegram_web_auth/${token}`).once('value');
      const data = snap.val();

      if (!data) return res.status(404).json({ error: 'Token not found or expired' });
      if (data.expiresAt < Date.now()) {
        return res.status(400).json({ error: 'Token expired' });
      }

      if (data.denied) {
        await db.ref(`telegram_web_auth/${token}`).remove();
        return res.json({
          success: false,
          denied: true,
          error: '❌ អ្នកបានបដិសេធការស្នើសុំចូលគណនីនៅលើ Telegram (Authorization Denied)'
        });
      }

      if (data.verified && data.userId) {
        const userId = data.userId.toString();
        const userSnap = await db.ref(`users/${userId}`).once('value');
        const userData = userSnap.val() || {};
        const profile = userData.profile || {};

        let effectiveUserId = userId;
        let isLinked = false;

        // If this token was initiated from an existing logged in web user, link accounts
        if (data.currentUserId && data.currentUserId !== userId) {
          effectiveUserId = data.currentUserId;
          isLinked = true;

          // ── 1. Link profile ──────────────────────────────────────────
          await db.ref(`users/${data.currentUserId}/profile`).update({
            linkedTelegramId: userId,
            isTelegram: true,
            telegramUsername: profile.username || '',
            telegramLinkedAt: Date.now()
          });
          await db.ref(`users/${userId}/profile`).update({
            linkedWebUserId: data.currentUserId
          });

          // ── 2. Sync Subscription / License (VIP) ────────────────────
          // Merge: keep whichever subscription expires latest
          try {
            const [webSubSnap, tgSubSnap] = await Promise.all([
              db.ref(`users/${data.currentUserId}/subscription`).once('value'),
              db.ref(`users/${userId}/subscription`).once('value')
            ]);
            const webSub = webSubSnap.val();
            const tgSub  = tgSubSnap.val();

            if (tgSub && tgSub.expiresAt) {
              const webExpiry = webSub?.expiresAt || 0;
              const tgExpiry  = tgSub.expiresAt   || 0;
              if (tgExpiry > webExpiry) {
                // Telegram has a better/newer subscription → copy to web user
                await db.ref(`users/${data.currentUserId}/subscription`).set({
                  ...tgSub,
                  syncedFromTelegram: true,
                  syncedAt: Date.now()
                });
              } else if (webSub && webSub.expiresAt && webSub.expiresAt > tgExpiry) {
                // Web has a better subscription → copy to Telegram user
                await db.ref(`users/${userId}/subscription`).set({
                  ...webSub,
                  syncedFromWeb: true,
                  syncedAt: Date.now()
                });
              }
            } else if (webSub && webSub.expiresAt) {
              // Only web has subscription → copy to Telegram
              await db.ref(`users/${userId}/subscription`).set({
                ...webSub,
                syncedFromWeb: true,
                syncedAt: Date.now()
              });
            }
          } catch (subErr) {
            console.error('[Link] Subscription sync error:', subErr.message);
          }

          // ── 3. Sync Lesson Progress (completed_lessons) ──────────────
          try {
            const [webProgSnap, tgProgSnap] = await Promise.all([
              db.ref(`users/${data.currentUserId}/completed_lessons`).once('value'),
              db.ref(`users/${userId}/completed_lessons`).once('value')
            ]);
            const webLessons = webProgSnap.val() || {};
            const tgLessons  = tgProgSnap.val()  || {};

            if (Object.keys(tgLessons).length > 0) {
              // Merge: for each lesson key, keep the one with the latest timestamp
              const merged = { ...webLessons };
              for (const [key, tgVal] of Object.entries(tgLessons)) {
                const webVal = webLessons[key];
                if (!webVal || (tgVal.timestamp || 0) > (webVal.timestamp || 0)) {
                  merged[key] = tgVal;
                }
              }
              await db.ref(`users/${data.currentUserId}/completed_lessons`).set(merged);
              // Mirror back to Telegram user
              await db.ref(`users/${userId}/completed_lessons`).set(merged);
            } else if (Object.keys(webLessons).length > 0) {
              await db.ref(`users/${userId}/completed_lessons`).set(webLessons);
            }
          } catch (lessonErr) {
            console.error('[Link] Lesson progress sync error:', lessonErr.message);
          }

          // ── 4. Sync Telegram-side progress node ──────────────────────
          try {
            const [webP, tgP] = await Promise.all([
              db.ref(`users/${data.currentUserId}/progress`).once('value'),
              db.ref(`users/${userId}/progress`).once('value')
            ]);
            const webProgress = webP.val() || {};
            const tgProgress  = tgP.val()  || {};

            if (Object.keys(tgProgress).length > 0) {
              const mergedP = { ...webProgress };
              for (const [key, tgVal] of Object.entries(tgProgress)) {
                const webVal = webProgress[key];
                if (!webVal || (tgVal.timestamp || 0) > (webVal.timestamp || 0)) {
                  mergedP[key] = tgVal;
                }
              }
              await db.ref(`users/${data.currentUserId}/progress`).set(mergedP);
              await db.ref(`users/${userId}/progress`).set(mergedP);
            } else if (Object.keys(webProgress).length > 0) {
              await db.ref(`users/${userId}/progress`).set(webProgress);
            }
          } catch (progErr) {
            console.error('[Link] Progress sync error:', progErr.message);
          }

          // ── 5. Sync Quiz / Exam Results ──────────────────────────────
          try {
            const [webQSnap, tgQSnap] = await Promise.all([
              db.ref(`users/${data.currentUserId}/quiz_results`).once('value'),
              db.ref(`users/${userId}/quiz_results`).once('value')
            ]);
            const webQuiz = webQSnap.val() || {};
            const tgQuiz  = tgQSnap.val()  || {};

            if (Object.keys(tgQuiz).length > 0) {
              const mergedQ = { ...webQuiz, ...tgQuiz }; // quiz keys are timestamps → no collision
              await db.ref(`users/${data.currentUserId}/quiz_results`).set(mergedQ);
              await db.ref(`users/${userId}/quiz_results`).set(mergedQ);
            } else if (Object.keys(webQuiz).length > 0) {
              await db.ref(`users/${userId}/quiz_results`).set(webQuiz);
            }
          } catch (quizErr) {
            console.error('[Link] Quiz results sync error:', quizErr.message);
          }

          console.log(`[Link] Telegram ${userId} ↔ Web ${data.currentUserId}: subscription + lessons + progress + quiz synced`);
        }

        const effSnap = await db.ref(`users/${effectiveUserId}/profile`).once('value');
        const effProf = effSnap.val() || profile;

        const isVIP = await checkVIPCrossLinked(effectiveUserId);
        const yearly = checkYearlyVIP ? await checkYearlyVIP(effectiveUserId) : { eligible: false };

        const session = await createDeviceSession(effectiveUserId, deviceId, userAgent || req.headers['user-agent'], req.ip);

        // Cleanup token
        await db.ref(`telegram_web_auth/${token}`).remove();

        return res.json({
          success: true,
          verified: true,
          linked: isLinked,
          user: {
            id: effectiveUserId,
            name: effProf.name || profile.name || data.name || `User ${effectiveUserId}`,
            username: effProf.username || profile.username || '',
            khmerName: effProf.khmerName || profile.khmerName || null,
            photoUrl: effProf.photoUrl || profile.photoUrl || profile.avatar || null,
            phone: effProf.phone || profile.phone || null,
            isTelegram: true,
            linkedTelegramId: userId,
            isVIP,
            yearlyEligible: yearly.eligible,
            vipDetails: yearly
          },
          deviceId: session.deviceId,
          sessionToken: session.sessionToken
        });
      }

      return res.json({ success: true, verified: false });
    } catch (err) {
      console.error('Check telegram token error:', err);
      res.status(500).json({ error: 'Error checking token' });
    }
  });

  /**
   * Send 6-Digit OTP to Gmail for Course Registration
   * Simplified requirement: Name + Gmail only!
   */
  router.post('/auth/send-register-otp', async (req, res) => {
    try {
      const { fullName, gmail } = req.body;

      if (!fullName || !gmail) {
        return res.status(400).json({ error: 'សូមបំពេញឈ្មោះពេញ និងអាសយដ្ឋាន Gmail!' });
      }

      const cleanName = fullName.trim();
      const cleanGmail = gmail.trim().toLowerCase();

      // Strict validation for @gmail.com
      if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(cleanGmail)) {
        return res.status(400).json({ error: 'តម្រូវឱ្យប្រើប្រាស់គណនី Gmail (@gmail.com) ប៉ុណ្ណោះ!' });
      }

      if (!db) {
        return res.status(500).json({ error: 'ប្រព័ន្ធទិន្នន័យមិនទាន់ភ្ជាប់!' });
      }

      const emailKey = cleanGmail.replace(/[\.\#\$\[\]]/g, '_');

      // Generate 6-digit OTP code
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

      await db.ref(`email_verifications/${emailKey}`).set({
        code: otpCode,
        fullName: cleanName,
        gmail: cleanGmail,
        purpose: 'register',
        createdAt: Date.now(),
        expiresAt: Date.now() + 15 * 60 * 1000, // 15 mins
        verified: false
      });

      // Send OTP directly to student's Gmail via nodemailer
      const mailResult = await sendOtpEmail({
        toEmail: cleanGmail,
        fullName: cleanName,
        otpCode,
        purpose: 'register'
      });

      if (!mailResult.delivered) {
        return res.status(503).json({
          success: false,
          error: `⚠️ មិនទាន់អាចបញ្ជូនលេខកូដទៅកាន់ ${cleanGmail} បានទេ (${mailResult.error || 'Server មិនទាន់កំណត់ GMAIL_APP_PASSWORD'})! សូមទាក់ទង Admin ឬចុះឈ្មោះតាម Telegram / Google Sign-In ជំនួសវិញ។`
        });
      }

      return res.json({
        success: true,
        message: `លេខកូដ OTP ៦ ខ្ទង់ត្រូវបានផ្ញើចូលទៅកាន់ប្រអប់សំបុត្រ Gmail (${cleanGmail}) របស់អ្នករួចរាល់ហើយ! សូមពិនិត្យមើល Inbox ឬ Spam។`,
        email: cleanGmail
      });
    } catch (err) {
      console.error('Send register OTP error:', err);
      res.status(500).json({ error: 'មានបញ្ហាក្នុងការផ្ញើលេខកូដ OTP សូមព្យាយាមម្តងទៀត' });
    }
  });

  /**
   * Verify Register OTP and Create Account
   */
  router.post('/auth/verify-register-otp', async (req, res) => {
    try {
      const { fullName, gmail, code, deviceId, userAgent } = req.body;

      if (!gmail || !code) {
        return res.status(400).json({ error: 'សូមបញ្ចូល Gmail និងលេខកូដ OTP ៦ ខ្ទង់!' });
      }

      const cleanGmail = gmail.trim().toLowerCase();
      const cleanCode = code.toString().trim();
      const emailKey = cleanGmail.replace(/[\.\#\$\[\]]/g, '_');

      if (!db) return res.status(500).json({ error: 'ប្រព័ន្ធទិន្នន័យមិនទាន់ភ្ជាប់!' });

      const snap = await db.ref(`email_verifications/${emailKey}`).once('value');
      const vData = snap.val();

      if (!vData) {
        return res.status(404).json({ error: 'មិនមានសំណើផ្ទៀងផ្ទាត់សម្រាប់ Gmail នេះទេ! សូមចុះឈ្មោះម្តងទៀត។' });
      }

      if (vData.expiresAt && vData.expiresAt < Date.now()) {
        return res.status(400).json({ error: 'លេខកូដ OTP បានផុតកំណត់ហើយ! សូមស្នើសុំលេខកូដថ្មី។' });
      }

      if (vData.code !== cleanCode) {
        return res.status(400).json({ error: 'លេខកូដ OTP ៦ ខ្ទង់មិនត្រឹមត្រូវទេ! សូមពិនិត្យមើល Gmail របស់អ្នក។' });
      }

      const cleanName = (fullName || vData.fullName || 'Student').trim();

      // Check if user already exists with this email
      let userId = null;
      const emailMapSnap = await db.ref(`users_by_email/${emailKey}`).once('value');
      if (emailMapSnap.exists()) {
        userId = emailMapSnap.val();
      } else {
        const emailPrefix = cleanGmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'student';
        userId = `web_${emailPrefix}_${Math.random().toString(36).substring(2, 6)}`;
        await db.ref(`users_by_email/${emailKey}`).set(userId);
      }

      // Mark email verified
      await db.ref(`email_verifications/${emailKey}`).update({
        verified: true,
        verifiedAt: Date.now()
      });

      // Create or update user profile in Firebase
      await db.ref(`users/${userId}/profile`).update({
        name: cleanName,
        gmail: cleanGmail,
        gmailVerified: true,
        registeredAt: Date.now(),
        isWebUser: true
      });

      const isVIP = await checkVIPCrossLinked(userId);
      const yearly = checkYearlyVIP ? await checkYearlyVIP(userId) : { eligible: false };

      // Create persistent session for this device
      const session = await createDeviceSession(userId, deviceId, userAgent || req.headers['user-agent'], req.ip);

      // Fetch any existing profile details (photo, khmerName) if returning student
      const snapProf = await db.ref(`users/${userId}/profile`).once('value');
      const existingProf = snapProf.val() || {};

      return res.json({
        success: true,
        message: '🎉 ចុះឈ្មោះ និងផ្ទៀងផ្ទាត់គណនីជោគជ័យ!',
        user: {
          id: userId,
          name: cleanName,
          khmerName: existingProf.khmerName || null,
          photoUrl: existingProf.photoUrl || null,
          phone: existingProf.phone || null,
          gmail: cleanGmail,
          gmailVerified: true,
          isVIP,
          yearlyEligible: yearly.eligible,
          vipDetails: yearly
        },
        deviceId: session.deviceId,
        sessionToken: session.sessionToken
      });
    } catch (err) {
      console.error('Verify register OTP error:', err);
      res.status(500).json({ error: 'មានបញ្ហាក្នុងការផ្ទៀងផ្ទាត់ OTP' });
    }
  });

  /**
   * Send 6-Digit OTP to Gmail for Course Login
   */
  router.post('/auth/send-login-otp', async (req, res) => {
    try {
      const { gmail } = req.body;
      if (!gmail) return res.status(400).json({ error: 'សូមបញ្ចូលអាសយដ្ឋាន Gmail!' });

      const cleanGmail = gmail.trim().toLowerCase();
      if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(cleanGmail)) {
        return res.status(400).json({ error: 'តម្រូវឱ្យប្រើប្រាស់គណនី Gmail (@gmail.com) ប៉ុណ្ណោះ!' });
      }

      if (!db) return res.status(500).json({ error: 'ប្រព័ន្ធទិន្នន័យមិនទាន់ភ្ជាប់!' });

      const emailKey = cleanGmail.replace(/[\.\#\$\[\]]/g, '_');

      // Check if user exists
      let studentName = 'សិស្ស (Student)';
      const emailMapSnap = await db.ref(`users_by_email/${emailKey}`).once('value');
      if (emailMapSnap.exists()) {
        const uId = emailMapSnap.val();
        const pSnap = await db.ref(`users/${uId}/profile/name`).once('value');
        if (pSnap.exists()) studentName = pSnap.val();
      }

      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

      await db.ref(`email_verifications/${emailKey}`).set({
        code: otpCode,
        fullName: studentName,
        gmail: cleanGmail,
        purpose: 'login',
        createdAt: Date.now(),
        expiresAt: Date.now() + 15 * 60 * 1000,
        verified: false
      });

      const mailResult = await sendOtpEmail({
        toEmail: cleanGmail,
        fullName: studentName,
        otpCode,
        purpose: 'login'
      });

      if (!mailResult.delivered) {
        return res.status(503).json({
          success: false,
          error: `⚠️ មិនទាន់អាចបញ្ជូនលេខកូដទៅកាន់ ${cleanGmail} បានទេ (${mailResult.error || 'Server មិនទាន់កំណត់ GMAIL_APP_PASSWORD'})! សូមទាក់ទង Admin ឬចូលតាម Google / Telegram ជំនួសវិញ។`
        });
      }

      return res.json({
        success: true,
        message: `លេខកូដ OTP សម្រាប់ចូលគណនីត្រូវបានផ្ញើចូលទៅកាន់ប្រអប់សំបុត្រ Gmail (${cleanGmail}) របស់អ្នករួចរាល់ហើយ! សូមពិនិត្យមើល Inbox ឬ Spam។`,
        email: cleanGmail
      });
    } catch (err) {
      console.error('Send login OTP error:', err);
      res.status(500).json({ error: 'មានបញ្ហាក្នុងការផ្ញើលេខកូដ OTP' });
    }
  });

  /**
   * Verify Login OTP and Establish Persistent Session
   */
  router.post('/auth/verify-login-otp', async (req, res) => {
    try {
      const { gmail, code, deviceId, userAgent } = req.body;
      if (!gmail || !code) {
        return res.status(400).json({ error: 'សូមបញ្ចូល Gmail និងលេខកូដ OTP!' });
      }

      const cleanGmail = gmail.trim().toLowerCase();
      const cleanCode = code.toString().trim();
      const emailKey = cleanGmail.replace(/[\.\#\$\[\]]/g, '_');

      if (!db) return res.status(500).json({ error: 'ប្រព័ន្ធទិន្នន័យមិនទាន់ភ្ជាប់!' });

      const snap = await db.ref(`email_verifications/${emailKey}`).once('value');
      const vData = snap.val();

      if (!vData) {
        return res.status(404).json({ error: 'មិនមានសំណើផ្ទៀងផ្ទាត់សម្រាប់ Gmail នេះទេ! សូមចុចផ្ញើកូដជាមុនសិន។' });
      }

      if (vData.expiresAt && vData.expiresAt < Date.now()) {
        return res.status(400).json({ error: 'លេខកូដ OTP បានផុតកំណត់ហើយ! សូមស្នើសុំលេខកូដថ្មី។' });
      }

      if (vData.code !== cleanCode) {
        return res.status(400).json({ error: 'លេខកូដ OTP ៦ ខ្ទង់មិនត្រឹមត្រូវទេ!' });
      }

      // Find user by email or auto-create
      let userId = null;
      let userName = vData.fullName || 'Student';
      let pData = {};
      const emailMapSnap = await db.ref(`users_by_email/${emailKey}`).once('value');
      if (emailMapSnap.exists()) {
        userId = emailMapSnap.val();
        const pSnap = await db.ref(`users/${userId}/profile`).once('value');
        pData = pSnap.val() || {};
        if (pData.name) userName = pData.name;
      } else {
        const emailPrefix = cleanGmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'student';
        userId = `web_${emailPrefix}_${Math.random().toString(36).substring(2, 6)}`;
        await db.ref(`users_by_email/${emailKey}`).set(userId);
        await db.ref(`users/${userId}/profile`).set({
          name: userName,
          gmail: cleanGmail,
          gmailVerified: true,
          registeredAt: Date.now(),
          isWebUser: true
        });
      }

      await db.ref(`email_verifications/${emailKey}`).update({ verified: true });

      const isVIP = await checkVIPCrossLinked(userId);
      const yearly = checkYearlyVIP ? await checkYearlyVIP(userId) : { eligible: false };

      const session = await createDeviceSession(userId, deviceId, userAgent || req.headers['user-agent'], req.ip);

      return res.json({
        success: true,
        message: 'ចូលគណនីជោគជ័យ!',
        user: {
          id: userId,
          name: userName,
          khmerName: pData.khmerName || null,
          photoUrl: pData.photoUrl || null,
          phone: pData.phone || null,
          gmail: cleanGmail,
          gmailVerified: true,
          isVIP,
          yearlyEligible: yearly.eligible,
          vipDetails: yearly
        },
        deviceId: session.deviceId,
        sessionToken: session.sessionToken
      });
    } catch (err) {
      console.error('Verify login OTP error:', err);
      res.status(500).json({ error: 'មានបញ្ហាក្នុងការចូលគណនី' });
    }
  });

  /**
   * Google Sign-In / Register Endpoint (Firebase Auth Google Provider)
   */
  router.post('/auth/google', async (req, res) => {
    try {
      let { email, name, photoUrl, googleId, deviceId, userAgent, credential } = req.body;

      // Decode Google Identity Services (GIS) JWT credential if provided
      if (credential && typeof credential === 'string') {
        try {
          const parts = credential.split('.');
          if (parts.length === 3) {
            const jwtPayload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
            if (jwtPayload && jwtPayload.email) {
              email = jwtPayload.email;
              name = jwtPayload.name || name;
              photoUrl = jwtPayload.picture || photoUrl;
              googleId = jwtPayload.sub || googleId;
            }
          }
        } catch (jwtErr) {
          console.warn('Google JWT parse note:', jwtErr.message);
        }
      }

      if (!email) {
        return res.status(400).json({ error: 'សូមជ្រើសរើស ឬបញ្ចូលព័ត៌មាន Email ពីគណនី Google!' });
      }

      const cleanGmail = email.trim().toLowerCase();
      const cleanName = (name || cleanGmail.split('@')[0] || 'Student').trim();
      const emailKey = cleanGmail.replace(/[\.\#\$\[\]]/g, '_');

      if (!db) return res.status(500).json({ error: 'ប្រព័ន្ធទិន្នន័យមិនទាន់ភ្ជាប់!' });

      let userId = null;
      const emailMapSnap = await db.ref(`users_by_email/${emailKey}`).once('value');
      if (emailMapSnap.exists()) {
        userId = emailMapSnap.val();
      } else {
        const emailPrefix = cleanGmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'student';
        userId = `web_${emailPrefix}_${Math.random().toString(36).substring(2, 6)}`;
        await db.ref(`users_by_email/${emailKey}`).set(userId);
      }

      // Save user profile in Firebase with verified Gmail status, preserving existing photo/Khmer name
      const pSnap = await db.ref(`users/${userId}/profile`).once('value');
      const pData = pSnap.val() || {};

      const finalName = pData.name || cleanName;
      const finalPhoto = photoUrl || pData.photoUrl || '';

      const updates = {
        name: finalName,
        gmail: cleanGmail,
        gmailVerified: true,
        googleId: googleId || pData.googleId || '',
        lastWebLogin: Date.now(),
        isWebUser: true,
        authProvider: 'google'
      };
      if (finalPhoto) updates.photoUrl = finalPhoto;
      if (pData.khmerName) updates.khmerName = pData.khmerName;
      if (pData.phone) updates.phone = pData.phone;

      await db.ref(`users/${userId}/profile`).update(updates);

      const isVIP = checkVIP ? await checkVIP(userId) : false;
      const yearly = checkYearlyVIP ? await checkYearlyVIP(userId) : { eligible: false };
      const session = await createDeviceSession(userId, deviceId, userAgent || req.headers['user-agent'], req.ip);

      return res.json({
        success: true,
        message: '🎉 ចូលគណនីតាម Google (Gmail) ជោគជ័យ!',
        user: {
          id: userId,
          name: finalName,
          khmerName: pData.khmerName || null,
          photoUrl: finalPhoto || null,
          phone: pData.phone || null,
          gmail: cleanGmail,
          gmailVerified: true,
          isVIP,
          yearlyEligible: yearly.eligible,
          vipDetails: yearly
        },
        deviceId: session.deviceId,
        sessionToken: session.sessionToken
      });
    } catch (err) {
      console.error('Google auth error:', err);
      res.status(500).json({ error: 'មានបញ្ហាក្នុងការផ្ទៀងផ្ទាត់គណនី Google' });
    }
  });

  /**
   * Request Google Security Confirmation Email
   * Dispatches 1-Click Confirmation Link to student's Gmail
   */
  router.post('/auth/google-start-confirmation', async (req, res) => {
    try {
      let { email, name, photoUrl, googleId, deviceId, userAgent, credential } = req.body;

      if (credential && typeof credential === 'string') {
        try {
          const parts = credential.split('.');
          if (parts.length === 3) {
            const jwtPayload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
            if (jwtPayload && jwtPayload.email) {
              email = jwtPayload.email;
              name = jwtPayload.name || name;
              photoUrl = jwtPayload.picture || photoUrl;
              googleId = jwtPayload.sub || googleId;
            }
          }
        } catch (jwtErr) {}
      }

      if (!email) {
        return res.status(400).json({ error: 'សូមជ្រើសរើស ឬបញ្ចូលព័ត៌មាន Email ពីគណនី Google!' });
      }

      const cleanGmail = email.trim().toLowerCase();
      const cleanName = (name || cleanGmail.split('@')[0] || 'Student').trim();

      if (!cleanGmail.endsWith('@gmail.com')) {
        return res.status(400).json({ error: 'តម្រូវឱ្យប្រើប្រាស់គណនី Gmail (@gmail.com) ប៉ុណ្ណោះ!' });
      }

      if (!db) return res.status(500).json({ error: 'ប្រព័ន្ធទិន្នន័យមិនទាន់ភ្ជាប់!' });

      const token = 'gm_auth_' + crypto.randomBytes(16).toString('hex');
      const baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.WEBAPP_URL || process.env.WebHook_URL || 'https://studyai-bot.onrender.com';
      const confirmUrl = `${baseUrl}/api/auth/confirm-email?token=${token}`;

      await db.ref(`gmail_web_confirmations/${token}`).set({
        token,
        email: cleanGmail,
        name: cleanName,
        photoUrl: photoUrl || '',
        googleId: googleId || '',
        deviceId: deviceId || '',
        userAgent: userAgent || '',
        createdAt: Date.now(),
        expiresAt: Date.now() + 15 * 60 * 1000,
        verified: false
      });

      const mailResult = await sendConfirmEmail({
        toEmail: cleanGmail,
        fullName: cleanName,
        confirmUrl,
        purpose: 'register'
      });

      return res.json({
        success: true,
        token,
        email: cleanGmail,
        name: cleanName,
        delivered: mailResult.delivered,
        message: mailResult.delivered
          ? `✉️ សំបុត្របញ្ជាក់សុវត្ថិភាពត្រូវបានផ្ញើទៅកាន់ ${cleanGmail} រួចរាល់ហើយ! សូមបើក Gmail របស់អ្នក រួចចុចលើ «✅ Confirm» ដើម្បីចូលរៀនភ្លាមៗ។`
          : `⚠️ Server មិនទាន់កំណត់ GMAIL_APP_PASSWORD លើ Render នៅឡើយទេ។`
      });
    } catch (err) {
      console.error('Google request confirm error:', err);
      res.status(500).json({ error: 'មានបញ្ហាក្នុងការផ្ញើសារបញ្ជាក់សុវត្ថិភាព' });
    }
  });

  /**
   * 1-Click Confirm Endpoint from Student's Gmail
   */
  router.get('/auth/confirm-email', async (req, res) => {
    try {
      const { token } = req.query;
      if (!token || !db) {
        return res.status(400).send('Invalid or missing confirmation token');
      }

      const snap = await db.ref(`gmail_web_confirmations/${token}`).once('value');
      const confirmData = snap.val();

      if (!confirmData) {
        return res.status(404).send('<h2 style="font-family:sans-serif; text-align:center; margin-top:50px;">❌ តំណភ្ជាប់បញ្ជាក់សុវត្ថិភាពមិនត្រឹមត្រូវ ឬត្រូវបានប្រើប្រាស់រួចហើយ!</h2>');
      }

      if (confirmData.expiresAt && confirmData.expiresAt < Date.now()) {
        return res.status(400).send('<h2 style="font-family:sans-serif; text-align:center; margin-top:50px;">⏳ តំណភ្ជាប់នេះបានផុតកំណត់ហើយ! សូមស្នើសុំបញ្ជាក់ម្តងទៀត។</h2>');
      }

      const cleanGmail = confirmData.email;
      const cleanName = confirmData.name || cleanGmail.split('@')[0];
      const emailKey = cleanGmail.replace(/[\.\#\$\[\]]/g, '_');

      // Find or create user in Firebase
      let userId = null;
      const emailMapSnap = await db.ref(`users_by_email/${emailKey}`).once('value');
      if (emailMapSnap.exists()) {
        userId = emailMapSnap.val();
      } else {
        const emailPrefix = cleanGmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'student';
        userId = `web_${emailPrefix}_${Math.random().toString(36).substring(2, 6)}`;
        await db.ref(`users_by_email/${emailKey}`).set(userId);
      }

      // Update user profile
      await db.ref(`users/${userId}/profile`).update({
        name: cleanName,
        gmail: cleanGmail,
        gmailVerified: true,
        photoUrl: confirmData.photoUrl || '',
        googleId: confirmData.googleId || '',
        registeredAt: Date.now(),
        lastWebLogin: Date.now(),
        isWebUser: true,
        authProvider: 'google_email_confirm'
      });

      // Mark token as verified
      await db.ref(`gmail_web_confirmations/${token}`).update({
        verified: true,
        userId: userId,
        verifiedAt: Date.now()
      });

      const webUrl = process.env.WEBAPP_URL || process.env.RENDER_EXTERNAL_URL || 'https://studyai-bot.onrender.com';

      const successHtml = `
<!DOCTYPE html>
<html lang="km">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>✅ បញ្ជាក់សុវត្ថិភាព Google (Gmail) ជោគជ័យ - Teacher SSOnline</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;600;700;800&family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: radial-gradient(circle at 50% 20%, #172554, #0b0f19);
      color: #ffffff;
      font-family: 'Kantumruy Pro', 'Outfit', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background: rgba(19, 27, 46, 0.95);
      border: 1px solid rgba(2, 132, 199, 0.3);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      border-radius: 24px;
      max-width: 520px;
      width: 100%;
      padding: 40px 30px;
      text-align: center;
    }
    .icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(2, 132, 199, 0.2));
      border: 2px solid #10b981;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 38px;
      margin: 0 auto 24px;
      box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
    }
    h1 { font-size: 24px; font-weight: 800; color: #f8fafc; margin-bottom: 12px; }
    p { font-size: 15px; color: #94a3b8; line-height: 1.6; margin-bottom: 24px; }
    .badge {
      display: inline-block;
      background: rgba(2, 132, 199, 0.15);
      border: 1px solid rgba(2, 132, 199, 0.4);
      color: #38bdf8;
      padding: 6px 16px;
      border-radius: 999px;
      font-size: 14px;
      margin-bottom: 20px;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #0284c7, #2563eb);
      color: #ffffff;
      padding: 16px 36px;
      border-radius: 14px;
      font-size: 16px;
      font-weight: 700;
      text-decoration: none;
      box-shadow: 0 10px 25px rgba(2, 132, 199, 0.4);
      transition: transform 0.2s;
    }
    .btn:hover { transform: translateY(-2px); }
    .note { font-size: 13px; color: #64748b; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">✅</div>
    <h1>ការផ្ទៀងផ្ទាត់ជោគជ័យ! 🎉</h1>
    <div class="badge">✉️ ${cleanGmail}</div>
    <p>សួស្តី <strong>${cleanName}</strong>! គណនីរបស់អ្នកត្រូវបានបញ្ជាក់ (Confirm) តាមរយៈប្រព័ន្ធសុវត្ថិភាព Google (Gmail) រួចរាល់ហើយ។ ផ្ទាំង Browser ដើមរបស់អ្នកកំពុងចូលរៀនដោយស្វ័យប្រវត្ត។</p>
    <a href="${webUrl}" class="btn">🌐 ចូលរៀនលើវេបសាយភ្លាមៗ</a>
    <div class="note">អ្នកអាចបិទផ្ទាំងនេះបាន ហើយត្រឡប់ទៅកាន់ Browser ដើមវិញ។</div>
  </div>
  <script>
    setTimeout(() => { window.location.href = '${webUrl}'; }, 3000);
  </script>
</body>
</html>
      `;

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.send(successHtml);
    } catch (err) {
      console.error('Confirm email error:', err);
      res.status(500).send('Error confirming email');
    }
  });

  /**
   * Check Status of Gmail Confirmation (for waiting modal polling)
   */
  router.get('/auth/confirm-email/status', async (req, res) => {
    try {
      const { token, deviceId } = req.query;
      if (!token || !db) return res.status(400).json({ error: 'Missing token' });

      const snap = await db.ref(`gmail_web_confirmations/${token}`).once('value');
      const data = snap.val();

      if (!data) return res.status(404).json({ error: 'Token not found' });
      if (data.expiresAt && data.expiresAt < Date.now()) {
        return res.status(400).json({ error: 'Token expired' });
      }

      if (data.verified && data.userId) {
        const userId = data.userId.toString();
        const userSnap = await db.ref(`users/${userId}`).once('value');
        const userData = userSnap.val() || {};
        const profile = userData.profile || {};

        const isVIP = checkVIP ? await checkVIP(userId) : false;
        const yearly = checkYearlyVIP ? await checkYearlyVIP(userId) : { eligible: false };

        const session = await createDeviceSession(userId, deviceId, req.headers['user-agent'], req.ip);

        // Remove token after consumption
        await db.ref(`gmail_web_confirmations/${token}`).remove();

        return res.json({
          success: true,
          verified: true,
          user: {
            id: userId,
            name: profile.name || data.name,
            khmerName: profile.khmerName || null,
            photoUrl: profile.photoUrl || null,
            phone: profile.phone || null,
            gmail: profile.gmail || data.email,
            isTelegram: !!userData.telegramId,
            isVIP,
            yearlyEligible: yearly.eligible,
            vipDetails: yearly
          },
          deviceId: session.deviceId,
          sessionToken: session.sessionToken
        });
      }

      return res.json({ success: true, verified: false });
    } catch (err) {
      console.error('Confirm email status error:', err);
      res.status(500).json({ error: 'Status check error' });
    }
  });

  /**
   * Public Firebase Auth Config for Web Client
   */
  router.get('/auth/firebase-config', (req, res) => {
    try {
      let projectId = process.env.FIREBASE_PROJECT_ID || 'studyai-bot';
      if (process.env.FIREBASE_CREDENTIALS) {
        try {
          const creds = JSON.parse(process.env.FIREBASE_CREDENTIALS);
          if (creds && creds.project_id) projectId = creds.project_id;
        } catch (e) {}
      }
      return res.json({
        success: true,
        projectId,
        authDomain: `${projectId}.firebaseapp.com`,
        databaseURL: process.env.FIREBASE_DB_URL || `https://${projectId}-default-rtdb.firebaseio.com`,
        apiKey: process.env.FIREBASE_API_KEY || ''
      });
    } catch (e) {
      return res.json({ success: false });
    }
  });

  /**
   * Validate Session & Device Status
   * If device is revoked, browser will be instructed to forget account and logout!
   */
  router.get('/auth/check-session', async (req, res) => {
    try {
      const { userId, deviceId, sessionToken } = req.query;

      if (!userId || !deviceId || !sessionToken) {
        return res.json({ valid: false, reason: 'missing_params' });
      }

      if (!db) return res.status(500).json({ error: 'Database disconnected' });

      const sessionSnap = await db.ref(`users/${userId}/sessions/${deviceId}`).once('value');
      const session = sessionSnap.val();

      if (!session) {
        return res.json({
          valid: false,
          reason: 'revoked',
          message: 'ឧបករណ៍ (Browser) នេះត្រូវបានផ្តាច់ចេញពីគណនីរួចហើយ!'
        });
      }

      if (session.revoked) {
        return res.json({
          valid: false,
          reason: 'revoked',
          message: 'ឧបករណ៍ (Browser) នេះត្រូវបានផ្តាច់ចេញពីគណនីរួចហើយ!'
        });
      }

      if (session.sessionToken !== sessionToken) {
        return res.json({
          valid: false,
          reason: 'invalid_token',
          message: 'Session Token មិនត្រឹមត្រូវទេ!'
        });
      }

      // Update last active
      await db.ref(`users/${userId}/sessions/${deviceId}`).update({
        lastActive: Date.now()
      });

      return res.json({ valid: true });
    } catch (err) {
      console.error('Check session error:', err);
      res.status(500).json({ error: 'Error checking session' });
    }
  });

  /**
   * List all Active Logged-in Devices for Current User
   */
  router.get('/auth/devices/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { currentDeviceId } = req.query;

      if (!userId) return res.status(400).json({ error: 'Missing userId' });
      if (!db) return res.status(500).json({ error: 'Database disconnected' });

      const snap = await db.ref(`users/${userId}/sessions`).once('value');
      const sessions = snap.val() || {};

      const devices = Object.values(sessions)
        .filter(s => !s.revoked)
        .map(s => ({
          deviceId: s.deviceId,
          deviceName: s.deviceName || 'Web Browser',
          ip: s.ip || 'Unknown IP',
          createdAt: s.createdAt,
          lastActive: s.lastActive,
          isCurrent: s.deviceId === currentDeviceId
        }))
        .sort((a, b) => (b.lastActive || 0) - (a.lastActive || 0));

      return res.json({
        success: true,
        devices
      });
    } catch (err) {
      console.error('List devices error:', err);
      res.status(500).json({ error: 'Error listing devices' });
    }
  });

  /**
   * Revoke (Disconnect) a specific Device — Secure Version
   * Requires sessionToken of the CALLER to prevent unauthorized revocation
   */
  router.post('/auth/revoke-device', async (req, res) => {
    try {
      const { userId, targetDeviceId, sessionToken, callerDeviceId } = req.body;

      if (!userId || !targetDeviceId) {
        return res.status(400).json({ error: 'Missing userId or targetDeviceId' });
      }

      if (!db) return res.status(500).json({ error: 'Database disconnected' });

      // ── Security: Verify caller's session if token provided ───────
      if (sessionToken && callerDeviceId) {
        const callerSnap = await db.ref(`users/${userId}/sessions/${callerDeviceId}`).once('value');
        const callerSession = callerSnap.val();
        if (!callerSession || callerSession.revoked || callerSession.sessionToken !== sessionToken) {
          return res.status(401).json({ error: '❌ Session Token មិនត្រឹមត្រូវ! មិនអាចផ្តាច់ឧបករណ៍ផ្សេងបាន។' });
        }
        // Prevent revoking own current device
        if (targetDeviceId === callerDeviceId) {
          return res.status(400).json({ error: 'មិនអាចផ្តាច់ឧបករណ៍ដែលអ្នកកំពុងប្រើ! សូម Logout ជំនួសវិញ។' });
        }
      }

      // ── Mark revoked in Firebase ──────────────────────────────────
      await db.ref(`users/${userId}/sessions/${targetDeviceId}`).update({
        revoked: true,
        revokedAt: Date.now(),
        revokedByDevice: callerDeviceId || 'unknown'
      });

      return res.json({
        success: true,
        message: '✅ ឧបករណ៍នេះត្រូវបានផ្តាច់ចេញពីគណនីជោគជ័យ!'
      });
    } catch (err) {
      console.error('Revoke device error:', err);
      res.status(500).json({ error: 'Error revoking device' });
    }
  });

  /**
   * Revoke ALL Other Devices (Logout Everywhere Else)
   */
  router.post('/auth/revoke-all-devices', async (req, res) => {
    try {
      const { userId, sessionToken, callerDeviceId } = req.body;

      if (!userId || !sessionToken || !callerDeviceId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      if (!db) return res.status(500).json({ error: 'Database disconnected' });

      // Verify caller session
      const callerSnap = await db.ref(`users/${userId}/sessions/${callerDeviceId}`).once('value');
      const callerSession = callerSnap.val();
      if (!callerSession || callerSession.revoked || callerSession.sessionToken !== sessionToken) {
        return res.status(401).json({ error: '❌ Session Token មិនត្រឹមត្រូវ!' });
      }

      // Revoke all sessions EXCEPT caller
      const allSnap = await db.ref(`users/${userId}/sessions`).once('value');
      const allSessions = allSnap.val() || {};
      const updates = {};
      let revokedCount = 0;

      for (const [devId, sess] of Object.entries(allSessions)) {
        if (devId !== callerDeviceId && !sess.revoked) {
          updates[`${devId}/revoked`] = true;
          updates[`${devId}/revokedAt`] = Date.now();
          updates[`${devId}/revokedByDevice`] = callerDeviceId;
          revokedCount++;
        }
      }

      if (revokedCount > 0) {
        await db.ref(`users/${userId}/sessions`).update(updates);
      }

      return res.json({
        success: true,
        revokedCount,
        message: `✅ បានផ្តាច់ ${revokedCount} ឧបករណ៍ផ្សេងៗទៀតចេញពីគណនី!`
      });
    } catch (err) {
      console.error('Revoke all devices error:', err);
      res.status(500).json({ error: 'Error revoking all devices' });
    }
  });

  /**
   * Full Registration with Username, Password & Gmail (Legacy / Alternative)
   */
  router.post('/auth/register', async (req, res) => {

    try {
      const { username, password, fullName, gmail, syncCode, deviceId, userAgent } = req.body;

      if (!username || !password || !fullName || !gmail) {
        return res.status(400).json({ error: 'សូមបំពេញព័ត៌មានទាំងអស់ (ឈ្មោះពេញ, Username, Password, Gmail)!' });
      }

      const cleanUser = username.trim().toLowerCase();
      const cleanGmail = gmail.trim().toLowerCase();
      const cleanName = fullName.trim();

      if (!/^[a-zA-Z0-9_]{3,25}$/.test(cleanUser)) {
        return res.status(400).json({ error: 'Username ត្រូវតែមាន 3 ដល់ 25 តួអក្សរ (អក្សរអង់គ្លេស ឬលេខ)!' });
      }

      if (password.length < 4) {
        return res.status(400).json({ error: 'Password ត្រូវមានយ៉ាងតិច 4 តួអក្សរឡើងទៅ!' });
      }

      if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(cleanGmail)) {
        return res.status(400).json({ error: 'តម្រូវឱ្យភ្ជាប់ជាមួយគណនី Gmail (@gmail.com) ត្រឹមត្រូវប៉ុណ្ណោះ!' });
      }

      if (!db) {
        return res.status(500).json({ error: 'ប្រព័ន្ធទិន្នន័យមិនទាន់ភ្ជាប់!' });
      }

      const userSnap = await db.ref(`web_users/${cleanUser}`).once('value');
      if (userSnap.exists()) {
        return res.status(400).json({ error: `Username "${cleanUser}" នេះមានអ្នកប្រើរួចហើយ! សូមជ្រើសរើស Username ផ្សេង។` });
      }

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
      const effectiveUserId = linkedTelegramId || webUserId;

      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      const emailKey = cleanGmail.replace(/[\.\#\$\[\]]/g, '_');

      await db.ref(`email_verifications/${emailKey}`).set({
        code: verifyCode,
        gmail: cleanGmail,
        username: cleanUser,
        fullName: cleanName,
        userId: effectiveUserId,
        createdAt: Date.now(),
        expiresAt: Date.now() + 15 * 60 * 1000,
        verified: false
      });

      // Send OTP to Gmail
      const mailResult = await sendOtpEmail({
        toEmail: cleanGmail,
        fullName: cleanName,
        otpCode: verifyCode,
        purpose: 'register'
      });

      const record = {
        username: cleanUser,
        fullName: cleanName,
        gmail: cleanGmail,
        passwordHash: passwordHashed,
        userId: webUserId,
        createdAt: Date.now(),
        gmailVerified: false,
        linkedTelegramId
      };

      await db.ref(`web_users/${cleanUser}`).set(record);
      await db.ref(`users_by_email/${emailKey}`).set(effectiveUserId);

      await db.ref(`users/${effectiveUserId}/profile`).update({
        name: cleanName,
        username: cleanUser,
        gmail: cleanGmail,
        registeredAt: Date.now(),
        isWebUser: true,
        gmailVerified: false,
        linkedTelegramId
      });

      const isVIP = await checkVIPCrossLinked(effectiveUserId);
      const session = await createDeviceSession(effectiveUserId, deviceId, userAgent || req.headers['user-agent'], req.ip);

      return res.json({
        success: true,
        requiresVerification: true,
        message: 'គណនី Gmail ត្រូវបានចុះឈ្មោះ! សូមផ្ទៀងផ្ទាត់លេខកូដ OTP ៦ ខ្ទង់ដែលបានផ្ញើទៅ Gmail។',
        verificationCode: mailResult.delivered ? null : verifyCode,
        user: {
          id: effectiveUserId,
          name: cleanName,
          username: cleanUser,
          gmail: cleanGmail,
          gmailVerified: false,
          isTelegram: !!linkedTelegramId,
          linkedTelegramId,
          isVIP
        },
        deviceId: session.deviceId,
        sessionToken: session.sessionToken
      });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ error: 'មានបញ្ហាក្នុងការចុះឈ្មោះ សូមព្យាយាមម្តងទៀត' });
    }
  });

  /**
   * Verify Email with 6-digit Code
   */
  router.post('/auth/verify-email-code', async (req, res) => {
    try {
      const { gmail, code } = req.body;
      if (!gmail || !code) {
        return res.status(400).json({ error: 'សូមបញ្ចូល Email និងលេខកូដផ្ទៀងផ្ទាត់ ៦ ខ្ទង់!' });
      }

      const cleanGmail = gmail.trim().toLowerCase();
      const cleanCode = code.toString().trim();
      const emailKey = cleanGmail.replace(/[\.\#\$\[\]]/g, '_');

      if (!db) return res.status(500).json({ error: 'ប្រព័ន្ធទិន្នន័យមិនទាន់ភ្ជាប់!' });

      const snap = await db.ref(`email_verifications/${emailKey}`).once('value');
      const vData = snap.val();

      if (!vData) {
        return res.status(404).json({ error: 'មិនមានសំណើផ្ទៀងផ្ទាត់សម្រាប់ Gmail នេះទេ!' });
      }

      if (vData.expiresAt && vData.expiresAt < Date.now()) {
        return res.status(400).json({ error: 'លេខកូដផ្ទៀងផ្ទាត់បានផុតកំណត់ហើយ! សូមស្នើសុំកូដថ្មី។' });
      }

      if (vData.code !== cleanCode) {
        return res.status(400).json({ error: 'លេខកូដផ្ទៀងផ្ទាត់ ៦ ខ្ទង់មិនត្រឹមត្រូវទេ!' });
      }

      await db.ref(`email_verifications/${emailKey}`).update({
        verified: true,
        verifiedAt: Date.now()
      });

      if (vData.username) {
        await db.ref(`web_users/${vData.username}`).update({
          gmailVerified: true,
          emailVerifiedAt: Date.now()
        });
      }

      if (vData.userId) {
        await db.ref(`users/${vData.userId}/profile`).update({
          gmailVerified: true,
          emailVerifiedAt: Date.now()
        });
      }

      return res.json({
        success: true,
        message: '✅ គណនី Gmail ត្រូវបានផ្ទៀងផ្ទាត់ជោគជ័យ!'
      });
    } catch (err) {
      console.error('Verify email code error:', err);
      res.status(500).json({ error: 'មានបញ្ហាក្នុងការផ្ទៀងផ្ទាត់ Email' });
    }
  });

  /**
   * Resend Email Verification Code
   */
  router.post('/auth/resend-email-code', async (req, res) => {
    try {
      const { gmail } = req.body;
      if (!gmail) return res.status(400).json({ error: 'Missing gmail' });

      const cleanGmail = gmail.trim().toLowerCase();
      const emailKey = cleanGmail.replace(/[\.\#\$\[\]]/g, '_');

      if (!db) return res.status(500).json({ error: 'ប្រព័ន្ធទិន្នន័យមិនទាន់ភ្ជាប់!' });

      const snap = await db.ref(`email_verifications/${emailKey}`).once('value');
      const vData = snap.val() || {};

      const newCode = Math.floor(100000 + Math.random() * 900000).toString();

      await db.ref(`email_verifications/${emailKey}`).update({
        code: newCode,
        createdAt: Date.now(),
        expiresAt: Date.now() + 15 * 60 * 1000,
        verified: false
      });

      const mailResult = await sendOtpEmail({
        toEmail: cleanGmail,
        fullName: vData.fullName || 'Student',
        otpCode: newCode,
        purpose: 'register'
      });

      return res.json({
        success: true,
        message: 'លេខកូដផ្ទៀងផ្ទាត់ថ្មីត្រូវបានផ្ញើទៅកាន់ Gmail!',
        verificationCode: mailResult.delivered ? null : newCode
      });
    } catch (err) {
      console.error('Resend email error:', err);
      res.status(500).json({ error: 'Failed to resend code' });
    }
  });

  /**
   * Check Email Verification Status
   */
  router.get('/auth/email-status/:gmail', async (req, res) => {
    try {
      const cleanGmail = (req.params.gmail || '').trim().toLowerCase();
      const emailKey = cleanGmail.replace(/[\.\#\$\[\]]/g, '_');

      if (!db) return res.status(500).json({ error: 'Database disconnected' });

      const snap = await db.ref(`email_verifications/${emailKey}`).once('value');
      const vData = snap.val();

      return res.json({
        success: true,
        verified: !!(vData && vData.verified),
        hasPendingCode: !!(vData && !vData.verified && vData.expiresAt > Date.now())
      });
    } catch (err) {
      res.status(500).json({ error: 'Error checking status' });
    }
  });

  /**
   * Login with Username & Password
   */
  router.post('/auth/login', async (req, res) => {
    try {
      const { username, password, deviceId, userAgent } = req.body;
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

      const effectiveUserId = account.linkedTelegramId || account.userId;
      const isVIP = checkVIP ? await checkVIP(effectiveUserId) : false;
      const yearly = checkYearlyVIP ? await checkYearlyVIP(effectiveUserId) : { eligible: false };

      const session = await createDeviceSession(effectiveUserId, deviceId, userAgent || req.headers['user-agent'], req.ip);

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
          isAdmin: await isUserAdmin(effectiveUserId),
          yearlyEligible: yearly.eligible,
          vipDetails: yearly
        },
        deviceId: session.deviceId,
        sessionToken: session.sessionToken
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
      const { code, currentUserId, deviceId, userAgent } = req.body;
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

      if (currentUserId && currentUserId.startsWith('web_')) {
        const username = currentUserId.replace('web_', '');
        await db.ref(`web_users/${username}`).update({
          linkedTelegramId: telegramUserId,
          linkedAt: Date.now()
        });
      }

      // Remove used sync code
      await db.ref(`sync_codes/${cleanCode}`).remove();

      const tgSnap = await db.ref(`users/${telegramUserId}`).once('value');
      const tgData = tgSnap.val() || {};
      const tgProfile = tgData.profile || {};

      const isVIP = checkVIP ? await checkVIP(telegramUserId) : false;
      const yearly = checkYearlyVIP ? await checkYearlyVIP(telegramUserId) : { eligible: false };

      const session = await createDeviceSession(telegramUserId, deviceId, userAgent || req.headers['user-agent'], req.ip);

      return res.json({
        success: true,
        message: 'ភ្ជាប់គណនី Telegram ដោយជោគជ័យ! ទិន្នន័យទាំងអស់ត្រូវបាន Sync ជាមួយគ្នា។',
        user: {
          id: telegramUserId,
          name: tgProfile.name || syncData.name || `User ${telegramUserId}`,
          username: syncData.username || tgProfile.username || '',
          khmerName: tgProfile.khmerName || null,
          photoUrl: tgProfile.photoUrl || tgProfile.avatar || null,
          phone: tgProfile.phone || null,
          isTelegram: true,
          isVIP,
          isAdmin: await isUserAdmin(telegramUserId),
          yearlyEligible: yearly.eligible,
          vipDetails: yearly,
          completedLessonsCount: Object.keys(tgData.completed_lessons || {}).length,
          certificatesCount: Object.keys(tgData.subject_certifications || {}).length
        },
        deviceId: session.deviceId,
        sessionToken: session.sessionToken
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
          khmerName: profile.khmerName || null,
          photoUrl: profile.photoUrl || profile.avatar || null,
          phone: profile.phone || null,
          username: profile.username || '',
          gmail: profile.gmail || null,
          isAdmin: await isUserAdmin(userId),
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

  router.post('/user/profile/update', async (req, res) => {
    try {
      const { userId, name, khmerName, photoUrl, phone } = req.body;
      if (!userId) return res.status(400).json({ error: 'Missing userId' });
      if (!name || !name.trim()) return res.status(400).json({ error: 'សូមបញ្ចូលឈ្មោះពេញរបស់សិស្ស' });

      if (!db) return res.status(500).json({ error: 'Database disconnected' });

      const updates = {
        name: name.trim(),
        updatedAt: Date.now()
      };
      if (khmerName !== undefined) updates.khmerName = (khmerName || '').trim();
      if (photoUrl !== undefined) updates.photoUrl = photoUrl || null;
      if (phone !== undefined) updates.phone = (phone || '').trim();

      await db.ref(`users/${userId}/profile`).update(updates);

      const snap = await db.ref(`users/${userId}/profile`).once('value');
      const updatedProfile = snap.val() || {};

      return res.json({
        success: true,
        message: 'បានរក្សាទុកព័ត៌មាន និងរូបថតសិស្សដោយជោគជ័យ!',
        user: {
          id: userId,
          name: updatedProfile.name || name.trim(),
          khmerName: updatedProfile.khmerName || null,
          photoUrl: updatedProfile.photoUrl || null,
          phone: updatedProfile.phone || null
        }
      });
    } catch (err) {
      console.error('Update profile error:', err);
      res.status(500).json({ error: 'បរាជ័យក្នុងការរក្សាទុកព័ត៌មានសិស្ស' });
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

      // Beginner Course taught by Teacher Piseth (អ្នកគ្រូពិសិដ្ឋ)
      const summaryBeginner = {
        id: beginnerCourse.id,
        title: beginnerCourse.title,
        teacher: beginnerCourse.teacher,
        weeksCount: beginnerCourse.weeks.length,
        weeks: beginnerCourse.weeks.map(w => ({
          id: w.id,
          title: w.title,
          description: w.description,
          lessonsCount: w.lessons.length,
          lessons: w.lessons.map(l => ({
            id: l.id,
            title: l.title
          }))
        }))
      };

      res.json({ success: true, months: summaryMonths, beginner: summaryBeginner });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch curriculum' });
    }
  });

  function extractYouTubeVideoId(url) {
    if (!url || typeof url !== 'string') return null;
    const clean = url.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) return clean;
    const m1 = clean.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (m1) return m1[1];
    const m2 = clean.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (m2) return m2[1];
    const m3 = clean.match(/embed\/([a-zA-Z0-9_-]{11})/);
    if (m3) return m3[1];
    const m4 = clean.match(/shorts\/([a-zA-Z0-9_-]{11})/);
    if (m4) return m4[1];
    return null;
  }

  router.get('/lesson/:monthId/:weekId/:lessonId', async (req, res) => {
    try {
      const { monthId, weekId, lessonId } = req.params;
      
      let month = null;
      let isBeginner = false;

      if (monthId === 'beginner' || monthId === 'm0') {
        isBeginner = true;
        month = beginnerCourse;
      } else {
        month = curriculum.months.find(m => m.id === monthId);
      }

      if (!month) return res.status(404).json({ error: 'Month not found' });

      const week = month.weeks.find(w => w.id === weekId);
      if (!week) return res.status(404).json({ error: 'Week not found' });

      const lesson = week.lessons.find(l => l.id === lessonId);
      if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

      // Fetch saved video if available from Firebase Realtime Database
      let videoData = null;
      if (db) {
        try {
          const videoKey = `${monthId}_${weekId}_${lessonId}`;
          const vSnap = await db.ref(`curriculum_videos/${videoKey}`).once('value');
          videoData = vSnap.val();
        } catch (e) {
          console.warn('Error reading video data:', e.message);
        }
      }

      res.json({
        success: true,
        isBeginner,
        teacher: isBeginner ? beginnerCourse.teacher : {
          id: 'sorn',
          name: 'គ្រូសន',
          englishName: 'Teacher Sorn',
          avatar: '👨‍🏫',
          role: 'នាយកវិទ្យាស្ថាន & គ្រូបង្រៀនភាសាអង់គ្លេសទូទៅ'
        },
        month: { id: month.id, title: month.title },
        week: { id: week.id, title: week.title },
        lesson: {
          id: lesson.id,
          title: lesson.title,
          content: lesson.content,
          video: videoData ? { videoId: videoData.videoId, updatedAt: videoData.updatedAt } : null
        }
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch lesson' });
    }
  });

  // Admin Only Endpoint: Add / Update / Delete Lesson Video
  router.post('/lesson/video/update', async (req, res) => {
    try {
      const { userId, monthId, weekId, lessonId, youtubeUrl, action } = req.body;
      if (!userId) return res.status(401).json({ error: 'សូមចូលគណនីជា Admin ជាមុនសិន' });

      // Strict Admin Permission Check
      const adminAuthorized = await isUserAdmin(userId);
      if (!adminAuthorized) {
        return res.status(403).json({ error: '⛔ អ្នកគ្មានសិទ្ធិជា Admin ក្នុងការបញ្ចូល ឬកែប្រែវីដេអូទេ!' });
      }

      if (!monthId || !weekId || !lessonId) {
        return res.status(400).json({ error: 'Missing lesson parameters' });
      }

      if (!db) return res.status(500).json({ error: 'Database disconnected' });

      const videoKey = `${monthId}_${weekId}_${lessonId}`;

      // If action is delete
      if (action === 'delete' || !youtubeUrl || !youtubeUrl.trim()) {
        await db.ref(`curriculum_videos/${videoKey}`).remove();
        return res.json({
          success: true,
          message: 'បានលុបវីដេអូចេញពីមេរៀននេះដោយជោគជ័យ!',
          video: null
        });
      }

      const videoId = extractYouTubeVideoId(youtubeUrl);
      if (!videoId) {
        return res.status(400).json({ error: 'Link YouTube មិនត្រឹមត្រូវ! សូមពិនិត្យមើល Link ម្តងទៀត (ឧ. https://youtu.be/... ឬ https://youtube.com/watch?v=...)' });
      }

      const videoData = {
        videoId,
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
        updatedAt: Date.now(),
        updatedBy: userId
      };

      await db.ref(`curriculum_videos/${videoKey}`).set(videoData);

      return res.json({
        success: true,
        message: 'បានបញ្ចូល និងរក្សាទុកវីដេអូបង្រៀនដោយជោគជ័យ!',
        video: { videoId: videoData.videoId, updatedAt: videoData.updatedAt }
      });
    } catch (err) {
      console.error('Update lesson video error:', err);
      res.status(500).json({ error: 'បរាជ័យក្នុងការរក្សាទុកវីដេអូ' });
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
   * Get Quiz Questions (Lesson, Annual Exam, or Beginner Final Exam)
   */
  router.get('/quiz/start', async (req, res) => {
    try {
      const { type, monthId, weekId, lessonId, subjectKey, userId } = req.query;
      let rawQuestions = [];
      let quizTitle = '';

      // ============================================================
      // ADMIN BYPASS: Admins skip ALL sequential lock checks
      // ============================================================
      const callerIsAdmin = userId ? await isUserAdmin(userId) : false;

      if (type === 'beginner_final') {
        // Beginner Final Exam (20 questions covering all 26 letters A-Z)
        // Strictly verify that student has passed all 26 lessons (bl1 to bl26)
        // ADMIN BYPASS: Admin can take the final exam without prerequisites
        if (userId && db && !callerIsAdmin) {
          const userSnap = await db.ref(`users/${userId}`).once('value');
          const userData = userSnap.val() || {};
          const completed = userData.completed_lessons || {};

          let passedLessons = 0;
          for (let i = 1; i <= 26; i++) {
            const lid = `bl${i}`;
            const hasPassed = Object.entries(completed).some(([k, v]) => {
              return k.includes(`-${lid}`) && (v.isPassed || ['A', 'B', 'C'].includes(v.grade) || (v.percent && v.percent >= 70));
            });
            if (hasPassed) passedLessons++;
          }

          if (passedLessons < 26) {
            return res.status(403).json({
              error: `🔒 អ្នកត្រូវប្រឡងជាប់គ្រប់ ២៦ ថ្ងៃនៃថ្នាក់ដំបូងជាមុនសិន ទើបមានសិទ្ធិប្រឡងបញ្ចប់! (បច្ចុប្បន្នជាប់ ${passedLessons}/26 ថ្ងៃ, នៅខ្វះ ${26 - passedLessons} ថ្ងៃទៀត។ បើធ្លាក់តែ១មេរៀន គឺគ្មានសិទ្ធិប្រឡងបញ្ចប់ឡើយ)`,
              isLocked: true,
              passedCount: passedLessons,
              totalRequired: 26
            });
          }
        }

        rawQuestions = generateBeginnerFinalExam();
        quizTitle = 'ការប្រឡងបញ្ចប់ថ្នាក់ដំបូង (Beginner Final Graduation Exam)';
      } else if (type === 'annual') {
        if (!SUBJECT_EXAMS[subjectKey]) {
          return res.status(400).json({ error: 'Invalid annual subject key' });
        }

        // Yearly VIP check if userId provided
        // ADMIN BYPASS: Admin can take annual exams freely
        if (userId && checkYearlyVIP && !callerIsAdmin) {
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
        // Lesson quiz (Standard Curriculum or Beginner Course)
        let qList = [];
        let l = null;
        if (monthId === 'beginner' || monthId === 'm0') {
          // Sequential unlock check for Beginner Lesson: Day N requires Day N-1 passed!
          // ADMIN BYPASS: Admin can access any beginner lesson directly
          const lessonNum = parseInt((lessonId || '').replace('bl', ''));
          if (lessonNum > 1 && userId && db && !callerIsAdmin) {
            const prevLessonId = `bl${lessonNum - 1}`;
            const userSnap = await db.ref(`users/${userId}`).once('value');
            const userData = userSnap.val() || {};
            const completed = userData.completed_lessons || {};
            const prevPassed = Object.entries(completed).some(([k, v]) => {
              return k.includes(`-${prevLessonId}`) && (v.isPassed || ['A', 'B', 'C'].includes(v.grade) || (v.percent && v.percent >= 70));
            });
            if (!prevPassed) {
              return res.status(403).json({
                error: `🔒 សូមប្រឡងជាប់មេរៀនថ្ងៃទី ${lessonNum - 1} ជាមុនសិន ទើបអាចចូលប្រឡងមេរៀនថ្ងៃទី ${lessonNum} បាន!`,
                isLocked: true
              });
            }
          }

          const w = beginnerCourse.weeks.find(w => w.id === weekId);
          l = w?.lessons.find(l => l.id === lessonId);
          qList = l ? generateQuiz(l) : [];
        } else {
          // ============================================================
          // SEQUENTIAL LOCK FOR STANDARD 12-MONTH COURSE
          // A lesson is locked unless the previous lesson in the global
          // curriculum order has been passed by this user.
          // ADMIN BYPASS: Admin can access any lesson directly
          // ============================================================
          if (userId && db && monthId && weekId && lessonId && !callerIsAdmin) {
            // Build global ordered list: [{key: 'm1-w1-l1'}, ...]
            const globalOrder = [];
            if (curriculum && curriculum.months) {
              for (const m of curriculum.months) {
                for (const w of m.weeks || []) {
                  for (const lsn of w.lessons || []) {
                    globalOrder.push({ key: `${m.id}-${w.id}-${lsn.id}`, mId: m.id, wId: w.id, lId: lsn.id, title: lsn.title });
                  }
                }
              }
            }

            const currentKey = `${monthId}-${weekId}-${lessonId}`;
            const currentIdx = globalOrder.findIndex(x => x.key === currentKey);

            // Only lock if it's not the very first lesson
            if (currentIdx > 0) {
              const prevLesson = globalOrder[currentIdx - 1];
              const userSnap = await db.ref(`users/${userId}/completed_lessons/${prevLesson.key}`).once('value');
              const prevData = userSnap.val();
              const prevPassed = prevData && (prevData.isPassed || ['A', 'B', 'C'].includes(prevData.grade) || (prevData.percent && prevData.percent >= 70));

              if (!prevPassed) {
                return res.status(403).json({
                  error: `🔒 ត្រូវប្រឡងជាប់មេរៀន "${prevLesson.title}" ជាមុនសិន ទើបអាចចូលប្រឡងមេរៀននេះបាន!`,
                  isLocked: true,
                  prevLessonKey: prevLesson.key,
                  prevLessonTitle: prevLesson.title
                });
              }
            }
          }

          qList = generateQuiz(curriculum, monthId, weekId, lessonId);
          const m = curriculum.months.find(m => m.id === monthId);
          const w = m?.weeks.find(w => w.id === weekId);
          l = w?.lessons.find(l => l.id === lessonId);
        }
        rawQuestions = qList || [];
        quizTitle = l ? l.title : 'Lesson Quiz';
      }

      if (!rawQuestions || rawQuestions.length === 0) {
        return res.status(404).json({ error: 'មិនអាចបង្កើតសំណួរសម្រាប់មេរៀននេះបានទេ' });
      }

      // Robustly normalize raw questions
      const normalizedQuestions = rawQuestions.map(q => {
        const questionText = q.question || q.q || '';
        let optionsList = q.options || q.c || [];
        if (q.c && Array.isArray(q.c)) {
          optionsList = q.c.map(c => (typeof c === 'string' ? c.replace(/^[A-D]\)\s*/, '') : c));
        }
        let correctIdx = 0;
        if (typeof q.correct === 'number') {
          correctIdx = q.correct;
        } else if (q.a) {
          correctIdx = ['A', 'B', 'C', 'D'].indexOf(q.a);
          if (correctIdx === -1) correctIdx = 0;
        } else if (q.answer && Array.isArray(optionsList)) {
          correctIdx = optionsList.indexOf(q.answer);
          if (correctIdx === -1) correctIdx = 0;
        }
        return {
          question: questionText,
          options: optionsList,
          correct: correctIdx,
          explanation: q.explanation || ''
        };
      });

      // Create a quiz session with question ID and without sending correct answers to client
      const sessionId = 'qs_' + Math.random().toString(36).substring(2, 10);
      const safeQuestions = normalizedQuestions.map((q, idx) => ({
        id: idx,
        question: q.question,
        options: q.options
      }));

      // Store in memory for secure verification
      activeQuizSessions.set(sessionId, {
        rawQuestions: normalizedQuestions,
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
        total: normalizedQuestions.length,
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

      // For 1-question beginner daily quiz: must be 1/1 (100%) to pass!
      const isPassed = total === 1 ? score === 1 : ['A', 'B', 'C'].includes(grade);
      const isAnnualExam = type === 'annual';
      const isBeginnerFinal = type === 'beginner_final';

      let certId = null;
      let certData = null;

      if (isPassed && db) {
        const effectiveName = studentName || `សិស្ស ID ${userId}`;
        const dateStr = new Date().toLocaleDateString('km-KH');

        try {
          if (isBeginnerFinal) {
            // Beginner Final Graduation Exam: issue official Graduation Certificate
            const prevSnap = await db.ref(`users/${userId}/beginner_certification`).once('value');
            const prevVal = prevSnap.val();
            certId = prevVal && prevVal.certId ? prevVal.certId : 'BEG' + Math.random().toString(36).substring(2, 7).toUpperCase();

            await db.ref(`users/${userId}/beginner_certification`).set({
              certId,
              title: 'វិញ្ញាបនបត្របញ្ចប់ការសិក្សា ថ្នាក់ភាសាអង់គ្លេសដំបូង (English for Children)',
              studentName: effectiveName,
              grade,
              score,
              total,
              percent,
              dateStr,
              completedAt: Date.now()
            });

            // Mark graduated to unlock Elementary level
            await db.ref(`users/${userId}/beginner_graduated`).set(true);

            // Save global certificate record for QR Code
            certData = {
              certId,
              userId: userId.toString(),
              studentName: effectiveName,
              title: 'វិញ្ញាបនបត្របញ្ចប់ការសិក្សា ថ្នាក់ភាសាអង់គ្លេសដំបូង (English for Children - A to Z)',
              lessonTitle: quizTitle,
              grade,
              score,
              total,
              percent,
              dateStr,
              isAnnualExam: false,
              isBeginnerFinal: true,
              issuedAt: Date.now(),
              director: 'លីម សន (Lim Sorn)',
              instructor: 'អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)',
              schoolName: 'វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline'
            };

            await db.ref(`certificates/${certId}`).set(certData);
          } else if (isAnnualExam) {
            // Annual Subject Exam: issue subject certificate
            const prevSnap = await db.ref(`users/${userId}/subject_certifications/${subjectKey}`).once('value');
            const prevVal = prevSnap.val();
            certId = prevVal && prevVal.certId ? prevVal.certId : Math.random().toString(36).substring(2, 8).toUpperCase();

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
              isAnnualExam: true,
              isBeginnerFinal: false,
              subjectKey,
              lessonId: null,
              issuedAt: Date.now(),
              director: 'លីម សន (Lim Sorn)',
              instructor: 'គ្រូសន (Teacher Sorn AI)',
              schoolName: 'វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline'
            };

            await db.ref(`certificates/${certId}`).set(certData);
          } else {
            // Daily Lesson Quiz: Record completion & unlock progression, but NO CERTIFICATE!
            const lessonKey = `${monthId}-${weekId}-${lessonId}`;
            await db.ref(`users/${userId}/completed_lessons/${lessonKey}`).set({
              lessonId: lessonKey,
              lessonTitle: quizTitle,
              monthId,
              weekId,
              studentName: effectiveName,
              isPassed,
              grade,
              score,
              total,
              percent,
              dateStr,
              completedAt: Date.now()
            });
            certId = null;
            certData = null;
          }
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
        isBeginnerFinal,
        review
      });
    } catch (err) {
      console.error('Quiz submit error:', err);
      res.status(500).json({ error: 'Failed to evaluate quiz' });
    }
  });

  // ==========================================
  // 5. CERTIFICATES & STATUS ENDPOINTS
  // ==========================================

  router.get('/certificates/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) return res.status(400).json({ error: 'Missing userId' });
      if (!db) return res.status(500).json({ error: 'Database disconnected' });

      const snap = await db.ref(`users/${userId}`).once('value');
      const data = snap.val() || {};
      const annualCerts = data.subject_certifications || {};
      const beginnerCert = data.beginner_certification || null;

      const list = [];
      // 1. Beginner Final Graduation Certificate
      if (beginnerCert && beginnerCert.certId) {
        list.push({
          ...beginnerCert,
          isBeginnerFinal: true,
          isAnnualExam: false,
          instructor: 'អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)',
          title: beginnerCert.title || 'វិញ្ញាបនបត្របញ្ចប់ការសិក្សា ថ្នាក់ភាសាអង់គ្លេសដំបូង (English for Children)'
        });
      }
      // 2. Annual Subject Certifications
      for (const [key, val] of Object.entries(annualCerts)) {
        list.push({ ...val, subjectKey: key, isAnnualExam: true, isBeginnerFinal: false });
      }

      res.json({ success: true, certificates: list });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch certificates' });
    }
  });

  router.get('/beginner/status/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId || !db) {
        return res.json({ success: true, passedCount: 0, totalLessons: 26, isGraduated: false, passedLessons: [] });
      }

      const snap = await db.ref(`users/${userId}`).once('value');
      const data = snap.val() || {};
      const completed = data.completed_lessons || {};
      const passedLessons = [];

      for (let i = 1; i <= 26; i++) {
        const lid = `bl${i}`;
        const hasPassed = Object.entries(completed).some(([k, v]) => {
          return k.includes(`-${lid}`) && (v.isPassed || ['A', 'B', 'C'].includes(v.grade) || (v.percent && v.percent >= 70));
        });
        if (hasPassed) passedLessons.push(lid);
      }

      res.json({
        success: true,
        passedCount: passedLessons.length,
        totalLessons: 26,
        passedLessons,
        isGraduated: !!(data.beginner_graduated || data.beginner_certification),
        beginnerCert: data.beginner_certification || null
      });
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch beginner status' });
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

      // Populate student's updated photo and khmerName from their profile if present
      if (cert.userId) {
        try {
          const userSnap = await db.ref(`users/${cert.userId}/profile`).once('value');
          const userProf = userSnap.val() || {};
          if (userProf.photoUrl && !cert.photoUrl) cert.photoUrl = userProf.photoUrl;
          if (userProf.khmerName && !cert.khmerName) cert.khmerName = userProf.khmerName;
        } catch (e) {}
      }

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
      const { text, lang, tutor } = req.body;
      if (!text) return res.status(400).json({ error: 'Missing text parameter' });

      // Clean text of emojis & markdown
      let cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
      cleanText = cleanText.replace(/[*_#`]/g, '').trim();

      // Check for Khmer unicode characters (\u1780-\u17FF)
      const hasKhmer = /[\u1780-\u17FF]/.test(cleanText);
      const hasEnglish = /[a-zA-Z]/.test(cleanText);
      const isPureEnglish = !hasKhmer && (lang === 'en' || hasEnglish);
      
      // Female voice for Teacher Piseth (អ្នកគ្រូពិសិដ្ឋ) vs Male voice for Teacher Sorn (គ្រូសន)
      const isPisethTutor = tutor === 'piseth';
      const voice = isPureEnglish 
        ? (isPisethTutor ? 'en-US-JennyNeural' : 'en-US-GuyNeural')
        : (isPisethTutor ? 'km-KH-SreymomNeural' : 'km-KH-PisethNeural');

      const edgeTts = new MsEdgeTTS();
      await edgeTts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = edgeTts.toStream(cleanText.substring(0, 4000));

      const chunks = [];
      await new Promise((resolve, reject) => {
        audioStream.on('data', chunk => chunks.push(chunk));
        audioStream.on('end', resolve);
        audioStream.on('error', reject);
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

  // 1. General & Lesson AI Chatbot Endpoint
  router.post('/chat', async (req, res) => {
    try {
      const { userId, message, lessonTitle, preferredAI, mode, extraContext, clientHistory, tutor } = req.body;
      if (!message || !message.trim()) {
        return res.status(400).json({ error: 'Missing message parameter' });
      }

      const result = await generateAIAnswer(message.trim(), {
        lessonTitle,
        userId,
        preferredAI: preferredAI || 'auto',
        mode: mode || 'chat',
        extraContext,
        clientHistory,
        tutor: tutor || (lessonTitle && (lessonTitle.includes('ថ្នាក់ដំបូង') || lessonTitle.includes('Piseth') || lessonTitle.includes('ពិសិដ្ឋ')) ? 'piseth' : 'sorn')
      });

      res.json({
        success: true,
        reply: result.reply,
        provider: result.provider,
        model: result.model,
        timestamp: result.timestamp
      });
    } catch (err) {
      console.error('Web API /chat error:', err);
      res.status(500).json({ error: 'Chat AI error', details: err.message });
    }
  });

  // 2. Fetch User Chat History
  router.get('/chat/history', async (req, res) => {
    try {
      const { userId, limit = 20 } = req.query;
      if (!userId) return res.status(400).json({ error: 'Missing userId parameter' });
      if (!db) return res.json({ success: true, history: [] });

      const snap = await db.ref(`users/${userId}/history`).limitToLast(parseInt(limit, 10) || 20).once('value');
      const data = snap.val();
      const history = [];
      if (data) {
        Object.keys(data).forEach(k => {
          const item = data[k];
          if (item && item.text) {
            history.push({
              id: k,
              role: item.role === 'ai' ? 'ai' : 'user',
              text: item.text,
              provider: item.provider || 'AI',
              timestamp: item.timestamp || Date.now()
            });
          }
        });
        history.sort((a, b) => a.timestamp - b.timestamp);
      }

      res.json({ success: true, history });
    } catch (err) {
      console.error('/chat/history error:', err);
      res.status(500).json({ error: 'Failed to fetch history' });
    }
  });

  // 3. Clear User Chat History
  router.delete('/chat/history', async (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) return res.status(400).json({ error: 'Missing userId parameter' });
      if (db) {
        await db.ref(`users/${userId}/history`).remove();
      }
      res.json({ success: true, message: 'Chat history cleared' });
    } catch (err) {
      console.error('/chat/history delete error:', err);
      res.status(500).json({ error: 'Failed to clear history' });
    }
  });

  // 4. Grammar Checker & Writing Coach Tool
  router.post('/ai/grammar', async (req, res) => {
    try {
      const { text, userId } = req.body;
      if (!text || !text.trim()) return res.status(400).json({ error: 'Missing text parameter' });

      const result = await generateAIAnswer(text.trim(), {
        userId,
        mode: 'grammar',
        preferredAI: 'auto'
      });

      res.json({
        success: true,
        originalText: text,
        analysis: result.reply,
        provider: result.provider
      });
    } catch (err) {
      res.status(500).json({ error: 'Grammar analysis failed' });
    }
  });

  // 5. Smart Bilingual Translation Tool
  router.post('/ai/translate', async (req, res) => {
    try {
      const { text, userId } = req.body;
      if (!text || !text.trim()) return res.status(400).json({ error: 'Missing text parameter' });

      const result = await generateAIAnswer(text.trim(), {
        userId,
        mode: 'translate',
        preferredAI: 'auto'
      });

      res.json({
        success: true,
        originalText: text,
        translation: result.reply,
        provider: result.provider
      });
    } catch (err) {
      res.status(500).json({ error: 'Translation failed' });
    }
  });

  // 6. Irregular Verb Assistant Tool
  router.post('/ai/verb-helper', async (req, res) => {
    try {
      const { verb, userId } = req.body;
      if (!verb || !verb.trim()) return res.status(400).json({ error: 'Missing verb parameter' });

      const result = await generateAIAnswer(verb.trim(), {
        userId,
        mode: 'verb',
        preferredAI: 'auto'
      });

      res.json({
        success: true,
        verb: verb.trim(),
        details: result.reply,
        provider: result.provider
      });
    } catch (err) {
      res.status(500).json({ error: 'Verb helper failed' });
    }
  });

  // 7. Pronunciation & Speaking Coach Tool
  router.post('/ai/pronounce', async (req, res) => {
    try {
      const { phrase, userId } = req.body;
      if (!phrase || !phrase.trim()) return res.status(400).json({ error: 'Missing phrase parameter' });

      const result = await generateAIAnswer(phrase.trim(), {
        userId,
        mode: 'pronounce',
        preferredAI: 'auto'
      });

      res.json({
        success: true,
        phrase: phrase.trim(),
        coaching: result.reply,
        provider: result.provider
      });
    } catch (err) {
      res.status(500).json({ error: 'Pronunciation coaching failed' });
    }
  });

  // 8. AI Engines Status
  router.get('/ai/status', (req, res) => {
    const hasGroq = allGroqKeys.length > 0;
    const hasGemini = allGeminiKeys.length > 0;
    const hasOpenAI = !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'YOUR_OPENAI_KEY');

    res.json({
      success: true,
      engines: {
        groq: { available: hasGroq, count: allGroqKeys.length, primaryModel: GROQ_MODELS_POOL[0] },
        gemini: { available: hasGemini, count: allGeminiKeys.length, primaryModel: GEMINI_MODELS_POOL[0] },
        openai: { available: hasOpenAI, primaryModel: 'gpt-4o-mini' }
      },
      recommended: hasGroq ? 'groq' : (hasGemini ? 'gemini' : (hasOpenAI ? 'openai' : 'system'))
    });
  });

  // 9. Speech to Text (STT) Voice-to-Text with multi-model fallback
  router.post('/stt', async (req, res) => {
    try {
      const chunks = [];
      req.on('data', chunk => chunks.push(chunk));
      req.on('end', async () => {
        const buffer = Buffer.concat(chunks);
        if (buffer.length === 0) return res.status(400).json({ error: 'No audio data received' });

        const tmpPath = path.join(__dirname, `temp_web_audio_${Date.now()}_${Math.random().toString(36).substring(7)}.webm`);
        fs.writeFileSync(tmpPath, buffer);

        try {
          const { GoogleAIFileManager } = require("@google/generative-ai/server");

          const apiKey = getGeminiApiKey();
          if (!apiKey) throw new Error("No Gemini API key available for speech recognition");

          const genAI = new GoogleGenerativeAI(apiKey);
          const fileManager = new GoogleAIFileManager(apiKey);

          // Upload temporary audio file
          const uploadResult = await fileManager.uploadFile(tmpPath, {
            mimeType: "audio/webm",
            displayName: `WebVoice_${Date.now()}`,
          });

          let transcribedText = '';
          const sttModels = ['gemini-flash-lite-latest', 'gemini-3.8-flash', 'gemini-flash-latest'];

          for (const mName of sttModels) {
            try {
              const model = genAI.getGenerativeModel({ model: mName });
              const promptText = "Please transcribe this audio exactly as it is spoken. If it is in Khmer, transcribe it in Khmer. If English, transcribe in English. Output ONLY the transcribed text without quotes or explanation.";

              const result = await model.generateContent([
                promptText,
                { fileData: { fileUri: uploadResult.file.uri, mimeType: uploadResult.file.mimeType } }
              ]);

              const t = result?.response?.text()?.trim();
              if (t) {
                transcribedText = t;
                break;
              }
            } catch (mErr) {
              console.warn(`STT model ${mName} note:`, mErr.message);
            }
          }

          if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
          fileManager.deleteFile(uploadResult.file.name).catch(() => {});

          if (!transcribedText) {
            return res.status(500).json({ error: 'Could not transcribe audio' });
          }

          res.json({ success: true, text: transcribedText });
        } catch (err) {
          if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
          console.error('STT Error:', err);
          res.status(500).json({ error: 'Audio transcription failed', details: err.message });
        }
      });
    } catch (err) {
      res.status(500).json({ error: 'Server error processing audio' });
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
