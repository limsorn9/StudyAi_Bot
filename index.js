require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const { initializeApp, cert, applicationDefault } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Groq = require('groq-sdk');
const OpenAI = require('openai');
const express = require('express');
const fs = require('fs');

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
      { command: 'switch_ai', description: '🔄 ប្តូរគ្រូ AI (Switch AI Teacher)' },
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
  return snap.val() || 'gemini';
};

const saveHistory = async (userId, role, text) => {
  await db.ref(`users/${userId}/history`).push({
    role,
    text,
    timestamp: Date.now()
  });
};

// Persistent Reply Keyboard Menu
const mainMenuKeyboard = Markup.keyboard([
  ['📚 បញ្ជីមេរៀន (Lessons)', '🕰️ ប្រវត្តិសិក្សា'],
  ['🔄 ប្តូរគ្រូ AI', '❓ ជំនួយ (Help)']
]).resize();

// Start Command & Curriculum Menu
bot.start(async (ctx) => {
  const userId = ctx.from.id;
  const username = ctx.from.first_name || 'Student';
  
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

bot.hears('🔄 ប្តូរគ្រូ AI', (ctx) => {
  ctx.reply("សូមជ្រើសរើសគ្រូ AI ដែលអ្នកចង់រៀនជាមួយ៖", 
    Markup.inlineKeyboard([
      [Markup.button.callback('🧠 គ្រូ Gemini (ពន្យល់ក្បោះក្បាយ)', 'set_ai_gemini')],
      [Markup.button.callback('⚡ គ្រូ Groq (ឆ្លើយតបលឿន)', 'set_ai_groq')]
    ])
  );
});

bot.hears('🕰️ ប្រវត្តិសិក្សា', async (ctx) => {
  const userId = ctx.from.id;
  const snapshot = await db.ref(`users/${userId}/history`).once('value');
  const historyData = snapshot.val();

  // In our DB structure history items saved from lesson clicks are keys like "m1_w1_l1"
  // But standard chat history is also saved under "history" (push). 
  // Let's filter to only those that have a "title"
  if (!historyData) {
    return ctx.reply("📝 អ្នកមិនទាន់បានចូលរៀនមេរៀនណាមួយនៅឡើយទេ។ សូមចុច /start ឬជ្រើសរើសមេរៀន!");
  }

  const lessons = Object.values(historyData).filter(i => i.title).sort((a, b) => b.timestamp - a.timestamp);
  
  if (lessons.length === 0) {
    return ctx.reply("📝 អ្នកមិនទាន់បានចូលរៀនមេរៀនណាមួយនៅឡើយទេ។ សូមចុច /start ឬជ្រើសរើសមេរៀន!");
  }

  let msg = "📚 **ប្រវត្តិមេរៀនដែលអ្នកបានរៀនថ្មីៗនេះ៖**\n\n";
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
  rows.push([Markup.button.callback('⚙️ ផ្លាស់ប្តូរគ្រូ AI', 'switch_ai')]);
  return Markup.inlineKeyboard(rows);
}

// Handle Month Selection
bot.action(/month_(.+)/, async (ctx) => {
  const monthId = ctx.match[1];
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
      [Markup.button.callback('🔙 ត្រឡប់ទៅបញ្ជីមេរៀន', `week_${monthId}-${weekId}`)]
    ])
  );
  
  await ctx.reply(`💬 គ្រូ AI ជំនាញផ្នែក "${lessonData.title.split(':')[1].trim()}" នៅទីនេះហើយ! បើមានចម្ងល់សូមឆាតសួរ។`);
});

// Switch AI
bot.action('switch_ai', async (ctx) => {
  await ctx.reply("សូមជ្រើសរើសគ្រូ AI ដែលអ្នកចង់រៀនជាមួយ៖", 
    Markup.inlineKeyboard([
      [Markup.button.callback('🧠 គ្រូ Gemini (ពន្យល់ក្បោះក្បាយ)', 'set_ai_gemini')],
      [Markup.button.callback('⚡ គ្រូ Groq (ឆ្លើយតបលឿន)', 'set_ai_groq')]
    ])
  );
});

bot.action('set_ai_gemini', async (ctx) => {
  await setUserAI(ctx.from.id, 'gemini');
  await ctx.reply("✅ គ្រូ Gemini ត្រូវបានកំណត់! (វាយ /start ដើម្បីទៅកាន់មេរៀន)");
});

bot.action('set_ai_groq', async (ctx) => {
  await setUserAI(ctx.from.id, 'groq');
  await ctx.reply("✅ គ្រូ Groq ត្រូវបានកំណត់! (វាយ /start ដើម្បីទៅកាន់មេរៀន)");
});

// Check History
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

async function handleUserMessage(ctx, userId, userText) {
  const state = await getUserState(userId);
  const aiType = await getUserAI(userId);

  ctx.sendChatAction('typing');

  let systemPrompt = "You are a friendly, highly skilled English teacher for Cambodian students. You speak both English and Khmer perfectly. Always encourage the student. Answer questions clearly using Khmer for explanations and English for examples.";
  
  if (state.startsWith('learning_')) {
    const topicId = state.replace('learning_', '');
    systemPrompt += `\nThe student is currently studying topic: ${topicId}. Please help them practice this topic, correct their grammar gently, and keep the conversation natural.`;
  } else if (state.startsWith('quiz_')) {
    const topicId = state.replace('quiz_', '');
    systemPrompt = `You are a strict English teacher evaluating a student's exercise for the topic: ${topicId}. 
The student just submitted their answer: "${userText}".
Evaluate their English grammar, relevance, and vocabulary. 
You MUST start your response with exactly "GRADE: A", "GRADE: B", "GRADE: C", or "GRADE: F". 
- Grade A: Perfect or minor mistakes.
- Grade B: Good but with some grammar mistakes.
- Grade C: Passable but has major errors.
- Grade F: Irrelevant to the topic, completely wrong, or not English.
After the grade, provide helpful feedback in Khmer explaining why they got this grade and how to improve.`;
  }

  // Fetch recent chat history
  const snap = await db.ref(`users/${userId}/history`).orderByChild('timestamp').limitToLast(12).once('value');
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
      const apiKey = getNextGeminiKey();
      if (!apiKey) throw new Error("No GEMINI_API_KEYS configured in environment");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `${systemPrompt}\n\n[Past Conversation]\n${pastContextText}\n\nStudent: ${userText}\nTeacher:`;
      const result = await model.generateContent(prompt);
      aiResponse = result.response.text();
    } else if (aiType === 'groq') {
      const apiKey = getNextGroqKey();
      if (!apiKey) throw new Error("No GROQ_API_KEYS configured in environment");
      const groq = new Groq({ apiKey: apiKey });
      const chatCompletion = await groq.chat.completions.create({
        messages: groqMessages,
        model: 'llama3-70b-8192',
        temperature: 0.7,
      });
      aiResponse = chatCompletion.choices[0]?.message?.content || "No response";
    }

    await saveHistory(userId, 'user', userText); // Saved after fetching history
    await saveHistory(userId, 'ai', aiResponse);
    await db.ref(`users/${userId}/latestResponse`).set(aiResponse);
    
    // Send AI Response
    await ctx.reply(aiResponse);

    // Grade Logic
    if (state.startsWith('quiz_')) {
      const gradeMatch = aiResponse.match(/GRADE:\s*([ABCF])/i);
      if (gradeMatch) {
        const grade = gradeMatch[1].toUpperCase();
        if (['A', 'B', 'C'].includes(grade)) {
          const lessonKey = state.replace('quiz_', ''); // e.g. m1_w1_l1
          const parts = lessonKey.split('_');
          const monthData = curriculum.months.find(m => m.id === parts[0]);
          const weekData = monthData?.weeks.find(w => w.id === parts[1]);
          const lessonData = weekData?.lessons.find(l => l.id === parts[2]);

          if (lessonData) {
            await db.ref(`users/${userId}/history/${lessonKey}`).set({
              title: `${monthData.title} > ${weekData.title} > ${lessonData.title}`,
              grade: grade,
              timestamp: Date.now()
            });
            await ctx.reply(`🎉 អបអរសាទរ! អ្នកបានប្រឡងជាប់មេរៀននេះជាមួយនឹងនិទ្ទេស **${grade}**! ប្រវត្តិសិក្សារបស់អ្នកត្រូវបានកត់ត្រាទុកជោគជ័យ។`, { parse_mode: 'Markdown' });
            await setUserState(userId, `learning_${lessonKey}`); // Reset back to learning state
          }
        } else {
          await ctx.reply(`❌ អ្នកទទួលបាននិទ្ទេស **F** (មិនទាន់ជាប់ទេ)។ សូមសាកល្បងម្ដងទៀត!`, { parse_mode: 'Markdown' });
        }
      }
    }
  } catch (error) {
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

  await handleUserMessage(ctx, userId, userText);
});

// Voice Message Handling (STT)
bot.on('voice', async (ctx) => {
  const userId = ctx.from.id.toString();
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

    const formData = new FormData();
    formData.append('file', response.data, 'audio.ogg');
    formData.append('model', 'whisper-large-v3');

    const apiKey = getNextGroqKey();
    if (!apiKey) return ctx.reply("❌ គ្មាន GROQ_API_KEYS ដែលត្រឹមត្រូវទេ!");

    const groqRes = await axios.post('https://api.groq.com/openai/v1/audio/transcriptions', formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${apiKey}`
      }
    });

    const userText = groqRes.data.text;
    if (!userText) {
      return ctx.reply("❌ មិនអាចស្តាប់សំឡេងបានច្បាស់ទេ។ សូមនិយាយម្តងទៀត!");
    }
    
    await ctx.reply(`🎙 ខ្ញុំស្តាប់បានថា៖\n_"${userText}"_`, { parse_mode: 'Markdown' });
    
    // Process text
    await handleUserMessage(ctx, userId, userText);
  } catch (error) {
    console.error("STT Error:", error);
    ctx.reply("❌ មានបញ្ហាក្នុងការស្តាប់សំឡេង! សូមព្យាយាមម្តងទៀត។");
  }
});

// TTS Generation Action (Using Edge TTS)
bot.action(/tts_(.+)/, async (ctx) => {
  const userId = ctx.match[1];
  if (ctx.from.id.toString() !== userId) return ctx.answerCbQuery("អ្នកមិនអាចស្តាប់សម្លេងនេះបានទេ។");

  ctx.answerCbQuery("កំពុងបង្កើតសម្លេង...");
  ctx.sendChatAction('record_voice');

  try {
    const snap = await db.ref(`users/${userId}/latestResponse`).once('value');
    let text = snap.val();

    if (!text) return ctx.reply("រកមិនឃើញអត្ថបទដើម្បីអានទេ។");

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
  } catch (error) {
    console.error("TTS Error:", error);
    ctx.reply("មិនអាចបង្កើតសម្លេងបានទេពេលនេះ។");
  }
});

app.get('/', (req, res) => res.send('StudyAi Curriculum Bot is running!'));

app.listen(PORT, () => {
  console.log(`Bot running on port ${PORT}`);
});
