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
  selectedStandardSubjectId: 'grammar',
  curriculumSubjects: [],
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
  await loadSavedUserSession(); // FIXED: await so STATE.currentUser is ready before UI update
  updateUserInterface();
  initSelectionTTSTooltip();
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

// ==========================================
// THEME & OS STYLE SYSTEM (iOS 18, Android 15, OLED, Gold, Matrix, Day)
// ==========================================

const ALL_APP_THEMES = [
  'night-mode-full',
  'dark-theme',
  'day-mode',
  'theme-ios',
  'theme-android',
  'theme-luxury-gold',
  'theme-matrix-neon'
];

const THEME_META = {
  'theme-ios': { icon: '🍏', label: 'Apple iOS 18', toast: '🍏 បានជ្រើសរើសរចនាបថ Apple iOS 18 (visionOS Glass)' },
  'theme-android': { icon: '🤖', label: 'Android 15', toast: '🤖 បានជ្រើសរើសរចនាបថ Android 15 (Material You 3)' },
  'night-mode-full': { icon: '🌌', label: 'Midnight OLED', toast: '🌌 បានជ្រើសរើសរចនាបថ Midnight OLED Cyberpunk' },
  'day-mode': { icon: '☀️', label: 'Daylight Pro', toast: '☀️ បានជ្រើសរើសរចនាបថ Daylight Pro (ពន្លឺ)' },
  'theme-luxury-gold': { icon: '👑', label: 'Royal Gold VIP', toast: '👑 បានជ្រើសរើសរចនាបថ Luxury Royal Gold VIP' },
  'theme-matrix-neon': { icon: '⚡', label: 'Cyber Matrix', toast: '⚡ បានជ្រើសរើសរចនាបថ Cyber Matrix Neon' },
};

function initTheme() {
  const savedTheme = localStorage.getItem('app_theme') || 'night-mode-full';
  applyTheme(savedTheme, false);
}

function applyTheme(themeName, showNotification = false) {
  const body = document.body;
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');

  // Remove existing theme classes
  ALL_APP_THEMES.forEach(t => body.classList.remove(t));

  // Determine target theme
  const targetTheme = THEME_META[themeName] ? themeName : 'night-mode-full';
  body.classList.add(targetTheme);

  // If theme is dark-oriented, also add 'dark-theme' for any generic styles
  if (targetTheme !== 'day-mode') {
    body.classList.add('dark-theme');
  }

  const meta = THEME_META[targetTheme] || THEME_META['night-mode-full'];
  if (icon) icon.textContent = meta.icon;
  if (label) label.textContent = meta.label;

  localStorage.setItem('app_theme', targetTheme);
  updateThemeModalIndicators(targetTheme);

  if (showNotification) {
    showToast(meta.toast, 'info');
  }
}

function openThemeSelectorModal() {
  const current = localStorage.getItem('app_theme') || 'night-mode-full';
  updateThemeModalIndicators(current);
  openModal('themeSelectorModal');
}

function selectAppTheme(themeId) {
  applyTheme(themeId, true);
  setTimeout(() => {
    closeModal('themeSelectorModal');
  }, 350);
}

function updateThemeModalIndicators(activeTheme) {
  const options = document.querySelectorAll('.theme-card-option');
  options.forEach(opt => {
    const tid = opt.getAttribute('data-theme-id');
    const isAct = (tid === activeTheme);
    opt.classList.toggle('active', isAct);
    const checkEl = document.getElementById(`themeCheck-${tid}`);
    if (checkEl) {
      if (isAct) checkEl.classList.remove('hidden');
      else checkEl.classList.add('hidden');
    }
  });
}

function toggleNightMode() {
  openThemeSelectorModal();
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

  const profileGearIcon = document.getElementById('profileGearIcon');

  if (STATE.currentUser) {
    if (authActions) authActions.style.display = 'none';
    // Show avatar, hide gear icon
    if (userBadge) {
      userBadge.classList.remove('hidden');
      userBadge.style.display = 'flex';
    }
    if (profileGearIcon) profileGearIcon.style.display = 'none';

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

    const u = STATE.currentUser;
    const isSuperAdmin = verifyIsSuperAdmin();
    const isLifetime = !isSuperAdmin && !!(
      u.isLifetime ||
      (u.plan && (u.plan.toLowerCase().includes('lifetime') || u.plan.includes('មួយជីវិត'))) ||
      (u.vipDetails?.plan && (u.vipDetails.plan.toLowerCase().includes('lifetime') || u.vipDetails.plan.includes('មួយជីវិត'))) ||
      (u.vipDetails?.daysRemaining && u.vipDetails.daysRemaining > 3000)
    );
    const isVIP = isSuperAdmin || isLifetime || !!u.isVIP;

    if (userVipStatusBadge) {
      if (isSuperAdmin) {
        userVipStatusBadge.textContent = '⚡ Super Admin';
        userVipStatusBadge.className = 'user-tier-badge vip font-bold bg-gradient-to-r from-red-600 via-purple-600 to-amber-500 text-white';
      } else if (isLifetime) {
        userVipStatusBadge.textContent = '👑 VIP Lifetime';
        userVipStatusBadge.className = 'user-tier-badge vip font-black bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950';
      } else {
        userVipStatusBadge.textContent = isVIP ? '💎 VIP Member' : 'Free Account';
        userVipStatusBadge.className = `user-tier-badge ${isVIP ? 'vip' : 'free'}`;
      }
    }

    // Dashboard Stats update
    const statPlan = document.getElementById('statVipPlan');
    const statDays = document.getElementById('statVipDays');
    if (statPlan) {
      if (isSuperAdmin) statPlan.textContent = '⚡ Super Admin';
      else if (isLifetime) statPlan.textContent = '👑 VIP Lifetime';
      else statPlan.textContent = isVIP ? 'VIP Member' : 'Free';
    }
    if (statDays) {
      if (isSuperAdmin) statDays.textContent = 'គ្មានដែនកំណត់ (Unlimited)';
      else if (isLifetime) statDays.textContent = 'ពេញមួយជីវិត (Lifetime)';
      else statDays.textContent = isVIP ? `នៅសល់ ${u.vipDetails?.daysRemaining || 30} ថ្ងៃ` : 'មិនទាន់ជា VIP';
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
    // Hide avatar, show gear icon
    if (userBadge) {
      userBadge.classList.add('hidden');
      userBadge.style.display = 'none';
    }
    if (profileGearIcon) profileGearIcon.style.display = '';
    if (syncBanner) syncBanner.style.display = 'flex';
    const heroTgBtn = document.getElementById('heroLinkTelegramBtn');
    if (heroTgBtn) heroTgBtn.style.display = 'inline-flex';
  }

  // Toggle Admin Portal Buttons (Strict: Only verified Admin can see)
  const isAdmin = verifyIsAdmin();
  const headerAdminBtn = document.getElementById('headerAdminBtn');
  const adminNavBtn = document.getElementById('adminNavBtn');
  if (headerAdminBtn) {
    headerAdminBtn.classList.toggle('hidden', !isAdmin);
    headerAdminBtn.style.display = isAdmin ? 'inline-flex' : 'none';
  }
  if (adminNavBtn) {
    adminNavBtn.classList.toggle('hidden', !isAdmin);
    adminNavBtn.style.display = isAdmin ? 'flex' : 'none';
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
      updateUserInterface();

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

      // Compact 2x2 Dashboard text and SVG ring updates
      const cLessonsText = document.getElementById('statCompletedLessonsText');
      const cLessonsRing = document.getElementById('statCompletedLessonsRing');
      const cScoreText = document.getElementById('statTotalScoreText');
      const cScoreRing = document.getElementById('statTotalScoreRing');
      const cCertsText = document.getElementById('statCertificatesCountText');
      const cCertsRing = document.getElementById('statCertificatesCountRing');
      const cVipBadge = document.getElementById('statVipPlanBadge');

      const completedCount = p.stats.completedLessonsCount || 0;
      const totalScore = p.stats.totalScore || 0;
      const certsCount = p.stats.certificatesCount || 0;

      if (cLessonsText) cLessonsText.textContent = `${completedCount}/12`;
      if (cLessonsRing) {
        const ringPct = Math.min(100, Math.round((completedCount / 12) * 100));
        cLessonsRing.setAttribute('stroke-dasharray', `${ringPct}, 100`);
      }

      if (cScoreText) cScoreText.textContent = `${totalScore} pt`;
      if (cScoreRing) {
        const ringPct = Math.min(100, Math.round((totalScore / 100) * 100));
        cScoreRing.setAttribute('stroke-dasharray', `${ringPct}, 100`);
      }

      if (cCertsText) cCertsText.textContent = `${certsCount}`;
      if (cCertsRing) {
        const ringPct = Math.min(100, Math.round((certsCount / 7) * 100));
        cCertsRing.setAttribute('stroke-dasharray', `${ringPct}, 100`);
      }

      if (cVipBadge) {
        cVipBadge.textContent = p.isVIP ? 'VIP Pro' : 'Free';
        cVipBadge.className = `dash-stat-label ${p.isVIP ? 'vip-gold' : ''}`;
      }

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
        else if (STATE.courseLevel === 'elementary') renderElementaryWeeks();
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
  // STRICT SECURITY GUARD: Only authorized Admin can open School Management
  if (tabName === 'admin') {
    if (!verifyIsAdmin()) {
      showToast('⛔ សិទ្ធិត្រូវបានបដិសេធ! ផ្ទាំងគ្រប់គ្រងសាលាសម្រាប់តែ Admin ប៉ុណ្ណោះ។', 'error', 3500);
      navigateTo('dashboard');
      return;
    }
  }

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
    } else if (STATE.courseLevel === 'elementary') {
      renderElementaryWeeks();
    } else {
      renderCurriculumWeeks();
    }
  } else if (tabName === 'ai-tutor') {
    initAIStudioTab();
  } else if (tabName === 'annual-exams') {
    loadAnnualExams();
  } else if (tabName === 'certificates') {
    loadUserCertificates();
  } else if (tabName === 'dictionary') {
    initDictionaryTab();
  } else if (tabName === 'verbs') {
    renderVerbsTable();
  } else if (tabName === 'admin') {
    initAdminDashboard();
  }
}

// ==========================================
// MOBILE APP HELPER FUNCTIONS
// ==========================================

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
}

function handleProfileNavClick() {
  console.log('[DEBUG] handleProfileNavClick fired! currentUser=', STATE.currentUser ? STATE.currentUser.id : 'null');
  try {
    if (STATE.currentUser) {
      console.log('[DEBUG] -> calling openProfileModal()');
      const modal = document.getElementById('profileModal');
      if (!modal) {
        console.error('[DEBUG] profileModal element NOT FOUND in DOM!');
        alert('DEBUG: profileModal element missing from DOM. Please report this error.');
        return;
      }
      openProfileModal();
    } else {
      console.log('[DEBUG] -> calling openLoginModal()');
      const loginModal = document.getElementById('loginModal');
      if (!loginModal) {
        console.error('[DEBUG] loginModal element NOT FOUND in DOM!');
        alert('DEBUG: loginModal element missing from DOM. Please report this error.');
        return;
      }
      openLoginModal();
    }
  } catch(err) {
    console.error('[DEBUG] handleProfileNavClick ERROR:', err);
    alert('DEBUG ERROR: ' + err.message);
  }
}

function handleQuickAiSubmit() {
  const input = document.getElementById('quickAiChatInput');
  if (!input) return;
  const q = input.value.trim();
  if (!q) return;
  input.value = '';
  navigateTo('ai-tutor');
  setTimeout(() => {
    const studioInput = document.getElementById('studioChatInput');
    if (studioInput) {
      studioInput.value = q;
      sendStudioChatMessage();
    }
  }, 250);
}

function openRecommendedExercise() {
  // If beginner course not yet completed, open next unpassed lesson in beginner
  if (STATE.beginnerCourse?.weeks) {
    const passed = new Set(STATE.beginnerStatus?.passedLessons || []);
    for (const w of STATE.beginnerCourse.weeks) {
      for (const l of (w.lessons || [])) {
        if (!passed.has(l.id)) {
          switchCourseLevel('beginner');
          openLesson('beginner', w.id, l.id);
          return;
        }
      }
    }
  }
  // If beginner completed, check elementary
  if (STATE.elementaryCourse?.months) {
    const passed = new Set(STATE.elementaryStatus?.passedLessons || []);
    for (const m of STATE.elementaryCourse.months) {
      for (const w of (m.weeks || [])) {
        for (const l of (w.lessons || [])) {
          if (!passed.has(l.id)) {
            switchCourseLevel('elementary');
            openLesson(m.id, w.id, l.id);
            return;
          }
        }
      }
    }
  }
  // Default to curriculum
  navigateTo('curriculum');
}

function openSearchModal() {
  const modal = document.getElementById('searchModal');
  if (modal) {
    modal.classList.remove('hidden');
    const input = document.getElementById('globalSearchInput');
    if (input) {
      input.value = '';
      input.focus();
    }
    handleGlobalSearch('');
  }
}

function handleGlobalSearch(query) {
  const container = document.getElementById('searchResultsList');
  if (!container) return;

  const q = (query || '').trim().toLowerCase();
  if (!q) {
    container.innerHTML = `
      <div class="search-empty-state">
        <div class="search-empty-icon">🔍</div>
        <p>សូមវាយឈ្មោះមេរៀន, អក្សរ ឬពាក្យគន្លឹះដើម្បីស្វែងរក...</p>
      </div>
    `;
    return;
  }

  const results = [];

  // Search Beginner
  if (STATE.beginnerCourse?.weeks) {
    STATE.beginnerCourse.weeks.forEach(w => {
      (w.lessons || []).forEach(l => {
        const titleK = (l.titleKhmer || '').toLowerCase();
        const titleE = (l.titleEnglish || '').toLowerCase();
        const letter = (l.letter || '').toLowerCase();
        const vocab = (l.vocabulary || '').toLowerCase();
        if (titleK.includes(q) || titleE.includes(q) || letter.includes(q) || vocab.includes(q)) {
          results.push({
            course: 'ថ្នាក់ដំបូង (Beginner)',
            badgeClass: 'badge-emerald',
            title: `${l.titleKhmer || l.titleEnglish} (${l.letter || ''})`,
            sub: l.vocabulary ? `ពាក្យ: ${l.vocabulary}` : (l.grammarRule || ''),
            action: () => {
              closeModal('searchModal');
              switchCourseLevel('beginner');
              openLesson('beginner', w.id, l.id);
            }
          });
        }
      });
    });
  }

  // Search Elementary
  if (STATE.elementaryCourse?.months) {
    STATE.elementaryCourse.months.forEach(m => {
      (m.weeks || []).forEach(w => {
        (w.lessons || []).forEach(l => {
          const titleK = (l.titleKhmer || '').toLowerCase();
          const titleE = (l.titleEnglish || '').toLowerCase();
          const topic = (l.topic || '').toLowerCase();
          if (titleK.includes(q) || titleE.includes(q) || topic.includes(q)) {
            results.push({
              course: 'ថ្នាក់បឋម (Elementary)',
              badgeClass: 'badge-blue',
              title: l.titleKhmer || l.titleEnglish,
              sub: l.topic ? `ប្រធានបទ: ${l.topic}` : '',
              action: () => {
                closeModal('searchModal');
                switchCourseLevel('elementary');
                openLesson(m.id, w.id, l.id);
              }
            });
          }
        });
      });
    });
  }

  // Search Standard Curriculum
  if (STATE.curriculum && Array.isArray(STATE.curriculum)) {
    STATE.curriculum.forEach(m => {
      (m.weeks || []).forEach(w => {
        (w.lessons || []).forEach(l => {
          const titleK = (l.titleKhmer || '').toLowerCase();
          const titleE = (l.title || l.titleEnglish || '').toLowerCase();
          if (titleK.includes(q) || titleE.includes(q)) {
            results.push({
              course: 'ថ្នាក់ទូទៅ (Standard)',
              badgeClass: 'badge-purple',
              title: l.titleKhmer || l.title,
              sub: l.title || '',
              action: () => {
                closeModal('searchModal');
                switchCourseLevel('standard');
                openLesson(m.id, w.id, l.id);
              }
            });
          }
        });
      });
    });
  }

  if (results.length === 0) {
    container.innerHTML = `
      <div class="search-empty-state">
        <div class="search-empty-icon">📂</div>
        <p>រកមិនឃើញមេរៀនដែលត្រូវនឹង "<strong>${escapeHtml(query)}</strong>" ទេ</p>
      </div>
    `;
    return;
  }

  window._globalSearchResults = results;
  container.innerHTML = results.slice(0, 20).map((r, idx) => `
    <div class="search-result-item" onclick="window._globalSearchResults[${idx}].action()">
      <div class="search-item-badge ${r.badgeClass}">${r.course}</div>
      <div class="search-item-title">${escapeHtml(r.title)}</div>
      ${r.sub ? `<div class="search-item-sub">${escapeHtml(r.sub)}</div>` : ''}
    </div>
  `).join('');
}

// ==========================================
// AI TUTOR SAMPLE PROMPTS & QUICK MODAL
// ==========================================

const AI_SAMPLE_PROMPTS = {
  vocab: {
    id: 'vocab',
    icon: '📖',
    title: "Explain 'Vocabulary'",
    category: "១. ការពន្យល់ពាក្យ និងវេយ្យាករណ៍ (Vocabulary & Grammar)",
    sub: "សុំ prompt: ពន្យល់ពាក្យ 'Vocabulary'",
    en: "Explain the difference between 'present perfect' and 'past simple' with examples.",
    kh: "ពន្យល់ពីភាពខុសគ្នារវាង 'present perfect' និង 'past simple' ព្រមទាំងផ្តល់ឧទាហរណ៍ឱ្យបានច្រើន。"
  },
  grammar: {
    id: 'grammar',
    icon: '✒️',
    title: "Correct my grammar",
    category: "៣. កែសម្រួល និងកែលម្អការសរសេរ (Writing & Correction)",
    sub: "សុំ prompt: កែលម្អប្រយោគរបស់ខ្ញុំ",
    en: "Correct the grammar and structure in this paragraph: '[Insert your text here]' and explain why.",
    kh: "កែតម្រូវវេយ្យាករណ៍ និងរចនាសម្ព័ន្ធនៅក្នុងកថាខណ្ឌនេះ៖ '[បញ្ចូលអត្ថបទរបស់អ្នកនៅទីនេះ]' ហើយពន្យល់ពីមូលហេតុ。"
  },
  speaking: {
    id: 'speaking',
    icon: '🎙️',
    title: "Practice speaking",
    category: "២. ហ្វឹកហាត់ការសន្ទនា (Conversation Practice)",
    sub: "សុំ prompt: ហ្វឹកហាត់សន្ទនា",
    en: "Let's practice a conversation about 'ordering food at a restaurant'. Act as the waiter and correct my mistakes.",
    kh: "តោះហ្វឹកហាត់សន្ទនាពី 'ការកុម្ម៉ង់អាហារនៅភោជនីយដ្ឋាន'។ ដើរតួជាអ្នកបម្រើ ហើយកែតម្រូវរាល់កំហុសរបស់ខ្ញុំ。"
  },
  test: {
    id: 'test',
    icon: '❓',
    title: "Test my level",
    category: "៤. តេស្តកម្រិត និងការរៀន (Placement Test & Learning Tips)",
    sub: "សុំ prompt: តេស្តកម្រិតរបស់ខ្ញុំ",
    en: "Ask me 5 intermediate (B2) grammar multiple-choice questions to test my knowledge.",
    kh: "សួរខ្ញុំនូវសំណួរពហុជ្រើសរើសវេយ្យាករណ៍កម្រិតមធ្យម (B2) ចំនួន ៥ ដើម្បីសាកល្បងចំណេះដឹងរបស់ខ្ញុំ。"
  }
};

function openPromptPicker(key) {
  const p = AI_SAMPLE_PROMPTS[key];
  if (!p) return;

  const modal = document.getElementById('promptPickerModal');
  const title = document.getElementById('promptPickerModalTitle');
  const body = document.getElementById('promptPickerModalBody');
  if (!modal || !body) return;

  if (title) title.innerHTML = `${p.icon} ${p.title} <span class="text-xs text-slate-400 block font-normal">${p.category}</span>`;

  body.innerHTML = `
    <!-- English Version -->
    <div class="prompt-version-box">
      <div class="prompt-version-header">
        <span class="prompt-version-tag tag-en">🇬🇧 English Prompt</span>
      </div>
      <div class="prompt-text-display font-medium text-sm" id="promptTextEn">${escapeHtml(p.en)}</div>
      <div class="prompt-action-btns">
        <button class="btn btn-primary btn-sm flex-1" onclick="sendSamplePrompt('${key}', 'en')">
          <span>🚀 ផ្ញើទៅកាន់ AI</span>
        </button>
        <button class="btn btn-glass btn-sm" onclick="insertPromptToInput('${key}', 'en')">
          <span>✏️ កែសម្រួល</span>
        </button>
        <button class="btn btn-glass btn-sm" onclick="copyPromptText('${key}', 'en', this)">
          <span>📋</span>
        </button>
      </div>
    </div>

    <!-- Khmer Version -->
    <div class="prompt-version-box">
      <div class="prompt-version-header">
        <span class="prompt-version-tag tag-kh">🇰🇭 Khmer Prompt</span>
      </div>
      <div class="prompt-text-display font-medium text-sm" id="promptTextKh">${escapeHtml(p.kh)}</div>
      <div class="prompt-action-btns">
        <button class="btn btn-emerald btn-sm flex-1" onclick="sendSamplePrompt('${key}', 'kh')">
          <span>🚀 ផ្ញើទៅកាន់ AI</span>
        </button>
        <button class="btn btn-glass btn-sm" onclick="insertPromptToInput('${key}', 'kh')">
          <span>✏️ កែសម្រួល</span>
        </button>
        <button class="btn btn-glass btn-sm" onclick="copyPromptText('${key}', 'kh', this)">
          <span>📋</span>
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function sendSamplePrompt(key, lang) {
  const p = AI_SAMPLE_PROMPTS[key];
  if (!p) return;
  const promptText = lang === 'en' ? p.en : p.kh;
  closeModal('promptPickerModal');
  const input = document.getElementById('studioChatInput');
  if (input) {
    input.value = promptText;
    sendStudioChatMessage();
  }
}

function insertPromptToInput(key, lang) {
  const p = AI_SAMPLE_PROMPTS[key];
  if (!p) return;
  const promptText = lang === 'en' ? p.en : p.kh;
  closeModal('promptPickerModal');
  const input = document.getElementById('studioChatInput');
  if (input) {
    input.value = promptText;
    input.focus();
    showToast('✏️ បានបញ្ចូល Prompt ទៅក្នុងប្រអប់សារ! អ្នកអាចកែសម្រួលមុនផ្ញើ', 'info');
  }
}

function copyPromptText(key, lang, btn) {
  const p = AI_SAMPLE_PROMPTS[key];
  if (!p) return;
  const promptText = lang === 'en' ? p.en : p.kh;
  navigator.clipboard.writeText(promptText).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<span>✓ ចម្លងរួច</span>';
    setTimeout(() => { btn.innerHTML = orig; }, 2000);
    showToast('📋 បានចម្លង Prompt ទៅ Clipboard!', 'success');
  });
}

// ==========================================
// COURSES SCREEN SEARCH, FILTERS & ACCORDION
// ==========================================

STATE.coursesFilter = 'all';

function toggleCoursesSearch() {
  const bar = document.getElementById('coursesSearchBar');
  const input = document.getElementById('coursesSearchInput');
  if (!bar) return;
  if (bar.style.display === 'none' || getComputedStyle(bar).display === 'none') {
    bar.style.display = 'flex';
    if (input) input.focus();
  } else {
    bar.style.display = 'none';
  }
}

function clearCoursesSearch() {
  const input = document.getElementById('coursesSearchInput');
  if (input) {
    input.value = '';
    handleCoursesFilter();
  }
}

function setCoursesFilter(filter) {
  STATE.coursesFilter = filter;
  document.querySelectorAll('.course-filter-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.filter === filter);
  });
  if (STATE.courseLevel === 'beginner') {
    renderBeginnerWeeks();
  } else if (STATE.courseLevel === 'elementary') {
    renderElementaryWeeks();
  } else {
    renderCurriculumWeeks();
  }
}

function handleCoursesFilter() {
  if (STATE.courseLevel === 'beginner') {
    renderBeginnerWeeks();
  } else if (STATE.courseLevel === 'elementary') {
    renderElementaryWeeks();
  } else {
    renderCurriculumWeeks();
  }
}

function toggleUnitAccordion(unitId) {
  const el = document.getElementById(unitId);
  if (el) {
    el.classList.toggle('collapsed');
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
      STATE.curriculumSubjects = data.subjects || [];
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
    renderSubjectTabs();
  }
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
  // 3. Standard / 12-Month Level by Subject (Month 1 Weeks 1-3 are lessons 1, 2, 3 of every subject!)
  if (monthId === 'm1' && ['w1', 'w2', 'w3'].includes(weekId)) {
    return true;
  }
  return false;
}

function openVipLessonLockModal(lessonTitle = '', levelName = '') {
  const titleEl = document.getElementById('vipLockLessonTitle');
  if (titleEl) {
    const levelStr = levelName ? ` • ${levelName}` : '';
    titleEl.textContent = `${lessonTitle || 'មេរៀន'}${levelStr}`;
  }
  openModal('vipLessonLockModal');
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

  // Update progress card
  const progressRatio = document.getElementById('coursesProgressRatio');
  const progressBarFill = document.getElementById('coursesProgressBarFill');
  if (progressRatio) progressRatio.textContent = `${passedCount}/26 Lessons`;
  if (progressBarFill) progressBarFill.style.width = `${finalPct}%`;

  const searchInput = document.getElementById('coursesSearchInput');
  const searchQ = (searchInput?.value || '').trim().toLowerCase();
  const filter = STATE.coursesFilter || 'all';

  const weeksHTML = course.weeks.map((w, wIdx) => {
    let filteredLessons = w.lessons.filter(l => {
      const dbKey = `beginner-${w.id}-${l.id}`;
      const isComp = !!completed[dbKey] || passedLessons.has(l.id);
      const lessonNum = parseInt((l.id || '').replace('bl', ''));
      const isUnlocked = isAdmin || lessonNum <= 1 || passedLessons.has(`bl${lessonNum - 1}`);
      const isLocked = !isUnlocked;

      // Filter by status tab
      if (filter === 'completed' && !isComp) return false;
      if (filter === 'ongoing' && (isComp || isLocked)) return false;
      if (filter === 'locked' && !isLocked) return false;

      // Filter by search query
      if (searchQ) {
        const text = `${l.title} ${l.titleKhmer || ''} ${l.letter || ''} ${l.vocabulary || ''}`.toLowerCase();
        if (!text.includes(searchQ)) return false;
      }
      return true;
    });

    if (filteredLessons.length === 0 && (filter !== 'all' || searchQ)) {
      return '';
    }

    const lessonsHTML = filteredLessons.map(l => {
      const dbKey = `beginner-${w.id}-${l.id}`;
      const isComp = !!completed[dbKey] || passedLessons.has(l.id);
      const grade = isComp ? (completed[dbKey]?.grade || 'A') : null;

      const lessonNum = parseInt((l.id || '').replace('bl', ''));
      const isFree = isLessonFree('beginner', w.id, l.id);
      const isVipUser = !!(STATE.currentUser?.isVIP);
      const isVipLocked = !isAdmin && !isVipUser && !isFree;

      const isUnlocked = isAdmin || lessonNum <= 1 || passedLessons.has(`bl${lessonNum - 1}`);
      const isLocked = !isUnlocked;
      const isCurrent = !isComp && isUnlocked && !isVipLocked;

      const thumbIcon = l.letter ? `🔤` : '📘';
      const duration = '⏱️ 10 mins';
      const desc = l.vocabulary ? `ពាក្យ: ${l.vocabulary} • ${l.sampleSentence || ''}` : (l.grammarRule || 'មេរៀនគ្រឹះភាសាអង់គ្លេស');

      let badgeHTML = '';
      if (isVipLocked) {
        badgeHTML = `<span class="lesson-badge-vip-lock">🔒 VIP</span>`;
      } else if (isComp) {
        badgeHTML = `<span class="lesson-badge-completed">✓ Completed</span>`;
      } else if (isCurrent) {
        badgeHTML = `<span class="lesson-btn-inprogress">▶ In Progress</span>`;
      } else if (isLocked) {
        badgeHTML = `<span class="lesson-badge-locked">🔒 Locked</span>`;
      } else {
        badgeHTML = `<span class="lesson-badge-ongoing">Ongoing</span>`;
      }

      const escapedTitle = (l.title || '').replace(/'/g, "\\'");
      const clickAction = isVipLocked
        ? `openVipLessonLockModal('${escapedTitle}', 'ថ្នាក់ដំបូង Beginner')`
        : (isLocked
            ? `showToast('🔒 ត្រូវប្រឡងជាប់ថ្ងៃទី${lessonNum - 1} ជាមុន!', 'warning')`
            : `openLesson('beginner', '${w.id}', '${l.id}')`);

      return `
        <div class="mobile-lesson-card ${isComp ? 'completed' : ''} ${isVipLocked ? 'vip-locked' : (isLocked ? 'locked' : '')}" 
             onclick="${clickAction}">
          <div class="lesson-card-thumb">
            <span class="lesson-thumb-emoji">${thumbIcon}</span>
          </div>
          <div class="lesson-card-body">
            <div class="lesson-card-title">${isVipLocked ? '🔒 ' : (isLocked ? '🔒 ' : '')}${l.title}</div>
            <div class="lesson-card-meta">${duration} ${isFree ? '<span class="text-emerald-400 font-semibold text-[10px] ml-1">● Free Trial</span>' : ''}</div>
            <div class="lesson-card-desc">${escapeHtml(desc)}</div>
          </div>
          <div class="lesson-card-right">
            ${badgeHTML}
          </div>
        </div>
      `;
    }).join('');

    const isCollapsed = wIdx > 0 && filter === 'all' && !searchQ;

    return `
      <div class="unit-accordion-item ${isCollapsed ? 'collapsed' : ''}" id="unit-${w.id}">
        <button class="unit-header-btn" onclick="toggleUnitAccordion('unit-${w.id}')">
          <div class="unit-header-left">
            <span class="unit-header-icon">📁</span>
            <div class="unit-header-title-box">
              <span class="unit-header-title">${w.title}</span>
              <span class="unit-header-sub">${w.description || `${w.lessons.length} ថ្ងៃ (Lessons)`}</span>
            </div>
          </div>
          <div class="unit-header-right">
            <span class="unit-chevron">▾</span>
          </div>
        </button>
        <div class="unit-lessons-body">
          ${lessonsHTML || '<p class="text-xs text-muted p-2">មិនមានមេរៀនត្រូវនឹងការស្វែងរកទេ</p>'}
        </div>
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

  // Update progress card
  const progressRatio = document.getElementById('coursesProgressRatio');
  const progressBarFill = document.getElementById('coursesProgressBarFill');
  if (progressRatio) progressRatio.textContent = `${passedInMonth}/24 Lessons (ខែទី ${monthNum})`;
  if (progressBarFill) progressBarFill.style.width = `${monthPct}%`;

  const searchInput = document.getElementById('coursesSearchInput');
  const searchQ = (searchInput?.value || '').trim().toLowerCase();
  const filter = STATE.coursesFilter || 'all';

  const weeksHTML = currentMonth.weeks.map((w, wIdx) => {
    let filteredLessons = w.lessons.filter(l => {
      const lessonNum = parseInt((l.id || '').replace('el', ''));
      const isComp = passedLessons.has(l.id) || !!completed[`elementary-${w.id}-${l.id}`] || !!completed[`${currentMonth.id}-${w.id}-${l.id}`];
      const isUnlocked = isAdmin || lessonNum <= 1 || passedLessons.has(`el${lessonNum - 1}`);
      const isLocked = !isUnlocked;

      if (filter === 'completed' && !isComp) return false;
      if (filter === 'ongoing' && (isComp || isLocked)) return false;
      if (filter === 'locked' && !isLocked) return false;

      if (searchQ) {
        const text = `${l.title} ${l.titleKhmer || ''} ${l.topic || ''}`.toLowerCase();
        if (!text.includes(searchQ)) return false;
      }
      return true;
    });

    if (filteredLessons.length === 0 && (filter !== 'all' || searchQ)) {
      return '';
    }

    const lessonsHTML = filteredLessons.map(l => {
      const lessonNum = parseInt((l.id || '').replace('el', ''));
      const isComp = passedLessons.has(l.id) || !!completed[`elementary-${w.id}-${l.id}`] || !!completed[`${currentMonth.id}-${w.id}-${l.id}`];
      const isFree = isLessonFree(currentMonth.id, w.id, l.id);
      const isVipUser = !!(STATE.currentUser?.isVIP);
      const isVipLocked = !isAdmin && !isVipUser && !isFree;

      const isUnlocked = isAdmin || lessonNum <= 1 || passedLessons.has(`el${lessonNum - 1}`);
      const isLocked = !isUnlocked;
      const isCurrent = !isComp && isUnlocked && !isVipLocked;

      let badgeHTML = '';
      if (isVipLocked) {
        badgeHTML = `<span class="lesson-badge-vip-lock">🔒 VIP</span>`;
      } else if (isComp) {
        badgeHTML = `<span class="lesson-badge-completed">✓ Completed</span>`;
      } else if (isCurrent) {
        badgeHTML = `<span class="lesson-btn-inprogress">▶ In Progress</span>`;
      } else if (isLocked) {
        badgeHTML = `<span class="lesson-badge-locked">🔒 Locked</span>`;
      } else {
        badgeHTML = `<span class="lesson-badge-ongoing">Ongoing</span>`;
      }

      const escapedTitle = (l.title || '').replace(/'/g, "\\'");
      const clickAction = isVipLocked
        ? `openVipLessonLockModal('${escapedTitle}', 'ថ្នាក់បឋមសិក្សា Elementary')`
        : (isLocked
            ? `showToast('🔒 ត្រូវប្រឡងជាប់ថ្ងៃទី${lessonNum - 1} ជាមុន!', 'warning')`
            : `openLesson('${currentMonth.id}', '${w.id}', '${l.id}')`);

      return `
        <div class="mobile-lesson-card ${isComp ? 'completed' : ''} ${isVipLocked ? 'vip-locked' : (isLocked ? 'locked' : '')}" 
             onclick="${clickAction}">
          <div class="lesson-card-thumb">
            <span class="lesson-thumb-emoji">🏫</span>
          </div>
          <div class="lesson-card-body">
            <div class="lesson-card-title">${isVipLocked ? '🔒 ' : (isLocked ? '🔒 ' : '')}${l.title}</div>
            <div class="lesson-card-meta">⏱️ 15 mins ${isFree ? '<span class="text-emerald-400 font-semibold text-[10px] ml-1">● Free Trial</span>' : ''}</div>
            <div class="lesson-card-desc">${escapeHtml(l.titleKhmer || l.topic || 'ថ្នាក់បឋមសិក្សា')}</div>
          </div>
          <div class="lesson-card-right">
            ${badgeHTML}
          </div>
        </div>
      `;
    }).join('');

    const isCollapsed = wIdx > 0 && filter === 'all' && !searchQ;

    return `
      <div class="unit-accordion-item ${isCollapsed ? 'collapsed' : ''}" id="unit-el-${w.id}">
        <button class="unit-header-btn" onclick="toggleUnitAccordion('unit-el-${w.id}')">
          <div class="unit-header-left">
            <span class="unit-header-icon">📁</span>
            <div class="unit-header-title-box">
              <span class="unit-header-title">${w.title}</span>
              <span class="unit-header-sub">${w.lessons.length} ថ្ងៃ (Lessons)</span>
            </div>
          </div>
          <div class="unit-header-right">
            <span class="unit-chevron">▾</span>
          </div>
        </button>
        <div class="unit-lessons-body">
          ${lessonsHTML || '<p class="text-xs text-muted p-2">មិនមានមេរៀនត្រូវនឹងការស្វែងរកទេ</p>'}
        </div>
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

function getStandardSubjectsFallback() {
  const defs = [
    { id: 'grammar', title: 'វេយ្យាករណ៍ភាសាអង់គ្លេស', titleEn: 'Grammar in Use', icon: '📘', lessonIdx: 0, examKey: 'grammar' },
    { id: 'conversation', title: 'ការសន្ទនាជាក់ស្តែង', titleEn: 'Situational Conversation', icon: '🗣️', lessonIdx: 1, examKey: 'conversation' },
    { id: 'vocabulary', title: 'វាក្យសព្ទ និងឃ្លាទូទៅ', titleEn: 'Vocabulary & Context', icon: '📖', lessonIdx: 2, examKey: 'vocabulary' },
    { id: 'verbs', title: 'កិរិយាសព្ទ និងកាល', titleEn: 'Verbs & Tenses', icon: '⚡', lessonIdx: 3, examKey: 'verbs' },
    { id: 'adjectives', title: 'គុណនាម និងការប្រៀបធៀប', titleEn: 'Adjectives & Comparison', icon: '🎨', lessonIdx: 4, examKey: 'adjectives' },
    { id: 'sentences', title: 'ទម្រង់ល្បះ និងកន្សោមពាក្យ', titleEn: 'Sentence Patterns', icon: '✍️', lessonIdx: 5, examKey: 'sentences' }
  ];

  return defs.map(s => {
    const lessons = [];
    let lessonNum = 1;
    (STATE.curriculum || []).forEach(m => {
      (m.weeks || []).forEach(w => {
        const l = w.lessons && w.lessons[s.lessonIdx];
        if (l) {
          lessons.push({
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
    return {
      ...s,
      totalLessons: lessons.length,
      lessons
    };
  });
}

function renderSubjectTabs() {
  const bar = document.getElementById('monthsTabsBar');
  if (!bar) return;
  bar.style.display = 'flex';
  bar.innerHTML = '';

  const subjects = STATE.curriculumSubjects && STATE.curriculumSubjects.length 
    ? STATE.curriculumSubjects 
    : getStandardSubjectsFallback();

  subjects.forEach(s => {
    const btn = document.createElement('button');
    const isActive = s.id === (STATE.selectedStandardSubjectId || 'grammar');
    btn.className = `month-tab-pill ${isActive ? 'active' : ''}`;
    btn.innerHTML = `${s.icon || '📘'} <span>${s.title.split(' (')[0]}</span>`;
    btn.onclick = () => {
      STATE.selectedStandardSubjectId = s.id;
      renderSubjectTabs();
      renderCurriculumWeeks();
    };
    bar.appendChild(btn);
  });

  renderCurriculumWeeks();
}

function renderCurriculumWeeks() {
  const container = document.getElementById('curriculumWeeksContainer');
  if (!container) return;

  const subjects = STATE.curriculumSubjects && STATE.curriculumSubjects.length 
    ? STATE.curriculumSubjects 
    : getStandardSubjectsFallback();

  const currentSubject = subjects.find(s => s.id === (STATE.selectedStandardSubjectId || 'grammar')) || subjects[0];
  if (!currentSubject || !currentSubject.lessons) {
    container.innerHTML = '<p class="text-muted p-4 text-center">មិនមានទិន្នន័យមុខវិជ្ជានេះទេ</p>';
    return;
  }

  const completed = STATE.currentUser?.completedLessons || {};
  const isAdmin = verifyIsAdmin();
  const isVipUser = !!(STATE.currentUser?.isVIP);

  // Check certifications
  const certs = STATE.currentUser?.subject_certifications || {};
  const currentCert = certs[currentSubject.examKey || currentSubject.id];
  const isSubjectCertified = !!currentCert;

  // Passed lessons in this subject
  let passedCount = 0;
  currentSubject.lessons.forEach(l => {
    const comp = completed[l.dbKey];
    if (comp && (comp.isPassed || ['A', 'B', 'C'].includes(comp.grade) || (comp.percent && comp.percent >= 70))) {
      passedCount++;
    }
  });

  const totalLessons = currentSubject.lessons.length || 48;
  const pct = Math.round((passedCount / totalLessons) * 100);
  const canTakeFinal = isAdmin || passedCount >= totalLessons;

  // Final Subject Exam Card at top (30 questions!)
  const examCardHTML = `
    <div class="beginner-final-exam-card" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15)); border: 1px solid rgba(99, 102, 241, 0.35);">
      <div class="final-exam-header">
        <div class="final-exam-icon">${isSubjectCertified ? '🎓' : (isAdmin ? '🛡️' : (canTakeFinal ? '📜' : '🔒'))}</div>
        <div class="final-exam-info">
          <h3>${isSubjectCertified ? `✅ ការប្រឡងបញ្ចប់មុខវិជ្ជា៖ ${currentSubject.title} --- ជោគជ័យ!` : (isAdmin ? `🛡️ Admin View — ការប្រឡងបញ្ចប់មុខវិជ្ជា៖ ${currentSubject.title}` : `ការប្រឡងបញ្ចប់មុខវិជ្ជា៖ ${currentSubject.title}`)}</h3>
          <p>${isSubjectCertified 
            ? `អ្នកបានប្រឡងបញ្ចប់មុខវិជ្ជានេះជោគជ័យ! ទទួលបានវិញ្ញាបនបត្រផ្លូវការ 🏆`
            : (isAdmin 
                ? `🛡️ Admin ប្រឡងបានភ្លាម (Bypass prerequisites) • សិស្សជាប់ ${passedCount}/${totalLessons} មេរៀន`
                : `រៀន និងប្រឡងជាប់គ្រប់ ${totalLessons} មេរៀននៃមុខវិជ្ជានេះ ទើបអាចចូលប្រឡងបញ្ចប់យកវិញ្ញាបនបត្រ (៣០ សំណួរ)`)
          }</p>
        </div>
      </div>
      <div class="final-exam-progress">
        <div class="final-exam-progress-label">
          <span>មេរៀនបានប្រឡងជាប់ក្នុងមុខវិជ្ជានេះ: ${passedCount}/${totalLessons}</span>
          <span>${pct}%</span>
        </div>
        <div class="final-exam-progress-bar">
          <div class="final-exam-progress-fill" style="width: ${isAdmin ? 100 : pct}%; background: linear-gradient(90deg, #38bdf8, #818cf8);"></div>
        </div>
      </div>
      ${isSubjectCertified && currentCert?.certId
        ? `<div class="graduated-badge">🎓 ប្រឡងបញ្ចប់ជោគជ័យ! វិញ្ញាបនបត្រ: <strong>${currentCert.certId}</strong></div>
           <button class="btn-final-exam" style="margin-top:10px" onclick="openCertificatePreview('${currentCert.certId}')">📜 មើលវិញ្ញាបនបត្រ</button>`
        : `<button class="btn-final-exam" ${!canTakeFinal ? 'disabled' : ''} onclick="startAnnualExam('${currentSubject.examKey || currentSubject.id}')">
            ${!canTakeFinal 
              ? `🔒 ប្រឡងបញ្ចប់មុខវិជ្ជា (ខ្វះ ${totalLessons - passedCount} មេរៀន)` 
              : (isAdmin ? `🛡️ Admin • ចូលប្រឡងបញ្ចប់មុខវិជ្ជា (៣០ សំណួរ)` : `🎓 ចូលប្រឡងបញ្ចប់មុខវិជ្ជា (៣០ សំណួរ)`)}
           </button>`
      }
    </div>
  `;

  // Update sticky bottom progress card
  const progressRatio = document.getElementById('coursesProgressRatio');
  const progressBarFill = document.getElementById('coursesProgressBarFill');
  if (progressRatio) progressRatio.textContent = `${passedCount}/${totalLessons} Lessons (${currentSubject.titleEn || currentSubject.title})`;
  if (progressBarFill) progressBarFill.style.width = `${pct}%`;

  const searchInput = document.getElementById('coursesSearchInput');
  const searchQ = (searchInput?.value || '').trim().toLowerCase();
  const filter = STATE.coursesFilter || 'all';

  // Filter lessons
  let filteredLessons = currentSubject.lessons.filter((l, idx) => {
    const isComp = !!completed[l.dbKey];
    const isUnlocked = isAdmin || idx === 0 || !!completed[currentSubject.lessons[idx - 1].dbKey];
    const isLocked = !isUnlocked;

    if (filter === 'completed' && !isComp) return false;
    if (filter === 'ongoing' && (isComp || isLocked)) return false;
    if (filter === 'locked' && !isLocked) return false;

    if (searchQ) {
      const text = `${l.title} ${l.monthTitle || ''} ${l.weekTitle || ''}`.toLowerCase();
      if (!text.includes(searchQ)) return false;
    }
    return true;
  });

  const lessonsHTML = filteredLessons.map(l => {
    const idx = currentSubject.lessons.findIndex(x => x.dbKey === l.dbKey);
    const isComp = !!completed[l.dbKey];
    const isUnlocked = isAdmin || idx <= 0 || !!completed[currentSubject.lessons[idx - 1].dbKey];
    const isLocked = !isUnlocked;

    const isFree = isLessonFree(l.monthId, l.weekId, l.id);
    const isVipLocked = !isAdmin && !isVipUser && !isFree;
    const isCurrent = !isComp && isUnlocked && !isVipLocked;

    let badgeHTML = '';
    if (isVipLocked) {
      badgeHTML = `<span class="lesson-badge-vip-lock">🔒 VIP</span>`;
    } else if (isComp) {
      badgeHTML = `<span class="lesson-badge-completed">✓ Completed</span>`;
    } else if (isCurrent) {
      badgeHTML = `<span class="lesson-btn-inprogress">▶ In Progress</span>`;
    } else if (isLocked) {
      badgeHTML = `<span class="lesson-badge-locked">🔒 Locked</span>`;
    } else {
      badgeHTML = `<span class="lesson-badge-ongoing">Ongoing</span>`;
    }

    // Clean title for display: remove repetitive prefix if any
    let displayTitle = l.title;
    if (displayTitle.startsWith('មេរៀនទី')) {
      const parts = displayTitle.split(' - ');
      if (parts.length > 1) {
        displayTitle = `មេរៀនទី ${l.lessonNum}៖ ${parts.slice(1).join(' - ')}`;
      }
    } else {
      displayTitle = `មេរៀនទី ${l.lessonNum}៖ ${l.title}`;
    }

    const escapedTitle = displayTitle.replace(/'/g, "\\'");
    const escapedSubject = (currentSubject.title || '').replace(/'/g, "\\'");

    const clickAction = isVipLocked
      ? `openVipLessonLockModal('${escapedTitle}', '${escapedSubject}')`
      : (isLocked
          ? `showToast('🔒 ត្រូវប្រឡងជាប់មេរៀនទី ${l.lessonNum - 1} នៃមុខវិជ្ជានេះជាមុនសិន!', 'warning')`
          : `openLesson('${l.monthId}', '${l.weekId}', '${l.id}')`);

    return `
      <div class="mobile-lesson-card ${isComp ? 'completed' : ''} ${isVipLocked ? 'vip-locked' : (isLocked ? 'locked' : '')}"
           onclick="${clickAction}">
        <div class="lesson-card-thumb">
          <span class="lesson-thumb-emoji">${currentSubject.icon || '📖'}</span>
        </div>
        <div class="lesson-card-body">
          <div class="lesson-card-title">${isVipLocked ? '🔒 ' : (isLocked ? '🔒 ' : '')}${displayTitle}</div>
          <div class="lesson-card-meta">⏱️ 15 mins • ១០ សំណួរ ${isFree ? '<span class="text-emerald-400 font-semibold text-[10px] ml-1">● Free Trial</span>' : ''}</div>
          <div class="lesson-card-desc">${escapeHtml(currentSubject.title)} • វគ្គសិក្សាពេញលេញ</div>
        </div>
        <div class="lesson-card-right">
          ${badgeHTML}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = examCardHTML + `
    <div class="subject-lessons-list mt-3">
      ${lessonsHTML || '<p class="text-xs text-muted p-4 text-center">មិនមានមេរៀនត្រូវនឹងការស្វែងរកទេ</p>'}
    </div>
  `;
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

// Floating Pronunciation Tooltip for ANY highlighted / selected English text anywhere on the page
function initSelectionTTSTooltip() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  let tooltip = document.getElementById('proSelectionTTSTooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'proSelectionTTSTooltip';
    tooltip.className = 'pro-selection-tts-tooltip hidden';
    tooltip.innerHTML = `
      <button class="pro-sel-tts-btn" id="proSelTTSBtn" title="ចុចស្តាប់ការបញ្ចេញសំឡេង">
        <span class="sel-tts-icon">🔊</span>
        <span class="sel-tts-label" id="proSelTTSLabel">ស្តាប់</span>
      </button>
    `;
    document.body.appendChild(tooltip);

    tooltip.querySelector('#proSelTTSBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      const textToSpeak = tooltip.getAttribute('data-speak-text');
      if (textToSpeak) {
        speakEnglish(textToSpeak, tooltip.querySelector('#proSelTTSBtn'));
      }
    });

    document.addEventListener('mousedown', (e) => {
      if (!tooltip.contains(e.target)) {
        tooltip.classList.add('hidden');
      }
    });
  }

  document.addEventListener('selectionchange', () => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
      if (tooltip) tooltip.classList.add('hidden');
      return;
    }

    const selectedText = sel.toString().trim();
    // Only trigger if selection is between 1 and 160 characters and contains English letters
    if (!selectedText || selectedText.length > 160 || !/[a-zA-Z]/.test(selectedText)) {
      if (tooltip) tooltip.classList.add('hidden');
      return;
    }

    try {
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;

      tooltip.setAttribute('data-speak-text', selectedText);
      const label = tooltip.querySelector('#proSelTTSLabel');
      if (label) {
        const displayTxt = selectedText.length > 20 ? selectedText.slice(0, 18) + '...' : selectedText;
        label.textContent = `🔊 "${displayTxt}"`;
      }

      tooltip.style.top = `${window.scrollY + rect.top - 46}px`;
      tooltip.style.left = `${window.scrollX + rect.left + (rect.width / 2)}px`;
      tooltip.classList.remove('hidden');
    } catch (err) {}
  });
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

  // 1. ACADEMY HERO BANNER (Section 0)
  if (sections.length > 0) {
    const headerLines = sections[0].split('\n').map(l => l.trim()).filter(Boolean);
    const bannerTitle = headerLines[0] || '📚 វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេសអនឡាញ Teacher SSOnline';
    const levelInfo = headerLines.find(l => l.startsWith('📌')) || '';
    const topicInfo = headerLines.find(l => l.startsWith('🎯') || l.startsWith('🗣️') || l.startsWith('📖') || l.startsWith('🔥') || l.startsWith('✨')) || '';
    const situationInfo = headerLines.find(l => l.startsWith('📍')) || '';

    // Determine course theme & teacher badge
    const isBeginner = levelInfo.includes('ថ្នាក់ដំបូង') || levelInfo.includes('Children');
    const isElementary = levelInfo.includes('ថ្នាក់បឋមសិក្សា') || levelInfo.includes('Elementary');
    const tutorBadge = (isBeginner || isElementary || situationInfo.includes('ពិសិដ្ឋ'))
      ? `<span class="pro-tutor-pill tutor-piseth">👩‍🏫 អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)</span>`
      : `<span class="pro-tutor-pill tutor-sorn">👨‍🏫 គ្រូសន (Teacher Sorn AI)</span>`;

    const levelBadgeClass = isBeginner ? 'badge-beginner' : (isElementary ? 'badge-elementary' : 'badge-general');
    const cleanLevel = levelInfo.replace(/^📌\s*(កម្រិត៖\s*)?/, '');
    const cleanTopic = topicInfo.replace(/^[🎯🗣️📖🔥✨]\s*(ប្រធានបទ៖\s*)?/, '');

    html += `
      <div class="pro-academy-banner ${levelBadgeClass}">
        <div class="pro-banner-top-row">
          <div class="pro-brand-left">
            <span class="pro-brand-icon">🎓</span>
            <span class="pro-brand-name">${bannerTitle.replace(/^📚\s*/, '')}</span>
          </div>
          <div class="pro-level-badge">${cleanLevel || 'មេរៀនស្តង់ដា'}</div>
        </div>

        <div class="pro-topic-hero">
          <div class="pro-topic-title-row">
            <span class="pro-topic-icon">🎯</span>
            <h2 class="pro-topic-title">${cleanTopic || 'ខ្លឹមសារមេរៀន'}</h2>
          </div>
          ${situationInfo ? `<div class="pro-context-row"><span class="pro-context-icon">📍</span><span class="pro-context-text">${situationInfo.replace(/^📍\s*/, '')}</span></div>` : ''}
        </div>

        <div class="pro-banner-toolbar">
          <div class="pro-tutor-badge-box">${tutorBadge}</div>
          <div class="pro-banner-quick-actions">
            <button class="pro-quick-btn" onclick="toggleLessonAudio()" title="ស្តាប់សំឡេងមេរៀន">
              <span>🔊 ស្តាប់មេរៀន</span>
            </button>
            <button class="pro-quick-btn gold" onclick="startCurrentLessonQuiz()" title="ចូលប្រឡង Quiz">
              <span>📝 ប្រឡង Quiz</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // 2. PROCESS SECTIONS
  for (let sIdx = 1; sIdx < sections.length; sIdx++) {
    const sec = sections[sIdx];
    const lines = sec.split('\n').map(l => l.trim()).filter(Boolean);
    const firstLine = lines[0] || '';

    // ==========================================
    // MODULE A: PHONICS & ALPHABET (Beginner)
    // ==========================================
    if (sec.includes('📐 តួអក្សរ') || sec.includes('Phonics') || sec.includes('សូរសព្ទ')) {
      let letter = '';
      let sound = '';
      let spelling = '';
      let note = '';

      lines.forEach(l => {
        if (l.includes('តួអក្សរ៖')) letter = l.replace(/^•?\s*តួអក្សរ៖\s*/, '');
        else if (l.includes('សូរសំឡេង') || l.includes('Phonics៖')) sound = l.replace(/^•?\s*សូរសំឡេង.*?[៖:]\s*/, '');
        else if (l.includes('ការប្រកប') || l.includes('Spelling')) spelling = l.replace(/^•?\s*ការប្រកប.*?[៖:]\s*/, '');
        else if (l.includes('ចំណាំ Phonics') || l.includes('ចំណាំ')) note = l.replace(/^•?\s*ចំណាំ.*?[៖:]\s*/, '');
      });

      const spellingTokens = spelling ? spelling.split(/[-–—•\s]+/).filter(Boolean) : [];
      const letterMonogram = letter.split(/[\s(]/)[0] || 'Aa';

      html += `
        <div class="pro-section-block pro-phonics-block">
          <div class="pro-section-title">
            <span class="pro-sec-icon">📐</span>
            <span>តួអក្សរ និងសូរសព្ទ Phonics (Alphabet & Phonics Studio)</span>
          </div>

          <div class="pro-phonics-card">
            <div class="pro-phonics-hero-row">
              <div class="pro-phonics-letter-hero">
                <span class="phonics-giant-letter">${letterMonogram}</span>
                <span class="phonics-letter-desc">${letter.replace(letterMonogram, '').replace(/[()]/g, '').trim()}</span>
              </div>

              <div class="pro-phonics-details">
                ${sound ? `
                  <div class="pro-phonics-sound-box">
                    <span class="phonics-tag">សូរសំឡេង (Sound)</span>
                    <div class="phonics-ipa-row">
                      <span class="phonics-ipa-text">${sound}</span>
                      <button class="pro-speak-btn" onclick="speakEnglish('${escapeAttr(letterMonogram.charAt(0))}', this)" title="ស្តាប់សូរសំឡេង Phonics">🔊</button>
                    </div>
                  </div>
                ` : ''}

                ${spellingTokens.length > 0 ? `
                  <div class="pro-phonics-spelling-box">
                    <span class="phonics-tag">ការប្រកបពាក្យ (Spelling)</span>
                    <div class="phonics-tokens-rail">
                      ${spellingTokens.map(tok => `
                        <button class="spelling-token-btn" onclick="speakEnglish('${escapeAttr(tok)}', this)" title="ចុចស្តាប់អក្សរ ${tok}">
                          <span class="token-letter">${tok}</span>
                          <span class="token-sound">🔊</span>
                        </button>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>
            </div>

            ${note ? `
              <div class="pro-phonics-note-banner">
                <span class="note-icon">💡</span>
                <span class="note-text"><strong>ចំណាំ Phonics៖</strong> ${note}</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;
      continue;
    }

    // ==========================================
    // MODULE B: GRAMMAR, FORMULAS & DEFINITIONS
    // ==========================================
    if (sec.includes('📖 និយមន័យ') || sec.includes('📐 រូបមន្ត') || sec.includes('📖 មូលដ្ឋានវេយ្យាករណ៍') || sec.includes('Formulas') || sec.includes('Grammar Rules') || sec.includes('Sentence Formulas')) {
      const titleLine = firstLine.replace(/^[📖📐\s]+/, '').replace(/៖$/, '');
      const contentLines = lines.slice(1);

      // Separate definition explanation, formula, and rules
      let defParagraphs = [];
      let formulaBox = '';
      let ruleItems = [];

      contentLines.forEach(l => {
        if (/រូបមន្ត|Formulas|S\s*\+\s*V|Subject\s*\+/i.test(l) || /^[A-Z\s+()\[\]/]+\s*=\s*/.test(l)) {
          formulaBox += (formulaBox ? '\n' : '') + l;
        } else if (/^[•\-\*]|^\d+[\.\)]|^[១-៩]+[\.\)]/.test(l)) {
          ruleItems.push(l);
        } else if (l.trim()) {
          defParagraphs.push(l);
        }
      });

      html += `
        <div class="pro-section-block pro-grammar-block">
          <div class="pro-section-title">
            <span class="pro-sec-icon">📐</span>
            <span>${titleLine || 'រូបមន្ត និងក្បួនវេយ្យាករណ៍ (Formulas & Grammar Rules)'}</span>
          </div>

          ${defParagraphs.length > 0 ? `
            <div class="pro-definition-box">
              ${defParagraphs.map(p => `<p class="pro-def-paragraph">${p}</p>`).join('')}
            </div>
          ` : ''}

          ${formulaBox ? `
            <div class="pro-formula-box">
              <div class="formula-badge-label">⚡ រូបមន្តគន្លឹះ (Formula)</div>
              <div class="formula-code">${formulaBox}</div>
            </div>
          ` : ''}

          ${ruleItems.length > 0 ? `
            <div class="pro-rules-list">
              ${ruleItems.map(r => {
                const cleaned = r.replace(/^[•\-\*]\s*|^\d+[\.\)]\s*|^[១-៩]+[\.\)]\s*/, '');
                const parts = cleaned.split(' = ');
                if (parts.length === 2) {
                  return `
                    <div class="pro-rule-item bilingual">
                      <div class="rule-en-side">
                        <span class="rule-bullet">✦</span>
                        <span class="rule-en-key clickable-speak" onclick="speakEnglish('${escapeAttr(parts[0].trim())}', this)" title="ចុចស្តាប់ការបញ្ចេញសំឡេង">${parts[0].trim()}</span>
                        <button class="pro-speak-btn sm" onclick="speakEnglish('${escapeAttr(parts[0].trim())}', this)" title="ស្តាប់សំឡេង">🔊</button>
                      </div>
                      <div class="rule-kh-side">
                        <span class="rule-arrow">➔</span>
                        <span class="rule-kh-val">${parts[1].trim()}</span>
                      </div>
                    </div>
                  `;
                }
                return `
                  <div class="pro-rule-item">
                    <span class="rule-bullet">✦</span>
                    <span class="rule-text">${cleaned}</span>
                  </div>
                `;
              }).join('')}
            </div>
          ` : ''}
        </div>
      `;
      continue;
    }

    // ==========================================
    // MODULE C: DIALOGUES
    // ==========================================
    if (sec.includes('💬 កិច្ចសន្ទនា') || sec.includes('Dialogue')) {
      html += `
        <div class="pro-section-block pro-dialogue-block">
          <div class="pro-section-title">
            <span class="pro-sec-icon">💬</span>
            <span>កិច្ចសន្ទនាគំរូពេញលេញ (Full Dialogue with Audio)</span>
          </div>
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
          isSpeakerB = /B$|Student|David|Waiter|Clerk|Landlord|Doctor|Interviewer|Candidate|Chantha|You/i.test(currentSpeaker);
        } else if (line.includes('🇬🇧')) {
          turnEn = line.replace(/^[•\s]*🇬🇧\s*/, '').replace(/^"|"$/g, '').trim();
        } else if (line.includes('🇰🇭')) {
          turnKh = line.replace(/^[•\s]*🇰🇭\s*/, '').replace(/^\(|\)$/g, '').trim();

          if (currentSpeaker && turnEn && turnKh) {
            const avatar = /Piseth/i.test(currentSpeaker) ? '👩‍🏫' : (/Sorn/i.test(currentSpeaker) ? '👨‍🏫' : (isSpeakerB ? '🧑‍🎓' : '👤'));
            html += `
              <div class="pro-dialogue-turn ${isSpeakerB ? 'speaker-b' : 'speaker-a'}">
                <div class="pro-speaker-name">
                  <span class="pro-speaker-avatar">${avatar}</span>
                  <span>${currentSpeaker}</span>
                </div>
                <div class="pro-dialogue-bubble">
                  <div class="pro-en-row">
                    <span class="pro-en-text clickable-speak" onclick="speakEnglish('${escapeAttr(turnEn)}', this)" title="ចុចស្តាប់ការបញ្ចេញសំឡេង">"${turnEn}"</span>
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

    // ==========================================
    // MODULE D: COMMON MISTAKES
    // ==========================================
    if (sec.includes('⚠️ កំហុសញឹកញាប់') || sec.includes('Common Mistakes')) {
      html += `
        <div class="pro-section-block pro-mistakes-block">
          <div class="pro-section-title mistake-title">
            <span class="pro-sec-icon">⚠️</span>
            <span>កំហុសញឹកញាប់ដែលត្រូវចៀសវាង (Common Mistakes to Avoid)</span>
          </div>
          <div class="pro-mistakes-container">
            ${lines.slice(1).map(l => {
              if (l.startsWith('❌')) {
                return `
                  <div class="pro-mistake-row wrong">
                    <span class="mistake-badge wrong">❌ ខុស</span>
                    <span class="mistake-text">${l.replace(/^❌\s*/, '')}</span>
                  </div>
                `;
              }
              if (l.startsWith('✅')) {
                return `
                  <div class="pro-mistake-row correct">
                    <span class="mistake-badge correct">✅ ត្រូវ</span>
                    <span class="mistake-text">${l.replace(/^✅\s*/, '')}</span>
                  </div>
                `;
              }
              return `<div class="pro-mistake-note">${l}</div>`;
            }).join('')}
          </div>
        </div>
      `;
      continue;
    }

    // ==========================================
    // MODULE E: AI TUTOR PRO TIPS & MEMORY TRICKS
    // ==========================================
    if (sec.includes('💡 គន្លឹះរៀនឱ្យឆាប់ចេះពីគ្រូ AI') || sec.includes('🎯 គន្លឹះនៃការនិយាយ') || sec.includes('💡 វិធីសាស្ត្រចងចាំ') || sec.includes('Pro Memory Tip') || sec.includes('Speaking & Pronunciation Tip')) {
      const tipTitle = firstLine.replace(/^[💡🎯\s]+/, '').replace(/៖$/, '');
      const tipContent = lines.slice(1).join('\n').trim();

      html += `
        <div class="pro-section-block pro-tutor-tip-block">
          <div class="pro-tutor-tip-card">
            <div class="tutor-tip-header">
              <div class="tutor-tip-badge-row">
                <span class="tutor-tip-sparkle">✨</span>
                <span class="tutor-tip-badge">PRO TUTOR TIP</span>
              </div>
              <h4 class="tutor-tip-title">${tipTitle || 'គន្លឹះរៀនឱ្យឆាប់ចេះពីគ្រូ AI'}</h4>
            </div>
            <div class="tutor-tip-body">
              <div class="tutor-tip-avatar">👨‍🏫</div>
              <div class="tutor-tip-content">${tipContent || sec.replace(/^.*?\n/, '').trim()}</div>
            </div>
          </div>
        </div>
      `;
      continue;
    }

    // ==========================================
    // MODULE F: PRACTICE EXERCISE
    // ==========================================
    if (sec.includes('✍️ លំហាត់អនុវត្ត') || sec.includes('Daily Practice') || sec.includes('Practice Exercise')) {
      const practiceContent = lines.slice(1).join('\n').trim();
      html += `
        <div class="pro-section-block pro-practice-block">
          <div class="pro-practice-box">
            <div class="pro-practice-header">
              <span class="pro-practice-icon">✍️</span>
              <span class="pro-practice-title">លំហាត់អនុវត្តជាក់ស្តែង (Daily Practice Exercise)</span>
            </div>
            <div class="pro-practice-content">${practiceContent || sec.replace(/^✍️.*?\n/, '').trim()}</div>
            <div class="pro-practice-action-bar">
              <button class="pro-practice-btn primary" onclick="fillPracticeChat('${escapeAttr(practiceContent)}')">
                <span>💬 ផ្ញើចម្លើយទៅគ្រូ AI ដើម្បីកែ</span>
              </button>
              <button class="pro-practice-btn gold" onclick="startCurrentLessonQuiz()">
                <span>📝 ចូលប្រឡង Quiz មេរៀននេះ ➔</span>
              </button>
            </div>
          </div>
        </div>
      `;
      continue;
    }

    // ==========================================
    // MODULE G: KEY VOCABULARY & EXTRA WORDS
    // ==========================================
    if (sec.includes('🔑 វាក្យសព្ទ') || sec.includes('🌟 ពាក្យបន្ថែម') || (sec.includes('More ') && sec.includes('-Words')) || sec.includes('📝 បញ្ជីកិរិយាសព្ទគោល') || sec.includes('📝 បញ្ជីគុណនាមសំខាន់ៗ') || sec.includes('Key Verbs List') || sec.includes('Key Adjectives List') || (sec.includes('Key Vocabulary') && !sec.includes('ឧទាហរណ៍ជាក់ស្តែង'))) {
      const titleLine = firstLine.replace(/^[🔑🌟📝\s]+/, '').replace(/៖$/, '');
      html += `
        <div class="pro-section-block pro-vocab-block">
          <div class="pro-section-title">
            <span class="pro-sec-icon">🔑</span>
            <span>${titleLine || 'វាក្យសព្ទគន្លឹះប្រចាំមេរៀន (Key Vocabulary)'}</span>
          </div>
          <div class="pro-bilingual-grid">
      `;

      let currentItem = null;
      const vocabItems = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes(' = ')) {
          if (currentItem) vocabItems.push(currentItem);
          const parts = line.replace(/^\d+[\.\)]\s*|^\•\s*/, '').split(' = ');
          const rawEn = (parts[0] || '').replace(/^[🇬🇧\s]+/, '').trim();
          const rawKh = (parts[1] || '').replace(/^[🇰🇭\s]+/, '').trim();

          let en = rawEn;
          let ipa = '';
          const ipaMatch = rawEn.match(/\((.*?\/.*?\/.*?|\/.*?\/)\)/);
          if (ipaMatch) {
            ipa = ipaMatch[1];
            en = rawEn.replace(ipaMatch[0], '').trim();
          }

          currentItem = { en, ipa, kh: rawKh, subEn: '', subKh: '' };
        } else if (line.includes('↳ ឧទាហរណ៍៖') || line.includes('ឧទាហរណ៍៖')) {
          if (currentItem) {
            currentItem.subEn = line.replace(/^.*?ឧទាហរណ៍៖\s*/, '').replace(/^[•🇬🇧\s]+/, '').trim();
          }
        } else if (line.includes('↳ បកប្រែ៖') || line.includes('បកប្រែ៖')) {
          if (currentItem) {
            currentItem.subKh = line.replace(/^.*?បកប្រែ៖\s*/, '').replace(/^[•🇰🇭\s]+/, '').replace(/^\(|\)$/g, '').trim();
          }
        }
      }
      if (currentItem) vocabItems.push(currentItem);

      vocabItems.forEach(item => {
        const logo = getWordVisualLogo(item.en, item.kh);
        html += `
          <div class="pro-bilingual-card">
            <div class="pro-en-row">
              <div class="pro-en-left">
                <span class="pro-word-logo-badge" title="${escapeAttr(item.en)}">${logo}</span>
                <div class="pro-en-word-box">
                  <span class="pro-en-text clickable-speak" onclick="speakEnglish('${escapeAttr(item.en)}', this)" title="ចុចស្តាប់ការបញ្ចេញសំឡេង">${item.en}</span>
                  ${item.ipa ? `<span class="pro-ipa-pill">${item.ipa}</span>` : ''}
                </div>
              </div>
              <button class="pro-speak-btn" onclick="speakEnglish('${escapeAttr(item.en)}', this)" title="ស្តាប់ការបញ្ចេញសំឡេង">🔊</button>
            </div>
            <div class="pro-kh-row">
              <span class="pro-flag">🇰🇭</span>
              <span class="pro-kh-text">${item.kh}</span>
            </div>
            ${item.subEn ? `
              <div class="pro-vocab-sub-example">
                <div class="sub-ex-en-row">
                  <span class="sub-ex-label">↳ ឧទាហរណ៍៖</span>
                  <span class="sub-ex-en-text clickable-speak" onclick="speakEnglish('${escapeAttr(item.subEn)}', this)" title="ចុចស្តាប់ឧទាហរណ៍">"${item.subEn}"</span>
                  <button class="pro-speak-btn sm" onclick="speakEnglish('${escapeAttr(item.subEn)}', this)" title="ស្តាប់ឧទាហរណ៍">🔊</button>
                </div>
                ${item.subKh ? `
                  <div class="sub-ex-kh-row">
                    <span class="sub-ex-kh-text">(${item.subKh})</span>
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
      continue;
    }

    // ==========================================
    // MODULE H: PRACTICAL SENTENCES & EXAMPLES
    // ==========================================
    if (sec.includes('💡 ឧទាហរណ៍ជាក់ស្តែង') || sec.includes('💡 ល្បះគំរូ') || sec.includes('📝 ល្បះបន្ថែម') || sec.includes('Practical Examples') || sec.includes('Sample Sentences') || sec.includes('Verb Forms & Practical Examples') || sec.includes('Comparison Degrees & Examples') || (sec.includes('More ') && sec.includes('-Sentences')) || sec.includes('📝 បញ្ជីវាក្យសព្ទសំខាន់ៗ & ឧទាហរណ៍')) {
      const titleLine = firstLine.replace(/^[💡📝\s]+/, '').replace(/៖$/, '');
      html += `
        <div class="pro-section-block pro-sentences-block">
          <div class="pro-section-title">
            <span class="pro-sec-icon">💡</span>
            <span>${titleLine || 'ឧទាហរណ៍ជាក់ស្តែង & ការបកប្រែ (Practical Sentences)'}</span>
          </div>
          <div class="pro-bilingual-grid">
      `;

      let currentEn = '';
      let currentKh = '';
      let currentItemTitle = '';

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith('🔹') || /^\d+[\.\)]\s*[A-Za-z]/.test(line)) {
          if (line.includes(' = ') && !line.includes('🇬🇧')) {
            currentItemTitle = line;
          }
        }

        if (line.includes('🇬🇧') || line.includes('↳ ឧទាហរណ៍៖') || ((line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.')) && !line.includes(' = '))) {
          if (!line.includes('🇰🇭')) {
            currentEn = line.replace(/^[•\d.\s]*🇬🇧\s*/, '').replace(/^[↳\s]*ឧទាហរណ៍៖\s*/, '').replace(/^\d+[\.\)]\s*/, '').trim();
          }
        }
        
        if (line.includes('🇰🇭') || line.includes('↳ បកប្រែ៖')) {
          currentKh = line.replace(/^[•\d.\s]*🇰🇭\s*/, '').replace(/^[↳\s]*បកប្រែ៖\s*/, '').replace(/^\(|\)$/g, '').trim();

          if (currentEn && currentKh) {
            const logo = getWordVisualLogo(currentItemTitle || currentEn, currentKh);
            html += `
              <div class="pro-bilingual-card pro-sentence-card">
                ${currentItemTitle ? `<div class="pro-sentence-header-tag">${currentItemTitle}</div>` : ''}
                <div class="pro-en-row">
                  <div class="pro-en-left">
                    <span class="pro-word-logo-badge" title="${escapeAttr(currentEn)}">${logo}</span>
                    <span class="pro-en-text clickable-speak" onclick="speakEnglish('${escapeAttr(currentEn)}', this)" title="ចុចស្តាប់ការបញ្ចេញសំឡេង">${currentEn}</span>
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

    // ==========================================
    // GENERIC FALLBACK (Clean formatting)
    // ==========================================
    html += `
      <div class="pro-section-block">
        <div class="pro-generic-content">${sec}</div>
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

    const uidParam = encodeURIComponent(STATE.currentUser?.id || STATE.currentUser?.telegramId || '');
    const res = await fetch(`/api/lesson/${monthId}/${weekId}/${lessonId}?userId=${uidParam}`);
    const data = await res.json();
    if (!res.ok || !data.success) {
      if (res.status === 403 || data.isVipLocked) {
        openVipLessonLockModal(data.lessonTitle || 'មេរៀននេះ');
        return;
      }
      throw new Error(data.error || 'Lesson not found');
    }

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
    const bcElem = document.getElementById('lessonBreadcrumbs');
    if (bcElem) bcElem.textContent = `${data.month.title} > ${data.week.title} > ${data.lesson.title}`;
    
    const shortPill = document.getElementById('lessonBreadcrumbShort');
    if (shortPill) {
      const t = data.lesson.title || '';
      shortPill.textContent = t.length > 20 ? t.slice(0, 18) + '…' : t;
    }
    
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
      if (certBtn) certBtn.classList.add('hidden'); // Individual lessons do not award certificates
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
    const isUserAdmin = verifyIsAdmin();
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

  // Top previous button (mobile arrow)
  const prevTop = document.getElementById('btnPrevLessonTop');
  if (prevTop) {
    prevTop.disabled = !info.hasPrev;
    prevTop.style.opacity = info.hasPrev ? '1' : '0.3';
    prevTop.style.cursor = info.hasPrev ? 'pointer' : 'not-allowed';
    prevTop.title = info.hasPrev ? 'ត្រឡប់ទៅមេរៀនមុន' : 'នេះជាមេរៀនដំបូងគេបង្អស់';
    prevTop.innerHTML = '<span>‹</span>';
  }

  // Bottom previous button
  const prevBottom = document.getElementById('btnPrevLessonBottom');
  if (prevBottom) {
    prevBottom.disabled = !info.hasPrev;
    prevBottom.style.opacity = info.hasPrev ? '1' : '0.35';
    prevBottom.style.cursor = info.hasPrev ? 'pointer' : 'not-allowed';
    prevBottom.title = info.hasPrev ? 'ត្រឡប់ទៅមេរៀនមុន' : 'នេះជាមេរៀនដំបូងគេបង្អស់';
    prevBottom.innerHTML = '<span>◀ ត្រឡប់ទៅមេរៀនមុន</span>';
  }

  // Top next button (mobile arrow or lock)
  const nextTop = document.getElementById('btnNextLessonTop');
  if (nextTop) {
    if (!info.hasNext) {
      nextTop.disabled = true;
      nextTop.style.opacity = '0.3';
      nextTop.style.cursor = 'not-allowed';
      nextTop.title = 'នេះជាមេរៀនចុងក្រោយ';
      nextTop.innerHTML = '<span>🏁</span>';
    } else if (info.nextLocked) {
      nextTop.disabled = false;
      nextTop.style.opacity = '0.85';
      nextTop.style.cursor = 'pointer';
      nextTop.title = 'មេរៀនបន្ទាប់ជាប់សោរ (ចុចដើម្បីដឹងព័ត៌មាន)';
      nextTop.innerHTML = '<span>🔒</span>';
    } else {
      nextTop.disabled = false;
      nextTop.style.opacity = '1';
      nextTop.style.cursor = 'pointer';
      nextTop.title = 'ទៅកាន់មេរៀនបន្ទាប់';
      nextTop.innerHTML = '<span>›</span>';
    }
  }

  // Bottom next button
  const nextBottom = document.getElementById('nextLessonBtn');
  if (nextBottom) {
    if (!info.hasNext) {
      nextBottom.disabled = true;
      nextBottom.style.opacity = '0.35';
      nextBottom.style.cursor = 'not-allowed';
      nextBottom.title = 'នេះជាមេរៀនចុងក្រោយ';
      nextBottom.innerHTML = `<span>🏁 មេរៀនចុងក្រោយ</span>`;
    } else if (info.nextLocked) {
      nextBottom.disabled = false;
      nextBottom.style.opacity = '0.85';
      nextBottom.style.cursor = 'pointer';
      nextBottom.title = 'មេរៀនបន្ទាប់ជាប់សោរ (ចុចដើម្បីដឹងព័ត៌មាន)';
      nextBottom.innerHTML = `<span>🔒 មេរៀនបន្ទាប់ ▶</span>`;
    } else {
      nextBottom.disabled = false;
      nextBottom.style.opacity = '1';
      nextBottom.style.cursor = 'pointer';
      nextBottom.title = 'ទៅកាន់មេរៀនបន្ទាប់';
      nextBottom.innerHTML = `<span>មេរៀនបន្ទាប់ ▶</span>`;
    }
  }
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
  const wave = document.getElementById('audioWaveformVisualizer');

  if (STATE.audioPlaying) {
    audio.pause();
    STATE.audioPlaying = false;
    icon.textContent = '▶️';
    text.textContent = 'ចាក់សំឡេង (Play Audio)';
    status.textContent = 'បានផ្អាកសំឡេង';
    if (wave) wave.classList.remove('playing');
    return;
  }

  if (audio.src && audio.currentTime > 0 && !audio.ended) {
    audio.play();
    STATE.audioPlaying = true;
    icon.textContent = '⏸️';
    text.textContent = 'ផ្អាកសំឡេង (Pause)';
    status.textContent = 'កំពុងចាក់សំឡេងអានមេរៀន...';
    if (wave) wave.classList.add('playing');
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
    if (wave) wave.classList.add('playing');

    audio.onended = () => {
      STATE.audioPlaying = false;
      icon.textContent = '▶️';
      text.textContent = 'ចាក់ឡើងវិញ (Replay)';
      status.textContent = 'ការចាក់សំឡេងបានបញ្ចប់';
      if (wave) wave.classList.remove('playing');
    };
  } catch (err) {
    console.error('Audio play error:', err);
    icon.textContent = '▶️';
    text.textContent = 'ចាក់សំឡេង (Play Audio)';
    status.textContent = '⚠️ មានបញ្ហាក្នុងការបង្កើតសំឡេង';
    if (wave) wave.classList.remove('playing');
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
  const wave = document.getElementById('audioWaveformVisualizer');
  if (icon) icon.textContent = '▶️';
  if (text) text.textContent = 'ចាក់សំឡេង (Play Audio)';
  if (status) status.textContent = 'ចុចប៊ូតុងខាងក្រោមដើម្បីចាក់សំឡេងមេរៀន';
  if (wave) wave.classList.remove('playing');
}

// Lesson Reading Progress Bar calculation
function updateLessonReadingProgress() {
  const lessonTab = document.getElementById('tab-lesson');
  if (!lessonTab || !lessonTab.classList.contains('active')) return;
  const fill = document.getElementById('lessonReadingProgressFill');
  if (!fill) return;

  const docEl = document.documentElement;
  const scrollTop = window.pageYOffset || docEl.scrollTop || document.body.scrollTop || 0;
  const scrollHeight = (docEl.scrollHeight || document.body.scrollHeight || 0) - (window.innerHeight || docEl.clientHeight);
  if (scrollHeight <= 0) {
    fill.style.width = '100%';
    return;
  }
  const pct = Math.min(100, Math.max(0, Math.round((scrollTop / scrollHeight) * 100)));
  fill.style.width = pct + '%';
}
window.addEventListener('scroll', updateLessonReadingProgress, { passive: true });

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
  userBubble.className = 'chat-bubble user mobile-user-prompt';
  userBubble.innerHTML = `
    <div class="user-bubble-row">
      <span class="user-bubble-text">${escapeHtml(msg)}</span>
      <img src="${STATE.currentUser?.photoUrl || '/teacher_limsorn.jpg'}" class="user-bubble-mini-avatar" alt="You" onerror="this.src='/director_signature.png'">
    </div>
  `;
  chatBox.appendChild(userBubble);
  chatBox.scrollTop = chatBox.scrollHeight;

  const trimmed = msg.toLowerCase().trim();
  if (trimmed === 'សុំ prompt' || trimmed === 'prompt' || trimmed === 'សុំprompt' || trimmed === 'prompts') {
    const replyBubble = document.createElement('div');
    replyBubble.className = 'chat-bubble ai mobile-ai-prompt-reply';
    replyBubble.innerHTML = `
      <div class="ai-bubble-header">
        <span class="ai-bubble-author">🤖 AI Tutor</span>
        <span class="ai-bubble-badge">Official AI</span>
      </div>
      <div class="ai-bubble-content">
        សួស្តីប្អូន! តើប្អូនចង់បាន prompt សម្រាប់អ្វី? ខាងក្រោមនេះជាឧទាហរណ៍ខ្លះៗដែលប្អូនអាចសាកល្បង៖
      </div>
      <div class="ai-prompt-grid-2x2">
        <div class="ai-prompt-card" onclick="openPromptPicker('vocab')">
          <div class="prompt-card-icon">📖</div>
          <div class="prompt-card-title">Explain 'Vocabulary'</div>
          <div class="prompt-card-sub">សុំ prompt: ពន្យល់ពាក្យ 'Vocabulary'</div>
        </div>
        <div class="ai-prompt-card" onclick="openPromptPicker('grammar')">
          <div class="prompt-card-icon">✒️</div>
          <div class="prompt-card-title">Correct my grammar</div>
          <div class="prompt-card-sub">សុំ prompt: កែលម្អប្រយោគរបស់ខ្ញុំ</div>
        </div>
        <div class="ai-prompt-card" onclick="openPromptPicker('speaking')">
          <div class="prompt-card-icon">🎙️</div>
          <div class="prompt-card-title">Practice speaking</div>
          <div class="prompt-card-sub">សុំ prompt: ហ្វឹកហាត់សន្ទនា</div>
        </div>
        <div class="ai-prompt-card" onclick="openPromptPicker('test')">
          <div class="prompt-card-icon">❓</div>
          <div class="prompt-card-title">Test my level</div>
          <div class="prompt-card-sub">សុំ prompt: តេស្តកម្រិតរបស់ខ្ញុំ</div>
        </div>
      </div>
    `;
    chatBox.appendChild(replyBubble);
    chatBox.scrollTop = chatBox.scrollHeight;
    return;
  }

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
      if (data.isVipLocked) {
        openVipLessonLockModal(STATE.currentLesson?.title || 'មេរៀននេះ');
        return;
      }
      throw new Error(data.error || 'Failed to start quiz');
    }

    launchQuizEngine(data, 'LESSON QUIZ');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function startAnnualExam(subjectKey) {
  try {
    showToast('⏳ កំពុងរៀបចំវិញ្ញាសាប្រឡងបញ្ចប់មុខវិជ្ជា (៣០ សំណួរ)...', 'info');
    const res = await fetch(`/api/quiz/start?type=annual&subjectKey=${subjectKey}&userId=${STATE.currentUser?.id || ''}`);
    const data = await res.json();

    if (!data.success) {
      if (data.isLocked) {
        showToast(data.error, 'error', 5000);
        return;
      }
      if (data.isVipLocked) {
        openVipLessonLockModal('ការប្រឡងបញ្ចប់មុខវិជ្ជា');
        return;
      }
      throw new Error(data.error || 'Failed to start annual exam');
    }

    launchQuizEngine(data, 'ANNUAL EXAM (30 Qs)');
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

  const submitBtn = document.getElementById('submitQuizBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⏳ កំពុងបញ្ជូនចម្លើយ...</span>`;
  }

  try {
    showToast('⏳ កំពុងត្រួតពិនិត្យ និងវាយតម្លៃពិន្ទុ...', 'info');

    const effectiveUserId = STATE.currentUser?.id || (STATE.currentUser?.telegramId ? STATE.currentUser.telegramId.toString() : null) || 'guest_' + Date.now();
    const effectiveName = STATE.currentUser?.name || STATE.currentUser?.khmerName || 'សិស្ស';

    const res = await fetch('/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: STATE.quizSession.sessionId,
        userId: effectiveUserId,
        studentName: effectiveName,
        answers: STATE.userAnswers
      })
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Submission failed');

    // Show Result Modal
    showQuizResultModal(data);
    refreshUserProfile();
  } catch (err) {
    console.error('Quiz submit error:', err);
    showToast(err.message || 'មានបញ្ហាក្នុងការបញ្ជូនចម្លើយ សូមព្យាយាមម្តងទៀត!', 'error');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>✅ បញ្ជូនចម្លើយ (Submit)</span>`;
    }
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

function shareCertificateToTelegram() {
  if (!STATE.currentCertPreviewId) return showToast('⚠️ មិនមានវិញ្ញាបនបត្រដើម្បីចែករំលែកឡើយ', 'warning');
  const certUrl = `${window.location.origin}/api/certificates/html/${STATE.currentCertPreviewId}`;
  const text = `🎓 ខ្ញុំទើបតែប្រឡងជាប់ និងទទួលបានវិញ្ញាបនបត្រភាសាអង់គ្លេសពី Teacher SSOnline! សូមមើលវិញ្ញាបនបត្ររបស់ខ្ញុំនៅទីនេះ៖`;
  const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(certUrl)}&text=${encodeURIComponent(text)}`;
  window.open(tgUrl, '_blank');
}

function copyCertificateShareLink() {
  if (!STATE.currentCertPreviewId) return showToast('⚠️ មិនមានវិញ្ញាបនបត្រដើម្បីចម្លងឡើយ', 'warning');
  const certUrl = `${window.location.origin}/api/certificates/html/${STATE.currentCertPreviewId}`;
  navigator.clipboard.writeText(certUrl).then(() => {
    showToast('🔗 បានចម្លង Link វិញ្ញាបនបត្រទៅកាន់ Clipboard រួចរាល់!', 'success');
  }).catch(() => {
    prompt('Link វិញ្ញាបនបត្រ៖', certUrl);
  });
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

// ==========================================
// DICTIONARY & TRANSLATION MODAL & FULL-PAGE HANDLERS
// ==========================================
let dictVocabDataCache = null;
let dictLastTranslatedResult = null;

function initDictionaryTab() {
  switchDictPageSection('translate');
  if (!dictVocabDataCache) {
    loadDictPageVocab();
  }
  if (!STATE.allVerbsData || Object.keys(STATE.allVerbsData).length === 0) {
    fetch('/api/verbs').then(r => r.json()).then(d => {
      if (d.success) {
        STATE.allVerbsData = d.verbs;
        renderDictPageVerbsTable();
      }
    }).catch(e => console.error(e));
  } else {
    renderDictPageVerbsTable();
  }
}

function switchDictPageSection(section) {
  const tabs = ['translate', 'vocab', 'verbs'];
  tabs.forEach(t => {
    const btn = document.getElementById('dictPageTab' + t.charAt(0).toUpperCase() + t.slice(1));
    const sec = document.getElementById('dictSection' + t.charAt(0).toUpperCase() + t.slice(1));
    if (t === section) {
      btn?.classList.add('active');
      sec?.classList.remove('hidden');
    } else {
      btn?.classList.remove('active');
      sec?.classList.add('hidden');
    }
  });

  if (section === 'translate') {
    setTimeout(() => document.getElementById('dictPageSourceText')?.focus(), 150);
  } else if (section === 'vocab') {
    if (!dictVocabDataCache) loadDictPageVocab();
  } else if (section === 'verbs') {
    renderDictPageVerbsTable();
  }
}

function setDictPageQuery(text) {
  const input = document.getElementById('dictPageSourceText');
  if (input) {
    input.value = text;
    runDictPageTranslate();
  }
}

async function runDictPageTranslate() {
  const textInput = document.getElementById('dictPageSourceText');
  const text = (textInput?.value || '').trim();
  if (!text) {
    showToast('⚠️ សូមបញ្ចូលពាក្យ ឬអត្ថបទដែលត្រូវបកប្រែ!', 'warning');
    return;
  }

  const dirSelect = document.getElementById('dictPageDirectionSelect');
  const direction = dirSelect?.value || 'auto';
  const resultBox = document.getElementById('dictPageResultBox');
  const resultText = document.getElementById('dictPageResultText');
  const dirBadge = document.getElementById('dictPageResultDirBadge');

  if (resultBox) resultBox.classList.remove('hidden');
  if (resultText) resultText.innerHTML = '<span class="text-slate-400">⏳ កំពុងបកប្រែ (ស្តង់ដាជាតិ)...</span>';

  try {
    const res = await fetch('/api/ai/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        direction,
        offline: true,
        userId: STATE.currentUser?.id || 'web-guest'
      })
    });
    const data = await res.json();
    if (data.success && data.translation) {
      dictLastTranslatedResult = data;
      if (resultText) resultText.textContent = data.translation;
      if (dirBadge) dirBadge.textContent = data.direction || (data.toLang === 'English' ? 'ខ្មែរ ➔ English' : 'English ➔ ខ្មែរ');
    } else {
      if (resultText) resultText.textContent = '❌ មិនអាចបកប្រែបានទេ សូមសាកល្បងម្ដងទៀត';
    }
  } catch (err) {
    console.error('Page translation error:', err);
    if (resultText) resultText.textContent = '❌ មានបញ្ហាក្នុងការតភ្ជាប់ សូមព្យាយាមម្ដងទៀត';
  }
}

function clearDictPageTranslate() {
  const input = document.getElementById('dictPageSourceText');
  const resultBox = document.getElementById('dictPageResultBox');
  const resultText = document.getElementById('dictPageResultText');
  if (input) input.value = '';
  if (resultBox) resultBox.classList.add('hidden');
  if (resultText) resultText.textContent = '';
}

function playDictPageAudio() {
  if (!dictLastTranslatedResult) return;
  const toSpeak = dictLastTranslatedResult.toLang === 'English'
    ? dictLastTranslatedResult.translation
    : dictLastTranslatedResult.originalText;
  if (toSpeak) {
    speakEnglish(toSpeak, document.getElementById('dictPageSpeakBtn'));
  }
}

function copyDictPageResult(btn) {
  const resultText = document.getElementById('dictPageResultText')?.textContent || '';
  if (!resultText) return;
  navigator.clipboard.writeText(resultText).then(() => {
    const oldText = btn.innerHTML;
    btn.innerHTML = '<span>✅ បានចម្លង</span>';
    setTimeout(() => { btn.innerHTML = oldText; }, 1500);
  });
}

async function loadDictPageVocab() {
  try {
    const res = await fetch('/api/vocab');
    const data = await res.json();
    if (data.success && Array.isArray(data.categories)) {
      dictVocabDataCache = data.categories;
      const select = document.getElementById('dictPageCategorySelect');
      if (select) {
        select.innerHTML = data.categories.map((c, idx) => `<option value="${idx}">${c.name}</option>`).join('');
      }
      renderDictPageCategory(0);
    }
  } catch (e) {
    console.error('Failed to load dict page vocab:', e);
  }
}

function renderDictPageCategory(index) {
  if (!dictVocabDataCache) return;
  const cat = dictVocabDataCache[index];
  if (!cat) return;
  renderDictPageVocabCards(cat.words);
}

function renderDictPageVocabCards(words) {
  const container = document.getElementById('dictPageVocabGrid');
  if (!container) return;
  if (!words || words.length === 0) {
    container.innerHTML = '<div class="text-center text-slate-400 py-6 text-sm col-span-full">រកមិនឃើញពាក្យទេ</div>';
    return;
  }

  container.innerHTML = words.map(item => {
    const parts = item.split('=');
    const en = parts[0]?.trim() || '';
    const kh = parts.slice(1).join('=').trim() || '';
    const logo = getWordVisualLogo(en, kh);
    return `
      <div class="dict-vocab-card-item">
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="pro-word-logo-badge" style="width:32px;height:32px;min-width:32px;font-size:18px;">${logo}</span>
          <div>
            <div class="dict-vocab-card-en">${escapeHtml(en)}</div>
            <div class="dict-vocab-card-kh">${escapeHtml(kh)}</div>
          </div>
        </div>
        <button class="btn btn-xs btn-outline" onclick="speakEnglish('${escapeHtml(en).replace(/'/g, "\\'")}', this)" title="ស្តាប់សំឡេង">🔊</button>
      </div>
    `;
  }).join('');
}

function filterDictPageVocab(query) {
  if (!dictVocabDataCache) return;
  const q = (query || '').toLowerCase().trim();
  if (!q) {
    const select = document.getElementById('dictPageCategorySelect');
    const idx = select ? parseInt(select.value) || 0 : 0;
    renderDictPageCategory(idx);
    return;
  }

  let matchedWords = [];
  dictVocabDataCache.forEach(cat => {
    (cat.words || []).forEach(w => {
      if (w.toLowerCase().includes(q)) {
        matchedWords.push(w);
      }
    });
  });

  renderDictPageVocabCards(matchedWords);
}

function filterDictPageVerbGroup(groupKey) {
  document.querySelectorAll('#dictSectionVerbs .verb-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.group === groupKey);
  });
  const q = document.getElementById('dictPageVerbsSearch')?.value || '';
  renderDictPageVerbsTable(groupKey, q);
}

function filterDictPageVerbs(q) {
  const activeBtn = document.querySelector('#dictSectionVerbs .verb-filter-btn.active');
  const group = activeBtn?.dataset.group || 'all';
  renderDictPageVerbsTable(group, q);
}

function renderDictPageVerbsTable(filterKey = 'all', query = '') {
  const tbody = document.getElementById('dictPageVerbsTableBody');
  if (!tbody) return;

  if (!STATE.allVerbsData || Object.keys(STATE.allVerbsData).length === 0) {
    fetch('/api/verbs').then(r => r.json()).then(d => {
      if (d.success) {
        STATE.allVerbsData = d.verbs;
        renderDictPageVerbsTable(filterKey, query);
      }
    }).catch(e => console.error(e));
    return;
  }

  let flatList = [];
  if (filterKey === 'all') {
    Object.values(STATE.allVerbsData).forEach(arr => {
      if (Array.isArray(arr)) flatList.push(...arr);
    });
  } else if (STATE.allVerbsData[filterKey]) {
    flatList = STATE.allVerbsData[filterKey];
  }

  if (query) {
    const q = query.toLowerCase().trim();
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

function openTranslateModal() {
  openModal('dictionaryModal');
  switchDictTab('translate');
  if (!dictVocabDataCache) {
    loadVocabCategories();
  }
}

function switchDictTab(tab) {
  const btnTranslate = document.getElementById('dictTabTranslateBtn');
  const btnVocab = document.getElementById('dictTabVocabBtn');
  const paneTranslate = document.getElementById('dictPaneTranslate');
  const paneVocab = document.getElementById('dictPaneVocab');

  if (tab === 'translate') {
    btnTranslate?.classList.add('active');
    btnVocab?.classList.remove('active');
    paneTranslate?.classList.remove('hidden');
    paneVocab?.classList.add('hidden');
    setTimeout(() => document.getElementById('dictSourceText')?.focus(), 150);
  } else if (tab === 'vocab') {
    btnVocab?.classList.add('active');
    btnTranslate?.classList.remove('active');
    paneVocab?.classList.remove('hidden');
    paneTranslate?.classList.add('hidden');
    if (!dictVocabDataCache) {
      loadVocabCategories();
    }
  }
}

async function runDictTranslate() {
  const textInput = document.getElementById('dictSourceText');
  const text = (textInput?.value || '').trim();
  if (!text) {
    showToast('⚠️ សូមបញ្ចូលពាក្យ ឬអត្ថបទដែលត្រូវបកប្រែ!', 'warning');
    return;
  }

  const dirSelect = document.getElementById('dictDirectionSelect');
  const direction = dirSelect?.value || 'auto';
  const resultBox = document.getElementById('dictResultBox');
  const resultText = document.getElementById('dictResultText');
  const dirBadge = document.getElementById('dictResultDirBadge');

  if (resultBox) resultBox.classList.remove('hidden');
  if (resultText) resultText.innerHTML = '<span class="text-slate-400">⏳ កំពុងបកប្រែ...</span>';

  try {
    const res = await fetch('/api/ai/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        direction,
        offline: true,
        userId: STATE.currentUser?.id || 'web-guest'
      })
    });
    const data = await res.json();
    if (data.success && data.translation) {
      dictLastTranslatedResult = data;
      if (resultText) resultText.textContent = data.translation;
      if (dirBadge) dirBadge.textContent = data.direction || (data.toLang === 'English' ? 'ខ្មែរ ➔ English' : 'English ➔ ខ្មែរ');
    } else {
      if (resultText) resultText.textContent = '❌ មិនអាចបកប្រែបានទេ សូមសាកល្បងម្ដងទៀត';
    }
  } catch (err) {
    console.error('Translation error:', err);
    if (resultText) resultText.textContent = '❌ មានបញ្ហាក្នុងការតភ្ជាប់ សូមព្យាយាមម្ដងទៀត';
  }
}

function clearDictTranslate() {
  const input = document.getElementById('dictSourceText');
  const resultBox = document.getElementById('dictResultBox');
  const resultText = document.getElementById('dictResultText');
  if (input) input.value = '';
  if (resultBox) resultBox.classList.add('hidden');
  if (resultText) resultText.textContent = '';
  dictLastTranslatedResult = null;
}

function playDictAudio() {
  if (!dictLastTranslatedResult) return;
  const toSpeak = dictLastTranslatedResult.toLang === 'English'
    ? dictLastTranslatedResult.translation
    : dictLastTranslatedResult.originalText;
  if (toSpeak) {
    speakEnglish(toSpeak, document.getElementById('dictSpeakBtn'));
  }
}

function copyDictResult(btn) {
  const resultText = document.getElementById('dictResultText')?.textContent || '';
  if (!resultText) return;
  navigator.clipboard.writeText(resultText).then(() => {
    const oldText = btn.innerHTML;
    btn.innerHTML = '<span>✅ បានចម្លង</span>';
    setTimeout(() => { btn.innerHTML = oldText; }, 1500);
  });
}

async function loadVocabCategories() {
  try {
    const res = await fetch('/api/vocab');
    const data = await res.json();
    if (data.success && Array.isArray(data.categories)) {
      dictVocabDataCache = data.categories;
      const select = document.getElementById('dictCategorySelect');
      if (select) {
        select.innerHTML = data.categories.map((c, idx) => `<option value="${idx}">${c.name}</option>`).join('');
      }
      renderSelectedVocabCategory(0);
    }
  } catch (e) {
    console.error('Failed to load vocab categories:', e);
  }
}

function renderSelectedVocabCategory(index) {
  if (!dictVocabDataCache) return;
  const cat = dictVocabDataCache[index];
  if (!cat) return;
  renderVocabWordsList(cat.words);
}

function renderVocabWordsList(words) {
  const container = document.getElementById('dictVocabListContainer');
  if (!container) return;
  if (!words || words.length === 0) {
    container.innerHTML = '<div class="text-center text-slate-400 py-4 text-xs">រកមិនឃើញពាក្យទេ</div>';
    return;
  }

  container.innerHTML = words.map(item => {
    const parts = item.split('=');
    const en = parts[0]?.trim() || '';
    const kh = parts.slice(1).join('=').trim() || '';
    return `
      <div class="dict-vocab-item">
        <div class="flex items-center gap-2">
          <span class="dict-vocab-en">${escapeHtml(en)}</span>
          <span class="dict-vocab-kh">${escapeHtml(kh)}</span>
        </div>
        <button class="btn btn-xs btn-outline" onclick="speakEnglish('${escapeHtml(en).replace(/'/g, "\\'")}', this)" title="ស្តាប់">🔊</button>
      </div>
    `;
  }).join('');
}

function filterVocabCategories(query) {
  if (!dictVocabDataCache) return;
  const q = (query || '').toLowerCase().trim();
  if (!q) {
    const select = document.getElementById('dictCategorySelect');
    const idx = select ? parseInt(select.value) || 0 : 0;
    renderSelectedVocabCategory(idx);
    return;
  }

  let matchedWords = [];
  dictVocabDataCache.forEach(cat => {
    (cat.words || []).forEach(w => {
      if (w.toLowerCase().includes(q)) {
        matchedWords.push(w);
      }
    });
  });

  renderVocabWordsList(matchedWords);
}

function openProfileModal() {
  console.log('[DEBUG] openProfileModal() called. currentUser=', STATE.currentUser ? STATE.currentUser.id : 'null');
  if (!STATE.currentUser) return openLoginModal();
  const modalEl = document.getElementById('profileModal');
  console.log('[DEBUG] profileModal element=', modalEl, 'classes=', modalEl ? modalEl.className : 'NOT FOUND');
  const u = STATE.currentUser;
  const name = u.name || u.username || 'Student';
  const uname = u.username ? `@${u.username}` : (u.isTelegram ? `ID: ${u.id}` : '');
  const gmail = u.gmail || 'មិនមាន';
  const isVerified = !!u.gmailVerified;
  const isSuperAdmin = verifyIsSuperAdmin();
  const isLifetime = !isSuperAdmin && !!(
    u.isLifetime ||
    (u.plan && (u.plan.toLowerCase().includes('lifetime') || u.plan.includes('មួយជីវិត'))) ||
    (u.vipDetails?.plan && (u.vipDetails.plan.toLowerCase().includes('lifetime') || u.vipDetails.plan.includes('មួយជីវិត'))) ||
    (u.vipDetails?.daysRemaining && u.vipDetails.daysRemaining > 3000)
  );

  let isVip = 'Free Account';
  if (isSuperAdmin) {
    isVip = '⚡ Super Admin (ម្ចាស់ប្រព័ន្ធ / សិទ្ធិពេញលេញ)';
  } else if (isLifetime) {
    isVip = '👑 VIP ពេញមួយជីវិត (Lifetime)';
  } else if (u.isVIP) {
    isVip = `💎 VIP (${u.vipDetails?.daysRemaining || 30} ថ្ងៃ)`;
  }

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
    syncTgBtn.classList.toggle('hidden', !!u.isTelegram);
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

async function handleChangePasswordSubmit() {
  const pwdInput = document.getElementById('changePasswordInput');
  const newPassword = pwdInput?.value?.trim();
  
  if (!newPassword || newPassword.length < 4) {
    showToast('⚠️ លេខសម្ងាត់ត្រូវមានយ៉ាងតិច ៤ ខ្ទង់!', 'warning');
    return;
  }
  
  if (!STATE.currentUser || !STATE.currentUser.id) return;
  
  const btn = document.getElementById('btnSubmitChangePassword');
  if (btn) btn.disabled = true;
  
  try {
    const res = await fetch('/api/user/profile/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: STATE.currentUser.id, newPassword })
    });
    const data = await res.json();
    
    if (data.success) {
      showToast(data.message || 'បានប្តូរលេខសម្ងាត់ថ្មីដោយជោគជ័យ!', 'success');
      closeModal('changePasswordModal');
      if (pwdInput) pwdInput.value = '';
    } else {
      showToast(data.error || 'បរាជ័យក្នុងការប្តូរលេខសម្ងាត់សិស្ស', 'error');
    }
  } catch (err) {
    showToast('❌ មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ម៉ាស៊ីន', 'error');
  } finally {
    if (btn) btn.disabled = false;
  }
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

async function handleStandardLoginSubmit() {
  const userInput = document.getElementById('loginUsernameInput');
  const pwdInput = document.getElementById('loginPasswordInput');
  const username = userInput?.value?.trim();
  const password = pwdInput?.value?.trim();
  
  if (!username || !password) {
    showToast('⚠️ សូមបញ្ចូល ឈ្មោះគណនី និងលេខសម្ងាត់!', 'warning');
    return;
  }
  
  const btn = document.getElementById('btnSubmitLogin');
  if (btn) btn.disabled = true;
  
  try {
    const deviceId = getOrCreateDeviceId();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, deviceId })
    });
    
    const data = await res.json();
    if (data.success && data.user) {
      // Use setCurrentUser so session is saved to localStorage and UI updates
      setCurrentUser(data.user, data.sessionToken, deviceId);
      showToast('✅ ចូលគណនីបានជោគជ័យ!', 'success');
      closeModal('loginModal');
      refreshUserProfile();
      loadBeginnerStatus();
      loadElementaryStatus();
      
      // Clear inputs
      if (userInput) userInput.value = '';
      if (pwdInput) pwdInput.value = '';
      togglePasswordLogin();
    } else {
      showToast(data.error || 'បរាជ័យក្នុងការចូលគណនី!', 'error');
    }
  } catch (err) {
    showToast('❌ មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ម៉ាស៊ីន', 'error');
  } finally {
    if (btn) btn.disabled = false;
  }
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

// ===================================================
// SCHOOL MANAGEMENT DASHBOARD (ADMIN SUITE) CONTROLLER
// ===================================================

STATE.adminData = {
  overview: null,
  students: [],
  payments: [],
  licenses: [],
  schoolInfo: null,
  activeAdminTab: 'overview',
  searchDebounceTimer: null
};

function getAdminId() {
  if (!verifyIsAdmin()) return '';
  if (STATE.currentUser?.id) return STATE.currentUser.id.toString();
  if (STATE.currentUser?.telegramId) return STATE.currentUser.telegramId.toString();
  if (STATE.currentUser?.linkedTelegramId) return STATE.currentUser.linkedTelegramId.toString();
  return '';
}

function verifyIsSuperAdmin() {
  if (!STATE.currentUser) return false;
  if (STATE.currentUser.isSuperAdmin === true || STATE.currentUser.role === 'super_admin') return true;

  const uid = (STATE.currentUser.id || '').toString().trim();
  const tgId = (STATE.currentUser.telegramId || '').toString().trim();
  const linkedTg = (STATE.currentUser.linkedTelegramId || '').toString().trim();
  const username = (STATE.currentUser.username || '').toLowerCase().replace('@', '').trim();

  const SUPER_ADMINS = ['240224709', '7160751939'];
  return (
    SUPER_ADMINS.includes(uid) ||
    SUPER_ADMINS.includes(tgId) ||
    SUPER_ADMINS.includes(linkedTg) ||
    username === 'limsorn' ||
    username === 'superadmin'
  );
}

function verifyIsAdmin() {
  if (!STATE.currentUser) return false;
  if (verifyIsSuperAdmin()) return true;
  if (STATE.currentUser.isAdmin === true) return true;
  if (STATE.currentUser.role === 'admin') return true;
  return false;
}

async function initAdminDashboard() {
  if (!verifyIsAdmin()) {
    showToast('⛔ គណនីរបស់អ្នកមិនមានសិទ្ធិជា Admin ឡើយ!', 'error', 3500);
    navigateTo('dashboard');
    return;
  }

  switchAdminTab(STATE.adminData.activeAdminTab || 'overview');
  await loadAdminDashboardData();
}

function switchAdminTab(tabKey) {
  STATE.adminData.activeAdminTab = tabKey;

  // Update pill buttons
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.admintab === tabKey);
  });

  // Switch subpanels
  document.querySelectorAll('.admin-subpanel').forEach(panel => {
    panel.classList.remove('active');
  });

  const activePanel = document.getElementById(`admin-panel-${tabKey}`);
  if (activePanel) {
    activePanel.classList.add('active');
  }

  // Hook data loaders
  if (tabKey === 'overview') {
    loadAdminDashboardData();
  } else if (tabKey === 'students') {
    loadAdminStudents();
  } else if (tabKey === 'payments') {
    loadAdminPayments();
  } else if (tabKey === 'licenses') {
    loadAdminLicenses();
  } else if (tabKey === 'settings') {
    loadAdminSchoolInfo();
  }
}

// 1. Overview Loader
async function loadAdminDashboardData() {
  try {
    const adminId = getAdminId();
    const res = await fetch(`/api/admin/overview?adminId=${encodeURIComponent(adminId)}`);
    const data = await res.json();

    if (data.success && data.stats) {
      STATE.adminData.overview = data;
      const s = data.stats;

      const elTotal = document.getElementById('admStatTotalStudents');
      const elVip = document.getElementById('admStatVipStudents');
      const elFree = document.getElementById('admStatFreeStudents');
      const elCerts = document.getElementById('admStatCerts');
      const elGrad = document.getElementById('admStatGraduated');
      const elGradSub = document.getElementById('admStatGradSub');
      const elPhone = document.getElementById('admStatPhoneCount');
      const elActiveLic = document.getElementById('admStatActiveLicenses');
      const elUsedLic = document.getElementById('admStatUsedLicenses');
      const elSchool = document.getElementById('adminHeaderSchoolName');

      if (elTotal) elTotal.textContent = s.totalStudents.toLocaleString();
      if (elVip) elVip.textContent = s.vipStudents.toLocaleString();
      if (elFree) elFree.textContent = s.freeStudents.toLocaleString();
      if (elCerts) elCerts.textContent = s.certificatesIssued.toLocaleString();
      if (elGrad) elGrad.textContent = (s.beginnerGraduated + s.elementaryGraduated).toLocaleString();
      if (elGradSub) elGradSub.textContent = `Beg: ${s.beginnerGraduated} • Elem: ${s.elementaryGraduated}`;
      if (elPhone) elPhone.textContent = `📱 តាមទូរស័ព្ទ: ${s.phoneRegisteredCount} នាក់`;
      if (elActiveLic) elActiveLic.textContent = s.activeLicenses.toLocaleString();
      if (elUsedLic) elUsedLic.textContent = `បានប្រើ: ${s.usedLicenses}`;
      if (elSchool && data.schoolInfo?.schoolName) elSchool.textContent = data.schoolInfo.schoolName;

      // Render recent payments table in overview
      renderAdminOverviewPayments(data.recentPayments || []);
    }
  } catch (err) {
    console.error('Failed to load admin overview data:', err);
  }
}

function renderAdminOverviewPayments(payments) {
  const tbody = document.getElementById('admOverviewPaymentsBody');
  if (!tbody) return;

  if (!payments || payments.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-slate-400">មិនទាន់មានប្រតិបត្តិការថ្មីៗឡើយ</td></tr>`;
    return;
  }

  tbody.innerHTML = payments.map(p => `
    <tr>
      <td class="text-xs text-slate-400 font-mono">${escapeHtml(p.dateFormatted || new Date(p.timestamp).toLocaleDateString())}</td>
      <td class="font-bold text-white">${escapeHtml(p.userId || 'N/A')}</td>
      <td>
        <span class="badge-level">${escapeHtml(p.action || (p.licenseKey ? 'បញ្ចូល License Key' : 'បង់ប្រាក់'))}</span>
      </td>
      <td class="text-amber-300 font-semibold">${escapeHtml(p.durationLabel || (p.monthsAdded ? `${p.monthsAdded} ខែ` : (p.daysAdded ? `${p.daysAdded} ថ្ងៃ` : 'VIP')))}</td>
      <td class="text-xs text-slate-400 font-mono">${escapeHtml(p.adminId || 'System')}</td>
    </tr>
  `).join('');
}

// 2. Student Directory Loader & Filters
async function loadAdminStudents() {
  const tbody = document.getElementById('admStudentsTableBody');
  if (tbody) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-slate-400">កំពុងផ្ទុកបញ្ជីសិស្ស...</td></tr>`;
  }

  try {
    const adminId = getAdminId();
    const search = (document.getElementById('admStudentSearchInput')?.value || '').trim();
    const status = document.getElementById('admFilterStatus')?.value || 'all';
    const level = document.getElementById('admFilterLevel')?.value || 'all';

    const url = `/api/admin/students?adminId=${encodeURIComponent(adminId)}&search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}&level=${encodeURIComponent(level)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.success && Array.isArray(data.students)) {
      STATE.adminData.students = data.students;
      const countEl = document.getElementById('admStudentsCount');
      if (countEl) countEl.textContent = data.students.length;

      renderAdminStudentsTable(data.students);
    } else {
      if (tbody) tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-red-400">មិនអាចផ្ទុកបញ្ជីសិស្សបានឡើយ: ${escapeHtml(data.error || 'Server error')}</td></tr>`;
    }
  } catch (err) {
    console.error('Failed to load students:', err);
    if (tbody) tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-red-400">មានបញ្ហាក្នុងការតភ្ជាប់អ៊ីនធឺណិត</td></tr>`;
  }
}

function renderAdminStudentsTable(students) {
  const tbody = document.getElementById('admStudentsTableBody');
  if (!tbody) return;

  if (students.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center py-8 text-slate-400">
          <div class="text-3xl mb-2">📂</div>
          <p>រកមិនឃើញសិស្សដែលត្រូវនឹងលក្ខខណ្ឌស្វែងរកឡើយ</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = students.map(s => {
    const initial = (s.name || s.phone || 'S').charAt(0).toUpperCase();
    const isVip = !!s.isVIP;
    const phoneDisplay = s.phone ? `<a href="tel:${escapeHtml(s.phone)}" class="text-cyan-400 font-mono hover:underline">📞 ${escapeHtml(s.phone)}</a>` : '<span class="text-slate-500">គ្មាន</span>';
    const avatarHtml = s.photoUrl
      ? `<img src="${escapeHtml(s.photoUrl)}" class="student-table-avatar-img" alt="${escapeHtml(s.name)}" onerror="this.outerHTML='<div class=\\'student-table-avatar\\'>${initial}</div>'">`
      : `<div class="student-table-avatar">${initial}</div>`;

    return `
      <tr class="${s.isBlocked ? 'opacity-60 bg-red-950/20' : ''}">
        <td>
          <div class="student-table-item">
            ${avatarHtml}
            <div>
              <div class="student-name-main font-semibold">${escapeHtml(s.name)} ${s.khmerName && s.khmerName !== s.name ? `<span class="text-xs text-slate-400">(${escapeHtml(s.khmerName)})</span>` : ''}</div>
              <div class="student-name-sub flex items-center gap-2 flex-wrap">
                ${s.telegramFullName && s.telegramFullName !== s.name ? `<span class="text-cyan-300 text-[11px] font-medium" title="ឈ្មោះលើ Telegram ពេញ">✈️ ${escapeHtml(s.telegramFullName)}</span>` : ''}
                <span class="font-mono text-slate-500 text-[11px]">ID: ${escapeHtml(s.id)}</span>
              </div>
            </div>
          </div>
        </td>
        <td>
          ${phoneDisplay}
          <div class="text-[11px] text-sky-300 font-mono mt-0.5" title="ឈ្មោះចូលគណនី (Username/ID)">👤 ${escapeHtml(s.loginUsername || s.username || s.id)}</div>
          ${s.plainPassword ? `<div class="text-[11px] text-amber-400 font-mono font-bold" title="លេខសម្ងាត់សិស្ស">🔑 ${escapeHtml(s.plainPassword)}</div>` : '<div class="text-[10px] text-slate-500 font-mono" title="លេខសម្ងាត់ត្រូវបាន Encrypted">🔑 [Encrypted]</div>'}
        </td>
        <td>
          <span class="badge-level">${escapeHtml(s.courseLevel || 'beginner')}</span>
        </td>
        <td>
          ${s.isSuperAdmin
            ? `<span class="badge badge-primary bg-gradient-to-r from-red-600 via-purple-600 to-amber-500 text-white font-bold text-[11px] px-2.5 py-1 rounded-full shadow-lg shadow-amber-500/20 inline-flex items-center gap-1">⚡ Super Admin</span><div class="text-[10px] text-amber-300 font-semibold mt-0.5">ម្ចាស់ប្រព័ន្ធ / គ្មានដែនកំណត់</div>`
            : (s.isLifetime
              ? `<span class="badge badge-warning bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-full shadow-md inline-flex items-center gap-1">👑 VIP Lifetime</span><div class="text-[10px] text-amber-300 font-semibold mt-0.5">ពេញមួយជីវិត (អចិន្ត្រៃយ៍)</div>`
              : (isVip 
                ? `<span class="badge-vip">💎 ${escapeHtml(s.plan || 'VIP')} (${s.daysRemaining} ថ្ងៃ)</span><div class="text-[10px] text-slate-400 mt-0.5">ផុត: ${escapeHtml(s.expireDateFormatted)}</div>` 
                : `<span class="badge-free">⚪ Free</span>`
              )
            )
          }
        </td>
        <td>
          <div class="text-xs text-white">📚 ${s.completedLessonsCount || 0} មេរៀន</div>
          <div class="text-[11px] text-purple-400 font-semibold">📜 ${s.certificatesCount || 0} វិញ្ញាបនបត្រ</div>
        </td>
        <td class="text-xs text-slate-300 max-w-xs truncate" title="${escapeHtml(s.notes || '')}">
          ${s.isBlocked ? '<span class="text-red-400 font-bold">🚫 បានចាក់សោ</span> ' : ''}
          ${escapeHtml(s.notes || '-')}
        </td>
        <td class="text-right">
          <div class="inline-flex items-center gap-1.5">
            <button class="btn btn-outline btn-xs" onclick="openAdminEditStudentModal('${escapeHtml(s.id)}')" title="កែប្រែ / គ្រប់គ្រង">
              <span>✏️ កែប្រែ</span>
            </button>
            <button class="btn btn-gold btn-xs font-bold" onclick="quickGrantVipPrompt('${escapeHtml(s.id)}')" title="ដំឡើង VIP">
              <span>💎 VIP</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function handleAdminStudentSearch() {
  if (STATE.adminData.searchDebounceTimer) clearTimeout(STATE.adminData.searchDebounceTimer);
  STATE.adminData.searchDebounceTimer = setTimeout(() => {
    loadAdminStudents();
  }, 350);
}

function handleAdminStudentFilter() {
  loadAdminStudents();
}

// 3. Create Student by Phone Number
async function handleAdminCreateStudentByPhone(e) {
  if (e && e.preventDefault) e.preventDefault();

  const phoneInput = document.getElementById('admNewStudentPhone');
  const nameInput = document.getElementById('admNewStudentName');
  const passwordInput = document.getElementById('admNewStudentPassword');
  const levelInput = document.getElementById('admNewStudentLevel');
  const planInput = document.getElementById('admNewStudentPlan');
  const notesInput = document.getElementById('admNewStudentNotes');
  const submitBtn = document.getElementById('admCreateStudentSubmitBtn');

  const phone = phoneInput?.value?.trim();
  const name = nameInput?.value?.trim();
  const password = passwordInput?.value?.trim();
  const courseLevel = levelInput?.value || 'beginner';
  const vipPlan = planInput?.value || '1m';
  const notes = notesInput?.value?.trim() || '';

  if (!phone || !name || !password) {
    showToast('⚠️ សូមបញ្ចូលលេខទូរស័ព្ទ, ឈ្មោះសិស្ស និងលេខសម្ងាត់ឱ្យបានត្រឹមត្រូវ!', 'warning');
    return;
  }
  
  if (password.length < 4) {
    showToast('⚠️ លេខសម្ងាត់ត្រូវមានយ៉ាងតិច ៤ ខ្ទង់!', 'warning');
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⏳ កំពុងបង្កើតគណនី...</span>`;
  }

  try {
    const adminId = getAdminId();
    const res = await fetch('/api/admin/students/create-by-phone', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId, phone, name, password, courseLevel, vipPlan, notes })
    });

    const data = await res.json();
    if (data.success && data.student) {
      showToast('🎉 បានបង្កើតគណនីសិស្ស និងបង្កើតកូដចូលរៀនជោគជ័យ!', 'success', 4000);

      // Open Invitation Modal
      openAdminInviteModal(data.student, data.inviteMessage);

      // Reset form
      if (phoneInput) phoneInput.value = '';
      if (nameInput) nameInput.value = '';
      if (passwordInput) passwordInput.value = '';
      if (notesInput) notesInput.value = '';

      // Reload directory & overview
      loadAdminDashboardData();
    } else {
      showToast(`❌ បរាជ័យ៖ ${data.error || 'Server error'}`, 'error', 4500);
    }
  } catch (err) {
    console.error('Create student error:', err);
    showToast('❌ មានបញ្ហាក្នុងការតភ្ជាប់ម៉ាស៊ីនបម្រើ', 'error');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>⚡ បង្កើតគណនី និងបង្កើតកូដចូលរៀន (Create Account)</span>`;
    }
  }
}

function openAdminInviteModal(student, inviteMessage) {
  const modal = document.getElementById('adminInviteModal');
  const elName = document.getElementById('inviteModalStudentName');
  const elPhone = document.getElementById('inviteModalStudentPhone');
  const elCode = document.getElementById('inviteModalLoginCode');
  const elMsg = document.getElementById('inviteModalMessageText');

  if (elName) elName.textContent = student.name;
  if (elPhone) elPhone.textContent = `លេខទូរស័ព្ទ: ${student.phone} (ID: ${student.id})`;
  if (elCode) elCode.textContent = student.loginCode;
  if (elMsg) elMsg.value = inviteMessage || '';

  if (modal) modal.classList.remove('hidden');
}

function copyInviteMessageText(btn) {
  const msgInput = document.getElementById('inviteModalMessageText');
  if (!msgInput) return;

  navigator.clipboard.writeText(msgInput.value).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = `<span>✓ បានចម្លងរួចរាល់!</span>`;
    setTimeout(() => { btn.innerHTML = orig; }, 2000);
    showToast('📋 បានចម្លងសារអញ្ជើញទៅ Clipboard រួចរាល់! អ្នកអាចផ្ញើជូនសិស្សតាម Telegram ឬ SMS ភ្លាមៗ', 'success', 4000);
  }).catch(() => {
    msgInput.select();
    document.execCommand('copy');
    showToast('📋 បានចម្លងសារអញ្ជើញរួចរាល់!', 'success');
  });
}

function shareInviteToTelegram() {
  const msgInput = document.getElementById('inviteModalMessageText');
  const text = msgInput ? msgInput.value : '';
  if (!text) return showToast('⚠️ គ្មានខ្លឹមសារសារសម្រាប់ផ្ញើឡើយ!', 'warning');
  
  const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(text)}`;
  window.open(tgUrl, '_blank');
}

function shareInviteToWhatsApp() {
  const msgInput = document.getElementById('inviteModalMessageText');
  const text = msgInput ? msgInput.value : '';
  const phoneEl = document.getElementById('inviteModalStudentPhone');
  let rawPhone = '';
  if (phoneEl) {
    const match = phoneEl.textContent.match(/0\d{7,10}/);
    if (match) rawPhone = match[0];
  }
  
  let formattedPhone = '';
  if (rawPhone) {
    formattedPhone = rawPhone.startsWith('0') ? '855' + rawPhone.slice(1) : rawPhone;
  }
  
  const waUrl = formattedPhone 
    ? `https://api.whatsapp.com/send?phone=${encodeURIComponent(formattedPhone)}&text=${encodeURIComponent(text)}`
    : `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
}

// 4. Edit Student Modal Handlers
function openAdminEditStudentModal(studentId) {
  const student = (STATE.adminData.students || []).find(s => s.id === studentId);
  if (!student) return;

  const modal = document.getElementById('adminStudentEditModal');
  const elId = document.getElementById('editStudentId');
  const elHeaderId = document.getElementById('editStudentHeaderId');
  const elHeaderName = document.getElementById('editStudentHeaderName');
  const elAvatarImg = document.getElementById('editStudentAvatarImg');
  const elAvatarInit = document.getElementById('editStudentAvatarInitial');
  const elVipBadge = document.getElementById('editStudentVipBadge');
  const elName = document.getElementById('editStudentName');
  const elKhmerName = document.getElementById('editStudentKhmerName');
  const elPhone = document.getElementById('editStudentPhone');
  const elLevel = document.getElementById('editStudentLevel');
  const elNotes = document.getElementById('editStudentNotes');
  const elBlocked = document.getElementById('editStudentBlockedCheck');

  if (elId) elId.value = student.id;
  if (elHeaderId) elHeaderId.textContent = `ID: ${student.id}`;
  if (elHeaderName) elHeaderName.textContent = student.name;
  const elTg = document.getElementById('editStudentTelegramName');
  if (elTg) {
    if (student.telegramFullName) {
      elTg.textContent = `✈️ Telegram: ${student.telegramFullName}`;
    } else if (student.telegramUsername) {
      elTg.textContent = `✈️ @${student.telegramUsername.replace('@', '')}`;
    } else {
      elTg.textContent = '';
    }
  }

  // Handle Photo Avatar or Initial
  if (student.photoUrl) {
    if (elAvatarImg) {
      elAvatarImg.src = student.photoUrl;
      elAvatarImg.classList.remove('hidden');
    }
    if (elAvatarInit) elAvatarInit.classList.add('hidden');
  } else {
    if (elAvatarImg) elAvatarImg.classList.add('hidden');
    if (elAvatarInit) {
      elAvatarInit.textContent = (student.name || 'S').charAt(0).toUpperCase();
      elAvatarInit.classList.remove('hidden');
    }
  }

  if (elVipBadge) {
    elVipBadge.innerHTML = student.isVIP
      ? `<span class="user-tier-badge vip">💎 VIP (${student.daysRemaining} ថ្ងៃ)</span>`
      : `<span class="user-tier-badge free">Free Account</span>`;
  }
  if (elName) elName.value = student.accountName || student.name || '';
  if (elKhmerName) elKhmerName.value = student.khmerName || '';
  if (elPhone) elPhone.value = student.phone || '';
  if (elLevel) elLevel.value = student.courseLevel || 'beginner';
  if (elNotes) elNotes.value = student.notes || '';
  if (elBlocked) elBlocked.checked = !!student.isBlocked;

  // Populate Login Credentials & Password
  const elLoginUser = document.getElementById('editStudentLoginUsername');
  const elCurPass = document.getElementById('editStudentCurrentPassword');
  const elNewPass = document.getElementById('editStudentNewPassword');

  if (elLoginUser) elLoginUser.value = student.loginUsername || student.username || student.phone || student.id;
  if (elCurPass) elCurPass.value = student.plainPassword || '•••••••• (Encrypted)';
  if (elNewPass) elNewPass.value = '';

  if (modal) modal.classList.remove('hidden');
}

function copyTextValue(elementId) {
  const el = document.getElementById(elementId);
  if (!el || !el.value) return showToast('⚠️ គ្មានព័ត៌មានសម្រាប់ចម្លងឡើយ!', 'warning');
  navigator.clipboard.writeText(el.value).then(() => {
    showToast(`📋 បានចម្លង៖ "${el.value}"`, 'success');
  }).catch(() => {
    el.select();
    document.execCommand('copy');
    showToast(`📋 បានចម្លង៖ "${el.value}"`, 'success');
  });
}

function generateRandomPasswordForEdit() {
  const randomPass = Math.floor(100000 + Math.random() * 900000).toString();
  const input = document.getElementById('editStudentNewPassword');
  if (input) {
    input.value = randomPass;
    input.focus();
    showToast(`🎲 បានបង្កើតលេខសម្ងាត់ចៃដន្យ៖ ${randomPass}`, 'info');
  }
}

async function handleAdminResetPasswordDirectly() {
  const studentId = document.getElementById('editStudentId')?.value;
  const newPassword = document.getElementById('editStudentNewPassword')?.value?.trim();
  const newUsername = document.getElementById('editStudentLoginUsername')?.value?.trim();

  if (!studentId) return showToast('❌ មិនមានព័ត៌មាន ID សិស្សឡើយ', 'error');
  if (!newPassword || newPassword.length < 4) {
    return showToast('❌ សូមបញ្ចូលលេខសម្ងាត់ថ្មីយ៉ាងតិច ៤ ខ្ទង់!', 'error');
  }

  try {
    const adminId = getAdminId();
    const res = await fetch('/api/admin/students/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId, studentId, newPassword, newUsername })
    });

    const data = await res.json();
    if (data.success) {
      showToast(`⚡ ${data.message}`, 'success', 4000);
      const curPass = document.getElementById('editStudentCurrentPassword');
      if (curPass) curPass.value = data.plainPassword;
      const newPassInput = document.getElementById('editStudentNewPassword');
      if (newPassInput) newPassInput.value = '';
      loadAdminStudents();
    } else {
      showToast(`❌ បរាជ័យ៖ ${data.error || 'Server error'}`, 'error');
    }
  } catch (err) {
    showToast('❌ មានបញ្ហាក្នុងការតភ្ជាប់', 'error');
  }
}

function copyStudentLoginInfoFromModal(btn) {
  const name = document.getElementById('editStudentName')?.value || document.getElementById('editStudentHeaderName')?.textContent || 'សិស្ស';
  const username = document.getElementById('editStudentLoginUsername')?.value || '';
  const currentPass = document.getElementById('editStudentCurrentPassword')?.value || '';
  const newPass = document.getElementById('editStudentNewPassword')?.value?.trim() || '';
  const effectivePass = newPass || (currentPass.includes('••') ? 'សូមទាក់ទងអេដមីនដើម្បីកំណត់លេខសម្ងាត់' : currentPass);

  const text = `🎓 ព័ត៌មានគណនីសិក្សា StudyAi Bot (SSOnline):\n` +
               `👤 ឈ្មោះសិស្ស៖ ${name}\n` +
               `🔑 ឈ្មោះចូលគណនី (Username/ID): ${username}\n` +
               `🔒 លេខសម្ងាត់ (Password): ${effectivePass}\n` +
               `🌐 ចូលរៀនលើវេបសាយ៖ ${window.location.origin}\n` +
               `👉 ចូលទៅកាន់វេបសាយ រួចចុច "🔑 Login" -> "ចូលគណនីធម្មតា (Standard Login)" រួចបញ្ចូល Username & Password ខាងលើជាការស្រេច!`;

  navigator.clipboard.writeText(text).then(() => {
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<span>✓ បានចម្លង!</span>';
      setTimeout(() => btn.innerHTML = orig, 2000);
    }
    showToast('📋 បានចម្លងព័ត៌មាន Login ពេញលេញរួចរាល់! អាចផ្ញើជូនសិស្សតាម Telegram/SMS ភ្លាមៗ', 'success', 4000);
  }).catch(() => {
    showToast('📋 បានចម្លងព័ត៌មាន Login!', 'success');
  });
}

async function handleSaveStudentInfoFromModal() {
  const studentId = document.getElementById('editStudentId')?.value;
  if (!studentId) return;

  const name = document.getElementById('editStudentName')?.value?.trim();
  const khmerName = document.getElementById('editStudentKhmerName')?.value?.trim();
  const phone = document.getElementById('editStudentPhone')?.value?.trim();
  const courseLevel = document.getElementById('editStudentLevel')?.value;
  const notes = document.getElementById('editStudentNotes')?.value?.trim();
  const isBlocked = !!document.getElementById('editStudentBlockedCheck')?.checked;
  const loginUsername = document.getElementById('editStudentLoginUsername')?.value?.trim();
  const newPassword = document.getElementById('editStudentNewPassword')?.value?.trim();

  try {
    const adminId = getAdminId();
    const res = await fetch('/api/admin/students/update-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId, studentId, name, khmerName, phone, courseLevel, notes, isBlocked, loginUsername, newPassword })
    });

    const data = await res.json();
    if (data.success) {
      showToast('💾 បានកែប្រែព័ត៌មានសិស្សដោយជោគជ័យ!', 'success');
      closeModal('adminStudentEditModal');
      loadAdminStudents();
    } else {
      showToast(`❌ បរាជ័យ៖ ${data.error || 'Server error'}`, 'error');
    }
  } catch (err) {
    showToast('❌ មានបញ្ហាក្នុងការតភ្ជាប់', 'error');
  }
}

async function handleDeleteStudentFromModal() {
  const studentId = document.getElementById('editStudentId')?.value;
  if (!studentId) return;

  if (!confirm(`⚠️ តើអ្នកពិតជាចង់លុបគណនីសិស្ស #${studentId} នេះមែនទេ? សកម្មភាពនេះមិនអាចត្រឡប់ក្រោយវិញបានឡើយ!`)) {
    return;
  }

  try {
    const adminId = getAdminId();
    const res = await fetch('/api/admin/students/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId, studentId })
    });

    const data = await res.json();
    if (data.success) {
      showToast(data.message || 'បានលុបគណនីសិស្សដោយជោគជ័យ!', 'info');
      closeModal('adminStudentEditModal');
      loadAdminStudents();
      loadAdminDashboardData();
    } else {
      showToast(`❌ បរាជ័យ៖ ${data.error || 'Server error'}`, 'error');
    }
  } catch (err) {
    showToast('❌ មានបញ្ហាក្នុងការតភ្ជាប់', 'error');
  }
}

async function handleAdminGrantVipFromEdit(duration) {
  const studentId = document.getElementById('editStudentId')?.value;
  if (!studentId) return;

  try {
    const adminId = getAdminId();
    const res = await fetch('/api/admin/students/update-vip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId, studentId, action: 'grant', duration })
    });

    const data = await res.json();
    if (data.success) {
      showToast(data.message || 'បានបន្ថែម VIP ជោគជ័យ!', 'success');
      closeModal('adminStudentEditModal');
      loadAdminStudents();
      loadAdminDashboardData();
    } else {
      showToast(`❌ ${data.error || 'បរាជ័យ'}`, 'error');
    }
  } catch (err) {
    showToast('❌ មានបញ្ហាក្នុងការតភ្ជាប់', 'error');
  }
}

async function handleAdminRevokeVipFromEdit() {
  const studentId = document.getElementById('editStudentId')?.value;
  if (!studentId) return;

  if (!confirm(`⚠️ តើអ្នកពិតជាចង់ដកហូត VIP របស់សិស្ស #${studentId} នេះមែនទេ?`)) return;

  try {
    const adminId = getAdminId();
    const res = await fetch('/api/admin/students/update-vip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId, studentId, action: 'revoke' })
    });

    const data = await res.json();
    if (data.success) {
      showToast(data.message || 'បានដកហូត VIP រួចរាល់!', 'info');
      closeModal('adminStudentEditModal');
      loadAdminStudents();
      loadAdminDashboardData();
    } else {
      showToast(`❌ ${data.error || 'បរាជ័យ'}`, 'error');
    }
  } catch (err) {
    showToast('❌ មានបញ្ហាក្នុងការតភ្ជាប់', 'error');
  }
}

function quickGrantVipPrompt(studentId) {
  openAdminEditStudentModal(studentId);
}

// 5. Direct VIP Tool
async function handleAdminDirectGrantVip() {
  const input = document.getElementById('admDirectUserId');
  const durSelect = document.getElementById('admDirectDuration');
  const rawId = input?.value?.trim();
  const duration = durSelect?.value || '1m';

  if (!rawId) {
    showToast('⚠️ សូមបញ្ចូល ID សិស្ស ឬលេខទូរស័ព្ទ!', 'warning');
    return;
  }

  // Format ID
  let targetId = rawId;
  if (/^0\d{7,10}$/.test(rawId)) {
    targetId = `p_${rawId}`;
  }

  try {
    const adminId = getAdminId();
    const res = await fetch('/api/admin/students/update-vip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId, studentId: targetId, action: 'grant', duration })
    });

    const data = await res.json();
    if (data.success) {
      showToast(data.message || 'បានបើក VIP ជូនសិស្សដោយជោគជ័យ!', 'success');
      if (input) input.value = '';
      loadAdminPayments();
      loadAdminDashboardData();
    } else {
      showToast(`❌ ${data.error || 'បរាជ័យ'}`, 'error');
    }
  } catch (err) {
    showToast('❌ មានបញ្ហាក្នុងការតភ្ជាប់', 'error');
  }
}

async function handleAdminDirectRevokeVip() {
  const input = document.getElementById('admDirectUserId');
  const rawId = input?.value?.trim();
  if (!rawId) return showToast('⚠️ សូមបញ្ចូល ID សិស្ស!', 'warning');

  let targetId = rawId;
  if (/^0\d{7,10}$/.test(rawId)) targetId = `p_${rawId}`;

  if (!confirm(`⚠️ តើអ្នកពិតជាចង់ដកហូត VIP របស់ #${targetId} មែនទេ?`)) return;

  try {
    const adminId = getAdminId();
    const res = await fetch('/api/admin/students/update-vip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId, studentId: targetId, action: 'revoke' })
    });

    const data = await res.json();
    if (data.success) {
      showToast('បានដកហូត VIP រួចរាល់!', 'info');
      loadAdminPayments();
      loadAdminDashboardData();
    } else {
      showToast(`❌ ${data.error || 'បរាជ័យ'}`, 'error');
    }
  } catch (err) {
    showToast('❌ មានបញ្ហាក្នុងការតភ្ជាប់', 'error');
  }
}

// 6. Payments & Submitted Receipts Management Loader
async function loadAdminPayments() {
  const tbodyPay = document.getElementById('admPaymentsTableBody');
  const tbodyRec = document.getElementById('admReceiptsTableBody');
  if (tbodyPay) tbodyPay.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-slate-400">កំពុងផ្ទុកទិន្នន័យបង់ប្រាក់...</td></tr>`;
  if (tbodyRec) tbodyRec.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-slate-400">កំពុងផ្ទុកបញ្ជីវិក្កយបត្រ...</td></tr>`;

  try {
    const adminId = getAdminId();
    const res = await fetch(`/api/admin/payments?adminId=${encodeURIComponent(adminId)}`);
    const data = await res.json();

    if (data.success) {
      if (Array.isArray(data.payments)) {
        STATE.adminData.payments = data.payments;
        renderAdminPaymentsTable(data.payments);
      }
      if (Array.isArray(data.receipts)) {
        STATE.adminData.receipts = data.receipts;
        renderAdminReceiptsTable(data.receipts);
      }
    }
  } catch (err) {
    console.error('Failed to load payments & receipts:', err);
    if (tbodyPay) tbodyPay.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-red-400">មានបញ្ហាក្នុងការផ្ទុកទិន្នន័យ</td></tr>`;
    if (tbodyRec) tbodyRec.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-red-400">មានបញ្ហាក្នុងការផ្ទុកវិក្កយបត្រ</td></tr>`;
  }
}

function renderAdminReceiptsTable(receipts) {
  const tbody = document.getElementById('admReceiptsTableBody');
  const badge = document.getElementById('admReceiptsPendingBadge');
  if (!tbody) return;

  const pendingCount = (receipts || []).filter(r => r.status === 'pending').length;
  if (badge) {
    badge.textContent = `${pendingCount} រង់ចាំពិនិត្យ`;
    badge.className = pendingCount > 0 ? 'badge badge-warning text-[10px]' : 'badge badge-neutral text-[10px]';
  }

  if (!receipts || receipts.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-slate-400">មិនទាន់មានវិក្កយបត្រដែលសិស្សផ្ញើមកទេ</td></tr>`;
    return;
  }

  const adminId = getAdminId();
  tbody.innerHTML = receipts.map(r => {
    const photoUrl = r.fileId ? `/api/admin/receipts/photo/${encodeURIComponent(r.fileId)}?adminId=${encodeURIComponent(adminId)}` : '/school_logo.png';
    const isPending = r.status === 'pending';
    const statusHtml = r.status === 'approved'
      ? `<span class="badge badge-success text-xs">✅ បានអនុម័ត (${escapeHtml(r.planGranted || 'VIP')})</span>`
      : (r.status === 'rejected' 
          ? `<span class="badge badge-danger text-xs">❌ បានបដិសេធ</span>`
          : `<span class="badge badge-warning text-xs">⏳ រង់ចាំពិនិត្យ</span>`);

    const studentInfo = `
      <div class="font-bold text-white text-sm">${escapeHtml(r.studentName || r.userId || 'N/A')}</div>
      ${r.telegramFullName && r.telegramFullName !== r.studentName ? `<div class="text-[11px] text-cyan-300">✈️ ${escapeHtml(r.telegramFullName)}</div>` : ''}
      <div class="text-[10px] text-slate-400 font-mono">ID: ${escapeHtml(r.userId || '')} ${r.studentPhone ? `| 📞 ${escapeHtml(r.studentPhone)}` : ''}</div>
    `;

    const actionsHtml = isPending ? `
      <div class="flex items-center justify-end gap-1.5 flex-wrap">
        <select id="receiptDur_${escapeHtml(r.id)}" class="form-input text-xs py-1 px-2 w-auto bg-slate-800 text-amber-300 border-slate-600">
          <option value="1m">1 ខែ</option>
          <option value="3m">3 ខែ</option>
          <option value="6m">6 ខែ</option>
          <option value="1y">1 ឆ្នាំ</option>
        </select>
        <button class="btn btn-gold btn-xs font-bold" onclick="const dur = document.getElementById('receiptDur_${escapeHtml(r.id)}').value; handleReceiptAction('${escapeHtml(r.id)}', '${escapeHtml(r.userId)}', 'approve', dur)">
          <span>✅ អនុម័ត</span>
        </button>
        <button class="btn btn-outline btn-xs text-red-400 hover:bg-red-500/20" onclick="if(confirm('បដិសេធវិក្កយបត្រនេះ?')) handleReceiptAction('${escapeHtml(r.id)}', '${escapeHtml(r.userId)}', 'reject')">
          <span>❌ បដិសេធ</span>
        </button>
      </div>
    ` : `
      <div class="text-right text-xs text-slate-400">
        ${r.approvedBy ? `ដោយ: ${escapeHtml(r.approvedBy)}` : (r.rejectedBy ? `ដោយ: ${escapeHtml(r.rejectedBy)}` : '-')}
      </div>
    `;

    return `
      <tr>
        <td class="text-xs text-slate-400 font-mono">${escapeHtml(r.dateFormatted || new Date(r.timestamp).toLocaleString())}</td>
        <td>${studentInfo}</td>
        <td>
          <div class="receipt-thumb-wrap" onclick="openReceiptLightbox('${escapeHtml(r.fileId || '')}', '${escapeHtml(r.id)}', '${escapeHtml(r.userId)}', '${escapeHtml(r.studentName || '')}', '${escapeHtml(r.dateFormatted || '')}', '${escapeHtml(r.status || 'pending')}')" title="ចុចដើម្បីពង្រីកមើល">
            <img src="${photoUrl}" class="receipt-thumb-img" alt="Receipt" onerror="this.src='/school_logo.png'">
            <div class="receipt-thumb-overlay">🔍</div>
          </div>
        </td>
        <td>${statusHtml}</td>
        <td class="text-right">${actionsHtml}</td>
      </tr>
    `;
  }).join('');
}

function openReceiptLightbox(fileId, receiptId, studentId, studentName, dateFormatted, status) {
  STATE.adminData.activeReceipt = { fileId, receiptId, studentId, studentName, dateFormatted, status };
  
  const elName = document.getElementById('lightboxStudentName');
  const elInfo = document.getElementById('lightboxStudentInfo');
  const elDate = document.getElementById('lightboxDate');
  const elImg = document.getElementById('lightboxImg');
  const elBadge = document.getElementById('lightboxStatusBadge');
  const elActionBox = document.getElementById('lightboxActionBox');

  if (elName) elName.textContent = studentName || 'សិស្សមិនស្គាល់';
  if (elInfo) elInfo.textContent = `ID: ${studentId}`;
  if (elDate) elDate.textContent = dateFormatted || '';
  if (elBadge) {
    if (status === 'approved') {
      elBadge.className = 'badge badge-sm badge-success';
      elBadge.textContent = '✅ បានអនុម័ត';
    } else if (status === 'rejected') {
      elBadge.className = 'badge badge-sm badge-danger';
      elBadge.textContent = '❌ បានបដិសេធ';
    } else {
      elBadge.className = 'badge badge-sm badge-warning';
      elBadge.textContent = '⏳ រង់ចាំពិនិត្យ';
    }
  }

  if (elImg) {
    const adminId = getAdminId();
    elImg.src = fileId ? `/api/admin/receipts/photo/${encodeURIComponent(fileId)}?adminId=${encodeURIComponent(adminId)}` : '/school_logo.png';
  }

  if (elActionBox) {
    elActionBox.style.display = status === 'pending' ? 'block' : 'none';
  }

  openModal('receiptLightboxModal');
}

async function handleLightboxApprove(duration) {
  const r = STATE.adminData.activeReceipt;
  if (!r) return;
  await handleReceiptAction(r.receiptId, r.studentId, 'approve', duration);
  closeModal('receiptLightboxModal');
}

async function handleLightboxReject() {
  const r = STATE.adminData.activeReceipt;
  if (!r) return;
  if (!confirm('⚠️ តើអ្នកពិតជាចង់បដិសេធវិក្កយបត្រនេះមែនទេ?')) return;
  await handleReceiptAction(r.receiptId, r.studentId, 'reject');
  closeModal('receiptLightboxModal');
}

async function handleReceiptAction(receiptId, studentId, action, duration) {
  try {
    const adminId = getAdminId();
    const res = await fetch('/api/admin/receipts/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId, receiptId, studentId, action, duration })
    });
    const data = await res.json();
    if (data.success) {
      showToast(data.message || 'ប្រតិបត្តិការជោគជ័យ!', 'success');
      loadAdminPayments();
      loadAdminDashboardData();
    } else {
      showToast(`❌ បរាជ័យ៖ ${data.error || 'Server error'}`, 'error');
    }
  } catch (err) {
    console.error('Receipt action failed:', err);
    showToast('❌ មានបញ្ហាក្នុងការតភ្ជាប់ម៉ាស៊ីនបម្រើ', 'error');
  }
}

function renderAdminPaymentsTable(payments) {
  const tbody = document.getElementById('admPaymentsTableBody');
  if (!tbody) return;

  if (payments.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-slate-400">មិនទាន់មានប្រវត្តិបង់ប្រាក់ឡើយ</td></tr>`;
    return;
  }

  tbody.innerHTML = payments.map(p => `
    <tr>
      <td class="text-xs text-slate-400 font-mono">${escapeHtml(p.dateFormatted || new Date(p.timestamp).toLocaleString())}</td>
      <td>
        <div class="font-bold text-white text-sm">${escapeHtml(p.studentName || p.userId || 'N/A')}</div>
        ${p.telegramFullName && p.telegramFullName !== p.studentName ? `<div class="text-[10px] text-cyan-300">✈️ ${escapeHtml(p.telegramFullName)}</div>` : ''}
        <div class="text-[10px] text-slate-500 font-mono">ID: ${escapeHtml(p.userId || '')}</div>
      </td>
      <td>
        <span class="badge-level">${escapeHtml(p.action || (p.licenseKey ? 'បញ្ចូល Key' : 'បង់ប្រាក់'))}</span>
      </td>
      <td class="text-amber-300 font-semibold font-mono">
        ${escapeHtml(p.durationLabel || (p.licenseKey ? p.licenseKey : (p.monthsAdded ? `${p.monthsAdded} ខែ` : 'VIP')))}
      </td>
      <td class="text-xs text-slate-400 font-mono">${escapeHtml(p.adminId || 'System')}</td>
    </tr>
  `).join('');
}

// 7. License Key Management Loader & Batch Generator
async function loadAdminLicenses() {
  const tbody = document.getElementById('admLicensesTableBody');
  if (tbody) tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-slate-400">កំពុងផ្ទុកបញ្ជី License Keys...</td></tr>`;

  try {
    const adminId = getAdminId();
    const res = await fetch(`/api/admin/licenses?adminId=${encodeURIComponent(adminId)}`);
    const data = await res.json();

    if (data.success && Array.isArray(data.licenses)) {
      STATE.adminData.licenses = data.licenses;
      renderAdminLicensesTable(data.licenses);
    }
  } catch (err) {
    console.error('Failed to load licenses:', err);
    if (tbody) tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-red-400">មានបញ្ហាក្នុងការផ្ទុកទិន្នន័យ</td></tr>`;
  }
}

function renderAdminLicensesTable(licenses) {
  const tbody = document.getElementById('admLicensesTableBody');
  if (!tbody) return;

  if (licenses.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-slate-400">មិនទាន់មាន License Keys ឡើយ</td></tr>`;
    return;
  }

  tbody.innerHTML = licenses.map(lic => {
    const isActive = lic.status === 'active';
    const isUsed = lic.status === 'used';

    return `
      <tr>
        <td class="font-mono font-bold text-amber-300 select-all">${escapeHtml(lic.key)}</td>
        <td><span class="badge-vip font-bold">${escapeHtml(lic.label || lic.durationStr)}</span></td>
        <td>
          ${isActive 
            ? '<span class="badge-vip bg-emerald-500/20 text-emerald-400 border-emerald-500/40">🟢 នៅទំនេរ (Active)</span>' 
            : (isUsed ? '<span class="badge-free">⚪ ប្រើប្រាស់រួច</span>' : '<span class="badge-free text-red-400">❌ Revoked</span>')
          }
        </td>
        <td class="text-xs text-slate-400">${escapeHtml(lic.createdDateFormatted || '-')}</td>
        <td class="font-mono text-xs text-slate-300">${escapeHtml(lic.usedBy || '-')}</td>
        <td class="text-xs text-slate-400 truncate max-w-[150px]">${escapeHtml(lic.note || '-')}</td>
        <td class="text-right">
          <button class="btn btn-outline btn-xs font-bold" onclick="copySingleLicenseKey('${escapeHtml(lic.key)}', this)">
            <span>📋 ចម្លង</span>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function copySingleLicenseKey(key, btn) {
  navigator.clipboard.writeText(key).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = `<span>✓</span>`;
    setTimeout(() => { btn.innerHTML = orig; }, 1500);
    showToast(`📋 បានចម្លង License Key: ${key}`, 'success');
  });
}

function openBatchKeyModal() {
  const modal = document.getElementById('adminBatchKeyModal');
  const box = document.getElementById('batchKeyOutputBox');
  if (box) box.classList.add('hidden');
  if (modal) modal.classList.remove('hidden');
}

async function handleAdminGenerateKeys(e) {
  if (e && e.preventDefault) e.preventDefault();

  const dur = document.getElementById('batchKeyDuration')?.value || '1y';
  const count = document.getElementById('batchKeyCount')?.value || 5;
  const note = document.getElementById('batchKeyNote')?.value?.trim() || '';
  const btn = document.getElementById('batchKeySubmitBtn');
  const outBox = document.getElementById('batchKeyOutputBox');
  const outText = document.getElementById('batchKeyOutputText');

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>⏳ កំពុងបង្កើត...</span>`;
  }

  try {
    const adminId = getAdminId();
    const res = await fetch('/api/admin/licenses/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId, duration: dur, count, note })
    });

    const data = await res.json();
    if (data.success && Array.isArray(data.keys)) {
      showToast(data.message || 'បានបង្កើត Keys ជោគជ័យ!', 'success');
      const keyStrings = data.keys.map(k => k.key).join('\n');
      if (outText) outText.value = keyStrings;
      if (outBox) outBox.classList.remove('hidden');

      loadAdminLicenses();
      loadAdminDashboardData();
    } else {
      showToast(`❌ បរាជ័យ៖ ${data.error || 'Server error'}`, 'error');
    }
  } catch (err) {
    showToast('❌ មានបញ្ហាក្នុងការតភ្ជាប់', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<span>⚡ បង្កើត Keys ភ្លាមៗ</span>`;
    }
  }
}

function copyBatchKeysText(btn) {
  const textEl = document.getElementById('batchKeyOutputText');
  if (!textEl) return;
  navigator.clipboard.writeText(textEl.value).then(() => {
    showToast('📋 បានចម្លង Keys ទាំងអស់ទៅ Clipboard!', 'success');
  });
}

// 8. School Info Management
async function loadAdminSchoolInfo() {
  try {
    const res = await fetch('/api/admin/school-info');
    const data = await res.json();

    if (data.success && data.schoolInfo) {
      const info = data.schoolInfo;
      STATE.adminData.schoolInfo = info;

      const elName = document.getElementById('admSchoolNameInput');
      const elDir = document.getElementById('admDirectorNameInput');
      const elPhone = document.getElementById('admSchoolPhoneInput');
      const elTg = document.getElementById('admTelegramContactInput');
      const elLoc = document.getElementById('admLocationInput');
      const elTag = document.getElementById('admTaglineInput');
      const elNotice = document.getElementById('admBannerNoticeInput');
      const elNoticeCheck = document.getElementById('admEnableNoticeCheck');

      if (elName) elName.value = info.schoolName || '';
      if (elDir) elDir.value = info.directorName || '';
      if (elPhone) elPhone.value = info.phone || '';
      if (elTg) elTg.value = info.telegramContact || '';
      if (elLoc) elLoc.value = info.location || '';
      if (elTag) elTag.value = info.tagline || '';
      if (elNotice) elNotice.value = info.bannerNotice || '';
      if (elNoticeCheck) elNoticeCheck.checked = !!info.enableNotice;
    }
  } catch (err) {
    console.error('Failed to load school info:', err);
  }
}

async function handleAdminSaveSchoolInfo(e) {
  if (e && e.preventDefault) e.preventDefault();

  const schoolName = document.getElementById('admSchoolNameInput')?.value;
  const directorName = document.getElementById('admDirectorNameInput')?.value;
  const phone = document.getElementById('admSchoolPhoneInput')?.value;
  const telegramContact = document.getElementById('admTelegramContactInput')?.value;
  const location = document.getElementById('admLocationInput')?.value;
  const tagline = document.getElementById('admTaglineInput')?.value;
  const bannerNotice = document.getElementById('admBannerNoticeInput')?.value;
  const enableNotice = !!document.getElementById('admEnableNoticeCheck')?.checked;
  const btn = document.getElementById('admSaveSchoolInfoBtn');

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>⏳ កំពុងរក្សាទុក...</span>`;
  }

  try {
    const adminId = getAdminId();
    const res = await fetch('/api/admin/school-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        adminId,
        schoolName,
        directorName,
        phone,
        telegramContact,
        location,
        tagline,
        bannerNotice,
        enableNotice
      })
    });

    const data = await res.json();
    if (data.success) {
      showToast('💾 បានរក្សាទុកព័ត៌មានសាលារៀនជោគជ័យ!', 'success');
      const hdrTitle = document.getElementById('adminHeaderSchoolName');
      if (hdrTitle && schoolName) hdrTitle.textContent = schoolName;
    } else {
      showToast(`❌ បរាជ័យ៖ ${data.error || 'Server error'}`, 'error');
    }
  } catch (err) {
    showToast('❌ មានបញ្ហាក្នុងការតភ្ជាប់', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<span>💾 រក្សាទុកព័ត៌មានសាលារៀន (Save School Settings)</span>`;
    }
  }
}

// 9. Broadcast Announcement
async function handleAdminSendBroadcast(e) {
  if (e && e.preventDefault) e.preventDefault();

  const titleInput = document.getElementById('admBroadcastTitle');
  const msgInput = document.getElementById('admBroadcastMessage');
  const tgCheck = document.getElementById('admBroadcastTelegramCheck');
  const btn = document.getElementById('admBroadcastSubmitBtn');

  const title = titleInput?.value?.trim();
  const message = msgInput?.value?.trim();
  const sendTelegram = !!tgCheck?.checked;

  if (!title || !message) {
    showToast('⚠️ សូមបំពេញចំណងជើង និងខ្លឹមសារសេចក្តីប្រកាស!', 'warning');
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>⏳ កំពុងផ្សព្វផ្សាយដំណឹង...</span>`;
  }

  try {
    const adminId = getAdminId();
    const res = await fetch('/api/admin/broadcast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId, title, message, sendTelegram })
    });

    const data = await res.json();
    if (data.success) {
      showToast(`📢 ${data.message || 'បានផ្សព្វផ្សាយដំណឹងជោគជ័យ!'}`, 'success', 5000);
      if (titleInput) titleInput.value = '';
      if (msgInput) msgInput.value = '';
    } else {
      showToast(`❌ បរាជ័យ៖ ${data.error || 'Server error'}`, 'error');
    }
  } catch (err) {
    showToast('❌ មានបញ្ហាក្នុងការតភ្ជាប់', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<span>📢 ចុចផ្សាយដំណឹងជាផ្លូវការ (Send Broadcast)</span>`;
    }
  }
}

