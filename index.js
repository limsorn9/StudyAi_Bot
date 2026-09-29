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



bot.hears('💎 គណនី VIP (Upgrade)', (ctx) => {
  const userId = ctx.from.id;
  const msg = `💎 **គណនី VIP (Upgrade)** 💎

បង់ប្រាក់ដើម្បីទទួលបានសិទ្ធិពិសេស៖
✅ សួរគ្រូ AI បានដោយសេរី (គ្មានដែនកំណត់)
✅ អាចផ្ញើជាសំឡេងឲ្យគ្រូ AI ស្តាប់ និងកែតម្រូវ
✅ ធ្វើតេស្តប្រឡងយកពិន្ទុ

**តម្លៃពិសេស៖**
👉 1 ខែ = 3$
👉 1 ឆ្នាំ = 30$

🏦 **ព័ត៌មានបង់ប្រាក់ (ACLEDA Bank / KHQR):**
ឈ្មោះគណនី៖ **LIM SORN**
*(អ្នកអាចស្កេន KHQR ខាងលើ ឬខាងក្រោមដើម្បីបង់ប្រាក់)*

📲 បន្ទាប់ពីបង់ប្រាក់រួច សូមផ្ញើវិក្កយបត្រ (Screenshot) មកកាន់ Admin៖ @limsorn9
រួចប្រាប់លេខ ID របស់អ្នកគឺ៖ \`${userId}\``;
  if (fs.existsSync('./khqr.jpg')) {
    ctx.replyWithPhoto({ source: './khqr.jpg' }, { caption: msg, parse_mode: 'Markdown' });
  } else if (fs.existsSync('./khqr.png')) {
    ctx.replyWithPhoto({ source: './khqr.png' }, { caption: msg, parse_mode: 'Markdown' });
  } else {
    ctx.reply(msg + "\n\n*(ចំណាំ៖ រូបភាព KHQR មិនទាន់ត្រូវបានដាក់បញ្ចូលក្នុងប្រព័ន្ធទេ សូមលោកគ្រូដាក់រូបភាព khqr.jpg ចូលក្នុង Folder ដើម)*", { parse_mode: 'Markdown' });
  }
});

bot.command('addvip', async (ctx) => {
  const adminId = ctx.from.id.toString();
  if (!SUPER_ADMIN_IDS.includes(adminId)) return ctx.reply("⛔ អ្នកគ្មានសិទ្ធិប្រើប្រាស់ Command នេះទេ។");

  const args = ctx.message.text.split(' ');
  if (args.length !== 3) return ctx.reply("❌ ទម្រង់មិនត្រឹមត្រូវ! សូមវាយ៖ `/addvip [លេខIDសិស្ស] [ចំនួនខែ]`", { parse_mode: 'Markdown' });

  const targetId = args[1];
  const months = parseInt(args[2]);

  if (isNaN(months) || months <= 0) return ctx.reply("❌ ចំនួនខែមិនត្រឹមត្រូវ!");

  // Fetch existing subscription to not lose remaining days
  const subSnap = await db.ref(`users/${targetId}/subscription`).once('value');
  const currentSub = subSnap.val();
  
  const additionalTime = months * 30 * 24 * 60 * 60 * 1000;
  let newExpiresAt = Date.now() + additionalTime;

  if (currentSub && currentSub.expiresAt && currentSub.expiresAt > Date.now()) {
    // If active, add to existing time
    newExpiresAt = currentSub.expiresAt + additionalTime;
  }

  // Update User Subscription
  await db.ref(`users/${targetId}/subscription`).update({
    status: 'paid',
    expiresAt: newExpiresAt,
    lastUpdated: Date.now()
  });

  // Keep a secure payment log globally
  await db.ref('payments_log').push({
    userId: targetId,
    adminId: adminId,
    monthsAdded: months,
    timestamp: Date.now()
  });

  const expireDate = new Date(newExpiresAt).toLocaleString('en-GB', { timeZone: 'Asia/Phnom_Penh' });
  ctx.reply(`✅ ជោគជ័យ! សិស្ស ID: ${targetId} ឥឡូវជាសមាជិក VIP រហូតដល់ថ្ងៃទី ${expireDate}។\n(ប្រវត្តិបង់ប្រាក់ត្រូវបានកត់ត្រាទុកយ៉ាងមានសុវត្ថិភាព)`);

  try {
    await bot.telegram.sendMessage(targetId, `🎉 អបអរសាទរ! គណនីរបស់អ្នកត្រូវបានអាប់ដេតទៅជា VIP (Upgrade) រួចរាល់។\nអ្នកបានបន្ថែមចំនួន ${months} ខែ។\nអ្នកអាចប្រើប្រាស់មុខងារទាំងអស់បានរហូតដល់៖ **${expireDate}**!`, { parse_mode: 'Markdown' });
  } catch (e) {
    console.log("Could not notify user:", e.message);
  }
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
bot.action(/week_([^-]+)-(.+)/, async (ctx) => {
  const monthId = ctx.match[1];
  const weekId = ctx.match[2];

  const monthData = curriculum.months.find(m => m.id === monthId);
  if (!monthData) return ctx.answerCbQuery("រកមិនឃើញទិន្នន័យខែ");

  const weekData = monthData.weeks.find(w => w.id === weekId);
  if (!weekData) return ctx.answerCbQuery("រកមិនឃើញសប្តាហ៍");

  const buttons = weekData.lessons.map(l => [Markup.button.callback(l.title, `lesson_${monthId}-${weekId}-${l.id}`)]);
  buttons.push([Markup.button.callback('🔙 ត្រឡប់ក្រោយ (Back)', `month_${monthId}`)]);

  await ctx.editMessageText(`📅 ${monthData.title} > ${weekData.title}\nសូមជ្រើសរើសមេរៀន៖`, Markup.inlineKeyboard(buttons));
});

// Handle Lesson Selection
bot.action(/lesson_([^-]+)-([^-]+)-(.+)/, async (ctx) => {
  const monthId = ctx.match[1];
  const weekId = ctx.match[2];
  const lessonId = ctx.match[3];
  
  const monthData = curriculum.months.find(m => m.id === monthId);
  if (!monthData) return ctx.answerCbQuery("រកមិនឃើញទិន្នន័យខែ");
  
  const weekData = monthData.weeks.find(w => w.id === weekId);
  if (!weekData) return ctx.answerCbQuery("រកមិនឃើញសប្តាហ៍");

  const lessonData = weekData.lessons.find(l => l.id === lessonId);
  if (!lessonData) return ctx.answerCbQuery("រកមិនឃើញមេរៀន");

  const userId = ctx.from.id;
  await setUserState(userId, `learning_${monthId}_${weekId}_${lessonId}`);
  
  // Store the lesson text to read it later via TTS
  await db.ref(`users/${userId}/latestResponse`).set(lessonData.content);

  // Record History
  await db.ref(`users/${userId}/history/${monthId}_${weekId}_${lessonId}`).set({
    title: `${monthData.title} > ${weekData.title} > ${lessonData.title}`,
    timestamp: Date.now()
  });

  await ctx.reply(lessonData.content, 
    Markup.inlineKeyboard([
      [Markup.button.callback('🔊 អានជាសំឡេង (Listen)', `tts_${userId}`)],
      [Markup.button.callback('📝 ប្រឡងបញ្ចប់មេរៀន (Quiz)', `quiz_start_${monthId}-${weekId}-${lessonId}`)],
      [Markup.button.callback('🔙 ត្រឡប់ទៅបញ្ជីមេរៀន', `week_${monthId}-${weekId}`)]
    ])
  );
  
  await ctx.reply(`💬 គ្រូ AI ជំនាញផ្នែក "${lessonData.title.split(':')[1].trim()}" នៅទីនេះហើយ! បើមានចម្ងល់សូមឆាតសួរ។`);
});


// ========================
// QUIZ SYSTEM
// ========================

function sendQuestion(ctx, userId, state) {
  const q = state.questions[state.currentQ];
  const qNum = state.currentQ + 1;
  const total = state.questions.length;
  const text = `📝 *សំណួរទី ${qNum}/${total}*\n\n${q.q}`;
  return ctx.reply(text, {
    parse_mode: 'Markdown',
    reply_markup: Markup.inlineKeyboard([
      [Markup.button.callback(q.c[0], `quiz_ans_A`), Markup.button.callback(q.c[1], `quiz_ans_B`)],
      [Markup.button.callback(q.c[2], `quiz_ans_C`), Markup.button.callback(q.c[3], `quiz_ans_D`)]
    ]).reply_markup
  });
}

// Start Quiz
bot.action(/quiz_start_([^-]+)-([^-]+)-(.+)/, async (ctx) => {
  await ctx.answerCbQuery();
  const monthId = ctx.match[1];
  const weekId = ctx.match[2];
  const lessonId = ctx.match[3];
  const userId = ctx.from.id;

  // ✅ Check channel membership first
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

  // 💎 Check VIP
  const vip = await checkVIP(userId);
  if (!vip) {
    return ctx.reply(
      `💎 *មុខងារប្រឡង (Quiz) សម្រាប់សមាជិក VIP ប៉ុណ្ណោះ!*\n\n` +
      `✅ ចូលជា VIP ដើម្បីទទួលបានសិទ្ធិ:\n` +
      `• ប្រឡង Quiz ជា MCQ ១០ សំណួរ\n` +
      `• ទទួលពិន្ទុ + ថ្នាក់ (A-F)\n` +
      `• រក្សាទុកប្រវត្តិពិន្ទុ\n\n` +
      `💰 តម្លៃ: 3$/ខែ | 30$/ឆ្នាំ`,
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback('💎 Upgrade VIP', 'vip_upgrade')]
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
    score: 0,
    lessonTitle: lessonData.title,
    lessonId: `${monthId}-${weekId}-${lessonId}`,
    answers: []
  };

  await ctx.reply(`🎯 *ការប្រឡងបញ្ចប់មេរៀន*\n📚 ${lessonData.title}\n\nខ្ញុំបានរៀបចំ *${questions.length} សំណួរ* ជ្រើសរើសចម្លើយ (MCQ) !\nត្រូវចុចលើ A, B, C ឬ D ។ ចំណាំ: ចុចតែម្ដង!\n\n🏁 ចាប់ផ្ដើម!`, {
    parse_mode: 'Markdown'
  });

  await sendQuestion(ctx, userId, quizState[userId]);
});

// Handle Quiz Answer
bot.action(/quiz_ans_([ABCD])/, async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id;
  const chosen = ctx.match[1];

  if (!quizState[userId]) {
    return ctx.reply('⚠️ គ្មានការប្រឡងដែលកំពុងដំណើរការ! សូមចុច 📝 ប្រឡងបញ្ចប់មេរៀន ម្ដងទៀត។');
  }

  const state = quizState[userId];
  const q = state.questions[state.currentQ];
  const isCorrect = chosen === q.a;

  if (isCorrect) state.score++;

  // Record answer
  state.answers.push({
    q: q.q,
    chosen: `${chosen}) ${q.c.find(c => c.startsWith(chosen))}`.replace(/^[A-D]\) /, ''),
    correct: q.c.find(c => c.startsWith(q.a)).replace(/^[A-D]\) /, ''),
    isCorrect
  });

  const feedback = isCorrect
    ? `✅ *ត្រូវហើយ!* 🎉\n\nចម្លើយត្រឹមត្រូវ: *${q.c.find(c => c.startsWith(q.a))}*`
    : `❌ *មិនត្រូវទេ!*\n\nអ្នកបានជ្រើស: ${q.c.find(c => c.startsWith(chosen))}\nចម្លើយត្រូវ: *${q.c.find(c => c.startsWith(q.a))}*`;

  await ctx.reply(feedback, { parse_mode: 'Markdown' });

  state.currentQ++;

  if (state.currentQ < state.questions.length) {
    await sendQuestion(ctx, userId, state);
  } else {
    // Quiz finished — show results
    const score = state.score;
    const total = state.questions.length;
    const percent = Math.round((score / total) * 100);

    let grade, emoji;
    if (percent >= 90) { grade = 'A'; emoji = '🏆'; }
    else if (percent >= 80) { grade = 'B'; emoji = '🥇'; }
    else if (percent >= 70) { grade = 'C'; emoji = '🥈'; }
    else if (percent >= 60) { grade = 'D'; emoji = '🥉'; }
    else { grade = 'F'; emoji = '📖'; }

    // Build result table
    let resultText = `${emoji} *លទ្ធផលការប្រឡង*\n`;
    resultText += `📚 ${state.lessonTitle}\n`;
    resultText += `━━━━━━━━━━━━━━━━━\n`;
    resultText += `🎯 ពិន្ទុ: *${score}/${total}* (${percent}%) - ថ្នាក់ *${grade}*\n`;
    resultText += `━━━━━━━━━━━━━━━━━\n\n`;
    resultText += `📋 *ចម្លើយលម្អិត:*\n`;

    state.answers.forEach((ans, i) => {
      const icon = ans.isCorrect ? '✅' : '❌';
      resultText += `${icon} *ស${i + 1}.* ${ans.q}\n`;
      if (!ans.isCorrect) {
        resultText += `   👉 ចម្លើយត្រូវ: _${ans.correct}_\n`;
      }
      resultText += '\n';
    });

    if (percent >= 70) {
      resultText += `🌟 *សូមអបអរ! អ្នកបានប្រឡងជាប់!*`;
    } else {
      resultText += `💪 *ព្យាយាមម្ដងទៀតបន្ទាប់ពីបានរៀនម្ដងទៀត!*`;
    }

    // Save result to Firebase
    if (db) {
      await db.ref(`users/${userId}/quiz_results/${state.lessonId}_${Date.now()}`).set({
        lessonTitle: state.lessonTitle,
        score,
        total,
        percent,
        grade,
        timestamp: Date.now()
      });
    }

    // Split long message if needed
    const maxLen = 3800;
    if (resultText.length > maxLen) {
      const summary = `${emoji} *លទ្ធផលការប្រឡង*\n📚 ${state.lessonTitle}\n━━━━━━━━━━━━━━━━━\n🎯 ពិន្ទុ: *${score}/${total}* (${percent}%) - ថ្នាក់ *${grade}*\n━━━━━━━━━━━━━━━━━\n${percent >= 70 ? '🌟 *សូមអបអរ! អ្នកបានប្រឡងជាប់!*' : '💪 *ព្យាយាមម្ដងទៀត!*'}`;
      await ctx.reply(summary, { parse_mode: 'Markdown' });
    } else {
      await ctx.reply(resultText, { parse_mode: 'Markdown' });
    }

    delete quizState[userId];
  }
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
  const userText = ctx.message.text;

  // Ignore persistent menu clicks
  const menuOptions = ['📚 បញ្ជីមេរៀន (Lessons)', '🔄 ប្តូរគ្រូ AI', '🕰️ ប្រវត្តិសិក្សា', '❓ ជំនួយ (Help)'];
  if (menuOptions.includes(userText)) return;

  // 💎 VIP Gate - Free account cannot use AI chat
  const isVIP = await checkVIP(userId);
  if (!isVIP) {
    return ctx.reply(
      `🧠 *មុខងារសួរជា AI សម្រាប់ VIP ប៉ុណ្ណោះ!*

ខ្ញុំនឹង Free Account អ្នកអាច:
✅ មើលមេរៀនទាំងអស់ (គ្រូបភ័ភព្ជីមើល)
✅ មើលកិរិយាសព្ទប្រែប្រវល

❌ សួរជាគ្រូ AI (ត្រូវការ VIP)
❌ អានសម្លង (ត្រូវការ VIP)
❌ ប្រឡង Quiz (ត្រូវការ VIP)
❌ ផ្ញើសារជាសម្លង (ត្រូវការ VIP)

💰 *តម្លៃ: 3$/ខែ | 30$/ឆ្នាំ*`,
      {
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback('💎 Upgrade VIP នៅសីលនេះ', 'vip_upgrade')]
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
          [Markup.button.callback('💎 Upgrade VIP នៅទីនេះ', 'vip_upgrade')]
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
