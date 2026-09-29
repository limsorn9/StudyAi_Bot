/**
 * Rate Limiter for StudyAI Bot
 * - Per-user TTS cooldown
 * - Per-user AI chat cooldown
 * - Daily TTS limit (Free vs VIP)
 * - Global concurrent TTS limit
 */

// In-memory stores (resets on restart)
const userLastTTS = {};        // { userId: timestamp }
const userLastAI = {};         // { userId: timestamp }
const userDailyTTS = {};       // { userId: { count, date } }
const ttsQueue = { active: 0 };// Global concurrent TTS counter

// ====== CONFIG ======
const RATE_CONFIG = {
  TTS_COOLDOWN_MS: 15000,       // 15 sec between TTS requests per user
  TTS_DAILY_FREE: 10,           // Free users: max 10 TTS/day
  TTS_DAILY_VIP: 50,            // VIP users: max 50 TTS/day
  TTS_MAX_CONCURRENT: 3,        // Max 3 simultaneous TTS processes
  AI_COOLDOWN_MS: 3000,         // 3 sec between AI chat requests per user
  AI_COOLDOWN_VIP_MS: 1000,     // VIP: 1 sec cooldown
};
// ====================

function getTodayStr() {
  return new Date().toISOString().slice(0, 10); // "2026-09-29"
}

/**
 * Check TTS rate limits.
 * Returns { allowed: true } or { allowed: false, reason, waitSec }
 */
function checkTTSLimit(userId, isVIP = false) {
  const now = Date.now();
  const today = getTodayStr();

  // 1. Global concurrent limit
  if (ttsQueue.active >= RATE_CONFIG.TTS_MAX_CONCURRENT) {
    return {
      allowed: false,
      reason: 'busy',
      message: `⏳ *Bot កំពុងអានសារ ${ttsQueue.active} ក្នុងពេលតែមួយ!*\nសូមមិនរង់ចាំបន្ដិច ហើយព្យាយាមម្ដងទៀត!`
    };
  }

  // 2. Per-user cooldown
  const lastTime = userLastTTS[userId] || 0;
  const elapsed = now - lastTime;
  if (elapsed < RATE_CONFIG.TTS_COOLDOWN_MS) {
    const waitSec = Math.ceil((RATE_CONFIG.TTS_COOLDOWN_MS - elapsed) / 1000);
    return {
      allowed: false,
      reason: 'cooldown',
      message: `⏱️ *សូមរង់ចាំ ${waitSec} វិនាទី* មុននឹងស្ដាប់សម្លេងម្ដងទៀត!`
    };
  }

  // 3. Daily limit
  if (!userDailyTTS[userId] || userDailyTTS[userId].date !== today) {
    userDailyTTS[userId] = { count: 0, date: today };
  }
  const dailyLimit = isVIP ? RATE_CONFIG.TTS_DAILY_VIP : RATE_CONFIG.TTS_DAILY_FREE;
  const used = userDailyTTS[userId].count;
  if (used >= dailyLimit) {
    const limitType = isVIP ? 'VIP' : 'ឥតគិតថ្លៃ';
    return {
      allowed: false,
      reason: 'daily_limit',
      message: isVIP
        ? `📊 *អ្នកបានប្រើ TTS ${used}/${dailyLimit} ដង ថ្ងៃនេះ (VIP Limit)!*\nសូមព្យាយាមម្ដងទៀតថ្ងៃស្អែក!`
        : `📊 *អ្នកបានប្រើ TTS ${used}/${dailyLimit} ដង ថ្ងៃនេះ (Free Limit)!*\n💎 Upgrade VIP ដើម្បីទទួលបាន ${RATE_CONFIG.TTS_DAILY_VIP} ដង/ថ្ងៃ!`
    };
  }

  return { allowed: true };
}

/**
 * Record TTS usage (call AFTER allowed check, BEFORE generating)
 */
function recordTTSStart(userId) {
  const today = getTodayStr();
  userLastTTS[userId] = Date.now();
  ttsQueue.active++;
  if (!userDailyTTS[userId] || userDailyTTS[userId].date !== today) {
    userDailyTTS[userId] = { count: 0, date: today };
  }
  userDailyTTS[userId].count++;
}

/**
 * Release TTS slot (call in finally block after TTS done/failed)
 */
function recordTTSDone() {
  ttsQueue.active = Math.max(0, ttsQueue.active - 1);
}

/**
 * Check AI chat rate limit.
 * Returns { allowed: true } or { allowed: false, message }
 */
function checkAILimit(userId, isVIP = false) {
  const now = Date.now();
  const cooldown = isVIP ? RATE_CONFIG.AI_COOLDOWN_VIP_MS : RATE_CONFIG.AI_COOLDOWN_MS;
  const lastTime = userLastAI[userId] || 0;
  const elapsed = now - lastTime;

  if (elapsed < cooldown) {
    const waitSec = Math.ceil((cooldown - elapsed) / 1000);
    return {
      allowed: false,
      message: `⏱️ សូមរង់ចាំ ${waitSec > 0 ? waitSec + ' វិនាទី' : 'បន្ដិច'} មុននឹងសួរម្ដងទៀត!`
    };
  }
  return { allowed: true };
}

/**
 * Record AI usage
 */
function recordAIUsage(userId) {
  userLastAI[userId] = Date.now();
}

/**
 * Get TTS stats for a user
 */
function getTTSStats(userId, isVIP = false) {
  const today = getTodayStr();
  const dailyLimit = isVIP ? RATE_CONFIG.TTS_DAILY_VIP : RATE_CONFIG.TTS_DAILY_FREE;
  const used = (userDailyTTS[userId]?.date === today) ? (userDailyTTS[userId]?.count || 0) : 0;
  return { used, limit: dailyLimit, remaining: dailyLimit - used };
}

module.exports = {
  checkTTSLimit,
  recordTTSStart,
  recordTTSDone,
  checkAILimit,
  recordAIUsage,
  getTTSStats,
  RATE_CONFIG
};
