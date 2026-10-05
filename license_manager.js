/**
 * License Management System for StudyAi_Bot
 * Handles generation, redemption, status checking, and administrative controls for licenses.
 */

const crypto = require('crypto');

/**
 * Parse duration string into days, milliseconds, and friendly Khmer label
 * Supported formats:
 * - '7d', '15d', '30d' (days)
 * - '1m', '3m', '6m', '12m' (months)
 * - '1y', '2y' (years)
 * - '1', '3' (number <= 12 is months, > 12 is days)
 */
function parseDuration(input) {
  if (!input) return null;
  const str = input.toString().trim().toLowerCase();

  // Support lifetime
  if (
    str === 'lifetime' ||
    str === 'life' ||
    str === 'forever' ||
    str.includes('lifetime') ||
    str.includes('មួយជីវិត')
  ) {
    return {
      durationStr: 'lifetime',
      label: '👑 VIP ពេញមួយជីវិត (Lifetime)',
      days: 36500, // 100 years
      ms: 36500 * 24 * 60 * 60 * 1000,
      isLifetime: true
    };
  }

  if (str.endsWith('m')) {
    const months = parseInt(str.replace('m', ''), 10);
    if (isNaN(months) || months <= 0) return null;
    return {
      durationStr: `${months}m`,
      label: `${months} ខែ`,
      days: months * 30,
      ms: months * 30 * 24 * 60 * 60 * 1000
    };
  }

  if (str.endsWith('y')) {
    const years = parseInt(str.replace('y', ''), 10);
    if (isNaN(years) || years <= 0) return null;
    return {
      durationStr: `${years}y`,
      label: `${years} ឆ្នាំ`,
      days: years * 365,
      ms: years * 365 * 24 * 60 * 60 * 1000
    };
  }

  if (str.endsWith('d')) {
    const days = parseInt(str.replace('d', ''), 10);
    if (isNaN(days) || days <= 0) return null;
    return {
      durationStr: `${days}d`,
      label: `${days} ថ្ងៃ`,
      days: days,
      ms: days * 24 * 60 * 60 * 1000
    };
  }

  const num = parseInt(str, 10);
  if (!isNaN(num) && num > 0) {
    if (num <= 12) {
      return {
        durationStr: `${num}m`,
        label: `${num} ខែ`,
        days: num * 30,
        ms: num * 30 * 24 * 60 * 60 * 1000
      };
    } else {
      return {
        durationStr: `${num}d`,
        label: `${num} ថ្ងៃ`,
        days: num,
        ms: num * 24 * 60 * 60 * 1000
      };
    }
  }

  return null;
}

/**
 * Generate a random formatted license key
 * Example: STUDY-A9K2-W7X4-B3P9
 */
function generateKeyString() {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // exclude 0, 1, I, O to prevent confusion
  const getChunk = () => {
    let chunk = '';
    for (let i = 0; i < 4; i++) {
      const idx = crypto.randomInt(0, chars.length);
      chunk += chars[idx];
    }
    return chunk;
  };
  return `STUDY-${getChunk()}-${getChunk()}-${getChunk()}`;
}

/**
 * Format timestamp into Cambodia timezone string
 */
function formatCambodiaTime(timestamp) {
  if (!timestamp) return 'មិនមាន';
  return new Date(timestamp).toLocaleString('en-GB', {
    timeZone: 'Asia/Phnom_Penh',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Admin: Generate a new License Key
 */
async function createLicenseKey(db, adminId, durationInput, note = '') {
  const duration = parseDuration(durationInput);
  if (!duration) {
    return { success: false, message: '❌ រយៈពេលមិនត្រឹមត្រូវ! ឧទាហរណ៍៖ 1m, 3m, 6m, 1y, lifetime ឬ 30d' };
  }

  const key = generateKeyString();
  const licenseData = {
    key: key,
    durationStr: duration.durationStr,
    label: duration.label,
    days: duration.days,
    ms: duration.ms,
    isLifetime: !!duration.isLifetime,
    status: 'active', // active | used | revoked
    createdBy: adminId.toString(),
    createdAt: Date.now(),
    note: note.trim() || '',
    usedBy: null,
    usedAt: null
  };

  await db.ref(`licenses/${key}`).set(licenseData);

  return {
    success: true,
    key: key,
    label: duration.label,
    days: duration.days,
    isLifetime: !!duration.isLifetime,
    licenseData: licenseData
  };
}

// In-memory anti-brute-force store to prevent license guessing
const failedRedeemAttempts = new Map(); // userId => { count, lockUntil }

/**
 * User: Redeem a License Key
 */
async function redeemLicenseKey(db, userId, rawKey) {
  const uid = userId ? userId.toString() : 'anonymous';
  const now = Date.now();
  const attempt = failedRedeemAttempts.get(uid);

  // Check if user is temporarily locked out
  if (attempt && attempt.lockUntil && attempt.lockUntil > now) {
    const remainingMin = Math.ceil((attempt.lockUntil - now) / 60000);
    return {
      success: false,
      message: `⛔ អ្នកបានបញ្ចូល Key ខុសច្រើនដងពេក! ប្រព័ន្ធបានចាក់សោសុវត្ថិភាពរយៈពេល ${remainingMin} នាទីទៀតសិន។`
    };
  }

  if (!rawKey) {
    return { success: false, message: '❌ សូមបញ្ជាក់ License Key ដែលត្រូវបញ្ចូល!' };
  }

  const cleanKey = rawKey.trim().toUpperCase();
  const snap = await db.ref(`licenses/${cleanKey}`).once('value');
  const license = snap.val();

  if (!license) {
    const currentCount = (attempt ? attempt.count : 0) + 1;
    if (currentCount >= 5) {
      failedRedeemAttempts.set(uid, { count: currentCount, lockUntil: now + 10 * 60 * 1000 });
      return {
        success: false,
        message: `⛔ អ្នកបានបញ្ចូល Key ខុសចំនួន ៥ ដង! ប្រព័ន្ធបានចាក់សោសុវត្ថិភាពរយៈពេល ១០ នាទីដើម្បីការពារការ Hack។`
      };
    } else {
      failedRedeemAttempts.set(uid, { count: currentCount, lockUntil: 0 });
      return {
        success: false,
        message: `❌ រកមិនឃើញ License Key នេះទេ! សូមពិនិត្យមើលអក្សរឡើងវិញ (ខុស ${currentCount}/5 ដង)។`
      };
    }
  }

  // Clear failed attempts counter on valid key
  failedRedeemAttempts.delete(uid);

  if (license.status === 'used') {
    const usedDate = formatCambodiaTime(license.usedAt);
    return {
      success: false,
      message: `❌ License Key នេះត្រូវបានប្រើប្រាស់រួចហើយ នៅថ្ងៃទី ${usedDate}!`
    };
  }

  if (license.status === 'revoked') {
    return { success: false, message: '❌ License Key នេះត្រូវបាន Admin លុបចោល (Revoked) រួចហើយ!' };
  }

  // Fetch current user subscription to preserve remaining time
  const subSnap = await db.ref(`users/${userId}/subscription`).once('value');
  const currentSub = subSnap.val();

  const isLifetime = !!(license.isLifetime || license.durationStr === 'lifetime');
  let newExpiresAt = Date.now() + license.ms;
  if (!isLifetime && currentSub && currentSub.expiresAt && currentSub.expiresAt > Date.now()) {
    newExpiresAt = currentSub.expiresAt + license.ms;
  }

  // Mark license as used
  await db.ref(`licenses/${cleanKey}`).update({
    status: 'used',
    usedBy: userId.toString(),
    usedAt: Date.now()
  });

  // Update User Subscription
  await db.ref(`users/${userId}/subscription`).update({
    status: 'paid',
    isLifetime: isLifetime,
    expiresAt: newExpiresAt,
    lastUpdated: Date.now(),
    lastLicenseKey: cleanKey,
    plan: license.label
  });

  // Log in payments_log
  await db.ref('payments_log').push({
    userId: userId.toString(),
    adminId: 'LICENSE_KEY',
    licenseKey: cleanKey,
    durationLabel: license.label,
    daysAdded: license.days,
    isLifetime: isLifetime,
    timestamp: Date.now()
  });

  const expireDateFormatted = isLifetime ? 'គ្មានដែនកំណត់ (Lifetime)' : formatCambodiaTime(newExpiresAt);

  return {
    success: true,
    key: cleanKey,
    label: license.label,
    days: license.days,
    isLifetime: isLifetime,
    expiresAt: newExpiresAt,
    expireDateFormatted: expireDateFormatted
  };
}

/**
 * Admin: Directly grant or extend a license for a user (without key code)
 */
async function setDirectLicense(db, adminId, targetUserId, durationInput) {
  const duration = parseDuration(durationInput);
  if (!duration) {
    return { success: false, message: '❌ រយៈពេលមិនត្រឹមត្រូវ! ឧទាហរណ៍៖ 1m, 3m, 6m, 1y, lifetime ឬ 30d' };
  }

  const subSnap = await db.ref(`users/${targetUserId}/subscription`).once('value');
  const currentSub = subSnap.val();

  const isLifetime = !!duration.isLifetime;
  let newExpiresAt = Date.now() + duration.ms;
  if (!isLifetime && currentSub && currentSub.expiresAt && currentSub.expiresAt > Date.now()) {
    newExpiresAt = currentSub.expiresAt + duration.ms;
  }

  await db.ref(`users/${targetUserId}/subscription`).update({
    status: 'paid',
    isLifetime: isLifetime,
    expiresAt: newExpiresAt,
    lastUpdated: Date.now(),
    setByAdmin: adminId.toString(),
    plan: duration.label
  });

  await db.ref('payments_log').push({
    userId: targetUserId.toString(),
    adminId: adminId.toString(),
    action: 'SET_DIRECT_LICENSE',
    durationLabel: duration.label,
    daysAdded: duration.days,
    isLifetime: isLifetime,
    timestamp: Date.now()
  });

  const expireDateFormatted = isLifetime ? 'គ្មានដែនកំណត់ (Lifetime)' : formatCambodiaTime(newExpiresAt);

  return {
    success: true,
    targetUserId: targetUserId.toString(),
    label: duration.label,
    days: duration.days,
    isLifetime: isLifetime,
    expiresAt: newExpiresAt,
    expireDateFormatted: expireDateFormatted
  };
}

/**
 * Admin: Revoke (delete/cancel) a user's license immediately
 */
async function revokeUserLicense(db, adminId, targetUserId) {
  await db.ref(`users/${targetUserId}/subscription`).update({
    status: 'revoked',
    isLifetime: false,
    expiresAt: 0,
    revokedBy: adminId.toString(),
    revokedAt: Date.now()
  });

  await db.ref('payments_log').push({
    userId: targetUserId.toString(),
    adminId: adminId.toString(),
    action: 'REVOKE_LICENSE',
    timestamp: Date.now()
  });

  return {
    success: true,
    targetUserId: targetUserId.toString()
  };
}

/**
 * Get detailed license status for a user
 */
async function getUserLicenseInfo(db, userId, superAdminIds = []) {
  const strId = (userId || '').toString().trim();
  const isHardcodedSuper = (
    superAdminIds.some(id => id.toString().trim() === strId) ||
    strId === '240224709' ||
    strId === '7160751939'
  );

  let userProfile = null;
  if (db && strId) {
    try {
      const pSnap = await db.ref(`users/${strId}/profile`).once('value');
      userProfile = pSnap.val();
      if (!userProfile && strId.startsWith('p_')) {
        const uSnap = await db.ref(`web_users/${strId.replace('p_', '')}`).once('value');
        userProfile = uSnap.val();
      }
    } catch (e) {}
  }

  const isSuperAdmin = isHardcodedSuper || (
    userProfile && (
      userProfile.role === 'super_admin' ||
      userProfile.isSuperAdmin === true ||
      (userProfile.username && (userProfile.username.toLowerCase() === 'limsorn' || userProfile.username.toLowerCase() === 'superadmin')) ||
      (userProfile.linkedTelegramId && ['240224709', '7160751939'].includes(userProfile.linkedTelegramId.toString()))
    )
  );

  if (isSuperAdmin) {
    return {
      isVIP: true,
      isAdmin: true,
      isSuperAdmin: true,
      role: 'super_admin',
      status: 'SUPER_ADMIN',
      statusKhmer: '⚡ Super Admin (ម្ចាស់ប្រព័ន្ធ / សិទ្ធិពេញលេញ)',
      expiresAt: null,
      expireDateFormatted: 'គ្មានដែនកំណត់ (Unlimited)',
      daysRemaining: 'អចិន្ត្រៃយ៍',
      hoursRemaining: null,
      plan: 'Super Admin'
    };
  }

  const hasAdminRole = userProfile && (userProfile.role === 'admin' || userProfile.isAdmin === true);
  if (hasAdminRole) {
    return {
      isVIP: true,
      isAdmin: true,
      isSuperAdmin: false,
      role: 'admin',
      status: 'ADMIN',
      statusKhmer: '💎 School Admin (អ្នកគ្រប់គ្រង)',
      expiresAt: null,
      expireDateFormatted: 'គ្មានដែនកំណត់ (Admin)',
      daysRemaining: 'អចិន្ត្រៃយ៍',
      hoursRemaining: null,
      plan: 'Admin'
    };
  }

  const snap = await db.ref(`users/${userId}/subscription`).once('value');
  const sub = snap.val();

  if (!sub || !sub.expiresAt || sub.expiresAt <= Date.now() || sub.status === 'revoked') {
    const wasRevoked = sub && sub.status === 'revoked';
    return {
      isVIP: false,
      isAdmin: false,
      isSuperAdmin: false,
      isLifetime: false,
      status: wasRevoked ? 'REVOKED' : 'FREE',
      statusKhmer: wasRevoked ? '❌ ត្រូវបានដកហូត' : '⚪ Free Account',
      expiresAt: sub?.expiresAt || null,
      expireDateFormatted: sub?.expiresAt ? formatCambodiaTime(sub.expiresAt) : 'មិនទាន់មាន',
      daysRemaining: 0,
      hoursRemaining: 0,
      plan: 'Free'
    };
  }

  const isLifetime = !!(
    sub.isLifetime ||
    (sub.plan && (sub.plan.toLowerCase().includes('lifetime') || sub.plan.includes('មួយជីវិត'))) ||
    sub.expiresAt > Date.now() + 10 * 365 * 24 * 60 * 60 * 1000
  );

  if (isLifetime) {
    return {
      isVIP: true,
      isAdmin: false,
      isSuperAdmin: false,
      isLifetime: true,
      status: 'LIFETIME',
      statusKhmer: '👑 VIP ពេញមួយជីវិត (Lifetime)',
      expiresAt: sub.expiresAt,
      expireDateFormatted: 'គ្មានដែនកំណត់ (Lifetime)',
      daysRemaining: 'ពេញមួយជីវិត (Lifetime)',
      hoursRemaining: null,
      plan: sub.plan || '👑 VIP ពេញមួយជីវិត (Lifetime)'
    };
  }

  const remainingMs = sub.expiresAt - Date.now();
  const daysRemaining = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return {
    isVIP: true,
    isAdmin: false,
    isSuperAdmin: false,
    isLifetime: false,
    status: 'VIP',
    statusKhmer: '💎 VIP Active',
    expiresAt: sub.expiresAt,
    expireDateFormatted: formatCambodiaTime(sub.expiresAt),
    daysRemaining: daysRemaining,
    hoursRemaining: hoursRemaining,
    plan: sub.plan || 'VIP'
  };
}

/**
 * Admin: List all active (unused) license keys
 */
async function listUnusedKeys(db, limit = 20) {
  const snap = await db.ref('licenses').orderByChild('status').equalTo('active').limitToLast(limit).once('value');
  const val = snap.val();
  if (!val) return [];

  const list = Object.values(val);
  list.sort((a, b) => b.createdAt - a.createdAt);
  return list;
}

module.exports = {
  parseDuration,
  generateKeyString,
  formatCambodiaTime,
  createLicenseKey,
  redeemLicenseKey,
  setDirectLicense,
  revokeUserLicense,
  getUserLicenseInfo,
  listUnusedKeys
};
