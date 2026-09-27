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

let appInstance;
try {
  appInstance = initializeApp({
    credential: firebaseCreds ? cert(firebaseCreds) : applicationDefault(),
    databaseURL: process.env.FIREBASE_DB_URL
  });
} catch (e) {
  console.error("❌ ERROR: Firebase Init Failed:", e.message);
}
const db = getDatabase(appInstance);

// Initialize APIs
let bot, genAI, groq, openai;
try {
  bot = new Telegraf(process.env.TELEGRAM_TOKEN);
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEYS);
  groq = new Groq({ apiKey: process.env.GROQ_API_KEYS });
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
  }
} catch (e) {
  console.error("❌ ERROR setting up webhook:", e.message);
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

// Start Command & Curriculum Menu
bot.start(async (ctx) => {
  const userId = ctx.from.id;
  const username = ctx.from.first_name || 'Student';
  
  await db.ref(`users/${userId}/profile`).update({
    name: username,
    registeredAt: Date.now()
  });

  await ctx.reply(`សួស្តី ${username}! ស្វាគមន៍មកកាន់ប្រព័ន្ធសិក្សាភាសាអង់គ្លេសខ្នាតស្តង់ដារ ១២ ខែ 📚\n\nនេះគឺជាកម្មវិធីសិក្សាទាំងមូល។ សូមជ្រើសរើសខែដែលអ្នកចង់រៀន៖`,
    getMonthsKeyboard()
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
  
  if (!monthData) return ctx.answerCbQuery("រកមិនឃើញទិន្នន័យ");

  if (!monthData.topics || monthData.topics.length === 0) {
    return ctx.reply(`⚠️ មេរៀនសម្រាប់ "${monthData.title}" កំពុងរៀបចំ និងអាប់ដេតឆាប់ៗនេះ។ សូមរើសខែផ្សេង!`, getMonthsKeyboard());
  }

  const buttons = monthData.topics.map(t => [Markup.button.callback(t.title, `topic_${monthId}_${t.id}`)]);
  buttons.push([Markup.button.callback('🔙 ត្រឡប់ក្រោយ (Back)', 'back_to_months')]);

  await ctx.editMessageText(`📅 ${monthData.title}\nសូមជ្រើសរើសមេរៀនលម្អិត៖`, Markup.inlineKeyboard(buttons));
});

bot.action('back_to_months', async (ctx) => {
  await ctx.editMessageText("សូមជ្រើសរើសខែដែលអ្នកចង់រៀន៖", getMonthsKeyboard());
});

// Handle Topic/Lesson Selection
bot.action(/topic_(.+)_(.+)/, async (ctx) => {
  const monthId = ctx.match[1];
  const topicId = ctx.match[2];
  
  const monthData = curriculum.months.find(m => m.id === monthId);
  const topicData = monthData.topics.find(t => t.id === topicId);
  
  if (!topicData) return ctx.answerCbQuery("រកមិនឃើញមេរៀន");

  const userId = ctx.from.id;
  await setUserState(userId, `learning_${topicId}`);
  
  // Store the lesson text to read it later via TTS
  await db.ref(`users/${userId}/latestResponse`).set(topicData.content);

  await ctx.reply(topicData.content, 
    Markup.inlineKeyboard([
      [Markup.button.callback('🔊 អានជាសំឡេង (Listen)', `tts_${userId}`)],
      [Markup.button.callback('🔙 ត្រឡប់ទៅមេរៀន', `month_${monthId}`)]
    ])
  );
  
  await ctx.reply("💬 គ្រូ AI (ជំនួយការផ្ទាល់ខ្លួន) របស់អ្នកនៅទីនេះហើយ! បើអ្នកមានចម្ងល់លើមេរៀននេះ ឬចង់សាកល្បងសន្ទនា សូមវាយសារសួរខ្ញុំមក។");
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

// AI Chat Handling
bot.on('text', async (ctx) => {
  const userId = ctx.from.id;
  const userText = ctx.message.text;
  const state = await getUserState(userId);
  const aiType = await getUserAI(userId);

  ctx.sendChatAction('typing');
  await saveHistory(userId, 'user', userText);

  let systemPrompt = "You are an expert English-Khmer bilingual teacher. Help the Cambodian student learn English. Explain clearly in Khmer.";
  
  if (state.startsWith('learning_')) {
    const topicId = state.split('_')[1];
    systemPrompt += ` The student is currently studying topic ID: ${topicId}. Focus your answers on this topic if relevant, correct their grammar, and encourage them.`;
  }

  try {
    let aiResponse = "";
    if (aiType === 'gemini') {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
      const prompt = `${systemPrompt}\n\nStudent: ${userText}\nTeacher:`;
      const result = await model.generateContent(prompt);
      aiResponse = result.response.text();
    } else if (aiType === 'groq') {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userText }
        ],
        model: 'llama3-70b-8192',
        temperature: 0.7,
      });
      aiResponse = chatCompletion.choices[0]?.message?.content || "No response";
    }

    await saveHistory(userId, 'ai', aiResponse);
    await db.ref(`users/${userId}/latestResponse`).set(aiResponse);

    await ctx.reply(aiResponse, 
      Markup.inlineKeyboard([
        Markup.button.callback('🔊 ស្តាប់សម្លេងគ្រូ (Listen)', `tts_${userId}`)
      ])
    );
  } catch (error) {
    console.error(error);
    ctx.reply("សុំទោស មានបញ្ហាបច្ចេកទេសបន្តិច! សូមពិនិត្យមើលការភ្ជាប់ API។");
  }
});

// TTS Generation Action
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

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text.substring(0, 4000),
    });
    
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await ctx.replyWithVoice({ source: buffer });
  } catch (error) {
    console.error(error);
    ctx.reply("មិនអាចបង្កើតសម្លេងបានទេពេលនេះ (ពិនិត្យមើល OpenAI Key)។");
  }
});

app.get('/', (req, res) => res.send('StudyAi Curriculum Bot is running!'));

app.listen(PORT, () => {
  console.log(`Bot running on port ${PORT}`);
});
