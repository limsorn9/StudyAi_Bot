require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const { initializeApp, cert, applicationDefault } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Groq = require('groq-sdk');
const OpenAI = require('openai');
const express = require('express');
const fs = require('fs');
const irregularVerbs = require('./irregular_verbs.js');
const { generateQuiz } = require('./quiz_generator.js');
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


// In-memory quiz state: { userId: { questions, currentQ, score, lessonId, answers } }
const quizState = {};

// Load Curriculum Data
const curriculum = JSON.parse(fs.readFileSync('./curriculum.json', 'utf8'));

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
const db = getDatabase(appInstance);

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

try {
  if (bot) {
    app.use(bot.webhookCallback('/webhook'));
    bot.telegram.setWebhook(`${process.env.WebHook_URL}/webhook`).catch(e => {
      console.error("❌ ERROR: Webhook Failed (តើ WebHook_URL ត្រឹមត្រូវទេ?):", e.message);
    });

    // Set Telegram Menu Commands
    bot.telegram.setMyCommands([
      { command: 'start', description: '📚 ចាប់ផ្តើមរៀន (Start Learning)' },
      { command: 'verbs', description: '📝 កិរិយាសព្ទប្រែប្រួល (Irregular Verbs)' },
      { command: 'scores', description: '📊 ពិន្ទុប្រឡងរបស់ខ្ញុំ (My Quiz Scores)' },
      { command: 'history', description: '🕰️ ប្រវត្តិមេរៀន (Learning History)' },
      { command: 'help', description: '❓ ជំនួយ (Help)' }
    ]);
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
const SUPER_ADMIN_IDS = [...new Set([...envAdmins, "240224709"])]; // Include user's ID by default

const checkVIP = async (userId) => {
  if (SUPER_ADMIN_IDS.includes(userId.toString())) return true;
  const snap = await db.ref(`users/${userId}/subscription/expiresAt`).once('value');
  const expiresAt = snap.val();
  if (expiresAt && expiresAt > Date.now()) return true;
  return false;
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


const generateAndSendTTS = async (ctx, text) => {
  if (!text) return;
  try {
    ctx.sendChatAction('record_voice');
    // Clean text to avoid TTS reading emojis heavily and markdown symbols
    let cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
    cleanText = cleanText.replace(/[*_#]/g, ''); 
    
    const { MsEdgeTTS, OUTPUT_FORMAT } = require("msedge-tts");
    const edgeTts = new MsEdgeTTS();
    await edgeTts.setMetadata("km-KH-SreymomNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    
    const { audioStream } = edgeTts.toStream(cleanText.substring(0, 4000));
    const chunks = [];
    
    await new Promise((resolve, reject) => {
      audioStream.on('data', (chunk) => chunks.push(chunk));
      audioStream.on('end', resolve);
      audioStream.on('error', reject);
    });

    const buffer = Buffer.concat(chunks);
    await ctx.replyWithVoice({ source: buffer });
  } catch (error) {
    console.error("Auto TTS Error:", error);
  }
};

// Persistent Reply Keyboard Menu
const mainMenuKeyboard = Markup.keyboard([
  ['📚 បញ្ជីមេរៀន (Lessons)', '🕰️ ប្រវត្តិសិក្សា'],
  ['💎 គណនី VIP (Upgrade)', '❓ ជំនួយ (Help)']
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

// Apply Group Admin Guard as global middleware (runs before every command/message)
bot.use(groupAdminGuard);

// Start Command & Curriculum Menu
bot.start(async (ctx) => {
  const userId = ctx.from.id;
  const username = ctx.from.first_name || 'Student';

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

  await db.ref(`users/${userId}/profile`).update({
    name: username,
    registeredAt: Date.now()
  });

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

**តម្លៃពិសេស៖**
👉 1 ខែ = 3$
👉 1 ឆ្នាំ = 30$

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

// Generate Keyboard for 12 Months
function getMonthsKeyboard() {
  const buttons = curriculum.months.map(m => Markup.button.callback(m.title.split('៖')[0], `month_${m.id}`));
  // Chunk buttons into rows of 3
  const rows = [];
  for(let i=0; i<buttons.length; i+=3) {
    rows.push(buttons.slice(i, i+3));
  }
  return Markup.inlineKeyboard(rows);
}

// Handle Month Selection
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
  await ctx.editMessageText("សូមជ្រើសរើសខែដែលអ្នកចង់រៀន៖", getMonthsKeyboard());
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

  await setUserState(userId, `learning_${monthId}_${weekId}_${lessonId}`);

  // Store the lesson text for TTS
  await db.ref(`users/${userId}/latestResponse`).set(lessonData.content);

  // Record History
  await db.ref(`users/${userId}/history/${monthId}_${weekId}_${lessonId}`).set({
    title: `${monthData.title} > ${weekData.title} > ${lessonData.title}`,
    timestamp: Date.now()
  });

  const isVIP = await checkVIP(userId);
  const lessonKey = `${monthId}-${weekId}-${lessonId}`;
  const compSnap = await db.ref(`users/${userId}/completed_lessons/${lessonKey}`).once('value');
  const isCompleted = !!compSnap.val();

  const keyboardRows = [
    [Markup.button.callback(isVIP ? '🔊 អានជាសំឡេង (Listen)' : '🔒 🔊 អានជាសំឡេង (VIP)', `tts_${userId}`)],
    [Markup.button.callback(isVIP ? '📝 ប្រឡងបញ្ចប់មេរៀន (Quiz)' : '🔒 📝 ប្រឡងបញ្ចប់មេរៀន (VIP)', `quiz_start_${monthId}-${weekId}-${lessonId}`)]
  ];

  if (isCompleted) {
    keyboardRows.push([Markup.button.callback('➡️ ទៅមេរៀនបន្ទាប់', `next_lesson_${monthId}-${weekId}-${lessonId}`)]);
  }
  keyboardRows.push([Markup.button.callback('🔙 ត្រឡប់ទៅបញ្ជីមេរៀន', `week_${monthId}-${weekId}`)]);

  await ctx.reply(lessonData.content, Markup.inlineKeyboard(keyboardRows));

  if (isVIP) {
    const topicName = lessonData.title.includes(':') ? lessonData.title.split(':')[1].trim() : lessonData.title;
    await ctx.reply(`💬 គ្រូ AI ជំនាញផ្នែក "${topicName}" នៅទីនេះហើយ! បើមានចម្ងល់សូមឆាតសួរ។`);
  } else {
    await ctx.reply(
      `💡 *អ្នកកំពុងប្រើប្រាស់គណនី Free*\n` +
      `• អាចអានមេរៀនបានធម្មតា ✅\n` +
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

  const buttons = weekData.lessons.map(l => {
    const key = `${monthId}-${weekId}-${l.id}`;
    const comp = completedMap[key];
    const prefix = comp ? '✅ ' : '';
    const suffix = comp ? ` (ជាប់ ថ្នាក់ ${comp.grade})` : '';
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
        [Markup.button.callback('🔙 ត្រឡប់ទៅបញ្ជីមេរៀន', `week_${monthId}-${weekId}`)]
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
    return ctx.reply(
      `🏆 *អបអរសាទរយ៉ាងក្រៃលែង!* 🎉\n\n` +
      `អ្នកបានរៀន និងប្រឡងបញ្ចប់គ្រប់មេរៀនទាំងអស់ក្នុងកម្មវិធីសិក្សាហើយ! 👏🌟\n` +
      `អ្នកពិតជាមានការតស៊ូ និងឆ្នើមណាស់!`,
      { parse_mode: 'Markdown' }
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

  const questionText = (
    `🎯 *ការប្រឡងបញ្ចប់មេរៀន (MCQ Quiz)*\n` +
    `📚 *${state.lessonTitle}*\n` +
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
      `• ប្រឡង Quiz MCQ ១០ សំណួរ\n` +
      `• អាចកែប្រែ និងទៅមុខថយក្រោយមុន Submit\n` +
      `• ទទួលបានបណ្ណសរសើរផ្លូវការ (Certificate)\n` +
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
    lessonId
  };

  await ctx.reply(
    `🎯 *ការប្រឡងបញ្ចប់មេរៀន*\n` +
    `📚 *${lessonData.title}*\n\n` +
    `ខ្ញុំបានរៀបចំ *${questions.length} សំណួរ* (MCQ)!\n\n` +
    `💡 *ការណែនាំ៖*\n` +
    `• ចុចរើសចម្លើយ A, B, C, ឬ D\n` +
    `• អាចចុច *⬅️ សំណួរមុន* ឬ *សំណួរបន្ទាប់ ➡️* ដើម្បីកែប្រែចម្លើយបាន\n` +
    `• នៅពេលរួចរាល់ ចុច *"📤 បញ្ជូនចម្លើយ"* ដើម្បីមើលពិន្ទុ និងបណ្ណសរសើរ!\n\n` +
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
  let resultMsg = (
    `🎯 *លទ្ធផលការប្រឡងបញ្ចប់មេរៀន*\n` +
    `📚 *${state.lessonTitle}*\n` +
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
      await db.ref(`users/${userId}/quiz_results/${state.lessonId}_${Date.now()}`).set({
        lessonTitle: state.lessonTitle,
        lessonId: state.lessonId,
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
      `🎯 *លទ្ធផលការប្រឡងបញ្ចប់មេរៀន*\n` +
      `📚 *${state.lessonTitle}*\n` +
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
    // 1. Mark lesson completed in Firebase
    if (db) {
      await db.ref(`users/${userId}/completed_lessons/${state.lessonId}`).set({
        lessonId: state.lessonId,
        lessonTitle: state.lessonTitle,
        monthId: state.monthId,
        weekId: state.weekId,
        grade,
        score,
        total,
        percent,
        completedAt: Date.now()
      });
    }

    const studentName = [ctx.from.first_name, ctx.from.last_name].filter(Boolean).join(' ') || `សិស្ស ID ${userId}`;
    const certId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const dateStr = new Date().toLocaleDateString('km-KH');

    const certData = {
      studentName,
      userId,
      lessonTitle: state.lessonTitle,
      grade,
      score,
      total,
      percent,
      dateStr,
      certId
    };

    // 2. Send Telegram Certificate Card
    const certCard = generateCertificateCard(certData);
    await ctx.reply(certCard, { parse_mode: 'Markdown' });

    // 3. Send Printable HTML Certificate File
    try {
      const certHtml = generateCertificateHTML(certData);
      const safeFilename = `Certificate_${state.lessonId}.html`;
      await ctx.replyWithDocument(
        { source: Buffer.from(certHtml, 'utf-8'), filename: safeFilename },
        {
          caption: `🎓 *បណ្ណសរសើរផ្លូវការ (Certificate of Achievement)*\n` +
                   `លោកគ្រូបានរៀបចំបណ្ណសរសើរយ៉ាងស្រស់ស្អាតជូនអ្នក! ចុចទាញយកដើម្បីបើកមើលលើទូរសព្ទ/កុំព្យូទ័រ ឬ Save ជា PDF!`,
          parse_mode: 'Markdown'
        }
      );
    } catch (e) {
      console.error("Certificate document send error:", e);
    }

    // 4. Navigation Buttons after Success
    await ctx.reply(
      `🌟 *អបអរសាទរ! អ្នកបានបញ្ចប់មេរៀននេះដោយជោគជ័យ!* 🌟\n\n` +
      `តើអ្នកចង់បន្តទៅមេរៀនបន្ទាប់ ឬយ៉ាងណា?`,
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback('➡️ ទៅមេរៀនបន្ទាប់', `next_lesson_${state.lessonId}`)],
          [Markup.button.callback('📖 រៀនមេរៀននេះម្តងទៀត', `relearn_${state.lessonId}`)],
          [Markup.button.callback('🔙 ត្រឡប់ទៅបញ្ជីមេរៀន', `week_${state.monthId}-${state.weekId}`)]
        ]).reply_markup
      }
    );
  } else {
    // FAILED (Grade D or F)
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

  delete quizState[userId];
}

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

async function handleUserMessage(ctx, userId, userText) {
  const isVIP = await checkVIP(userId);
  if (!isVIP) {
    return ctx.reply("🔒 **គណនីរបស់អ្នកមិនទាន់បានបង់ប្រាក់ទេ (Free Account)**\nអ្នកអាចត្រឹមតែអានមេរៀនដែលមានស្រាប់ប៉ុណ្ណោះ។ ដើម្បីសួរគ្រូ AI និងធ្វើតេស្ត សូមដំឡើងទៅគណនី VIP (Upgrade)។\n\nសូមចុចប៊ូតុង **💎 គណនី VIP (Upgrade)** ខាងក្រោមនេះ។", { parse_mode: 'Markdown' });
  }

  const state = await getUserState(userId);
  const aiType = 'groq'; // Force Groq for text conversation (Gemini is still used for STT Voice-to-Text)

  const waitMsg = await ctx.reply("⏳ គ្រូសនកំពុងគិត និងរៀបចំការឆ្លើយតប សូមរង់ចាំបន្តិចណា៎...");
  ctx.sendChatAction('typing');

  let systemPrompt = "You are a friendly, highly skilled English teacher for Cambodian students. Your name is Teacher Sorn (គ្រូសន). You speak both English and Khmer perfectly. Always encourage the student and refer to yourself as 'គ្រូសន' (Teacher Sorn) in Khmer conversations. Answer questions clearly using Khmer for explanations and English for examples.";
  
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
    if (aiType === 'gemini') {
      let lastError = null;
      const geminiModels = ["gemini-3.8-flash", "gemini-3.5-flash-lite", "gemini-omni-1.1-flash", "gemma-4-31b-it"];
      let success = false;
      
      for (const modelName of geminiModels) {
        for (let i = 0; i < (geminiKeys.length || 1); i++) {
          try {
            const apiKey = getNextGeminiKey();
            if (!apiKey) throw new Error("No GEMINI_API_KEYS configured in environment");
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: modelName });
            const prompt = `${systemPrompt}\n\n[Past Conversation]\n${pastContextText}\n\nStudent: ${userText}\nTeacher:`;
            const result = await model.generateContent(prompt);
            aiResponse = result.response.text();
            lastError = null;
            success = true;
            break; // Break key loop
          } catch (error) {
            lastError = error;
            console.warn(`Gemini (${modelName}) key failed: ${error.message}. Retrying...`);
          }
        }
        if (success) break; // Break model loop
      }
      if (lastError && !success) throw lastError;
    } else if (aiType === 'groq') {
      let lastError = null;
      let success = false;
      for (let i = 0; i < (groqKeys.length || 1); i++) {
        try {
          const apiKey = getNextGroqKey();
          if (!apiKey) throw new Error("No GROQ_API_KEYS configured in environment");
          const groq = new Groq({ apiKey: apiKey });
          const chatCompletion = await groq.chat.completions.create({
            messages: groqMessages,
            model: 'openai/gpt-oss-120b',
            temperature: 0.7,
          });
          aiResponse = chatCompletion.choices[0]?.message?.content || "No response";
          lastError = null;
          success = true;
          break; // Break loop on success
        } catch (error) {
          lastError = error;
          console.warn(`Groq key failed: ${error.message}. Retrying...`);
        }
      }
      if (lastError && !success) throw lastError;
    }

    await saveHistory(userId, 'user', userText); // Saved after fetching history
    await saveHistory(userId, 'ai', aiResponse);
    await db.ref(`users/${userId}/latestResponse`).set(aiResponse);
    
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

// AI Chat Handling
bot.on('text', async (ctx) => {
  const userId = ctx.from.id.toString();
  const userText = ctx.message.text ? ctx.message.text.trim() : '';

  // Ignore persistent menu clicks
  const menuOptions = [
    '📚 បញ្ជីមេរៀន (Lessons)',
    '🔄 ប្តូរគ្រូ AI',
    '🕰️ ប្រវត្តិសិក្សា',
    '❓ ជំនួយ (Help)',
    '💎 គណនី VIP (Upgrade)'
  ];
  if (menuOptions.includes(userText)) return;

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

// Voice Message Handling (STT)
bot.on('voice', async (ctx) => {
  const userId = ctx.from.id.toString();
  const isVIP = await checkVIP(userId);
  if (!isVIP) {
    return ctx.reply("🔒 **គណនីរបស់អ្នកមិនទាន់បានបង់ប្រាក់ទេ (Free Account)**\nអ្នកមិនអាចផ្ញើសារជាសំឡេងបានទេ។ សូមដំឡើងទៅគណនី VIP (Upgrade) ដើម្បីប្រើប្រាស់មុខងារនេះ។", { parse_mode: 'Markdown' });
  }

  const waitMsg = await ctx.reply("⏳ គ្រូសនកំពុងស្តាប់សំឡេង សូមរង់ចាំបន្តិចណា៎...");
  ctx.sendChatAction('typing');

  try {
    const fileId = ctx.message.voice.file_id;
    const fileLink = await ctx.telegram.getFileLink(fileId);
    
    const axios = require('axios');
    const FormData = require('form-data');
    
    const response = await axios({
      method: 'GET',
      url: fileLink.href,
      responseType: 'stream'
    });


    const fs = require('fs');
    const tempAudioPath = `temp_audio_${userId}.ogg`;
    const writer = fs.createWriteStream(tempAudioPath);
    response.data.pipe(writer);
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
    
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const { GoogleAIFileManager } = require("@google/generative-ai/server");
    
    let userText = "";
    let lastError = null;
    let success = false;
    const geminiModels = ["gemini-3.8-flash", "gemini-3.5-flash-lite", "gemini-omni-1.1-flash", "gemma-4-31b-it"];
    
    for (const modelName of geminiModels) {
      for (let i = 0; i < (geminiKeys.length || 1); i++) {
        try {
          const apiKey = getNextGeminiKey();
          if (!apiKey) throw new Error("No GEMINI_API_KEYS configured in environment");
          const genAI = new GoogleGenerativeAI(apiKey);
          const fileManager = new GoogleAIFileManager(apiKey);
          const model = genAI.getGenerativeModel({ model: modelName });
          
          // Upload audio file using File API
          const uploadResult = await fileManager.uploadFile(tempAudioPath, {
            mimeType: "audio/ogg",
            displayName: `Voice_${userId}`,
          });
          
          const promptText = "Please transcribe this audio exactly as it is spoken. If it is in Khmer, transcribe it in Khmer. Do not translate. Output ONLY the transcribed text.";
          const result = await model.generateContent([
            promptText,
            {
              fileData: {
                fileUri: uploadResult.file.uri,
                mimeType: uploadResult.file.mimeType
              }
            }
          ]);
          
          userText = result.response.text().trim();
          
          // Clean up Gemini Server File
          try {
            await fileManager.deleteFile(uploadResult.file.name);
          } catch (cleanupError) {
            console.warn("Failed to delete Gemini file:", cleanupError);
          }
          
          lastError = null;
          success = true;
          break; // Success
        } catch (error) {
          lastError = error;
          console.warn(`Gemini STT (${modelName}) key failed: ${error.message}. Retrying...`);
        }
      }
      if (success) break;
    }
    
    // Clean up local file
    if (fs.existsSync(tempAudioPath)) fs.unlinkSync(tempAudioPath);
    
    if (lastError && !success) throw lastError;
    
    if (!userText) {
      try { await ctx.telegram.deleteMessage(ctx.chat.id, waitMsg.message_id); } catch(e){}
      return ctx.reply("❌ មិនអាចស្តាប់សំឡេងបានច្បាស់ទេ។ សូមនិយាយម្តងទៀត!");
    }
    
    try { await ctx.telegram.deleteMessage(ctx.chat.id, waitMsg.message_id); } catch(e){}
    await ctx.reply(`🎙 ខ្ញុំស្តាប់បានថា៖\n_"${userText}"_`, { parse_mode: 'Markdown' });
    
    // Process text
    await handleUserMessage(ctx, userId, userText);
  } catch (error) {
    try { await ctx.telegram.deleteMessage(ctx.chat.id, waitMsg.message_id); } catch(e){}
    console.error("STT Error:", error);
    ctx.reply("❌ មានបញ្ហាក្នុងការស្តាប់សំឡេង! សូមព្យាយាមម្តងទៀត។");
  }
});

// TTS Generation Action (Using Edge TTS)
bot.action(/tts_(.+)/, async (ctx) => {
  const userId = ctx.match[1];
  if (ctx.from.id.toString() !== userId) return ctx.answerCbQuery("អ្នកមិនអាចស្តាប់សម្លេងនេះបានទេ។");

  const isVIP = await checkVIP(userId);

  // 💎 VIP Gate - Free account cannot use TTS
  if (!isVIP) {
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

  // ⏱️ Rate limit check (VIP only gets here)
  const limitCheck = checkTTSLimit(userId, isVIP);
  if (!limitCheck.allowed) {
    await ctx.answerCbQuery('⛔ ប្រើប្រាស់ច្រើន!');
    return ctx.reply(limitCheck.message, { parse_mode: 'Markdown' });
  }

  ctx.answerCbQuery("កំពុងបង្កើតសម្លេង...");
  ctx.sendChatAction('record_voice');
  recordTTSStart(userId);

  try {
    const snap = await db.ref(`users/${userId}/latestResponse`).once('value');
    let text = snap.val();

    if (!text) {
      return ctx.reply("រកមិនឃើញអត្ថបទដើម្បីអានទេ។");
    }

    // Clean text to avoid TTS reading emojis heavily
    text = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

    const { MsEdgeTTS, OUTPUT_FORMAT } = require("msedge-tts");
    const edgeTts = new MsEdgeTTS();
    await edgeTts.setMetadata("km-KH-SreymomNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    
    // Generate Audio Stream
    const { audioStream } = edgeTts.toStream(text.substring(0, 4000));
    const chunks = [];
    
    await new Promise((resolve, reject) => {
      audioStream.on('data', (chunk) => chunks.push(chunk));
      audioStream.on('end', resolve);
      audioStream.on('error', reject);
    });

    const buffer = Buffer.concat(chunks);
    await ctx.replyWithVoice({ source: buffer });

    // Show remaining TTS count warning for free users
    if (!isVIP) {
      const stats = getTTSStats(userId, false);
      if (stats.remaining <= 3 && stats.remaining > 0) {
        await ctx.reply(`📊 *សល់ TTS: ${stats.remaining}/${stats.limit} ដង* ថ្ងៃនេះ (Free)\n💎 Upgrade VIP ដើម្បីទទួលបាន 50 ដង/ថ្ងៃ!`, { parse_mode: 'Markdown' });
      }
    }
  } catch (error) {
    console.error("TTS Error:", error);
    ctx.reply("មិនអាចបង្កើតសម្លេងបានទេពេលនេះ។");
  } finally {
    recordTTSDone();
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

  // Save to prevent duplicate
  await db.ref(`receipts/${fileUniqueId}`).set({
    userId: userId,
    timestamp: Date.now()
  });

  await ctx.reply("✅ វិក្កយបត្ររបស់អ្នកត្រូវបានបញ្ជូនទៅកាន់ Admin រួចរាល់! សូមរង់ចាំការពិនិត្យយល់ព្រមបន្តិចណា៎។");

  const caption = `🧾 **វិក្កយបត្រថ្មីពីសិស្ស!**
👤 ឈ្មោះ៖ ${ctx.from.first_name || 'No Name'}
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

app.get('/', (req, res) => res.send('StudyAi Curriculum Bot is running!'));

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
