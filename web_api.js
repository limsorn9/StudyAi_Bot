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
const { sendOtpEmail } = require('./mailer.js');

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

      const isVIP = checkVIP ? await checkVIP(userId) : false;
      const yearly = checkYearlyVIP ? await checkYearlyVIP(userId) : { eligible: false };

      let completedLessons = {};
      let subjectCerts = {};
      if (db) {
        const snap = await db.ref(`users/${userId}`).once('value');
        const data = snap.val() || {};
        completedLessons = data.completed_lessons || {};
        subjectCerts = data.subject_certifications || {};
      }

      const session = await createDeviceSession(userId, deviceId, userAgent || req.headers['user-agent'], req.ip);

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
      const token = 'tg_' + crypto.randomBytes(8).toString('hex');
      if (db) {
        await db.ref(`telegram_web_auth/${token}`).set({
          createdAt: Date.now(),
          expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
          verified: false
        });
      }
      return res.json({
        success: true,
        token,
        botUsername: 'TeacherSornAiBot',
        botUrl: `https://t.me/TeacherSornAiBot?start=auth_${token}`
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

      if (data.verified && data.userId) {
        const userId = data.userId.toString();
        const userSnap = await db.ref(`users/${userId}`).once('value');
        const userData = userSnap.val() || {};
        const profile = userData.profile || {};

        const isVIP = checkVIP ? await checkVIP(userId) : false;
        const yearly = checkYearlyVIP ? await checkYearlyVIP(userId) : { eligible: false };

        const session = await createDeviceSession(userId, deviceId, userAgent || req.headers['user-agent'], req.ip);

        // Cleanup token
        await db.ref(`telegram_web_auth/${token}`).remove();

        return res.json({
          success: true,
          verified: true,
          user: {
            id: userId,
            name: profile.name || data.name || `User ${userId}`,
            username: profile.username || '',
            isTelegram: true,
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

      return res.json({
        success: true,
        message: 'លេខកូដ OTP ៦ ខ្ទង់ត្រូវបានផ្ញើចូលទៅកាន់ Gmail របស់អ្នក!',
        email: cleanGmail,
        previewCode: mailResult.delivered ? null : otpCode // Non-blocking preview for testing if SMTP not configured
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

      const isVIP = checkVIP ? await checkVIP(userId) : false;
      const yearly = checkYearlyVIP ? await checkYearlyVIP(userId) : { eligible: false };

      // Create persistent session for this device
      const session = await createDeviceSession(userId, deviceId, userAgent || req.headers['user-agent'], req.ip);

      return res.json({
        success: true,
        message: '🎉 ចុះឈ្មោះ និងផ្ទៀងផ្ទាត់គណនីជោគជ័យ!',
        user: {
          id: userId,
          name: cleanName,
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

      return res.json({
        success: true,
        message: 'លេខកូដ OTP សម្រាប់ចូលគណនីត្រូវបានផ្ញើចូលទៅកាន់ Gmail របស់អ្នក!',
        email: cleanGmail,
        previewCode: mailResult.delivered ? null : otpCode
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
      const emailMapSnap = await db.ref(`users_by_email/${emailKey}`).once('value');
      if (emailMapSnap.exists()) {
        userId = emailMapSnap.val();
        const pSnap = await db.ref(`users/${userId}/profile`).once('value');
        const pData = pSnap.val() || {};
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

      const isVIP = checkVIP ? await checkVIP(userId) : false;
      const yearly = checkYearlyVIP ? await checkYearlyVIP(userId) : { eligible: false };

      const session = await createDeviceSession(userId, deviceId, userAgent || req.headers['user-agent'], req.ip);

      return res.json({
        success: true,
        message: 'ចូលគណនីជោគជ័យ!',
        user: {
          id: userId,
          name: userName,
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
      const { email, name, photoUrl, googleId, deviceId, userAgent } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'សូមបញ្ចូលព័ត៌មាន Email ពីគណនី Google!' });
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

      // Save user profile in Firebase with verified Gmail status
      await db.ref(`users/${userId}/profile`).update({
        name: cleanName,
        gmail: cleanGmail,
        gmailVerified: true,
        photoUrl: photoUrl || '',
        googleId: googleId || '',
        lastWebLogin: Date.now(),
        isWebUser: true,
        authProvider: 'google'
      });

      const isVIP = checkVIP ? await checkVIP(userId) : false;
      const yearly = checkYearlyVIP ? await checkYearlyVIP(userId) : { eligible: false };
      const session = await createDeviceSession(userId, deviceId, userAgent || req.headers['user-agent'], req.ip);

      return res.json({
        success: true,
        message: '🎉 ចូលគណនីតាម Google (Gmail) ជោគជ័យ!',
        user: {
          id: userId,
          name: cleanName,
          gmail: cleanGmail,
          gmailVerified: true,
          photoUrl: photoUrl || '',
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
   * Revoke (Disconnect) a specific Device
   */
  router.post('/auth/revoke-device', async (req, res) => {
    try {
      const { userId, targetDeviceId } = req.body;

      if (!userId || !targetDeviceId) {
        return res.status(400).json({ error: 'Missing userId or targetDeviceId' });
      }

      if (!db) return res.status(500).json({ error: 'Database disconnected' });

      // Mark revoked in Firebase
      await db.ref(`users/${userId}/sessions/${targetDeviceId}`).update({
        revoked: true,
        revokedAt: Date.now()
      });

      return res.json({
        success: true,
        message: 'ឧបករណ៍នេះត្រូវបានផ្តាច់ចេញពីគណនីជោគជ័យ!'
      });
    } catch (err) {
      console.error('Revoke device error:', err);
      res.status(500).json({ error: 'Error revoking device' });
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

      const isVIP = checkVIP ? await checkVIP(effectiveUserId) : false;
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
          name: syncData.name || tgProfile.name || `User ${telegramUserId}`,
          username: syncData.username || tgProfile.username || '',
          isTelegram: true,
          isVIP,
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
