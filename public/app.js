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
  allVerbsData: {}
};

// ==========================================
// 1. INITIALIZATION & TELEGRAM WEBAPP
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
  initTelegramWebApp();
  initFirebaseClient();
  loadSavedUserSession();
  await loadCurriculum();
  await loadVerbsData();
  setupEventListeners();

  if (STATE.currentUser) {
    refreshUserProfile();
  }
});

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
  const userVipStatusBadge = document.getElementById('userVipStatusBadge');
  const syncBanner = document.getElementById('syncNoticeBanner');

  if (STATE.currentUser) {
    if (authActions) authActions.style.display = 'none';
    if (userBadge) userBadge.classList.remove('hidden');

    const name = STATE.currentUser.name || STATE.currentUser.username || 'Student';
    if (userNameDisplay) userNameDisplay.textContent = name;
    if (userAvatarChar) userAvatarChar.textContent = name.charAt(0).toUpperCase();

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

    if (STATE.currentUser.isTelegram && syncBanner) {
      syncBanner.style.display = 'none';
    }
  } else {
    if (authActions) authActions.style.display = 'flex';
    if (userBadge) userBadge.classList.add('hidden');
    if (syncBanner) syncBanner.style.display = 'flex';
  }
}

async function refreshUserProfile() {
  if (!STATE.currentUser || !STATE.currentUser.id) return;
  try {
    const res = await fetch(`/api/user/profile/${STATE.currentUser.id}`);
    const data = await res.json();
    if (data.success && data.profile) {
      const p = data.profile;
      STATE.currentUser.isVIP = p.isVIP;
      STATE.currentUser.vipDetails = p.vipDetails;
      STATE.currentUser.completedLessons = p.completedLessons;
      STATE.currentUser.subjectCerts = p.subjectCerts;

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

  // Tab-specific hooks
  if (tabName === 'curriculum') {
    renderCurriculumWeeks();
  } else if (tabName === 'annual-exams') {
    loadAnnualExams();
  } else if (tabName === 'certificates') {
    loadUserCertificates();
  } else if (tabName === 'verbs') {
    renderVerbsTable();
  }
}

// ==========================================
// 3. CURRICULUM & LESSONS VIEW
// ==========================================

async function loadCurriculum() {
  try {
    const res = await fetch('/api/curriculum');
    const data = await res.json();
    if (data.success && data.months) {
      STATE.curriculum = data.months;
      renderMonthsTabs();
    }
  } catch (e) {
    console.error('Failed to load curriculum:', e);
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

  container.innerHTML = currentMonth.weeks.map(w => `
    <div class="week-card glass-panel">
      <div class="week-header">
        <div class="week-title">📅 ${w.title} (${w.lessons.length} មេរៀន)</div>
      </div>
      <div class="lessons-grid">
        ${w.lessons.map(l => {
          const key = `${currentMonth.id}-${w.id}-${l.id}`;
          const isComp = !!completed[key];
          const grade = isComp ? completed[key].grade || 'A' : null;
          return `
            <div class="lesson-item-card ${isComp ? 'completed' : ''}" onclick="openLesson('${currentMonth.id}', '${w.id}', '${l.id}')">
              <div class="l-info">
                <div class="l-title">${l.title}</div>
                <div class="l-status">${isComp ? `✅ ជាប់និទ្ទេស ${grade}` : '📖 ចុចដើម្បីរៀន'}</div>
              </div>
              <div class="l-icon">${isComp ? '🏆' : '➡️'}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');
}

async function openLesson(monthId, weekId, lessonId) {
  try {
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
    document.getElementById('lessonContentText').textContent = data.lesson.content;

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

    // Reset Chat drawer with initial greeting
    const chatBox = document.getElementById('chatMessagesBox');
    if (chatBox) {
      chatBox.innerHTML = `
        <div class="chat-bubble ai">
          សួស្តីប្អូន! ខ្ញុំគឺគ្រូសន (Teacher Sorn)។ ប្អូនកំពុងរៀនមេរៀន <strong>"${data.lesson.title}"</strong>។ តើប្អូនមានចម្ងល់ ឬចង់ឱ្យគ្រូជួយពន្យល់អ្វីបន្ថែមទេ?
        </div>
      `;
    }

    navigateTo('lesson');
  } catch (err) {
    showToast('បរាជ័យក្នុងការបើកមេរៀន', 'error');
  }
}

function goToNextLesson() {
  if (!STATE.currentLesson) return;
  const { monthId, weekId, lessonId } = STATE.currentLesson;

  const mIdx = STATE.curriculum.findIndex(m => m.id === monthId);
  if (mIdx === -1) return;
  const month = STATE.curriculum[mIdx];

  const wIdx = month.weeks.findIndex(w => w.id === weekId);
  if (wIdx === -1) return;
  const week = month.weeks[wIdx];

  const lIdx = week.lessons.findIndex(l => l.id === lessonId);
  if (lIdx === -1) return;

  // Next in same week
  if (lIdx + 1 < week.lessons.length) {
    openLesson(monthId, weekId, week.lessons[lIdx + 1].id);
    return;
  }
  // Next week
  if (wIdx + 1 < month.weeks.length) {
    const nextW = month.weeks[wIdx + 1];
    openLesson(monthId, nextW.id, nextW.lessons[0].id);
    return;
  }
  // Next month
  if (mIdx + 1 < STATE.curriculum.length) {
    const nextM = STATE.curriculum[mIdx + 1];
    openLesson(nextM.id, nextM.weeks[0].id, nextM.weeks[0].lessons[0].id);
    return;
  }

  showToast('🎉 អបអរសាទរ! អ្នកបានរៀនដល់មេរៀនចុងក្រោយនៃកម្មវិធីសិក្សាហើយ!', 'success');
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
      body: JSON.stringify({ text: STATE.currentLesson.content, lang: 'en' })
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
// 5. AI TUTOR CHAT DRAWER
// ==========================================

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
        lessonTitle: STATE.currentLesson?.title || 'General English'
      })
    });

    const data = await res.json();
    thinkBubble.innerHTML = (data.reply || 'សូមអភ័យទោស ខ្ញុំមិនអាចឆ្លើយបានទេ។').replace(/\n/g, '<br>');
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

  gradeCircle.textContent = result.grade;
  gradeTitle.textContent = result.gradeTitle || `និទ្ទេស ${result.grade}`;
  scoreText.textContent = `${result.score} / ${result.total} ពិន្ទុ (${result.percent}%)`;

  if (result.isPassed) {
    gradeCircle.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
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
    gradeCircle.style.background = 'linear-gradient(135deg, #f43f5e, #e11d48)';
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
      const typeLabel = isAnnual ? '🎓 ប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ' : '📚 បញ្ចប់មេរៀនជោគជ័យ';
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

  tbody.innerHTML = flatList.map(v => `
    <tr>
      <td><strong style="color: #38bdf8;">${v.v1}</strong></td>
      <td>${v.v2}</td>
      <td>${v.v3}</td>
      <td><span style="color: #cbd5e1;">${v.kh}</span></td>
      <td>
        <button class="btn btn-xs btn-outline" onclick="playSingleWordAudio('${v.v1}')">🔊</button>
      </td>
    </tr>
  `).join('');
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

async function playSingleWordAudio(word) {
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: word, lang: 'en' })
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
  } catch (e) {
    console.error(e);
  }
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
  openModal('syncModal');
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
  const nameTxt = document.getElementById('profNameText');
  const unameTxt = document.getElementById('profUsernameText');
  const gmailTxt = document.getElementById('profGmailText');
  const tgTxt = document.getElementById('profTelegramStatus');
  const vipTxt = document.getElementById('profVipStatus');
  const fBadge = document.getElementById('profFirebaseStatusBadge');
  const vBtn = document.getElementById('profVerifyEmailBtn');

  if (avatar) avatar.textContent = name.charAt(0).toUpperCase();
  if (nameTxt) nameTxt.textContent = name;
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

    container.innerHTML = data.devices.map(dev => {
      const isCur = dev.isCurrent;
      const lastActiveDate = dev.lastActive
        ? new Date(dev.lastActive).toLocaleDateString('km-KH', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        : 'ថ្មីៗ';

      return `
        <div class="device-item-card ${isCur ? 'current' : ''}">
          <div class="device-info-left">
            <div class="device-name-title">
              💻 ${dev.deviceName || 'Web Browser'}
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
            <span class="text-xs text-emerald-400 font-semibold">សកម្ម</span>
          `}
        </div>
      `;
    }).join('');
  } catch (err) {
    container.innerHTML = '<div class="text-xs text-rose-400 text-center py-2">ផ្ទុកបញ្ជីឧបករណ៍មិនបានជោគជ័យ</div>';
  }
}

async function revokeDevice(targetDeviceId) {
  if (!STATE.currentUser || !targetDeviceId) return;
  if (!confirm('តើអ្នកពិតជាចង់ផ្តាច់គណនីចេញពីឧបករណ៍នោះមែនទេ?')) return;

  try {
    showToast('⏳ កំពុងផ្តាច់ឧបករណ៍...', 'info');
    const res = await fetch('/api/auth/revoke-device', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: STATE.currentUser.id,
        targetDeviceId
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
// GOOGLE 1-CLICK AUTHENTICATION
// ------------------------------------------

async function handleGoogleSignIn() {
  try {
    showToast('⏳ កំពុងដំណើរការ Google Sign-In...', 'info');

    // 1. Check if Firebase Web SDK is available and configured
    if (window.firebase && window.firebase.auth) {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        const result = await firebase.auth().signInWithPopup(provider);
        const gUser = result.user;
        if (gUser && gUser.email) {
          return await sendGoogleAuthToServer({
            email: gUser.email,
            name: gUser.displayName || gUser.email.split('@')[0],
            photoUrl: gUser.photoURL || '',
            googleId: gUser.uid
          });
        }
      } catch (fbErr) {
        console.warn('Firebase popup attempt note:', fbErr.message);
      }
    }

    // 2. Direct seamless Gmail input prompt
    const promptGmail = prompt('សូមបញ្ចូលអាសយដ្ឋាន Gmail (@gmail.com) របស់អ្នកដើម្បីចូល/ចុះឈ្មោះដោយស្វ័យប្រវត្ត៖');
    if (!promptGmail) return;

    const cleanGmail = promptGmail.trim().toLowerCase();
    if (!cleanGmail.endsWith('@gmail.com')) {
      return showToast('❌ តម្រូវឱ្យប្រើប្រាស់គណនី Gmail (@gmail.com) ប៉ុណ្ណោះ!', 'error');
    }

    await sendGoogleAuthToServer({
      email: cleanGmail,
      name: cleanGmail.split('@')[0],
      googleId: 'g_' + Math.random().toString(36).substring(2, 10)
    });
  } catch (err) {
    showToast(err.message || 'មានបញ្ហាក្នុងការផ្ទៀងផ្ទាត់ Google', 'error');
  }
}

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
  showToast(`🎉 ស្វាគមន៍ ${data.user.name}! ចូលគណនី Google (Gmail) ជោគជ័យ`, 'success');
  refreshUserProfile();
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
    STATE.pendingVerifyCode = data.previewCode || null;

    closeModal('registerModal');
    openVerifyEmailModal(gmail, data.previewCode, null);
    showToast(`✅ ${data.message || 'បានផ្ញើលេខកូដ ៦ ខ្ទង់ទៅ Gmail!'}`, 'success');
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
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function openVerifyEmailModal(gmail, verificationCode, verificationLink) {
  STATE.pendingVerifyEmail = gmail;
  STATE.pendingVerifyCode = verificationCode;
  STATE.pendingVerifyLink = verificationLink;

  const emailDisp = document.getElementById('verifyEmailDisplay');
  if (emailDisp) emailDisp.textContent = gmail;

  const codeInput = document.getElementById('verifyOtpCodeInput');
  if (codeInput) {
    codeInput.value = '';
    setTimeout(() => codeInput.focus(), 300);
  }

  const hintBox = document.getElementById('verifyCodeDemoHint');
  const codeVal = document.getElementById('verifyCodeDemoVal');
  if (hintBox && codeVal) {
    if (verificationCode) {
      hintBox.classList.remove('hidden');
      codeVal.textContent = verificationCode;
    } else {
      hintBox.classList.add('hidden');
    }
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
      openVerifyEmailModal(STATE.currentUser.gmail, data.previewCode, null);
    })
    .catch(() => {
      openVerifyEmailModal(STATE.currentUser.gmail, null, null);
    });
}

function autoFillVerifyCode() {
  if (STATE.pendingVerifyCode) {
    const input = document.getElementById('verifyOtpCodeInput');
    if (input) input.value = STATE.pendingVerifyCode;
  }
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

    showToast('✅ លេខកូដ OTP ថ្មីត្រូវបានផ្ញើទៅ Gmail!', 'success');
    if (data.previewCode) {
      STATE.pendingVerifyCode = data.previewCode;
      const hintBox = document.getElementById('verifyCodeDemoHint');
      const codeVal = document.getElementById('verifyCodeDemoVal');
      if (hintBox && codeVal) {
        hintBox.classList.remove('hidden');
        codeVal.textContent = data.previewCode;
      }
    }
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
    STATE.pendingLoginOtp = data.previewCode || null;

    // Toggle form to verify OTP form
    const emailForm = document.getElementById('emailOtpLoginForm');
    const verifyForm = document.getElementById('verifyLoginOtpForm');
    if (emailForm) emailForm.classList.add('hidden');
    if (verifyForm) verifyForm.classList.remove('hidden');

    const hintBox = document.getElementById('loginOtpPreviewHint');
    const previewVal = document.getElementById('loginOtpPreviewVal');
    if (hintBox && previewVal) {
      if (data.previewCode) {
        hintBox.classList.remove('hidden');
        previewVal.textContent = data.previewCode;
        const otpInput = document.getElementById('loginOtpCodeInput');
        if (otpInput) otpInput.value = data.previewCode;
      } else {
        hintBox.classList.add('hidden');
      }
    }

    showToast(`✅ ${data.message || 'បានផ្ញើលេខកូដ OTP ទៅ Gmail!'}`, 'success');
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
    const res = await fetch('/api/auth/telegram-web-token', { method: 'POST' });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'បង្កើតតំណមិនបាន');

    window.open(data.botUrl, '_blank');
    showToast('🤖 សូមចុច START លើ Telegram Bot ដើម្បី Login ស្វ័យប្រវត្ត...', 'info');

    // Poll for login status
    const token = data.token;
    const startTime = Date.now();
    const pollInterval = setInterval(async () => {
      if (Date.now() - startTime > 120000 || STATE.currentUser) {
        clearInterval(pollInterval);
        return;
      }
      try {
        const pollRes = await fetch(`/api/auth/telegram-web-token/status?token=${encodeURIComponent(token)}&deviceId=${encodeURIComponent(getOrCreateDeviceId())}`);
        const pollData = await pollRes.json();
        if (pollData.verified && pollData.user) {
          clearInterval(pollInterval);
          setCurrentUser(pollData.user, pollData.sessionToken, pollData.deviceId);
          closeModal('loginModal');
          showToast(`🎉 ស្វាគមន៍ ${pollData.user.name}! ចូលគណនីជោគជ័យ`, 'success');
          refreshUserProfile();
        }
      } catch (e) {}
    }, 2500);
  } catch (err) {
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
