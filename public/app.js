/**
 * TEACHER SSONLINE - FRONTEND APPLICATION JAVASCRIPT
 * Supports: Google Chrome, Safari, Telegram WebApp / Mini App
 * Real-time sync with Telegram Bot via Firebase
 */

const STATE = {
  currentUser: null,
  activeTab: 'dashboard',
  curriculum: [],
  selectedMonthId: 'm1',
  currentLesson: null,
  audioPlaying: false,
  audioBlobUrl: null,
  quizSession: null,
  currentQuizIndex: 0,
  userAnswers: {},
  currentCertPreviewId: null,
  allVerbsData: {},
  courseLevel: 'beginner',
  beginnerCourse: null,
  beginnerStatus: { passedCount: 0, totalLessons: 26, passedLessons: [], isGraduated: false, beginnerCert: null },
  isBeginnerFinalExam: false,
  elementaryCourse: null,
  selectedElementaryMonthId: 'em1',
  elementaryStatus: { passedCount: 0, totalLessons: 72, passedLessons: [], isGraduated: false, month1Passed: false, month2Passed: false },
  isElementaryExam: false,
  elementaryExamMonth: 1,
  activeTutor: 'piseth',
  studioTutor: 'piseth'
};

// ==========================================
// 1. INITIALIZATION & TELEGRAM WEBAPP
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initTelegramWebApp();
  initFirebaseClient();
  loadSavedUserSession();
  await loadCurriculum();
  await loadVerbsData();
  setupEventListeners();

  if (STATE.currentUser) {
    refreshUserProfile();
    loadBeginnerStatus();
    loadElementaryStatus();
  }
});

// ==========================================
// THEME MANAGEMENT (NIGHT MODE FULL)
// ==========================================

function initTheme() {
  const savedTheme = localStorage.getItem('app_theme') || 'night-mode-full';
  applyTheme(savedTheme);
}

function applyTheme(themeName) {
  const body = document.body;
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');

  if (themeName === 'day-mode') {
    body.classList.remove('night-mode-full', 'dark-theme');
    body.classList.add('day-mode');
    if (icon) icon.textContent = '☀️';
    if (label) label.textContent = 'Day Mode';
    localStorage.setItem('app_theme', 'day-mode');
  } else {
    body.classList.remove('day-mode');
    body.classList.add('night-mode-full', 'dark-theme');
    if (icon) icon.textContent = '🌙';
    if (label) label.textContent = 'Night Mode';
    localStorage.setItem('app_theme', 'night-mode-full');
  }
}

function toggleNightMode() {
  const isNight = document.body.classList.contains('night-mode-full') || !document.body.classList.contains('day-mode');
  if (isNight) {
    applyTheme('day-mode');
    showToast('☀️ បានប្តូរទៅ Day Mode (ពន្លឺ)', 'info');
  } else {
    applyTheme('night-mode-full');
    showToast('🌙 បានប្តូរទៅ Night Mode Full (ស្រួលភ្នែកពេលយប់)', 'info');
  }
}

async function initFirebaseClient() {
  try {
    if (window.firebase) {
      const res = await fetch('/api/auth/firebase-config');
      const cfg = await res.json();
      if (cfg && cfg.success && cfg.projectId && !firebase.apps.length) {
        const fbConfig = {
          projectId: cfg.projectId,
          authDomain: cfg.authDomain,
          databaseURL: cfg.databaseURL
        };
        if (cfg.apiKey) fbConfig.apiKey = cfg.apiKey;
        firebase.initializeApp(fbConfig);
        console.log('🔥 Firebase Web Client initialized:', cfg.projectId);
      }
    }
  } catch (e) {
    console.warn('Firebase client config init note:', e.message);
  }
}

/**
 * Detect & Initialize Telegram WebApp (Mini App)
 */
function initTelegramWebApp() {
  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    // Check if opened with user data from Telegram
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
      const tgUser = tg.initDataUnsafe.user;
      console.log('🤖 Telegram WebApp detected user:', tgUser);

      // Hide sync notice banner since user is already inside Telegram
      const syncBanner = document.getElementById('syncNoticeBanner');
      if (syncBanner) syncBanner.style.display = 'none';

      const heroSync = document.getElementById('heroLinkTelegramBtn');
      if (heroSync) heroSync.style.display = 'none';

      // Auto-authenticate with Telegram credentials
      authenticateWithTelegram(tgUser);
    }
  }
}

async function authenticateWithTelegram(tgUser) {
  try {
    const res = await fetch('/api/auth/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: tgUser.id,
        first_name: tgUser.first_name,
        last_name: tgUser.last_name,
        username: tgUser.username
      })
    });

    const data = await res.json();
    if (data.success && data.user) {
      setCurrentUser(data.user);
      showToast(`🎉 ស្វាគមន៍ ${data.user.name} មកកាន់ Telegram Web App!`, 'success');
      if (!data.user.photoUrl || !data.user.khmerName) {
        setTimeout(() => openStudentProfileSetupModal(true), 600);
      }
    }
  } catch (e) {
    console.error('Telegram auto-auth failed:', e);
  }
}

function getOrCreateDeviceId() {
  let id = localStorage.getItem('studyai_device_id');
  if (!id) {
    id = 'dev_' + Math.random().toString(36).substring(2, 10);
    localStorage.setItem('studyai_device_id', id);
  }
  return id;
}

function setCurrentUser(user, sessionToken, deviceId) {
  STATE.currentUser = user;
  try {
    localStorage.setItem('studyai_user_session', JSON.stringify(user));
    if (sessionToken) localStorage.setItem('studyai_session_token', sessionToken);
    if (deviceId) localStorage.setItem('studyai_device_id', deviceId);
  } catch (e) {}

  updateUserInterface();
}

async function loadSavedUserSession() {
  try {
    const saved = localStorage.getItem('studyai_user_session');
    const sessionToken = localStorage.getItem('studyai_session_token');
    const deviceId = getOrCreateDeviceId();

    if (saved) {
      const user = JSON.parse(saved);
      setCurrentUser(user);

      // Verify active session with server
      if (user.id && sessionToken) {
        fetch(`/api/auth/check-session?userId=${encodeURIComponent(user.id)}&deviceId=${encodeURIComponent(deviceId)}&sessionToken=${encodeURIComponent(sessionToken)}`)
          .then(res => res.json())
          .then(data => {
            if (data && data.valid === false && data.reason === 'revoked') {
              console.warn('Device session has been revoked by user.');
              handleLogout(true);
              showToast('🔒 ឧបករណ៍នេះត្រូវបានផ្តាច់ចេញពីគណនីរួចរាល់ហើយ', 'info');
            }
          })
          .catch(() => {});
      }
    }
  } catch (e) {
    console.error('Failed to restore session:', e);
  }
}

function updateUserInterface() {
  const authActions = document.getElementById('authActions');
  const userBadge = document.getElementById('userProfileBadge');
  const userNameDisplay = document.getElementById('userNameDisplay');
  const userAvatarChar = document.getElementById('userAvatarChar');
  const userAvatarImg = document.getElementById('userAvatarImg');
  const userVipStatusBadge = document.getElementById('userVipStatusBadge');
  const syncBanner = document.getElementById('syncNoticeBanner');

  if (STATE.currentUser) {
    if (authActions) authActions.style.display = 'none';
    if (userBadge) userBadge.classList.remove('hidden');

    const name = STATE.currentUser.name || STATE.currentUser.username || 'Student';
    if (userNameDisplay) userNameDisplay.textContent = name;
    
    // Display student photo if available, otherwise show first character
    const photo = STATE.currentUser.photoUrl;
    if (photo && userAvatarImg) {
      userAvatarImg.src = photo;
      userAvatarImg.classList.remove('hidden');
      if (userAvatarChar) userAvatarChar.classList.add('hidden');
    } else {
      if (userAvatarImg) userAvatarImg.classList.add('hidden');
      if (userAvatarChar) {
        userAvatarChar.classList.remove('hidden');
        userAvatarChar.textContent = name.charAt(0).toUpperCase();
      }
    }

    const isVIP = !!STATE.currentUser.isVIP;
    if (userVipStatusBadge) {
      userVipStatusBadge.textContent = isVIP ? '💎 VIP Member' : 'Free Account';
      userVipStatusBadge.className = `user-tier-badge ${isVIP ? 'vip' : 'free'}`;
    }

    // Dashboard Stats update
    const statPlan = document.getElementById('statVipPlan');
    const statDays = document.getElementById('statVipDays');
    if (statPlan) statPlan.textContent = isVIP ? 'VIP Member' : 'Free';
    if (statDays) {
      statDays.textContent = isVIP
        ? `នៅសល់ ${STATE.currentUser.vipDetails?.daysRemaining || 30} ថ្ងៃ`
        : 'មិនទាន់ជា VIP';
    }

    const heroTgBtn = document.getElementById('heroLinkTelegramBtn');
    if (heroTgBtn) {
      heroTgBtn.style.display = STATE.currentUser.isTelegram ? 'none' : 'inline-flex';
    }
    if (syncBanner) {
      syncBanner.style.display = STATE.currentUser.isTelegram ? 'none' : 'flex';
    }
  } else {
    if (authActions) authActions.style.display = 'flex';
    if (userBadge) userBadge.classList.add('hidden');
    if (syncBanner) syncBanner.style.display = 'flex';
    const heroTgBtn = document.getElementById('heroLinkTelegramBtn');
    if (heroTgBtn) heroTgBtn.style.display = 'inline-flex';
  }
}

async function refreshUserProfile() {
  if (!STATE.currentUser || !STATE.currentUser.id) return;
  try {
    const res = await fetch(`/api/user/profile/${STATE.currentUser.id}`);
    const data = await res.json();
    if (data.success && data.profile) {
      const p = data.profile;
      STATE.currentUser.name = p.name || STATE.currentUser.name;
      STATE.currentUser.khmerName = p.khmerName || STATE.currentUser.khmerName;
      STATE.currentUser.photoUrl = p.photoUrl || p.avatar || STATE.currentUser.photoUrl;
      STATE.currentUser.phone = p.phone || STATE.currentUser.phone;
      STATE.currentUser.isVIP = p.isVIP;
      STATE.currentUser.vipDetails = p.vipDetails;
      STATE.currentUser.completedLessons = p.completedLessons;
      STATE.currentUser.subjectCerts = p.subjectCerts;
      if (p.isAdmin !== undefined) STATE.currentUser.isAdmin = !!p.isAdmin;
      if (STATE.currentUser.id === '240224709' || STATE.currentUser.telegramId === 240224709) STATE.currentUser.isAdmin = true;

      // Update Dashboard Counters
      const cLessons = document.getElementById('statCompletedLessons');
      const cScore = document.getElementById('statTotalScore');
      const cScoreSub = document.getElementById('statScoreSub');
      const cCerts = document.getElementById('statCertificatesCount');
      const cProg = document.getElementById('statCompletedProgress');
      const cCertProg = document.getElementById('statCertProgress');

      if (cLessons) cLessons.textContent = p.stats.completedLessonsCount || 0;
      if (cScore) cScore.textContent = `${p.stats.totalScore || 0} pt`;
      if (cScoreSub) cScoreSub.textContent = `ពិន្ទុសរុបលើការប្រឡង`;
      if (cCerts) cCerts.textContent = p.stats.certificatesCount || 0;

      if (cProg) {
        const pct = Math.min(100, Math.round(((p.stats.completedLessonsCount || 0) / 288) * 100));
        cProg.style.width = `${pct}%`;
      }
      if (cCertProg) {
        const pct = Math.min(100, (p.stats.certificatesCount || 0) * 14);
        cCertProg.style.width = `${pct}%`;
      }

      updateUserInterface();
      renderCurriculumWeeks();
      // Re-fetch beginner status after profile refresh to update locking/progress
      loadBeginnerStatus().then(() => {
        if (STATE.courseLevel === 'beginner') renderBeginnerWeeks();
      });
    }
  } catch (e) {
    console.error('Failed to refresh profile:', e);
  }
}

// ==========================================
// 2. NAVIGATION & TAB SWITCHING
// ==========================================

function navigateTo(tabName) {
  STATE.activeTab = tabName;

  // Update navbar active states
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tabName);
  });
  document.querySelectorAll('.m-nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tabName);
  });

  // Switch tab panes
  document.querySelectorAll('.tab-pane').forEach(el => {
    el.classList.remove('active');
  });

  const targetPane = document.getElementById(`tab-${tabName}`);
  if (targetPane) {
    targetPane.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Pause YouTube video if navigating away from lesson
  if (tabName !== 'lesson' && currentYTPlayer && typeof currentYTPlayer.pauseVideo === 'function') {
    try { currentYTPlayer.pauseVideo(); } catch (e) {}
  }

  // Tab-specific hooks
  if (tabName === 'curriculum') {
    if (STATE.courseLevel === 'beginner') {
      renderBeginnerWeeks();
    } else {
      renderCurriculumWeeks();
    }
  } else if (tabName === 'ai-tutor') {
    initAIStudioTab();
  } else if (tabName === 'annual-exams') {
    loadAnnualExams();
  } else if (tabName === 'certificates') {
    loadUserCertificates();
  } else if (tabName === 'verbs') {
    renderVerbsTable();
  }
}

function returnToLessonList() {
  if (STATE.currentLesson?.monthId === 'beginner') {
    switchCourseLevel('beginner');
  } else if (STATE.currentLesson?.monthId === 'elementary' || (STATE.currentLesson?.monthId && STATE.currentLesson.monthId.startsWith('em'))) {
    if (STATE.currentLesson?.monthId.startsWith('em')) {
      STATE.selectedElementaryMonthId = STATE.currentLesson.monthId;
    }
    switchCourseLevel('elementary');
  } else if (STATE.currentLesson?.monthId) {
    STATE.selectedMonthId = STATE.currentLesson.monthId;
    if (STATE.courseLevel === 'beginner' || STATE.courseLevel === 'elementary') {
      switchCourseLevel('standard');
    } else {
      switchCourseLevel(STATE.courseLevel || 'standard');
    }
  }
  navigateTo('curriculum');
}

// ==========================================
// 3. CURRICULUM & LESSONS VIEW
// ==========================================

async function loadCurriculum() {
  try {
    const res = await fetch('/api/curriculum');
    const data = await res.json();
    if (data.success) {
      STATE.curriculum = data.months || [];
      STATE.beginnerCourse = data.beginner || null;
      STATE.elementaryCourse = data.elementary || null;
      switchCourseLevel(STATE.courseLevel || 'beginner');
    }
  } catch (e) {
    console.error('Failed to load curriculum:', e);
  }
}

async function loadBeginnerStatus() {
  const userId = STATE.currentUser?.id;
  if (!userId) return;
  try {
    const res = await fetch(`/api/beginner/status/${userId}`);
    const data = await res.json();
    if (data.success) {
      STATE.beginnerStatus = data;
      const isAdmin = !!(STATE.currentUser?.isAdmin || STATE.currentUser?.id === '240224709' || STATE.currentUser?.telegramId === 240224709);
      // Update Elementary button lock state
      const elemBtn = document.getElementById('courseLevelElementaryBtn');
      if (elemBtn && (data.isGraduated || isAdmin)) {
        elemBtn.classList.remove('locked-level');
        elemBtn.querySelector('.course-icon').textContent = '🎒';
        const lockHint = elemBtn.querySelector('.lock-hint');
        if (lockHint) lockHint.textContent = `${STATE.elementaryStatus?.passedCount || 0}/72 ថ្ងៃ • បើកដំណើរការ`;
      }
    }
  } catch (e) { /* silent */ }
}

async function loadElementaryStatus() {
  const userId = STATE.currentUser?.id;
  if (!userId) return;
  try {
    const res = await fetch(`/api/elementary/status/${userId}`);
    const data = await res.json();
    if (data.success) {
      STATE.elementaryStatus = data;
      const isAdmin = !!(STATE.currentUser?.isAdmin || STATE.currentUser?.id === '240224709' || STATE.currentUser?.telegramId === 240224709);
      const elemBtn = document.getElementById('courseLevelElementaryBtn');
      if (elemBtn && (STATE.beginnerStatus?.isGraduated || isAdmin)) {
        elemBtn.classList.remove('locked-level');
        elemBtn.querySelector('.course-icon').textContent = '🎒';
        const lockHint = elemBtn.querySelector('.lock-hint');
        if (lockHint) lockHint.textContent = `${data.passedCount}/72 ថ្ងៃ • ${data.isGraduated ? '🎓 បញ្ចប់វគ្គ' : 'ចុចចូលរៀន'}`;
      }
    }
  } catch (e) { /* silent */ }
}

function switchCourseLevel(level) {
  const isAdmin = !!(STATE.currentUser?.isAdmin || STATE.currentUser?.id === '240224709' || STATE.currentUser?.telegramId === 240224709);

  // Locked levels: elementary, intermediate, advanced need graduation
  if (level === 'elementary') {
    if (!STATE.beginnerStatus?.isGraduated && !isAdmin) {
      const passedCount = STATE.beginnerStatus?.passedCount || 0;
      showToast(`🔒 ថ្នាក់នេះត្រូវការប្រឡងបញ្ចប់ថ្នាក់ដំបូង (English for Children) ជាមុន!\n(បច្ចុប្បន្ន: ${passedCount}/26 ថ្ងៃ)`, 'error', 4000);
      return;
    }
  } else if (level === 'intermediate' || level === 'advanced') {
    if (!isAdmin && (!STATE.elementaryStatus?.isGraduated || level === 'advanced')) {
      showToast('🔒 កម្រិតនេះកំពុងរៀបចំ! ត្រូវបំពេញថ្នាក់ទាបជាង ហើយប្រឡងជ្រះជ្រា ទើបចូលបានទេ 🚧', 'warning', 4000);
      return;
    }
  }

  STATE.courseLevel = level;

  // Update active states for all 5 buttons
  ['courseLevelBeginnerBtn', 'courseLevelElementaryBtn', 'courseLevelIntermediateBtn', 'courseLevelAdvancedBtn', 'courseLevelStandardBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.remove('active');
  });
  const activeId = {
    beginner: 'courseLevelBeginnerBtn',
    elementary: 'courseLevelElementaryBtn',
    intermediate: 'courseLevelIntermediateBtn',
    advanced: 'courseLevelAdvancedBtn',
    standard: 'courseLevelStandardBtn'
  }[level];
  const activeBtn = document.getElementById(activeId);
  if (activeBtn) activeBtn.classList.add('active');

  const monthsBar = document.getElementById('monthsTabsBar');
  const instructorCard = document.getElementById('curriculumInstructorCard');

  if (level === 'beginner') {
    if (monthsBar) monthsBar.style.display = 'none';
    if (instructorCard) {
      instructorCard.innerHTML = `
        <div class="instructor-card-content">
          <div class="instructor-avatar-wrap">
            <span class="instructor-avatar-emoji">👩‍🏫</span>
            <span class="pulse-status-dot"></span>
          </div>
          <div class="instructor-details">
            <div class="instructor-name-row">
              <h3 class="instructor-name">អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)</h3>
              <span class="badge badge-emerald">✓ ថ្នាក់ដំបូង • English for Children</span>
            </div>
            <p class="instructor-bio">
              បង្រៀនកូនៗ និងប្អូនៗតាមក្បួន English for Children "១ ថ្ងៃ៖ ១ អក្សរ ១ ពាក្យ ១ ល្បះ" ច្បាស់លាស់ ងាយចាំ និងសប្បាយរីករាយបំផុត!
            </p>
            <div class="instructor-badges-list">
              <span class="pill-chip">🔤 ២៦ ថ្ងៃ (A ដល់ Z)</span>
              <span class="pill-chip">🍎 ១ ថ្ងៃ ១ ពាក្យ & Logo</span>
              <span class="pill-chip">💬 ១ ថ្ងៃ ១ ល្បះ & សន្ទនា</span>
              <span class="pill-chip">🔊 សំឡេងអ្នកគ្រូពិសិដ្ឋ AI</span>
            </div>
          </div>
        </div>
      `;
    }
    renderBeginnerWeeks();
  } else if (level === 'elementary') {
    if (monthsBar) monthsBar.style.display = 'flex';
    if (instructorCard) {
      instructorCard.innerHTML = `
        <div class="instructor-card-content">
          <div class="instructor-avatar-wrap">
            <span class="instructor-avatar-emoji">👩‍🏫</span>
            <span class="pulse-status-dot"></span>
          </div>
          <div class="instructor-details">
            <div class="instructor-name-row">
              <h3 class="instructor-name">អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)</h3>
              <span class="badge badge-emerald">✓ ថ្នាក់បឋមសិក្សា • Elementary Level</span>
            </div>
            <p class="instructor-bio">
              កម្មវិធីសិក្សា ៣ ខែពេញលេញ (៧២ ថ្ងៃ) ផ្តោតលើវេយ្យាករណ៍គ្រឹះ កិរិយាសព្ទ វាក្យសព្ទប្រចាំថ្ងៃ ការសន្ទនា និងការអនុវត្តជាក់ស្តែង ប្រកបដោយភាពរស់រវើក!
            </p>
            <div class="instructor-badges-list">
              <span class="pill-chip">📅 ៣ ខែ (៧២ ថ្ងៃ)</span>
              <span class="pill-chip">📘 វេយ្យាករណ៍គ្រឹះបឋម</span>
              <span class="pill-chip">🗣️ ការសន្ទនាជាក់ស្តែង</span>
              <span class="pill-chip">🎓 វិញ្ញាបនបត្រប្រចាំខែ & បញ្ចប់វគ្គ</span>
            </div>
          </div>
        </div>
      `;
    }
    renderElementaryMonthsTabs();
  } else {
    if (monthsBar) monthsBar.style.display = 'flex';
    if (instructorCard) {
      instructorCard.innerHTML = `
        <div class="instructor-card-content">
          <div class="instructor-avatar-wrap">
            <span class="instructor-avatar-emoji">👨‍🏫</span>
            <span class="pulse-status-dot"></span>
          </div>
          <div class="instructor-details">
            <div class="instructor-name-row">
              <h3 class="instructor-name">គ្រូសន (Teacher Sorn AI)</h3>
              <span class="badge badge-cyan">✓ ថ្នាក់ទូទៅ ១២ ខែ</span>
            </div>
            <p class="instructor-bio">
              នាយកវិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline • កម្មវិធីសិក្សាពេញលេញ ២៨៨ មេរៀន វេយ្យាករណ៍ សន្ទនា វាក្យសព្ទ កិរិយាសព្ទ និងកម្រិតខ្ពស់
            </p>
            <div class="instructor-badges-list">
              <span class="pill-chip">📘 វេយ្យាករណ៍ពេញលេញ</span>
              <span class="pill-chip">🗣️ សន្ទនាជាក់ស្តែង ៤៨ បរិបទ</span>
              <span class="pill-chip">⚡ ៤៨០ កិរិយាសព្ទ</span>
              <span class="pill-chip">🎓 វិញ្ញាបនបត្រ A4 ផ្តេក</span>
            </div>
          </div>
        </div>
      `;
    }
    renderMonthsTabs();
  }
}

function renderBeginnerWeeks() {
  const container = document.getElementById('curriculumWeeksContainer');
  if (!container) return;

  const course = STATE.beginnerCourse;
  if (!course || !course.weeks) {
    container.innerHTML = '<p class="text-muted">មិនទាន់មានទិន្នន័យថ្នាក់ដំបូងនៅឡើយទេ</p>';
    return;
  }

  const completed = STATE.currentUser?.completedLessons || {};
  const isAdmin = !!(STATE.currentUser?.isAdmin);
  const status = STATE.beginnerStatus;
  const passedLessons = new Set(status.passedLessons || []);
  const passedCount = status.passedCount || 0;
  const isGraduated = status.isGraduated || false;

  // Build flat lesson index (bl1 to bl26)
  const allLessons = [];
  course.weeks.forEach(w => w.lessons.forEach(l => allLessons.push({ wId: w.id, lid: l.id })));

  // Beginner Final Exam Card at top
  const finalPct = Math.round((passedCount / 26) * 100);
  const canTakeFinal = isAdmin || passedCount >= 26; // Admin bypasses prerequisite

  const finalExamHTML = `
    <div class="beginner-final-exam-card">
      <div class="final-exam-header">
        <div class="final-exam-icon">${isGraduated ? '🎓' : (isAdmin ? '🛡️' : '📜')}</div>
        <div class="final-exam-info">
          <h3>${isGraduated ? '✅ ប្រឡងបញ្ចប់ --- ជោគជ័យ!' : (isAdmin ? '🛡️ Admin View — ការប្រឡងបញ្ចប់ថ្នាក់ដំបូង' : 'ការប្រឡងបញ្ចប់ថ្នាក់ដំបូង')}</h3>
          <p>${isGraduated
            ? 'អ្នកបានសម្រេចថ្នាក់ដំបូង! ទទួលបានវិញ្ញាបនបត្រជោគជ័យ 🏆'
            : (isAdmin
                ? `🛡️ Admin ប្រឡងបញ្ចប់បានទាញយក (Bypass prerequisites) • សិស្សជាប់ ${passedCount}/26 ថ្ងៃ`
                : `ត្រូវប្រឡងជាប់គ្រប់ ២៦ ថ្ងៃ ទើបអាចប្រឡងបញ្ចប់ & ចូលរៀនថ្នាក់បន្ទាប់`)
          }</p>
        </div>
      </div>
      <div class="final-exam-progress">
        <div class="final-exam-progress-label">
          <span>ជ្រើសរើសថ្ងៃបានប្រឡងជាប់: ${passedCount}/26</span>
          <span>${finalPct}%</span>
        </div>
        <div class="final-exam-progress-bar">
          <div class="final-exam-progress-fill" style="width: ${isAdmin ? 100 : finalPct}%"></div>
        </div>
      </div>
      ${isGraduated
        ? `<div class="graduated-badge">🎓 ប្រឡងបញ្ចប់ជោគជ័យ! វិញ្ញាបនបត្រ: <strong>${status.beginnerCert?.certId || ' គ្មាន'}</strong></div>
           <button class="btn-final-exam" style="margin-top:10px" onclick="openCertificatePreview('${status.beginnerCert?.certId || ''}')">📜 មើលវិញ្ញាបនបត្រ</button>`
        : `<button class="btn-final-exam" ${!canTakeFinal ? 'disabled' : ''} onclick="startBeginnerFinalExam()">
            ${!canTakeFinal ? `🔒 ប្រឡងបញ្ចប់ (ខ្វះ ${26 - passedCount} ថ្ងៃ)` : (isAdmin ? '🛡️ Admin • ចូលប្រឡងបញ្ចប់ (20 សំណួរ)' : '🎓 ចូលប្រឡងបញ្ចប់ (20 សំណួរ)')}
           </button>`
      }
    </div>
  `;

  const weeksHTML = course.weeks.map(w => {
    const lessonsHTML = w.lessons.map((l, wLessonIdx) => {
      const dbKey = `beginner-${w.id}-${l.id}`;
      const isComp = !!completed[dbKey] || passedLessons.has(l.id);
      const grade = isComp ? (completed[dbKey]?.grade || 'A') : null;

      // Sequential lock: lesson N requires lesson N-1 passed
      // bl1 is always unlocked; bl2 requires bl1, etc.
      // ADMIN BYPASS: Admin sees all lessons unlocked
      const lessonNum = parseInt((l.id || '').replace('bl', ''));
      const isUnlocked = isAdmin || lessonNum <= 1 || passedLessons.has(`bl${lessonNum - 1}`);
      const isLocked = !isUnlocked;

      return `
        <div class="lesson-item-card beginner-lesson-item ${isComp ? 'completed' : ''} ${isLocked ? 'lesson-locked' : ''}" 
             onclick="${isLocked ? `showToast('🔒 ត្រូវប្រឡងជាប់ថ្ងៃទី${lessonNum - 1} ជាមុន!', 'warning')` : `openLesson('beginner', '${w.id}', '${l.id}')`}">
          <div class="l-info">
            <div class="l-title">${isLocked ? '🔒 ' : (isAdmin && !isComp ? '🛡️ ' : '')}${l.title}</div>
            <div class="l-status">${isComp ? `✅ ជាប់និទ្ទេស ${grade}` : (isLocked ? '🔒 ចាំប្រឡងថ្ងៃកន្លងទៅ' : (isAdmin ? '🛡️ Admin • ចូលបានភ្លាម' : '📖 ១ ថ្ងៃ ១ អក្សរ ១ ពាក្យ ១ ល្បះ'))}</div>
          </div>
          <div class="l-icon">${isComp ? '🏆' : (isLocked ? '🔒' : (isAdmin ? '🛡️' : '➡️'))}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="week-card glass-panel beginner-week-card">
        <div class="week-header">
          <div class="week-title-wrap">
            <div class="week-title">📅 ${w.title} (${w.lessons.length} ថ្ងៃ)</div>
            ${w.description ? `<div class="week-desc text-xs text-slate-400 mt-0.5">${w.description}</div>` : ''}
          </div>
          <span class="badge ${isAdmin ? 'badge-amber' : 'badge-emerald'}">${isAdmin ? '🛡️ Admin View' : '👩‍🏫 អ្នកគ្រូ ពិសិដ្ឋ AI'}</span>
        </div>
        <div class="lessons-grid">${lessonsHTML}</div>
      </div>
    `;
  }).join('');

  container.innerHTML = finalExamHTML + weeksHTML;
}

async function startBeginnerFinalExam() {
  const userId = STATE.currentUser?.id;
  if (!userId) { showToast('❌ ត្រូវ Login ជាមុន', 'error'); return; }

  try {
    showToast('⏳ កំពុងរៀបចំវិញ្ញាសាប្រឡងបញ្ចប់ (20 សំណួរ)...', 'info');
    const res = await fetch(`/api/quiz/start?type=beginner_final&userId=${userId}`);
    const data = await res.json();

    if (!data.success) {
      if (data.isLocked) {
        showToast(data.error, 'error', 5000);
        return;
      }
      throw new Error(data.error || 'Failed to start final exam');
    }

    STATE.isBeginnerFinalExam = true;
    launchQuizEngine(data, 'BEGINNER FINAL EXAM');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function renderElementaryMonthsTabs() {
  const bar = document.getElementById('monthsTabsBar');
  if (!bar) return;
  bar.innerHTML = '';

  const course = STATE.elementaryCourse;
  if (!course || !course.months) {
    bar.innerHTML = '<span class="text-sm text-slate-400">កំពុងទាញយកទិន្នន័យថ្នាក់បឋមសិក្សា...</span>';
    return;
  }

  course.months.forEach(m => {
    const btn = document.createElement('button');
    btn.className = `month-tab-pill ${m.id === STATE.selectedElementaryMonthId ? 'active' : ''}`;
    btn.textContent = m.title;
    btn.onclick = () => {
      STATE.selectedElementaryMonthId = m.id;
      renderElementaryMonthsTabs();
      renderElementaryWeeks();
    };
    bar.appendChild(btn);
  });

  renderElementaryWeeks();
}

function renderElementaryWeeks() {
  const container = document.getElementById('curriculumWeeksContainer');
  if (!container) return;

  const course = STATE.elementaryCourse;
  if (!course || !course.months) {
    container.innerHTML = '<p class="text-muted">មិនទាន់មានទិន្នន័យថ្នាក់បឋមសិក្សានៅឡើយទេ</p>';
    return;
  }

  const currentMonth = course.months.find(m => m.id === STATE.selectedElementaryMonthId) || course.months[0];
  if (!currentMonth) return;

  const monthNum = currentMonth.monthNumber || (currentMonth.id === 'em1' ? 1 : (currentMonth.id === 'em2' ? 2 : 3));
  const startDay = (monthNum - 1) * 24 + 1;
  const endDay = monthNum * 24;

  const completed = STATE.currentUser?.completedLessons || {};
  const isAdmin = !!(STATE.currentUser?.isAdmin || STATE.currentUser?.id === '240224709' || STATE.currentUser?.telegramId === 240224709);
  const status = STATE.elementaryStatus || {};
  const passedLessons = new Set(status.passedLessons || []);

  // Calculate passed in this month (out of 24)
  let passedInMonth = 0;
  for (let d = startDay; d <= endDay; d++) {
    if (passedLessons.has(`el${d}`)) passedInMonth++;
  }
  const monthPct = Math.round((passedInMonth / 24) * 100);

  // Month certification status
  let isMonthCertPassed = false;
  let monthCert = null;
  if (monthNum === 1) {
    isMonthCertPassed = !!status.month1Passed || !!status.m1Cert;
    monthCert = status.m1Cert;
  } else if (monthNum === 2) {
    isMonthCertPassed = !!status.month2Passed || !!status.m2Cert;
    monthCert = status.m2Cert;
  } else if (monthNum === 3) {
    isMonthCertPassed = !!status.isGraduated || !!status.gradCert;
    monthCert = status.gradCert;
  }

  const canTakeExam = isAdmin || passedInMonth >= 24;

  const examTitles = {
    1: 'ការប្រឡងប្រចាំខែទី ១ • Month 1 Progress Exam',
    2: 'ការប្រឡងប្រចាំខែទី ២ • Month 2 Progress Exam',
    3: 'ការប្រឡងបញ្ចប់វគ្គបឋមសិក្សា • Elementary Graduation Exam'
  };
  const qCount = monthNum === 3 ? 25 : 20;

  const examCardHTML = `
    <div class="beginner-final-exam-card" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(6, 182, 212, 0.12)); border: 1px solid rgba(16, 185, 129, 0.3);">
      <div class="final-exam-header">
        <div class="final-exam-icon">${isMonthCertPassed ? '🎓' : (isAdmin ? '🛡️' : '📜')}</div>
        <div class="final-exam-info">
          <h3>${isMonthCertPassed ? `✅ ${examTitles[monthNum]} --- ជោគជ័យ!` : (isAdmin ? `🛡️ Admin View — ${examTitles[monthNum]}` : examTitles[monthNum])}</h3>
          <p>${isMonthCertPassed
            ? `អ្នកបានសម្រេចខែទី ${monthNum}! ទទួលបានវិញ្ញាបនបត្រជោគជ័យ 🏆`
            : (isAdmin
                ? `🛡️ Admin ប្រឡងបានភ្លាម (Bypass prerequisites) • សិស្សជាប់ ${passedInMonth}/24 ថ្ងៃនៃខែនេះ`
                : `ត្រូវប្រឡងជាប់គ្រប់ ២៤ ថ្ងៃនៃខែនេះ ទើបអាចប្រឡង & ទទួលបានវិញ្ញាបនបត្រ`)
          }</p>
        </div>
      </div>
      <div class="final-exam-progress">
        <div class="final-exam-progress-label">
          <span>ថ្ងៃបានប្រឡងជាប់ក្នុងខែទី ${monthNum}: ${passedInMonth}/24</span>
          <span>${monthPct}%</span>
        </div>
        <div class="final-exam-progress-bar">
          <div class="final-exam-progress-fill" style="width: ${isAdmin ? 100 : monthPct}%"></div>
        </div>
      </div>
      ${isMonthCertPassed && monthCert?.certId
        ? `<div class="graduated-badge">🎓 ប្រឡងជាប់ជោគជ័យ! វិញ្ញាបនបត្រ: <strong>${monthCert.certId}</strong></div>
           <button class="btn-final-exam" style="margin-top:10px" onclick="openCertificatePreview('${monthCert.certId}')">📜 មើលវិញ្ញាបនបត្រ</button>`
        : `<button class="btn-final-exam" ${!canTakeExam ? 'disabled' : ''} onclick="startElementaryExam(${monthNum})">
            ${!canTakeExam 
              ? `🔒 ប្រឡងបញ្ចប់ខែទី ${monthNum} (ខ្វះ ${24 - passedInMonth} ថ្ងៃ)` 
              : (isAdmin ? `🛡️ Admin • ចូលប្រឡង (${qCount} សំណួរ)` : `🎓 ចូលប្រឡង (${qCount} សំណួរ)`)}
           </button>`
      }
    </div>
  `;

  const weeksHTML = currentMonth.weeks.map(w => {
    const lessonsHTML = w.lessons.map(l => {
      const lessonNum = parseInt((l.id || '').replace('el', ''));
      const isComp = passedLessons.has(l.id) || !!completed[`elementary-${w.id}-${l.id}`] || !!completed[`${currentMonth.id}-${w.id}-${l.id}`];
      const grade = isComp ? (completed[`elementary-${w.id}-${l.id}`]?.grade || completed[`${currentMonth.id}-${w.id}-${l.id}`]?.grade || 'A') : null;

      // Sequential lock: lesson N requires lesson N-1 passed
      // el1 is always unlocked; el2 requires el1, etc.
      const isUnlocked = isAdmin || lessonNum <= 1 || passedLessons.has(`el${lessonNum - 1}`);
      const isLocked = !isUnlocked;

      return `
        <div class="lesson-item-card beginner-lesson-item ${isComp ? 'completed' : ''} ${isLocked ? 'lesson-locked' : ''}" 
             onclick="${isLocked ? `showToast('🔒 ត្រូវប្រឡងជាប់ថ្ងៃទី${lessonNum - 1} ជាមុន!', 'warning')` : `openLesson('${currentMonth.id}', '${w.id}', '${l.id}')`}">
          <div class="l-info">
            <div class="l-title">${isLocked ? '🔒 ' : (isAdmin && !isComp ? '🛡️ ' : '')}${l.title}</div>
            <div class="l-status">${isComp ? `✅ ជាប់និទ្ទេស ${grade}` : (isLocked ? '🔒 ចាំប្រឡងថ្ងៃកន្លងទៅ' : (isAdmin ? '🛡️ Admin • ចូលបានភ្លាម' : `📖 ${l.content?.grammar?.title || 'វេយ្យាករណ៍ & វាក្យសព្ទ'}`))}</div>
          </div>
          <div class="l-icon">${isComp ? '🏆' : (isLocked ? '🔒' : (isAdmin ? '🛡️' : '➡️'))}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="week-card glass-panel beginner-week-card">
        <div class="week-header">
          <div class="week-title-wrap">
            <div class="week-title">📅 ${w.title} (${w.lessons.length} ថ្ងៃ)</div>
            ${w.description ? `<div class="week-desc text-xs text-slate-400 mt-0.5">${w.description}</div>` : ''}
          </div>
          <span class="badge ${isAdmin ? 'badge-amber' : 'badge-emerald'}">${isAdmin ? '🛡️ Admin View' : '👩‍🏫 អ្នកគ្រូ ពិសិដ្ឋ AI'}</span>
        </div>
        <div class="lessons-grid">${lessonsHTML}</div>
      </div>
    `;
  }).join('');

  container.innerHTML = examCardHTML + weeksHTML;
}

async function startElementaryExam(monthNum) {
  const userId = STATE.currentUser?.id;
  if (!userId) { showToast('❌ ត្រូវ Login ជាមុន', 'error'); return; }

  try {
    const examTitles = {
      1: 'ខែទី ១ (20 សំណួរ)',
      2: 'ខែទី ២ (20 សំណួរ)',
      3: 'បញ្ចប់វគ្គបឋមសិក្សា (25 សំណួរ)'
    };
    showToast(`⏳ កំពុងរៀបចំវិញ្ញាសាប្រឡង ${examTitles[monthNum] || ''}...`, 'info');
    const res = await fetch(`/api/quiz/start?type=elementary_exam&month=${monthNum}&userId=${userId}`);
    const data = await res.json();

    if (!data.success) {
      if (data.isLocked) {
        showToast(data.error, 'error', 5000);
        return;
      }
      throw new Error(data.error || 'Failed to start elementary exam');
    }

    STATE.isElementaryExam = true;
    STATE.elementaryExamMonth = monthNum;
    launchQuizEngine(data, monthNum === 3 ? 'ELEMENTARY GRADUATION' : `ELEMENTARY MONTH ${monthNum}`);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function renderMonthsTabs() {
  const bar = document.getElementById('monthsTabsBar');
  if (!bar) return;
  bar.innerHTML = '';

  STATE.curriculum.forEach(m => {
    const btn = document.createElement('button');
    btn.className = `month-tab-pill ${m.id === STATE.selectedMonthId ? 'active' : ''}`;
    btn.textContent = m.title;
    btn.onclick = () => {
      STATE.selectedMonthId = m.id;
      renderMonthsTabs();
      renderCurriculumWeeks();
    };
    bar.appendChild(btn);
  });

  renderCurriculumWeeks();
}

function renderCurriculumWeeks() {
  const container = document.getElementById('curriculumWeeksContainer');
  if (!container) return;

  const currentMonth = STATE.curriculum.find(m => m.id === STATE.selectedMonthId);
  if (!currentMonth) {
    container.innerHTML = '<p class="text-muted">មិនមានទិន្នន័យខែនេះទេ</p>';
    return;
  }

  const completed = STATE.currentUser?.completedLessons || {};
  const isAdmin = !!(STATE.currentUser?.isAdmin);

  // Build global ordered lesson list for sequential lock checking
  const globalOrder = [];
  STATE.curriculum.forEach(m => {
    (m.weeks || []).forEach(w => {
      (w.lessons || []).forEach(l => {
        globalOrder.push(`${m.id}-${w.id}-${l.id}`);
      });
    });
  });

  container.innerHTML = currentMonth.weeks.map(w => `
    <div class="week-card glass-panel">
      <div class="week-header">
        <div class="week-title">📅 ${w.title} (${w.lessons.length} មេរៀន)</div>
        ${isAdmin ? '<span class="badge badge-amber">🛡️ Admin View</span>' : ''}
      </div>
      <div class="lessons-grid">
        ${w.lessons.map(l => {
          const key = `${currentMonth.id}-${w.id}-${l.id}`;
          const isComp = !!completed[key];
          const grade = isComp ? completed[key].grade || 'A' : null;

          // Admin bypasses all locks
          let isLocked = false;
          if (!isAdmin) {
            const globalIdx = globalOrder.indexOf(key);
            if (globalIdx > 0) {
              const prevKey = globalOrder[globalIdx - 1];
              isLocked = !completed[prevKey];
            }
          }

          return `
            <div class="lesson-item-card ${isComp ? 'completed' : ''} ${isLocked ? 'lesson-locked' : ''}"
                 onclick="${isLocked
                   ? `showToast('🔒 ត្រូវប្រឡងជាប់មេរៀនមុនសិន ទើបអាចរៀននេះបាន!', 'warning')`
                   : `openLesson('${currentMonth.id}', '${w.id}', '${l.id}')`}">
              <div class="l-info">
                <div class="l-title">${isLocked ? '🔒 ' : (isAdmin && !isComp ? '🛡️ ' : '')}${l.title}</div>
                <div class="l-status">${isComp ? `✅ ជាប់និទ្ទេស ${grade}` : (isLocked ? '🔒 ចាំប្រឡងជាប់មេរៀនមុន' : (isAdmin ? '🛡️ Admin • ចូលបានភ្លាម' : '📖 ចុចដើម្បីរៀន'))}</div>
              </div>
              <div class="l-icon">${isComp ? '🏆' : (isLocked ? '🔒' : (isAdmin ? '🛡️' : '➡️'))}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');
}


// Global Audio Cache for Word & Expression clicks
const wordAudioCache = new Map();
let currentWordAudio = null;
let currentActiveWordBtn = null;

async function speakEnglish(text, btnElement, customTutor) {
  if (!text) return;
  const clean = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
                    .replace(/[()"]/g, '').trim();
  if (!clean) return;

  // Determine tutor: beginner & elementary classes use Teacher Piseth (Female Voice)
  const isElementary = STATE.currentLesson?.monthId === 'elementary' || (STATE.currentLesson?.monthId && STATE.currentLesson.monthId.startsWith('em')) || STATE.courseLevel === 'elementary';
  const isBeginner = STATE.currentLesson?.monthId === 'beginner' || STATE.courseLevel === 'beginner' || isElementary || STATE.activeTutor === 'piseth';
  const tutor = customTutor || (isBeginner ? 'piseth' : (STATE.activeTutor || 'sorn'));
  const hasKhmer = /[\u1780-\u17FF]/.test(clean);
  const lang = hasKhmer ? 'km' : 'en';

  const cacheKey = `${tutor}_${lang}_${clean}`;

  // Reset previously playing button style
  if (currentActiveWordBtn && currentActiveWordBtn !== btnElement) {
    currentActiveWordBtn.classList.remove('playing', 'piseth');
  }

  // Stop any currently playing word audio
  if (currentWordAudio) {
    try {
      currentWordAudio.pause();
      currentWordAudio.currentTime = 0;
    } catch (e) {}
    currentWordAudio = null;
  }

  const setBtnPlaying = () => {
    if (btnElement) {
      currentActiveWordBtn = btnElement;
      btnElement.classList.add('playing');
      if (tutor === 'piseth') btnElement.classList.add('piseth');
    }
  };

  const clearBtnPlaying = () => {
    if (btnElement) {
      btnElement.classList.remove('playing', 'piseth');
      if (currentActiveWordBtn === btnElement) currentActiveWordBtn = null;
    }
  };

  // 1. Play from local cache if already fetched
  if (wordAudioCache.has(cacheKey)) {
    const audioUrl = wordAudioCache.get(cacheKey);
    currentWordAudio = new Audio(audioUrl);
    setBtnPlaying();
    currentWordAudio.onended = clearBtnPlaying;
    currentWordAudio.onerror = clearBtnPlaying;
    currentWordAudio.play().catch(e => {
      clearBtnPlaying();
      console.warn('Word audio cached playback error:', e);
    });
    return;
  }

  // 2. Fetch high quality neural voice from Edge TTS API
  try {
    setBtnPlaying();
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: clean,
        lang: lang,
        tutor: tutor
      })
    });

    if (res.ok) {
      const blob = await res.blob();
      const audioUrl = URL.createObjectURL(blob);
      wordAudioCache.set(cacheKey, audioUrl);
      currentWordAudio = new Audio(audioUrl);
      currentWordAudio.onended = clearBtnPlaying;
      currentWordAudio.onerror = clearBtnPlaying;
      currentWordAudio.play().catch(e => {
        clearBtnPlaying();
        console.warn('Word audio playback error:', e);
      });
      return;
    }
  } catch (err) {
    console.warn('Server TTS failed for word, fallback to speech synthesis:', err);
  }

  // 3. Fallback to Browser SpeechSynthesis with Female voice preference
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = hasKhmer ? 'km-KH' : 'en-US';
    u.rate = 0.88;

    if (tutor === 'piseth') {
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => 
        (v.lang.startsWith('en') || (hasKhmer && v.lang.startsWith('km'))) &&
        (v.name.includes('Female') || v.name.includes('Jenny') || v.name.includes('Zira') || 
         v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Karen') || 
         v.name.includes('Natural') || v.name.includes('Google US English'))
      );
      if (femaleVoice) u.voice = femaleVoice;
    }
    u.onend = clearBtnPlaying;
    u.onerror = clearBtnPlaying;
    window.speechSynthesis.speak(u);
  } else {
    clearBtnPlaying();
  }
}

function fillPracticeChat(text) {
  const input = document.getElementById('chatInput');
  if (input) {
    input.value = `គ្រូជួយកែ និងពន្យល់លំហាត់នេះផង៖\n${text}`;
    input.focus();
  }
}

// ==========================================
// VISUAL WORD LOGO MAPPING SYSTEM
// Maps vocabulary words to representative logos/emblems
// ==========================================
const WORD_LOGO_MAP = {
  // Animals
  'cat': '🐱', 'cats': '🐱', 'kitten': '🐱',
  'dog': '🐶', 'dogs': '🐶', 'puppy': '🐶',
  'bird': '🐦', 'birds': '🐦',
  'fish': '🐟', 'fishes': '🐟',
  'duck': '🦆', 'ducks': '🦆',
  'elephant': '🐘', 'elephants': '🐘',
  'lion': '🦁', 'lions': '🦁',
  'tiger': '🐯', 'tigers': '🐯',
  'monkey': '🐵', 'monkeys': '🐵',
  'bear': '🐻', 'bears': '🐻',
  'rabbit': '🐰', 'rabbits': '🐰', 'bunny': '🐰',
  'cow': '🐮', 'cows': '🐮',
  'pig': '🐷', 'pigs': '🐷',
  'horse': '🐴', 'horses': '🐴',
  'sheep': '🐑', 'goat': '🐐',
  'chicken': '🐔', 'rooster': '🐓',
  'frog': '🐸', 'frogs': '🐸',
  'snake': '🐍', 'snakes': '🐍',
  'bee': '🐝', 'bees': '🐝',
  'ant': '🐜', 'ants': '🐜',
  'butterfly': '🦋', 'butterflies': '🦋',
  'turtle': '🐢', 'turtles': '🐢',
  'zebra': '🦓', 'zebras': '🦓',
  'zoo': '🦁',
  'mouse': '🐭', 'rat': '🐀',
  'spider': '🕷️', 'whale': '🐋', 'shark': '🦈',

  // Foods, Fruits & Drinks
  'apple': '🍎', 'apples': '🍎',
  'banana': '🍌', 'bananas': '🍌',
  'orange': '🍊', 'oranges': '🍊',
  'grape': '🍇', 'grapes': '🍇',
  'strawberry': '🍓', 'strawberries': '🍓',
  'watermelon': '🍉',
  'lemon': '🍋', 'lemons': '🍋', 'lime': '🍋',
  'mango': '🥭', 'pineapple': '🍍',
  'cherry': '🍒', 'peach': '🍑', 'pear': '🍐',
  'coconut': '🥥', 'avocado': '🥑',
  'tomato': '🍅', 'potato': '🥔', 'carrot': '🥕', 'carrots': '🥕',
  'corn': '🌽', 'mushroom': '🍄',
  'egg': '🥚', 'eggs': '🥚',
  'bread': '🍞', 'toast': '🍞',
  'rice': '🍚', 'noodle': '🍜', 'noodles': '🍜',
  'pizza': '🍕', 'burger': '🍔', 'hamburger': '🍔',
  'sandwich': '🥪', 'cheese': '🧀',
  'meat': '🥩', 'beef': '🥩', 'pork': '🥩',
  'soup': '🍲', 'salad': '🥗',
  'cake': '🎂', 'cookie': '🍪', 'cookies': '🍪',
  'ice cream': '🍦', 'chocolate': '🍫', 'candy': '🍬',
  'coffee': '☕', 'tea': '🍵',
  'milk': '🥛', 'water': '💧',
  'juice': '🧃', 'wine': '🍷', 'beer': '🍺',
  'breakfast': '🍳', 'lunch': '🍱', 'dinner': '🍽️',
  'food': '🍲', 'drink': '🥤',

  // Objects, School & Home
  'book': '📖', 'books': '📖', 'notebook': '📓',
  'pen': '🖊️', 'pens': '🖊️',
  'pencil': '✏️', 'pencils': '✏️',
  'bag': '🎒', 'backpack': '🎒',
  'eraser': '🧼', 'ruler': '📏', 'scissors': '✂️',
  'paper': '📄', 'letter': '✉️',
  'desk': '🪑', 'table': '🪵', 'chair': '🪑',
  'door': '🚪', 'window': '🪟',
  'bed': '🛏️', 'box': '📦',
  'cup': '☕', 'glass': '🥛', 'bottle': '🍾',
  'plate': '🍽️', 'bowl': '🥣', 'fork': '🍴', 'spoon': '🥄', 'knife': '🔪',
  'umbrella': '☂️', 'clock': '⏰', 'watch': '⌚',
  'key': '🔑', 'keys': '🔑', 'lock': '🔒',
  'light': '💡', 'lamp': '🛋️',
  'phone': '📱', 'telephone': '☎️',
  'computer': '💻', 'laptop': '💻',
  'camera': '📷', 'radio': '📻', 'tv': '📺', 'television': '📺',
  'mirror': '🪞', 'soap': '🧼', 'towel': '🧺',

  // Clothes & Accessories
  'hat': '👒', 'hats': '👒', 'cap': '🧢',
  'shirt': '👕', 'shirts': '👕', 't-shirt': '👕',
  'pants': '👖', 'trousers': '👖', 'jeans': '👖',
  'dress': '👗', 'skirt': '👗',
  'coat': '🧥', 'jacket': '🧥', 'sweater': '🧥',
  'suit': '👔', 'tie': '👔',
  'shoes': '👟', 'shoe': '👟', 'sneakers': '👟', 'boots': '👢',
  'socks': '🧦', 'gloves': '🧤', 'scarf': '🧣',
  'glasses': '👓', 'sunglasses': '🕶️',
  'ring': '💍', 'necklace': '📿',

  // Nature, Weather & Places
  'sun': '☀️', 'moon': '🌙', 'star': '⭐', 'stars': '⭐',
  'sky': '🌤️', 'cloud': '☁️', 'clouds': '☁️',
  'rain': '🌧️', 'snow': '❄️', 'wind': '💨',
  'storm': '⛈️', 'rainbow': '🌈',
  'tree': '🌳', 'trees': '🌳', 'plant': '🌱',
  'flower': '🌸', 'flowers': '🌸', 'rose': '🌹',
  'grass': '🌿', 'leaf': '🍃', 'leaves': '🍃',
  'forest': '🌲', 'mountain': '⛰️', 'hill': '🏔️',
  'river': '🌊', 'lake': '🏞️', 'sea': '🌊', 'ocean': '🌊', 'beach': '🏖️',
  'fire': '🔥', 'earth': '🌍', 'world': '🌐',
  'house': '🏠', 'home': '🏡',
  'school': '🏫', 'classroom': '🏫', 'university': '🏛️',
  'hospital': '🏥', 'airport': '✈️', 'station': '🚉',
  'hotel': '🏨', 'restaurant': '🍽️', 'cafe': '☕',
  'bank': '🏦', 'park': '🏞️', 'shop': '🏪', 'market': '🛒',
  'city': '🏙️', 'town': '🏘️', 'village': '🏡',
  'road': '🛣️', 'street': '🚦', 'bridge': '🌉',

  // People & Family
  'teacher': '👩‍🏫', 'teachers': '👩‍🏫',
  'student': '🧑‍🎓', 'students': '🧑‍🎓',
  'doctor': '👨‍⚕️', 'nurse': '👩‍⚕️',
  'police': '👮', 'chef': '👨‍🍳', 'cook': '👨‍🍳',
  'driver': '🚗', 'pilot': '👨‍✈️', 'farmer': '👨‍🌾',
  'singer': '🎤', 'dancer': '💃',
  'king': '👑', 'queen': '👸', 'prince': '🤴', 'princess': '👸',
  'baby': '👶', 'child': '🧒', 'children': '🧒', 'kid': '🧒',
  'boy': '👦', 'boys': '👦',
  'girl': '👧', 'girls': '👧',
  'man': '👨', 'men': '👨',
  'woman': '👩', 'women': '👩',
  'father': '👨', 'dad': '👨',
  'mother': '👩', 'mom': '👩',
  'parent': '👨‍👩‍👧', 'parents': '👨‍👩‍👧',
  'brother': '👦', 'sister': '👧',
  'son': '👦', 'daughter': '👧',
  'grandfather': '👴', 'grandpa': '👴',
  'grandmother': '👵', 'grandma': '👵',
  'family': '👨‍👩‍👧‍👦', 'friend': '🤝', 'friends': '🧑‍🤝‍🧑',

  // Colors
  'red': '🔴', 'blue': '🔵', 'yellow': '🟡', 'green': '🟢',
  'orange color': '🟠', 'pink': '🌸', 'purple': '🟣',
  'black': '⚫', 'white': '⚪', 'brown': '🟤', 'gray': '🔘', 'grey': '🔘',
  'gold': '🪙', 'silver': '🥈', 'color': '🎨', 'colors': '🎨',

  // Shapes & Geometry
  'circle': '⭕', 'square': '⬛', 'triangle': '🔺',
  'rectangle': '▭', 'heart': '❤️', 'diamond': '💎',

  // Numbers
  'one': '1️⃣', 'two': '2️⃣', 'three': '3️⃣', 'four': '4️⃣', 'five': '5️⃣',
  'six': '6️⃣', 'seven': '7️⃣', 'eight': '8️⃣', 'nine': '9️⃣', 'ten': '🔟',
  'eleven': '1️⃣1️⃣', 'twelve': '1️⃣2️⃣', 'twenty': '2️⃣0️⃣',
  'thirty': '3️⃣0️⃣', 'forty': '4️⃣0️⃣', 'fifty': '5️⃣0️⃣',
  'hundred': '💯', 'one hundred': '💯', 'number': '🔢', 'numbers': '🔢',

  // Verbs & Actions
  'eat': '🍴', 'drink': '🥤',
  'run': '🏃', 'walk': '🚶',
  'sleep': '😴', 'wake': '⏰',
  'read': '📖', 'write': '✍️',
  'speak': '🗣️', 'talk': '🗣️', 'say': '💬',
  'listen': '🎧', 'hear': '👂',
  'see': '👁️', 'look': '👀', 'watch': '📺',
  'sing': '🎤', 'dance': '💃',
  'jump': '🦘', 'fly': '✈️', 'swim': '🏊',
  'drive': '🚗', 'ride': '🚲',
  'play': '🎮', 'study': '📚', 'learn': '🧠', 'teach': '👩‍🏫',
  'work': '💼', 'buy': '🛍️', 'sell': '🏷️',
  'help': '🤝', 'smile': '😊', 'laugh': '😄', 'cry': '😢',
  'clean': '✨', 'wash': '🧼', 'open': '🔓', 'close': '🔒',
  'love': '❤️', 'like': '👍', 'go': '🚶', 'come': '🏃',

  // Feelings & States
  'happy': '😊', 'glad': '😊',
  'sad': '😢', 'angry': '😠', 'mad': '😠',
  'tired': '🥱', 'sleepy': '😴',
  'hungry': '😋', 'thirsty': '🥤',
  'hot': '♨️', 'cold': '❄️', 'warm': '☀️', 'cool': '🍃',
  'big': '🐘', 'large': '🐘', 'small': '🐜', 'little': '🐜',
  'tall': '🦒', 'short': '🌱',
  'fast': '⚡', 'quick': '⚡', 'slow': '🐢',
  'good': '👍', 'great': '🌟', 'nice': '✨', 'bad': '👎',
  'beautiful': '🌸', 'pretty': '🌸',

  // Greetings & Courtesies
  'hello': '👋', 'hi': '👋',
  'good morning': '🌅', 'good afternoon': '☀️', 'good evening': '🌇', 'good night': '🌙',
  'goodbye': '👋', 'bye': '👋',
  'thank you': '🙏', 'thanks': '🙏',
  'please': '🙏', 'welcome': '😊', 'sorry': '🙇',
  'yes': '✅', 'no': '❌', 'question': '❓', 'answer': '💡'
};

function getWordVisualLogo(enText, khText) {
  if (!enText && !khText) return '🔤';

  // 1. Direct match on clean English word
  const cleanEn = (enText || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim();
  
  if (WORD_LOGO_MAP[cleanEn]) {
    return WORD_LOGO_MAP[cleanEn];
  }

  // 2. Check individual words in English string
  const words = cleanEn.split(/\s+/).filter(Boolean);
  for (const w of words) {
    if (WORD_LOGO_MAP[w]) {
      return WORD_LOGO_MAP[w];
    }
  }

  // 3. Substring check on English
  for (const [key, logo] of Object.entries(WORD_LOGO_MAP)) {
    if (key.length >= 3 && cleanEn.includes(key)) {
      return logo;
    }
  }

  // 4. Khmer keyword matching fallback
  const kh = khText || '';
  if (kh.includes('ប៉ោម')) return '🍎';
  if (kh.includes('សៀវភៅ')) return '📖';
  if (kh.includes('ឆ្មា')) return '🐱';
  if (kh.includes('ឆ្កែ')) return '🐶';
  if (kh.includes('ពងមាន់') || kh.includes('ស៊ុត')) return '🥚';
  if (kh.includes('ត្រី')) return '🐟';
  if (kh.includes('ក្មេងស្រី')) return '👧';
  if (kh.includes('ក្មេងប្រុស')) return '👦';
  if (kh.includes('មួក')) return '👒';
  if (kh.includes('ផ្ទះ')) return '🏠';
  if (kh.includes('ទឹកដោះគោ')) return '🥛';
  if (kh.includes('ទឹកផ្លែឈើ')) return '🧃';
  if (kh.includes('ទឹក')) return '💧';
  if (kh.includes('ស្តេច')) return '👑';
  if (kh.includes('តោ')) return '🦁';
  if (kh.includes('ច្រមុះ')) return '👃';
  if (kh.includes('ក្រូច')) return '🍊';
  if (kh.includes('ប៊ិច')) return '🖊️';
  if (kh.includes('ខ្មៅដៃ')) return '✏️';
  if (kh.includes('ក្សត្រិយានី')) return '👸';
  if (kh.includes('ទន្សាយ')) return '🐰';
  if (kh.includes('ព្រះអាទិត្យ')) return '☀️';
  if (kh.includes('ខ្លា')) return '🐯';
  if (kh.includes('ដើមឈើ')) return '🌳';
  if (kh.includes('ឆ័ត្រ')) return '☂️';
  if (kh.includes('ប្រអប់')) return '📦';
  if (kh.includes('សេះបង្កង់')) return '🦓';
  if (kh.includes('សួនសត្វ')) return '🦁';
  if (kh.includes('គ្រែ')) return '🛏️';
  if (kh.includes('ជ្រូក')) return '🐷';
  if (kh.includes('ក្តៅ')) return '♨️';
  if (kh.includes('ពែង')) return '☕';
  if (kh.includes('ធំ')) return '🐘';
  if (kh.includes('តូច')) return '🐜';
  if (kh.includes('សួស្តី') || kh.includes('ជម្រាបសួរ')) return '👋';
  if (kh.includes('អរគុណ')) return '🙏';
  if (kh.includes('លាហើយ')) return '👋';
  if (kh.includes('ក្រហម')) return '🔴';
  if (kh.includes('ខៀវ')) return '🔵';
  if (kh.includes('លឿង')) return '🟡';
  if (kh.includes('បៃតង')) return '🟢';
  if (kh.includes('ស')) return '⚪';
  if (kh.includes('ខ្មៅ')) return '⚫';
  if (kh.includes('ផ្កាឈូក')) return '🌸';
  if (kh.includes('ស្វាយ')) return '🟣';
  if (kh.includes('រង្វង់')) return '⭕';
  if (kh.includes('ការ៉េ')) return '⬛';
  if (kh.includes('ត្រីកោណ')) return '🔺';
  if (kh.includes('ផ្កាយ')) return '⭐';
  if (kh.includes('មេឃ')) return '🌤️';
  if (kh.includes('ស្មៅ')) return '🌿';
  if (kh.includes('ផ្កា')) return '🌸';
  if (kh.includes('ស្លឹក')) return '🍃';
  if (kh.includes('សាលា') || kh.includes('ថ្នាក់')) return '🏫';
  if (kh.includes('គ្រូ') || kh.includes('អ្នកគ្រូ')) return '👩‍🏫';
  if (kh.includes('សិស្ស')) return '🧑‍🎓';
  if (kh.includes('ឡាន')) return '🚗';
  if (kh.includes('កង់')) return '🚲';
  if (kh.includes('យន្តហោះ')) return '✈️';
  if (kh.includes('រត់')) return '🏃';
  if (kh.includes('ដើរ')) return '🚶';
  if (kh.includes('ញ៉ាំ') || kh.includes('ហូប')) return '🍴';
  if (kh.includes('ផឹក')) return '🥤';
  if (kh.includes('ដេក')) return '😴';
  if (kh.includes('អាន')) return '📖';
  if (kh.includes('សរសេរ')) return '✍️';
  if (kh.includes('និយាយ')) return '🗣️';
  if (kh.includes('ស្តាប់')) return '🎧';
  if (kh.includes('មើល')) return '👁️';
  if (kh.includes('លេង')) return '🎮';

  // 5. Fallback letter emblem if word starts with alphabet
  const firstLetter = cleanEn.charAt(0).toUpperCase();
  if (firstLetter && /[A-Z]/.test(firstLetter)) {
    return `<span class="letter-monogram">${firstLetter}</span>`;
  }

  return '🔤';
}

function renderProfessionalLessonHTML(rawText) {
  if (!rawText) return '';

  const escapeAttr = (str) => (str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const sections = rawText.split(/═{10,}/g).map(s => s.trim()).filter(Boolean);

  let html = `<div class="pro-lesson-container">`;

  // Header banner
  if (sections.length > 0) {
    const headerLines = sections[0].split('\n').map(l => l.trim()).filter(Boolean);
    const bannerTitle = headerLines[0] || '📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ StudyAI';
    const levelInfo = headerLines.find(l => l.startsWith('📌')) || '';
    const topicInfo = headerLines.find(l => l.startsWith('🎯') || l.startsWith('🗣️') || l.startsWith('📖') || l.startsWith('🔥') || l.startsWith('✨')) || '';
    const situationInfo = headerLines.find(l => l.startsWith('📍')) || '';

    html += `
      <div class="pro-academy-banner">
        <div class="pro-banner-left">
          <span>🎓 ${bannerTitle.replace(/^📚\s*/, '')}</span>
        </div>
        <div class="pro-banner-badge">${levelInfo.replace(/^📌\s*/, '')}</div>
      </div>
    `;

    if (topicInfo || situationInfo) {
      html += `
        <div class="pro-section-block" style="border-left-color: #06b6d4;">
          <div class="pro-section-title" style="color: #38bdf8;">${topicInfo}</div>
          ${situationInfo ? `<div style="font-size: 13.5px; color: #cbd5e1;">${situationInfo}</div>` : ''}
        </div>
      `;
    }
  }

  // Process remaining sections
  for (let sIdx = 1; sIdx < sections.length; sIdx++) {
    const sec = sections[sIdx];
    const lines = sec.split('\n');

    // Section 1: Definition or Rules
    if (sec.includes('📖 និយមន័យ') || sec.includes('📐 រូបមន្ត') || sec.includes('Formulas')) {
      html += `
        <div class="pro-section-block" style="border-left-color: #6366f1;">
          <div class="pro-section-title">📐 រូបមន្ត និងក្បួនវេយ្យាករណ៍ (Formulas & Rules)</div>
          <div class="pro-formula-box">${sec.replace(/^[📖📐].*?\n/g, '').trim()}</div>
        </div>
      `;
      continue;
    }

    // Section 2: Key Vocabulary list
    if (sec.includes('🔑 វាក្យសព្ទ') || (sec.includes('📝 បញ្ជី') && !sec.includes('ឧទាហរណ៍ជាក់ស្តែង'))) {
      const vocabLines = lines.filter(l => /^\d+\.\s*/.test(l.trim()));
      html += `
        <div class="pro-section-block" style="border-left-color: #10b981;">
          <div class="pro-section-title">🔑 វាក្យសព្ទគន្លឹះប្រចាំមេរៀន (Key Vocabulary)</div>
          <div class="pro-bilingual-grid">
            ${vocabLines.map(vl => {
              const cleaned = vl.replace(/^\d+\.\s*/, '');
              const parts = cleaned.split(' = ');
              const en = (parts[0] || '').replace(/^[🇬🇧\s]+/, '').trim();
              const kh = (parts[1] || '').replace(/^[🇰🇭\s]+/, '').trim();
              const logo = getWordVisualLogo(en, kh);
              return `
                <div class="pro-bilingual-card">
                  <div class="pro-en-row">
                    <div class="pro-en-left">
                      <span class="pro-word-logo-badge" title="${escapeAttr(en)}">${logo}</span>
                      <span class="pro-en-text">${en}</span>
                    </div>
                    <button class="pro-speak-btn" onclick="speakEnglish('${escapeAttr(en)}', this)" title="ស្តាប់ការបញ្ចេញសំឡេង">🔊</button>
                  </div>
                  <div class="pro-kh-row">
                    <span class="pro-flag">🇰🇭</span>
                    <span class="pro-kh-text">${kh}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
      continue;
    }

    // Section 3: Bilingual Examples
    if (sec.includes('💡 ឧទាហរណ៍ជាក់ស្តែង') || sec.includes('Practical Examples') || sec.includes('📝 បញ្ជីវាក្យសព្ទសំខាន់ៗ & ឧទាហរណ៍') || sec.includes('Verb Forms & Practical Examples') || sec.includes('Comparison Degrees & Examples')) {
      html += `
        <div class="pro-section-block" style="border-left-color: #38bdf8;">
          <div class="pro-section-title">💡 ឧទាហរណ៍ជាក់ស្តែង & ការបកប្រែ (Practical Examples with Khmer Translation)</div>
          <div class="pro-bilingual-grid">
      `;

      let currentEn = '';
      let currentKh = '';
      let currentItemTitle = '';

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith('🔹') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.') || line.startsWith('6.') || line.startsWith('7.') || line.startsWith('8.') || line.startsWith('9.') || line.startsWith('10.')) {
          if (line.includes(' = ') && !line.includes('🇬🇧')) {
            currentItemTitle = line;
          }
        }

        if (line.includes('🇬🇧') || line.includes('↳ ឧទាហរណ៍៖')) {
          currentEn = line.replace(/^[•\d.\s]*🇬🇧\s*/, '').replace(/^[↳\s]*ឧទាហរណ៍៖\s*/, '').trim();
        } else if (line.includes('🇰🇭') || line.includes('↳ បកប្រែ៖')) {
          currentKh = line.replace(/^[•\d.\s]*🇰🇭\s*/, '').replace(/^[↳\s]*បកប្រែ៖\s*/, '').replace(/^\(|\)$/g, '').trim();

          if (currentEn && currentKh) {
            const logo = getWordVisualLogo(currentItemTitle || currentEn, currentKh);
            html += `
              <div class="pro-bilingual-card">
                ${currentItemTitle ? `<div style="font-size: 13px; font-weight: 700; color: #a78bfa; margin-bottom: 4px;">${currentItemTitle}</div>` : ''}
                <div class="pro-en-row">
                  <div class="pro-en-left">
                    <span class="pro-word-logo-badge" title="${escapeAttr(currentEn)}">${logo}</span>
                    <span class="pro-en-text">${currentEn}</span>
                  </div>
                  <button class="pro-speak-btn" onclick="speakEnglish('${escapeAttr(currentEn)}', this)" title="ស្តាប់ការបញ្ចេញសំឡេង">🔊</button>
                </div>
                <div class="pro-kh-row">
                  <span class="pro-flag">🇰🇭</span>
                  <span class="pro-kh-text">${currentKh}</span>
                </div>
              </div>
            `;
            currentEn = '';
            currentKh = '';
            currentItemTitle = '';
          }
        }
      }

      html += `
          </div>
        </div>
      `;
      continue;
    }

    // Section 4: Dialogue
    if (sec.includes('💬 កិច្ចសន្ទនាគំរូ') || sec.includes('Full Dialogue')) {
      html += `
        <div class="pro-section-block" style="border-left-color: #a855f7;">
          <div class="pro-section-title">💬 កិច្ចសន្ទនាគំរូពេញលេញ (Full Dialogue with Audio)</div>
          <div class="pro-dialogue-thread">
      `;

      let currentSpeaker = '';
      let turnEn = '';
      let turnKh = '';
      let isSpeakerB = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('👤')) {
          currentSpeaker = line.replace(/^👤\s*/, '').replace(/:$/, '').trim();
          isSpeakerB = /B$|David|Waiter|Clerk|Landlord|Doctor|Interviewer|Candidate|Chantha/i.test(currentSpeaker);
        } else if (line.includes('🇬🇧')) {
          turnEn = line.replace(/^[•\s]*🇬🇧\s*/, '').replace(/^"|"$/g, '').trim();
        } else if (line.includes('🇰🇭')) {
          turnKh = line.replace(/^[•\s]*🇰🇭\s*/, '').replace(/^\(|\)$/g, '').trim();

          if (currentSpeaker && turnEn && turnKh) {
            html += `
              <div class="pro-dialogue-turn ${isSpeakerB ? 'speaker-b' : 'speaker-a'}">
                <div class="pro-speaker-name">👤 ${currentSpeaker}</div>
                <div class="pro-dialogue-bubble">
                  <div class="pro-en-row">
                    <span class="pro-en-text">"${turnEn}"</span>
                    <button class="pro-speak-btn" onclick="speakEnglish('${escapeAttr(turnEn)}', this)" title="ស្តាប់សំឡេង">🔊</button>
                  </div>
                  <div class="pro-kh-row">
                    <span class="pro-kh-text">${turnKh}</span>
                  </div>
                </div>
              </div>
            `;
            turnEn = '';
            turnKh = '';
          }
        }
      }

      html += `
          </div>
        </div>
      `;
      continue;
    }

    // Section 5: Common Mistakes
    if (sec.includes('⚠️ កំហុសញឹកញាប់') || sec.includes('Common Mistakes')) {
      html += `
        <div class="pro-section-block" style="border-left-color: #ef4444;">
          <div class="pro-section-title" style="color: #f87171;">⚠️ កំហុសញឹកញាប់ដែលត្រូវចៀសវាង (Common Mistakes)</div>
          <div class="pro-mistake-box">
            ${sec.replace(/^⚠️.*?\n/, '').split('\n').map(l => {
              if (l.trim().startsWith('❌')) return `<span class="pro-wrong">${l.trim()}</span>`;
              if (l.trim().startsWith('✅')) return `<span class="pro-correct">${l.trim()}</span>`;
              return `<div>${l}</div>`;
            }).join('')}
          </div>
        </div>
      `;
      continue;
    }

    // Section 6: Practice
    if (sec.includes('✍️ លំហាត់អនុវត្ត') || sec.includes('Practice Exercise')) {
      const practiceContent = sec.replace(/^✍️.*?\n/, '').trim();
      html += `
        <div class="pro-practice-box">
          <div class="pro-practice-header">✍️ លំហាត់អនុវត្តជាក់ស្តែង (Practice Exercise)</div>
          <div class="pro-practice-content">${practiceContent}</div>
          <button class="pro-practice-btn" onclick="fillPracticeChat('${escapeAttr(practiceContent)}')">
            <span>💬 ផ្ញើចម្លើយទៅគ្រូ AI ដើម្បីកែ</span>
          </button>
        </div>
      `;
      continue;
    }

    // Generic fallback block
    html += `
      <div class="pro-section-block">
        <div style="font-size: 14.5px; line-height: 1.8; color: #e2e8f0; white-space: pre-wrap;">${sec}</div>
      </div>
    `;
  }

  html += `</div>`;
  return html;
}

async function openLesson(monthId, weekId, lessonId) {
  try {
    // Ensure course curriculum or beginner curriculum is loaded in STATE
    if (monthId === 'beginner' && (!STATE.beginnerCourse || !STATE.beginnerCourse.weeks)) {
      try {
        const cRes = await fetch('/api/curriculum');
        const cData = await cRes.json();
        if (cData.success && cData.beginner) STATE.beginnerCourse = cData.beginner;
      } catch (e) {}
    } else if ((monthId === 'elementary' || monthId.startsWith('em')) && (!STATE.elementaryCourse || !STATE.elementaryCourse.months)) {
      try {
        const cRes = await fetch('/api/curriculum');
        const cData = await cRes.json();
        if (cData.success && cData.elementary) STATE.elementaryCourse = cData.elementary;
      } catch (e) {}
    } else if (monthId !== 'beginner' && !monthId.startsWith('em') && (!STATE.curriculum || !STATE.curriculum.length)) {
      try {
        const cRes = await fetch('/api/curriculum');
        const cData = await cRes.json();
        if (cData.success && cData.months) STATE.curriculum = cData.months;
      } catch (e) {}
    }

    const res = await fetch(`/api/lesson/${monthId}/${weekId}/${lessonId}`);
    const data = await res.json();
    if (!data.success) throw new Error('Lesson not found');

    STATE.currentLesson = {
      monthId,
      weekId,
      lessonId,
      title: data.lesson.title,
      content: data.lesson.content,
      monthTitle: data.month.title,
      weekTitle: data.week.title
    };

    // Render Lesson View
    document.getElementById('lessonBreadcrumbs').textContent = `${data.month.title} > ${data.week.title} > ${data.lesson.title}`;
    document.getElementById('lessonTitleDisplay').textContent = data.lesson.title;
    
    // Render Professional Bilingual UI
    document.getElementById('lessonContentText').innerHTML = renderProfessionalLessonHTML(data.lesson.content);

    // Check completion status
    const key = `${monthId}-${weekId}-${lessonId}`;
    const compData = STATE.currentUser?.completedLessons?.[key];
    const certBtn = document.getElementById('lessonCertBtn');

    if (compData) {
      document.getElementById('lessonStatusBadge').textContent = `✅ បានប្រឡងជាប់ - និទ្ទេស ${compData.grade}`;
      document.getElementById('lessonStatusBadge').className = 'badge badge-emerald';
      if (certBtn) certBtn.classList.remove('hidden');
    } else {
      document.getElementById('lessonStatusBadge').textContent = '📖 មេរៀនធម្មតា';
      document.getElementById('lessonStatusBadge').className = 'badge badge-cyan';
      if (certBtn) certBtn.classList.add('hidden');
    }

    // Reset Audio player
    resetAudioPlayer();

    // Update Navigation Buttons (Previous / Next)
    updateLessonNavButtons();

    // Toggle Admin Video controls & Load YouTube Video
    const isUserAdmin = !!(STATE.currentUser?.isAdmin || STATE.currentUser?.id === '240224709' || STATE.currentUser?.telegramId === 240224709);
    const adminControls = document.getElementById('videoAdminControls');
    const adminQuickAdd = document.getElementById('adminQuickAddBox');
    if (adminControls) adminControls.classList.toggle('hidden', !isUserAdmin);
    if (adminQuickAdd) adminQuickAdd.classList.toggle('hidden', !isUserAdmin);

    loadLessonVideo(data.lesson?.video?.videoId || null);

    // Setup Active Teacher info for this lesson (Teacher Piseth vs Teacher Sorn)
    const isBeginner = !!(data.isBeginner || monthId === 'beginner');
    const isElementary = !!(data.isElementary || monthId === 'elementary' || monthId.startsWith('em'));
    const isPiseth = isBeginner || isElementary;
    STATE.activeTutor = isPiseth ? 'piseth' : 'sorn';

    const drawerAvatar = document.getElementById('lessonDrawerAvatar');
    const drawerName = document.getElementById('lessonDrawerName');
    const drawerStatus = document.getElementById('lessonDrawerStatus');
    if (drawerAvatar) drawerAvatar.textContent = isPiseth ? '👩‍🏫' : '👨‍🏫';
    if (drawerName) drawerName.textContent = isPiseth ? 'អ្នកគ្រូពិសិដ្ឋ (Teacher Piseth AI)' : 'គ្រូសន (Teacher Sorn AI)';
    if (drawerStatus) drawerStatus.textContent = isPiseth ? (isElementary ? '🟢 កំពុងអនឡាញ • គ្រូបង្រៀនថ្នាក់បឋមសិក្សា' : '🟢 កំពុងអនឡាញ • គ្រូបង្រៀនថ្នាក់ដំបូង') : '🟢 កំពុងអនឡាញ • ជួយឆ្លើយសំណួរមេរៀន';

    // Reset Chat drawer with initial greeting from the assigned teacher
    const chatBox = document.getElementById('chatMessagesBox');
    if (chatBox) {
      chatBox.innerHTML = `
        <div class="chat-bubble ai">
          ${isPiseth 
            ? `សួស្តីកូនសិស្សជាទីស្រឡាញ់! អ្នកគ្រូគឺ <strong>អ្នកគ្រូពិសិដ្ឋ (Teacher Piseth)</strong>។ កូនកំពុងរៀនមេរៀន <strong>"${data.lesson.title}"</strong> នៃ${isElementary ? 'ថ្នាក់បឋមសិក្សា' : 'ថ្នាក់ដំបូង'}។ តើកូនមានចម្ងល់ ឬចង់ឱ្យអ្នកគ្រូជួយពន្យល់អ្វីបន្ថែមទេ? អ្នកគ្រូរីករាយនឹងជួយកូនជានិច្ច! 🌟`
            : `សួស្តីប្អូន! ខ្ញុំគឺគ្រូសន (Teacher Sorn)។ ប្អូនកំពុងរៀនមេរៀន <strong>"${data.lesson.title}"</strong>។ តើប្អូនមានចម្ងល់ ឬចង់ឱ្យគ្រូជួយពន្យល់អ្វីបន្ថែមទេ?`
          }
        </div>
      `;
    }

    navigateTo('lesson');
  } catch (err) {
    showToast('បរាជ័យក្នុងការបើកមេរៀន', 'error');
  }
}

function getLessonNavInfo() {
  if (!STATE.currentLesson) return { hasPrev: false, hasNext: false, nextLocked: false };
  const { monthId, weekId, lessonId } = STATE.currentLesson;
  const isAdmin = !!(STATE.currentUser?.isAdmin || STATE.currentUser?.id === '240224709' || STATE.currentUser?.telegramId === 240224709);

  if (monthId === 'beginner') {
    const course = STATE.beginnerCourse;
    if (!course || !course.weeks) return { hasPrev: false, hasNext: false, nextLocked: false };
    const flat = [];
    course.weeks.forEach(w => {
      (w.lessons || []).forEach(l => {
        flat.push({
          monthId: 'beginner',
          weekId: w.id,
          lessonId: l.id,
          lessonNum: parseInt(l.id.replace('bl', ''))
        });
      });
    });
    const idx = flat.findIndex(x => x.lessonId === lessonId);
    if (idx === -1) return { hasPrev: false, hasNext: false, nextLocked: false };

    const prevItem = idx > 0 ? flat[idx - 1] : null;
    const nextItem = idx < flat.length - 1 ? flat[idx + 1] : null;
    let nextLocked = false;
    let nextLessonNum = null;

    if (nextItem) {
      nextLessonNum = nextItem.lessonNum;
      if (!isAdmin && nextLessonNum > 1) {
        const passed = new Set(STATE.beginnerStatus?.passedLessons || []);
        nextLocked = !passed.has(`bl${nextLessonNum - 1}`);
      }
    }

    return {
      hasPrev: !!prevItem,
      hasNext: !!nextItem,
      prevItem,
      nextItem,
      nextLocked,
      nextLessonNum,
      isFirst: idx === 0,
      isLast: idx === flat.length - 1
    };
  }

  if (monthId === 'elementary' || monthId.startsWith('em')) {
    const course = STATE.elementaryCourse;
    if (!course || !course.months) return { hasPrev: false, hasNext: false, nextLocked: false };
    const flat = [];
    course.months.forEach(m => {
      (m.weeks || []).forEach(w => {
        (w.lessons || []).forEach(l => {
          flat.push({
            monthId: m.id,
            weekId: w.id,
            lessonId: l.id,
            lessonNum: parseInt(l.id.replace('el', ''))
          });
        });
      });
    });
    const idx = flat.findIndex(x => x.lessonId === lessonId);
    if (idx === -1) return { hasPrev: false, hasNext: false, nextLocked: false };

    const prevItem = idx > 0 ? flat[idx - 1] : null;
    const nextItem = idx < flat.length - 1 ? flat[idx + 1] : null;
    let nextLocked = false;
    let nextLessonNum = null;

    if (nextItem) {
      nextLessonNum = nextItem.lessonNum;
      if (!isAdmin && nextLessonNum > 1) {
        const passed = new Set(STATE.elementaryStatus?.passedLessons || []);
        nextLocked = !passed.has(`el${nextLessonNum - 1}`);
      }
    }

    return {
      hasPrev: !!prevItem,
      hasNext: !!nextItem,
      prevItem,
      nextItem,
      nextLocked,
      nextLessonNum,
      isFirst: idx === 0,
      isLast: idx === flat.length - 1
    };
  }

  // Standard 12-Month Curriculum
  if (!STATE.curriculum) return { hasPrev: false, hasNext: false, nextLocked: false };
  const flat = [];
  STATE.curriculum.forEach(m => {
    (m.weeks || []).forEach(w => {
      (w.lessons || []).forEach(l => {
        flat.push({
          monthId: m.id,
          weekId: w.id,
          lessonId: l.id,
          key: `${m.id}-${w.id}-${l.id}`
        });
      });
    });
  });

  const currentKey = `${monthId}-${weekId}-${lessonId}`;
  const idx = flat.findIndex(x => x.key === currentKey);
  if (idx === -1) return { hasPrev: false, hasNext: false, nextLocked: false };

  const prevItem = idx > 0 ? flat[idx - 1] : null;
  const nextItem = idx < flat.length - 1 ? flat[idx + 1] : null;
  let nextLocked = false;

  if (nextItem && !isAdmin) {
    const prevKey = flat[idx].key;
    const completed = STATE.currentUser?.completedLessons || {};
    nextLocked = !completed[prevKey];
  }

  return {
    hasPrev: !!prevItem,
    hasNext: !!nextItem,
    prevItem,
    nextItem,
    nextLocked,
    isFirst: idx === 0,
    isLast: idx === flat.length - 1
  };
}

function updateLessonNavButtons() {
  const info = getLessonNavInfo();

  const prevBtns = [document.getElementById('btnPrevLessonTop'), document.getElementById('btnPrevLessonBottom')];
  prevBtns.forEach(btn => {
    if (!btn) return;
    if (!info.hasPrev) {
      btn.disabled = true;
      btn.style.opacity = '0.35';
      btn.style.cursor = 'not-allowed';
      btn.title = 'នេះជាមេរៀនដំបូងគេបង្អស់';
    } else {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
      btn.title = 'ត្រឡប់ទៅមេរៀនមុន';
    }
  });

  const nextBtns = [document.getElementById('btnNextLessonTop'), document.getElementById('nextLessonBtn')];
  nextBtns.forEach(btn => {
    if (!btn) return;
    if (!info.hasNext) {
      btn.disabled = true;
      btn.style.opacity = '0.35';
      btn.style.cursor = 'not-allowed';
      btn.title = 'នេះជាមេរៀនចុងក្រោយ';
      btn.innerHTML = `<span>🏁 មេរៀនចុងក្រោយ</span>`;
    } else if (info.nextLocked) {
      btn.disabled = false;
      btn.style.opacity = '0.8';
      btn.style.cursor = 'pointer';
      btn.title = 'មេរៀនបន្ទាប់ជាប់សោរ (ចុចដើម្បីដឹងព័ត៌មាន)';
      btn.innerHTML = `<span>🔒 មេរៀនបន្ទាប់ ▶</span>`;
    } else {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
      btn.title = 'ទៅកាន់មេរៀនបន្ទាប់';
      btn.innerHTML = `<span>មេរៀនបន្ទាប់ ▶</span>`;
    }
  });
}

function goToPrevLesson() {
  const info = getLessonNavInfo();
  if (!info.hasPrev || !info.prevItem) {
    showToast('ℹ️ នេះជាមេរៀនដំបូងគេបង្អស់ហើយ!', 'info');
    return;
  }
  openLesson(info.prevItem.monthId, info.prevItem.weekId, info.prevItem.lessonId);
}

function goToNextLesson() {
  const info = getLessonNavInfo();
  if (!info.hasNext || !info.nextItem) {
    showToast('🎉 អបអរសាទរ! អ្នកបានរៀនដល់មេរៀនចុងក្រោយនៃកម្មវិធីសិក្សាហើយ!', 'success');
    return;
  }

  if (info.nextLocked) {
    if (info.nextLessonNum) {
      showToast(`🔒 មេរៀនបន្ទាប់ត្រូវបានចាក់សោរ! សូមប្រឡងជាប់មេរៀនទី ${info.nextLessonNum - 1} សិន`, 'warning');
    } else {
      showToast('🔒 មេរៀនបន្ទាប់ត្រូវបានចាក់សោរ! ត្រូវប្រឡងជាប់មេរៀនមុនសិន', 'warning');
    }
    return;
  }

  openLesson(info.nextItem.monthId, info.nextItem.weekId, info.nextItem.lessonId);
}

// ==========================================
// 3.8 LESSON YOUTUBE VIDEO PLAYER & ADMIN MANAGEMENT
// ==========================================

let currentYTPlayer = null;
let isYTPlayerReady = false;
let currentLessonVideoId = null;

// YouTube IFrame API Ready Callback
window.onYouTubeIframeAPIReady = function() {
  isYTPlayerReady = true;
  console.log('🎬 [YouTube API] IFrame API Loaded & Ready');
  if (currentLessonVideoId) {
    initYouTubePlayer(currentLessonVideoId);
  }
};

function loadLessonVideo(videoId) {
  currentLessonVideoId = videoId || null;
  const wrapper = document.getElementById('ytPlayerWrapper');
  const placeholder = document.getElementById('noVideoPlaceholder');
  const overlay = document.getElementById('videoEndedOverlay');

  if (overlay) overlay.classList.add('hidden');

  if (!videoId) {
    if (wrapper) wrapper.classList.add('hidden');
    if (placeholder) placeholder.classList.remove('hidden');
    if (currentYTPlayer && typeof currentYTPlayer.destroy === 'function') {
      try { currentYTPlayer.destroy(); } catch (e) {}
      currentYTPlayer = null;
    }
    return;
  }

  if (placeholder) placeholder.classList.add('hidden');
  if (wrapper) wrapper.classList.remove('hidden');

  if (window.YT && window.YT.Player) {
    initYouTubePlayer(videoId);
  } else {
    console.log('🎬 [YouTube API] Waiting for script to initialize...');
  }
}

function initYouTubePlayer(videoId) {
  const container = document.getElementById('ytPlayerIframe');
  if (!container) return;

  if (currentYTPlayer && typeof currentYTPlayer.loadVideoById === 'function') {
    try {
      currentYTPlayer.loadVideoById({ videoId: videoId });
      return;
    } catch (e) {
      console.warn('Re-instantiating YT Player:', e);
    }
  }

  container.innerHTML = '';
  const playerDiv = document.createElement('div');
  playerDiv.id = 'ytPlayerInstance';
  container.appendChild(playerDiv);

  try {
    currentYTPlayer = new YT.Player('ytPlayerInstance', {
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        rel: 0,
        modestbranding: 1,
        fs: 1,
        iv_load_policy: 3,
        playsinline: 1,
        origin: window.location.origin
      },
      events: {
        onStateChange: onPlayerStateChange
      }
    });
  } catch (err) {
    console.error('Failed to create YT.Player instance:', err);
  }
}

function onPlayerStateChange(event) {
  // YT.PlayerState.ENDED is 0
  if (event.data === 0 || (window.YT && event.data === window.YT.PlayerState.ENDED)) {
    // 1. Immediately pause and seek back to 0 so YouTube cannot display third-party suggestions!
    try {
      if (currentYTPlayer && typeof currentYTPlayer.seekTo === 'function') {
        currentYTPlayer.seekTo(0);
        currentYTPlayer.pauseVideo();
      }
    } catch (e) {}

    // 2. Show custom Cambodian ended overlay with Replay and Quiz
    const overlay = document.getElementById('videoEndedOverlay');
    if (overlay) overlay.classList.remove('hidden');
  } else if (event.data === 1 || (window.YT && event.data === window.YT.PlayerState.PLAYING)) {
    const overlay = document.getElementById('videoEndedOverlay');
    if (overlay) overlay.classList.add('hidden');
  }
}

function replayLessonVideo() {
  const overlay = document.getElementById('videoEndedOverlay');
  if (overlay) overlay.classList.add('hidden');
  if (currentYTPlayer && typeof currentYTPlayer.playVideo === 'function') {
    try {
      currentYTPlayer.seekTo(0);
      currentYTPlayer.playVideo();
    } catch (e) {}
  }
}

function openLessonVideoAdminModal() {
  if (!STATE.currentLesson) {
    showToast('សូមជ្រើសរើសមេរៀនជាមុនសិន', 'warning');
    return;
  }

  const { monthId, weekId, lessonId, title, monthTitle, weekTitle } = STATE.currentLesson;

  const titleEl = document.getElementById('adminModalLessonTitle');
  const breadcrumbsEl = document.getElementById('adminModalLessonBreadcrumbs');
  if (titleEl) titleEl.textContent = title || 'មេរៀន';
  if (breadcrumbsEl) breadcrumbsEl.textContent = `${monthTitle || 'Month'} > ${weekTitle || 'Week'} > ${title || 'Lesson'}`;

  const urlInput = document.getElementById('adminYoutubeUrlInput');
  const deleteBtn = document.getElementById('adminDeleteVideoBtn');

  if (currentLessonVideoId) {
    if (urlInput) urlInput.value = `https://www.youtube.com/watch?v=${currentLessonVideoId}`;
    handleAdminYoutubeUrlInput(urlInput ? urlInput.value : '');
    if (deleteBtn) deleteBtn.classList.remove('hidden');
  } else {
    if (urlInput) urlInput.value = '';
    handleAdminYoutubeUrlInput('');
    if (deleteBtn) deleteBtn.classList.add('hidden');
  }

  openModal('lessonVideoAdminModal');
}

function handleAdminYoutubeUrlInput(url) {
  const previewBox = document.getElementById('adminVideoPreviewBox');
  const previewThumb = document.getElementById('adminVideoPreviewThumb');
  const previewBadge = document.getElementById('adminPreviewVideoId');

  const videoId = extractYouTubeIdFromClient(url);
  if (videoId) {
    if (previewThumb) previewThumb.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    if (previewBadge) previewBadge.textContent = `Video ID: ${videoId}`;
    if (previewBox) previewBox.classList.remove('hidden');
  } else {
    if (previewBox) previewBox.classList.add('hidden');
  }
}

function extractYouTubeIdFromClient(url) {
  if (!url) return null;
  const clean = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) return clean;
  const m1 = clean.match(/(?:v=|\/v\/|embed\/|shorts\/|youtu\.be\/|\/watch\?.*v=)([a-zA-Z0-9_-]{11})/);
  if (m1) return m1[1];
  return null;
}

async function handleSaveLessonVideo() {
  if (!STATE.currentLesson) return;
  const { monthId, weekId, lessonId } = STATE.currentLesson;
  const urlInput = document.getElementById('adminYoutubeUrlInput');
  const url = urlInput ? urlInput.value.trim() : '';

  if (!url) {
    showToast('សូមបញ្ចូល Link YouTube ជាមុនសិន!', 'warning');
    return;
  }

  const userId = STATE.currentUser?.id;
  if (!userId) {
    showToast('សូមចូលគណនីជា Admin ជាមុនសិន', 'error');
    return;
  }

  try {
    showToast('⏳ កំពុងរក្សាទុកវីដេអូ...', 'info');
    const res = await fetch('/api/lesson/video/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        monthId,
        weekId,
        lessonId,
        youtubeUrl: url,
        action: 'save'
      })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      showToast(data.error || 'បរាជ័យក្នុងការរក្សាទុកវីដេអូ', 'error');
      return;
    }

    showToast(data.message || 'បានរក្សាទុកវីដេអូបង្រៀនដោយជោគជ័យ!', 'success');
    closeModal('lessonVideoAdminModal');

    loadLessonVideo(data.video?.videoId);
  } catch (err) {
    console.error('Save video error:', err);
    showToast('មានបញ្ហាបច្ចេកទេសក្នុងការរក្សាទុកវីដេអូ', 'error');
  }
}

async function handleDeleteLessonVideo() {
  if (!STATE.currentLesson) return;
  if (!confirm('តើលោកគ្រូពិតជាចង់លុបវីដេអូបង្រៀនចេញពីមេរៀននេះមែនទេ?')) return;

  const { monthId, weekId, lessonId } = STATE.currentLesson;
  const userId = STATE.currentUser?.id;

  try {
    showToast('⏳ កំពុងលុបវីដេអូ...', 'info');
    const res = await fetch('/api/lesson/video/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        monthId,
        weekId,
        lessonId,
        action: 'delete'
      })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      showToast(data.error || 'បរាជ័យក្នុងការលុបវីដេអូ', 'error');
      return;
    }

    showToast(data.message || 'បានលុបវីដេអូចេញរួចរាល់!', 'success');
    closeModal('lessonVideoAdminModal');

    loadLessonVideo(null);
  } catch (err) {
    console.error('Delete video error:', err);
    showToast('មានបញ្ហាក្នុងការលុបវីដេអូ', 'error');
  }
}

// ==========================================
// 4. AUDIO TTS PLAYER
// ==========================================

async function toggleLessonAudio() {
  const audio = document.getElementById('globalAudioPlayer');
  const btn = document.getElementById('playAudioBtn');
  const icon = document.getElementById('playAudioIcon');
  const text = document.getElementById('playAudioText');
  const status = document.getElementById('audioStatusText');

  if (STATE.audioPlaying) {
    audio.pause();
    STATE.audioPlaying = false;
    icon.textContent = '▶️';
    text.textContent = 'ចាក់សំឡេង (Play Audio)';
    status.textContent = 'បានផ្អាកសំឡេង';
    return;
  }

  if (audio.src && audio.currentTime > 0 && !audio.ended) {
    audio.play();
    STATE.audioPlaying = true;
    icon.textContent = '⏸️';
    text.textContent = 'ផ្អាកសំឡេង (Pause)';
    status.textContent = 'កំពុងចាក់សំឡេងអានមេរៀន...';
    return;
  }

  // Need to fetch fresh TTS audio stream from API
  if (!STATE.currentLesson || !STATE.currentLesson.content) {
    return showToast('មិនមានអត្ថបទសម្រាប់ចាក់សំឡេងទេ', 'error');
  }

  status.textContent = '⏳ កំពុងទាញយកសំឡេងពី Server សូមរង់ចាំ...';
  icon.textContent = '⏳';

  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        text: STATE.currentLesson.content, 
        lang: 'en',
        tutor: (STATE.currentLesson?.monthId === 'beginner' || STATE.activeTutor === 'piseth') ? 'piseth' : 'sorn'
      })
    });

    if (!res.ok) throw new Error('Audio generation failed');

    const blob = await res.blob();
    if (STATE.audioBlobUrl) URL.revokeObjectURL(STATE.audioBlobUrl);
    STATE.audioBlobUrl = URL.createObjectURL(blob);

    audio.src = STATE.audioBlobUrl;
    audio.play();
    STATE.audioPlaying = true;

    icon.textContent = '⏸️';
    text.textContent = 'ផ្អាកសំឡេង (Pause)';
    status.textContent = '🔊 កំពុងចាក់ការបញ្ចេញសំឡេងច្បាស់ល្អ...';

    audio.onended = () => {
      STATE.audioPlaying = false;
      icon.textContent = '▶️';
      text.textContent = 'ចាក់ឡើងវិញ (Replay)';
      status.textContent = 'ការចាក់សំឡេងបានបញ្ចប់';
    };
  } catch (err) {
    console.error('Audio play error:', err);
    icon.textContent = '▶️';
    text.textContent = 'ចាក់សំឡេង (Play Audio)';
    status.textContent = '⚠️ មានបញ្ហាក្នុងការបង្កើតសំឡេង';
    showToast('បរាជ័យក្នុងការចាក់សំឡេង', 'error');
  }
}

function resetAudioPlayer() {
  const audio = document.getElementById('globalAudioPlayer');
  if (audio) {
    audio.pause();
    audio.src = '';
  }
  STATE.audioPlaying = false;
  const icon = document.getElementById('playAudioIcon');
  const text = document.getElementById('playAudioText');
  const status = document.getElementById('audioStatusText');
  if (icon) icon.textContent = '▶️';
  if (text) text.textContent = 'ចាក់សំឡេង (Play Audio)';
  if (status) status.textContent = 'ចុចប៊ូតុងខាងក្រោមដើម្បីចាក់សំឡេងមេរៀន';
}

// ==========================================
// 5. AI TUTOR CHAT & UNIVERSAL AI SUITE
// ==========================================

function formatMarkdownText(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/```([a-zA-Z0-9]*)\n([\s\S]*?)```/g, '<pre class="ai-code-block"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="ai-inline-code">$1</code>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^### (.*?)$/gm, '<h4 class="ai-heading-3">$1</h4>')
    .replace(/^## (.*?)$/gm, '<h3 class="ai-heading-2">$1</h3>')
    .replace(/^# (.*?)$/gm, '<h2 class="ai-heading-1">$1</h2>')
    .replace(/^\* (.*?)$/gm, '<div class="ai-bullet">• $1</div>')
    .replace(/^- (.*?)$/gm, '<div class="ai-bullet">• $1</div>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

function copyBubbleText(btn) {
  const contentEl = btn.closest('.chat-bubble')?.querySelector('.ai-bubble-content') || btn.parentElement;
  if (!contentEl) return;
  const textToCopy = contentEl.innerText || contentEl.textContent || '';
  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalText = btn.innerHTML;
    btn.innerHTML = '✓ បានចម្លង';
    setTimeout(() => { btn.innerHTML = originalText; }, 2000);
  }).catch(() => {
    showToast('បរាជ័យក្នុងការចម្លង', 'error');
  });
}

// ====================================================
// INTERACTIVE AUDIO PLAYER (TTS WITH SEEK & CONTROLS)
// ====================================================

let CURRENT_AUDIO_PLAYER = {
  audio: null,
  blobUrl: null,
  btnElement: null,
  widgetElement: null,
  originalBtnHtml: '🔊 ស្តាប់',
  isSeeking: false,
  text: ''
};

function formatAudioSeconds(sec) {
  if (!sec || isNaN(sec) || sec < 0) return '00:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

function stopCurrentAudio() {
  if (CURRENT_AUDIO_PLAYER.audio) {
    try {
      CURRENT_AUDIO_PLAYER.audio.pause();
      CURRENT_AUDIO_PLAYER.audio.currentTime = 0;
    } catch (e) {}
    CURRENT_AUDIO_PLAYER.audio = null;
  }
  if (CURRENT_AUDIO_PLAYER.blobUrl) {
    try { URL.revokeObjectURL(CURRENT_AUDIO_PLAYER.blobUrl); } catch (e) {}
    CURRENT_AUDIO_PLAYER.blobUrl = null;
  }
  if (CURRENT_AUDIO_PLAYER.btnElement) {
    CURRENT_AUDIO_PLAYER.btnElement.innerHTML = CURRENT_AUDIO_PLAYER.originalBtnHtml || '🔊 ស្តាប់';
    CURRENT_AUDIO_PLAYER.btnElement.classList.remove('playing');
    CURRENT_AUDIO_PLAYER.btnElement.disabled = false;
  }
  if (CURRENT_AUDIO_PLAYER.widgetElement && CURRENT_AUDIO_PLAYER.widgetElement.parentElement) {
    CURRENT_AUDIO_PLAYER.widgetElement.remove();
  }
  CURRENT_AUDIO_PLAYER.widgetElement = null;
  CURRENT_AUDIO_PLAYER.btnElement = null;
  CURRENT_AUDIO_PLAYER.isSeeking = false;
  CURRENT_AUDIO_PLAYER.text = '';
}

function toggleAudioPlayback() {
  if (!CURRENT_AUDIO_PLAYER.audio) return;
  const playPauseBtn = document.getElementById('audioPlayPauseBtn');
  if (CURRENT_AUDIO_PLAYER.audio.paused) {
    CURRENT_AUDIO_PLAYER.audio.play();
    if (playPauseBtn) playPauseBtn.innerHTML = '⏸️';
    if (CURRENT_AUDIO_PLAYER.btnElement) {
      CURRENT_AUDIO_PLAYER.btnElement.innerHTML = '🔊 កំពុងនិយាយ...';
      CURRENT_AUDIO_PLAYER.btnElement.classList.add('playing');
    }
  } else {
    CURRENT_AUDIO_PLAYER.audio.pause();
    if (playPauseBtn) playPauseBtn.innerHTML = '▶️';
    if (CURRENT_AUDIO_PLAYER.btnElement) {
      CURRENT_AUDIO_PLAYER.btnElement.innerHTML = '▶️ បន្តស្តាប់';
      CURRENT_AUDIO_PLAYER.btnElement.classList.remove('playing');
    }
  }
}

function seekAudioRelative(seconds) {
  if (!CURRENT_AUDIO_PLAYER.audio) return;
  const audio = CURRENT_AUDIO_PLAYER.audio;
  const duration = audio.duration || 0;
  let target = (audio.currentTime || 0) + seconds;
  if (target < 0) target = 0;
  if (duration > 0 && target > duration) target = duration;
  audio.currentTime = target;
  
  const slider = document.getElementById('playerSeekSlider');
  const timeDisplay = document.getElementById('playerTimeDisplay');
  if (slider) slider.value = target;
  if (timeDisplay) {
    timeDisplay.innerText = `${formatAudioSeconds(target)} / ${formatAudioSeconds(duration)}`;
  }
}

function onSeekSliderInput(val) {
  if (!CURRENT_AUDIO_PLAYER.audio) return;
  CURRENT_AUDIO_PLAYER.isSeeking = true;
  const duration = CURRENT_AUDIO_PLAYER.audio.duration || 0;
  const timeDisplay = document.getElementById('playerTimeDisplay');
  if (timeDisplay) {
    timeDisplay.innerText = `${formatAudioSeconds(parseFloat(val))} / ${formatAudioSeconds(duration)}`;
  }
}

function onSeekSliderChange(val) {
  if (!CURRENT_AUDIO_PLAYER.audio) return;
  CURRENT_AUDIO_PLAYER.audio.currentTime = parseFloat(val);
  CURRENT_AUDIO_PLAYER.isSeeking = false;
}

async function playTTS(text, btnElement) {
  if (!text || !text.trim()) return;
  
  // If clicking on the currently active button and audio exists, toggle pause/play
  if (CURRENT_AUDIO_PLAYER.btnElement === btnElement && CURRENT_AUDIO_PLAYER.audio) {
    toggleAudioPlayback();
    return;
  }

  // Otherwise, stop any previous audio
  stopCurrentAudio();

  const originalHtml = btnElement.innerHTML || '🔊 ស្តាប់';
  CURRENT_AUDIO_PLAYER.btnElement = btnElement;
  CURRENT_AUDIO_PLAYER.originalBtnHtml = originalHtml;
  CURRENT_AUDIO_PLAYER.text = text;

  btnElement.innerHTML = '⏳ កំពុងទាញសំឡេង...';
  btnElement.disabled = true;

  try {
    // Strip markdown formatting & emojis before passing to speech
    const cleanSpeechText = text
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/[*_#`~>\[\]\(\)]/g, ' ')
      .trim();

    // Check for Khmer unicode characters (\u1780-\u17FF)
    // If ANY Khmer characters exist, lang must be 'km' so the server uses km-KH-PisethNeural!
    // km-KH-PisethNeural reads both Khmer and English seamlessly.
    const hasKhmer = /[\u1780-\u17FF]/.test(cleanSpeechText);
    const lang = hasKhmer ? 'km' : 'en';

    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: cleanSpeechText,
        lang: lang,
        tutor: (STATE.currentLesson?.monthId === 'beginner' || STATE.courseLevel === 'beginner' || STATE.activeTutor === 'piseth') ? 'piseth' : (STATE.activeTutor || 'sorn')
      })
    });

    if (!res.ok) throw new Error('TTS Failed');

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);

    CURRENT_AUDIO_PLAYER.audio = audio;
    CURRENT_AUDIO_PLAYER.blobUrl = url;

    // Create interactive player widget and insert it below the action buttons
    const playerWidget = document.createElement('div');
    playerWidget.className = 'bubble-audio-player';
    playerWidget.id = 'activeBubbleAudioPlayer';
    playerWidget.innerHTML = `
      <div class="player-top-row">
        <button type="button" class="player-ctrl-btn play-pause-btn" id="audioPlayPauseBtn" onclick="toggleAudioPlayback()" title="ផ្អាក / ចាក់បន្ត">
          ⏸️
        </button>
        <button type="button" class="player-ctrl-btn skip-btn" onclick="seekAudioRelative(-5)" title="ថយក្រោយ 5 វិនាទី">
          ⏪ 5s
        </button>
        <button type="button" class="player-ctrl-btn skip-btn" onclick="seekAudioRelative(5)" title="ទៅមុខ 5 វិនាទី">
          5s ⏩
        </button>
        <div class="player-slider-wrap">
          <input type="range" class="player-seek-slider" id="playerSeekSlider" min="0" max="100" value="0" step="0.1"
                 oninput="onSeekSliderInput(this.value)"
                 onchange="onSeekSliderChange(this.value)"
                 title="ទាញទៅមុខ / ថយក្រោយ (Seek)">
        </div>
        <span class="player-time" id="playerTimeDisplay">00:00 / --:--</span>
        <button type="button" class="player-ctrl-btn stop-btn" onclick="stopCurrentAudio()" title="បញ្ឈប់ទាំងស្រុង (Stop)">
          ⏹️ បញ្ឈប់
        </button>
      </div>
    `;

    // Insert widget after actions container or parent bubble
    const actionsParent = btnElement.parentElement;
    if (actionsParent) {
      actionsParent.insertAdjacentElement('afterend', playerWidget);
    } else {
      btnElement.insertAdjacentElement('afterend', playerWidget);
    }
    CURRENT_AUDIO_PLAYER.widgetElement = playerWidget;

    btnElement.innerHTML = '🔊 កំពុងនិយាយ...';
    btnElement.classList.add('playing');
    btnElement.disabled = false;

    audio.onloadedmetadata = () => {
      const slider = document.getElementById('playerSeekSlider');
      const timeDisplay = document.getElementById('playerTimeDisplay');
      if (slider && !isNaN(audio.duration)) {
        slider.max = audio.duration;
        slider.value = 0;
      }
      if (timeDisplay && !isNaN(audio.duration)) {
        timeDisplay.innerText = `00:00 / ${formatAudioSeconds(audio.duration)}`;
      }
    };

    audio.ontimeupdate = () => {
      if (CURRENT_AUDIO_PLAYER.isSeeking) return;
      const slider = document.getElementById('playerSeekSlider');
      const timeDisplay = document.getElementById('playerTimeDisplay');
      if (slider) {
        slider.value = audio.currentTime;
      }
      if (timeDisplay) {
        const cur = formatAudioSeconds(audio.currentTime);
        const dur = formatAudioSeconds(audio.duration || 0);
        timeDisplay.innerText = `${cur} / ${dur}`;
      }
    };

    audio.onended = () => {
      stopCurrentAudio();
    };

    audio.onerror = () => {
      stopCurrentAudio();
      showToast('បរាជ័យក្នុងការចាក់សំឡេង', 'error');
    };

    await audio.play();

  } catch (err) {
    console.error('Play TTS Error:', err);
    btnElement.innerHTML = '❌ បរាជ័យ';
    btnElement.disabled = false;
    setTimeout(() => {
      if (CURRENT_AUDIO_PLAYER.btnElement === btnElement) {
        btnElement.innerHTML = originalHtml;
      }
    }, 2500);
  }
}

// ----------------------------------------------------
// A. LESSON VIEW AI CHAT DRAWER
// ----------------------------------------------------

let mediaRecorder;
let audioChunks = [];

async function toggleVoiceRecord() {
  const btn = document.getElementById('recordVoiceBtn');
  const input = document.getElementById('chatInput');

  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
    btn.innerHTML = '🎤';
    btn.classList.remove('recording');
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    audioChunks = [];

    mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) audioChunks.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      stream.getTracks().forEach(track => track.stop());
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

      const oldPlaceholder = input.placeholder;
      input.placeholder = "⏳ កំពុងបំប្លែងសំឡេង...";

      try {
        const res = await fetch('/api/stt', {
          method: 'POST',
          body: audioBlob
        });
        const data = await res.json();

        if (data.success && data.text) {
          input.value = data.text;
          sendChatMessage();
        } else {
          showToast("បរាជ័យក្នុងការបំប្លែងសំឡេង", "error");
        }
      } catch (err) {
        showToast("បរាជ័យក្នុងការបំប្លែងសំឡេង", "error");
      }
      input.placeholder = oldPlaceholder;
    };

    mediaRecorder.start();
    btn.innerHTML = '⏹️';
    btn.classList.add('recording');
  } catch (err) {
    alert("សូមអនុញ្ញាតឱ្យប្រើប្រាស់មីក្រូហ្វូនក្នុង Browser របស់អ្នក!");
  }
}

async function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;

  const chatBox = document.getElementById('chatMessagesBox');
  input.value = '';

  // Append user message
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.textContent = msg;
  chatBox.appendChild(userBubble);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Append thinking bubble
  const isPiseth = STATE.activeTutor === 'piseth';
  const teacherName = isPiseth ? 'អ្នកគ្រូពិសិដ្ឋ (Teacher Piseth)' : 'គ្រូសន (Teacher Sorn)';
  const teacherEmoji = isPiseth ? '👩‍🏫' : '👨‍🏫';

  const thinkBubble = document.createElement('div');
  thinkBubble.className = 'chat-bubble ai';
  thinkBubble.innerHTML = `⏳ <em>${isPiseth ? 'អ្នកគ្រូពិសិដ្ឋកំពុងឆ្លើយ...' : 'គ្រូសនកំពុងគិត...'}</em>`;
  chatBox.appendChild(thinkBubble);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: STATE.currentUser?.id || 'guest',
        message: msg,
        lessonTitle: STATE.currentLesson?.title || 'General English',
        preferredAI: STATE.preferredAI || 'auto',
        tutor: STATE.activeTutor || (isPiseth ? 'piseth' : 'sorn')
      })
    });

    const data = await res.json();
    const cleanReply = data.reply || 'សូមអភ័យទោស ខ្ញុំមិនអាចឆ្លើយបានទេ។';
    const provider = data.provider || 'AI';

    thinkBubble.innerHTML = `
      <div class="ai-bubble-header">
        <span class="ai-bubble-author">${teacherEmoji} ${teacherName}</span>
        <span class="ai-bubble-badge">${provider}</span>
      </div>
      <div class="ai-bubble-content">${formatMarkdownText(cleanReply)}</div>
      <div class="ai-bubble-actions">
        <button class="tts-btn" onclick="playTTS(this.parentElement.previousElementSibling.innerText, this)" title="ស្តាប់សំឡេង (Listen)">🔊 ស្តាប់</button>
        <button class="copy-btn" onclick="copyBubbleText(this)" title="ចម្លងអត្ថបទ">📋 ចម្លង</button>
      </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (e) {
    thinkBubble.textContent = '⚠️ មានបញ្ហាក្នុងការតភ្ជាប់ជាមួយ AI';
  }
}

function handleChatKeyPress(e) {
  if (e.key === 'Enter') sendChatMessage();
}

function sendQuickPrompt(promptText) {
  const input = document.getElementById('chatInput');
  if (input) {
    input.value = promptText;
    sendChatMessage();
  }
}

// ----------------------------------------------------
// B. FULL-PAGE AI TUTOR STUDIO (#tab-ai-tutor)
// ----------------------------------------------------

let studioMediaRecorder;
let studioAudioChunks = [];

function initAIStudioTab() {
  const select = document.getElementById('aiEngineSelect');
  if (select && STATE.preferredAI) {
    select.value = STATE.preferredAI;
  }

  // Load past history if user logged in
  if (STATE.currentUser && !STATE.chatHistoryLoaded) {
    loadStudioChatHistory();
  }
}

function handleStudioTutorChange() {
  const select = document.getElementById('aiTutorSelect');
  if (!select) return;
  const tutor = select.value;
  STATE.studioTutor = tutor;

  const avatar = document.querySelector('.ai-studio-avatar-emoji');
  const nameEl = document.querySelector('.ai-studio-name');
  const badgeEl = document.querySelector('.ai-badge-verified');
  const subEl = document.querySelector('.ai-studio-sub');

  if (tutor === 'piseth') {
    if (avatar) avatar.textContent = '👩‍🏫';
    if (nameEl) nameEl.textContent = 'អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)';
    if (badgeEl) badgeEl.textContent = '✓ គ្រូបង្រៀនថ្នាក់ដំបូង & Phonics';
    if (subEl) subEl.textContent = 'វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline • ជំនាញថ្នាក់ដំបូង សូរសព្ទ Phonics ព្យញ្ជនៈ ស្រៈ វាក្យសព្ទគ្រឹះ និងសន្ទនាសាមញ្ញសម្រាប់កូនៗ';
    showToast('👩‍🏫 បានប្តូរទៅកាន់៖ អ្នកគ្រូ ពិសិដ្ឋ (ថ្នាក់ដំបូង)', 'info');
  } else {
    if (avatar) avatar.textContent = '👨‍🏫';
    if (nameEl) nameEl.textContent = 'គ្រូសន (Teacher Sorn AI)';
    if (badgeEl) badgeEl.textContent = '✓ គ្រូជំនាញភាសាអង់គ្លេស';
    if (subEl) subEl.textContent = 'វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline • ជួយឆ្លើយចម្ងល់ ពន្យល់វេយ្យាករណ៍ បកប្រែ និងហាត់និយាយ';
    showToast('👨‍🏫 បានប្តូរទៅកាន់៖ គ្រូសន (ថ្នាក់ទូទៅ ១២ ខែ)', 'info');
  }
}

function handleEngineChange() {
  const select = document.getElementById('aiEngineSelect');
  if (select) {
    STATE.preferredAI = select.value;
    localStorage.setItem('preferredAI', select.value);
    showToast(`ម៉ាស៊ីន AI ត្រូវបានប្តូរទៅ៖ ${select.options[select.selectedIndex].text}`, 'info');
  }
}

function triggerStudioTool(toolType) {
  const input = document.getElementById('studioChatInput');
  if (!input) return;

  if (toolType === 'explain') {
    input.value = 'សូមជួយពន្យល់ពី ';
    input.focus();
  } else if (toolType === 'grammar') {
    input.value = 'សូមជួយពិនិត្យ និងកែកំហុសវេយ្យាករណ៍ប្រយោគនេះ៖ "';
    input.focus();
  } else if (toolType === 'translate') {
    input.value = 'សូមជួយបកប្រែពាក្យ/ប្រយោគនេះ៖ "';
    input.focus();
  } else if (toolType === 'verb') {
    input.value = 'សូមបង្ហាញទម្រង់ V1, V2, V3 និងអត្ថន័យនៃកិរិយាសព្ទ៖ ';
    input.focus();
  } else if (toolType === 'pronounce') {
    input.value = 'សូមប្រាប់ពីរបៀបបញ្ចេញសំឡេងពាក្យ៖ ';
    input.focus();
  }
}

async function sendStudioChatMessage() {
  const input = document.getElementById('studioChatInput');
  const msg = input ? input.value.trim() : '';
  if (!msg) return;

  const chatBox = document.getElementById('aiStudioMessagesBox');
  input.value = '';

  // Append user message
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.textContent = msg;
  chatBox.appendChild(userBubble);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Append thinking bubble
  const isPiseth = (STATE.studioTutor || 'piseth') === 'piseth';
  const teacherName = isPiseth ? 'អ្នកគ្រូពិសិដ្ឋ (Teacher Piseth)' : 'គ្រូសន (Teacher Sorn)';
  const teacherEmoji = isPiseth ? '👩‍🏫' : '👨‍🏫';

  const thinkBubble = document.createElement('div');
  thinkBubble.className = 'chat-bubble ai';
  thinkBubble.innerHTML = `
    <div class="ai-bubble-header">
      <span class="ai-bubble-author">${teacherEmoji} ${teacherName}</span>
      <span class="ai-bubble-badge">កំពុងដំណើរការ...</span>
    </div>
    <div class="ai-bubble-content">⏳ <em>${isPiseth ? 'អ្នកគ្រូពិសិដ្ឋកំពុងគិត និងរៀបចំការពន្យល់...' : 'គ្រូសនកំពុងគិត និងរៀបចំការឆ្លើយតប...'}</em></div>
  `;
  chatBox.appendChild(thinkBubble);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Determine mode
  let mode = 'chat';
  if (msg.includes('កែកំហុស') || msg.includes('វេយ្យាករណ៍')) mode = 'grammar';
  else if (msg.includes('បកប្រែ') || msg.includes('translate')) mode = 'translate';
  else if (msg.includes('កិរិយាសព្ទ') || msg.includes('V1') || msg.includes('V2')) mode = 'verb';
  else if (msg.includes('បញ្ចេញសំឡេង') || msg.includes('pronounce')) mode = 'pronounce';

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: STATE.currentUser?.id || 'guest',
        message: msg,
        preferredAI: STATE.preferredAI || 'auto',
        mode: mode,
        lessonTitle: STATE.currentLesson?.title || (isPiseth ? 'Beginner Foundation English' : 'General English Study'),
        tutor: isPiseth ? 'piseth' : 'sorn'
      })
    });

    const data = await res.json();
    const cleanReply = data.reply || 'សូមអភ័យទោស ខ្ញុំមិនអាចឆ្លើយបានទេ។';
    const provider = data.provider || 'AI';
    const model = data.model ? ` • ${data.model}` : '';

    thinkBubble.innerHTML = `
      <div class="ai-bubble-header">
        <span class="ai-bubble-author">${teacherEmoji} ${teacherName}</span>
        <span class="ai-bubble-badge">${provider}${model}</span>
      </div>
      <div class="ai-bubble-content">${formatMarkdownText(cleanReply)}</div>
      <div class="ai-bubble-actions">
        <button class="tts-btn" onclick="playTTS(this.parentElement.previousElementSibling.innerText, this)" title="ស្តាប់សំឡេង (Listen)">🔊 ស្តាប់</button>
        <button class="copy-btn" onclick="copyBubbleText(this)" title="ចម្លងអត្ថបទ">📋 ចម្លង</button>
      </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    thinkBubble.innerHTML = `
      <div class="ai-bubble-header">
        <span class="ai-bubble-author">👨‍🏫 គ្រូសន (Teacher Sorn)</span>
        <span class="ai-bubble-badge text-rose-400">កំហុស</span>
      </div>
      <div class="ai-bubble-content">⚠️ មានបញ្ហាក្នុងការតភ្ជាប់ជាមួយម៉ាស៊ីន AI។ សូមពិនិត្យការភ្ជាប់អ៊ីនធឺណិត ឬប្តូរម៉ាស៊ីន AI ខាងលើ។</div>
    `;
  }
}

function handleStudioChatKeyPress(e) {
  if (e.key === 'Enter') sendStudioChatMessage();
}

function sendStudioPrompt(promptText) {
  const input = document.getElementById('studioChatInput');
  if (input) {
    input.value = promptText;
    sendStudioChatMessage();
  }
}

async function clearStudioChatHistory() {
  if (!confirm('តើអ្នកពិតជាចង់សម្អាតប្រវត្តិសារទាំងអស់មែនទេ?')) return;

  if (STATE.currentUser) {
    try {
      await fetch('/api/chat/history', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: STATE.currentUser.id })
      });
    } catch (e) {}
  }

  const chatBox = document.getElementById('aiStudioMessagesBox');
  if (chatBox) {
    chatBox.innerHTML = `
      <div class="chat-bubble ai">
        <div class="ai-bubble-header">
          <span class="ai-bubble-author">👨‍🏫 គ្រូសន (Teacher Sorn)</span>
          <span class="ai-bubble-badge">Official AI</span>
        </div>
        <div class="ai-bubble-content">
          សារទាំងអស់ត្រូវបានសម្អាតរួចរាល់! 🎉<br>
          តើប្អូនមានសំណួរអ្វីថ្មីទៀតទេ? គ្រូសនត្រៀមជួយប្អូនជានិច្ច!
        </div>
      </div>
    `;
  }
  showToast('បានសម្អាតប្រវត្តិសារជោគជ័យ!', 'success');
}

async function loadStudioChatHistory() {
  if (!STATE.currentUser) return;
  try {
    const res = await fetch(`/api/chat/history?userId=${STATE.currentUser.id}&limit=25`);
    const data = await res.json();

    if (data.success && Array.isArray(data.history) && data.history.length > 0) {
      STATE.chatHistoryLoaded = true;
      const chatBox = document.getElementById('aiStudioMessagesBox');
      if (!chatBox) return;

      chatBox.innerHTML = '';
      data.history.forEach(item => {
        const bubble = document.createElement('div');
        if (item.role === 'user') {
          bubble.className = 'chat-bubble user';
          bubble.textContent = item.text;
        } else {
          bubble.className = 'chat-bubble ai';
          bubble.innerHTML = `
            <div class="ai-bubble-header">
              <span class="ai-bubble-author">👨‍🏫 គ្រូសន (Teacher Sorn)</span>
              <span class="ai-bubble-badge">${item.provider || 'AI'}</span>
            </div>
            <div class="ai-bubble-content">${formatMarkdownText(item.text)}</div>
            <div class="ai-bubble-actions">
              <button class="tts-btn" onclick="playTTS(this.parentElement.previousElementSibling.innerText, this)" title="ស្តាប់សំឡេង">🔊 ស្តាប់</button>
              <button class="copy-btn" onclick="copyBubbleText(this)" title="ចម្លង">📋 ចម្លង</button>
            </div>
          `;
        }
        chatBox.appendChild(bubble);
      });
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  } catch (err) {
    console.warn('Could not load chat history:', err);
  }
}

async function toggleStudioVoiceRecord() {
  const btn = document.getElementById('studioRecordVoiceBtn');
  const input = document.getElementById('studioChatInput');

  if (studioMediaRecorder && studioMediaRecorder.state === 'recording') {
    studioMediaRecorder.stop();
    btn.innerHTML = '<span class="mic-icon">🎤</span>';
    btn.classList.remove('recording');
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    studioMediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    studioAudioChunks = [];

    studioMediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) studioAudioChunks.push(e.data);
    };

    studioMediaRecorder.onstop = async () => {
      stream.getTracks().forEach(track => track.stop());
      const audioBlob = new Blob(studioAudioChunks, { type: 'audio/webm' });

      const oldPlaceholder = input.placeholder;
      input.placeholder = "⏳ កំពុងបំប្លែងសំឡេងនិយាយទៅជាអក្សរ (STT)...";

      try {
        const res = await fetch('/api/stt', {
          method: 'POST',
          body: audioBlob
        });
        const data = await res.json();

        if (data.success && data.text) {
          input.value = data.text;
          sendStudioChatMessage();
        } else {
          showToast("បរាជ័យក្នុងការបំប្លែងសំឡេង សូមសាកល្បងម្តងទៀត", "error");
        }
      } catch (err) {
        showToast("បរាជ័យក្នុងការបំប្លែងសំឡេង", "error");
      }
      input.placeholder = oldPlaceholder;
    };

    studioMediaRecorder.start();
    btn.innerHTML = '<span class="mic-icon">⏹️</span>';
    btn.classList.add('recording');
    showToast('🎙️ កំពុងថតសំឡេង... និយាយភាសាខ្មែរ ឬអង់គ្លេស រួចចុចម្តងទៀតដើម្បីផ្ញើ!', 'info');
  } catch (err) {
    alert("សូមអនុញ្ញាតឱ្យប្រើប្រាស់មីក្រូហ្វូនក្នុង Browser របស់អ្នក!");
  }
}

// ----------------------------------------------------
// C. UNIVERSAL FLOATING AI ASSISTANT WIDGET
// ----------------------------------------------------

let floatingMediaRecorder;
let floatingAudioChunks = [];

function toggleFloatingChat(forceState) {
  const drawer = document.getElementById('floatingChatDrawer');
  if (!drawer) return;

  if (typeof forceState === 'boolean') {
    if (forceState) {
      drawer.classList.remove('hidden');
    } else {
      drawer.classList.add('hidden');
    }
  } else {
    drawer.classList.toggle('hidden');
  }

  const isClosed = drawer.classList.contains('hidden');
  if (!isClosed) {
    const input = document.getElementById('floatingChatInput');
    if (input) input.focus();

    // Update context label
    const label = document.getElementById('floatingContextLabel');
    if (label) {
      if (STATE.activeTab === 'lesson' && STATE.currentLesson) {
        label.textContent = `🟢 មេរៀន៖ ${STATE.currentLesson.title.substring(0, 16)}...`;
      } else {
        label.textContent = '🟢 អនឡាញ • ជួយឆ្លើយគ្រប់ទំព័រ';
      }
    }
    const chatBox = document.getElementById('floatingChatMessagesBox');
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  }
}

function closeFloatingChat() {
  toggleFloatingChat(false);
}

// Global listener for ESC key to close floating drawer
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeFloatingChat();
  }
});

// Click outside to close floating drawer
document.addEventListener('click', (e) => {
  const widget = document.getElementById('universalFloatingAi');
  const drawer = document.getElementById('floatingChatDrawer');
  if (widget && drawer && !drawer.classList.contains('hidden')) {
    if (!widget.contains(e.target)) {
      closeFloatingChat();
    }
  }
});

async function sendFloatingChatMessage() {
  const input = document.getElementById('floatingChatInput');
  const msg = input ? input.value.trim() : '';
  if (!msg) return;

  const chatBox = document.getElementById('floatingChatMessagesBox');
  input.value = '';

  // Append user bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.textContent = msg;
  chatBox.appendChild(userBubble);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Append thinking bubble
  const thinkBubble = document.createElement('div');
  thinkBubble.className = 'chat-bubble ai';
  thinkBubble.innerHTML = '⏳ <em>គ្រូសនកំពុងគិត...</em>';
  chatBox.appendChild(thinkBubble);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: STATE.currentUser?.id || 'guest',
        message: msg,
        preferredAI: STATE.preferredAI || 'auto',
        lessonTitle: STATE.currentLesson?.title || 'General English',
        extraContext: `Page: ${STATE.activeTab}`
      })
    });

    const data = await res.json();
    const cleanReply = data.reply || 'សូមអភ័យទោស ខ្ញុំមិនអាចឆ្លើយបានទេ។';
    const provider = data.provider || 'AI';

    thinkBubble.innerHTML = `
      <div class="ai-bubble-header">
        <span class="ai-bubble-author">👨‍🏫 គ្រូសន</span>
        <span class="ai-bubble-badge">${provider}</span>
      </div>
      <div class="ai-bubble-content">${formatMarkdownText(cleanReply)}</div>
      <div class="ai-bubble-actions">
        <button class="tts-btn" onclick="playTTS(this.parentElement.previousElementSibling.innerText, this)" title="ស្តាប់សំឡេង">🔊 ស្តាប់</button>
      </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    thinkBubble.textContent = '⚠️ មានបញ្ហាក្នុងការតភ្ជាប់ជាមួយ AI';
  }
}

function handleFloatingChatKey(e) {
  if (e.key === 'Enter') sendFloatingChatMessage();
}

function sendFloatingPrompt(promptText) {
  const input = document.getElementById('floatingChatInput');
  if (input) {
    input.value = promptText;
    sendFloatingChatMessage();
  }
}

async function toggleFloatingVoiceRecord() {
  const btn = document.getElementById('floatingMicBtn');
  const input = document.getElementById('floatingChatInput');

  if (floatingMediaRecorder && floatingMediaRecorder.state === 'recording') {
    floatingMediaRecorder.stop();
    btn.innerHTML = '🎤';
    btn.classList.remove('recording');
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    floatingMediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    floatingAudioChunks = [];

    floatingMediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) floatingAudioChunks.push(e.data);
    };

    floatingMediaRecorder.onstop = async () => {
      stream.getTracks().forEach(track => track.stop());
      const audioBlob = new Blob(floatingAudioChunks, { type: 'audio/webm' });

      const oldPlaceholder = input.placeholder;
      input.placeholder = "⏳ កំពុងបំប្លែងសំឡេង...";

      try {
        const res = await fetch('/api/stt', {
          method: 'POST',
          body: audioBlob
        });
        const data = await res.json();

        if (data.success && data.text) {
          input.value = data.text;
          sendFloatingChatMessage();
        } else {
          showToast("បរាជ័យក្នុងការបំប្លែងសំឡេង", "error");
        }
      } catch (err) {
        showToast("បរាជ័យក្នុងការបំប្លែងសំឡេង", "error");
      }
      input.placeholder = oldPlaceholder;
    };

    floatingMediaRecorder.start();
    btn.innerHTML = '⏹️';
    btn.classList.add('recording');
  } catch (err) {
    alert("សូមអនុញ្ញាតឱ្យប្រើប្រាស់មីក្រូហ្វូនក្នុង Browser របស់អ្នក!");
  }
}

// ==========================================
// 6. QUIZ ENGINE
// ==========================================

async function startCurrentLessonQuiz() {
  if (!STATE.currentLesson) return;
  const { monthId, weekId, lessonId } = STATE.currentLesson;

  try {
    showToast('⏳ កំពុងបង្កើតវិញ្ញាសា Quiz...', 'info');
    const res = await fetch(`/api/quiz/start?type=lesson&monthId=${monthId}&weekId=${weekId}&lessonId=${lessonId}&userId=${STATE.currentUser?.id || ''}`);
    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to start quiz');
    }

    launchQuizEngine(data, 'LESSON QUIZ');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function startAnnualExam(subjectKey) {
  try {
    showToast('⏳ កំពុងរៀបចំវិញ្ញាសាប្រឡងបញ្ចប់មុខវិជ្ជា...', 'info');
    const res = await fetch(`/api/quiz/start?type=annual&subjectKey=${subjectKey}&userId=${STATE.currentUser?.id || ''}`);
    const data = await res.json();

    if (!data.success) {
      if (data.isLocked) {
        showToast(data.error, 'error');
        navigateTo('vip');
        return;
      }
      throw new Error(data.error || 'Failed to start annual exam');
    }

    launchQuizEngine(data, 'ANNUAL EXAM');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function launchQuizEngine(quizData, badgeLabel) {
  STATE.quizSession = quizData;
  STATE.currentQuizIndex = 0;
  STATE.userAnswers = {};

  document.getElementById('quizTypeBadge').textContent = badgeLabel;
  document.getElementById('quizTitleDisplay').textContent = quizData.quizTitle;

  renderQuizPills();
  displayQuestion(0);
  navigateTo('quiz');
}

function renderQuizPills() {
  const bar = document.getElementById('quizPillsBar');
  if (!bar || !STATE.quizSession) return;
  bar.innerHTML = '';

  const total = STATE.quizSession.questions.length;
  for (let i = 0; i < total; i++) {
    const pill = document.createElement('div');
    const isAnswered = STATE.userAnswers[i] !== undefined;
    const isActive = i === STATE.currentQuizIndex;
    pill.className = `q-pill ${isActive ? 'active' : ''} ${isAnswered ? 'answered' : ''}`;
    pill.textContent = i + 1;
    pill.onclick = () => {
      displayQuestion(i);
    };
    bar.appendChild(pill);
  }
}

function displayQuestion(idx) {
  if (!STATE.quizSession || !STATE.quizSession.questions[idx]) return;
  STATE.currentQuizIndex = idx;
  const q = STATE.quizSession.questions[idx];
  const total = STATE.quizSession.questions.length;

  document.getElementById('quizCounterText').textContent = `សំណួរ ${idx + 1} / ${total}`;
  document.getElementById('questionNumLabel').textContent = `សំណួរទី ${idx + 1}`;
  document.getElementById('questionTextDisplay').textContent = q.question;

  const optionsList = document.getElementById('quizOptionsList');
  optionsList.innerHTML = '';

  const optLetters = ['A', 'B', 'C', 'D'];
  q.options.forEach((opt, optIdx) => {
    const btn = document.createElement('div');
    const isSelected = STATE.userAnswers[idx] === optIdx;
    btn.className = `quiz-option-btn ${isSelected ? 'selected' : ''}`;
    btn.innerHTML = `
      <span class="opt-key">${optLetters[optIdx] || optIdx + 1}</span>
      <span class="opt-text">${opt}</span>
    `;
    btn.onclick = () => {
      STATE.userAnswers[idx] = optIdx;
      displayQuestion(idx);
    };
    optionsList.appendChild(btn);
  });

  // Update navigation buttons
  document.getElementById('prevQuizBtn').disabled = idx === 0;

  const nextBtn = document.getElementById('nextQuizBtn');
  const submitBtn = document.getElementById('submitQuizBtn');

  if (idx === total - 1) {
    nextBtn.classList.add('hidden');
    submitBtn.classList.remove('hidden');
  } else {
    nextBtn.classList.remove('hidden');
    submitBtn.classList.add('hidden');
  }

  renderQuizPills();
}

function prevQuestion() {
  if (STATE.currentQuizIndex > 0) {
    displayQuestion(STATE.currentQuizIndex - 1);
  }
}

function nextQuestion() {
  if (STATE.quizSession && STATE.currentQuizIndex + 1 < STATE.quizSession.questions.length) {
    displayQuestion(STATE.currentQuizIndex + 1);
  }
}

function cancelQuiz() {
  if (confirm('តើអ្នកពិតជាចង់បោះបង់ការប្រឡងនេះមែនទេ? ពិន្ទុនឹងមិនត្រូវបានកត់ត្រាឡើយ។')) {
    navigateTo(STATE.currentLesson ? 'lesson' : 'dashboard');
  }
}

async function submitQuiz() {
  if (!STATE.quizSession) return;
  const total = STATE.quizSession.questions.length;
  const answeredCount = Object.keys(STATE.userAnswers).length;

  if (answeredCount < total) {
    if (!confirm(`អ្នកឆ្លើយបានតែ ${answeredCount} ក្នុងចំណោម ${total} សំណួរ។ តើអ្នកចង់បញ្ជូនចម្លើយឥឡូវនេះមែនទេ?`)) {
      return;
    }
  }

  try {
    showToast('⏳ កំពុងត្រួតពិនិត្យ និងវាយតម្លៃពិន្ទុ...', 'info');

    const res = await fetch('/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: STATE.quizSession.sessionId,
        userId: STATE.currentUser?.id || 'guest_' + Date.now(),
        studentName: STATE.currentUser?.name || 'សិស្ស',
        answers: STATE.userAnswers
      })
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Submission failed');

    // Show Result Modal
    showQuizResultModal(data);
    refreshUserProfile();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function showQuizResultModal(result) {
  const modal = document.getElementById('quizResultModal');
  const gradeCircle = document.getElementById('resGradeCircle');
  const gradeTitle = document.getElementById('resGradeTitle');
  const scoreText = document.getElementById('resScoreText');
  const feedback = document.getElementById('resFeedbackMsg');
  const actions = document.getElementById('resActionsContainer');
  const reviewList = document.getElementById('resReviewList');

  const isBeginnerFinal = result.isBeginnerFinal || STATE.isBeginnerFinalExam;
  const isBeginnerLesson = STATE.currentLesson?.monthId === 'beginner' && !isBeginnerFinal;
  STATE.isBeginnerFinalExam = false; // reset

  const isElementaryExam = result.isElementaryExam || STATE.isElementaryExam;
  const isElementaryFinal = result.isElementaryFinal || (isElementaryExam && (result.examMonth === 3 || STATE.elementaryExamMonth === 3));
  const isElementaryLesson = (STATE.currentLesson?.monthId === 'elementary' || (STATE.currentLesson?.monthId && STATE.currentLesson.monthId.startsWith('em'))) && !isElementaryExam;
  const examMonth = result.examMonth || STATE.elementaryExamMonth || 1;
  STATE.isElementaryExam = false; // reset

  gradeCircle.textContent = result.grade;
  gradeTitle.textContent = result.gradeTitle || `និទ្ទេស ${result.grade}`;
  scoreText.textContent = `${result.score} / ${result.total} ពិន្ទុ (${result.percent}%)`;

  if (result.isPassed) {
    gradeCircle.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';

    if (isBeginnerFinal && result.certId) {
      // Graduation!
      feedback.innerHTML = `🎓 <strong>អបអរសាទរ! អ្នកបានសម្រេចថ្នាក់ដំបូង!</strong> ទទួលបានវិញ្ញាបនបត្របញ្ចប់ការសិក្សា English for Children (A-Z)!`;
      actions.innerHTML = `
        <button class="btn btn-gold btn-lg" onclick="openCertificatePreview('${result.certId}')">
          <span>🎓 មើលវិញ្ញាបនបត្របញ្ចប់ថ្នាក់ដំបូង</span>
        </button>
        <button class="btn btn-outline" onclick="closeModal('quizResultModal'); navigateTo('curriculum'); loadBeginnerStatus();">
          <span>🔓 ចូលរៀនថ្នាក់បឋមសិក្សា</span>
        </button>
      `;
      // Reload beginner status to reflect graduation
      loadBeginnerStatus().then(() => renderBeginnerWeeks());
    } else if (isElementaryFinal && result.certId) {
      // Elementary Graduation!
      feedback.innerHTML = `🎓 <strong>អបអរសាទរយ៉ាងក្រៃលែង! អ្នកបានបញ្ចប់ថ្នាក់បឋមសិក្សា (Elementary Level)!</strong><br>ទទួលបានវិញ្ញាបនបត្របញ្ចប់ការសិក្សាផ្លូវការ 🏆`;
      actions.innerHTML = `
        <button class="btn btn-gold btn-lg" onclick="openCertificatePreview('${result.certId}')">
          <span>🎓 មើលវិញ្ញាបនបត្របញ្ចប់ថ្នាក់បឋមសិក្សា</span>
        </button>
        <button class="btn btn-outline" onclick="closeModal('quizResultModal'); navigateTo('curriculum'); loadElementaryStatus();">
          <span>📚 បន្តទៅបញ្ជីមេរៀន</span>
        </button>
      `;
      loadElementaryStatus().then(() => renderElementaryWeeks());
    } else if (isElementaryExam && result.certId) {
      // Elementary Month 1 or Month 2 exam passed!
      feedback.innerHTML = `🎉 <strong>អបអរសាទរ! អ្នកបានប្រឡងជាប់ខែទី ${examMonth} នៃថ្នាក់បឋមសិក្សា!</strong><br>ទទួលបានវិញ្ញាបនបត្រផ្លូវការប្រចាំខែ 📜`;
      actions.innerHTML = `
        <button class="btn btn-gold btn-lg" onclick="openCertificatePreview('${result.certId}')">
          <span>📜 មើលវិញ្ញាបនបត្រប្រចាំខែទី ${examMonth}</span>
        </button>
        <button class="btn btn-outline" onclick="closeModal('quizResultModal'); STATE.selectedElementaryMonthId = 'em${examMonth + 1}'; renderElementaryMonthsTabs();">
          <span>📚 ចូលរៀនខែទី ${examMonth + 1} ▶</span>
        </button>
      `;
      loadElementaryStatus().then(() => renderElementaryWeeks());
    } else if (isBeginnerLesson || isElementaryLesson) {
      // Daily lesson passed (1/1 or 4/4) - no certificate!
      feedback.innerHTML = `✅ <strong>ល្អណាស់!</strong> អ្នកបានប្រឡងជាប់មេរៀនថ្ងៃនេះ! <br>(<strong>ចំណាំ:</strong> ការប្រឡងប្រចាំថ្ងៃ មិនទទួលបានវិញ្ញាបនបត្រឡើយ — ប្រឡងបញ្ចប់${isElementaryLesson ? 'ប្រចាំខែ' : '២៦ ថ្ងៃ'} ទើបបានវិញ្ញាបនបត្រ!)`;
      actions.innerHTML = `
        <button class="btn btn-primary" onclick="closeModal('quizResultModal'); goToNextLesson();">
          <span>មេរៀនបន្ទាប់ ▶</span>
        </button>
        <button class="btn btn-glass" onclick="closeModal('quizResultModal'); returnToLessonList();">
          <span>🔙 ត្រឡប់ទៅបញ្ជីមេរៀន</span>
        </button>
        <button class="btn btn-outline" onclick="closeModal('quizResultModal');">
          <span>📖 អានមេរៀននេះទៀត</span>
        </button>
      `;
      refreshUserProfile().then(() => {
        if (isElementaryLesson) {
          loadElementaryStatus().then(() => updateLessonNavButtons());
        } else {
          loadBeginnerStatus().then(() => updateLessonNavButtons());
        }
      });
    } else if (result.certId) {
      // Annual exam or standard lesson with cert
      feedback.innerHTML = `🎉 <strong>អបអរសាទរយ៉ាងក្រៃលែង!</strong> អ្នកបានប្រឡងជាប់និទ្ទេស <strong>${result.grade}</strong> ហើយទទួលបានវិញ្ញាបនបត្រផ្លូវការទម្រង់ A4 ផ្តេក!`;
      actions.innerHTML = `
        <button class="btn btn-gold btn-lg" onclick="openCertificatePreview('${result.certId}')">
          <span>📜 មើលវិញ្ញាបនបត្រ A4 ផ្តេក</span>
        </button>
        <button class="btn btn-outline" onclick="closeModal('quizResultModal'); navigateTo('curriculum');">
          <span>📚 បន្តរៀនមេរៀនបន្ទាប់</span>
        </button>
      `;
    } else {
      feedback.innerHTML = `✅ <strong>ប្រឡងជាប់!</strong> ការប្រឡងត្រូវបានកត់ត្រានៅក្នុងប្រវត្តិ។`;
      actions.innerHTML = `
        <button class="btn btn-primary" onclick="closeModal('quizResultModal'); refreshUserProfile();">
          <span>📚 បន្ត</span>
        </button>
      `;
    }
  } else {
    gradeCircle.style.background = 'linear-gradient(135deg, #f43f5e, #e11d48)';

    if (isBeginnerLesson) {
      feedback.innerHTML = `❌ <strong>មិនទាន់ជាប់ទេ!</strong> អ្នកត្រូវឆ្លើយឱ្យបាន 1/1 ទើបរៀនមេរៀនបន្ទាប់បាន! <strong>ព្យាយាមម្តងទៀត!</strong>`;
      actions.innerHTML = `
        <button class="btn btn-primary" onclick="closeModal('quizResultModal'); startCurrentLessonQuiz();">
          <span>🔄 ប្រឡងម្តងទៀត (១ សំណួរ)</span>
        </button>
        <button class="btn btn-outline" onclick="closeModal('quizResultModal');">
          <span>📖 អានមេរៀនម្តងទៀត</span>
        </button>
      `;
    } else if (isElementaryLesson) {
      feedback.innerHTML = `❌ <strong>មិនទាន់ជាប់ទេ!</strong> ការប្រឡងមេរៀនប្រចាំថ្ងៃត្រូវការ ≥70% (3/4 សំណួរ)។ <strong>ព្យាយាមម្តងទៀត!</strong>`;
      actions.innerHTML = `
        <button class="btn btn-primary" onclick="closeModal('quizResultModal'); startCurrentLessonQuiz();">
          <span>🔄 ប្រឡងម្តងទៀត (៤ សំណួរ)</span>
        </button>
        <button class="btn btn-outline" onclick="closeModal('quizResultModal');">
          <span>📖 អានមេរៀនម្តងទៀត</span>
        </button>
      `;
    } else if (isElementaryExam) {
      feedback.innerHTML = `❌ <strong>មិនទាន់ជាប់ទេ!</strong> ការប្រឡង${isElementaryFinal ? 'បញ្ចប់វគ្គ' : `ប្រចាំខែទី ${examMonth}`} ត្រូវការ ≥70%។ ព្យាយាមម្តងទៀត!`;
      actions.innerHTML = `
        <button class="btn btn-primary" onclick="closeModal('quizResultModal'); startElementaryExam(${examMonth});">
          <span>🔄 ប្រឡងម្តងទៀត</span>
        </button>
        <button class="btn btn-outline" onclick="closeModal('quizResultModal');">
          <span>📚 ត្រឡប់ទៅ</span>
        </button>
      `;
    } else if (isBeginnerFinal) {
      feedback.innerHTML = `❌ <strong>មិនទាន់ជាប់ទេ!</strong> ប្រឡងបញ្ចប់ ត្រូវការ ≥70% (14/20)។ ព្យាយាមម្តងទៀត!`;
      actions.innerHTML = `
        <button class="btn btn-primary" onclick="closeModal('quizResultModal'); startBeginnerFinalExam();">
          <span>🔄 ប្រឡងបញ្ចប់ម្តងទៀត</span>
        </button>
        <button class="btn btn-outline" onclick="closeModal('quizResultModal');">
          <span>📚 ត្រឡប់ទៅ</span>
        </button>
      `;
    } else {
      feedback.innerHTML = `💪 <strong>ព្យាយាមម្តងទៀតណា៎!</strong> អ្នកទទួលបាន ${result.percent}%។ ដើម្បីទទួលបានវិញ្ញាបនបត្រ អ្នកត្រូវប្រឡងជាប់ចាប់ពី 70% (និទ្ទេស A, B, ឬ C) ឡើងទៅ។`;
      actions.innerHTML = `
        <button class="btn btn-primary" onclick="closeModal('quizResultModal'); startCurrentLessonQuiz();">
          <span>🔄 ប្រឡងម្តងទៀត</span>
        </button>
        <button class="btn btn-outline" onclick="closeModal('quizResultModal');">
          <span>📖 អានមេរៀនឡើងវិញ</span>
        </button>
      `;
    }
  }

  // Populate Review
  reviewList.innerHTML = (result.review || []).map((r, i) => `
    <div class="review-item ${r.isCorrect ? 'correct' : 'wrong'}">
      <div><strong>${i + 1}. ${r.question}</strong></div>
      <div>ចម្លើយរបស់អ្នក៖ <span style="color: ${r.isCorrect ? '#10b981' : '#f43f5e'}">${r.studentAnswer}</span> ${r.isCorrect ? '✅' : '❌'}</div>
      ${!r.isCorrect ? `<div>ចម្លើយត្រឹមត្រូវ៖ <span style="color: #38bdf8">${r.correctAnswer}</span></div>` : ''}
    </div>
  `).join('');

  modal.classList.remove('hidden');
}


// ==========================================
// 7. ANNUAL EXAMS CENTER
// ==========================================

async function loadAnnualExams() {
  const grid = document.getElementById('annualExamsGrid');
  if (!grid) return;

  try {
    const res = await fetch('/api/annual-exams');
    const data = await res.json();
    if (!data.success) return;

    const userCerts = STATE.currentUser?.subjectCerts || {};

    grid.innerHTML = data.exams.map((ex, idx) => {
      const isPassed = !!userCerts[ex.key];
      const certInfo = userCerts[ex.key];

      return `
        <div class="annual-subject-card glass-panel ${isPassed ? 'passed' : ''}">
          ${isPassed ? `<span class="passed-ribbon">✅ ជាប់និទ្ទេស ${certInfo.grade}</span>` : ''}
          <div class="f-icon">${ex.icon || '📘'}</div>
          <h3 class="f-title">${idx + 1}. ${ex.shortTitle || ex.title}</h3>
          <p class="f-desc">${ex.description}</p>
          <div class="mt-auto">
            ${isPassed ? `
              <div style="display:flex; gap:8px;">
                <button class="btn btn-gold btn-sm" onclick="openCertificatePreview('${certInfo.certId}')">📜 វិញ្ញាបនបត្រ</button>
                <button class="btn btn-outline btn-sm" onclick="startAnnualExam('${ex.key}')">🔄 ប្រឡងម្តងទៀត</button>
              </div>
            ` : `
              <button class="btn btn-primary btn-block" onclick="startAnnualExam('${ex.key}')">
                <span>📝 ចាប់ផ្តើមប្រឡង (២០ សំណួរ)</span>
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');
  } catch (e) {
    console.error('Failed to load annual exams:', e);
  }
}

// ==========================================
// 8. CERTIFICATES & REFRESH LOGIC
// ==========================================

async function loadUserCertificates() {
  const container = document.getElementById('certificatesListContainer');
  if (!container) return;

  if (!STATE.currentUser || !STATE.currentUser.id) {
    container.innerHTML = `
      <div class="text-center p-8 glass-panel" style="grid-column: 1 / -1;">
        <p class="text-lg text-slate-300 mb-4">🔒 សូមចូលគណនី ឬភ្ជាប់គណនី Telegram ដើម្បីមើលវិញ្ញាបនបត្ររបស់អ្នក!</p>
        <button class="btn btn-primary" onclick="openLoginModal()">🔑 ចូលគណនីឥឡូវនេះ</button>
      </div>
    `;
    return;
  }

  container.innerHTML = '<div class="text-center p-8">⏳ កំពុងទាញយកទិន្នន័យវិញ្ញាបនបត្រ...</div>';

  try {
    const res = await fetch(`/api/certificates/${STATE.currentUser.id}`);
    const data = await res.json();

    if (!data.success || !data.certificates || data.certificates.length === 0) {
      container.innerHTML = `
        <div class="text-center p-8 glass-panel" style="grid-column: 1 / -1;">
          <div style="font-size: 48px; margin-bottom: 12px;">📜</div>
          <h3 class="text-xl font-bold mb-2">មិនទាន់មានវិញ្ញាបនបត្រនៅឡើយទេ</h3>
          <p class="text-muted mb-4">ដើម្បីទទួលបានវិញ្ញាបនបត្រផ្លូវការទម្រង់ A4 ផ្តេក សូមបញ្ចប់មេរៀននីមួយៗ ឬចូលរួមប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ!</p>
          <div style="display:flex; gap:12px; justify-content:center;">
            <button class="btn btn-primary" onclick="navigateTo('curriculum')">📚 ទៅកាន់បញ្ជីមេរៀន</button>
            <button class="btn btn-gold" onclick="navigateTo('annual-exams')">🎓 ប្រឡងបញ្ចប់មុខវិជ្ជា</button>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = data.certificates.map(cert => {
      const isAnnual = cert.isAnnualExam;
      const isBeginner = cert.isBeginnerFinal;
      const isElemFinal = cert.isElementaryFinal;
      const isElemExam = cert.isElementaryExam;
      const typeLabel = isBeginner ? '🎓 បញ្ចប់ថ្នាក់ដំបូង (English for Children)' : 
                       (isElemFinal ? '🎓 បញ្ចប់ថ្នាក់បឋមសិក្សា (Elementary Graduation)' : 
                       (isElemExam ? `📜 ប្រឡងប្រចាំខែទី ${cert.examMonth || 1} (Elementary)` : 
                       (isAnnual ? '🎓 ប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ' : '📚 បញ្ចប់មេរៀនជោគជ័យ')));
      const certTitle = cert.subjectTitle || cert.lessonTitle || cert.title || 'វិញ្ញាបនបត្រ';

      return `
        <div class="cert-card-item glass-panel">
          <div class="cert-type-pill">${typeLabel}</div>
          <h3 class="cert-card-title">${certTitle}</h3>
          <div class="cert-card-sub">សិស្ស៖ <strong>${cert.studentName || STATE.currentUser.name}</strong> • កូដ៖ <code>CERT-${cert.certId}</code></div>
          <div class="cert-card-meta">
            <span>🏆 និទ្ទេស៖ <strong>ថ្នាក់ ${cert.grade}</strong> (${cert.percent || 100}%)</span>
            <span>📅 ចេញថ្ងៃ៖ ${cert.dateStr || '2026'}</span>
          </div>
          <div class="cert-card-actions">
            <button class="btn btn-gold btn-sm" onclick="openCertificatePreview('${cert.certId}')">
              <span>👁️ បើកមើល A4 ផ្តេក</span>
            </button>
            <button class="btn btn-cyan btn-sm" onclick="refreshSingleCertificate('${cert.certId}', '${certTitle}', ${isAnnual}, '${cert.subjectKey || ''}', '${cert.lessonId || ''}')">
              <span>🔄 Refresh ថ្មី</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    container.innerHTML = '<div class="text-center p-8 text-rose-400">⚠️ មានបញ្ហាក្នុងការទាញយកទិន្នន័យ</div>';
  }
}

function openCertificatePreview(certId) {
  STATE.currentCertPreviewId = certId;
  const iframe = document.getElementById('certPreviewIframe');
  if (iframe) {
    iframe.src = `/api/certificates/html/${certId}`;
  }
  openModal('certPreviewModal');
}

function printCertificateIframe() {
  const iframe = document.getElementById('certPreviewIframe');
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.print();
  }
}

function downloadCertificateHtml() {
  if (!STATE.currentCertPreviewId) return;
  window.open(`/api/certificates/html/${STATE.currentCertPreviewId}`, '_blank');
}

async function triggerCertRefresh() {
  if (!STATE.currentCertPreviewId) return;
  await refreshSingleCertificate(STATE.currentCertPreviewId);
  const iframe = document.getElementById('certPreviewIframe');
  if (iframe) {
    iframe.src = `/api/certificates/html/${STATE.currentCertPreviewId}?t=${Date.now()}`;
  }
}

async function refreshSingleCertificate(certId, title, isAnnualExam, subjectKey, lessonId) {
  if (!STATE.currentUser) return showToast('សូមចូលគណនីជាមុនសិន', 'error');

  showToast('🔄 កំពុង Refresh វិញ្ញាបនបត្រជូនអ្នក...', 'info');
  try {
    const res = await fetch('/api/certificates/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: STATE.currentUser.id,
        certId,
        studentName: STATE.currentUser.name,
        title,
        isAnnualExam,
        subjectKey,
        lessonId
      })
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.error);

    showToast('✅ វិញ្ញាបនបត្រត្រូវបាន Refresh និងអាប់ដេតជោគជ័យ!', 'success');
    loadUserCertificates();
  } catch (e) {
    showToast('បរាជ័យក្នុងការ Refresh', 'error');
  }
}

async function refreshAllCertificates() {
  if (!STATE.currentUser) return showToast('សូមចូលគណនីជាមុនសិន', 'error');

  showToast('🔄 កំពុង Refresh វិញ្ញាបនបត្រទាំងអស់...', 'info');
  try {
    const res = await fetch(`/api/certificates/${STATE.currentUser.id}`);
    const data = await res.json();
    if (!data.certificates || data.certificates.length === 0) {
      return showToast('មិនមានវិញ្ញាបនបត្រសម្រាប់ Refresh ទេ', 'info');
    }

    for (const c of data.certificates) {
      await fetch('/api/certificates/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: STATE.currentUser.id,
          certId: c.certId,
          studentName: STATE.currentUser.name,
          title: c.subjectTitle || c.lessonTitle || c.title,
          isAnnualExam: c.isAnnualExam,
          subjectKey: c.subjectKey,
          lessonId: c.lessonId
        })
      });
    }

    showToast(`✅ បាន Refresh វិញ្ញាបនបត្រសរុប ${data.certificates.length} ច្បាប់ដោយជោគជ័យ!`, 'success');
    loadUserCertificates();
  } catch (e) {
    showToast('មានបញ្ហាក្នុងការ Refresh ទាំងអស់', 'error');
  }
}

function refreshCurrentLessonCert() {
  if (!STATE.currentLesson) return;
  const key = `${STATE.currentLesson.monthId}-${STATE.currentLesson.weekId}-${STATE.currentLesson.lessonId}`;
  const comp = STATE.currentUser?.completedLessons?.[key];
  if (comp && comp.certId) {
    openCertificatePreview(comp.certId);
  } else {
    showToast('មិនមានវិញ្ញាបនបត្រសម្រាប់មេរៀននេះទេ', 'error');
  }
}

// ==========================================
// 9. IRREGULAR VERBS EXPLORER
// ==========================================

async function loadVerbsData() {
  try {
    const res = await fetch('/api/verbs');
    const data = await res.json();
    if (data.success && data.verbs) {
      STATE.allVerbsData = data.verbs;
    }
  } catch (e) {
    console.error('Failed to load verbs:', e);
  }
}

function renderVerbsTable(filterKey = 'all', query = '') {
  const tbody = document.getElementById('verbsTableBody');
  if (!tbody) return;

  let flatList = [];
  if (filterKey === 'all') {
    Object.values(STATE.allVerbsData).forEach(arr => {
      if (Array.isArray(arr)) flatList.push(...arr);
    });
  } else if (STATE.allVerbsData[filterKey]) {
    flatList = STATE.allVerbsData[filterKey];
  }

  if (query) {
    const q = query.toLowerCase();
    flatList = flatList.filter(v =>
      (v.v1 && v.v1.toLowerCase().includes(q)) ||
      (v.v2 && v.v2.toLowerCase().includes(q)) ||
      (v.v3 && v.v3.toLowerCase().includes(q)) ||
      (v.kh && v.kh.includes(q))
    );
  }

  if (flatList.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px;">រកមិនឃើញទិន្នន័យកិរិយាសព្ទទេ</td></tr>';
    return;
  }

  tbody.innerHTML = flatList.map(v => {
    const logo = getWordVisualLogo(v.v1, v.kh);
    return `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="pro-word-logo-badge" style="width:28px;height:28px;min-width:28px;font-size:16px;">${logo}</span>
          <strong style="color: #38bdf8;">${v.v1}</strong>
        </div>
      </td>
      <td>${v.v2}</td>
      <td>${v.v3}</td>
      <td><span style="color: #cbd5e1;">${v.kh}</span></td>
      <td>
        <button class="btn btn-xs btn-outline" onclick="playSingleWordAudio('${v.v1}', this)">🔊</button>
      </td>
    </tr>
  `;
  }).join('');
}

function filterVerbGroup(groupKey) {
  document.querySelectorAll('.verb-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.group === groupKey);
  });
  const q = document.getElementById('verbsSearchInput')?.value || '';
  renderVerbsTable(groupKey, q);
}

function filterVerbs() {
  const q = document.getElementById('verbsSearchInput')?.value || '';
  const activeBtn = document.querySelector('.verb-filter-btn.active');
  const group = activeBtn?.dataset.group || 'all';
  renderVerbsTable(group, q);
}

async function playSingleWordAudio(word, btnElement) {
  const isBeginner = STATE.currentLesson?.monthId === 'beginner' || STATE.courseLevel === 'beginner' || STATE.activeTutor === 'piseth';
  const tutor = isBeginner ? 'piseth' : 'sorn';
  speakEnglish(word, btnElement, tutor);
}

// ==========================================
// 10. AUTHENTICATION & MODAL HANDLERS
// ==========================================

function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}

function openLoginModal() {
  openModal('loginModal');
}

function openRegisterModal() {
  openModal('registerModal');
}

function openSyncModal() {
  startTelegramOneClickLogin();
}

function openProfileModal() {
  if (!STATE.currentUser) return openLoginModal();
  const u = STATE.currentUser;
  const name = u.name || u.username || 'Student';
  const uname = u.username ? `@${u.username}` : (u.isTelegram ? `ID: ${u.id}` : '');
  const gmail = u.gmail || 'មិនមាន';
  const isVerified = !!u.gmailVerified;
  const isTg = u.isTelegram ? '✅ បានភ្ជាប់ Telegram' : '❌ មិនទាន់ភ្ជាប់ Telegram';
  const isVip = u.isVIP ? `💎 VIP (${u.vipDetails?.daysRemaining || 30} ថ្ងៃ)` : 'Free Account';

  const avatar = document.getElementById('profAvatarText');
  const avatarImg = document.getElementById('profAvatarImg');
  const nameTxt = document.getElementById('profNameText');
  const khmerTxt = document.getElementById('profKhmerNameText');
  const unameTxt = document.getElementById('profUsernameText');
  const gmailTxt = document.getElementById('profGmailText');
  const tgTxt = document.getElementById('profTelegramStatus');
  const vipTxt = document.getElementById('profVipStatus');
  const fBadge = document.getElementById('profFirebaseStatusBadge');
  const vBtn = document.getElementById('profVerifyEmailBtn');

  // Display student photo if exists
  if (u.photoUrl && avatarImg) {
    avatarImg.src = u.photoUrl;
    avatarImg.classList.remove('hidden');
    if (avatar) avatar.classList.add('hidden');
  } else {
    if (avatarImg) avatarImg.classList.add('hidden');
    if (avatar) {
      avatar.classList.remove('hidden');
      avatar.textContent = name.charAt(0).toUpperCase();
    }
  }

  if (nameTxt) nameTxt.textContent = name;
  if (khmerTxt) {
    if (u.khmerName) {
      khmerTxt.textContent = `ឈ្មោះខ្មែរ៖ ${u.khmerName}`;
      khmerTxt.classList.remove('hidden');
    } else {
      khmerTxt.textContent = '';
      khmerTxt.classList.add('hidden');
    }
  }
  if (unameTxt) unameTxt.textContent = uname;
  if (gmailTxt) gmailTxt.textContent = gmail;
  if (tgTxt) tgTxt.textContent = isTg;
  if (vipTxt) vipTxt.textContent = isVip;

  if (fBadge) {
    if (isVerified) {
      fBadge.textContent = '✅ Verified (Firebase)';
      fBadge.className = 'badge-status verified';
      if (vBtn) vBtn.classList.add('hidden');
    } else {
      fBadge.textContent = '⚠️ មិនទាន់ផ្ទៀងផ្ទាត់ (Not Verified)';
      fBadge.className = 'badge-status unverified';
      if (vBtn && u.gmail) vBtn.classList.remove('hidden');
    }
  }

  const syncTgBtn = document.getElementById('profSyncTelegramBtn');
  if (syncTgBtn) {
    if (u.isTelegram) {
      syncTgBtn.classList.add('hidden');
    } else {
      syncTgBtn.classList.remove('hidden');
    }
  }

  openModal('profileModal');
  loadUserDevices();
}

function handleLogout(silent = false) {
  closeModal('profileModal');
  localStorage.removeItem('studyai_user_session');
  localStorage.removeItem('studyai_session_token');
  STATE.currentUser = null;
  updateUserInterface();
  if (!silent) {
    showToast('បានចាកចេញពីគណនីជោគជ័យ', 'info');
    navigateTo('dashboard');
  }
}

// ------------------------------------------
// STUDENT PROFILE & PHOTO MANAGEMENT
// ------------------------------------------

function handleStudentPhotoSelected(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  if (file.size > 8 * 1024 * 1024) {
    return showToast('❌ ទំហំរូបថតធំពេក សូមជ្រើសរើសរូបក្រោម 8MB', 'error');
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    const img = new Image();
    img.onload = function() {
      // Compress using HTML5 canvas to max 450x450
      const canvas = document.createElement('canvas');
      const MAX_SIZE = 450;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
      }

      canvas.width = Math.round(width);
      canvas.height = Math.round(height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setStudentPhotoPreview(compressedDataUrl);
      showToast('📷 បានបញ្ចូលរូបថតសិស្សជោគជ័យ!', 'success');
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
}

function setStudentPhotoPreview(url) {
  STATE.tempStudentPhotoUrl = url;
  const previewImg = document.getElementById('studentPhotoPreviewImg');
  const placeholder = document.getElementById('studentPhotoPlaceholder');
  const removeBtn = document.getElementById('removePhotoBtn');

  if (url) {
    if (previewImg) {
      previewImg.src = url;
      previewImg.classList.remove('hidden');
    }
    if (placeholder) placeholder.classList.add('hidden');
    if (removeBtn) removeBtn.classList.remove('hidden');
  } else {
    if (previewImg) {
      previewImg.src = '';
      previewImg.classList.add('hidden');
    }
    if (placeholder) placeholder.classList.remove('hidden');
    if (removeBtn) removeBtn.classList.add('hidden');
  }
}

function handleRemoveStudentPhoto() {
  const fileInput = document.getElementById('studentPhotoFileInput');
  if (fileInput) fileInput.value = '';
  setStudentPhotoPreview(null);
  showToast('🗑️ បានលុបរូបថតសិស្ស', 'info');
}

function selectPresetAvatar(emoji) {
  // Generate a high-res styled avatar using HTML canvas
  const canvas = document.createElement('canvas');
  canvas.width = 240;
  canvas.height = 240;
  const ctx = canvas.getContext('2d');

  // Draw gradient background
  const grad = ctx.createLinearGradient(0, 0, 240, 240);
  grad.addColorStop(0, '#4f46e5');
  grad.addColorStop(1, '#06b6d4');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 240, 240);

  // Draw emoji
  ctx.font = '120px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, 120, 130);

  const dataUrl = canvas.toDataURL('image/png');
  setStudentPhotoPreview(dataUrl);
  showToast(`✨ បានជ្រើសរើសរូបតំណាង ${emoji}`, 'success');
}

function openStudentProfileSetupModal(isNew = false) {
  if (!STATE.currentUser) {
    openLoginModal();
    return;
  }

  const u = STATE.currentUser;
  const titleEl = document.getElementById('studentSetupModalTitle');
  const bannerEl = document.getElementById('studentSetupModalBanner');

  if (titleEl) {
    titleEl.textContent = isNew
      ? '🎉 រៀបចំឈ្មោះ និងរូបថតសិស្ស (Student Setup)'
      : '✏️ កែប្រែឈ្មោះ និងប្តូររូបថតសិស្ស (Edit Profile)';
  }

  if (bannerEl) {
    bannerEl.innerHTML = isNew
      ? '🎉 <strong>សូមស្វាគមន៍!</strong> សូមបំពេញឈ្មោះពេញ និងបញ្ចូលរូបថតផ្ទាល់ខ្លួនរបស់អ្នក ដើម្បីបោះពុម្ពលើ <strong>វិញ្ញាបនបត្រផ្លូវការ (Official Certificate)</strong> និងគណនីសិក្សា!'
      : '💡 លោកអ្នកអាចកែសម្រួលឈ្មោះជាភាសាខ្មែរ ភាសាអង់គ្លេស និងប្តូររូបថតសិស្សបានគ្រប់ពេលវេលា។';
  }

  const nameInput = document.getElementById('studentFullNameInput');
  const khmerInput = document.getElementById('studentKhmerNameInput');
  const phoneInput = document.getElementById('studentPhoneInput');

  if (nameInput) nameInput.value = u.name || u.username || '';
  if (khmerInput) khmerInput.value = u.khmerName || '';
  if (phoneInput) phoneInput.value = u.phone || '';

  setStudentPhotoPreview(u.photoUrl || null);
  openModal('studentProfileSetupModal');
}

async function handleSaveStudentProfile(e) {
  if (e) e.preventDefault();
  if (!STATE.currentUser || !STATE.currentUser.id) {
    return showToast('❌ សូមចូលគណនីជាមុនសិន', 'error');
  }

  const name = (document.getElementById('studentFullNameInput')?.value || '').trim();
  const khmerName = (document.getElementById('studentKhmerNameInput')?.value || '').trim();
  const phone = (document.getElementById('studentPhoneInput')?.value || '').trim();
  const photoUrl = STATE.tempStudentPhotoUrl || null;

  if (!name) {
    return showToast('❌ សូមបញ្ចូលឈ្មោះពេញរបស់សិស្ស', 'error');
  }

  const saveBtn = document.getElementById('saveStudentProfileBtn');
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<span>⏳ កំពុងរក្សាទុក...</span>';
  }

  try {
    const res = await fetch('/api/user/profile/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: STATE.currentUser.id,
        name,
        khmerName,
        photoUrl,
        phone
      })
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'ការរក្សាទុកមិនជោគជ័យ');

    // Update STATE
    STATE.currentUser.name = data.user.name;
    STATE.currentUser.khmerName = data.user.khmerName;
    STATE.currentUser.photoUrl = data.user.photoUrl;
    STATE.currentUser.phone = data.user.phone;

    // Save to local storage
    try {
      localStorage.setItem('studyai_user_session', JSON.stringify(STATE.currentUser));
    } catch (e) {}

    updateUserInterface();
    closeModal('studentProfileSetupModal');
    showToast('🎉 បានរក្សាទុកឈ្មោះ និងរូបថតសិស្សដោយជោគជ័យ!', 'success');
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = '<span>💾 រក្សាទុកព័ត៌មានសិស្ស (Save Profile)</span>';
    }
  }
}

// ------------------------------------------
// MULTI-DEVICE MANAGEMENT
// ------------------------------------------

async function loadUserDevices() {
  const container = document.getElementById('profileDevicesList');
  if (!container || !STATE.currentUser) return;

  const currentDeviceId = getOrCreateDeviceId();
  container.innerHTML = '<div class="text-xs text-slate-500 text-center py-2">⏳ កំពុងផ្ទុកបញ្ជីឧបករណ៍...</div>';

  try {
    const res = await fetch(`/api/auth/devices/${encodeURIComponent(STATE.currentUser.id)}?currentDeviceId=${encodeURIComponent(currentDeviceId)}`);
    const data = await res.json();
    if (!data.success || !data.devices) {
      container.innerHTML = '<div class="text-xs text-slate-500 text-center py-2">មិនមានព័ត៌មានឧបករណ៍ទេ</div>';
      return;
    }

    if (data.devices.length === 0) {
      container.innerHTML = '<div class="text-xs text-slate-500 text-center py-2">មិនមានឧបករណ៍សកម្ម</div>';
      return;
    }

    // Device type icon detector
    function getDeviceIcon(deviceName) {
      const dn = (deviceName || '').toLowerCase();
      if (dn.includes('android') || dn.includes('mobile') || dn.includes('phone')) return '📱';
      if (dn.includes('iphone') || dn.includes('ios')) return '📱';
      if (dn.includes('ipad') || dn.includes('tablet')) return '🖥️';
      if (dn.includes('telegram')) return '✈️';
      return '💻';
    }

    const otherDevices = data.devices.filter(d => !d.isCurrent);
    const hasOtherActive = otherDevices.length > 0;

    container.innerHTML = `
      ${data.devices.map(dev => {
        const isCur = dev.isCurrent;
        const lastActiveDate = dev.lastActive
          ? new Date(dev.lastActive).toLocaleDateString('km-KH', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
          : 'ថ្មីៗ';
        const icon = getDeviceIcon(dev.deviceName);

        return `
          <div class="device-item-card ${isCur ? 'current' : ''}">
            <div class="device-info-left">
              <div class="device-name-title">
                ${icon} ${dev.deviceName || 'Web Browser'}
                ${isCur ? '<span class="device-current-tag">ឧបករណ៍នេះ</span>' : ''}
              </div>
              <div class="device-meta-sub">
                សកម្មចុងក្រោយ៖ ${lastActiveDate} • IP: ${dev.ip || 'Local'}
              </div>
            </div>
            ${!isCur ? `
              <button type="button" class="btn btn-xs btn-outline-danger" onclick="revokeDevice('${dev.deviceId}')">
                ផ្តាច់
              </button>
            ` : `
              <span class="text-xs text-emerald-400 font-semibold">✅ សកម្ម</span>
            `}
          </div>
        `;
      }).join('')}
      ${hasOtherActive ? `
        <div style="margin-top:10px; text-align:center;">
          <button type="button" class="btn btn-sm btn-outline-danger" onclick="revokeAllDevices()" style="font-size:0.75rem; padding:6px 14px;">
            🚪 Logout ឧបករណ៍ ${otherDevices.length} ផ្សេងៗទាំងអស់
          </button>
        </div>
      ` : ''}
    `;
  } catch (err) {
    container.innerHTML = '<div class="text-xs text-rose-400 text-center py-2">ផ្ទុកបញ្ជីឧបករណ៍មិនបានជោគជ័យ</div>';
  }
}

async function revokeDevice(targetDeviceId) {
  if (!STATE.currentUser || !targetDeviceId) return;
  if (!confirm('តើអ្នកពិតជាចង់ផ្តាច់គណនីចេញពីឧបករណ៍នោះមែនទេ?')) return;

  try {
    showToast('⏳ កំពុងផ្តាច់ឧបករណ៍...', 'info');
    const sessionToken = localStorage.getItem('studyai_session_token');
    const callerDeviceId = getOrCreateDeviceId();

    const res = await fetch('/api/auth/revoke-device', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: STATE.currentUser.id,
        targetDeviceId,
        sessionToken: sessionToken || '',
        callerDeviceId
      })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'ផ្តាច់មិនបានជោគជ័យ');

    showToast('✅ ផ្តាច់ឧបករណ៍បានជោគជ័យ!', 'success');
    loadUserDevices();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function revokeAllDevices() {
  if (!STATE.currentUser) return;
  if (!confirm('⚠️ តើអ្នកពិតជាចង់ Logout ឧបករណ៍ **ទាំងអស់** (លើកលែងតែឧបករណ៍នេះ) មែនទេ?')) return;

  try {
    showToast('⏳ កំពុង Logout ឧបករណ៍ទាំងអស់...', 'info');
    const sessionToken = localStorage.getItem('studyai_session_token');
    const callerDeviceId = getOrCreateDeviceId();

    const res = await fetch('/api/auth/revoke-all-devices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: STATE.currentUser.id,
        sessionToken: sessionToken || '',
        callerDeviceId
      })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Logout មិនបានជោគជ័យ');

    showToast(data.message || '✅ Logout ឧបករណ៍ទាំងអស់បានជោគជ័យ!', 'success');
    loadUserDevices();
  } catch (err) {
    showToast(err.message, 'error');
  }
}



// ------------------------------------------
// MODAL TABS SWITCHING
// ------------------------------------------

function switchLoginTab(tab) {
  const secTg = document.getElementById('loginSectionTg');
  const secEmail = document.getElementById('loginSectionEmail');
  const tabTg = document.getElementById('loginTabTg');
  const tabEmail = document.getElementById('loginTabEmail');

  if (tab === 'email' || tab === 'gmail') {
    if (secEmail) secEmail.classList.remove('hidden');
    if (secTg) secTg.classList.add('hidden');
    if (tabEmail) tabEmail.classList.add('active');
    if (tabTg) tabTg.classList.remove('active');
  } else {
    if (secTg) secTg.classList.remove('hidden');
    if (secEmail) secEmail.classList.add('hidden');
    if (tabTg) tabTg.classList.add('active');
    if (tabEmail) tabEmail.classList.remove('active');
  }
}

function switchRegTab(tab) {
  const secGmail = document.getElementById('regSectionGmail');
  const secTg = document.getElementById('regSectionTg');
  const tabGmail = document.getElementById('regTabGmail');
  const tabTg = document.getElementById('regTabTg');

  if (tab === 'telegram' || tab === 'tg') {
    if (secTg) secTg.classList.remove('hidden');
    if (secGmail) secGmail.classList.add('hidden');
    if (tabTg) tabTg.classList.add('active');
    if (tabGmail) tabGmail.classList.remove('active');
  } else {
    if (secGmail) secGmail.classList.remove('hidden');
    if (secTg) secTg.classList.add('hidden');
    if (tabGmail) tabGmail.classList.add('active');
    if (tabTg) tabTg.classList.remove('active');
  }
}

// ------------------------------------------
// GOOGLE & TELEGRAM SECURITY 0-TYPING AUTH
// ------------------------------------------

let googleConfirmPollInterval = null;
let telegramConfirmPollInterval = null;

function toggleSyncCodeLogin() {
  const form = document.getElementById('syncCodeLoginForm');
  if (form) form.classList.toggle('hidden');
}

function cancelAuthWaiting() {
  if (googleConfirmPollInterval) {
    clearInterval(googleConfirmPollInterval);
    googleConfirmPollInterval = null;
  }
  if (telegramConfirmPollInterval) {
    clearInterval(telegramConfirmPollInterval);
    telegramConfirmPollInterval = null;
  }
  closeModal('authWaitingModal');
}

let isAuthSubmitting = false;

async function handleChromeGmailAutoSelected(val) {
  if (!val) return;
  const cleanEmail = val.trim().toLowerCase();
  if (cleanEmail.endsWith('@gmail.com') && !isAuthSubmitting) {
    isAuthSubmitting = true;
    showToast(`⚡ បានជ្រើសរើស Gmail ពី Chrome: ${cleanEmail}! កំពុងចូលរៀន...`, 'info');
    try {
      await sendGoogleAuthToServer({
        email: cleanEmail,
        name: cleanEmail.split('@')[0],
        googleId: 'g_' + Math.random().toString(36).substring(2, 10)
      });
    } catch (err) {
      isAuthSubmitting = false;
      showToast(err.message, 'error');
    }
  }
}

async function triggerChromeGoogleAuth() {
  try {
    showToast('⏳ កំពុងហៅគណនី Gmail ពី Chrome...', 'info');

    // 1. Try Firebase Google Popup (natively opens Chrome's Google Account Picker)
    if (window.firebase && window.firebase.auth) {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        const result = await firebase.auth().signInWithPopup(provider);
        if (result && result.user && result.user.email) {
          return await sendGoogleAuthToServer({
            email: result.user.email,
            name: result.user.displayName || result.user.email.split('@')[0],
            photoUrl: result.user.photoURL || '',
            googleId: result.user.uid
          });
        }
      } catch (fbErr) {
        console.warn('Firebase popup attempt:', fbErr.message);
      }
    }

    // 2. Try Google Identity Services One Tap if initialized
    if (window.google && window.google.accounts && window.google.accounts.id) {
      try {
        window.google.accounts.id.prompt();
      } catch (e) {}
    }

    // 3. Focus Chrome's auto-select input so Chrome displays the saved account chip
    const loginInput = document.getElementById('loginChromeGmailInput');
    const regInput = document.getElementById('regChromeGmailInput');
    const targetInput = (!document.getElementById('loginModal')?.classList.contains('hidden') && loginInput)
      ? loginInput
      : regInput;

    if (targetInput) {
      targetInput.focus();
      targetInput.click();
    } else {
      const promptGmail = prompt('សូមជ្រើសរើស ឬបញ្ចូលអាសយដ្ឋាន Gmail (@gmail.com) របស់អ្នកពី Chrome៖');
      if (promptGmail) handleChromeGmailAutoSelected(promptGmail);
    }
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function startGoogleSecurityAuth() {
  return triggerChromeGoogleAuth();
}

// Backward compatibility alias
const handleGoogleSignIn = triggerChromeGoogleAuth;

async function sendGoogleAuthToServer(payload) {
  showToast('⏳ កំពុងផ្ទៀងផ្ទាត់គណនី Google...', 'info');
  const deviceId = getOrCreateDeviceId();
  const res = await fetch('/api/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      deviceId,
      userAgent: navigator.userAgent
    })
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'ការផ្ទៀងផ្ទាត់មិនជោគជ័យ');

  setCurrentUser(data.user, data.sessionToken, data.deviceId);
  closeModal('loginModal');
  closeModal('registerModal');
  closeModal('authWaitingModal');
  showToast(`🎉 ស្វាគមន៍ ${data.user.name}! ចូលគណនី Google (Gmail) ជោគជ័យ`, 'success');
  refreshUserProfile();

  if (!data.user.photoUrl || !data.user.khmerName) {
    setTimeout(() => openStudentProfileSetupModal(true), 600);
  }
}

// ------------------------------------------
// GMAIL REGISTRATION WITH 6-DIGIT OTP
// ------------------------------------------

async function handleSendRegisterOtp(e) {
  if (e) e.preventDefault();
  const fullName = document.getElementById('regFullName')?.value?.trim();
  const gmail = document.getElementById('regGmail')?.value?.trim();

  if (!fullName) return showToast('❌ សូមបញ្ចូលឈ្មោះពេញរបស់អ្នក!', 'error');
  if (!gmail) return showToast('❌ សូមបញ្ចូលអាសយដ្ឋាន Gmail!', 'error');
  if (!gmail.toLowerCase().endsWith('@gmail.com')) {
    return showToast('❌ តម្រូវឱ្យប្រើប្រាស់គណនី Gmail (@gmail.com) ប៉ុណ្ណោះ!', 'error');
  }

  const btn = document.getElementById('btnSubmitRegGmail');
  const origText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span>⏳ កំពុងផ្ញើ OTP ទៅ Gmail...</span>';
  }

  try {
    showToast('⏳ កំពុងផ្ញើលេខកូដ OTP ទៅកាន់ Gmail...', 'info');
    const res = await fetch('/api/auth/send-register-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, gmail })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'ផ្ញើ OTP មិនជោគជ័យ');

    STATE.pendingRegisterName = fullName;
    STATE.pendingVerifyEmail = gmail;
    STATE.pendingVerifyCode = null;

    closeModal('registerModal');
    openVerifyEmailModal(gmail, null, null);
    showToast(`✅ ${data.message || 'បានផ្ញើលេខកូដ OTP ៦ ខ្ទង់ទៅកាន់ប្រអប់សំបុត្រ Gmail!'}`, 'success');
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origText;
    }
  }
}

async function handleVerifyRegisterOtp(e) {
  if (e) e.preventDefault();
  const gmail = STATE.pendingVerifyEmail;
  const fullName = STATE.pendingRegisterName;
  const code = (document.getElementById('verifyOtpCodeInput')?.value || '').trim();

  if (!gmail) return showToast('❌ មិនមានព័ត៌មាន Gmail ទេ!', 'error');
  if (!code || code.length !== 6) return showToast('❌ សូមបញ្ចូលលេខកូដ OTP ៦ ខ្ទង់!', 'error');

  try {
    showToast('⏳ កំពុងផ្ទៀងផ្ទាត់ OTP...', 'info');
    const deviceId = getOrCreateDeviceId();
    const res = await fetch('/api/auth/verify-register-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, gmail, code, deviceId, userAgent: navigator.userAgent })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'ការផ្ទៀងផ្ទាត់មិនត្រឹមត្រូវ');

    setCurrentUser(data.user, data.sessionToken, data.deviceId);
    closeModal('verifyEmailModal');
    showToast(`🎉 ${data.message || 'ចុះឈ្មោះ និងចូលគណនីជោគជ័យ!'}`, 'success');
    refreshUserProfile();

    // Prompt student name & photo setup right after registration
    setTimeout(() => openStudentProfileSetupModal(true), 500);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function openVerifyEmailModal(gmail) {
  STATE.pendingVerifyEmail = gmail;
  STATE.pendingVerifyCode = null;

  const emailDisp = document.getElementById('verifyEmailDisplay');
  if (emailDisp) emailDisp.textContent = gmail;

  const codeInput = document.getElementById('verifyOtpCodeInput');
  if (codeInput) {
    codeInput.value = '';
    setTimeout(() => codeInput.focus(), 300);
  }

  openModal('verifyEmailModal');
}

function openVerifyEmailModalForCurrent() {
  if (!STATE.currentUser || !STATE.currentUser.gmail) return;
  closeModal('profileModal');
  fetch('/api/auth/send-register-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName: STATE.currentUser.name, gmail: STATE.currentUser.gmail })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        showToast('✅ បានផ្ញើលេខកូដ OTP ទៅកាន់ប្រអប់សំបុត្រ Gmail!', 'success');
        openVerifyEmailModal(STATE.currentUser.gmail);
      } else {
        showToast(data.error || 'ផ្ញើលេខកូដមិនបាន', 'error');
      }
    })
    .catch(() => {
      openVerifyEmailModal(STATE.currentUser.gmail);
    });
}

async function handleResendRegisterOtp() {
  const gmail = STATE.pendingVerifyEmail;
  const fullName = STATE.pendingRegisterName;
  if (!gmail) return showToast('មិនមាន Gmail សម្រាប់ផ្ញើឡើងវិញទេ!', 'error');

  try {
    showToast('⏳ កំពុងផ្ញើលេខកូដ OTP ឡើងវិញ...', 'info');
    const res = await fetch('/api/auth/send-register-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, gmail })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'ផ្ញើលេខកូដមិនបាន');

    showToast('✅ លេខកូដ OTP ថ្មីត្រូវបានផ្ញើទៅកាន់ប្រអប់សំបុត្រ Gmail!', 'success');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ------------------------------------------
// GMAIL LOGIN WITH 6-DIGIT OTP
// ------------------------------------------

async function handleSendLoginOtp(e) {
  if (e) e.preventDefault();
  const gmail = document.getElementById('loginGmailInput')?.value?.trim();
  if (!gmail) return showToast('❌ សូមបញ្ចូលអាសយដ្ឋាន Gmail!', 'error');
  if (!gmail.toLowerCase().endsWith('@gmail.com')) {
    return showToast('❌ តម្រូវឱ្យប្រើប្រាស់គណនី Gmail (@gmail.com) ប៉ុណ្ណោះ!', 'error');
  }

  const btn = document.getElementById('btnSendLoginOtp');
  const origText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span>⏳ កំពុងផ្ញើ OTP...</span>';
  }

  try {
    showToast('⏳ កំពុងផ្ញើលេខកូដ OTP...', 'info');
    const res = await fetch('/api/auth/send-login-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gmail })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'ផ្ញើ OTP មិនជោគជ័យ');

    STATE.pendingLoginEmail = gmail;
    STATE.pendingLoginOtp = null;

    // Toggle form to verify OTP form
    const emailForm = document.getElementById('emailOtpLoginForm');
    const verifyForm = document.getElementById('verifyLoginOtpForm');
    if (emailForm) emailForm.classList.add('hidden');
    if (verifyForm) verifyForm.classList.remove('hidden');

    const otpInput = document.getElementById('loginOtpCodeInput');
    if (otpInput) {
      otpInput.value = '';
      setTimeout(() => otpInput.focus(), 300);
    }

    showToast(`✅ ${data.message || 'បានផ្ញើលេខកូដ OTP ទៅកាន់ប្រអប់សំបុត្រ Gmail!'}`, 'success');
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origText;
    }
  }
}

async function handleVerifyLoginOtp(e) {
  if (e) e.preventDefault();
  const gmail = STATE.pendingLoginEmail || document.getElementById('loginGmailInput')?.value?.trim();
  const code = (document.getElementById('loginOtpCodeInput')?.value || '').trim();

  if (!gmail) return showToast('❌ មិនមានអាសយដ្ឋាន Gmail ទេ!', 'error');
  if (!code || code.length !== 6) return showToast('❌ សូមបញ្ចូលលេខកូដ OTP ៦ ខ្ទង់!', 'error');

  try {
    showToast('⏳ កំពុងផ្ទៀងផ្ទាត់ OTP...', 'info');
    const deviceId = getOrCreateDeviceId();
    const res = await fetch('/api/auth/verify-login-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gmail, code, deviceId, userAgent: navigator.userAgent })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'ការផ្ទៀងផ្ទាត់មិនត្រឹមត្រូវ');

    setCurrentUser(data.user, data.sessionToken, data.deviceId);
    closeModal('loginModal');
    resetEmailLoginForm();
    showToast(`🎉 ${data.message || 'ចូលគណនីជោគជ័យ!'}`, 'success');
    refreshUserProfile();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function resetEmailLoginForm() {
  const emailForm = document.getElementById('emailOtpLoginForm');
  const verifyForm = document.getElementById('verifyLoginOtpForm');
  if (emailForm) emailForm.classList.remove('hidden');
  if (verifyForm) verifyForm.classList.add('hidden');
  const codeInput = document.getElementById('loginOtpCodeInput');
  if (codeInput) codeInput.value = '';
}

function togglePasswordLogin() {
  const form = document.getElementById('standardLoginForm');
  if (form) form.classList.toggle('hidden');
}

// ------------------------------------------
// TELEGRAM AUTHENTICATION & SYNC
// ------------------------------------------

async function startTelegramOneClickLogin() {
  try {
    showToast('⏳ កំពុងបង្កើតតំណភ្ជាប់ Telegram...', 'info');
    const res = await fetch('/api/auth/telegram-web-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentUserId: STATE.currentUser?.id || null
      })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'បង្កើតតំណមិនបាន');

    window.open(data.botUrl, '_blank');
    showToast('🛡️ សូមបើក Telegram Bot ហើយចុច «✅ យល់ព្រមភ្ជាប់គណនី»!', 'info');

    closeModal('loginModal');
    closeModal('registerModal');
    closeModal('syncModal');
    closeModal('profileModal');

    const icon = document.getElementById('authWaitingIcon');
    const title = document.getElementById('authWaitingTitle');
    const desc = document.getElementById('authWaitingDesc');
    const status = document.getElementById('authWaitingStatus');

    if (icon) {
      icon.textContent = '🛡️';
      icon.className = 'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl animate-pulse bg-cyan-500/20 border border-cyan-500/40 text-cyan-400';
    }
    if (title) title.textContent = '🛡️ រង់ចាំការបញ្ជាក់លើ Telegram Bot';
    if (desc) {
      desc.innerHTML = `Telegram Bot <strong>@StudyAiEngKH_bot</strong> ត្រូវបានបើក។<br>សូមចុចប៊ូតុង <strong>«✅ យល់ព្រមភ្ជាប់គណនី»</strong> លើ Telegram ដើម្បីភ្ជាប់ និងចូលរៀនស្វ័យប្រវត្ត។`;
    }
    if (status) status.textContent = '⏳ កំពុងរង់ចាំលោកអ្នកចុចយល់ព្រមភ្ជាប់លើ Telegram...';
    openModal('authWaitingModal');

    // Poll for login/linking status
    const token = data.token;
    const startTime = Date.now();
    if (telegramConfirmPollInterval) clearInterval(telegramConfirmPollInterval);

    telegramConfirmPollInterval = setInterval(async () => {
      if (Date.now() - startTime > 180000) {
        clearInterval(telegramConfirmPollInterval);
        telegramConfirmPollInterval = null;
        closeModal('authWaitingModal');
        return;
      }
      try {
        const pollRes = await fetch(`/api/auth/telegram-web-token/status?token=${encodeURIComponent(token)}&deviceId=${encodeURIComponent(getOrCreateDeviceId())}`);
        const pollData = await pollRes.json();

        if (pollData.denied) {
          clearInterval(telegramConfirmPollInterval);
          telegramConfirmPollInterval = null;
          closeModal('authWaitingModal');
          showToast(pollData.error || '❌ ការស្នើសុំត្រូវបានបដិសេធលើ Telegram', 'error');
          return;
        }

        if (pollData.verified && pollData.user) {
          clearInterval(telegramConfirmPollInterval);
          telegramConfirmPollInterval = null;
          closeModal('authWaitingModal');
          setCurrentUser(pollData.user, pollData.sessionToken, pollData.deviceId);
          showToast(pollData.linked ? '🎉 បានភ្ជាប់គណនី Telegram ដោយជោគជ័យ!' : `🎉 ស្វាគមន៍ ${pollData.user.name}! ផ្ទៀងផ្ទាត់សុវត្ថិភាព Telegram ជោគជ័យ`, 'success');
          refreshUserProfile();

          if (!pollData.user.photoUrl || !pollData.user.khmerName) {
            setTimeout(() => openStudentProfileSetupModal(true), 600);
          }
        }
      } catch (e) {}
    }, 2000);
  } catch (err) {
    closeModal('authWaitingModal');
    showToast(err.message, 'error');
  }
}

function handleTelegramEnrollClick() {
  showToast('🤖 កំពុងបើក Telegram Bot ដើម្បីចុះឈ្មោះស្វ័យប្រវត្ត...', 'info');
}

async function handleSyncCodeLogin(e) {
  e.preventDefault();
  const code = document.getElementById('loginSyncCode').value.trim();

  try {
    showToast('⏳ កំពុងផ្ទៀងផ្ទាត់លេខកូដ Telegram...', 'info');
    const deviceId = getOrCreateDeviceId();
    const res = await fetch('/api/auth/sync-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, deviceId, userAgent: navigator.userAgent })
    });
    const data = await res.json();

    if (!data.success) throw new Error(data.error || 'លេខកូដមិនត្រឹមត្រូវ');

    setCurrentUser(data.user, data.sessionToken, data.deviceId);
    closeModal('loginModal');
    showToast(data.message, 'success');
    refreshUserProfile();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function handleStandardLogin(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;

  try {
    showToast('⏳ កំពុងផ្ទៀងផ្ទាត់...', 'info');
    const deviceId = getOrCreateDeviceId();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, deviceId, userAgent: navigator.userAgent })
    });
    const data = await res.json();

    if (!data.success) throw new Error(data.error);

    setCurrentUser(data.user, data.sessionToken, data.deviceId);
    closeModal('loginModal');
    showToast(`🎉 ស្វាគមន៍ ${data.user.name}! ចូលគណនីជោគជ័យ`, 'success');
    refreshUserProfile();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function handleDirectSyncCode(e) {
  e.preventDefault();
  const code = document.getElementById('directSyncCodeInput').value.trim();

  try {
    showToast('⏳ កំពុងភ្ជាប់គណនី Telegram...', 'info');
    const res = await fetch('/api/auth/sync-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        currentUserId: STATE.currentUser?.id
      })
    });
    const data = await res.json();

    if (!data.success) throw new Error(data.error);

    setCurrentUser(data.user);
    closeModal('syncModal');
    showToast('🎉 ' + data.message, 'success');
    refreshUserProfile();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function submitLicenseKey() {
  const input = document.getElementById('licenseKeyInput');
  const key = input.value.trim();
  if (!key) return showToast('សូមបញ្ចូល License Key!', 'error');

  if (!STATE.currentUser) {
    showToast('សូមចូលគណនីជាមុនសិនទើបអាច Activate VIP បាន!', 'error');
    openLoginModal();
    return;
  }

  try {
    showToast('⏳ កំពុងផ្ទៀងផ្ទាត់ License Key...', 'info');
    const res = await fetch('/api/vip/redeem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: STATE.currentUser.id,
        licenseKey: key
      })
    });
    const data = await res.json();

    if (!data.success) throw new Error(data.error);

    input.value = '';
    showToast(`🎉 ${data.message} (+${data.days} ថ្ងៃ)`, 'success');
    refreshUserProfile();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ==========================================
// 11. TOAST NOTIFICATIONS & LISTENERS
// ==========================================

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function setupEventListeners() {
  // Close modals when clicking backdrop
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });
}
