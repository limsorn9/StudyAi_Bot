require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const { initializeApp, cert, applicationDefault } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');
const { getAuth } = require('firebase-admin/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Groq = require('groq-sdk');
const OpenAI = require('openai');
const express = require('express');
const fs = require('fs');
const path = require('path');
const { createWebAPIRouter } = require('./web_api.js');
const irregularVerbs = require('./irregular_verbs.js');
const { generateQuiz, generateAnnualSubjectQuiz, SUBJECT_EXAMS } = require('./quiz_generator.js');
const { checkTTSLimit, recordTTSStart, recordTTSDone, checkAILimit, recordAIUsage, getTTSStats } = require('./rate_limiter.js');
const {
  parseDuration,
  createLicenseKey,
  redeemLicenseKey,
  setDirectLicense,
  revokeUserLicense,
  getUserLicenseInfo,
  listUnusedKeys,
  formatCambodiaTime
} = require('./license_manager.js');
const {
  fetchDashboardStats,
  renderDashboardText,
  getDashboardMarkup,
  getGenKeyMarkup
} = require('./admin_dashboard.js');
const {
  getGradeTitle,
  generateCertificateCard,
  generateCertificateHTML,
  findNextLesson
} = require('./certificate_generator.js');

// ════════════════════════════════════════
// OFFLINE TRANSLATION ENGINE
// 100% ក្រៅប្រព័ន្ធ - Zero AI - Zero Internet
// ════════════════════════════════════════
const offlineTranslator = require('./translation_engine.js');


// In-memory quiz state: { userId: { questions, currentQ, score, lessonId, answers } }
const quizState = {};

// Load Curriculum Data
const curriculum = JSON.parse(fs.readFileSync('./curriculum.json', 'utf8'));
const beginnerCourse = require('./beginner_curriculum.js');

// In-memory cache for user's latest response/lesson text for TTS fallback
const userLatestResponseCache = new Map();
function setLatestResponse(userId, text, tutor = 'piseth') {
  if (!userId) return;
  const uid = userId.toString();
  userLatestResponseCache.set(uid, { text, tutor });
  if (db) {
    try {
      db.ref(`users/${uid}/latestResponse`).set(text).catch(e => console.warn('DB latestResponse warning:', e.message));
      db.ref(`users/${uid}/currentTutor`).set(tutor).catch(e => console.warn('DB currentTutor warning:', e.message));
    } catch (e) {}
  }
}

// Initialize Firebase Admin
let firebaseCreds;
try {
  if (process.env.FIREBASE_CREDENTIALS) {
    firebaseCreds = JSON.parse(process.env.FIREBASE_CREDENTIALS);
  } else {
    console.warn("⚠️ FIREBASE_CREDENTIALS is empty. Falling back to applicationDefault().");
  }
} catch (e) {
  console.error("❌ ERROR: FIREBASE_CREDENTIALS មិនត្រឹមត្រូវ ឬមិនមែនជាទម្រង់ JSON ទេ។", e.message);
}

let dbUrl = process.env.FIREBASE_DB_URL;
if (dbUrl) {
  try {
    const parsedUrl = new URL(dbUrl);
    dbUrl = `${parsedUrl.protocol}//${parsedUrl.host}`;
  } catch (e) {
    console.error("Invalid FIREBASE_DB_URL format");
  }
}

let appInstance;
try {
  appInstance = initializeApp({
    credential: firebaseCreds ? cert(firebaseCreds) : applicationDefault(),
    databaseURL: dbUrl
  });
} catch (e) {
  console.error("❌ ERROR: Firebase Init Failed:", e.message);
}
let db = null;
try {
  if (appInstance && dbUrl) {
    db = getDatabase(appInstance);
  }
} catch (e) {
  console.warn("⚠️ Firebase Database init note:", e.message);
}
let auth = null;
try {
  if (appInstance) {
    auth = getAuth(appInstance);
  }
} catch (e) {
  console.warn("⚠️ Firebase Auth init note:", e.message);
}

// Initialize APIs
let bot, openai;

// Parse API Keys
const geminiKeys = (process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || "").split(',').map(k => k.trim()).filter(k => k);
let geminiKeyIndex = 0;
const getNextGeminiKey = () => {
  if (geminiKeys.length === 0) return null;
  const key = geminiKeys[geminiKeyIndex % geminiKeys.length];
  geminiKeyIndex++;
  return key;
};

const groqKeys = (process.env.GROQ_API_KEYS || process.env.GROQ_API_KEY || "").split(',').map(k => k.trim()).filter(k => k);
let groqKeyIndex = 0;
const getNextGroqKey = () => {
  if (groqKeys.length === 0) return null;
  const key = groqKeys[groqKeyIndex % groqKeys.length];
  groqKeyIndex++;
  return key;
};

try {
  bot = new Telegraf(process.env.TELEGRAM_TOKEN);
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "YOUR_OPENAI_KEY" });
} catch (e) {
  console.error("❌ ERROR: API Init Failed:", e.message);
}

const app = express();
const PORT = process.env.PORT || 3000;
const defaultWebUrl = process.env.WEBAPP_URL || process.env.RENDER_EXTERNAL_URL || 'https://studyai-bot-wmha.onrender.com/';

try {
  if (bot) {
    app.use(bot.webhookCallback('/webhook'));
    bot.telegram.setWebhook(`${process.env.WebHook_URL}/webhook`).catch(e => {
      console.error("❌ ERROR: Webhook Failed (តើ WebHook_URL ត្រឹមត្រូវទេ?):", e.message);
    });

    // Delete bot command list so no command popup menu appears
    bot.telegram.deleteMyCommands().then(() => {
      console.log('✅ Telegram bot commands menu removed successfully.');
    }).catch(e => {
      console.warn('⚠️ deleteMyCommands note:', e.message);
    });

    // Set Menu Button at bottom-left of Telegram chat to ONLY launch the Mini Web App directly!
    const miniWebMenuButton = {
      type: 'web_app',
      text: '🌐 Mini Web',
      web_app: { url: defaultWebUrl }
    };

    // 1. Set via Telegraf method (camelCase: menuButton)
    bot.telegram.setChatMenuButton({
      menuButton: miniWebMenuButton
    }).then(() => {
      console.log('✅ Telegram Chat Menu Button set globally to Mini Web:', defaultWebUrl);
    }).catch(e => {
      console.warn('⚠️ setChatMenuButton note:', e.message);
    });

    // 2. Direct Telegram Bot API call (snake_case: menu_button)
    bot.telegram.callApi('setChatMenuButton', {
      menu_button: miniWebMenuButton
    }).catch(e => {
      console.warn('⚠️ direct callApi setChatMenuButton note:', e.message);
    });
  }
} catch (e) {
  console.error("❌ ERROR setting up webhook or commands:", e.message);
}

// Helpers
const setUserState = async (userId, state) => {
  await db.ref(`users/${userId}/state`).set(state);
};

const getUserState = async (userId) => {
  const snap = await db.ref(`users/${userId}/state`).once('value');
  return snap.val() || 'none';
};

const setUserAI = async (userId, aiName) => {
  await db.ref(`users/${userId}/preferredAI`).set(aiName);
};

const getUserAI = async (userId) => {
  const snap = await db.ref(`users/${userId}/preferredAI`).once('value');
  return snap.val() || 'groq';
};

const saveHistory = async (userId, role, text) => {
  await db.ref(`users/${userId}/history`).push({
    role,
    text,
    timestamp: Date.now()
  });
};

// VIP Checking Logic
const envAdmins = (process.env.SUPER_ADMIN_IDS || "").split(",").map(id => id.trim()).filter(id => id);
const SUPER_ADMIN_IDS = [...new Set([...envAdmins, "240224709", "7160751939"])]; // Include user's ID by default

const checkVIP = async (userId) => {
  if (SUPER_ADMIN_IDS.includes(userId.toString())) return true;
  const snap = await db.ref(`users/${userId}/subscription`).once('value');
  const sub = snap.val();
  if (!sub) return false;
  if (sub.isLifetime === true) return true;
  if (sub.expiresAt && sub.expiresAt > Date.now() && sub.status !== 'revoked') return true;
  return false;
};

/**
 * Check if user is eligible for Annual Subject Final Exams
 * Eligible if:
 * 1. Super Admin
 * 2. Has an active yearly subscription (1 year / 12 months)
 * 3. Has lifetime subscription
 * 4. OR has accumulated payments totaling at least 1 year (>= 360 days)
 */
const checkYearlyVIP = async (userId) => {
  if (SUPER_ADMIN_IDS.includes(userId.toString())) {
    return { eligible: true, isVIP: true, isAdmin: true, isSuperAdmin: true, reason: 'ADMIN', plan: 'Super Admin', daysRemaining: 36500 };
  }
  if (!db) return { eligible: false, isVIP: false, reason: 'NO_DB' };

  try {
    const snap = await db.ref(`users/${userId}/subscription`).once('value');
    const sub = snap.val();
    if (!sub || sub.status === 'revoked') {
      return { eligible: false, isVIP: false, reason: 'NOT_VIP', daysRemaining: 0, plan: 'Free' };
    }

    // Check Lifetime VIP
    const isLifetime = !!(
      sub.isLifetime ||
      (sub.plan && (sub.plan.toLowerCase().includes('lifetime') || sub.plan.includes('មួយជីវិត'))) ||
      (sub.expiresAt && sub.expiresAt > Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)
    );

    if (isLifetime) {
      return {
        eligible: true,
        isVIP: true,
        isLifetime: true,
        reason: 'LIFETIME_PLAN',
        plan: '👑 VIP ពេញមួយជីវិត (Lifetime)',
        daysRemaining: 36500
      };
    }

    if (!sub.expiresAt || sub.expiresAt <= Date.now()) {
      return { eligible: false, isVIP: false, reason: 'NOT_VIP', daysRemaining: 0, plan: 'Free' };
    }

    const remainingMs = sub.expiresAt - Date.now();
    const daysRemaining = Math.max(0, Math.floor(remainingMs / (24 * 60 * 60 * 1000)));

    // 1. Check direct plan name
    const planStr = (sub.plan || '').toLowerCase();
    const isExplicitYearly = (
      planStr.includes('ឆ្នាំ') ||
      planStr.includes('year') ||
      planStr.includes('12 ខែ') ||
      planStr.includes('1y') ||
      planStr.includes('12m') ||
      sub.isYearly === true
    );

    if (isExplicitYearly) {
      return {
        eligible: true,
        isVIP: true,
        reason: 'YEARLY_PLAN',
        plan: sub.plan,
        daysRemaining
      };
    }

    // 2. Check if remaining days >= 300 days (purchased yearly or multiple extensions)
    if (daysRemaining >= 300) {
      return {
        eligible: true,
        isVIP: true,
        reason: 'REMAINING_YEAR',
        plan: sub.plan,
        daysRemaining
      };
    }

    // 3. Check cumulative payment history in payments_log (e.g. paying month by month reaching >= 360 days)
    let totalAccumulatedDays = 0;
    try {
      const logSnap = await db.ref('payments_log').orderByChild('userId').equalTo(userId.toString()).once('value');
      const logs = logSnap.val();
      if (logs) {
        Object.values(logs).forEach(log => {
          if (log.daysAdded && typeof log.daysAdded === 'number') {
            totalAccumulatedDays += log.daysAdded;
          }
        });
      }
    } catch (e) {
      console.error('payments_log lookup error:', e);
    }

    if (totalAccumulatedDays >= 360) {
      return {
        eligible: true,
        isVIP: true,
        reason: 'CUMULATIVE_YEAR',
        plan: sub.plan,
        daysRemaining,
        totalAccumulatedDays
      };
    }

    // Not eligible for Annual Exam (e.g. 1 month or 3 months user)
    return {
      eligible: false,
      isVIP: true,
      reason: 'NOT_YEARLY',
      plan: sub.plan || '1 ខែ',
      daysRemaining,
      totalAccumulatedDays
    };
  } catch (err) {
    console.error('checkYearlyVIP error:', err);
    return { eligible: false, isVIP: false, reason: 'ERROR' };
  }
};

// ========================
// CHANNEL MEMBERSHIP GUARD
// ========================
const REQUIRED_CHANNEL = '@ssonlinechanel';
const CHANNEL_URL = 'https://t.me/ssonlinechanel';

const isMember = async (userId) => {
  try {
    if (SUPER_ADMIN_IDS.includes(userId.toString())) return true;
    const member = await bot.telegram.getChatMember(REQUIRED_CHANNEL, userId);
    return ['member', 'administrator', 'creator'].includes(member.status);
  } catch (e) {
    // If bot is not admin in channel, or user not found → treat as not member
    return false;
  }
};

const requireMembership = async (ctx, next) => {
  // Skip for private non-bot messages only (commands and callbacks)
  const userId = ctx.from?.id;
  if (!userId) return next();
  // Always allow admins
  if (SUPER_ADMIN_IDS.includes(userId.toString())) return next();

  const ok = await isMember(userId);
  if (!ok) {
    await ctx.reply(
      `🔒 *ដើម្បីប្រើប្រាស់ Bot នេះ សូមចូលជាសមាជិកឆានែលរបស់យើងជាមុនសិន!*\n\n` +
      `👉 [ចុចទីនេះ ដើម្បីចូលឆានែល](${CHANNEL_URL})\n\n` +
      `✅ បន្ទាប់ពីចូលហើយ សូមវាយ /start ម្ដងទៀត`,
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.url('📢 ចូលឆានែល @ssonlinechanel', CHANNEL_URL)],
          [Markup.button.callback('✅ ខ្ញុំបានចូលហើយ', 'check_membership')]
        ]).reply_markup
      }
    );
    return; // Stop processing
  }
  return next();
};

// ========================
// GROUP ADMIN GUARD
// ========================

/**
 * Check if user is admin/creator of the current group
 */
const isGroupAdmin = async (ctx) => {
  try {
    const userId = ctx.from?.id;
    if (!userId) return false;
    if (SUPER_ADMIN_IDS.includes(userId.toString())) return true;
    const member = await ctx.telegram.getChatMember(ctx.chat.id, userId);
    return ['administrator', 'creator'].includes(member.status);
  } catch (e) {
    return false;
  }
};

/**
 * Middleware: In group/supergroup chats, only admins can use bot.
 * Private chats pass through (other guards apply).
 */
const groupAdminGuard = async (ctx, next) => {
  const chatType = ctx.chat?.type;
  if (chatType === 'group' || chatType === 'supergroup') {
    const userId = ctx.from?.id;
    if (SUPER_ADMIN_IDS.includes(userId?.toString())) return next();
    const admin = await isGroupAdmin(ctx);
    if (!admin) {
      try {
        await ctx.reply(`🔒 តែ *Admin* ក្រុមប៉ុណ្ណោះអាចប្រើ Bot Commands បាន!`, {
          parse_mode: 'Markdown'
        });
      } catch (_) {}
      return; // Block non-admins in group
    }
  }
  return next();
};


// Robust TTS Synthesizer with intelligent chunking
const synthesizeSpeechBuffer = async (rawText, voiceName = "km-KH-PisethNeural") => {
  if (!rawText) return null;

  // Clean text to avoid TTS reading emojis and markdown formatting symbols
  let cleanText = rawText
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/[═─*#_~`•>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) return null;

  // Chunk text safely (max 450 chars per request to prevent Edge TTS connection drop)
  const chunks = [];
  let cur = cleanText.substring(0, 1400).trim(); // Cap to ~1400 chars
  while (cur.length > 0) {
    if (cur.length <= 450) {
      chunks.push(cur);
      break;
    }
    let splitIdx = cur.lastIndexOf('។', 450);
    if (splitIdx === -1) splitIdx = cur.lastIndexOf('\n', 450);
    if (splitIdx === -1) splitIdx = cur.lastIndexOf('.', 450);
    if (splitIdx === -1) splitIdx = cur.lastIndexOf('!', 450);
    if (splitIdx === -1) splitIdx = cur.lastIndexOf('?', 450);
    if (splitIdx === -1) splitIdx = cur.lastIndexOf(' ', 450);
    if (splitIdx === -1 || splitIdx < 150) splitIdx = 450;
    chunks.push(cur.substring(0, splitIdx + 1).trim());
    cur = cur.substring(splitIdx + 1).trim();
  }

  const textChunks = chunks.filter(c => c.length > 0).slice(0, 3);
  if (textChunks.length === 0) return null;

  const { MsEdgeTTS, OUTPUT_FORMAT } = require("msedge-tts");
  const edgeTts = new MsEdgeTTS();
  await edgeTts.setMetadata(voiceName, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  const audioBuffers = [];
  for (const chunk of textChunks) {
    try {
      const { audioStream } = edgeTts.toStream(chunk);
      const chunkBufs = [];
      await new Promise((resolve) => {
        audioStream.on('data', (d) => chunkBufs.push(d));
        audioStream.on('end', resolve);
        audioStream.on('error', (err) => {
          console.warn('[Edge TTS Stream Warning]', err.message);
          resolve(); // Resolve gracefully so already received audio frames are kept
        });
      });
      if (chunkBufs.length > 0) {
        audioBuffers.push(Buffer.concat(chunkBufs));
      }
    } catch (err) {
      console.warn('[Edge TTS Chunk Error]', err.message);
    }
  }

  if (audioBuffers.length === 0) return null;
  return Buffer.concat(audioBuffers);
};

const generateAndSendTTS = async (ctx, text) => {
  if (!text) return;
  try {
    ctx.sendChatAction('record_voice');
    const buffer = await synthesizeSpeechBuffer(text, "km-KH-SreymomNeural");
    if (buffer) {
      await ctx.replyWithVoice({ source: buffer });
    }
  } catch (error) {
    console.error("Auto TTS Error:", error);
  }
};

// Persistent Reply Keyboard Menu
const mainMenuKeyboard = Markup.keyboard([
  ['📚 បញ្ជីមេរៀន (Lessons)', '🎓 ប្រឡងបញ្ចប់មុខវិជ្ជា'],
  ['🌐 បើក Web App (Study Online)', '📜 វិញ្ញាបនបត្ររបស់ខ្ញុំ'],
  ['🌍 បកប្រែ (Translate EN↔KH)', '🔊 ស្តាប់ English (Listen EN)'],
  ['🕰️ ប្រវត្តិសិក្សា', '💎 គណនី VIP (Upgrade)'],
  ['🔗 យកកូដភ្ជាប់ Web (Link)', '❓ ជំនួយ (Help)']
]).resize();

// Check Membership Button
bot.action('check_membership', async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id;
  const ok = await isMember(userId);
  if (ok) {
    const username = ctx.from.first_name || 'Student';
    await ctx.reply(`✅ *ត្រូវហើយ! ${username} បានចូលជាសមាជិករួចហើយ!*\n\nសូមស្វាគមន៍! 🎉`, {
      parse_mode: 'Markdown',
      reply_markup: mainMenuKeyboard.reply_markup
    });
    await ctx.reply('សូមជ្រើសរើសខែដែលអ្នកចង់រៀន៖', getMonthsKeyboard());
  } else {
    await ctx.reply(`❌ *ខ្ញុំមិនឃើញអ្នកនៅក្នុងឆានែលទេ!*\n\nសូម [ចូលឆានែល](${CHANNEL_URL}) ហើយចុច ✅ ម្ដងទៀត`, {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.url('📢 ចូលឆានែល', CHANNEL_URL)],
        [Markup.button.callback('✅ ខ្ញុំបានចូលហើយ', 'check_membership')]
      ]).reply_markup
    });
  }
});

// Telegram 2FA Security Confirmation Handlers
bot.action(/tg_auth_allow_(.+)/, async (ctx) => {
  const token = ctx.match[1];
  const userId = ctx.from.id.toString();
  const username = [ctx.from.first_name, ctx.from.last_name].filter(Boolean).join(' ') || ctx.from.username || `User ${userId}`;

  await ctx.answerCbQuery('✅ បានយល់ព្រមភ្ជាប់គណនីជោគជ័យ!');

  if (db) {
    try {
      await db.ref(`telegram_web_auth/${token}`).update({
        verified: true,
        userId: userId,
        name: username,
        verifiedAt: Date.now()
      });
      await db.ref(`users/${userId}/profile`).update({
        name: username,
        username: ctx.from.username || '',
        registeredAt: Date.now(),
        isTelegram: true,
        telegramSecurityVerified: true
      });
    } catch (e) {
      console.error('Error updating auth token:', e);
    }
  }

  const webUrl = process.env.WEBAPP_URL || process.env.RENDER_EXTERNAL_URL || process.env.WebHook_URL || 'https://studyai-bot-wmha.onrender.com/';
  return ctx.editMessageText(
    `✅ *ការភ្ជាប់គណនី TELEGRAM ជោគជ័យ!* 🎉\n\n` +
    `សួស្តី *${username}*! អ្នកបានយល់ព្រមភ្ជាប់គណនី Telegram ជាមួយ Browser រួចរាល់ហើយ។\n\n` +
    `💻 វេបសាយលើ Browser របស់អ្នកកំពុង Sync និងចូលរៀនស្វ័យប្រវត្ត។ សូមត្រឡប់ទៅ Browser វិញ ឬចុចប៊ូតុងខាងក្រោម៖`,
    {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.webApp('🌐 បើក Web App (Study Online)', webUrl)]
      ]).reply_markup
    }
  );
});

bot.action(/tg_auth_deny_(.+)/, async (ctx) => {
  const token = ctx.match[1];
  await ctx.answerCbQuery('❌ បានបដិសេធ!');

  if (db) {
    try {
      await db.ref(`telegram_web_auth/${token}`).update({
        denied: true,
        deniedAt: Date.now()
      });
    } catch (e) {}
  }

  return ctx.editMessageText(
    `❌ *ការស្នើសុំចូលគណនីត្រូវបានបដិសេធ!* 🛡️\n\nគ្មានឧបករណ៍ណាអាចចូលប្រើគណនីរបស់អ្នកបានឡើយ។ ប្រព័ន្ធសុវត្ថិភាព Telegram Bot បានការពារគណនីរបស់អ្នក។`,
    { parse_mode: 'Markdown' }
  );
});

// Apply Group Admin Guard as global middleware (runs before every command/message)
bot.use(groupAdminGuard);

// Automatically record Telegram full name & set Mini Web chat menu button
bot.use(async (ctx, next) => {
  if (ctx.from?.id && db) {
    try {
      const uid = ctx.from.id.toString();
      const tgFirst = (ctx.from.first_name || '').trim();
      const tgLast = (ctx.from.last_name || '').trim();
      const tgFull = [tgFirst, tgLast].filter(Boolean).join(' ').trim();
      if (tgFull) {
        // Asynchronously update Telegram names so student's full name is always stored
        db.ref(`users/${uid}/profile`).update({
          telegramFullName: tgFull,
          telegramFirstName: tgFirst,
          telegramLastName: tgLast,
          first_name: tgFirst,
          last_name: tgLast,
          username: ctx.from.username || ''
        }).catch(() => {});
      }
    } catch (_) {}
  }

  if (ctx.chat?.type === 'private') {
    try {
      ctx.setChatMenuButton({
        type: 'web_app',
        text: '🌐 Mini Web',
        web_app: { url: defaultWebUrl }
      }).catch(() => {});
    } catch (_) {}
  }
  return next();
});

// Start Command & Curriculum Menu
bot.start(async (ctx) => {
  const userId = ctx.from.id;
  const tgFirst = (ctx.from.first_name || '').trim();
  const tgLast = (ctx.from.last_name || '').trim();
  const tgFullName = [tgFirst, tgLast].filter(Boolean).join(' ').trim() || ctx.from.username || 'Student';

  // Check if student has an Account Name (ឈ្មោះគណនី)
  let studentAccountName = null;
  let existingProf = {};
  if (db) {
    try {
      const pSnap = await db.ref(`users/${userId}/profile`).once('value');
      existingProf = pSnap.val() || {};
      studentAccountName = (existingProf.accountName && existingProf.accountName.trim()) ||
                           (existingProf.khmerName && existingProf.khmerName.trim()) || null;
      if (!studentAccountName && existingProf.name && existingProf.name !== 'Student' && !existingProf.name.startsWith('User ') && existingProf.hasCustomAccountName) {
        studentAccountName = existingProf.name.trim();
      }
    } catch (_) {}
  }

  // Final display name: Account Name if set, otherwise Full Telegram Name
  const username = studentAccountName || tgFullName;

  // Ensure bottom-left chat menu button is set to Mini Web App
  if (ctx.chat?.type === 'private') {
    try {
      await ctx.setChatMenuButton({
        type: 'web_app',
        text: '🌐 Mini Web',
        web_app: { url: defaultWebUrl }
      });
    } catch (_) {}
  }

  // Handle QR verification link: e.g. /start verify_ABC123
  const payload = ctx.startPayload || (ctx.message && ctx.message.text && ctx.message.text.split(' ')[1]);
  if (payload && payload.startsWith('verify_')) {
    const certId = payload.replace('verify_', '');
    return handleCertificateVerification(ctx, certId);
  }

  // Handle Telegram Security Confirmation for Web Login / Enroll: e.g. /start auth_tg_12345
  if (payload && payload.startsWith('auth_')) {
    const token = payload.replace('auth_', '');
    const webUrl = process.env.WEBAPP_URL || process.env.RENDER_EXTERNAL_URL || process.env.WebHook_URL || 'https://studyai-bot-wmha.onrender.com/';

    return ctx.reply(
      `🛡️ *ប្រព័ន្ធសុវត្ថិភាព TELEGRAM (SECURITY CONFIRMATION)* 🛡️\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `សួស្តី *${username}*! មានការស្នើសុំចុះឈ្មោះ ឬភ្ជាប់គណនីលើវេបសាយ *Teacher SSOnline English Academy* ពី Browser របស់អ្នក។\n\n` +
      `👤 *ព័ត៌មានគណនី Telegram៖*\n` +
      `• Telegram ID: \`${userId}\`\n` +
      `• ឈ្មោះ៖ *${username}*\n` +
      `• ស្ថានភាព៖ ⏳ កំពុងរង់ចាំការបញ្ជាក់ពីអ្នក\n\n` +
      `👉 *សូមចុចប៊ូតុងខាងក្រោមដើម្បីយល់ព្រមភ្ជាប់គណនីភ្លាមៗ៖*`,
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [
            Markup.button.callback('✅ យល់ព្រមភ្ជាប់គណនី (Confirm & Link)', `tg_auth_allow_${token}`),
            Markup.button.callback('❌ បដិសេធ (Deny)', `tg_auth_deny_${token}`)
          ]
        ]).reply_markup
      }
    );
  }

  // Handle 1-Click Telegram Auto-Enroll: e.g. /start web_enroll
  if (payload && (payload === 'web_enroll' || payload === 'enroll' || payload.startsWith('web_enroll'))) {
    if (db) {
      const enrollProfUpdate = {
        first_name: tgFirst,
        last_name: tgLast,
        telegramFirstName: tgFirst,
        telegramLastName: tgLast,
        telegramFullName: tgFullName,
        username: ctx.from.username || '',
        registeredAt: Date.now(),
        isTelegram: true
      };
      if (!studentAccountName) {
        enrollProfUpdate.name = tgFullName;
      }
      await db.ref(`users/${userId}/profile`).update(enrollProfUpdate);
    }

    const syncCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (db) {
      await db.ref(`sync_codes/${syncCode}`).set({
        telegramId: userId,
        name: username,
        createdAt: Date.now(),
        expiresAt: Date.now() + 60 * 60 * 1000
      });
    }

    const webUrl = process.env.WEBAPP_URL || process.env.RENDER_EXTERNAL_URL || process.env.WebHook_URL || 'https://studyai-bot-wmha.onrender.com/';
    return ctx.reply(
      `🎉 *ចុះឈ្មោះចូលរៀនជោគជ័យ!*\n\n` +
      `សួស្តី *${username}*! គណនី Telegram របស់អ្នកត្រូវបានចុះឈ្មោះចូលរៀនជាមួយ *Teacher SSOnline English Academy* រួចរាល់ដោយស្វ័យប្រវត្ត!\n\n` +
      `🔑 លេខកូដសម្គាល់ភ្ជាប់ Web របស់អ្នកគឺ៖ \`${syncCode}\`\n\n` +
      `អ្នកអាចរៀនតាម Bot នេះ ឬចុចប៊ូតុងខាងក្រោមដើម្បីចូលរៀនលើវេបសាយភ្លាមៗ៖`,
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.webApp('🌐 ចូលរៀនលើ WebApp', webUrl)],
          [Markup.button.url('💻 បើកលើ Browser', `${webUrl}?sync_code=${syncCode}`)]
        ]).reply_markup
      }
    );
  }

  // Check channel membership first
  const ok = await isMember(userId);
  if (!ok) {
    return ctx.reply(
      `🔒 *សួស្តី ${username}!*\n\nដើម្បីប្រើប្រាស់ Bot សិក្សានេះ សូមចូលជាសមាជិកឆានែលយើងជាមុនសិន!`,
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.url('📢 ចូលឆានែល @ssonlinechanel', CHANNEL_URL)],
          [Markup.button.callback('✅ ខ្ញុំបានចូលហើយ', 'check_membership')]
        ]).reply_markup
      }
    );
  }

  if (db) {
    const startProfUpdate = {
      first_name: tgFirst,
      last_name: tgLast,
      telegramFirstName: tgFirst,
      telegramLastName: tgLast,
      telegramFullName: tgFullName,
      username: ctx.from.username || '',
      registeredAt: Date.now()
    };
    if (!studentAccountName) {
      startProfUpdate.name = tgFullName;
    }
    await db.ref(`users/${userId}/profile`).update(startProfUpdate);
  }

  // Send the persistent menu first
  await ctx.reply(`សួស្តី ${username}! ស្វាគមន៍មកកាន់ប្រព័ន្ធសិក្សាភាសាអង់គ្លេសខ្នាតស្តង់ដារ ១២ ខែ 📚`, mainMenuKeyboard);
  
  // Then send the inline keyboard for months
  await ctx.reply(`នេះគឺជាកម្មវិធីសិក្សាទាំងមូល។ សូមជ្រើសរើសខែដែលអ្នកចង់រៀន៖`, getMonthsKeyboard());
});

// Handle Persistent Menu Button Clicks
bot.hears('📚 បញ្ជីមេរៀន (Lessons)', async (ctx) => {
  await ctx.reply("សូមជ្រើសរើសខែដែលអ្នកចង់រៀន៖", getMonthsKeyboard());
});



// ==========================================
// LICENSE & VIP MANAGEMENT SYSTEM
// ==========================================

const sendVipUpgradeInfo = async (ctx) => {
  const userId = ctx.from.id;
  const msg = `💎 **គណនី VIP (Upgrade & License)** 💎

បង់ប្រាក់ដើម្បីទទួលបានសិទ្ធិពិសេស៖
✅ សួរគ្រូ AI បានដោយសេរី (គ្មានដែនកំណត់)
✅ អានមេរៀនជាសំឡេង (TTS)
✅ អាចផ្ញើជាសំឡេងឲ្យគ្រូ AI ស្តាប់ និងកែតម្រូវ
✅ ធ្វើតេស្តប្រឡងយកពិន្ទុ MCQ គ្រប់មេរៀន
✅ **សិទ្ធិប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ & វិញ្ញាបនបត្រ A4 ផ្តេកផ្លូវការ (សម្រាប់កញ្ចប់ប្រចាំឆ្នាំ ឬបង់គ្រប់ ១ ឆ្នាំ)**

**តម្លៃពិសេស៖**
👉 1 ខែ = 3$ (សិទ្ធិ VIP ទូទៅ + Quiz មេរៀន)
👉 1 ឆ្នាំ = 30$ (សិទ្ធិ VIP ពេញលេញ + ប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ & វិញ្ញាបនបត្រ A4 ផ្តេក)

🏦 **ព័ត៌មានបង់ប្រាក់ (ACLEDA Bank / KHQR):**
ឈ្មោះគណនី៖ **LIM SORN**
*(អ្នកអាចស្កេន KHQR ដើម្បីបង់ប្រាក់ ឬប្រើប្រាស់ License Key)*

📲 បន្ទាប់ពីបង់ប្រាក់រួច សូមផ្ញើវិក្កយបត្រ (Screenshot) មកកាន់ Admin៖ @limsorn9
ឬប្រាប់លេខ ID របស់អ្នកគឺ៖ \`${userId}\`

💡 **ប្រសិនបើអ្នកមាន License Key រួចហើយ សូមចុចប៊ូតុងខាងក្រោម!**`;

  const keyboard = Markup.inlineKeyboard([
    [Markup.button.callback('🔑 បញ្ចូល License Key', 'enter_license_key')],
    [Markup.button.callback('📋 ពិនិត្យ License របស់ខ្ញុំ', 'my_license_status')]
  ]);

  if (fs.existsSync('./khqr.jpg')) {
    await ctx.replyWithPhoto({ source: './khqr.jpg' }, { caption: msg, parse_mode: 'Markdown', reply_markup: keyboard.reply_markup });
  } else if (fs.existsSync('./khqr.png')) {
    await ctx.replyWithPhoto({ source: './khqr.png' }, { caption: msg, parse_mode: 'Markdown', reply_markup: keyboard.reply_markup });
  } else {
    await ctx.reply(msg, { parse_mode: 'Markdown', reply_markup: keyboard.reply_markup });
  }
};

bot.hears('💎 គណនី VIP (Upgrade)', sendVipUpgradeInfo);

// Action: Click VIP Upgrade
bot.action('vip_upgrade', async (ctx) => {
  try { await ctx.answerCbQuery(); } catch(e){}
  await sendVipUpgradeInfo(ctx);
});

// Action: Click Yearly VIP Upgrade (Dedicated for Annual Subject Exams)
bot.action('vip_upgrade_yearly', async (ctx) => {
  try { await ctx.answerCbQuery(); } catch(e){}
  const userId = ctx.from.id;
  const msg = (
    `💎 *កញ្ចប់ VIP ប្រចាំឆ្នាំ (Yearly VIP - 30$/ឆ្នាំ)* 💎\n\n` +
    `ទទួលបានសិទ្ធិពិសេសពេញលេញរយៈពេល ១ ឆ្នាំពេញ (៣៦៥ ថ្ងៃ)៖\n` +
    `✅ *សិទ្ធិប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំទាំង ៧ មុខវិជ្ជា*\n` +
    `✅ *ទទួលបានវិញ្ញាបនបត្រផ្លូវការទម្រង់ A4 ផ្តេក (A4 Landscape)*\n` +
    `✅ *មានភ្ជាប់ QR Code Verified អាចស្កេនផ្ទៀងផ្ទាត់ផ្លូវការ*\n` +
    `✅ ចុះហត្ថលេខាដោយ *នាយកសាលារៀន លីម សន* & *TeacherSornAiBot*\n` +
    `✅ សួរគ្រូ AI បានដោយសេរី គ្មានដែនកំណត់\n` +
    `✅ អានមេរៀនជាសំឡេង (TTS) និងប្រឡង MCQ គ្រប់មេរៀន\n\n` +
    `💰 *តម្លៃពិសេស៖ 30$/ឆ្នាំ (សន្សំបាន ៦$ ធៀបនឹងបង់ប្រចាំខែ)*\n\n` +
    `🏦 *ព័ត៌មានបង់ប្រាក់ (ACLEDA Bank / KHQR)៖*\n` +
    `ឈ្មោះគណនី៖ *LIM SORN*\n\n` +
    `📲 បន្ទាប់ពីបង់ប្រាក់រួច សូមផ្ញើវិក្កយបត្រមកកាន់ Admin៖ @limsorn9\n` +
    `ឬប្រាប់លេខ ID របស់អ្នកគឺ៖ \`${userId}\``
  );

  const keyboard = Markup.inlineKeyboard([
    [Markup.button.callback('🔑 បញ្ចូល License Key ប្រចាំឆ្នាំ', 'enter_license_key')],
    [Markup.button.callback('📋 ពិនិត្យ License របស់ខ្ញុំ', 'my_license_status')],
    [Markup.button.callback('🔙 ត្រឡប់ក្រោយ', 'annual_exams_menu')]
  ]);

  if (fs.existsSync('./khqr.jpg')) {
    await ctx.replyWithPhoto({ source: './khqr.jpg' }, { caption: msg, parse_mode: 'Markdown', reply_markup: keyboard.reply_markup });
  } else if (fs.existsSync('./khqr.png')) {
    await ctx.replyWithPhoto({ source: './khqr.png' }, { caption: msg, parse_mode: 'Markdown', reply_markup: keyboard.reply_markup });
  } else {
    await ctx.reply(msg, { parse_mode: 'Markdown', reply_markup: keyboard.reply_markup });
  }
});

// Action: Enter License Key
bot.action('enter_license_key', async (ctx) => {
  const userId = ctx.from.id.toString();
  await setUserState(userId, 'awaiting_license_key');
  try { await ctx.answerCbQuery(); } catch(e){}
  await ctx.reply(
    `🔑 **សូមផ្ញើ License Key របស់អ្នកមកកាន់ទីនេះ៖**\n\n` +
    `ឧទាហរណ៍៖ \`STUDY-XXXX-XXXX-XXXX\`\n` +
    `*(គ្រាន់តែ Copy កូដមក Paste ផ្ញើ ឬវាយ \`/redeem [កូដ]\`)*`,
    { parse_mode: 'Markdown' }
  );
});

// Action: Check My License Status
bot.action('my_license_status', async (ctx) => {
  try { await ctx.answerCbQuery(); } catch(e){}
  const userId = ctx.from.id.toString();
  const info = await getUserLicenseInfo(db, userId, SUPER_ADMIN_IDS);

  let msg = `📋 **ព័ត៌មានស្ថានភាព License របស់អ្នក៖**\n\n` +
    `👤 ID: \`${userId}\`\n` +
    `📊 ស្ថានភាព: **${info.statusKhmer}**\n` +
    `⌛ ថ្ងៃផុតកំណត់: **${info.expireDateFormatted}**\n`;

  if (info.isVIP && !info.isAdmin) {
    msg += `⏳ នៅសល់: **${info.daysRemaining} ថ្ងៃ ${info.hoursRemaining} ម៉ោង**\n`;
  }

  const buttons = [];
  if (!info.isVIP) {
    buttons.push([Markup.button.callback('💎 Upgrade VIP', 'vip_upgrade')]);
  }
  buttons.push([Markup.button.callback('🔑 បញ្ចូល License Key', 'enter_license_key')]);

  await ctx.reply(msg, {
    parse_mode: 'Markdown',
    reply_markup: Markup.inlineKeyboard(buttons).reply_markup
  });
});

// User Command: Check My License
bot.command(['mylicense', 'license_status'], async (ctx) => {
  const userId = ctx.from.id.toString();
  const info = await getUserLicenseInfo(db, userId, SUPER_ADMIN_IDS);

  let msg = `📋 **ព័ត៌មានស្ថានភាព License របស់អ្នក៖**\n\n` +
    `👤 ID: \`${userId}\`\n` +
    `📊 ស្ថានភាព: **${info.statusKhmer}**\n` +
    `⌛ ថ្ងៃផុតកំណត់: **${info.expireDateFormatted}**\n`;

  if (info.isVIP && !info.isAdmin) {
    msg += `⏳ នៅសល់: **${info.daysRemaining} ថ្ងៃ ${info.hoursRemaining} ម៉ោង**\n`;
  }

  const buttons = [];
  if (!info.isVIP) {
    buttons.push([Markup.button.callback('💎 Upgrade VIP', 'vip_upgrade')]);
  }
  buttons.push([Markup.button.callback('🔑 បញ្ចូល License Key', 'enter_license_key')]);

  return ctx.reply(msg, {
    parse_mode: 'Markdown',
    reply_markup: Markup.inlineKeyboard(buttons).reply_markup
  });
});

// User Command: Redeem License Key
bot.command(['redeem', 'license'], async (ctx) => {
  const userId = ctx.from.id.toString();
  const text = ctx.message.text.trim();
  const parts = text.split(/\s+/);

  if (parts.length < 2) {
    await setUserState(userId, 'awaiting_license_key');
    return ctx.reply(
      `🔑 **សូមបញ្ជាក់ License Key ដែលត្រូវបញ្ចូល៖**\n` +
      `ទម្រង់៖ \`/redeem STUDY-XXXX-XXXX-XXXX\` ឬគ្រាន់តែផ្ញើកូដមកទីនេះ!`,
      { parse_mode: 'Markdown' }
    );
  }

  const rawKey = parts[1];
  const res = await redeemLicenseKey(db, userId, rawKey);

  if (res.success) {
    await setUserState(userId, 'none');
    return ctx.reply(
      `🎉 **អបអរសាទរ! បញ្ចូល License Key ជោគជ័យ!**\n\n` +
      `💎 គណនីរបស់អ្នកឥឡូវនេះជា **VIP** ពេញលេញ!\n` +
      `⏱️ រយៈពេលបន្ថែម៖ **${res.label}** (${res.days} ថ្ងៃ)\n` +
      `⌛ សុពលភាពរហូតដល់៖ **${res.expireDateFormatted}**\n\n` +
      `✨ ឥឡូវអ្នកអាចប្រើប្រាស់មុខងារទាំងអស់៖\n` +
      `• 🧠 សួរគ្រូ AI ដោយគ្មានដែនកំណត់\n` +
      `• 🔊 អានមេរៀនជាសំឡេង\n` +
      `• 📝 ប្រឡង Quiz MCQ និងកត់ត្រាពិន្ទុ\n` +
      `• 🎤 ផ្ញើសារជាសំឡេងបានយ៉ាងងាយស្រួល!`,
      { parse_mode: 'Markdown' }
    );
  } else {
    return ctx.reply(res.message);
  }
});

// Admin Command: Generate License Key
bot.command(['genkey', 'genlicense'], async (ctx) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.reply("⛔ អ្នកគ្មានសិទ្ធិប្រើប្រាស់ Command នេះទេ។");

  const args = ctx.message.text.trim().split(/\s+/);
  if (args.length < 2) {
    return ctx.reply(
      `❌ **ទម្រង់មិនត្រឹមត្រូវ!**\n\n` +
      `សូមវាយ៖ \`/genkey [រយៈពេល] [ចំណាំ/ឈ្មោះសិស្ស]\`\n\n` +
      `ឧទាហរណ៍៖\n` +
      `• \`/genkey 1m\` (សម្រាប់ 1 ខែ)\n` +
      `• \`/genkey 3m ចាន់ណា\` (សម្រាប់ 3 ខែ)\n` +
      `• \`/genkey 1y\` (សម្រាប់ 1 ឆ្នាំ)\n` +
      `• \`/genkey 30d\` (សម្រាប់ 30 ថ្ងៃ)`,
      { parse_mode: 'Markdown' }
    );
  }

  const durationInput = args[1];
  const note = args.slice(2).join(' ');

  const res = await createLicenseKey(db, adminId, durationInput, note);
  if (!res.success) return ctx.reply(res.message);

  return ctx.reply(
    `🎟️ **បង្កើត LICENSE KEY ជោគជ័យ!**\n\n` +
    `🔑 Key: \`${res.key}\` *(ចុចដើម្បី Copy)*\n` +
    `⏱️ រយៈពេល: **${res.label}** (${res.days} ថ្ងៃ)\n` +
    (note ? `📝 ចំណាំ: ${note}\n` : '') +
    `\n📋 **សារសម្រាប់ផ្ញើទៅសិស្ស (Copy ផ្ញើបាន):**\n` +
    `--------------------------\n` +
    `🎉 នេះជា License Key VIP របស់អ្នក:\n` +
    `\`${res.key}\`\n\n` +
    `សូមចូលទៅកាន់ Bot រួចវាយ:\n` +
    `\`/redeem ${res.key}\`\n` +
    `ឬចុចលើប៊ូតុង "🔑 បញ្ចូល License Key" ដើម្បីដំណើរការ VIP!\n` +
    `--------------------------`,
    { parse_mode: 'Markdown' }
  );
});

// Admin Command: Set License Directly to User
bot.command(['setlicense', 'setvip'], async (ctx) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.reply("⛔ អ្នកគ្មានសិទ្ធិប្រើប្រាស់ Command នេះទេ។");

  const args = ctx.message.text.trim().split(/\s+/);
  if (args.length < 3) {
    return ctx.reply(
      `❌ **ទម្រង់មិនត្រឹមត្រូវ!**\n\n` +
      `សូមវាយ៖ \`/setlicense [UserID] [រយៈពេល]\`\n\n` +
      `ឧទាហរណ៍៖\n` +
      `• \`/setlicense 123456789 1m\`\n` +
      `• \`/setlicense 123456789 3m\`\n` +
      `• \`/setlicense 123456789 1y\``,
      { parse_mode: 'Markdown' }
    );
  }

  const targetId = args[1];
  const durationInput = args[2];

  const res = await setDirectLicense(db, adminId, targetId, durationInput);
  if (!res.success) return ctx.reply(res.message);

  ctx.reply(
    `✅ **កំណត់ License ជោគជ័យ!**\n\n` +
    `👤 សិស្ស ID: \`${res.targetUserId}\`\n` +
    `⏱️ បន្ថែម: **${res.label}** (${res.days} ថ្ងៃ)\n` +
    `⌛ ផុតកំណត់: **${res.expireDateFormatted}**`,
    { parse_mode: 'Markdown' }
  );

  try {
    await bot.telegram.sendMessage(
      targetId,
      `🎉 **អបអរសាទរ! Admin បានកំណត់ License VIP ជូនអ្នក!**\n\n` +
      `⏱️ រយៈពេលបន្ថែម៖ **${res.label}**\n` +
      `⌛ សុពលភាពរហូតដល់៖ **${res.expireDateFormatted}**\n\n` +
      `✨ ឥឡូវអ្នកអាចប្រើប្រាស់មុខងារទាំងអស់បានពេញលេញ!`,
      { parse_mode: 'Markdown' }
    );
  } catch (e) {
    console.log("Could not notify user:", e.message);
  }
});

// Admin Command: Revoke / Cancel User License
bot.command(['revokelicense', 'dellicense'], async (ctx) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.reply("⛔ អ្នកគ្មានសិទ្ធិប្រើប្រាស់ Command នេះទេ។");

  const args = ctx.message.text.trim().split(/\s+/);
  if (args.length < 2) {
    return ctx.reply("❌ សូមវាយ៖ `/revokelicense [UserID]`", { parse_mode: 'Markdown' });
  }

  const targetId = args[1];
  await revokeUserLicense(db, adminId, targetId);

  ctx.reply(`✅ បានដកហូត License របស់ ID: \`${targetId}\` រួចរាល់។`, { parse_mode: 'Markdown' });

  try {
    await bot.telegram.sendMessage(
      targetId,
      `⚠️ គណនី VIP របស់អ្នកត្រូវបានដកហូត (Revoked) ដោយ Admin។ ប្រសិនបើមានចម្ងល់សូមទាក់ទង Admin។`,
      { parse_mode: 'Markdown' }
    );
  } catch (e) {}
});

// Admin Command: Check User License
bot.command(['checklicense', 'checkvip'], async (ctx) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.reply("⛔ អ្នកគ្មានសិទ្ធិប្រើប្រាស់ Command នេះទេ។");

  const args = ctx.message.text.trim().split(/\s+/);
  if (args.length < 2) {
    return ctx.reply("❌ សូមវាយ៖ `/checklicense [UserID]`", { parse_mode: 'Markdown' });
  }

  const targetId = args[1];
  const info = await getUserLicenseInfo(db, targetId, SUPER_ADMIN_IDS);

  let msg = `🔍 **ព័ត៌មាន License របស់សិស្ស៖**\n\n` +
    `👤 User ID: \`${targetId}\`\n` +
    `📊 ស្ថានភាព: **${info.statusKhmer}**\n` +
    `⌛ ថ្ងៃផុតកំណត់: **${info.expireDateFormatted}**\n`;

  if (info.isVIP && !info.isAdmin) {
    msg += `⏳ នៅសល់: **${info.daysRemaining} ថ្ងៃ ${info.hoursRemaining} ម៉ោង**\n`;
  }

  return ctx.reply(msg, { parse_mode: 'Markdown' });
});

// Admin Command: List Unused Keys
bot.command('listkeys', async (ctx) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.reply("⛔ អ្នកគ្មានសិទ្ធិប្រើប្រាស់ Command នេះទេ។");

  const keys = await listUnusedKeys(db, 15);
  if (keys.length === 0) {
    return ctx.reply("📭 មិនមាន License Key ដែលទំនេរ (មិនទាន់ប្រើ) ទេ។\nប្រើ `/genkey [duration]` ដើម្បីបង្កើតថ្មី។", { parse_mode: 'Markdown' });
  }

  let msg = `🔑 **បញ្ជី License Keys ដែលនៅទំនេរ (${keys.length}):**\n\n`;
  keys.forEach((k, i) => {
    const created = formatCambodiaTime(k.createdAt);
    msg += `${i + 1}. \`${k.key}\`\n   ⏱️ ${k.label} | បង្កើត: ${created}${k.note ? ` | (${k.note})` : ''}\n\n`;
  });

  return ctx.reply(msg, { parse_mode: 'Markdown' });
});

// ==========================================
// INTERACTIVE ADMIN DASHBOARD
// ==========================================

const broadcastCache = {};

async function sendAdminDashboard(ctx, isEdit = false) {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) {
    if (isEdit) return ctx.answerCbQuery("⛔ អ្នកគ្មានសិទ្ធិទេ។", { show_alert: true });
    return ctx.reply("⛔ អ្នកគ្មានសិទ្ធិប្រើប្រាស់ផ្ទាំងបញ្ជានេះទេ។");
  }

  const stats = await fetchDashboardStats(db);
  const text = renderDashboardText(stats, adminId);
  const markup = getDashboardMarkup();

  if (isEdit) {
    try {
      await ctx.editMessageText(text, {
        parse_mode: 'Markdown',
        reply_markup: markup.reply_markup
      });
      await ctx.answerCbQuery('🔄 Dashboard ត្រូវបាន Update!');
    } catch (e) {
      try { await ctx.answerCbQuery(); } catch(err){}
    }
  } else {
    await ctx.reply(text, {
      parse_mode: 'Markdown',
      reply_markup: markup.reply_markup
    });
  }
}

// Admin Commands: Launch Dashboard
bot.command(['admin', 'dashboard'], async (ctx) => {
  await sendAdminDashboard(ctx, false);
});

// Admin Command: Text Help
bot.command('adminhelp', async (ctx) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.reply("⛔ អ្នកគ្មានសិទ្ធិប្រើប្រាស់ Command នេះទេ។");

  return ctx.reply(
    `🛠️ **ផ្ទាំងបញ្ជា ADMIN (StudyAI License & VIP System)**\n\n` +
    `💡 *អ្នកអាចប្រើប្រាស់ Dashboard ដោយគ្រាន់តែចុច /admin*\n\n` +
    `🔑 **ពាក្យបញ្ជាផ្ទាល់ (Text Commands):**\n` +
    `• \`/admin\` ឬ \`/dashboard\` - បើកផ្ទាំង Dashboard ប៊ូតុង\n` +
    `• \`/genkey 1m [note]\` - បង្កើត Key 1 ខែ\n` +
    `• \`/genkey 3m\` - បង្កើត Key 3 ខែ\n` +
    `• \`/genkey 1y\` - បង្កើត Key 1 ឆ្នាំ\n` +
    `• \`/genkey 30d\` - បង្កើត Key 30 ថ្ងៃ\n` +
    `• \`/listkeys\` - មើល Key ដែលមិនទាន់ប្រើ\n` +
    `• \`/setlicense [ID] 1m\` - កំណត់ License ឱ្យសិស្សផ្ទាល់\n` +
    `• \`/checklicense [ID]\` - ពិនិត្យមើល License សិស្ស\n` +
    `• \`/revokelicense [ID]\` - ដកហូត/លុប License សិស្ស\n` +
    `• \`/addvip [ID] [ខែ]\` - បន្ថែម VIP (ទម្រង់ដើម)`,
    {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.callback('👑 បើក Admin Dashboard', 'adm_back_dash')]
      ]).reply_markup
    }
  );
});

// Backward compatibility: addvip
bot.command('addvip', async (ctx) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.reply("⛔ អ្នកគ្មានសិទ្ធិប្រើប្រាស់ Command នេះទេ។");

  const args = ctx.message.text.trim().split(/\s+/);
  if (args.length !== 3) return ctx.reply("❌ ទម្រង់មិនត្រឹមត្រូវ! សូមវាយ៖ `/addvip [លេខIDសិស្ស] [ចំនួនខែ]`", { parse_mode: 'Markdown' });

  const targetId = args[1];
  const months = parseInt(args[2]);

  if (isNaN(months) || months <= 0) return ctx.reply("❌ ចំនួនខែមិនត្រឹមត្រូវ!");

  const res = await setDirectLicense(db, adminId, targetId, `${months}m`);
  if (!res.success) return ctx.reply(res.message);

  ctx.reply(`✅ ជោគជ័យ! សិស្ស ID: ${targetId} ឥឡូវជាសមាជិក VIP រហូតដល់ថ្ងៃទី ${res.expireDateFormatted}។\n(ប្រវត្តិបង់ប្រាក់ត្រូវបានកត់ត្រាទុកយ៉ាងមានសុវត្ថិភាព)`);

  try {
    await bot.telegram.sendMessage(targetId, `🎉 អបអរសាទរ! គណនីរបស់អ្នកត្រូវបានអាប់ដេតទៅជា VIP (Upgrade) រួចរាល់។\nអ្នកបានបន្ថែមចំនួន ${months} ខែ។\nអ្នកអាចប្រើប្រាស់មុខងារទាំងអស់បានរហូតដល់៖ **${res.expireDateFormatted}**!`, { parse_mode: 'Markdown' });
  } catch (e) {
    console.log("Could not notify user:", e.message);
  }
});

// Dashboard Action: Refresh / Back to Dashboard
bot.action(['adm_refresh', 'adm_back_dash'], async (ctx) => {
  await sendAdminDashboard(ctx, true);
});

// Dashboard Action: Open GenKey Menu
bot.action('adm_menu_genkey', async (ctx) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.answerCbQuery("⛔ អ្នកគ្មានសិទ្ធិទេ។", { show_alert: true });

  await ctx.answerCbQuery();
  await ctx.editMessageText(
    `🎟️ **ជ្រើសរើសរយៈពេល License Key ដែលចង់បង្កើត ៖**\n\n` +
    `ចុចលើប៊ូតុងខាងក្រោមដើម្បីបង្កើត Key ភ្លាមៗ (1-Click)៖`,
    {
      parse_mode: 'Markdown',
      reply_markup: getGenKeyMarkup().reply_markup
    }
  );
});

// Dashboard Action: 1-Click Generate Keys
const handleQuickGenKey = async (ctx, durationStr) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.answerCbQuery("⛔ អ្នកគ្មានសិទ្ធិទេ។", { show_alert: true });

  await ctx.answerCbQuery("⚡ កំពុងបង្កើត Key...");
  const res = await createLicenseKey(db, adminId, durationStr, 'Dashboard 1-Click');
  if (!res.success) return ctx.reply(res.message);

  const text = (
    `🎟️ **បង្កើត LICENSE KEY ជោគជ័យ!**\n\n` +
    `🔑 Key: \`${res.key}\` *(ចុចដើម្បី Copy)*\n` +
    `⏱️ រយៈពេល: **${res.label}** (${res.days} ថ្ងៃ)\n\n` +
    `📋 **សារសម្រាប់ Forward ទៅសិស្ស (Copy ផ្ញើបាន):**\n` +
    `--------------------------\n` +
    `🎉 នេះជា License Key គណនី VIP របស់អ្នក:\n` +
    `\`${res.key}\`\n\n` +
    `សូមចូលទៅកាន់ Bot រួចវាយ:\n` +
    `\`/redeem ${res.key}\`\n` +
    `ឬចុចលើប៊ូតុង "🔑 បញ្ចូល License Key" ដើម្បីដំណើរការ VIP!\n` +
    `--------------------------`
  );

  const markup = Markup.inlineKeyboard([
    [Markup.button.callback(`➕ បង្កើត ${res.label} មួយទៀត`, `adm_gen_${durationStr}`)],
    [Markup.button.callback('🎟️ បង្កើតរយៈពេលផ្សេង', 'adm_menu_genkey')],
    [Markup.button.callback('🔙 ត្រឡប់ទៅ Dashboard', 'adm_back_dash')]
  ]);

  try {
    await ctx.editMessageText(text, { parse_mode: 'Markdown', reply_markup: markup.reply_markup });
  } catch (e) {
    await ctx.reply(text, { parse_mode: 'Markdown', reply_markup: markup.reply_markup });
  }
};

bot.action('adm_gen_1m', (ctx) => handleQuickGenKey(ctx, '1m'));
bot.action('adm_gen_3m', (ctx) => handleQuickGenKey(ctx, '3m'));
bot.action('adm_gen_6m', (ctx) => handleQuickGenKey(ctx, '6m'));
bot.action('adm_gen_1y', (ctx) => handleQuickGenKey(ctx, '1y'));
bot.action('adm_gen_30d', (ctx) => handleQuickGenKey(ctx, '30d'));

// Dashboard Action: List Keys
bot.action('adm_list_keys', async (ctx) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.answerCbQuery("⛔ អ្នកគ្មានសិទ្ធិទេ។", { show_alert: true });

  await ctx.answerCbQuery();
  const keys = await listUnusedKeys(db, 15);
  let msg = '';
  if (keys.length === 0) {
    msg = "📭 មិនមាន License Key ដែលទំនេរ (មិនទាន់ប្រើ) ទេ។";
  } else {
    msg = `🔑 **បញ្ជី License Keys ដែលនៅទំនេរ (${keys.length}):**\n\n`;
    keys.forEach((k, i) => {
      const created = formatCambodiaTime(k.createdAt);
      msg += `${i + 1}. \`${k.key}\`\n   ⏱️ ${k.label} | ${created}${k.note ? ` | (${k.note})` : ''}\n\n`;
    });
  }

  const markup = Markup.inlineKeyboard([
    [Markup.button.callback('🎟️ បង្កើត Key ថ្មី', 'adm_menu_genkey')],
    [Markup.button.callback('🔙 ត្រឡប់ទៅ Dashboard', 'adm_back_dash')]
  ]);

  await ctx.editMessageText(msg, { parse_mode: 'Markdown', reply_markup: markup.reply_markup });
});

// Dashboard Action: Check User
bot.action('adm_check_user', async (ctx) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.answerCbQuery("⛔ អ្នកគ្មានសិទ្ធិទេ។", { show_alert: true });

  await setUserState(adminId, 'adm_awaiting_check_id');
  await ctx.answerCbQuery();
  await ctx.reply(
    `🔍 **សូមផ្ញើ Telegram User ID របស់សិស្សដែលចង់ពិនិត្យមើល៖**\n\n` +
    `*(ឬវាយ \`/cancel\` ដើម្បីបោះបង់)*`,
    { parse_mode: 'Markdown' }
  );
});

// Dashboard Action: Set VIP
bot.action('adm_set_vip', async (ctx) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.answerCbQuery("⛔ អ្នកគ្មានសិទ្ធិទេ។", { show_alert: true });

  await setUserState(adminId, 'adm_awaiting_set_vip');
  await ctx.answerCbQuery();
  await ctx.reply(
    `➕ **កំណត់ VIP ផ្ទាល់ឱ្យសិស្ស**\n\n` +
    `សូមផ្ញើសារទម្រង់៖ \`[UserID] [រយៈពេល]\`\n` +
    `ឧទាហរណ៍៖ \`123456789 1m\` ឬ \`123456789 3m\`\n\n` +
    `*(ឬវាយ \`/cancel\` ដើម្បីបោះបង់)*`,
    { parse_mode: 'Markdown' }
  );
});

// Dashboard Action: Revoke VIP
bot.action('adm_revoke_vip', async (ctx) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.answerCbQuery("⛔ អ្នកគ្មានសិទ្ធិទេ។", { show_alert: true });

  await setUserState(adminId, 'adm_awaiting_revoke_id');
  await ctx.answerCbQuery();
  await ctx.reply(
    `⛔ **ដកហូត VIP របស់សិស្ស**\n\n` +
    `សូមផ្ញើ Telegram User ID របស់សិស្សដែលត្រូវដកហូត ៖\n\n` +
    `*(ឬវាយ \`/cancel\` ដើម្បីបោះបង់)*`,
    { parse_mode: 'Markdown' }
  );
});

// Dashboard Action: Broadcast Announcement
bot.action('adm_broadcast', async (ctx) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.answerCbQuery("⛔ អ្នកគ្មានសិទ្ធិទេ។", { show_alert: true });

  await setUserState(adminId, 'adm_awaiting_broadcast_msg');
  await ctx.answerCbQuery();
  await ctx.reply(
    `📢 **ផ្ញើសារប្រកាស (Broadcast) ទៅកាន់សិស្សទាំងអស់**\n\n` +
    `សូមផ្ញើសារដែលអ្នកចង់ប្រកាសមកទីនេះ (ប្រព័ន្ធនឹងបង្ហាញ Preview និងសួរការបញ្ជាក់មុននឹងផ្ញើចេញ) ៖\n\n` +
    `*(ឬវាយ \`/cancel\` ដើម្បីបោះបង់)*`,
    { parse_mode: 'Markdown' }
  );
});

// Dashboard Action: Confirm Broadcast
bot.action('adm_confirm_broadcast', async (ctx) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.answerCbQuery("⛔ អ្នកគ្មានសិទ្ធិទេ។", { show_alert: true });

  const cached = broadcastCache[adminId];
  if (!cached || !cached.text) {
    return ctx.reply("❌ មិនមានសារដែលត្រូវប្រកាសទេ។ សូមសាកល្បងម្ដងទៀត។");
  }

  await ctx.answerCbQuery("🚀 កំពុងចាប់ផ្តើមផ្ញើសារប្រកាស...");
  await ctx.editMessageText("⏳ **កំពុងដំណើរការផ្ញើសារទៅកាន់សិស្សទាំងអស់ សូមរង់ចាំបន្តិច...**", { parse_mode: 'Markdown' });

  const usersSnap = await db.ref('users').once('value');
  const usersVal = usersSnap.val() || {};
  const userIds = Object.keys(usersVal);

  let successCount = 0;
  let failCount = 0;

  for (const uid of userIds) {
    try {
      await bot.telegram.sendMessage(uid, cached.text, { parse_mode: 'Markdown' });
      successCount++;
    } catch (e) {
      failCount++;
    }
    await new Promise(r => setTimeout(r, 40)); // safe delay
  }

  delete broadcastCache[adminId];
  await ctx.reply(
    `📢 **ការប្រកាស (Broadcast) បានបញ្ចប់!**\n\n` +
    `✅ ផ្ញើបានជោគជ័យ: **${successCount} នាក់**\n` +
    `❌ បរាជ័យ (Block/Inactive): **${failCount} នាក់**\n` +
    `👥 សិស្សសរុប: **${userIds.length} នាក់**`,
    {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.callback('🔙 ត្រឡប់ទៅ Dashboard', 'adm_back_dash')]
      ]).reply_markup
    }
  );
});

// Dashboard Action: Cancel Broadcast
bot.action('adm_cancel_broadcast', async (ctx) => {
  const adminId = ctx.from.id.toString();
  delete broadcastCache[adminId];
  await ctx.answerCbQuery("❌ បានបោះបង់");
  await sendAdminDashboard(ctx, true);
});

// Dashboard Action: Help
bot.action('adm_help', async (ctx) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.answerCbQuery("⛔ អ្នកគ្មានសិទ្ធិទេ។", { show_alert: true });

  await ctx.answerCbQuery();
  const helpText = (
    `📖 **សៀវភៅពាក្យបញ្ជា ADMIN (StudyAI Bot)**\n\n` +
    `• \`/admin\` - បើកផ្ទាំង Dashboard ប៊ូតុងបញ្ជារហ័ស\n` +
    `• \`/genkey [1m/3m/1y] [note]\` - បង្កើត License Key\n` +
    `• \`/listkeys\` - មើលបញ្ជី Key ទំនេរ\n` +
    `• \`/setlicense [ID] [1m/3m]\` - ដាក់ VIP ឱ្យសិស្សផ្ទាល់\n` +
    `• \`/checklicense [ID]\` - មើលថ្ងៃផុតកំណត់របស់សិស្ស\n` +
    `• \`/revokelicense [ID]\` - ដកហូត VIP សិស្ស\n` +
    `• \`/addvip [ID] [ចំនួនខែ]\` - បន្ថែម VIP\n` +
    `• \`/cancel\` - បោះបង់ប្រតិបត្តិការដែលកំពុងរង់ចាំ`
  );

  await ctx.editMessageText(helpText, {
    parse_mode: 'Markdown',
    reply_markup: Markup.inlineKeyboard([
      [Markup.button.callback('🔙 ត្រឡប់ទៅ Dashboard', 'adm_back_dash')]
    ]).reply_markup
  });
});

bot.hears('🕰️ ប្រវត្តិសិក្សា', async (ctx) => {
  const userId = ctx.from.id;
  const snapshot = await db.ref(`users/${userId}/progress`).once('value');
  const progressData = snapshot.val();

  if (!progressData) {
    return ctx.reply("📝 អ្នកមិនទាន់មានប្រវត្តិប្រឡងបញ្ជាក់សមត្ថភាពនៅឡើយទេ។ សូមជ្រើសរើសមេរៀនដើម្បីចាប់ផ្តើមរៀន និងប្រឡង!");
  }

  const lessons = Object.values(progressData).sort((a, b) => b.timestamp - a.timestamp);
  
  if (lessons.length === 0) {
    return ctx.reply("📝 អ្នកមិនទាន់មានប្រវត្តិប្រឡងបញ្ជាក់សមត្ថភាពនៅឡើយទេ។ សូមជ្រើសរើសមេរៀនដើម្បីចាប់ផ្តើមរៀន និងប្រឡង!");
  }

  let msg = "📚 **ប្រវត្តិប្រឡងមេរៀនដែលអ្នកបានធ្វើថ្មីៗនេះ៖**\n\n";
  const limit = Math.min(lessons.length, 10);
  for (let i = 0; i < limit; i++) {
    const date = new Date(lessons[i].timestamp).toLocaleString('en-GB', { timeZone: 'Asia/Phnom_Penh' });
    msg += `✅ ${lessons[i].title}\n🕒 ${date}\n\n`;
  }
  if (lessons.length > 10) msg += `...និង ${lessons.length - 10} មេរៀនទៀត។`;
  ctx.reply(msg, { parse_mode: 'Markdown' });
});

bot.hears('❓ ជំនួយ (Help)', (ctx) => {
  ctx.reply("💡 **ជំនួយការប្រើប្រាស់ (Help)**\n\n" +
    "១. ចុច '📚 បញ្ជីមេរៀន' ដើម្បីជ្រើសរើសខែ និងមេរៀន។\n" +
    "២. ចុច '🔄 ប្តូរគ្រូ AI' ដើម្បីប្តូរគ្រូ (មាន Gemini និង Groq)។\n" +
    "៣. ពេលរើសមេរៀនរួច អ្នកអាចចុចប៊ូតុង 🔊 ដើម្បីឱ្យគ្រូ AI អានមេរៀននោះជាសំឡេងបាន។\n" +
    "៤. អ្នកអាចវាយសួរ ឬផ្ញើជាសំឡេង (Voice Message) ទៅកាន់គ្រូ AI គ្រប់ពេល។",
    { parse_mode: 'Markdown' }
  );
});

// Generate Keyboard for 12 Months & Beginner Course
// 6 Core Subjects Definition for Standard 12-Month Course (48 lessons each = 288 lessons total)
const STANDARD_SUBJECT_DEFS = [
  {
    id: 'grammar',
    title: 'វេយ្យាករណ៍ភាសាអង់គ្លេស',
    titleEn: 'Grammar in Use',
    icon: '📘',
    description: 'វេយ្យាករណ៍ពេញលេញ ៤៨ មេរៀន (Nouns, Tenses, Modals, Passive, Conditionals...)',
    lessonIdx: 0,
    examKey: 'grammar'
  },
  {
    id: 'conversation',
    title: 'ការសន្ទនាជាក់ស្តែង',
    titleEn: 'Situational Conversation',
    icon: '🗣️',
    description: 'ការសន្ទនាជាក់ស្តែង ៤៨ បរិបទ (Greetings, Shopping, Travel, Business, Daily Life...)',
    lessonIdx: 1,
    examKey: 'conversation'
  },
  {
    id: 'vocabulary',
    title: 'វាក្យសព្ទ និងឃ្លាទូទៅ',
    titleEn: 'Vocabulary & Context',
    icon: '📖',
    description: 'វាក្យសព្ទ និងឃ្លាសំខាន់ៗ ៤៨ ប្រធានបទ ភ្ជាប់ជាមួយឧទាហរណ៍ជាក់ស្តែង',
    lessonIdx: 2,
    examKey: 'vocabulary'
  },
  {
    id: 'verbs',
    title: 'កិរិយាសព្ទ និងកាល',
    titleEn: 'Verbs & Tenses',
    icon: '⚡',
    description: 'កិរិយាសព្ទគោល និងកិរិយាសព្ទមិនប្រក្រតី (V1, V2, V3) ៤៨ មេរៀន',
    lessonIdx: 3,
    examKey: 'verbs'
  },
  {
    id: 'adjectives',
    title: 'គុណនាម និងការប្រៀបធៀប',
    titleEn: 'Adjectives & Comparison',
    icon: '🎨',
    description: 'គុណនាមពណ៌នា និងកម្រិតប្រៀបធៀប ៤៨ មេរៀន',
    lessonIdx: 4,
    examKey: 'adjectives'
  },
  {
    id: 'sentences',
    title: 'ទម្រង់ល្បះ និងកន្សោមពាក្យ',
    titleEn: 'Sentence Patterns',
    icon: '✍️',
    description: 'ទម្រង់ល្បះគំរូ និងការតែងប្រយោគទំនាក់ទំនង ៤៨ មេរៀន',
    lessonIdx: 5,
    examKey: 'sentences'
  }
];

// Helper: Extract all 48 lessons for a given subject
function getSubjectLessons(subjectId) {
  const subj = STANDARD_SUBJECT_DEFS.find(s => s.id === subjectId);
  if (!subj) return [];
  const list = [];
  let lessonNum = 1;
  curriculum.months.forEach(m => {
    (m.weeks || []).forEach(w => {
      const l = w.lessons && w.lessons[subj.lessonIdx];
      if (l) {
        list.push({
          lessonNum,
          id: l.id,
          title: l.title,
          monthId: m.id,
          weekId: w.id,
          monthTitle: m.title,
          weekTitle: w.title,
          dbKey: `${m.id}-${w.id}-${l.id}`,
          isFree: lessonNum <= 3
        });
        lessonNum++;
      }
    });
  });
  return list;
}

// Generate Keyboard for 6 Subjects & Beginner Course
function getMonthsKeyboard() {
  const rows = [];
  // Top Banner: Beginner Class by Teacher Piseth
  rows.push([Markup.button.callback('👩‍🏫 ថ្នាក់ដំបូង • អ្នកគ្រូ ពិសិដ្ឋ (Beginner Class)', 'beginner_menu')]);

  // 6 Core Subjects (48 lessons each)
  STANDARD_SUBJECT_DEFS.forEach((subj, idx) => {
    rows.push([
      Markup.button.callback(
        `${subj.icon} ${idx + 1}. ${subj.title} (៤៨ មេរៀន)`,
        `std_subj_${subj.id}_1`
      )
    ]);
  });

  rows.push([Markup.button.callback('🎓 ការប្រឡងបញ្ចប់មុខវិជ្ជា (៣០ សំណួរ)', 'annual_exams_menu')]);
  rows.push([Markup.button.callback('📜 វិញ្ញាបនបត្ររបស់ខ្ញុំ (My Certificates)', 'my_certificates_menu')]);
  return Markup.inlineKeyboard(rows);
}

// Handle Subject Selection with Pagination (12 lessons per page, 4 pages total)
bot.action(/std_subj_([^_]+)_(\d+)/, async (ctx) => {
  const subjectId = ctx.match[1];
  const page = parseInt(ctx.match[2]) || 1;
  const userId = ctx.from.id.toString();

  // Membership guard
  if (!(await isMember(userId))) {
    await ctx.answerCbQuery('🔒 សូមចូលឆានែលជាមុន!');
    return ctx.reply('🔒 សូមចូលឆានែល @ssonlinechanel ជាមុនសិន!', {
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.url('📢 ចូលឆានែល', CHANNEL_URL)],
        [Markup.button.callback('✅ ខ្ញុំបានចូលហើយ', 'check_membership')]
      ]).reply_markup
    });
  }

  const subj = STANDARD_SUBJECT_DEFS.find(s => s.id === subjectId);
  if (!subj) return ctx.answerCbQuery("រកមិនឃើញមុខវិជ្ជា");

  const allLessons = getSubjectLessons(subjectId);
  const pageSize = 12;
  const totalPages = Math.ceil(allLessons.length / pageSize) || 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * pageSize;
  const pageLessons = allLessons.slice(startIndex, startIndex + pageSize);

  // Fetch completed lessons of user
  let completedMap = {};
  if (db) {
    try {
      const cSnap = await db.ref(`users/${userId}/completed_lessons`).once('value');
      completedMap = cSnap.val() || {};
    } catch (e) {}
  }

  const isVIP = await checkVIP(userId);
  const isAdmin = SUPER_ADMIN_IDS.includes(userId);

  const passedTotal = allLessons.filter(l => !!completedMap[l.dbKey]).length;

  const buttons = [];

  // Top Action: Final Exam button
  const isAllPassed = passedTotal >= allLessons.length;
  const examBtnText = isAllPassed || isAdmin
    ? `🎓 ប្រឡងបញ្ចប់ ${subj.titleEn} (៣០ សំណួរ) 🔓`
    : `🔒 ប្រឡងបញ្ចប់មុខវិជ្ជា (${passedTotal}/${allLessons.length} មេរៀន)`;
  buttons.push([Markup.button.callback(examBtnText, `start_annual_${subj.examKey}`)]);

  // Lessons list for this page
  pageLessons.forEach(l => {
    const comp = completedMap[l.dbKey];
    const prevKey = l.lessonNum > 1 ? allLessons[l.lessonNum - 2].dbKey : null;
    const isPrevPassed = l.lessonNum === 1 || !!completedMap[prevKey];
    const isSeqLocked = !isAdmin && !isPrevPassed;
    const isVipLocked = !isAdmin && !l.isFree && !isVIP;

    let icon = '▶️ ';
    let statusText = '';
    if (comp) {
      icon = '✅ ';
      statusText = ` (ជាប់ ថ្នាក់ ${comp.grade})`;
    } else if (isSeqLocked) {
      icon = '🔒 ';
      statusText = ' (រៀនតាមលំដាប់)';
    } else if (isVipLocked) {
      icon = '🔒 ';
      statusText = ' (VIP)';
    } else if (l.isFree) {
      statusText = ' (Free)';
    }

    const shortTitle = l.title.includes('៖') ? l.title.split('៖')[1].trim() : l.title;
    const btnLabel = `${icon}Day ${l.lessonNum}: ${shortTitle}${statusText}`.slice(0, 50);
    buttons.push([Markup.button.callback(btnLabel, `lesson_${l.monthId}-${l.weekId}-${l.id}`)]);
  });

  // Pagination navigation
  const navRow = [];
  if (currentPage > 1) {
    navRow.push(Markup.button.callback('⬅️ ទំព័រមុន', `std_subj_${subjectId}_${currentPage - 1}`));
  }
  if (currentPage < totalPages) {
    navRow.push(Markup.button.callback('ទំព័របន្ទាប់ ➡️', `std_subj_${subjectId}_${currentPage + 1}`));
  }
  if (navRow.length > 0) buttons.push(navRow);

  buttons.push([Markup.button.callback('🔙 ត្រឡប់ទៅមុខវិជ្ជាទាំងអស់', 'back_to_months')]);

  const headerMsg = 
    `${subj.icon} *${subj.title} (${subj.titleEn})*\n` +
    `📖 ${subj.description}\n\n` +
    `📊 វឌ្ឍនភាពរបស់អ្នក៖ *${passedTotal} / ${allLessons.length} មេរៀន* (ទំព័រ ${currentPage}/${totalPages})\n` +
    `💡 *លក្ខខណ្ឌសិក្សា៖*\n` +
    `• មេរៀនទី ១, ២, ៣ ៖ រៀនសាកល្បងឥតគិតថ្លៃ (Free Trial)\n` +
    `• មេរៀនទី ៤ ដល់ ៤៨ ៖ សម្រាប់សមាជិក VIP 💎\n` +
    `• ក្នុង១មេរៀនប្រឡងម្តង (១០ សំណួរ) ដើម្បីពង្រឹងសមត្ថភាព\n` +
    `• រៀនចប់គ្រប់ ៤៨ មេរៀន ទើបអាចប្រឡងបញ្ចប់មុខវិជ្ជា (៣០ សំណួរ) យកវិញ្ញាបនបត្រ! 📜\n\n` +
    `👇 សូមជ្រើសរើសមេរៀនដើម្បីរៀន៖`;

  try {
    await ctx.editMessageText(headerMsg, {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard(buttons).reply_markup
    });
  } catch (e) {
    await ctx.reply(headerMsg, {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard(buttons).reply_markup
    });
  }
});

// Handle Month Selection (fallback if old links used)
bot.action(/month_(.+)/, async (ctx) => {
  const monthId = ctx.match[1];
  const userId = ctx.from.id;

  // Membership guard
  if (!(await isMember(userId))) {
    await ctx.answerCbQuery('🔒 សូមចូលឆានែលជាមុន!');
    return ctx.reply('🔒 សូមចូលឆានែល @ssonlinechanel ជាមុនសិន!', {
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.url('📢 ចូលឆានែល', CHANNEL_URL)],
        [Markup.button.callback('✅ ខ្ញុំបានចូលហើយ', 'check_membership')]
      ]).reply_markup
    });
  }

  const monthData = curriculum.months.find(m => m.id === monthId);
  if (!monthData) return ctx.answerCbQuery("រកមិនឃើញទិន្នន័យខែ");

  const buttons = monthData.weeks.map(w => [Markup.button.callback(w.title, `week_${monthId}-${w.id}`)]);
  buttons.push([Markup.button.callback('🔙 ត្រឡប់ក្រោយ (Back)', 'back_to_months')]);

  await ctx.editMessageText(`📅 ${monthData.title}\nសូមជ្រើសរើសសប្តាហ៍សិក្សា៖`, Markup.inlineKeyboard(buttons));
});

bot.action('back_to_months', async (ctx) => {
  await ctx.editMessageText("សូមជ្រើសរើសមុខវិជ្ជាដែលអ្នកចង់រៀន៖", getMonthsKeyboard());
});

// Helper: Flatten all 26 beginner lessons A-Z
function getAllBeginnerLessons() {
  const list = [];
  if (beginnerCourse && beginnerCourse.weeks) {
    beginnerCourse.weeks.forEach(w => {
      (w.lessons || []).forEach(l => {
        list.push({ weekId: w.id, lesson: l });
      });
    });
  }
  return list;
}

// Helper: Check if lesson is one of the 3 free trial lessons for each course level
function isLessonFree(monthId, weekId, lessonId) {
  // 1. Beginner Level (bl1 to bl26)
  if (monthId === 'beginner' || monthId === 'm0') {
    const num = parseInt((lessonId || '').replace('bl', ''));
    return num >= 1 && num <= 3;
  }
  // 2. Elementary Level (el1 to el72)
  if (monthId === 'elementary' || (monthId && monthId.startsWith('em'))) {
    const num = parseInt((lessonId || '').replace('el', ''));
    return num >= 1 && num <= 3;
  }
  // 3. Standard / 12-Month Level: Month 1 weeks w1, w2, w3 are lesson 1, 2, 3 of all 6 subjects!
  if (monthId === 'm1' && ['w1', 'w2', 'w3'].includes(weekId)) {
    return true;
  }
  return false;
}

// Generate Keyboard for Beginner Course (A-Z Lessons in 2 columns)
function getBeginnerKeyboard() {
  const allLessons = getAllBeginnerLessons();
  const rows = [];
  for (let i = 0; i < allLessons.length; i += 2) {
    const row = [];
    const item1 = allLessons[i];
    const isFree1 = item1.lesson.day <= 3;
    row.push(Markup.button.callback(
      `${isFree1 ? '' : '🔒 '}Day ${item1.lesson.day}: ${item1.lesson.letter} • ${item1.lesson.word}`,
      `beginner_lesson_${item1.weekId}_${item1.lesson.id}`
    ));
    if (i + 1 < allLessons.length) {
      const item2 = allLessons[i + 1];
      const isFree2 = item2.lesson.day <= 3;
      row.push(Markup.button.callback(
        `${isFree2 ? '' : '🔒 '}Day ${item2.lesson.day}: ${item2.lesson.letter} • ${item2.lesson.word}`,
        `beginner_lesson_${item2.weekId}_${item2.lesson.id}`
      ));
    }
    rows.push(row);
  }
  rows.push([Markup.button.callback('🔙 ថ្នាក់ទូទៅ ១២ ខែ (គ្រូសន)', 'back_to_months')]);
  return Markup.inlineKeyboard(rows);
}

// Beginner Course (Teacher Piseth) Actions - Direct A-Z Lessons List
bot.action('beginner_menu', async (ctx) => {
  const teacher = beginnerCourse.teacher;
  const msg = 
    `👩‍🏫 *${teacher.name} (${teacher.englishName})*\n` +
    `_${teacher.role}_\n\n` +
    `🌟 *បញ្ជីមេរៀនថ្នាក់ដំបូង A - Z (English for Children)*\n` +
    `📚 រៀន ១ ថ្ងៃ៖ ១ តួអក្សរ • ១ ពាក្យ • ១ ល្បះគំរូ (២៦ ថ្ងៃ)\n` +
    `👇 សូមជ្រើសរើសមេរៀនដើម្បីចាប់ផ្តើមរៀន៖`;

  try {
    await ctx.editMessageText(msg, {
      parse_mode: 'Markdown',
      ...getBeginnerKeyboard()
    });
  } catch (err) {
    await ctx.reply(msg, {
      parse_mode: 'Markdown',
      ...getBeginnerKeyboard()
    });
  }
});

bot.action(/beginner_week_(.+)/, async (ctx) => {
  const teacher = beginnerCourse.teacher;
  const msg = 
    `👩‍🏫 *${teacher.name} (${teacher.englishName})*\n` +
    `_${teacher.role}_\n\n` +
    `🌟 *បញ្ជីមេរៀនថ្នាក់ដំបូង A - Z (English for Children)*\n` +
    `📚 រៀន ១ ថ្ងៃ៖ ១ តួអក្សរ • ១ ពាក្យ • ១ ល្បះគំរូ (២៦ ថ្ងៃ)\n` +
    `👇 សូមជ្រើសរើសមេរៀនដើម្បីចាប់ផ្តើមរៀន៖`;

  await ctx.editMessageText(msg, {
    parse_mode: 'Markdown',
    ...getBeginnerKeyboard()
  });
});

bot.action(/beginner_lesson_(.+)_(.+)/, async (ctx) => {
  const userId = ctx.from?.id ? ctx.from.id.toString() : '';
  const weekId = ctx.match[1];
  const lessonId = ctx.match[2];
  
  const allLessons = getAllBeginnerLessons();
  const currIdx = allLessons.findIndex(item => item.lesson.id === lessonId);
  if (currIdx === -1) return ctx.answerCbQuery("រកមិនឃើញមេរៀន");

  const { lesson } = allLessons[currIdx];

  // VIP Permission Check: Only first 3 lessons of Beginner level are free for non-VIP
  const isFree = isLessonFree('beginner', weekId, lessonId);
  const isVIP = await checkVIP(userId);
  if (!isFree && !isVIP) {
    return ctx.reply(
      `🔒 *មេរៀនថ្នាក់ដំបូងនេះសម្រាប់តែសមាជិក VIP ប៉ុណ្ណោះ!* 💎\n\n` +
      `💡 គណនី Free អាចរៀនសាកល្បងឥតគិតថ្លៃបាន ៣ មេរៀនដំបូង (Day 1, 2, 3) នៃកម្រិតនីមួយៗ។\n` +
      `ដើម្បីបន្តរៀនមេរៀន Day ${lesson.day} ឡើងទៅ និងទទួលបានវិញ្ញាបនបត្រ សូមដំឡើងទៅកាន់ *VIP* 💎\n\n` +
      `💎 *តម្លៃសមរម្យ៖ 3$/ខែ | 30$/ពេញមួយឆ្នាំ*`,
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback('💎 Upgrade VIP ឥឡូវនេះ', 'vip_upgrade')],
          [Markup.button.callback('🔑 បញ្ចូល License Key', 'enter_license_key')],
          [Markup.button.callback('👩‍🏫 បញ្ជីមេរៀន A - Z (ថ្នាក់ដំបូង)', 'beginner_menu')]
        ]).reply_markup
      }
    );
  }

  const text = `👩‍🏫 *${beginnerCourse.teacher.name}* • ថ្នាក់ដំបូង (A - Z)\n` +
    `📖 *${lesson.title}*\n\n` +
    lesson.content;

  // Store the lesson text for TTS & set current tutor to Teacher Piseth (Female Voice)
  if (userId) {
    setLatestResponse(userId, lesson.content, 'piseth');
  }

  const keyboardRows = [];
  // 1. Audio TTS buttons (KH + EN)
  keyboardRows.push([
    Markup.button.callback('🔊 ខ្មែរ (Teacher Piseth)', `tts_${userId}`),
    Markup.button.callback('🔊 English (Listen EN)', `tts_en_${userId}`)
  ]);
  keyboardRows.push([Markup.button.callback('🌍 បកប្រែ EN↔KH (Translate)', `translate_beginner_${weekId}_${lessonId}`)]);

  // 2. Adjacent Previous and Next Lesson navigation buttons
  const navRow = [];
  if (currIdx > 0) {
    const prev = allLessons[currIdx - 1];
    navRow.push(Markup.button.callback(`◀ Day ${prev.lesson.day}: ${prev.lesson.letter}`, `beginner_lesson_${prev.weekId}_${prev.lesson.id}`));
  }
  if (currIdx < allLessons.length - 1) {
    const next = allLessons[currIdx + 1];
    navRow.push(Markup.button.callback(`Day ${next.lesson.day}: ${next.lesson.letter} ▶`, `beginner_lesson_${next.weekId}_${next.lesson.id}`));
  }
  if (navRow.length > 0) {
    keyboardRows.push(navRow);
  }

  // 3. Return to Beginner Lessons A-Z list directly
  keyboardRows.push([Markup.button.callback('👩‍🏫 បញ្ជីមេរៀន A - Z (ថ្នាក់ដំបូង)', 'beginner_menu')]);
  // 4. Return to 12 Months
  keyboardRows.push([Markup.button.callback('🔙 ថ្នាក់ទូទៅ ១២ ខែ (គ្រូសន)', 'back_to_months')]);

  const maxLen = 3900;
  if (text.length > maxLen) {
    const part1 = text.substring(0, maxLen);
    const part2 = text.substring(maxLen);
    await ctx.reply(part1, { parse_mode: 'Markdown' });
    await ctx.reply(part2, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard(keyboardRows)
    });
  } else {
    await ctx.reply(text, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard(keyboardRows)
    });
  }
});

bot.command(['piseth', 'beginner', 'foundation'], async (ctx) => {
  const teacher = beginnerCourse.teacher;
  const msg = `👩‍🏫 *${teacher.name} (${teacher.englishName})*\n` +
    `_${teacher.role}_\n\n` +
    `${teacher.welcomeGreeting}\n\n` +
    `📚 *កម្មវិធីសិក្សាថ្នាក់ដំបូង (English for Children: A - Z)៖*\n` +
    `• រៀន ១ ថ្ងៃ៖ ១ តួអក្សរ • ១ ពាក្យ • ១ ល្បះគំរូ (២៦ ថ្ងៃ)\n` +
    `• ពីអក្សរ A ដល់ Z រៀនងាយស្រួល ច្បាស់លាស់ និងសប្បាយរីករាយ!`;

  await ctx.reply(msg, {
    parse_mode: 'Markdown',
    ...getBeginnerKeyboard()
  });
});

// Handle Week Selection
// Helper: Display Lesson Content & Controls
async function displayLessonContent(ctx, monthId, weekId, lessonId, userId) {
  const monthData = curriculum.months.find(m => m.id === monthId);
  if (!monthData) return ctx.reply("❌ រកមិនឃើញទិន្នន័យខែ!");

  const weekData = monthData.weeks.find(w => w.id === weekId);
  if (!weekData) return ctx.reply("❌ រកមិនឃើញសប្តាហ៍!");

  const lessonData = weekData.lessons.find(l => l.id === lessonId);
  if (!lessonData) return ctx.reply("❌ រកមិនឃើញមេរៀន!");

  // VIP Permission Check: Only first 3 lessons of Standard level are free for non-VIP
  const isVIP = await checkVIP(userId);
  const isFree = isLessonFree(monthId, weekId, lessonId);
  if (!isFree && !isVIP) {
    return ctx.reply(
      `🔒 *មេរៀននេះសម្រាប់តែសមាជិក VIP ប៉ុណ្ណោះ!* 💎\n\n` +
      `💡 គណនី Free អាចរៀនសាកល្បងឥតគិតថ្លៃបាន ៣ មេរៀនដំបូងនៃកម្រិតនីមួយៗ។\n` +
      `ដើម្បីបន្តរៀនមេរៀន ${lessonData.title} ឡើងទៅ និងទទួលបានវិញ្ញាបនបត្រ សូមដំឡើងទៅកាន់ *VIP* 💎\n\n` +
      `💎 *តម្លៃសមរម្យ៖ 3$/ខែ | 30$/ពេញមួយឆ្នាំ*`,
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback('💎 Upgrade VIP ឥឡូវនេះ', 'vip_upgrade')],
          [Markup.button.callback('🔑 បញ្ចូល License Key', 'enter_license_key')],
          [Markup.button.callback('🔙 ត្រឡប់ទៅមុខវិជ្ជា', 'back_to_months')]
        ]).reply_markup
      }
    );
  }

  // Sequential Progression Check (Lesson 1 -> 2 -> ... -> 48)
  const isAdmin = SUPER_ADMIN_IDS.includes(userId);
  if (!isAdmin && monthId.startsWith('m') && weekId.startsWith('w')) {
    const monthNum = parseInt(monthId.replace('m', '')) || 1;
    const weekNum = parseInt(weekId.replace('w', '')) || 1;
    const lessonNum = ((monthNum - 1) * 4) + weekNum;
    if (lessonNum > 1) {
      const prevLessonNum = lessonNum - 1;
      const prevM = Math.floor((prevLessonNum - 1) / 4) + 1;
      const prevW = ((prevLessonNum - 1) % 4) + 1;
      const prevKey = `m${prevM}-w${prevW}-${lessonId}`;
      let prevPassed = false;
      try {
        const pSnap = await db.ref(`users/${userId}/completed_lessons/${prevKey}`).once('value');
        prevPassed = !!pSnap.val();
      } catch (e) {}

      if (!prevPassed) {
        return ctx.reply(
          `🔒 *មេរៀននេះត្រូវបានចាក់សោ!* 🔒\n\n` +
          `ដើម្បីរៀនមេរៀនទី ${lessonNum} បាន អ្នកត្រូវរៀន និងប្រឡងជាប់ *មេរៀនទី ${prevLessonNum}* នៃមុខវិជ្ជានេះជាមុនសិន!\n\n` +
          `💡 ការរៀនតាមលំដាប់លំដោយ (មេរៀនទី១ ទៅទី២ ទៅទី៣...) ជួយឱ្យអ្នកទទួលបានចំណេះដឹងរឹងមាំ និងមានប្រសិទ្ធភាពខ្ពស់បំផុត។`,
          {
            parse_mode: 'Markdown',
            reply_markup: Markup.inlineKeyboard([
              [Markup.button.callback(`📖 ទៅរៀនមេរៀនទី ${prevLessonNum}`, `lesson_m${prevM}-w${prevW}-${lessonId}`)],
              [Markup.button.callback('🔙 ត្រឡប់ទៅបញ្ជីមុខវិជ្ជា', 'back_to_months')]
            ]).reply_markup
          }
        );
      }
    }
  }

  await setUserState(userId, `learning_${monthId}_${weekId}_${lessonId}`);

  // Store the lesson text for TTS & set current tutor to Teacher Sorn (Male Voice)
  setLatestResponse(userId, lessonData.content, 'sorn');

  // Record History
  await db.ref(`users/${userId}/history/${monthId}_${weekId}_${lessonId}`).set({
    title: `${monthData.title} > ${weekData.title} > ${lessonData.title}`,
    timestamp: Date.now()
  });

  const lessonKey = `${monthId}-${weekId}-${lessonId}`;
  const compSnap = await db.ref(`users/${userId}/completed_lessons/${lessonKey}`).once('value');
  const isCompleted = !!compSnap.val();

  const keyboardRows = [
    [
      Markup.button.callback(isVIP ? '🔊 ខ្មែរ (Listen KH)' : '🔒 🔊 ខ្មែរ (VIP)', `tts_${userId}`),
      Markup.button.callback(isVIP ? '🔊 English (Listen EN)' : '🔒 🔊 EN (VIP)', `tts_en_${userId}`)
    ],
    [Markup.button.callback(isVIP ? '📝 ប្រឡងបញ្ចប់មេរៀន (Quiz)' : '🔒 📝 ប្រឡងបញ្ចប់មេរៀន (VIP)', `quiz_start_${monthId}-${weekId}-${lessonId}`)],
    [Markup.button.callback('🌍 បកប្រែ EN↔KH (Translate)', `translate_lesson_${monthId}-${weekId}-${lessonId}`)]
  ];

  if (isCompleted) {
    keyboardRows.push([
      Markup.button.callback('➡️ ទៅមេរៀនបន្ទាប់', `next_lesson_${monthId}-${weekId}-${lessonId}`)
    ]);
  }
  keyboardRows.push([Markup.button.callback('🔙 ត្រឡប់ទៅបញ្ជីមុខវិជ្ជា', 'back_to_months')]);

  await ctx.reply(lessonData.content, Markup.inlineKeyboard(keyboardRows));

  if (isVIP) {
    const topicName = lessonData.title.includes(':') ? lessonData.title.split(':')[1].trim() : lessonData.title;
    await ctx.reply(`💬 គ្រូ AI ជំនាញផ្នែក "${topicName}" នៅទីនេះហើយ! បើមានចម្ងល់សូមឆាតសួរ។`);
  } else {
    await ctx.reply(
      `💡 *អ្នកកំពុងរៀនសាកល្បងឥតគិតថ្លៃ (Free Trial)*\n` +
      `• អាចអានមេរៀនសាកល្បងបាន ✅\n` +
      `• ចង់ស្តាប់សំឡេង, សួរគ្រូ AI និងប្រឡង Quiz សូមដំឡើងទៅ *VIP* 💎`,
      { parse_mode: 'Markdown' }
    );
  }
}

// Handle Week Selection (Display lessons list with completed checkmarks)
bot.action(/week_([^-]+)-(.+)/, async (ctx) => {
  const monthId = ctx.match[1];
  const weekId = ctx.match[2];
  const userId = ctx.from.id.toString();

  const monthData = curriculum.months.find(m => m.id === monthId);
  if (!monthData) return ctx.answerCbQuery("រកមិនឃើញទិន្នន័យខែ");

  const weekData = monthData.weeks.find(w => w.id === weekId);
  if (!weekData) return ctx.answerCbQuery("រកមិនឃើញសប្តាហ៍");

  // Fetch completed lessons for this student
  let completedMap = {};
  try {
    const compSnap = await db.ref(`users/${userId}/completed_lessons`).once('value');
    completedMap = compSnap.val() || {};
  } catch (e) {}

  const isVIP = await checkVIP(userId);
  const buttons = weekData.lessons.map(l => {
    const key = `${monthId}-${weekId}-${l.id}`;
    const comp = completedMap[key];
    const isFree = isLessonFree(monthId, weekId, l.id);
    const prefix = comp ? '✅ ' : (!isFree && !isVIP ? '🔒 ' : '');
    const suffix = comp ? ` (ជាប់ ថ្នាក់ ${comp.grade})` : (!isFree && !isVIP ? ' (VIP)' : '');
    return [Markup.button.callback(`${prefix}${l.title}${suffix}`, `lesson_${monthId}-${weekId}-${l.id}`)];
  });
  buttons.push([Markup.button.callback('🔙 ត្រឡប់ក្រោយ (Back)', `month_${monthId}`)]);

  await ctx.editMessageText(`📅 ${monthData.title} > ${weekData.title}\nសូមជ្រើសរើសមេរៀន៖`, Markup.inlineKeyboard(buttons));
});

// Handle Lesson Click: Check if already completed
bot.action(/lesson_([^-]+)-([^-]+)-(.+)/, async (ctx) => {
  await ctx.answerCbQuery();
  const monthId = ctx.match[1];
  const weekId = ctx.match[2];
  const lessonId = ctx.match[3];
  const userId = ctx.from.id.toString();

  const monthData = curriculum.months.find(m => m.id === monthId);
  if (!monthData) return;
  const weekData = monthData.weeks.find(w => w.id === weekId);
  if (!weekData) return;
  const lessonData = weekData.lessons.find(l => l.id === lessonId);
  if (!lessonData) return;

  const lessonKey = `${monthId}-${weekId}-${lessonId}`;
  let compData = null;
  try {
    const compSnap = await db.ref(`users/${userId}/completed_lessons/${lessonKey}`).once('value');
    compData = compSnap.val();
  } catch (e) {}

  // If already completed: show congratulatory prompt with options
  if (compData) {
    const completedDate = new Date(compData.completedAt).toLocaleString('en-GB', {
      timeZone: 'Asia/Phnom_Penh',
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    const promptText = (
      `🎉 *អ្នកបានរៀន និងប្រឡងជាប់មេរៀននេះដោយជោគជ័យរួចហើយ!* 🎉\n\n` +
      `📚 មេរៀន៖ *${lessonData.title}*\n` +
      `🏆 និទ្ទេសសម្រេចបាន៖ *ថ្នាក់ ${compData.grade}* (${compData.score}/${compData.total} ពិន្ទុ)\n` +
      `📅 កាលបរិច្ឆេទបញ្ចប់៖ *${completedDate}*\n\n` +
      `👇 *តើអ្នកចង់រៀនមេរៀននេះម្តងទៀត ឬទៅមេរៀនបន្ទាប់វិញ?*`
    );

    return ctx.reply(promptText, {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.callback('📖 រៀនមេរៀននេះម្តងទៀត', `relearn_${monthId}-${weekId}-${lessonId}`)],
        [Markup.button.callback('➡️ ទៅមេរៀនបន្ទាប់', `next_lesson_${monthId}-${weekId}-${lessonId}`)],
        [Markup.button.callback('🔙 ត្រឡប់ទៅមុខវិជ្ជា', 'back_to_months')]
      ]).reply_markup
    });
  }

  // First time or not yet passed: display lesson directly
  await displayLessonContent(ctx, monthId, weekId, lessonId, userId);
});

// Re-learn action (force reload lesson content)
bot.action(/relearn_([^-]+)-([^-]+)-(.+)/, async (ctx) => {
  await ctx.answerCbQuery();
  const monthId = ctx.match[1];
  const weekId = ctx.match[2];
  const lessonId = ctx.match[3];
  const userId = ctx.from.id.toString();
  await displayLessonContent(ctx, monthId, weekId, lessonId, userId);
});

// Next Lesson action
bot.action(/next_lesson_([^-]+)-([^-]+)-(.+)/, async (ctx) => {
  await ctx.answerCbQuery();
  const monthId = ctx.match[1];
  const weekId = ctx.match[2];
  const lessonId = ctx.match[3];
  const userId = ctx.from.id.toString();

  const next = findNextLesson(curriculum, monthId, weekId, lessonId);
  if (!next || next.isEnd) {
    const SUBJ_MAP = { l1: 'grammar', l2: 'conversation', l3: 'vocabulary', l4: 'verbs', l5: 'adjectives', l6: 'sentences' };
    const examKey = SUBJ_MAP[lessonId] || 'grammar';
    return ctx.reply(
      `🏆 *អបអរសាទរយ៉ាងក្រៃលែង!* 🎉\n\n` +
      `អ្នកបានរៀន និងប្រឡងជាប់គ្រប់ ៤៨ មេរៀននៃមុខវិជ្ជានេះហើយ! 👏🌟\n` +
      `ពេលនេះអ្នកមានសិទ្ធិចូលប្រឡង *ការប្រឡងបញ្ចប់មុខវិជ្ជា (៣០ សំណួរ)* ដើម្បីទទួលបានវិញ្ញាបនបត្រផ្លូវការ (Certificate of Achievement)!`,
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback('🎓 ប្រឡងបញ្ចប់មុខវិជ្ជា (៣០ សំណួរ)', `start_annual_${examKey}`)],
          [Markup.button.callback('🔙 ត្រឡប់ទៅមុខវិជ្ជាទាំងអស់', 'back_to_months')]
        ]).reply_markup
      }
    );
  }

  await ctx.reply(`➡️ *កំពុងបន្តទៅកាន់មេរៀនបន្ទាប់៖*\n📚 ${next.lessonTitle}`, { parse_mode: 'Markdown' });
  await displayLessonContent(ctx, next.monthId, next.weekId, next.lessonId, userId);
});


// ==========================================
// INTERACTIVE QUIZ SYSTEM (PREV / NEXT / SUBMIT / CERTIFICATE)
// ==========================================

/**
 * Render Question with Options, Navigation (Prev/Next), and Submit
 */
async function renderQuizQuestion(ctx, userId, isEdit = false) {
  const state = quizState[userId];
  if (!state) return;

  const currentQ = state.currentQ;
  const total = state.questions.length;
  const q = state.questions[currentQ];
  const selected = state.userAnswers[currentQ]; // 'A', 'B', 'C', 'D' or undefined

  // Option button text with indicator if selected
  const getOptLabel = (choiceLetter, fullText) => {
    const cleanText = fullText.replace(/^[A-D]\)\s*/, '');
    if (selected === choiceLetter) {
      return `🔘 [ ${choiceLetter} ] ${cleanText}`;
    }
    return `${choiceLetter}) ${cleanText}`;
  };

  const keyboardRows = [
    [
      Markup.button.callback(getOptLabel('A', q.c[0]), 'q_ans_A'),
      Markup.button.callback(getOptLabel('B', q.c[1]), 'q_ans_B')
    ],
    [
      Markup.button.callback(getOptLabel('C', q.c[2]), 'q_ans_C'),
      Markup.button.callback(getOptLabel('D', q.c[3]), 'q_ans_D')
    ]
  ];

  // Navigation Row: Prev & Next
  const navRow = [];
  if (currentQ > 0) {
    navRow.push(Markup.button.callback('⬅️ សំណួរមុន', 'q_nav_prev'));
  }
  if (currentQ < total - 1) {
    navRow.push(Markup.button.callback('សំណួរបន្ទាប់ ➡️', 'q_nav_next'));
  }
  if (navRow.length > 0) {
    keyboardRows.push(navRow);
  }

  // Submit Row
  const answeredCount = Object.keys(state.userAnswers).length;
  if (currentQ === total - 1 || answeredCount === total) {
    keyboardRows.push([
      Markup.button.callback(`📤 បញ្ជូនចម្លើយ (${answeredCount}/${total})`, 'q_submit')
    ]);
  } else {
    keyboardRows.push([
      Markup.button.callback(`📊 ឆ្លើយបាន (${answeredCount}/${total}) | បញ្ជូន`, 'q_submit')
    ]);
  }

  // Cancel Row
  keyboardRows.push([
    Markup.button.callback('❌ បោះបង់ការប្រឡង', 'q_cancel')
  ]);

  const titleHeader = state.isAnnualExam
    ? `🏆 *ការប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ (៣០ សំណួរ)*\n📘 *${state.subjectTitle || state.lessonTitle}*`
    : `🎯 *ការប្រឡងបញ្ចប់មេរៀន (MCQ Quiz)*\n📚 *${state.lessonTitle}*`;

  const questionText = (
    `${titleHeader}\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `📝 *សំណួរទី ${currentQ + 1} នៃ ${total} ៖*\n\n` +
    `*${q.q}*\n\n` +
    (selected ? `👉 ចម្លើយដែលអ្នកបានជ្រើស: *[ ${selected} ]*` : `_សូមចុចជ្រើសរើសចម្លើយមួយខាងក្រោម៖_`)
  );

  const markup = Markup.inlineKeyboard(keyboardRows);

  if (isEdit) {
    try {
      await ctx.editMessageText(questionText, {
        parse_mode: 'Markdown',
        reply_markup: markup.reply_markup
      });
    } catch (e) {
      // If message hasn't changed or edit fails, send new
      if (!e.message.includes('message is not modified')) {
        await ctx.reply(questionText, {
          parse_mode: 'Markdown',
          reply_markup: markup.reply_markup
        });
      }
    }
  } else {
    await ctx.reply(questionText, {
      parse_mode: 'Markdown',
      reply_markup: markup.reply_markup
    });
  }
}

// Start Quiz
bot.action(/quiz_start_([^-]+)-([^-]+)-(.+)/, async (ctx) => {
  await ctx.answerCbQuery();
  const monthId = ctx.match[1];
  const weekId = ctx.match[2];
  const lessonId = ctx.match[3];
  const userId = ctx.from.id.toString();

  // 1. Channel membership guard
  const member = await isMember(userId);
  if (!member) {
    return ctx.reply(
      `🔒 *ដើម្បីប្រើប្រាស់ Quiz សូមចូលជាសមាជិកឆានែលរបស់យើងជាមុន!*`,
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.url('📢 ចូលឆានែល @ssonlinechanel', CHANNEL_URL)],
          [Markup.button.callback('✅ ខ្ញុំបានចូលហើយ', 'check_membership')]
        ]).reply_markup
      }
    );
  }

  // 2. VIP Guard
  const vip = await checkVIP(userId);
  if (!vip) {
    return ctx.reply(
      `💎 *មុខងារប្រឡង (Quiz) សម្រាប់សមាជិក VIP ប៉ុណ្ណោះ!*\n\n` +
      `✅ ចូលជា VIP ដើម្បីទទួលបានសិទ្ធិ:\n` +
      `• ប្រឡង Quiz MCQ ១០ សំណួរគ្រប់មេរៀន\n` +
      `• ដោះសោមេរៀនបន្ទាប់តាមលំដាប់លំដោយ\n` +
      `• ទទួលបានសិទ្ធិប្រឡងបញ្ចប់មុខវិជ្ជា (៣០ សំណួរ) យកវិញ្ញាបនបត្រផ្លូវការ (Certificate)\n` +
      `• កត់ត្រាប្រវត្តិពិន្ទុ និងមេរៀនដែលបានបញ្ចប់\n\n` +
      `💰 តម្លៃ: 3$/ខែ | 30$/ឆ្នាំ`,
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback('💎 Upgrade VIP', 'vip_upgrade')],
          [Markup.button.callback('🔑 បញ្ចូល License Key', 'enter_license_key')]
        ]).reply_markup
      }
    );
  }

  // 3. Sequential Progression Guard for Lesson Quiz
  const isAdmin = SUPER_ADMIN_IDS.includes(userId);
  if (!isAdmin && monthId.startsWith('m') && weekId.startsWith('w')) {
    const monthNum = parseInt(monthId.replace('m', '')) || 1;
    const weekNum = parseInt(weekId.replace('w', '')) || 1;
    const lessonNum = ((monthNum - 1) * 4) + weekNum;
    if (lessonNum > 1) {
      const prevLessonNum = lessonNum - 1;
      const prevM = Math.floor((prevLessonNum - 1) / 4) + 1;
      const prevW = ((prevLessonNum - 1) % 4) + 1;
      const prevKey = `m${prevM}-w${prevW}-${lessonId}`;
      let prevPassed = false;
      try {
        const pSnap = await db.ref(`users/${userId}/completed_lessons/${prevKey}`).once('value');
        prevPassed = !!pSnap.val();
      } catch (e) {}

      if (!prevPassed) {
        return ctx.reply(
          `🔒 *មិនទាន់អាចប្រឡងមេរៀននេះបានទេ!* 🔒\n\n` +
          `ដើម្បីប្រឡងមេរៀនទី ${lessonNum} បាន អ្នកត្រូវរៀន និងប្រឡងជាប់ *មេរៀនទី ${prevLessonNum}* នៃមុខវិជ្ជានេះជាមុនសិន!`,
          {
            parse_mode: 'Markdown',
            reply_markup: Markup.inlineKeyboard([
              [Markup.button.callback(`📖 ទៅរៀនមេរៀនទី ${prevLessonNum}`, `lesson_m${prevM}-w${prevW}-${lessonId}`)],
              [Markup.button.callback('🔙 ត្រឡប់ទៅមុខវិជ្ជា', 'back_to_months')]
            ]).reply_markup
          }
        );
      }
    }
  }

  const monthData = curriculum.months.find(m => m.id === monthId);
  if (!monthData) return;
  const weekData = monthData.weeks.find(w => w.id === weekId);
  if (!weekData) return;
  const lessonData = weekData.lessons.find(l => l.id === lessonId);
  if (!lessonData) return;

  const questions = generateQuiz(lessonData);
  if (!questions || questions.length === 0) {
    return ctx.reply('⚠️ មិនអាចបង្កើតសំណួរតេស្តបានទេ។ សូមសាកល្បងម្តងទៀត!');
  }

  quizState[userId] = {
    questions,
    currentQ: 0,
    userAnswers: {},
    lessonTitle: lessonData.title,
    lessonId: `${monthId}-${weekId}-${lessonId}`,
    monthId,
    weekId,
    lessonSubId: lessonId
  };

  await ctx.reply(
    `🎯 *ការប្រឡងបញ្ចប់មេរៀន*\n` +
    `📚 *${lessonData.title}*\n\n` +
    `ខ្ញុំបានរៀបចំ *${questions.length} សំណួរ* (MCQ)!\n\n` +
    `💡 *ការណែនាំ៖*\n` +
    `• ចុចរើសចម្លើយ A, B, C, ឬ D\n` +
    `• អាចចុច *⬅️ សំណួរមុន* ឬ *សំណួរបន្ទាប់ ➡️* ដើម្បីកែប្រែចម្លើយបាន\n` +
    `• នៅពេលរួចរាល់ ចុច *"📤 បញ្ជូនចម្លើយ"* ដើម្បីមើលពិន្ទុ និងវាស់ស្ទង់សមត្ថភាព!\n\n` +
    `🏁 *សូមចាប់ផ្ដើម!*`,
    { parse_mode: 'Markdown' }
  );

  await renderQuizQuestion(ctx, userId, false);
});

// Quiz Answer Selection
bot.action(/q_ans_([ABCD])/, async (ctx) => {
  const userId = ctx.from.id.toString();
  const state = quizState[userId];
  if (!state) return ctx.answerCbQuery('⚠️ គ្មានការប្រឡងដែលកំពុងដំណើរការទេ!');

  const chosen = ctx.match[1];
  state.userAnswers[state.currentQ] = chosen;
  await ctx.answerCbQuery(`✅ បានជ្រើស [ ${chosen} ]`);

  // Automatically advance to next question if not at last question
  if (state.currentQ < state.questions.length - 1) {
    state.currentQ++;
  }

  await renderQuizQuestion(ctx, userId, true);
});

// Quiz Navigation: Previous Question
bot.action('q_nav_prev', async (ctx) => {
  const userId = ctx.from.id.toString();
  const state = quizState[userId];
  if (!state) return ctx.answerCbQuery('⚠️ គ្មានការប្រឡងកំពុងដំណើរការ!');

  if (state.currentQ > 0) {
    state.currentQ--;
    await ctx.answerCbQuery();
    await renderQuizQuestion(ctx, userId, true);
  } else {
    await ctx.answerCbQuery('នេះជាសំណួរដំបូងហើយ!');
  }
});

// Quiz Navigation: Next Question
bot.action('q_nav_next', async (ctx) => {
  const userId = ctx.from.id.toString();
  const state = quizState[userId];
  if (!state) return ctx.answerCbQuery('⚠️ គ្មានការប្រឡងកំពុងដំណើរការ!');

  if (state.currentQ < state.questions.length - 1) {
    state.currentQ++;
    await ctx.answerCbQuery();
    await renderQuizQuestion(ctx, userId, true);
  } else {
    await ctx.answerCbQuery('នេះជាសំណួរចុងក្រោយហើយ!');
  }
});

// Cancel Quiz
bot.action('q_cancel', async (ctx) => {
  const userId = ctx.from.id.toString();
  delete quizState[userId];
  await ctx.answerCbQuery('❌ បានបោះបង់');
  await ctx.editMessageText('❌ **បានបោះបង់ការប្រឡង។**\nអ្នកអាចចូលរៀន ឬចាប់ផ្តើមប្រឡងឡើងវិញបានគ្រប់ពេល!');
});

// Continue answering from submit prompt
bot.action('q_continue', async (ctx) => {
  const userId = ctx.from.id.toString();
  await ctx.answerCbQuery();
  await renderQuizQuestion(ctx, userId, true);
});

// Submit Quiz Trigger
bot.action('q_submit', async (ctx) => {
  const userId = ctx.from.id.toString();
  const state = quizState[userId];
  if (!state) return ctx.answerCbQuery('⚠️ គ្មានការប្រឡងកំពុងដំណើរការ!');

  const answeredCount = Object.keys(state.userAnswers).length;
  const total = state.questions.length;

  if (answeredCount < total) {
    await ctx.answerCbQuery();
    const missing = total - answeredCount;
    return ctx.editMessageText(
      `⚠️ *អ្នកមិនទាន់បានឆ្លើយអស់គ្រប់សំណួរនៅឡើយទេ!*\n\n` +
      `អ្នកឆ្លើយបានតែ *${answeredCount} / ${total}* សំណួរ (នៅសល់ *${missing}* សំណួរមិនទាន់ឆ្លើយ)។\n\n` +
      `តើអ្នកពិតជាចង់បញ្ជូនចម្លើយឥឡូវនេះមែនទេ?`,
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback('📤 បញ្ជូនចម្លើយភ្លាម (Submit Now)', 'q_confirm_submit')],
          [Markup.button.callback('✏️ ត្រឡប់ទៅឆ្លើយបន្ត', 'q_continue')]
        ]).reply_markup
      }
    );
  }

  await ctx.answerCbQuery();
  await handleQuizSubmission(ctx, userId);
});

// Confirm submit even with missing answers
bot.action('q_confirm_submit', async (ctx) => {
  const userId = ctx.from.id.toString();
  await ctx.answerCbQuery();
  await handleQuizSubmission(ctx, userId);
});

/**
 * Handle Quiz Submission, Grading, Detailed Breakdown & Certificate Generation
 */
async function handleQuizSubmission(ctx, userId) {
  const state = quizState[userId];
  if (!state) return;

  const total = state.questions.length;
  let score = 0;
  const breakdown = [];

  for (let i = 0; i < total; i++) {
    const q = state.questions[i];
    const userChoice = state.userAnswers[i];
    const isCorrect = userChoice === q.a;
    if (isCorrect) score++;

    const chosenText = userChoice ? q.c.find(c => c.startsWith(userChoice)) : 'មិនបានឆ្លើយ';
    const correctText = q.c.find(c => c.startsWith(q.a));

    breakdown.push({
      num: i + 1,
      q: q.q,
      userChoice,
      chosenText,
      correctText,
      isCorrect
    });
  }

  const percent = Math.round((score / total) * 100);

  let grade = 'F';
  if (percent >= 90) grade = 'A';
  else if (percent >= 80) grade = 'B';
  else if (percent >= 70) grade = 'C';
  else if (percent >= 60) grade = 'D';
  else grade = 'F';

  const isPassed = ['A', 'B', 'C'].includes(grade);
  const gradeTitle = getGradeTitle(grade);

  // 1. Build Detailed Results Breakdown
  const titleText = state.subjectTitle || state.lessonTitle;
  const resultHeader = state.isAnnualExam
    ? `🏆 *លទ្ធផលការប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ*\n📘 *${titleText}*`
    : `🎯 *លទ្ធផលការប្រឡងបញ្ចប់មេរៀន*\n📚 *${titleText}*`;

  let resultMsg = (
    `${resultHeader}\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `🏆 និទ្ទេសសម្រេចបាន៖ *ថ្នាក់ ${grade}* (${gradeTitle})\n` +
    `🎯 ពិន្ទុប្រឡង៖ *${score} / ${total}* (${percent}%)\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `📋 *លម្អិតចម្លើយទាំង ${total} សំណួរ ៖*\n\n`
  );

  breakdown.forEach(item => {
    if (item.isCorrect) {
      resultMsg += `✅ *សំណួរទី ${item.num}:* ${item.q}\n`;
      resultMsg += `   👉 ចម្លើយរបស់អ្នក: *${item.chosenText}* (ត្រឹមត្រូវ 🎉)\n\n`;
    } else {
      resultMsg += `❌ *សំណួរទី ${item.num}:* ${item.q}\n`;
      resultMsg += `   👉 ចម្លើយរបស់អ្នក: ~${item.chosenText}~\n`;
      resultMsg += `   ✅ ចម្លើយត្រឹមត្រូវ: *${item.correctText}*\n\n`;
    }
  });

  // Save Quiz Log to Firebase
  if (db) {
    try {
      const logKey = state.isAnnualExam ? `annual_${state.subjectKey}_${Date.now()}` : `${state.lessonId}_${Date.now()}`;
      await db.ref(`users/${userId}/quiz_results/${logKey}`).set({
        lessonTitle: titleText,
        lessonId: state.lessonId,
        isAnnualExam: !!state.isAnnualExam,
        subjectKey: state.subjectKey || null,
        score,
        total,
        percent,
        grade,
        isPassed,
        timestamp: Date.now()
      });
    } catch (e) {}
  }

  // Send Breakdown Message (Split if long)
  if (resultMsg.length > 3800) {
    const summary = (
      `${resultHeader}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `🏆 និទ្ទេស៖ *ថ្នាក់ ${grade}* (${percent}%)\n` +
      `🎯 ពិន្ទុ៖ *${score} / ${total}*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━`
    );
    await ctx.reply(summary, { parse_mode: 'Markdown' });
  } else {
    await ctx.reply(resultMsg, { parse_mode: 'Markdown' });
  }

  // IF PASSED (Grade A, B, C): Mark Completed & Issue Certificate
  if (isPassed) {
    let studentName = [ctx.from.first_name, ctx.from.last_name].filter(Boolean).join(' ').trim() || `សិស្ស ID ${userId}`;
    let certId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const dateStr = new Date().toLocaleDateString('km-KH');

    // Fetch profile for accountName, khmerName & photo
    let khmerName = null;
    let photoUrl = null;
    if (db) {
      try {
        const profSnap = await db.ref(`users/${userId}/profile`).once('value');
        const prof = profSnap.val() || {};
        khmerName = prof.khmerName || null;
        photoUrl = prof.photoUrl || prof.avatar || null;
        if (prof.accountName && prof.accountName.trim()) {
          studentName = prof.accountName.trim();
        } else if (khmerName) {
          studentName = khmerName;
        } else if (prof.name && prof.name.trim() && !prof.name.startsWith('User ') && prof.name !== 'Student') {
          studentName = prof.name.trim();
        }
      } catch (e) { console.error('Profile fetch for cert:', e.message); }
    }

    // Check if user already had a certId for this subject/lesson to preserve QR codes
    if (db) {
      try {
        const refPath = state.isAnnualExam
          ? `users/${userId}/subject_certifications/${state.subjectKey}`
          : `users/${userId}/completed_lessons/${state.lessonId}`;
        const prevSnap = await db.ref(refPath).once('value');
        const prevData = prevSnap.val();
        if (prevData && prevData.certId) {
          certId = prevData.certId;
        }
      } catch (e) {}

    }

    // 1. Mark lesson or subject completed in Firebase
    if (db) {
      try {
        if (state.isAnnualExam) {
          await db.ref(`users/${userId}/subject_certifications/${state.subjectKey}`).set({
            certId,
            subjectKey: state.subjectKey,
            subjectTitle: titleText,
            studentName,
            grade,
            score,
            total,
            percent,
            dateStr,
            completedAt: Date.now()
          });
        } else {
          await db.ref(`users/${userId}/completed_lessons/${state.lessonId}`).set({
            certId,
            lessonId: state.lessonId,
            lessonTitle: state.lessonTitle,
            monthId: state.monthId,
            weekId: state.weekId,
            studentName,
            grade,
            score,
            total,
            percent,
            dateStr,
            completedAt: Date.now()
          });
        }
      } catch (err) {
        console.error("Firebase completion record error:", err);
      }
    }

    if (state.isAnnualExam) {
      const certData = {
        studentName,
        userId,
        title: titleText,
        lessonTitle: titleText,
        grade,
        score,
        total,
        percent,
        dateStr,
        certId,
        isAnnualExam: true,
        khmerName: khmerName || null,
        photoUrl: photoUrl || null
      };

      // Save to global certificates database for QR code verification
      if (db) {
        try {
          await db.ref(`certificates/${certId}`).set({
            certId,
            userId,
            studentName,
            title: titleText,
            grade,
            score,
            total,
            percent,
            dateStr,
            isAnnualExam: true,
            subjectKey: state.subjectKey || null,
            issuedAt: Date.now(),
            director: 'លីម សន (Lim Sorn)',
            instructor: 'TeacherSornAiBot',
            schoolName: 'វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline'
          });
        } catch (err) {
          console.error("Firebase certificate save error:", err);
        }
      }

      // 2. Send Telegram Certificate Card
      const certCard = generateCertificateCard(certData);
      await ctx.reply(certCard, { parse_mode: 'Markdown' });

      // 3. Send Printable HTML Certificate File with QR Code (A4 Landscape)
      try {
        const certHtml = await generateCertificateHTML(certData);
        const safeFilename = `Certificate_Annual_${state.subjectKey}.html`;

        await ctx.replyWithDocument(
          { source: Buffer.from(certHtml, 'utf-8'), filename: safeFilename },
          {
            caption: `🎓 *វិញ្ញាបនបត្រផ្លូវការ (Certificate of Achievement)*\n` +
                     `🏫 *វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline*\n` +
                     `👨‍💼 នាយកសាលារៀន៖ *លីម សន (Lim Sorn)*\n` +
                     `👨‍🏫 គ្រូបន្ទុកថ្នាក់៖ *TeacherSornAiBot*\n` +
                     `📄 ទម្រង់ *A4 ផ្តេក (A4 Landscape)* មាន *QR Code Verified* ស្កេនផ្ទៀងផ្ទាត់បាន!\n\n` +
                     `📥 ចុចទាញយកឯកសារនេះដើម្បីបើកមើល ឬចុច *Print / Save as PDF*! 🎉`,
            parse_mode: 'Markdown'
          }
        );
      } catch (e) {
        console.error("Certificate document send error:", e.message || e);
        // Fallback: send web link instead
        const baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.BASE_URL || '';
        const webLink = baseUrl ? `${baseUrl}/cert/${certData.certId}` : null;
        const botUser = process.env.TELEGRAM_BOT_USERNAME || 'StudyAiEngKH_bot';
        const tgLink = `https://t.me/${botUser}?start=verify_${certData.certId}`;

        await ctx.reply(
          `🎓 *វិញ្ញាបនបត្ររបស់អ្នកត្រូវបានចេញដោយជោគជ័យ!*\n\n` +
          `📜 *លេខកូដ៖* \`CERT-${certData.certId}\`\n` +
          `⚠️ ការផ្ញើឯកសារ HTML ជួបបញ្ហាបច្ចេកទេស!\n\n` +
          (webLink ? `🌐 *មើលវិញ្ញាបនបត្រតាម Web:*\n${webLink}\n\n` : '') +
          `📱 *ផ្ទៀងផ្ទាត់ QR ក្នុង Bot:* [ចុចនៅទីនេះ](${tgLink})\n\n` +
          `💡 ចូល *"វិញ្ញាបនបត្ររបស់ខ្ញុំ"* ដើម្បី Refresh ម្ដងទៀត!`,
          {
            parse_mode: 'Markdown',
            reply_markup: Markup.inlineKeyboard([
              ...(webLink ? [[Markup.button.url('🌐 មើលតាម Web Browser', webLink)]] : []),
              [Markup.button.callback('🔄 Refresh វិញ្ញាបនបត្រ', 'my_certificates_menu')]
            ]).reply_markup
          }
        );
      }

      // Navigation Buttons after Exam Success
      await ctx.reply(
        `🌟 *អបអរសាទរ! អ្នកបានប្រឡងបញ្ចប់មុខវិជ្ជានេះដោយជោគជ័យ!* 🌟\n\n` +
        `តើអ្នកចង់បន្តប្រឡងមុខវិជ្ជាផ្សេងទៀត ឬត្រឡប់ទៅកម្មវិធីសិក្សា?`,
        {
          parse_mode: 'Markdown',
          reply_markup: Markup.inlineKeyboard([
            [Markup.button.callback('📜 វិញ្ញាបនបត្ររបស់ខ្ញុំ', 'my_certificates_menu')],
            [Markup.button.callback('🎓 ប្រឡងមុខវិជ្ជាផ្សេងទៀត', 'annual_exams_menu')],
            [Markup.button.callback('📚 ត្រឡប់ទៅមុខវិជ្ជាទាំងអស់', 'back_to_months')]
          ]).reply_markup
        }
      );
    } else {
      // Standard Lesson Quiz Passed: Congratulate, remind that certificates are awarded upon full subject completion
      await ctx.reply(
        `🎉 *អបអរសាទរ! អ្នកបានប្រឡងជាប់មេរៀននេះដោយជោគជ័យ!* 🎉\n\n` +
        `📚 មេរៀន៖ *${titleText}*\n` +
        `🏆 និទ្ទេសសម្រេចបាន៖ *ថ្នាក់ ${grade}* (${score}/${total} ពិន្ទុ - ${percent}%)\n\n` +
        `💡 *ចំណាំសំខាន់៖* ការប្រឡងក្នុងមេរៀននីមួយៗ (១០ សំណួរ) គឺដើម្បីវាស់ស្ទង់សមត្ថភាព និងដោះសោមេរៀនបន្ទាប់។ អ្នកមិនទាន់ទទួលបានវិញ្ញាបនបត្រនៅឡើយទេ!\n` +
        `📜 *វិញ្ញាបនបត្រផ្លូវការ* នឹងត្រូវចេញជូនបន្ទាប់ពីអ្នករៀនចប់គ្រប់ ៤៨ មេរៀន និងប្រឡងជាប់ *ការប្រឡងបញ្ចប់មុខវិជ្ជា (៣០ សំណួរ)*! 👏`,
        {
          parse_mode: 'Markdown',
          reply_markup: Markup.inlineKeyboard([
            [Markup.button.callback('➡️ ទៅមេរៀនបន្ទាប់', `next_lesson_${state.lessonId}`)],
            [Markup.button.callback('📖 រៀនមេរៀននេះម្តងទៀត', `relearn_${state.lessonId}`)],
            [Markup.button.callback('🔙 ត្រឡប់ទៅមុខវិជ្ជាទាំងអស់', 'back_to_months')]
          ]).reply_markup
        }
      );
    }
  } else {
    // FAILED (Grade D or F)
    if (state.isAnnualExam) {
      await ctx.reply(
        `💪 *ព្យាយាមម្តងទៀតណា៎!* អ្នកទទួលបានពិន្ទុ *${score}/${total}* (ថ្នាក់ *${grade}*)។\n\n` +
        `ដើម្បីទទួលបានវិញ្ញាបនបត្របញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ អ្នកត្រូវប្រឡងជាប់និទ្ទេស *A, B, ឬ C* (ចាប់ពី 70% ឡើងទៅ)។`,
        {
          parse_mode: 'Markdown',
          reply_markup: Markup.inlineKeyboard([
            [Markup.button.callback('🔄 ប្រឡងមុខវិជ្ជានេះម្តងទៀត', `start_annual_${state.subjectKey}`)],
            [Markup.button.callback('📋 ជ្រើសរើសមុខវិជ្ជាផ្សេង', 'annual_exams_menu')],
            [Markup.button.callback('📚 ត្រឡប់ទៅកម្មវិធីសិក្សា', 'back_to_months')]
          ]).reply_markup
        }
      );
    } else {
      await ctx.reply(
        `💪 *ព្យាយាមម្តងទៀតណា៎!* អ្នកទទួលបានពិន្ទុ *${score}/${total}* (ថ្នាក់ *${grade}*)។\n\n` +
        `ដើម្បីបញ្ចប់មេរៀននេះដោយជោគជ័យ និងទទួលបានបណ្ណសរសើរ អ្នកត្រូវប្រឡងជាប់និទ្ទេស *A, B, ឬ C* (យ៉ាងតិច 7/10 ពិន្ទុឡើងទៅ)។`,
        {
          parse_mode: 'Markdown',
          reply_markup: Markup.inlineKeyboard([
            [Markup.button.callback('🔄 ប្រឡងម្តងទៀត', `quiz_start_${state.lessonId}`)],
            [Markup.button.callback('📖 អានមេរៀនឡើងវិញ', `relearn_${state.lessonId}`)],
            [Markup.button.callback('🔙 ត្រឡប់ទៅបញ្ជីមេរៀន', `week_${state.monthId}-${state.weekId}`)]
          ]).reply_markup
        }
      );
    }
  }

  delete quizState[userId];
}

// ==========================================
// ANNUAL SUBJECT FINAL EXAMS & QR CODE VERIFICATION SYSTEM
// ==========================================

/**
 * Handle Certificate Verification (QR Code Scan or /verify command)
 */
async function handleCertificateVerification(ctx, rawCertId) {
  const certId = (rawCertId || '').replace(/^CERT-/i, '').trim().toUpperCase();
  if (!certId) {
    return ctx.reply(
      `🔍 *របៀបផ្ទៀងផ្ទាត់វិញ្ញាបនបត្រ៖*\n\n` +
      `សូមវាយបញ្ជា៖ \`/verify <លេខកូដវិញ្ញាបនបត្រ>\`\n` +
      `ឧទាហរណ៍៖ \`/verify ABC123\` ឬ \`/verify CERT-ABC123\``,
      { parse_mode: 'Markdown' }
    );
  }

  if (!db) {
    return ctx.reply('⚠️ ប្រព័ន្ធទិន្នន័យ (Database) មិនទាន់ភ្ជាប់ទេ សូមព្យាយាមម្តងទៀតនៅពេលក្រោយ!');
  }

  try {
    const snapshot = await db.ref(`certificates/${certId}`).once('value');
    const cert = snapshot.val();

    if (!cert) {
      return ctx.reply(
        `❌ *លទ្ធផលនៃការផ្ទៀងផ្ទាត់៖ រកមិនឃើញទិន្នន័យ!*\n\n` +
        `លេខកូដវិញ្ញាបនបត្រ៖ \`CERT-${certId}\`\n\n` +
        `⚠️ វិញ្ញាបនបត្រនេះមិនមាននៅក្នុងប្រព័ន្ធទិន្នន័យរបស់ *វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline* ឡើយ។ ` +
        `សូមពិនិត្យមើលលេខកូដ ឬស្កេន QR Code ឡើងវិញ!`,
        { parse_mode: 'Markdown' }
      );
    }

    const baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.BASE_URL || '';
    const verifyWebUrl = baseUrl ? `${baseUrl}/cert/${cert.certId}` : null;

    const card = (
      `╔════════════════════════════════════════════╗\n` +
      `   ✅ *ការផ្ទៀងផ្ទាត់វិញ្ញាបនបត្រត្រឹមត្រូវ* ✅\n` +
      `       *OFFICIAL VERIFIED CERTIFICATE*\n` +
      `╚════════════════════════════════════════════╝\n\n` +
      `🏫 គ្រឹះស្ថាន៖ *${cert.schoolName || 'វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline'}*\n` +
      `📜 លេខកូដសម្គាល់៖ \`CERT-${cert.certId}\`\n` +
      `🛡️ ស្ថានភាព៖ *✅ វិញ្ញាបនបត្រស្របច្បាប់ និងមានសុពលភាព*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 ឈ្មោះសិស្ស៖ *${cert.studentName}*\n` +
      `🆔 លេខសម្គាល់សិស្ស (ID)៖ \`${cert.userId}\`\n` +
      `🎯 កម្មវិធី/មុខវិជ្ជា៖ *${cert.title}*\n` +
      `🏆 និទ្ទេសសម្រេចបាន៖ *ថ្នាក់ ${cert.grade}* (${getGradeTitle(cert.grade)})\n` +
      `🎯 ពិន្ទុប្រឡង៖ *${cert.score} / ${cert.total}* (${cert.percent}%)\n` +
      `📅 កាលបរិច្ឆេទចេញ៖ *${cert.dateStr}*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `👨‍💼 នាយកសាលារៀន៖ *${cert.director || 'លីម សន (Lim Sorn)'}*\n` +
      `👨‍🏫 គ្រូបន្ទុកថ្នាក់៖ *${cert.instructor || 'TeacherSornAiBot'}*\n\n` +
      `✨ _វិញ្ញាបនបត្រនេះត្រូវបានចេញ និងកត់ត្រាជាផ្លូវការនៅក្នុងប្រព័ន្ធទិន្នន័យ Teacher SSOnline។_`
    );

    const buttons = [];
    if (verifyWebUrl) {
      buttons.push([Markup.button.url('🌐 បើកមើលលើ Web Browser (A4 ផ្តេក)', verifyWebUrl)]);
    }

    await ctx.reply(card, {
      parse_mode: 'Markdown',
      reply_markup: buttons.length > 0 ? Markup.inlineKeyboard(buttons).reply_markup : undefined
    });

    // Send original HTML certificate file directly so the verifier can open and view it
    try {
      const certHtml = await generateCertificateHTML(cert);
      const safeFilename = `Official_Certificate_${cert.certId}.html`;
      await ctx.replyWithDocument(
        { source: Buffer.from(certHtml, 'utf-8'), filename: safeFilename },
        {
          caption: `🎓 *ឯកសារវិញ្ញាបនបត្រផ្លូវការ (Official Certificate)*\n` +
                   `📄 ទម្រង់ *A4 ផ្តេក (A4 Landscape)* របស់សិស្ស៖ *${cert.studentName}*\n\n` +
                   `📥 លោកអ្នកអាចចុចទាញយកឯកសារនេះដើម្បីបើកមើលលើទូរសព្ទ/កុំព្យូទ័រ ឬ Save ជា PDF!`,
          parse_mode: 'Markdown'
        }
      );
    } catch (e) {
      console.error("Verification cert send error:", e);
    }
  } catch (err) {
    console.error("Verification error:", err);
    await ctx.reply('⚠️ មានបញ្ហាក្នុងការផ្ទៀងផ្ទាត់ សូមសាកល្បងម្តងទៀត!');
  }
}

/**
 * Refresh and Re-send Certificate
 * Updates Firebase record with latest student name & institute signatures,
 * regenerates luxury A4 Landscape HTML certificate and Telegram Card,
 * and delivers them to the student on Telegram.
 */
async function refreshAndSendCertificate(ctx, userId, certInfo) {
  let currentStudentName = [ctx.from.first_name, ctx.from.last_name].filter(Boolean).join(' ').trim() || `សិស្ស ID ${userId}`;
  const certId = certInfo.certId || Math.random().toString(36).substring(2, 8).toUpperCase();
  const dateStr = certInfo.dateStr || new Date().toLocaleDateString('km-KH');
  const titleText = certInfo.title || certInfo.subjectTitle || certInfo.lessonTitle || (certInfo.isAnnualExam ? 'ការប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ' : 'វិញ្ញាបនបត្របញ្ចប់មេរៀន');

  // Fetch profile for accountName, khmerName & photo
  let khmerName = null;
  let photoUrl = null;
  if (db) {
    try {
      const profSnap = await db.ref(`users/${userId}/profile`).once('value');
      const prof = profSnap.val() || {};
      khmerName = prof.khmerName || certInfo.khmerName || null;
      photoUrl = prof.photoUrl || prof.avatar || certInfo.photoUrl || null;
      if (prof.accountName && prof.accountName.trim()) {
        currentStudentName = prof.accountName.trim();
      } else if (khmerName) {
        currentStudentName = khmerName;
      } else if (prof.name && prof.name.trim() && !prof.name.startsWith('User ') && prof.name !== 'Student') {
        currentStudentName = prof.name.trim();
      }
    } catch (e) { console.error('refreshCert profile fetch:', e.message); }
  }

  const certData = {
    certId,
    userId: userId.toString(),
    studentName: currentStudentName,
    title: titleText,
    lessonTitle: titleText,
    grade: certInfo.grade || 'A',
    score: certInfo.score ?? 10,
    total: certInfo.total ?? 10,
    percent: certInfo.percent ?? (certInfo.score && certInfo.total ? Math.round((certInfo.score / certInfo.total) * 100) : 100),
    dateStr,
    isAnnualExam: !!certInfo.isAnnualExam,
    khmerName,
    photoUrl
  };


  // 1. Update global certificates collection in Firebase
  if (db) {
    try {
      await db.ref(`certificates/${certId}`).update({
        certId,
        userId: userId.toString(),
        studentName: currentStudentName,
        title: titleText,
        grade: certData.grade,
        score: certData.score,
        total: certData.total,
        percent: certData.percent,
        dateStr,
        isAnnualExam: certData.isAnnualExam,
        subjectKey: certInfo.subjectKey || null,
        lessonId: certInfo.lessonId || null,
        director: 'លីម សន (Lim Sorn)',
        instructor: 'TeacherSornAiBot',
        schoolName: 'វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline',
        lastRefreshedAt: Date.now()
      });

      // Backfill certId and studentName to user's completion record
      if (certInfo.isAnnualExam && certInfo.subjectKey) {
        await db.ref(`users/${userId}/subject_certifications/${certInfo.subjectKey}`).update({
          certId,
          studentName: currentStudentName
        });
      } else if (certInfo.lessonId) {
        await db.ref(`users/${userId}/completed_lessons/${certInfo.lessonId}`).update({
          certId,
          studentName: currentStudentName
        });
      }
    } catch (err) {
      console.error("Firebase cert update error:", err);
    }
  }

  // 2. Send Telegram Certificate Card
  const certCard = generateCertificateCard(certData);
  await ctx.reply(
    `🔄 *វិញ្ញាបនបត្រត្រូវបាន Refresh និងអាប់ដេតជោគជ័យ!* 🎉\n\n` +
    `👤 *ម្ចាស់វិញ្ញាបនបត្រ៖* ${currentStudentName}\n` +
    `🔑 *លេខកូដសម្គាល់៖* \`${certId}\`\n\n` +
    certCard,
    { parse_mode: 'Markdown' }
  );

  // 3. Send Printable HTML Certificate File with QR Code (A4 Landscape)
  try {
    const certHtml = await generateCertificateHTML(certData);
    const safeFilename = certInfo.isAnnualExam
      ? `Official_Certificate_Annual_${certInfo.subjectKey || 'Exam'}_${certId}.html`
      : `Official_Certificate_${certInfo.lessonId || 'Lesson'}_${certId}.html`;

    await ctx.replyWithDocument(
      { source: Buffer.from(certHtml, 'utf-8'), filename: safeFilename },
      {
        caption: `🎓 *វិញ្ញាបនបត្រផ្លូវការដែលបាន Refresh ថ្មី (Refreshed Certificate)*\n` +
                 `🏫 *វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline*\n` +
                 `👤 ម្ចាស់វិញ្ញាបនបត្រ៖ *${currentStudentName}*\n` +
                 `👨‍💼 នាយកសាលារៀន៖ *លីម សន (Lim Sorn)*\n` +
                 `👨‍🏫 គ្រូបន្ទុកថ្នាក់៖ *TeacherSornAiBot*\n` +
                 `📄 ទម្រង់ *A4 ផ្តេក (A4 Landscape)* មាន *QR Code Verified* ស្កេនផ្ទៀងផ្ទាត់បាន!\n\n` +
                 `📥 លោកអ្នកអាចទាញយកឯកសារនេះទុក ឬចុច *Print / Save as PDF* បានភ្លាមៗ! 🎉`,
        parse_mode: 'Markdown'
      }
    );
  } catch (e) {
    console.error("Refresh Certificate document send error:", e);
  }
}

/**
 * Send "My Certificates" Menu
 * Lists all earned certificates (Annual Exams & Lessons)
 * Provides buttons to Refresh individual certificates or Refresh All
 */
async function sendMyCertificatesMenu(ctx) {
  const userId = ctx.from.id.toString();
  const studentName = [ctx.from.first_name, ctx.from.last_name].filter(Boolean).join(' ') || `សិស្ស ID ${userId}`;

  // Check channel membership
  if (!(await isMember(ctx.from.id))) {
    return ctx.reply('🔒 សូមចូលឆានែល @ssonlinechanel ជាមុនសិន!', {
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.url('📢 ចូលឆានែល', CHANNEL_URL)],
        [Markup.button.callback('✅ ខ្ញុំបានចូលហើយ', 'check_membership')]
      ]).reply_markup
    });
  }

  if (!db) {
    return ctx.reply('⚠️ ប្រព័ន្ធទិន្នន័យមិនទាន់ភ្ជាប់!');
  }

  try {
    const userSnap = await db.ref(`users/${userId}`).once('value');
    const userData = userSnap.val() || {};
    const annualCerts = userData.subject_certifications || {};
    const lessonComps = userData.completed_lessons || {};

    const annualList = [];
    for (const [key, val] of Object.entries(annualCerts)) {
      annualList.push({ ...val, subjectKey: key });
    }

    const lessonList = [];
    for (const [key, val] of Object.entries(lessonComps)) {
      if (['A', 'B', 'C'].includes(val.grade) || (val.percent && val.percent >= 70)) {
        lessonList.push({ ...val, lessonId: key });
      }
    }

    const totalCerts = annualList.length + lessonList.length;

    if (totalCerts === 0) {
      const emptyMsg = (
        `╔════════════════════════════════════════════╗\n` +
        `   📜 *វិញ្ញាបនបត្ររបស់ខ្ញុំ (My Certificates)* 📜\n` +
        `╚════════════════════════════════════════════╝\n\n` +
        `សួស្តី ${studentName}! អ្នកមិនទាន់មានវិញ្ញាបនបត្រនៅឡើយទេ។\n\n` +
        `💡 *ដើម្បីទទួលបានវិញ្ញាបនបត្រផ្លូវការទម្រង់ A4 ផ្តេក (A4 Landscape) & QR Code Verified៖*\n` +
        `1️⃣ បញ្ចប់មេរៀននីមួយៗ និងប្រឡង Quiz ជាប់និទ្ទេស A, B, ឬ C\n` +
        `2️⃣ ឬចូលរួមការប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ (Annual Exams) 🎓\n\n` +
        `👇 សូមជ្រើសរើសដើម្បីចាប់ផ្តើមរៀន និងប្រឡង៖`
      );

      const emptyKeyboard = Markup.inlineKeyboard([
        [Markup.button.callback('📚 ទៅកាន់បញ្ជីមេរៀន (Lessons)', 'back_to_months')],
        [Markup.button.callback('🎓 មណ្ឌលប្រឡងប្រចាំឆ្នាំ (Annual Exams)', 'annual_exams_menu')]
      ]);

      if (ctx.callbackQuery) {
        try {
          return await ctx.editMessageText(emptyMsg, {
            parse_mode: 'Markdown',
            reply_markup: emptyKeyboard.reply_markup
          });
        } catch (e) {}
      }
      return ctx.reply(emptyMsg, {
        parse_mode: 'Markdown',
        reply_markup: emptyKeyboard.reply_markup
      });
    }

    // Has certificates
    let text = (
      `╔════════════════════════════════════════════╗\n` +
      `   📜 *វិញ្ញាបនបត្ររបស់ខ្ញុំ (My Certificates)* 📜\n` +
      `╚════════════════════════════════════════════╝\n\n` +
      `👤 សិស្ស៖ *${studentName}* (ID: \`${userId}\`)\n` +
      `🏆 វិញ្ញាបនបត្រសរុបសម្រេចបាន៖ *${totalCerts}* ច្បាប់\n\n` +
      `🔄 *មុខងារ Refresh វិញ្ញាបនបត្រ៖*\n` +
      `_ប្រសិនបើអ្នកចង់អាប់ដេតឈ្មោះថ្មី, កែប្រែទម្រង់ ឬទទួលឯកសារ A4 ផ្តេកជាថ្មី សូមចុចប៊ូតុង Refresh ខាងក្រោម៖_\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    );

    const buttons = [];

    if (annualList.length > 0) {
      text += `\n🎓 *វិញ្ញាបនបត្រប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ៖*\n`;
      annualList.forEach((c, idx) => {
        const subjTitle = c.subjectTitle || (SUBJECT_EXAMS[c.subjectKey] && SUBJECT_EXAMS[c.subjectKey].title) || c.subjectKey;
        const certCode = c.certId ? ` [កូដ៖ \`${c.certId}\`]` : '';
        const pct = c.percent || (c.score && c.total ? Math.round((c.score / c.total) * 100) : 100);
        text += `${idx + 1}. *${subjTitle}* — និទ្ទេស *${c.grade}* (${pct}%)${certCode}\n`;
        const shortName = subjTitle.split('(')[0].trim();
        buttons.push([
          Markup.button.callback(`🔄 Refresh វិញ្ញាបនបត្រ ${shortName}`, `refresh_annual_cert_${c.subjectKey}`)
        ]);
      });
    }

    if (lessonList.length > 0) {
      text += `\n📚 *វិញ្ញាបនបត្របញ្ចប់មេរៀន (Lesson Certificates)៖*\n`;
      lessonList.slice(0, 5).forEach((c, idx) => {
        const lTitle = c.lessonTitle || c.lessonId;
        const certCode = c.certId ? ` [កូដ៖ \`${c.certId}\`]` : '';
        text += `${idx + 1}. *${lTitle}* — និទ្ទេស *${c.grade}*${certCode}\n`;
        const shortTitle = lTitle.length > 25 ? lTitle.substring(0, 22) + '...' : lTitle;
        buttons.push([
          Markup.button.callback(`🔄 Refresh ${shortTitle}`, `refresh_lesson_cert_${c.lessonId}`)
        ]);
      });

      if (lessonList.length > 5) {
        text += `_...និងមេរៀនផ្សេងទៀតសរុប ${lessonList.length} មេរៀន_\n`;
      }
    }

    // Refresh All button
    buttons.unshift([Markup.button.callback('🔄 Refresh វិញ្ញាបនបត្រទាំងអស់ (Refresh All)', 'refresh_all_certs')]);
    buttons.push([Markup.button.callback('🎓 មណ្ឌលប្រឡងប្រចាំឆ្នាំ', 'annual_exams_menu')]);
    buttons.push([Markup.button.callback('🔙 ត្រឡប់ទៅកម្មវិធីសិក្សា', 'back_to_months')]);

    if (ctx.callbackQuery) {
      try {
        return await ctx.editMessageText(text, {
          parse_mode: 'Markdown',
          reply_markup: Markup.inlineKeyboard(buttons).reply_markup
        });
      } catch (e) {}
    }
    return ctx.reply(text, {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard(buttons).reply_markup
    });
  } catch (err) {
    console.error("sendMyCertificatesMenu error:", err);
    ctx.reply('⚠️ មានបញ្ហាក្នុងការទាញយកទិន្នន័យវិញ្ញាបនបត្រ សូមព្យាយាមម្តងទៀត!');
  }
}

// Commands & Listeners for My Certificates
bot.command(['mycerts', 'certificates', 'cert', 'certs', 'mycertificate'], sendMyCertificatesMenu);
bot.hears('📜 វិញ្ញាបនបត្ររបស់ខ្ញុំ', sendMyCertificatesMenu);

// Callback to show My Certificates Menu
bot.action('my_certificates_menu', async (ctx) => {
  await ctx.answerCbQuery();
  await sendMyCertificatesMenu(ctx);
});

// Action to refresh individual annual certificate
bot.action(/refresh_annual_cert_([a-z]+)/, async (ctx) => {
  await ctx.answerCbQuery('🔄 កំពុង Refresh វិញ្ញាបនបត្រ...');
  const subjectKey = ctx.match[1];
  const userId = ctx.from.id.toString();
  if (!db) return ctx.reply('⚠️ ប្រព័ន្ធទិន្នន័យមិនទាន់ភ្ជាប់!');

  const snap = await db.ref(`users/${userId}/subject_certifications/${subjectKey}`).once('value');
  const certInfo = snap.val();
  if (!certInfo) {
    return ctx.reply('❌ មិនមានព័ត៌មានវិញ្ញាបនបត្រសម្រាប់មុខវិជ្ជានេះទេ ឬអ្នកមិនទាន់បានប្រឡងជាប់!');
  }

  await refreshAndSendCertificate(ctx, userId, { ...certInfo, subjectKey, isAnnualExam: true });
});

// Action to refresh individual lesson certificate
bot.action(/refresh_lesson_cert_(.+)/, async (ctx) => {
  await ctx.answerCbQuery('🔄 កំពុង Refresh វិញ្ញាបនបត្រ...');
  const lessonKey = ctx.match[1];
  const userId = ctx.from.id.toString();
  if (!db) return ctx.reply('⚠️ ប្រព័ន្ធទិន្នន័យមិនទាន់ភ្ជាប់!');

  const snap = await db.ref(`users/${userId}/completed_lessons/${lessonKey}`).once('value');
  let certInfo = snap.val();

  if (!certInfo) {
    // Attempt lookup from curriculum if not in completed_lessons
    const parts = lessonKey.split('-');
    if (parts.length === 3) {
      const [mId, wId, lId] = parts;
      const mData = curriculum.months.find(m => m.id === mId);
      const wData = mData ? mData.weeks.find(w => w.id === wId) : null;
      const lData = wData ? wData.lessons.find(l => l.id === lId) : null;
      if (lData) {
        certInfo = {
          lessonId: lessonKey,
          lessonTitle: lData.title,
          monthId: mId,
          weekId: wId,
          grade: 'A',
          score: 10,
          total: 10,
          percent: 100
        };
      }
    }
  }

  if (!certInfo) {
    return ctx.reply('❌ មិនមានព័ត៌មានវិញ្ញាបនបត្រសម្រាប់មេរៀននេះទេ ឬអ្នកមិនទាន់បានប្រឡងជាប់!');
  }

  await refreshAndSendCertificate(ctx, userId, { ...certInfo, lessonId: lessonKey, isAnnualExam: false });
});

// Action to refresh all certificates
bot.action('refresh_all_certs', async (ctx) => {
  await ctx.answerCbQuery('🔄 កំពុង Refresh វិញ្ញាបនបត្រទាំងអស់...');
  const userId = ctx.from.id.toString();
  if (!db) {
    return ctx.reply('⚠️ ប្រព័ន្ធទិន្នន័យមិនទាន់ភ្ជាប់!');
  }

  const userSnap = await db.ref(`users/${userId}`).once('value');
  const userData = userSnap.val() || {};
  const annualCerts = userData.subject_certifications || {};
  const lessonComps = userData.completed_lessons || {};

  const certList = [];
  for (const [key, val] of Object.entries(annualCerts)) {
    certList.push({ ...val, subjectKey: key, isAnnualExam: true });
  }
  for (const [key, val] of Object.entries(lessonComps)) {
    if (['A', 'B', 'C'].includes(val.grade) || (val.percent && val.percent >= 70)) {
      certList.push({ ...val, lessonId: key, isAnnualExam: false });
    }
  }

  if (certList.length === 0) {
    return ctx.reply('ℹ️ អ្នកមិនទាន់មានវិញ្ញាបនបត្រសម្រាប់ Refresh នៅឡើយទេ!');
  }

  await ctx.reply(`🔄 *កំពុងរៀបចំ និង Refresh វិញ្ញាបនបត្រសរុប ${certList.length} ច្បាប់ជូនអ្នក... សូមរង់ចាំមួយភ្លែត!* ⏳`, { parse_mode: 'Markdown' });

  for (const certInfo of certList) {
    await refreshAndSendCertificate(ctx, userId, certInfo);
  }

  await ctx.reply(`✅ *ការ Refresh វិញ្ញាបនបត្រទាំងអស់ត្រូវបានបញ្ចប់ដោយជោគជ័យ!* 🎉\nទម្រង់ A4 ផ្តេក និង QR Code ត្រូវបានធ្វើបច្ចុប្បន្នភាពរួចរាល់។`, {
    parse_mode: 'Markdown',
    reply_markup: Markup.inlineKeyboard([
      [Markup.button.callback('📜 ត្រឡប់ទៅបញ្ជីវិញ្ញាបនបត្រ', 'my_certificates_menu')],
      [Markup.button.callback('🔙 ត្រឡប់ទៅកម្មវិធីសិក្សា', 'back_to_months')]
    ]).reply_markup
  });
});

/**
 * Display Annual Exams Menu
 */
async function sendAnnualExamsMenu(ctx) {
  const userId = ctx.from.id;
  const username = ctx.from.first_name || 'Student';

  // 1. Check channel membership
  if (!(await isMember(userId))) {
    return ctx.reply('🔒 សូមចូលឆានែល @ssonlinechanel ជាមុនសិន!', {
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.url('📢 ចូលឆានែល', CHANNEL_URL)],
        [Markup.button.callback('✅ ខ្ញុំបានចូលហើយ', 'check_membership')]
      ]).reply_markup
    });
  }

  // 2. Yearly VIP Guard (បង់ប្រាក់ប្រចាំឆ្នាំ ឬបង់គ្រប់ ១ ឆ្នាំ)
  const yearlyStatus = await checkYearlyVIP(userId);
  if (!yearlyStatus.eligible) {
    const statusText = yearlyStatus.isVIP
      ? `💎 VIP (${yearlyStatus.plan || 'កញ្ចប់ប្រចាំខែ'}) - នៅសល់ ${yearlyStatus.daysRemaining} ថ្ងៃ`
      : `⚪ គណនី Free (មិនទាន់ជា VIP)`;

    const accumulatedInfo = (yearlyStatus.totalAccumulatedDays && yearlyStatus.totalAccumulatedDays > 0)
      ? `• ចំនួនថ្ងៃសន្សំបានពីមុនមក៖ *${yearlyStatus.totalAccumulatedDays} ថ្ងៃ / ៣៦០ ថ្ងៃ*\n`
      : '';

    const lockedMsg = (
      `╔════════════════════════════════════════════╗\n` +
      `   🔒 *សិទ្ធិប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ* 🔒\n` +
      `        *ANNUAL EXAMS PRIVILEGE*\n` +
      `╚════════════════════════════════════════════╝\n\n` +
      `⚠️ *ការប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ* និងការទទួលបាន *វិញ្ញាបនបត្រផ្លូវការទម្រង់ A4 ផ្តេក* គឺផ្ដល់ជូនសម្រាប់តែសិស្សានុសិស្សដែល៖\n\n` +
      `✅ *បង់ប្រាក់គណនី VIP ប្រចាំឆ្នាំ (30$/ឆ្នាំ)* ឬ\n` +
      `✅ *បានបង់ប្រាក់សន្សំគ្រប់ ១ ឆ្នាំ (១២ ខែ / ៣៦០ ថ្ងៃ)* ប៉ុណ្ណោះ!\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📌 *ស្ថានភាពគណនីរបស់អ្នកបច្ចុប្បន្ន៖*\n` +
      `• ប្រភេទគណនី៖ *${statusText}*\n` +
      accumulatedInfo +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `💡 _ប្រសិនបើអ្នកចង់ប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំទាំង ៧ ប្រភេទ និងទទួលបានវិញ្ញាបនបត្រ A4 ផ្តេក មាន QR Code Verified សូម Upgrade ទៅកាន់កញ្ចប់ប្រចាំឆ្នាំ (30$/ឆ្នាំ)!_`
    );

    const lockedKeyboard = Markup.inlineKeyboard([
      [Markup.button.callback('💎 Upgrade VIP ប្រចាំឆ្នាំ (30$/ឆ្នាំ)', 'vip_upgrade_yearly')],
      [Markup.button.callback('🔑 បញ្ចូល License Key', 'enter_license_key')],
      [Markup.button.callback('🔙 ត្រឡប់ទៅកម្មវិធីសិក្សា', 'back_to_months')]
    ]);

    if (ctx.callbackQuery) {
      try {
        return await ctx.editMessageText(lockedMsg, {
          parse_mode: 'Markdown',
          reply_markup: lockedKeyboard.reply_markup
        });
      } catch (e) {}
    }
    return ctx.reply(lockedMsg, {
      parse_mode: 'Markdown',
      reply_markup: lockedKeyboard.reply_markup
    });
  }

  // Fetch passed certifications for user to display checkmarks
  let userCerts = {};
  if (db) {
    try {
      const snap = await db.ref(`users/${userId}/subject_certifications`).once('value');
      userCerts = snap.val() || {};
    } catch (e) {}
  }

  const buttons = [
    [Markup.button.callback(userCerts['grammar'] ? `✅ 📘 1. វេយ្យាករណ៍ (${userCerts['grammar'].grade})` : '📘 1. វេយ្យាករណ៍ (Grammar in Use)', 'start_annual_grammar')],
    [Markup.button.callback(userCerts['conversation'] ? `✅ 🗣️ 2. ការសន្ទនា (${userCerts['conversation'].grade})` : '🗣️ 2. ការសន្ទនា (Conversation & Speaking)', 'start_annual_conversation')],
    [Markup.button.callback(userCerts['vocabulary'] ? `✅ 📖 3. វាក្យសព្ទ (${userCerts['vocabulary'].grade})` : '📖 3. វាក្យសព្ទ (Vocabulary & Idioms)', 'start_annual_vocabulary')],
    [Markup.button.callback(userCerts['verbs'] ? `✅ ⚡ 4. កិរិយាសព្ទ (${userCerts['verbs'].grade})` : '⚡ 4. កិរិយាសព្ទ (Verbs & Irregular Verbs)', 'start_annual_verbs')],
    [Markup.button.callback(userCerts['adjectives'] ? `✅ 🎨 5. គុណនាម (${userCerts['adjectives'].grade})` : '🎨 5. គុណនាម (Adjectives & Descriptions)', 'start_annual_adjectives')],
    [Markup.button.callback(userCerts['sentences'] ? `✅ ✍️ 6. ការបង្កើតល្បះ (${userCerts['sentences'].grade})` : '✍️ 6. ការបង្កើតល្បះ (Sentence Construction)', 'start_annual_sentences')],
    [Markup.button.callback(userCerts['grand'] ? `✅ 🏆 7. ប្រឡងបញ្ចប់រួម (${userCerts['grand'].grade})` : '🏆 7. ប្រឡងបញ្ចប់រួមប្រចាំឆ្នាំ (Grand Exam)', 'start_annual_grand')],
    [Markup.button.callback('📜 វិញ្ញាបនបត្ររបស់ខ្ញុំ (My Certificates)', 'my_certificates_menu')],
    [Markup.button.callback('🔙 ត្រឡប់ទៅកម្មវិធីសិក្សា', 'back_to_months')]
  ];

  const text = (
    `╔════════════════════════════════════════════╗\n` +
    `   🎓 *វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline* 🎓\n` +
    `        *TEACHER SSONLINE ENGLISH INSTITUTE*\n` +
    `╚════════════════════════════════════════════╝\n\n` +
    `🏛️ *ការប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ (Annual Subject Final Exams)*\n\n` +
    `សួស្តី ${username}! សូមស្វាគមន៍មកកាន់មណ្ឌលប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ!\n\n` +
    `📋 *លក្ខខណ្ឌ និងព័ត៌មាននៃការប្រឡង៖*\n` +
    `• វិញ្ញាសានីមួយៗមាន *៣០ សំណួរ* (MCQ)\n` +
    `• អ្នកអាចចុច *⬅️ សំណួរមុន* ឬ *សំណួរបន្ទាប់ ➡️* ដើម្បីកែប្រែចម្លើយមុនពេល Submit\n` +
    `• ប្រឡងជាប់និទ្ទេស *A, B, ឬ C* (ចាប់ពី 70% ឡើងទៅ) នឹងទទួលបាន៖\n` +
    `   📜 *វិញ្ញាបនបត្រផ្លូវការទម្រង់ A4 ផ្តេក (A4 Landscape)*\n` +
    `   👨‍💼 ចេញដោយនាយកសាលារៀន៖ *លីម សន (Lim Sorn)*\n` +
    `   👨‍🏫 គ្រូបន្ទុកថ្នាក់៖ *TeacherSornAiBot*\n` +
    `   🛡️ មានភ្ជាប់ *QR Code Verified* ស្កេនផ្ទៀងផ្ទាត់លើ Telegram!\n\n` +
    `👇 *សូមជ្រើសរើសមុខវិជ្ជាដែលអ្នកចង់ប្រឡង ឬចុចមើលវិញ្ញាបនបត្ររបស់អ្នក៖*`
  );

  if (ctx.callbackQuery) {
    try {
      await ctx.editMessageText(text, {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard(buttons).reply_markup
      });
    } catch (e) {
      await ctx.reply(text, {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard(buttons).reply_markup
      });
    }
  } else {
    await ctx.reply(text, {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard(buttons).reply_markup
    });
  }
}

// Commands & Listeners for Annual Exams
bot.command(['annualexam', 'finalexam', 'exam'], sendAnnualExamsMenu);
bot.hears('🎓 ប្រឡងបញ្ចប់មុខវិជ្ជា', sendAnnualExamsMenu);

// Callback to show Annual Exams Menu
bot.action('annual_exams_menu', async (ctx) => {
  await ctx.answerCbQuery();
  await sendAnnualExamsMenu(ctx);
});

// Action to start Annual Exam for a subject
bot.action(/start_annual_([a-z]+)/, async (ctx) => {
  const subjectKey = ctx.match[1];
  const userId = ctx.from.id.toString();

  // 1. Membership Guard
  if (!(await isMember(ctx.from.id))) {
    await ctx.answerCbQuery('🔒 សូមចូលឆានែលជាមុន!');
    return ctx.reply('🔒 សូមចូលឆានែល @ssonlinechanel ជាមុនសិន!');
  }

  // 2. Yearly VIP Guard (បង់ប្រាក់ប្រចាំឆ្នាំ ឬបង់គ្រប់ ១ ឆ្នាំ)
  const yearlyStatus = await checkYearlyVIP(ctx.from.id);
  if (!yearlyStatus.eligible) {
    await ctx.answerCbQuery('🔒 សម្រាប់អ្នកបង់ប្រចាំឆ្នាំ ឬបង់គ្រប់ ១ ឆ្នាំប៉ុណ្ណោះ!', { show_alert: true });
    return sendAnnualExamsMenu(ctx);
  }

  const subj = SUBJECT_EXAMS[subjectKey];
  if (!subj) {
    return ctx.answerCbQuery('❌ មិនមានមុខវិជ្ជានេះទេ!');
  }

  // 3. Prerequisite Guard: Must have passed all 48 lessons of this subject (Super Admins bypass)
  const isAdmin = SUPER_ADMIN_IDS.includes(userId);
  if (!isAdmin && subjectKey !== 'grand') {
    const subjLessons = getSubjectLessons(subjectKey);
    let userCompleted = {};
    if (db) {
      try {
        const cSnap = await db.ref(`users/${userId}/completed_lessons`).once('value');
        userCompleted = cSnap.val() || {};
      } catch (e) {}
    }
    const passedCount = subjLessons.filter(l => !!userCompleted[l.dbKey]).length;
    if (passedCount < subjLessons.length) {
      await ctx.answerCbQuery(`🔒 អ្នកទើបតែរៀនចប់ ${passedCount}/${subjLessons.length} មេរៀនប៉ុណ្ណោះ!`, { show_alert: true });
      return ctx.reply(
        `🔒 *មិនទាន់អាចប្រឡងបញ្ចប់មុខវិជ្ជាបានទេ!*\n\n` +
        `មុខវិជ្ជា៖ ${subj.icon} *${subj.title}*\n` +
        `វឌ្ឍនភាពរបស់អ្នក៖ *${passedCount} / ${subjLessons.length} មេរៀន*\n\n` +
        `💡 *លក្ខខណ្ឌប្រឡងបញ្ចប់មុខវិជ្ជា៖*\n` +
        `អ្នកត្រូវរៀន និងប្រឡងជាប់គ្រប់ *${subjLessons.length} មេរៀន* នៃមុខវិជ្ជានេះជាមុនសិន ទើបប្រព័ន្ធបើកសិទ្ធិឱ្យចូលប្រឡងបញ្ចប់មុខវិជ្ជា (៣០ សំណួរ) ដើម្បីទទួលបានវិញ្ញាបនបត្រផ្លូវការ!\n\n` +
        `👇 សូមបន្តរៀនមេរៀនបន្តទៀត៖`,
        {
          parse_mode: 'Markdown',
          reply_markup: Markup.inlineKeyboard([
            [Markup.button.callback(`📚 បន្តរៀន ${subj.shortTitle}`, `std_subj_${subjectKey}_1`)],
            [Markup.button.callback('🔙 ត្រឡប់ក្រោយ', 'annual_exams_menu')]
          ]).reply_markup
        }
      );
    }
  }

  await ctx.answerCbQuery(`🚀 ចាប់ផ្តើមប្រឡង ${subj.shortTitle}`);

  const questions = generateAnnualSubjectQuiz(curriculum, subjectKey, 30);
  if (!questions || questions.length === 0) {
    return ctx.reply('⚠️ មិនអាចរៀបចំសំណួរបានទេ។ សូមសាកល្បងម្តងទៀត!');
  }

  quizState[userId] = {
    questions,
    currentQ: 0,
    userAnswers: {},
    lessonTitle: subj.title,
    subjectTitle: subj.title,
    subjectKey,
    isAnnualExam: true,
    lessonId: `annual_${subjectKey}`
  };

  await ctx.reply(
    `🎓 *ការប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ*\n` +
    `${subj.icon} *${subj.title}*\n\n` +
    `ខ្ញុំបានរៀបចំវិញ្ញាសា *៣០ សំណួរ* (MCQ) ជូនអ្នក!\n\n` +
    `💡 *ការណែនាំ៖*\n` +
    `• ចុចរើសចម្លើយ A, B, C, ឬ D\n` +
    `• អាចចុច *⬅️ សំណួរមុន* ឬ *សំណួរបន្ទាប់ ➡️* ដើម្បីកែប្រែចម្លើយ\n` +
    `• ចុច *"📤 បញ្ជូនចម្លើយ"* នៅសំណួរទី ៣០ ដើម្បីបញ្ចប់ការប្រឡង\n` +
    `• ជាប់និទ្ទេស A, B, C នឹងទទួលបានវិញ្ញាបនបត្រ A4 ផ្តេក មាន QR Code!\n\n` +
    `🏁 *សូមចាប់ផ្ដើម!*`,
    { parse_mode: 'Markdown' }
  );

  await renderQuizQuestion(ctx, userId, false);
});

// Verification command
bot.command('verify', async (ctx) => {
  const parts = ctx.message.text.trim().split(/\s+/);
  if (parts.length < 2) {
    return ctx.reply(
      `🔍 *របៀបផ្ទៀងផ្ទាត់វិញ្ញាបនបត្រ៖*\n\n` +
      `សូមវាយបញ្ជា៖ \`/verify <លេខកូដវិញ្ញាបនបត្រ>\`\n` +
      `ឧទាហរណ៍៖ \`/verify ABC123\` ឬ \`/verify CERT-ABC123\``,
      { parse_mode: 'Markdown' }
    );
  }
  const certId = parts[1];
  await handleCertificateVerification(ctx, certId);
});

// View Quiz History (scores)
bot.command('scores', async (ctx) => {
  const userId = ctx.from.id;
  if (!db) return ctx.reply('⚠️ Database មិនទាន់ភ្ជាប់ទេ!');
  const snapshot = await db.ref(`users/${userId}/quiz_results`).limitToLast(10).once('value');
  const data = snapshot.val();
  if (!data) return ctx.reply('📊 អ្នកមិនទាន់បានប្រឡងមេរៀនណាមួយនៅឡើយទេ!');

  let text = '📊 *ប្រវត្តិពិន្ទុប្រឡង (10 ចុងក្រោយ)*\n━━━━━━━━━━━━━━━\n';
  const results = Object.values(data).sort((a, b) => b.timestamp - a.timestamp);
  results.forEach((r, i) => {
    const date = new Date(r.timestamp).toLocaleDateString('km-KH');
    const emoji = r.percent >= 70 ? '✅' : '❌';
    text += `${emoji} ${r.lessonTitle.split(':').pop().trim()}\n   ➡️ ${r.score}/${r.total} (${r.percent}%) - ${r.grade} | ${date}\n\n`;
  });
  ctx.reply(text, { parse_mode: 'Markdown' });
});


bot.command('history', async (ctx) => {
  const userId = ctx.from.id;
  const snapshot = await db.ref(`users/${userId}/history`).once('value');
  const historyData = snapshot.val();

  if (!historyData) {
    return ctx.reply("📝 អ្នកមិនទាន់បានចូលរៀនមេរៀនណាមួយនៅឡើយទេ។ សូមចុច /start ដើម្បីជ្រើសរើសមេរៀន!");
  }

  const lessons = Object.values(historyData).sort((a, b) => b.timestamp - a.timestamp);
  
  let msg = "📚 **ប្រវត្តិមេរៀនដែលអ្នកបានរៀនថ្មីៗនេះ៖**\n\n";
  const limit = Math.min(lessons.length, 10);
  
  for (let i = 0; i < limit; i++) {
    const date = new Date(lessons[i].timestamp).toLocaleString('en-GB', { timeZone: 'Asia/Phnom_Penh' });
    msg += `✅ ${lessons[i].title}\n🕒 ${date}\n\n`;
  }

  if (lessons.length > 10) {
    msg += `...និង ${lessons.length - 10} មេរៀនទៀត។`;
  }

  ctx.reply(msg, { parse_mode: 'Markdown' });
});

bot.command('testapi', async (ctx) => {
  try {
    const apiKey = getNextGeminiKey();
    if (!apiKey) return ctx.reply("No Gemini API key found.");
    
    ctx.reply("Testing Gemini API key: " + apiKey.substring(0, 10) + "...");
    
    const axios = require('axios');
    const response = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    
    const models = response.data.models.map(m => m.name).join('\n');
    ctx.reply(`Available Models:\n${models.substring(0, 3000)}`);
  } catch (error) {
    ctx.reply("Error testing API: " + (error.response?.data?.error?.message || error.message));
  }
});

bot.command('testgroq', async (ctx) => {
  try {
    const apiKey = getNextGroqKey();
    if (!apiKey) return ctx.reply("No Groq API key found.");
    
    ctx.reply("Testing Groq API key: " + apiKey.substring(0, 8) + "...");
    
    const axios = require('axios');
    const response = await axios.get('https://api.groq.com/openai/v1/models', {
      headers: { Authorization: `Bearer ${apiKey}` }
    });
    
    const models = response.data.data.map(m => `- ${m.id}`).join('\n');
    ctx.reply(`✅ Groq Available Models:\n${models.substring(0, 3000)}`);
  } catch (error) {
    ctx.reply("❌ Error testing Groq API: " + (error.response?.data?.error?.message || error.message));
  }
});

// ==========================================
// STRICT BILINGUAL LANGUAGE GUARD (KHMER & ENGLISH ONLY)
// ==========================================
const BILINGUAL_ONLY_NOTICE = "⚠️ វិទ្យាស្ថាន Teacher SSOnline បង្រៀននិងឆ្លើយតបតែជាភាសាខ្មែរ និងភាសាអង់គ្លេសប៉ុណ្ណោះ។ សូមសួរជាភាសាខ្មែរ ឬអង់គ្លេស!\n\n(Teacher SSOnline strictly provides instruction and responses in Khmer and English only. Please ask in Khmer or English!)";

const FOREIGN_SCRIPTS_REGEX = /[\u4E00-\u9FFF\u3400-\u4DBF\u0E00-\u0E7F\u0E80-\u0EFF\u1000-\u109F\u0400-\u04FF\u0600-\u06FF\u0750-\u077F\u3040-\u30FF\u31F0-\u31FF\uAC00-\uD7AF\u1100-\u11FF\u0900-\u097F\u0370-\u03FF\u0590-\u05FFàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/gi;

function isForbiddenForeignLanguage(text) {
  if (!text || typeof text !== 'string') return false;
  const foreignMatches = text.match(FOREIGN_SCRIPTS_REGEX) || [];
  return foreignMatches.length >= 2;
}

function isThirdLanguageRequest(text) {
  if (!text || typeof text !== 'string') return false;
  const thirdLangRegex = /(how\s+(do\s+you\s+|can\s+i\s+)?say|how\s+to\s+say|translate|what\s+is|meaning\s+in|say\s+in|write\s+in|teach\s+me|speak\s+in).*?\b(french|spanish|chinese|mandarin|thai|vietnamese|japanese|korean|russian|german|arabic|lao|burmese|italian|portuguese|hindi|latin)\b|\b(in\s+(french|spanish|chinese|mandarin|thai|vietnamese|japanese|korean|russian|german|arabic|lao|burmese|italian|portuguese|hindi|latin))\b|(បកប្រែ|ប្រែ|ជា|រៀន|និយាយ|សរសេរ).*?(ចិន|ថៃ|វៀតណាម|បារាំង|ជប៉ុន|កូរ៉េ|រុស្ស៊ី|អាល្លឺម៉ង់|អេស្ប៉ាញ|អារ៉ាប់|ឡាវ|ភូមា|អ៊ីតាលី|ព័រទុយហ្កាល់|ហិណ្ឌូ)/i;
  return thirdLangRegex.test(text);
}

function enforceKhmerAndEnglishOnly(text) {
  if (!text || typeof text !== 'string') return text;
  const matches = text.match(FOREIGN_SCRIPTS_REGEX) || [];
  if (matches.length > 0) {
    const totalChars = text.replace(/[\s\r\n\t]/g, '').length || 1;
    if (matches.length >= 4 || matches.length / totalChars > 0.05) {
      return BILINGUAL_ONLY_NOTICE;
    }
    const cleaned = text.replace(FOREIGN_SCRIPTS_REGEX, '').replace(/\s{2,}/g, ' ').trim();
    if (!cleaned || cleaned.length < 5) return BILINGUAL_ONLY_NOTICE;
    return cleaned;
  }
  return text;
}

const STRICT_BILINGUAL_PROHIBITION_PROMPT = `
[ABSOLUTE MANDATORY DIRECTIVE - ZERO THIRD-LANGUAGE TOLERANCE]
1. YOU ARE STRICTLY CONFINED TO KHMER (ភាសាខ្មែរ) AND ENGLISH (ភាសាអង់គ្លេស).
2. YOU ARE STRICTLY FORBIDDEN from generating, translating, teaching, or outputting ANY language or words in other languages (NO French, NO Spanish, NO Chinese, NO Thai, NO Vietnamese, NO German, NO Japanese, NO Korean, NO Italian, NO Russian, NO Arabic, etc.).
3. Even if the user asks:
   - "How to say X in French/Spanish/Chinese/Japanese/Thai?"
   - "Translate this into French/Chinese/Vietnamese/etc."
   - "Give me examples in other languages"
   YOU MUST FLATLY REFUSE. Never output foreign words (such as Bonjour, Hola, Merci, Gracias, Ni hao, etc.).
   Respond ONLY in Khmer or English:
   "វិទ្យាស្ថាន Teacher SSOnline ផ្ដោតលើការបង្រៀនតែភាសាខ្មែរ និងភាសាអង់គ្លេសប៉ុណ្ណោះ។ ខ្ញុំមិនអាចបកប្រែ ឬបញ្ចេញភាសាផ្សេងក្រៅពីភាសាខ្មែរ និងអង់គ្លេសបានឡើយ។ សូមសួរអំពីភាសាអង់គ្លេស ឬខ្មែរ! (Teacher SSOnline strictly teaches and communicates in Khmer and English only. I cannot output or translate into any other language. Please ask about English or Khmer!)"
4. All explanations must be in Khmer, and all language learning examples must be in English or Khmer. No third language is ever permitted.`;

async function handleUserMessage(ctx, userId, userText) {
  // Pre-check: strictly prohibit foreign languages or third-language translation requests
  if (isForbiddenForeignLanguage(userText) || isThirdLanguageRequest(userText)) {
    return ctx.reply(BILINGUAL_ONLY_NOTICE);
  }

  const isVIP = await checkVIP(userId);
  if (!isVIP) {
    return ctx.reply("🔒 **គណនីរបស់អ្នកមិនទាន់បានបង់ប្រាក់ទេ (Free Account)**\nអ្នកអាចត្រឹមតែអានមេរៀនដែលមានស្រាប់ប៉ុណ្ណោះ។ ដើម្បីសួរគ្រូ AI និងធ្វើតេស្ត សូមដំឡើងទៅគណនី VIP (Upgrade)។\n\nសូមចុចប៊ូតុង **💎 គណនី VIP (Upgrade)** ខាងក្រោមនេះ។", { parse_mode: 'Markdown' });
  }

  const state = await getUserState(userId);
  const aiType = 'groq'; // Force Groq for text conversation (Gemini is still used for STT Voice-to-Text)

  const waitMsg = await ctx.reply("⏳ គ្រូសនកំពុងគិត និងរៀបចំការឆ្លើយតប សូមរង់ចាំបន្តិចណា៎...");
  ctx.sendChatAction('typing');

  let systemPrompt = "You are a friendly, highly skilled English teacher for Cambodian students. Your name is Teacher Sorn (គ្រូសន). You speak both English and Khmer perfectly. Always encourage the student and refer to yourself as 'គ្រូសន' (Teacher Sorn) in Khmer conversations. Answer questions clearly using Khmer for explanations and English for examples.\n\n" + STRICT_BILINGUAL_PROHIBITION_PROMPT;
  
  if (state.startsWith('learning_')) {
    const topicId = state.replace('learning_', '');
    systemPrompt += `\nThe student is currently studying topic: ${topicId}. Please help them practice this topic, correct their grammar gently, and keep the conversation natural.`;
  } else if (state.startsWith('quiz_')) {
    const topicId = state.replace('quiz_', '');
    systemPrompt = `You are a strict but friendly English teacher evaluating a student's exercise for the topic: ${topicId}. Your name is Teacher Sorn (គ្រូសន) and you refer to yourself as 'គ្រូសន' when speaking Khmer.
The student just submitted their answer: "${userText}".
Evaluate their English grammar, relevance, and vocabulary. 
You MUST start your response with exactly "GRADE: A", "GRADE: B", "GRADE: C", or "GRADE: F". 
- Grade A: Perfect or minor mistakes.
- Grade B: Good but with some grammar mistakes.
- Grade C: Passable but has major errors.
- Grade F: Irrelevant to the topic, completely wrong, or not English.
After the grade, provide helpful feedback in Khmer explaining why they got this grade and how to improve. Remember to act as Teacher Sorn (គ្រូសន).`;
  }

  // Fetch recent chat history
  const snap = await db.ref(`users/${userId}/history`).limitToLast(12).once('value');
  const historyItems = snap.val();
  let pastContextText = "";
  let groqMessages = [{ role: 'system', content: systemPrompt }];
  
  if (historyItems) {
    const sorted = Object.values(historyItems)
      .filter(i => i.role && i.text) // Only chat logs, ignore lesson click objects
      .sort((a, b) => a.timestamp - b.timestamp);
    
    let lastRole = 'system';
    for (const item of sorted) {
      const currentRole = item.role === 'ai' ? 'assistant' : 'user';
      if (currentRole === lastRole) {
        groqMessages[groqMessages.length - 1].content += `\n${item.text}`;
      } else {
        groqMessages.push({ role: currentRole, content: item.text });
        lastRole = currentRole;
      }
      pastContextText += `${item.role === 'user' ? 'Student' : 'Teacher'}: ${item.text}\n`;
    }
  }

  // Ensure current user text is in Groq messages
  if (groqMessages[groqMessages.length - 1].role === 'user') {
    groqMessages[groqMessages.length - 1].content += `\n${userText}`;
  } else {
    groqMessages.push({ role: 'user', content: userText });
  }

  try {
    let aiResponse = "";
    let success = false;
    let lastError = null;

    // 1. FIRST PRIORITY: Groq (Ultra-fast & free quota saver)
    const groqModels = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768'];
    if (groqKeys && groqKeys.length > 0) {
      const maxGroqTries = Math.max(groqKeys.length, 2);
      for (let kTry = 0; kTry < maxGroqTries; kTry++) {
        if (success) break;
        const apiKey = getNextGroqKey();
        if (!apiKey) continue;

        for (const modelName of groqModels) {
          try {
            const groq = new Groq({ apiKey });
            const chatCompletion = await groq.chat.completions.create({
              messages: groqMessages,
              model: modelName,
              temperature: 0.7,
              max_tokens: 1200
            });
            const text = chatCompletion.choices?.[0]?.message?.content;
            if (text && text.trim().length > 0) {
              aiResponse = text.trim();
              success = true;
              console.log(`[Telegram AI] Answer generated via Groq (${modelName})`);
              break;
            }
          } catch (error) {
            lastError = error;
            console.warn(`[Telegram AI] Groq (${modelName}) failed: ${error.message}. Retrying...`);
          }
        }
      }
    }

    // 2. SECOND PRIORITY: Gemini (Automatic fallback when Groq quota is exhausted or unavailable)
    if (!success && geminiKeys && geminiKeys.length > 0) {
      console.log("[Telegram AI] Groq exhausted or unavailable. Automatically falling back to Gemini...");
      const geminiModels = [
        "gemini-flash-lite-latest",
        "gemini-3.8-flash",
        "gemini-flash-latest",
        "gemini-2.5-flash-lite",
        "gemini-2.5-pro"
      ];
      const maxGeminiTries = Math.max(geminiKeys.length, 2);

      for (const modelName of geminiModels) {
        if (success) break;
        for (let kTry = 0; kTry < maxGeminiTries; kTry++) {
          try {
            const apiKey = getNextGeminiKey();
            if (!apiKey) continue;
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: modelName });
            const prompt = `${systemPrompt}\n\n[Past Conversation]\n${pastContextText}\n\nStudent: ${userText}\nTeacher:`;
            const result = await model.generateContent(prompt);
            const text = result?.response?.text();
            if (text && text.trim().length > 0) {
              aiResponse = text.trim();
              success = true;
              console.log(`[Telegram AI] Answer generated via Gemini fallback (${modelName})`);
              break; // Break key loop
            }
          } catch (error) {
            lastError = error;
            console.warn(`[Telegram AI] Gemini (${modelName}) failed: ${error.message}. Retrying...`);
          }
        }
      }
    }

    // 3. THIRD PRIORITY: OpenAI (Safety net)
    if (!success && process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "YOUR_OPENAI_KEY") {
      try {
        console.log("[Telegram AI] Falling back to OpenAI...");
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const res = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: groqMessages,
          temperature: 0.7
        });
        const text = res.choices?.[0]?.message?.content;
        if (text && text.trim().length > 0) {
          aiResponse = text.trim();
          success = true;
          console.log("[Telegram AI] Answer generated via OpenAI fallback");
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (!success) {
      throw lastError || new Error("All AI engines (Groq, Gemini, OpenAI) were exhausted or unavailable.");
    }

    // Strict bilingual enforcement on output
    aiResponse = enforceKhmerAndEnglishOnly(aiResponse);

    await saveHistory(userId, 'user', userText); // Saved after fetching history
    await saveHistory(userId, 'ai', aiResponse);
    setLatestResponse(userId, aiResponse, 'sorn');
    
    // Delete waiting message
    try {
      await ctx.telegram.deleteMessage(ctx.chat.id, waitMsg.message_id);
    } catch (e) { }

    // Send AI Response
    await ctx.reply(aiResponse, Markup.inlineKeyboard([
      [
        Markup.button.callback('💬 បន្តសន្ទនា', `continue_chat_${userId}`),
        Markup.button.callback('🔊 ស្ដាប់សម្លេង', `tts_${userId}`)
      ]
    ]));

    if (state.startsWith('quiz_')) {
      const gradeMatch = aiResponse.match(/GRADE:\s*([ABCF])/i);
      if (gradeMatch) {
        const grade = gradeMatch[1].toUpperCase();
        const lessonKey = state.replace('quiz_', ''); // e.g. m1_w1_l1
        const parts = lessonKey.split('_');
        const monthData = curriculum.months.find(m => m.id === parts[0]);
        const weekData = monthData?.weeks.find(w => w.id === parts[1]);
        const lessonData = weekData?.lessons.find(l => l.id === parts[2]);

        if (lessonData) {
          await db.ref(`users/${userId}/progress/${lessonKey}`).set({
            title: `${monthData.title} > ${weekData.title} > ${lessonData.title}`,
            grade: grade,
            timestamp: Date.now()
          });

          if (['A', 'B', 'C'].includes(grade)) {
            await ctx.reply(`🎉 អបអរសាទរ! អ្នកបានប្រឡងជាប់មេរៀននេះជាមួយនឹងនិទ្ទេស **${grade}**! ពិន្ទុរបស់អ្នកត្រូវបានកត់ត្រាទុកជោគជ័យ។`, { parse_mode: 'Markdown' });
            await setUserState(userId, `learning_${lessonKey}`); // Reset back to learning state
          } else {
            await ctx.reply(`❌ អ្នកទទួលបាននិទ្ទេស **F** (មិនទាន់ជាប់ទេ)។ ពិន្ទុត្រូវបានកត់ត្រា។ សូមអានមេរៀនសិន រួចសាកល្បងប្រឡងម្ដងទៀត!`, { parse_mode: 'Markdown' });
          }
        }
      }
    }
  } catch (error) {
    try {
      await ctx.telegram.deleteMessage(ctx.chat.id, waitMsg.message_id);
    } catch (e) { }
    console.error("AI Error:", error);
    ctx.reply(`សុំទោស មានបញ្ហាបច្ចេកទេសបន្តិច! សូមពិនិត្យមើលការភ្ជាប់ API។\n\n🔍 **កំណត់ត្រាបញ្ហា (Error):** ${error.message}`);
  }
}

// Sync Code Generation Handler (/link, /sync)
const generateAndSendSyncCode = async (ctx) => {
  const userId = ctx.from.id.toString();
  const userName = [ctx.from.first_name, ctx.from.last_name].filter(Boolean).join(' ') || `User ${userId}`;
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  if (db) {
    try {
      await db.ref(`sync_codes/${code}`).set({
        telegramId: userId,
        name: userName,
        username: ctx.from.username || '',
        createdAt: Date.now(),
        expiresAt: Date.now() + 15 * 60 * 1000 // 15 mins validity
      });
    } catch (err) {
      console.error('Error creating sync code:', err);
    }
  }

  const webUrl = WEBAPP_DEFAULT_URL;

  return ctx.reply(
    `╔════════════════════════════════════════════╗\n` +
    `   🔗 *លេខកូដភ្ជាប់គណនី WEB APP (SYNC CODE)* 🔗\n` +
    `╚════════════════════════════════════════════╝\n\n` +
    `🔑 លេខកូដសម្គាល់របស់អ្នក៖\n` +
    `👉 \`${code}\` 👈\n\n` +
    `⏱️ សុពលភាព៖ *១៥ នាទី*\n\n` +
    `🌐 *របៀបប្រើប្រាស់លើ Google Chrome / Safari៖*\n` +
    `១. បើកវេបសាយ៖ [ចុចទីនេះដើម្បីបើក](${webUrl})\n` +
    `២. ចុចប៊ូតុង *«🔑 ចូលគណនី»* រួចរើសយក *«📱 កូដ Telegram (Sync)»* (ឬពេលចុះឈ្មោះ)\n` +
    `៣. បញ្ចូលលេខកូដសម្គាល់៖ \`${code}\`\n\n` +
    `✨ _នោះប្រព័ន្ធនឹង Sync រាល់មេរៀនដែលបានរៀន, ពិន្ទុ, វិញ្ញាបនបត្រ និងគណនី VIP របស់អ្នករវាង Telegram និង Chrome ជាមួយគ្នាដោយស្វ័យប្រវត្តិ!_`,
    {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.webApp('🌐 បើក Web App ឥឡូវនេះ', webUrl)],
        [Markup.button.url('🌐 បើកលើ Browser', webUrl)]
      ]).reply_markup
    }
  );
};

bot.command(['link', 'sync', 'syncweb', 'webcode'], generateAndSendSyncCode);
bot.hears('🔗 យកកូដភ្ជាប់ Web (Link)', generateAndSendSyncCode);
bot.action('get_sync_code', async (ctx) => {
  await ctx.answerCbQuery();
  await generateAndSendSyncCode(ctx);
});

bot.hears('🌐 បើក Web App (Study Online)', async (ctx) => {
  const webUrl = WEBAPP_DEFAULT_URL;
  return ctx.reply('👇 សូមចុចប៊ូតុងខាងក្រោមដើម្បីបើក Web App សិក្សា៖', {
    reply_markup: Markup.inlineKeyboard([
      [Markup.button.webApp('🌐 បើក Web App (Study Online)', webUrl)],
      [Markup.button.callback('🔗 យកកូដភ្ជាប់ Web App (Sync Code)', 'get_sync_code')]
    ]).reply_markup
  });
});

// AI Chat Handling
bot.on('text', async (ctx, next) => {
  const userId = ctx.from.id.toString();
  const userText = ctx.message.text ? ctx.message.text.trim() : '';

  // Ignore persistent menu clicks
  const menuOptions = [
    '📚 បញ្ជីមេរៀន (Lessons)',
    '🎓 ប្រឡងបញ្ចប់មុខវិជ្ជា',
    '🌐 បើក Web App (Study Online)',
    '📜 វិញ្ញាបនបត្ររបស់ខ្ញុំ',
    '🔄 ប្តូរគ្រូ AI',
    '🕰️ ប្រវត្តិសិក្សា',
    '🔗 យកកូដភ្ជាប់ Web (Link)',
    '❓ ជំនួយ (Help)',
    '💎 គណនី VIP (Upgrade)',
    '🌍 បកប្រែ (Translate EN↔KH)',
    '🔊 ស្តាប់ English (Listen EN)'
  ];
  if (menuOptions.includes(userText)) return next ? next() : undefined;

  // 🔑 Intercept License Key input (from "enter_license_key" button or auto-detect STUDY-XXXX-XXXX-XXXX)
  const userState = await getUserState(userId);
  const isKeyFormat = /^STUDY-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(userText);

  if (userState === 'awaiting_license_key' || isKeyFormat) {
    await setUserState(userId, 'none');
    const res = await redeemLicenseKey(db, userId, userText);
    if (res.success) {
      return ctx.reply(
        `🎉 **អបអរសាទរ! បញ្ចូល License Key ជោគជ័យ!**\n\n` +
        `💎 គណនីរបស់អ្នកឥឡូវនេះជា **VIP** ពេញលេញ!\n` +
        `⏱️ រយៈពេលបន្ថែម៖ **${res.label}** (${res.days} ថ្ងៃ)\n` +
        `⌛ សុពលភាពរហូតដល់៖ **${res.expireDateFormatted}**\n\n` +
        `✨ ឥឡូវអ្នកអាចប្រើប្រាស់មុខងារទាំងអស់៖\n` +
        `• 🧠 សួរគ្រូ AI ដោយគ្មានដែនកំណត់\n` +
        `• 🔊 អានមេរៀនជាសំឡេង\n` +
        `• 📝 ប្រឡង Quiz MCQ និងកត់ត្រាពិន្ទុ\n` +
        `• 🎤 ផ្ញើសារជាសំឡេងបានយ៉ាងងាយស្រួល!`,
        { parse_mode: 'Markdown' }
      );
    } else {
      return ctx.reply(res.message);
    }
  }

  // 👑 Intercept Admin Dashboard Interactive States
  if (SUPER_ADMIN_IDS.includes(userId)) {
    if (userText === '/cancel') {
      await setUserState(userId, 'none');
      delete broadcastCache[userId];
      return ctx.reply("❌ បានបោះបង់ប្រតិបត្តិការ។", {
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback('👑 ត្រឡប់ទៅ Dashboard', 'adm_back_dash')]
        ]).reply_markup
      });
    }

    if (userState === 'adm_awaiting_check_id') {
      await setUserState(userId, 'none');
      const targetId = userText.trim();
      const info = await getUserLicenseInfo(db, targetId, SUPER_ADMIN_IDS);
      let msg = `🔍 **ព័ត៌មាន License របស់សិស្ស៖**\n\n` +
        `👤 User ID: \`${targetId}\`\n` +
        `📊 ស្ថានភាព: **${info.statusKhmer}**\n` +
        `⌛ ថ្ងៃផុតកំណត់: **${info.expireDateFormatted}**\n`;
      if (info.isVIP && !info.isAdmin) {
        msg += `⏳ នៅសល់: **${info.daysRemaining} ថ្ងៃ ${info.hoursRemaining} ម៉ោង**\n`;
      }
      return ctx.reply(msg, {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback('➕ ដាក់ VIP ឱ្យសិស្សនេះ', 'adm_set_vip')],
          [Markup.button.callback('🔙 ត្រឡប់ទៅ Dashboard', 'adm_back_dash')]
        ]).reply_markup
      });
    }

    if (userState === 'adm_awaiting_set_vip') {
      await setUserState(userId, 'none');
      const parts = userText.trim().split(/\s+/);
      if (parts.length < 2) {
        return ctx.reply("❌ ទម្រង់មិនត្រឹមត្រូវ! សូមវាយ [UserID] [រយៈពេល] ឧទាហរណ៍៖ `123456789 1m`", { parse_mode: 'Markdown' });
      }
      const targetId = parts[0];
      const duration = parts[1];
      const res = await setDirectLicense(db, userId, targetId, duration);
      if (!res.success) return ctx.reply(res.message);

      try {
        await bot.telegram.sendMessage(
          targetId,
          `🎉 **អបអរសាទរ! Admin បានកំណត់ License VIP ជូនអ្នក!**\n\n` +
          `⏱️ រយៈពេលបន្ថែម៖ **${res.label}**\n` +
          `⌛ សុពលភាពរហូតដល់៖ **${res.expireDateFormatted}**\n\n` +
          `✨ ឥឡូវអ្នកអាចប្រើប្រាស់មុខងារទាំងអស់បានពេញលេញ!`,
          { parse_mode: 'Markdown' }
        );
      } catch (e) {}

      return ctx.reply(
        `✅ **កំណត់ License ជោគជ័យ!**\n\n` +
        `👤 សិស្ស ID: \`${res.targetUserId}\`\n` +
        `⏱️ បន្ថែម: **${res.label}** (${res.days} ថ្ងៃ)\n` +
        `⌛ ផុតកំណត់: **${res.expireDateFormatted}**`,
        {
          parse_mode: 'Markdown',
          reply_markup: Markup.inlineKeyboard([
            [Markup.button.callback('🔙 ត្រឡប់ទៅ Dashboard', 'adm_back_dash')]
          ]).reply_markup
        }
      );
    }

    if (userState === 'adm_awaiting_revoke_id') {
      await setUserState(userId, 'none');
      const targetId = userText.trim();
      await revokeUserLicense(db, userId, targetId);
      try {
        await bot.telegram.sendMessage(
          targetId,
          `⚠️ គណនី VIP របស់អ្នកត្រូវបានដកហូត (Revoked) ដោយ Admin។`,
          { parse_mode: 'Markdown' }
        );
      } catch (e) {}
      return ctx.reply(`✅ បានដកហូត License របស់ ID: \`${targetId}\` រួចរាល់។`, {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback('🔙 ត្រឡប់ទៅ Dashboard', 'adm_back_dash')]
        ]).reply_markup
      });
    }

    if (userState === 'adm_awaiting_broadcast_msg') {
      await setUserState(userId, 'none');
      broadcastCache[userId] = { text: userText, timestamp: Date.now() };
      return ctx.reply(
        `📢 **ទិដ្ឋភាពសារប្រកាស (Preview):**\n` +
        `---------------------------\n` +
        `${userText}\n` +
        `---------------------------\n\n` +
        `⚠️ *តើអ្នកពិតជាចង់ផ្ញើសារនេះទៅកាន់សិស្សទាំងអស់មែនទេ?*`,
        {
          parse_mode: 'Markdown',
          reply_markup: Markup.inlineKeyboard([
            [Markup.button.callback('✅ បញ្ជាក់ការផ្ញើ (Send Now)', 'adm_confirm_broadcast')],
            [Markup.button.callback('❌ បោះបង់ (Cancel)', 'adm_cancel_broadcast')]
          ]).reply_markup
        }
      );
    }
  }

  // ❌ Cancel command for any active state
  if (userText === '/cancel') {
    await setUserState(userId, 'none');
    return ctx.reply("❌ បានបោះបង់ប្រតិបត្តិការ។");
  }

  // 🌍 Translation States (100% offline — accessible to everyone)
  if (['awaiting_translate', 'awaiting_translate_en_to_kh', 'awaiting_translate_kh_to_en'].includes(userState)) {
    await setUserState(userId, 'none');
    let dir = 'auto';
    if (userState === 'awaiting_translate_en_to_kh') dir = 'en_to_kh';
    else if (userState === 'awaiting_translate_kh_to_en') dir = 'kh_to_en';

    await ctx.reply('⏳ *កំពុងបកប្រែ (ស្តង់ដាជាតិ)...*', { parse_mode: 'Markdown' });
    ctx.sendChatAction('typing');

    try {
      const result = await translateText(userText, dir);
      const { translated, fromLabel, toLabel } = result;
      const fullMsg = `🌍 *ការបកប្រែ (${fromLabel} → ${toLabel})*\n\n*ដើម:* ${userText}\n\n*បកប្រែ:*\n${translated}`;

      if (result.toLang === 'English') {
        userTranslationCache.set(userId, { enText: translated, khText: userText });
        setLatestResponse(userId, translated, 'sorn');
      } else {
        userTranslationCache.set(userId, { enText: userText, khText: translated });
        setLatestResponse(userId, translated, 'sorn');
      }

      const buttons = [];
      if (result.toLang === 'English') {
        buttons.push([Markup.button.callback('🔊 ស្តាប់ English (Native)', `tts_en_${userId}`)]);
      }
      buttons.push([Markup.button.callback('🔊 ស្តាប់ខ្មែរ', `tts_${userId}`)]);
      buttons.push([Markup.button.callback('🌍 បកប្រែម្ដងទៀត', 'translate_mode_auto')]);

      const maxLen = 3900;
      if (fullMsg.length > maxLen) {
        await ctx.reply(fullMsg.substring(0, maxLen), { parse_mode: 'Markdown' });
        return ctx.reply(fullMsg.substring(maxLen), {
          parse_mode: 'Markdown',
          reply_markup: Markup.inlineKeyboard(buttons).reply_markup
        });
      } else {
        return ctx.reply(fullMsg, {
          parse_mode: 'Markdown',
          reply_markup: Markup.inlineKeyboard(buttons).reply_markup
        });
      }
    } catch (err) {
      console.error('[Translate Error]', err);
      return ctx.reply('❌ មិនអាចបកប្រែបានទេ! សូមព្យាយាមម្ដងទៀត!');
    }
  }

  // 🔊 English Pronunciation Direct State (awaiting_en_tts)
  if (userState === 'awaiting_en_tts') {
    await setUserState(userId, 'none');
    const isAdmin = SUPER_ADMIN_IDS.includes(userId);
    const isVIPUser = isAdmin || (await checkVIP(userId));
    if (!isVIPUser && !isAdmin) {
      return ctx.reply(
        `🔊 *មុខងារស្តាប់ English (Listen EN) សម្រាប់ VIP ប៉ុណ្ណោះ!* 💎\n\n` +
        `💰 *តម្លៃ: 3$/ខែ | 30$/ឆ្នាំ*`,
        {
          parse_mode: 'Markdown',
          reply_markup: Markup.inlineKeyboard([
            [Markup.button.callback('💎 Upgrade VIP', 'vip_upgrade')],
            [Markup.button.callback('🔑 បញ្ចូល License Key', 'enter_license_key')]
          ]).reply_markup
        }
      );
    }

    if (!isAdmin) {
      const limitCheck = checkTTSLimit(userId, true);
      if (!limitCheck.allowed) {
        return ctx.reply(limitCheck.message, { parse_mode: 'Markdown' });
      }
    }

    await ctx.reply('🔊 *កំពុងបង្កើតសំឡេង English Pronunciation...*', { parse_mode: 'Markdown' });
    ctx.sendChatAction('record_voice');
    recordTTSStart(userId);

    try {
      const cleanEn = userText.replace(/[\u1780-\u17FF\u19E0-\u19FF]+/g, '').trim() || userText;
      const buffer = await synthesizeSpeechBuffer(cleanEn.substring(0, 500), "en-US-GuyNeural");
      if (!buffer) throw new Error("No audio generated");
      setLatestResponse(userId, userText, 'sorn');
      return ctx.replyWithVoice(
        { source: buffer },
        { caption: `🇺🇸 English Pronunciation by Teacher Sorn AI\n\n"${userText.substring(0, 200)}"` }
      );
    } catch (e) {
      console.error('En TTS state error:', e);
      return ctx.reply('❌ មិនអាចបង្កើតសំឡេងបានទេ។ សូមព្យាយាមម្តងទៀត!');
    } finally {
      recordTTSDone();
    }
  }

  // 💎 VIP Gate - Free account cannot use AI chat
  const isVIP = await checkVIP(userId);
  if (!isVIP) {
    return ctx.reply(
      `🧠 *មុខងារសួរជា AI សម្រាប់ VIP ប៉ុណ្ណោះ!*\n\n` +
      `សម្រាប់ Free Account អ្នកអាច:\n` +
      `✅ មើលមេរៀនទាំងអស់ (Curriculum)\n` +
      `✅ មើលកិរិយាសព្ទប្រែប្រួល\n\n` +
      `❌ សួរជាគ្រូ AI (ត្រូវការ VIP)\n` +
      `❌ អានសំឡេង (ត្រូវការ VIP)\n` +
      `❌ ប្រឡង Quiz (ត្រូវការ VIP)\n` +
      `❌ ផ្ញើសារជាសំឡេង (ត្រូវការ VIP)\n\n` +
      `💰 *តម្លៃ: 3$/ខែ | 30$/ឆ្នាំ*`,
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback('💎 Upgrade VIP នៅទីនេះ', 'vip_upgrade')],
          [Markup.button.callback('🔑 បញ្ចូល License Key', 'enter_license_key')]
        ]).reply_markup
      }
    );
  }

  // AI rate limit check (VIP only gets here)
  const aiCheck = checkAILimit(userId, isVIP);
  if (!aiCheck.allowed) {
    return ctx.reply(aiCheck.message, { parse_mode: 'Markdown' });
  }
  recordAIUsage(userId);

  await handleUserMessage(ctx, userId, userText);
});

// Voice Message Handling - Policy: Encourage text to maximize quota savings (85-90% saving), while offering free unlimited TTS
bot.on('voice', async (ctx) => {
  const userId = ctx.from.id.toString();
  const username = ctx.from.first_name || 'ប្អូន';
  const webUrl = process.env.WEBAPP_URL || process.env.RENDER_EXTERNAL_URL || 'https://studyai-bot-wmha.onrender.com/';

  return ctx.reply(
    `💡 *សួស្តី ${username}! សូមវាយជាអក្សរដើម្បីសន្សំកូតា និងទទួលបានចម្លើយលឿនបំផុត!* ✍️\n\n` +
    `ដើម្បីឱ្យគ្រូសន (Teacher Sorn) អាចវិភាគសំណួរបានលម្អិត រហ័ស និងមិនអស់កូតាប្រព័ន្ធ សូមប្អូន **វាយសំណួរជាអក្សរ (Text)** ផ្ញើមកកាន់គ្រូសនណា៎!\n\n` +
    `🔊 *បន្ទាប់ពីគ្រូសនឆ្លើយតបជាអក្សររួច ប្អូនអាចចុចប៊ូតុង «🔊 ស្ដាប់សម្លេង» ដើម្បីស្តាប់គ្រូសនបញ្ចេញសំឡេងពន្យល់ដោយឥតគិតថ្លៃ (Free Unlimited TTS) បានជានិច្ច!* 🌟`,
    {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.webApp('🌐 បើក Web App រៀនតាមទូរស័ព្ទ', webUrl)]
      ]).reply_markup
    }
  );
});

// TTS Generation Action (Using Edge TTS)
bot.action(/tts_(.+)/, async (ctx) => {
  const userId = ctx.match[1];
  if (ctx.from.id.toString() !== userId) return ctx.answerCbQuery("អ្នកមិនអាចស្តាប់សម្លេងនេះបានទេ។");

  const isAdmin = SUPER_ADMIN_IDS.includes(userId.toString());
  const isVIP = isAdmin || (await checkVIP(userId));

  // Retrieve cached or DB text and tutor info
  let text = null;
  let tutor = null;

  const cached = userLatestResponseCache.get(userId.toString());
  if (cached) {
    text = cached.text;
    tutor = cached.tutor;
  }

  if (!text && db) {
    try {
      const snap = await db.ref(`users/${userId}/latestResponse`).once('value');
      text = snap.val();
      const tutorSnap = await db.ref(`users/${userId}/currentTutor`).once('value');
      tutor = tutorSnap.val();
    } catch (e) {
      console.warn("DB read error in TTS:", e.message);
    }
  }

  const isPiseth = tutor === 'piseth' || (text && (text.includes('អ្នកគ្រូពិសិដ្ឋ') || text.includes('Teacher Piseth') || text.includes('ថ្នាក់ដំបូង')));

  // VIP Gate: Admins and Beginner Course (Teacher Piseth) are free to listen!
  if (!isVIP && !isPiseth && !isAdmin) {
    await ctx.answerCbQuery('🔒 VIP ប៉ុណ្ណោះ!');
    return ctx.reply(
      `🔊 *មុខងារអានជាសំឡេង (TTS) សម្រាប់ VIP ប៉ុណ្ណោះ!*\n\n` +
      `✅ ចូលជា VIP ដើម្បីទទួលបាន:\n` +
      `• 🔊 អានសារជាសំឡេង\n` +
      `• 🧠 សួរជាគ្រូ AI\n` +
      `• 📝 ប្រឡង Quiz MCQ\n` +
      `• 🎤 ផ្ញើសារជាសំឡេង\n\n` +
      `💰 *តម្លៃ: 3$/ខែ | 30$/ឆ្នាំ*`,
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback('💎 Upgrade VIP នៅទីនេះ', 'vip_upgrade')],
          [Markup.button.callback('🔑 បញ្ចូល License Key', 'enter_license_key')]
        ]).reply_markup
      }
    );
  }

  // Rate limit check (skipped for admin)
  if (!isAdmin) {
    const limitCheck = checkTTSLimit(userId, isVIP || isPiseth);
    if (!limitCheck.allowed) {
      await ctx.answerCbQuery('⛔ ប្រើប្រាស់ច្រើន!');
      return ctx.reply(limitCheck.message, { parse_mode: 'Markdown' });
    }
  }

  await ctx.answerCbQuery("កំពុងបង្កើតសម្លេង...");
  ctx.sendChatAction('record_voice');
  recordTTSStart(userId);

  try {
    if (!text) {
      return ctx.reply("❌ រកមិនឃើញអត្ថបទដើម្បីអានទេ។ សូមចុចបើកមេរៀនជាថ្មី!");
    }

    const hasKhmer = /[\u1780-\u17FF]/.test(text);
    const selectedVoice = isPiseth 
      ? (hasKhmer ? "km-KH-SreymomNeural" : "en-US-JennyNeural")
      : (hasKhmer ? "km-KH-PisethNeural" : "en-US-GuyNeural");

    const buffer = await synthesizeSpeechBuffer(text, selectedVoice);
    if (!buffer) {
      throw new Error("Unable to synthesize audio from the text");
    }

    await ctx.replyWithVoice(
      { source: buffer },
      { caption: isPiseth ? '👩‍🏫 សំឡេងអ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)' : '👨‍🏫 សំឡេងគ្រូសន (Teacher Sorn AI)' }
    );
  } catch (error) {
    console.error("TTS Error:", error);
    ctx.reply("❌ មិនអាចបង្កើតសម្លេងបានទេពេលនេះ។ សូមព្យាយាមម្តងទៀត!");
  } finally {
    recordTTSDone();
  }
});

// ==========================================
// ENGLISH-ONLY TTS HANDLER (tts_en_USERID)
// ==========================================
bot.action(/tts_en_(.+)/, async (ctx) => {
  const userId = ctx.match[1];
  if (ctx.from.id.toString() !== userId) return ctx.answerCbQuery("អ្នកមិនអាចស្តាប់សម្លេងនេះបានទេ។");

  const isAdmin = SUPER_ADMIN_IDS.includes(userId.toString());
  const isVIP = isAdmin || (await checkVIP(userId));

  // VIP Gate (Beginner course is free to listen)
  const cached = userLatestResponseCache.get(userId.toString());
  const tutor = cached?.tutor || null;
  const isPiseth = tutor === 'piseth';

  if (!isVIP && !isPiseth && !isAdmin) {
    await ctx.answerCbQuery('🔒 VIP ប៉ុណ្ណោះ!');
    return ctx.reply(
      `🔊 *មុខងារស្តាប់ English (Listen EN) សម្រាប់ VIP ប៉ុណ្ណោះ!* 💎\n\n` +
      `💰 *តម្លៃ: 3$/ខែ | 30$/ឆ្នាំ*`,
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback('💎 Upgrade VIP', 'vip_upgrade')],
          [Markup.button.callback('🔑 បញ្ចូល License Key', 'enter_license_key')]
        ]).reply_markup
      }
    );
  }

  // Rate limit check
  if (!isAdmin) {
    const limitCheck = checkTTSLimit(userId, isVIP || isPiseth);
    if (!limitCheck.allowed) {
      await ctx.answerCbQuery('⛔ ប្រើប្រាស់ច្រើន!');
      return ctx.reply(limitCheck.message, { parse_mode: 'Markdown' });
    }
  }

  // Retrieve cached lesson text
  let text = cached?.text || null;
  if (!text && db) {
    try {
      const snap = await db.ref(`users/${userId}/latestResponse`).once('value');
      text = snap.val();
    } catch (e) {}
  }

  if (!text) {
    await ctx.answerCbQuery('❌ រកមិនឃើញអត្ថបទ!');
    return ctx.reply("❌ រកមិនឃើញអត្ថបទដើម្បីអានទេ។ សូមចុចបើកមេរៀនជាថ្មី!");
  }

  await ctx.answerCbQuery("🔊 កំពុងបង្កើតសម្លេង English...");
  ctx.sendChatAction('record_voice');
  recordTTSStart(userId);

  try {
    // Extract only English portions of the text (lines with significant English)
    const lines = text.split('\n');
    const englishLines = lines.filter(line => {
      const latinCount = (line.match(/[a-zA-Z]/g) || []).length;
      const totalLen = line.replace(/\s/g, '').length || 1;
      return latinCount / totalLen > 0.3 && latinCount > 3;
    });

    let enText = englishLines.join('\n').trim();
    if (!enText) {
      enText = text.replace(/[\u1780-\u17FF\u19E0-\u19FF]+/g, '').replace(/\s+/g, ' ').trim();
    }
    if (!enText || enText.length < 3) {
      return ctx.reply("❌ រកមិនឃើញអត្ថបទភាសាអង់គ្លេស! មេរៀននេះប្រហែលជាមានភាសាខ្មែរច្រើនជាង។");
    }

    // Cap text
    enText = enText.substring(0, 1200);

    const buffer = await synthesizeSpeechBuffer(enText, "en-US-GuyNeural");
    if (!buffer) throw new Error("No audio generated");

    await ctx.replyWithVoice(
      { source: buffer },
      { caption: '🇺🇸 English Pronunciation by Teacher Sorn AI (Native English Voice)' }
    );
  } catch (error) {
    console.error("English TTS Error:", error);
    ctx.reply("❌ មិនអាចបង្កើតសម្លេង English បានទេ។ សូមព្យាយាមម្តងទៀត!");
  } finally {
    recordTTSDone();
  }
});

// ==========================================
// TRANSLATION SYSTEM (EN ↔ KH) - NATIONAL STANDARD
// ==========================================

// Helper: Use AI to translate text (bidirectional)
/**
 * translateText — ប្រព័ន្ធបកប្រែ 100% Offline
 * ❌ Zero AI  ❌ Zero Internet  ✅ Works always
 * ស្តង់ដាជាតិ • ក្រសួងអប់រំ យុវជន និងកីឡា
 */
function translateText(text, direction) {
  // direction: 'en_to_kh' | 'kh_to_en' | 'auto'
  try {
    const result = offlineTranslator.translate(text, direction || 'auto');
    console.log(`[Offline Translate] ${result.fromLabel}→${result.toLabel} | ${text.substring(0, 40)}...`);
    return Promise.resolve(result);
  } catch (err) {
    console.error('[Offline Translate Error]', err.message);
    return Promise.reject(new Error('ប្រព័ន្ធបកប្រែ: ' + err.message));
  }
}

// Helper: Cache user's latest EN text for en-TTS
const userTranslationCache = new Map(); // userId -> { enText, khText }

// ── Translate Menu (keyboard button) ──
bot.hears('🌍 បកប្រែ (Translate EN↔KH)', async (ctx) => {
  const userId = ctx.from.id.toString();
  await setUserState(userId, 'awaiting_translate');
  await ctx.reply(
    `🌍 *ប្រព័ន្ធបកប្រែ English ↔ ខ្មែរ (Translation System)*\n\n` +
    `📋 *ស្តង់ដាជាតិ (National Standard)* • ក្រសួងអប់រំ យុវជន និងកីឡា\n\n` +
    `✅ *បកប្រែបាន៖*\n` +
    `• ភាសាអង់គ្លេស ➜ ភាសាខ្មែរ (EN → KH)\n` +
    `• ភាសាខ្មែរ ➜ ភាសាអង់គ្លេស (KH → EN)\n` +
    `• ចាប់ភាសាដោយស្វ័យប្រវត្តិ (Auto-detect)\n\n` +
    `🔊 *លក្ខណៈពិសេស (Features)๗*\n` +
    `• ស្ដាប់ការបញ្ចេញសំឡេង English (Native Pronunciation)\n` +
    `• ស្ដាប់ភាសាខ្មែរ (Khmer TTS)\n` +
    `• ចំណាំបច្ចេកទេស (Technical Terms) ត្រូវបានរក្សាទុក\n\n` +
    `✍️ *សូមវាយអត្ថបទដែលអ្នកចង់បកប្រែ:*\n` +
    `_(ភាសាអង់គ្លេស ឬ ភាសាខ្មែរ - ប្រព័ន្ធនឹងកំណត់ដោយស្វ័យប្រវត្តិ)_`,
    {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.callback('🔤 EN → ខ្មែរ (English to Khmer)', 'translate_mode_en_to_kh')],
        [Markup.button.callback('🔡 ខ្មែរ → EN (Khmer to English)', 'translate_mode_kh_to_en')],
        [Markup.button.callback('🔄 ស្វ័យប្រវត្តិ (Auto-detect)', 'translate_mode_auto')],
        [Markup.button.callback('❌ បោះបង់ (Cancel)', 'translate_cancel')]
      ]).reply_markup
    }
  );
});

// ── Listen English keyboard button ──
bot.hears('🔊 ស្តាប់ English (Listen EN)', async (ctx) => {
  const userId = ctx.from.id.toString();
  const isAdmin = SUPER_ADMIN_IDS.includes(userId);
  const isVIP = isAdmin || (await checkVIP(userId));

  if (!isVIP && !isAdmin) {
    return ctx.reply(
      `🔊 *មុខងារស្តាប់ English (Listen EN) សម្រាប់ VIP ប៉ុណ្ណោះ!* 💎\n\n` +
      `💡 ស្តាប់ការបញ្ចេញសំឡេងពាក្យ/ឃ្លា English ដោយ Native American Voice\n\n` +
      `💰 *តម្លៃ: 3$/ខែ | 30$/ឆ្នាំ*`,
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback('💎 Upgrade VIP', 'vip_upgrade')],
          [Markup.button.callback('🔑 បញ្ចូល License Key', 'enter_license_key')]
        ]).reply_markup
      }
    );
  }

  await setUserState(userId, 'awaiting_en_tts');
  await ctx.reply(
    `🔊 *ស្តាប់ English Pronunciation (Native Voice)*\n\n` +
    `✍️ សូមវាយពាក្យ ឬឃ្លា English ដែលអ្នកចង់ស្តាប់:\n` +
    `_(ឧទាហរណ៍: "Good morning", "I am studying English", "The Present Perfect Tense")_`,
    {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.callback('❌ បោះបង់', 'translate_cancel')]
      ]).reply_markup
    }
  );
});

// ── Translate mode selection actions ──
bot.action('translate_mode_en_to_kh', async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id.toString();
  await setUserState(userId, 'awaiting_translate_en_to_kh');
  await ctx.reply('🔤 *English → ខ្មែរ*\n\nសូមវាយ ឬ Paste អត្ថបទ English ដែលអ្នកចង់បកប្រែ:', { parse_mode: 'Markdown' });
});

bot.action('translate_mode_kh_to_en', async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id.toString();
  await setUserState(userId, 'awaiting_translate_kh_to_en');
  await ctx.reply('🔡 *ខ្មែរ → English*\n\nសូមវាយ ឬ Paste អត្ថបទខ្មែរ ដែលអ្នកចង់បកប្រែ:', { parse_mode: 'Markdown' });
});

bot.action('translate_mode_auto', async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id.toString();
  await setUserState(userId, 'awaiting_translate');
  await ctx.reply('🔄 *Auto-detect Language*\n\nសូមវាយ ឬ Paste អត្ថបទ (English ឬ ខ្មែរ) ដែលអ្នកចង់បកប្រែ:', { parse_mode: 'Markdown' });
});

bot.action('translate_cancel', async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id.toString();
  await setUserState(userId, 'none');
  await ctx.reply('❌ បានបោះបង់ការបកប្រែ។');
});

// ── Translate Lesson Button Actions ──
bot.action(/translate_lesson_([^-]+)-([^-]+)-(.+)/, async (ctx) => {
  await ctx.answerCbQuery('🌍 កំពុងបកប្រែ...');
  const monthId = ctx.match[1];
  const weekId = ctx.match[2];
  const lessonId = ctx.match[3];
  const userId = ctx.from.id.toString();

  const isAdmin = SUPER_ADMIN_IDS.includes(userId);
  const isVIP = isAdmin || (await checkVIP(userId));

  const monthData = curriculum.months.find(m => m.id === monthId);
  const weekData = monthData?.weeks.find(w => w.id === weekId);
  const lessonData = weekData?.lessons.find(l => l.id === lessonId);
  if (!lessonData) return ctx.reply('❌ រកមិនឃើញមេរៀន!');

  // Show translate options for this lesson
  await ctx.reply(
    `🌍 *បកប្រែមេរៀន: ${lessonData.title}*\n\nសូមជ្រើសរើសទិសដៅបកប្រែ:`,
    {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.callback('🔤 EN → ខ្មែរ (Translate Lesson)', `tr_lesson_en_kh_${monthId}-${weekId}-${lessonId}`)],
        [Markup.button.callback('🔡 ខ្មែរ → EN (Key Terms)', `tr_lesson_kh_en_${monthId}-${weekId}-${lessonId}`)],
        [Markup.button.callback('🔙 ត្រឡប់ក្រោយ', 'back_to_months')]
      ]).reply_markup
    }
  );
});

bot.action(/tr_lesson_(en_kh|kh_en)_([^-]+)-([^-]+)-(.+)/, async (ctx) => {
  await ctx.answerCbQuery('⏳ កំពុងបកប្រែ...');
  const direction = ctx.match[1]; // 'en_kh' or 'kh_en'
  const monthId = ctx.match[2];
  const weekId = ctx.match[3];
  const lessonId = ctx.match[4];
  const userId = ctx.from.id.toString();

  const isAdmin = SUPER_ADMIN_IDS.includes(userId);
  const isVIP = isAdmin || (await checkVIP(userId));
  if (!isVIP && !isAdmin) {
    return ctx.reply(
      '🔒 *ការបកប្រែមេរៀនសម្រាប់ VIP ប៉ុណ្ណោះ!*\n\n💰 *3$/ខែ | 30$/ឆ្នាំ*',
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback('💎 Upgrade VIP', 'vip_upgrade')]
        ]).reply_markup
      }
    );
  }

  const monthData = curriculum.months.find(m => m.id === monthId);
  const weekData = monthData?.weeks.find(w => w.id === weekId);
  const lessonData = weekData?.lessons.find(l => l.id === lessonId);
  if (!lessonData) return ctx.reply('❌ រកមិនឃើញមេរៀន!');

  await ctx.reply('⏳ *AI (ស្តង់ដាជាតិ) កំពុងបកប្រែ... រង់ចាំបន្តិច...*', { parse_mode: 'Markdown' });
  ctx.sendChatAction('typing');

  try {
    const dirKey = direction === 'en_kh' ? 'en_to_kh' : 'kh_to_en';
    // Limit lesson content for translation (first 1000 chars)
    const textToTranslate = lessonData.content.substring(0, 1000);
    const result = await translateText(textToTranslate, dirKey);

    const { translated, fromLabel, toLabel } = result;
    const msgHeader = `🌍 *ការបកប្រែ (${fromLabel} → ${toLabel})*\n📚 *${lessonData.title}*\n\n`;
    const fullMsg = msgHeader + translated;

    // Cache EN text for TTS
    if (result.toLang === 'English') {
      userTranslationCache.set(userId, { enText: translated, khText: textToTranslate });
      setLatestResponse(userId, translated, 'sorn');
    } else {
      userTranslationCache.set(userId, { enText: textToTranslate, khText: translated });
      setLatestResponse(userId, translated, 'sorn');
    }

    const buttons = [];
    if (result.toLang === 'English') {
      buttons.push([Markup.button.callback('🔊 ស្តាប់ English (Native Voice)', `tts_en_${userId}`)]);
    } else {
      buttons.push([Markup.button.callback('🔊 ស្តាប់ខ្មែរ (Khmer Voice)', `tts_${userId}`)]);
    }
    buttons.push([Markup.button.callback('🔄 បកប្រែ​ ​ ​ម្ដងទៀត', `translate_lesson_${monthId}-${weekId}-${lessonId}`)]);
    buttons.push([Markup.button.callback('🔙 ត្រឡប់', 'back_to_months')]);

    const maxLen = 3900;
    if (fullMsg.length > maxLen) {
      await ctx.reply(fullMsg.substring(0, maxLen), { parse_mode: 'Markdown' });
      await ctx.reply(fullMsg.substring(maxLen), {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard(buttons).reply_markup
      });
    } else {
      await ctx.reply(fullMsg, {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard(buttons).reply_markup
      });
    }
  } catch (err) {
    console.error('[Translate Lesson Error]', err);
    ctx.reply('❌ មិនអាចបកប្រែបានទេពេលនេះ។ សូមព្យាយាមម្ដងទៀត!');
  }
});

// ── Translate Beginner Lesson Actions ──
bot.action(/translate_beginner_([^_]+)_(.+)/, async (ctx) => {
  await ctx.answerCbQuery('🌍 កំពុងបកប្រែ...');
  const weekId = ctx.match[1];
  const lessonId = ctx.match[2];
  const userId = ctx.from.id.toString();

  const allLessons = getAllBeginnerLessons();
  const item = allLessons.find(i => i.lesson.id === lessonId && i.weekId === weekId);
  if (!item) return ctx.reply('❌ រកមិនឃើញមេរៀន!');

  await ctx.reply(
    `🌍 *បកប្រែមេរៀន: ${item.lesson.title}*\n\nជ្រើសរើសទិសដៅ:`,
    {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.callback('🔤 EN → ខ្មែរ', `tr_beg_en_kh_${weekId}_${lessonId}`)],
        [Markup.button.callback('🔡 ខ្មែរ → EN', `tr_beg_kh_en_${weekId}_${lessonId}`)],
        [Markup.button.callback('🔙 ត្រឡប់', 'beginner_menu')]
      ]).reply_markup
    }
  );
});

bot.action(/tr_beg_(en_kh|kh_en)_([^_]+)_(.+)/, async (ctx) => {
  await ctx.answerCbQuery('⏳ កំពុងបកប្រែ...');
  const direction = ctx.match[1];
  const weekId = ctx.match[2];
  const lessonId = ctx.match[3];
  const userId = ctx.from.id.toString();

  const allLessons = getAllBeginnerLessons();
  const item = allLessons.find(i => i.lesson.id === lessonId && i.weekId === weekId);
  if (!item) return ctx.reply('❌ រកមិនឃើញមេរៀន!');

  await ctx.reply('⏳ *AI (ស្តង់ដាជាតិ) កំពុងបកប្រែ...*', { parse_mode: 'Markdown' });
  ctx.sendChatAction('typing');

  try {
    const dirKey = direction === 'en_kh' ? 'en_to_kh' : 'kh_to_en';
    const textToTranslate = item.lesson.content.substring(0, 1000);
    const result = await translateText(textToTranslate, dirKey);

    const { translated, fromLabel, toLabel } = result;
    const fullMsg = `🌍 *ការបកប្រែ (${fromLabel} → ${toLabel})*\n📚 *${item.lesson.title}*\n\n${translated}`;

    if (result.toLang === 'English') {
      setLatestResponse(userId, translated, 'sorn');
    } else {
      setLatestResponse(userId, translated, 'piseth');
    }

    const ttsBtn = result.toLang === 'English'
      ? Markup.button.callback('🔊 ស្តាប់ English', `tts_en_${userId}`)
      : Markup.button.callback('🔊 ស្តាប់ខ្មែរ', `tts_${userId}`);

    const maxLen = 3900;
    if (fullMsg.length > maxLen) {
      await ctx.reply(fullMsg.substring(0, maxLen), { parse_mode: 'Markdown' });
      await ctx.reply(fullMsg.substring(maxLen), {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([[ttsBtn], [Markup.button.callback('🔙 ត្រឡប់', 'beginner_menu')]]).reply_markup
      });
    } else {
      await ctx.reply(fullMsg, {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([[ttsBtn], [Markup.button.callback('🔙 ត្រឡប់', 'beginner_menu')]]).reply_markup
      });
    }
  } catch (err) {
    ctx.reply('❌ មិនអាចបកប្រែបានទេ! សូមព្យាយាមម្ដងទៀត!');
  }
});

// ── /translate command (VIP only for arbitrary text) ──
bot.command(['translate', 'tr'], async (ctx) => {
  const userId = ctx.from.id.toString();
  const isAdmin = SUPER_ADMIN_IDS.includes(userId);
  const isVIP = isAdmin || (await checkVIP(userId));

  const text = ctx.message.text.replace(/^\/(translate|tr)\s*/i, '').trim();
  
  if (!text) {
    await setUserState(userId, 'awaiting_translate');
    return ctx.reply(
      '🌍 *ប្រព័ន្ធបកប្រែ (Translation)*\n\nសូមវាយអត្ថបទបន្ទាប់ពី /translate:\n`/translate Good morning`\n`/translate សួស្តី`\n\nឬ ចុចប៊ូតុង 🌍 **បកប្រែ** នៅ menu ខាងក្រោម!',
      { parse_mode: 'Markdown' }
    );
  }

  if (!isVIP && !isAdmin) {
    return ctx.reply(
      '🔒 *ការបកប្រែអត្ថបទតាម Command សម្រាប់ VIP ប៉ុណ្ណោះ!*\n\n💡 Free users: ចុច 🌍 **បកប្រែ** ពី menu ខាងក្រោម (ចំពោះពាក្យ/ឃ្លាខ្លីៗ)\n\n💰 *3$/ខែ | 30$/ឆ្នាំ*',
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([[Markup.button.callback('💎 Upgrade VIP', 'vip_upgrade')]]).reply_markup
      }
    );
  }

  await ctx.reply('⏳ *AI (ស្តង់ដាជាតិ) កំពុងបកប្រែ...*', { parse_mode: 'Markdown' });
  ctx.sendChatAction('typing');

  try {
    const result = await translateText(text, 'auto');
    const { translated, fromLabel, toLabel } = result;
    const fullMsg = `🌍 *ការបកប្រែ (${fromLabel} → ${toLabel})*\n\n*ដើម:* ${text}\n\n*បកប្រែ:*\n${translated}`;

    if (result.toLang === 'English') {
      setLatestResponse(userId, translated, 'sorn');
    } else {
      setLatestResponse(userId, translated, 'sorn');
    }

    const buttons = [];
    if (result.toLang === 'English') {
      buttons.push([Markup.button.callback('🔊 ស្តាប់ English (Native)', `tts_en_${userId}`)]);
    }
    buttons.push([Markup.button.callback('🔊 ស្តាប់ (TTS)', `tts_${userId}`)]);
    buttons.push([Markup.button.callback('🌍 បកប្រែម្ដងទៀត', 'translate_mode_auto')]);

    await ctx.reply(fullMsg, {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard(buttons).reply_markup
    });
  } catch (err) {
    ctx.reply('❌ មិនអាចបកប្រែបានទេ! សូមព្យាយាមម្ដងទៀត!');
  }
});

bot.action(/continue_chat_(.+)/, async (ctx) => {
  const userId = ctx.match[1];
  if (ctx.from.id.toString() !== userId) return ctx.answerCbQuery("អ្នកមិនអាចចុចប៊ូតុងនេះបានទេ។");
  
  ctx.answerCbQuery();
  await ctx.reply("💬 សូមវាយបញ្ចូលសាររបស់អ្នក ឬផ្ញើជាសំឡេងមកកាន់ខ្ញុំ ដើម្បីបន្តការសន្ទនា!");
});

// Handling receipt photos
bot.on('photo', async (ctx) => {
  const userId = ctx.from.id.toString();
  const photo = ctx.message.photo[ctx.message.photo.length - 1]; // highest resolution
  const fileUniqueId = photo.file_unique_id;

  // Check if this specific photo was already submitted
  const snap = await db.ref(`receipts/${fileUniqueId}`).once('value');
  if (snap.exists()) {
    return ctx.reply("⚠️ វិក្កយបត្រនេះត្រូវបានផ្ញើម្ដងរួចមកហើយ! សូមកុំផ្ញើស្ទួន។");
  }

  // Save to prevent duplicate & track receipt details
  await db.ref(`receipts/${fileUniqueId}`).set({
    userId: userId,
    fileId: photo.file_id,
    fileUniqueId: fileUniqueId,
    timestamp: Date.now(),
    status: 'pending'
  });

  await ctx.reply("✅ វិក្កយបត្ររបស់អ្នកត្រូវបានបញ្ជូនទៅកាន់ Admin រួចរាល់! សូមរង់ចាំការពិនិត្យយល់ព្រមបន្តិចណា៎។");

  let studentDisplayName = [ctx.from.first_name, ctx.from.last_name].filter(Boolean).join(' ').trim() || ctx.from.username || `User ${userId}`;
  if (db) {
    try {
      const profSnap = await db.ref(`users/${userId}/profile`).once('value');
      const prof = profSnap.val() || {};
      if (prof.accountName && prof.accountName.trim()) {
        studentDisplayName = prof.accountName.trim();
      } else if (prof.khmerName && prof.khmerName.trim()) {
        studentDisplayName = prof.khmerName.trim();
      } else if (prof.name && prof.name.trim() && !prof.name.startsWith('User ') && prof.name !== 'Student') {
        studentDisplayName = prof.name.trim();
      }
    } catch (_) {}
  }

  const tgFull = [ctx.from.first_name, ctx.from.last_name].filter(Boolean).join(' ').trim();
  const caption = `🧾 **វិក្កយបត្រថ្មីពីសិស្ស!**
👤 ឈ្មោះ៖ ${studentDisplayName}${tgFull && tgFull !== studentDisplayName ? `\n✈️ Telegram: ${tgFull}` : ''}
🆔 ID៖ \`${userId}\`

តើអ្នកចង់អនុម័តប៉ុន្មានខែ?`;

  const keyboard = Markup.inlineKeyboard([
    [
      Markup.button.callback("✅ 1 ខែ (3$)", `approve_1_${userId}`),
      Markup.button.callback("✅ 12 ខែ (30$)", `approve_12_${userId}`)
    ],
    [Markup.button.callback("❌ បដិសេធ (Reject)", `reject_${userId}`)]
  ]);

  for (const adminId of SUPER_ADMIN_IDS) {
    try {
      await bot.telegram.sendPhoto(adminId, photo.file_id, {
        caption: caption,
        parse_mode: 'Markdown',
        reply_markup: keyboard.reply_markup
      });
    } catch (error) {
      console.warn(`Could not forward receipt to admin ${adminId}:`, error.message);
    }
  }
});

// Admin Approve Action
bot.action(/approve_(\d+)_(\d+)/, async (ctx) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.answerCbQuery("⛔ អ្នកគ្មានសិទ្ធិទេ។", { show_alert: true });

  const months = parseInt(ctx.match[1]);
  const targetId = ctx.match[2];

  // Fetch existing sub
  const subSnap = await db.ref(`users/${targetId}/subscription`).once('value');
  const currentSub = subSnap.val();
  const additionalTime = months * 30 * 24 * 60 * 60 * 1000;
  let newExpiresAt = Date.now() + additionalTime;

  if (currentSub && currentSub.expiresAt && currentSub.expiresAt > Date.now()) {
    newExpiresAt = currentSub.expiresAt + additionalTime;
  }

  await db.ref(`users/${targetId}/subscription`).update({
    status: 'paid',
    expiresAt: newExpiresAt,
    lastUpdated: Date.now()
  });

  await db.ref('payments_log').push({
    userId: targetId,
    adminId: adminId,
    monthsAdded: months,
    timestamp: Date.now()
  });

  const expireDate = new Date(newExpiresAt).toLocaleString('en-GB', { timeZone: 'Asia/Phnom_Penh' });

  // Update Admin's Message
  await ctx.editMessageCaption(`✅ **បានអនុម័ត (Approved)!**
👤 សិស្ស ID: \`${targetId}\`
📅 ទទួលបាន: ${months} ខែ
⌛ ផុតកំណត់: ${expireDate}
👨‍💼 អនុម័តដោយ Admin ID: ${adminId}`, { parse_mode: 'Markdown' });

  // Notify User
  try {
    await bot.telegram.sendMessage(targetId, `🎉 អបអរសាទរ! វិក្កយបត្ររបស់អ្នកត្រូវបាន **អនុម័ត (Approved)** ដោយ Admin។\nអ្នកទទួលបាន **${months} ខែ** បន្ថែម។\nឥឡូវនេះអ្នកអាចប្រើប្រាស់មុខងារសួរគ្រូ AI បានហើយរហូតដល់ថ្ងៃទី **${expireDate}**!`, { parse_mode: 'Markdown' });
  } catch (e) {
    console.log("Could not notify user:", e.message);
  }
});

// Admin Reject Action
bot.action(/reject_(\d+)/, async (ctx) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.answerCbQuery("⛔ អ្នកគ្មានសិទ្ធិទេ។", { show_alert: true });

  const targetId = ctx.match[1];

  await ctx.editMessageCaption(`❌ **បានបដិសេធ (Rejected)**
👤 សិស្ស ID: \`${targetId}\`
👨‍💼 បដិសេធដោយ Admin ID: ${adminId}`, { parse_mode: 'Markdown' });

  try {
    await bot.telegram.sendMessage(targetId, `❌ សុំទោស! វិក្កយបត្របង់ប្រាក់របស់អ្នកត្រូវបាន **បដិសេធ (Rejected)** ដោយ Admin។\nសូមពិនិត្យមើលឡើងវិញ ឬទាក់ទងមក Admin ផ្ទាល់។`, { parse_mode: 'Markdown' });
  } catch (e) {
    console.log("Could not notify user:", e.message);
  }
});

// Express Middleware for Web App and Web API
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount Web API Router
const webApiRouter = createWebAPIRouter({
  db,
  auth,
  curriculum,
  bot,
  SUPER_ADMIN_IDS,
  checkVIP,
  checkYearlyVIP,
  getNextGroqKey,
  getNextGeminiKey
});
app.use('/api', webApiRouter);

// Serve static frontend files (Single Page Application for Chrome & Telegram WebApp)
app.use(express.static(path.join(__dirname, 'public'), {
  etag: false,
  maxAge: 0,
  setHeaders: (res) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
  }
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Public Web Certificate Viewer Endpoint (for anyone scanning QR code with phone camera)
app.get(['/cert/:certId', '/verify/:certId'], async (req, res) => {
  const certId = (req.params.certId || '').replace(/^CERT-/i, '').trim().toUpperCase();
  if (!certId) {
    return res.status(400).send('Invalid Certificate ID');
  }

  if (!db) {
    return res.status(500).send('Database not connected. Please try again later.');
  }

  try {
    const snapshot = await db.ref(`certificates/${certId}`).once('value');
    const cert = snapshot.val();

    if (!cert) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html lang="km">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Certificate Not Found - Teacher SSOnline</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Moul&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Battambang', sans-serif; background: #0f172a; color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
            .box { background: #1e293b; padding: 40px; border-radius: 16px; max-width: 500px; text-align: center; border: 1px solid #334155; box-shadow: 0 10px 25px rgba(0,0,0,0.4); }
            h1 { font-family: 'Moul', cursive; color: #ef4444; font-size: 22px; margin-bottom: 15px; }
            p { font-size: 15px; line-height: 1.6; color: #cbd5e1; }
            .code { background: #0f172a; padding: 6px 14px; border-radius: 6px; font-family: monospace; font-size: 18px; color: #fbbf24; margin: 15px 0; display: inline-block; }
            .btn { display: inline-block; background: #2563eb; color: #fff; text-decoration: none; padding: 10px 24px; border-radius: 8px; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="box">
            <h1>❌ រកមិនឃើញវិញ្ញាបនបត្រ</h1>
            <div class="code">CERT-${certId}</div>
            <p>លេខកូដវិញ្ញាបនបត្រនេះមិនមាននៅក្នុងប្រព័ន្ធទិន្នន័យរបស់ <strong>វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline</strong> ឡើយ។</p>
            <p style="font-size: 13px; color: #94a3b8; margin-top: 10px;">សូមពិនិត្យមើលលេខកូដសម្គាល់ ឬស្កេន QR Code ឡើងវិញ។</p>
            <a href="https://t.me/${process.env.TELEGRAM_BOT_USERNAME || 'StudyAiEngKH_bot'}" class="btn">🤖 ចូលទៅកាន់ Telegram Bot</a>
          </div>
        </body>
        </html>
      `);
    }

    const html = await generateCertificateHTML(cert);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) {
    console.error("Web certificate error:", err);
    res.status(500).send('Internal Server Error while generating certificate');
  }
});

app.listen(PORT, () => {
  console.log(`Bot running on port ${PORT}`);
});

bot.command('verbs', (ctx) => {
  ctx.reply("📚 **តារាងកិរិយាសព្ទប្រែប្រួល (Irregular Verbs)**\n\nសូមជ្រើសរើសក្រុមអក្សរខាងក្រោម៖", 
    Markup.inlineKeyboard([
      [Markup.button.callback('A - C', 'verbs_A_C'), Markup.button.callback('D - F', 'verbs_D_F')],
      [Markup.button.callback('G - L', 'verbs_G_L'), Markup.button.callback('M - R', 'verbs_M_R')],
      [Markup.button.callback('S - W', 'verbs_S_W')]
    ])
  );
});

bot.action(/verbs_(.+)/, (ctx) => {
  const group = ctx.match[1];
  
  if (group === 'menu') {
    return ctx.editMessageText("📚 **តារាងកិរិយាសព្ទប្រែប្រួល (Irregular Verbs)**\n\nសូមជ្រើសរើសក្រុមអក្សរខាងក្រោម៖", 
      Markup.inlineKeyboard([
        [Markup.button.callback('A - C', 'verbs_A_C'), Markup.button.callback('D - F', 'verbs_D_F')],
        [Markup.button.callback('G - L', 'verbs_G_L'), Markup.button.callback('M - R', 'verbs_M_R')],
        [Markup.button.callback('S - W', 'verbs_S_W')]
      ])
    );
  }

  const list = irregularVerbs[group];
  if (!list) return ctx.answerCbQuery("រកមិនឃើញទិន្នន័យ");
  
  let text = `\`\`\`text\n`;
  text += `V1        | V2        | V3        | ប្រែថា\n`;
  text += `------------------------------------------\n`;
  list.forEach(v => {
    const v1 = v.v1.padEnd(10, ' ');
    const v2 = v.v2.padEnd(10, ' ');
    const v3 = v.v3.padEnd(10, ' ');
    text += `${v1}| ${v2}| ${v3}| ${v.kh}\n`;
  });
  text += `\`\`\``;
  
  ctx.editMessageText(`📚 **កិរិយាសព្ទក្រុម ${group.replace('_', ' - ')}**\n\n${text}`, { 
    parse_mode: 'Markdown',
    reply_markup: Markup.inlineKeyboard([
      [Markup.button.callback('🔙 ត្រឡប់ក្រោយ (Back)', 'verbs_menu')]
    ]).reply_markup
  });
});

// ==========================================
// TELEGRAM BOT WEB APP & SYNC CODE COMMANDS
// ==========================================

const WEBAPP_DEFAULT_URL = process.env.WEBAPP_URL || process.env.RENDER_EXTERNAL_URL || 'https://studyai-bot-wmha.onrender.com/';

// Open Web App Command
bot.command(['app', 'webapp', 'web', 'online', 'miniweb', 'miniapp'], async (ctx) => {
  const webUrl = defaultWebUrl || WEBAPP_DEFAULT_URL;
  if (ctx.chat?.type === 'private') {
    ctx.setChatMenuButton({
      type: 'web_app',
      text: '🌐 Mini Web',
      web_app: { url: webUrl }
    }).catch(() => {});
  }
  return ctx.reply(
    `🌐 *វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline (Mini Web App)* 🌐\n\n` +
    `លោកអ្នកអាចចុចប៊ូតុង *«🌐 Mini Web»* នៅខាងឆ្វេងដៃកន្លែងសរសេរឆាត (Chat Input) ឬចុចប៊ូតុងខាងក្រោមដើម្បីបើកប្រព័ន្ធសិក្សាភ្លាមៗ!\n\n` +
    `✨ *មុខងារពិសេសៗលើ Web App៖*\n` +
    `• មើលមេរៀន និងស្តាប់សំឡេងអានមេរៀនច្បាស់ល្អ 🔊\n` +
    `• ឆាតសួរគ្រូ AI (Teacher Sorn) ផ្ទាល់ 🤖\n` +
    `• ធ្វើតេស្ត Quiz ប្រឡងយកវិញ្ញាបនបត្រ A4 ផ្តេក 📜\n` +
    `• ស្វែងរកកិរិយាសព្ទប្រែប្រួល និងដំឡើង VIP 💎`,
    {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.webApp('🌐 បើក Web App (Study Online)', webUrl)],
        [Markup.button.callback('🔗 យកកូដភ្ជាប់ Web App (Sync Code)', 'get_sync_code')]
      ]).reply_markup
    }
  );
});



