/**
 * Admin Dashboard System for StudyAi_Bot
 * Interactive button-based dashboard for Telegram admins.
 */

const { Markup } = require('telegraf');

/**
 * Fetch real-time statistics from Firebase
 */
async function fetchDashboardStats(db) {
  try {
    const [usersSnap, licensesSnap, paymentsSnap] = await Promise.all([
      db.ref('users').once('value'),
      db.ref('licenses').once('value'),
      db.ref('payments_log').once('value')
    ]);

    const usersVal = usersSnap.val() || {};
    const licensesVal = licensesSnap.val() || {};
    const paymentsVal = paymentsSnap.val() || {};

    const userIds = Object.keys(usersVal);
    const totalUsers = userIds.length;
    let vipCount = 0;
    const now = Date.now();

    for (const uid of userIds) {
      const u = usersVal[uid];
      if (u?.subscription?.expiresAt && u.subscription.expiresAt > now && u.subscription.status !== 'revoked') {
        vipCount++;
      }
    }

    const freeCount = Math.max(0, totalUsers - vipCount);

    const licenses = Object.values(licensesVal);
    const activeKeysCount = licenses.filter(l => l.status === 'active').length;
    const usedKeysCount = licenses.filter(l => l.status === 'used').length;
    const totalPayments = Object.keys(paymentsVal).length;

    return {
      totalUsers,
      vipCount,
      freeCount,
      activeKeysCount,
      usedKeysCount,
      totalPayments
    };
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    return {
      totalUsers: 0,
      vipCount: 0,
      freeCount: 0,
      activeKeysCount: 0,
      usedKeysCount: 0,
      totalPayments: 0
    };
  }
}

/**
 * Format Telegram message text for the dashboard
 */
function renderDashboardText(stats, adminId) {
  const time = new Date().toLocaleString('en-GB', {
    timeZone: 'Asia/Phnom_Penh',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    `╔══════════════════════╗\n` +
    `   👑 *STUDY AI - ADMIN DASHBOARD*\n` +
    `╚══════════════════════╝\n\n` +
    `📊 *ស្ថិតិប្រព័ន្ធទូទៅ (Live Stats):*\n` +
    `• 👥 សិស្សចុះឈ្មោះសរុប: *${stats.totalUsers} នាក់*\n` +
    `• 💎 សមាជិក VIP សកម្ម: *${stats.vipCount} នាក់*\n` +
    `• ⚪ គណនី Free: *${stats.freeCount} នាក់*\n` +
    `• 🎟️ License Keys នៅទំនេរ: *${stats.activeKeysCount} កូដ*\n` +
    `• 🏷️ License Keys បានប្រើ: *${stats.usedKeysCount} កូដ*\n` +
    `• 💰 ប្រតិបត្តិការទូទាត់: *${stats.totalPayments} ដង*\n\n` +
    `🕒 ធ្វើបច្ចុប្បន្នភាព: \`${time}\`\n` +
    `👨‍💼 Admin ID: \`${adminId}\`\n\n` +
    `👇 *សូមចុចលើប៊ូតុងខាងក្រោមដើម្បីបញ្ជាមុខងាររហ័ស ៖*`
  );
}

/**
 * Main dashboard keyboard
 */
function getDashboardMarkup() {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback('🎟️ បង្កើត License Key', 'adm_menu_genkey'),
      Markup.button.callback('📋 Keys នៅទំនេរ', 'adm_list_keys')
    ],
    [
      Markup.button.callback('🔍 ពិនិត្យសិស្ស', 'adm_check_user'),
      Markup.button.callback('➕ កំណត់ VIP ផ្ទាល់', 'adm_set_vip')
    ],
    [
      Markup.button.callback('⛔ ដកហូត VIP', 'adm_revoke_vip'),
      Markup.button.callback('📢 ប្រកាស (Broadcast)', 'adm_broadcast')
    ],
    [
      Markup.button.callback('🔄 Refresh Dashboard', 'adm_refresh'),
      Markup.button.callback('📖 សៀវភៅបញ្ជា (Help)', 'adm_help')
    ]
  ]);
}

/**
 * 1-Click License Key Duration Selection Keyboard
 */
function getGenKeyMarkup() {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback('⚡ 1 ខែ (1 Month)', 'adm_gen_1m'),
      Markup.button.callback('⚡ 3 ខែ (3 Months)', 'adm_gen_3m')
    ],
    [
      Markup.button.callback('⚡ 6 ខែ (6 Months)', 'adm_gen_6m'),
      Markup.button.callback('⚡ 1 ឆ្នាំ (1 Year)', 'adm_gen_1y')
    ],
    [
      Markup.button.callback('⚡ 30 ថ្ងៃ (30 Days)', 'adm_gen_30d')
    ],
    [
      Markup.button.callback('🔙 ត្រឡប់ទៅ Dashboard', 'adm_back_dash')
    ]
  ]);
}

module.exports = {
  fetchDashboardStats,
  renderDashboardText,
  getDashboardMarkup,
  getGenKeyMarkup
};
