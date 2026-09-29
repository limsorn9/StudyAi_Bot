/**
 * Certificate Generator & Progression Helper for StudyAi_Bot
 * Generates official A4 Landscape certificates with QR Code verification,
 * Issued by School Director Lim Sorn and Class Instructor TeacherSornAiBot.
 */

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

/**
 * Format Grade Title
 */
function getGradeTitle(grade) {
  switch (grade) {
    case 'A': return 'ល្អប្រសើរណាស់ (Outstanding - 90-100%)';
    case 'B': return 'ល្អណាស់ (Very Good - 80-89%)';
    case 'C': return 'ល្អ (Good - 70-79%)';
    case 'D': return 'មធ្យម (Fair - 60-69%)';
    default: return 'ខ្សោយ (Needs Improvement)';
  }
}

/**
 * Generate Telegram Markdown Certificate Card
 */
function generateCertificateCard(data) {
  const { studentName, userId, grade, score, total, percent, dateStr, certId, isAnnualExam } = data;
  const certTitle = data.title || data.lessonTitle || 'ភាសាអង់គ្លេស';
  const gradeTitle = getGradeTitle(grade);
  const examType = isAnnualExam ? '🏆 ការប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ' : '📚 ការប្រឡងបញ្ចប់មេរៀន';
  const certType = isAnnualExam ? 'វិញ្ញាបនបត្របញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ' : 'វិញ្ញាបនបត្របញ្ចប់មេរៀនជោគជ័យ';

  const baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.BASE_URL || '';
  const verifyWebUrl = baseUrl ? `${baseUrl}/cert/${certId}` : null;
  const verifyTgUrl = `https://t.me/TeacherSornAiBot?start=verify_${certId}`;

  return (
    `╔════════════════════════════════════════════╗\n` +
    `   🎓 *វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline* 🎓\n` +
    `        *TEACHER SSONLINE ENGLISH INSTITUTE*\n` +
    `╚════════════════════════════════════════════╝\n\n` +
    `📜 *${certType}*\n` +
    `*(CERTIFICATE OF ACHIEVEMENT & COMPLETION)*\n\n` +
    `វិទ្យាស្ថានសូមបញ្ជាក់ដោយមោទនភាពថា សិស្សានុសិស្ស៖\n\n` +
    `👤 ឈ្មោះ៖ *${studentName}* (ID: \`${userId}\`)\n\n` +
    `បានប្រឡងបញ្ចប់ដោយជោគជ័យលើ៖\n` +
    `${examType}៖\n` +
    `🎯 *"${certTitle}"*\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `🏆 និទ្ទេសសម្រេចបាន៖ *ថ្នាក់ ${grade}* (${gradeTitle})\n` +
    `🎯 ពិន្ទុប្រឡង៖ *${score} / ${total}* (${percent}%)\n` +
    `📅 កាលបរិច្ឆេទចេញ៖ *${dateStr}*\n` +
    `📜 លេខកូដសម្គាល់៖ \`CERT-${certId}\`\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `👨‍🏫 *គ្រូបន្ទុកថ្នាក់ (Instructor):* TeacherSornAiBot\n` +
    `👨‍💼 *នាយកសាលារៀន (School Director):* លីម សន (Lim Sorn)\n` +
    (verifyWebUrl ? `🌐 *មើលតាម Web:* ${verifyWebUrl}\n` : '') +
    `📱 *ផ្ទៀងផ្ទាត់ QR Code:* \`${verifyTgUrl}\``
  );
}

/**
 * Generate Luxurious Printable A4 Landscape HTML Certificate Document
 */
async function generateCertificateHTML(data) {
  const { studentName, userId, grade, score, total, percent, dateStr, certId, isAnnualExam } = data;
  const certTitle = data.title || data.lessonTitle || 'ភាសាអង់គ្លេស';
  const gradeTitle = getGradeTitle(grade);
  const certHeading = isAnnualExam ? 'វិញ្ញាបនបត្របញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ' : 'វិញ្ញាបនបត្របញ្ចប់មេរៀនជោគជ័យ';
  const certSubheading = isAnnualExam ? 'ANNUAL SUBJECT FINAL EXAMINATION CERTIFICATE' : 'CERTIFICATE OF ACHIEVEMENT & COMPLETION';

  const baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.BASE_URL || '';
  const verifyWebUrl = baseUrl ? `${baseUrl}/cert/${certId}` : null;
  const verifyTgUrl = `https://t.me/TeacherSornAiBot?start=verify_${certId}`;
  const verifyUrl = data.verifyUrl || verifyWebUrl || verifyTgUrl;

  // Generate QR Code Data URL
  let qrDataUrl = '';
  try {
    qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      margin: 1,
      width: 140,
      color: {
        dark: '#1e3a8a',
        light: '#ffffff'
      }
    });
  } catch (err) {
    console.error("QR Code Error:", err);
  }

  // Load School Logo Base64
  let schoolLogoDataUrl = '';
  try {
    const logoFile = path.join(__dirname, 'public', 'school_logo.png');
    if (fs.existsSync(logoFile)) {
      const b64 = fs.readFileSync(logoFile).toString('base64');
      schoolLogoDataUrl = `data:image/png;base64,${b64}`;
    }
  } catch (err) {
    console.error("School Logo Load Error:", err);
  }

  // Load School Stamp Base64 (ត្រាសាលារៀន ពណ៌ក្រហមផ្លូវការ)
  let schoolStampDataUrl = '';
  try {
    const stampFile = path.join(__dirname, 'public', 'school_stamp.png');
    if (fs.existsSync(stampFile)) {
      const b64 = fs.readFileSync(stampFile).toString('base64');
      schoolStampDataUrl = `data:image/png;base64,${b64}`;
    }
  } catch (err) {
    console.error("School Stamp Load Error:", err);
  }

  return `<!DOCTYPE html>
<html lang="km">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Certificate - ${studentName} - Teacher SSOnline</title>
  <link rel="icon" type="image/png" href="${schoolLogoDataUrl || '/school_logo.png'}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Battambang:wght@400;700;900&family=Cinzel:wght@600;800;900&family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Moul&display=swap" rel="stylesheet">
  <style>
    @page {
      size: 297mm 210mm;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background: #0f172a;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      font-family: 'Battambang', sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .no-print {
      margin-bottom: 15px;
      display: flex;
      gap: 15px;
    }
    .print-btn {
      background: linear-gradient(135deg, #c5a059 0%, #9c7a36 100%);
      color: #fff;
      border: none;
      padding: 12px 28px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 15px;
      font-weight: bold;
      font-family: 'Battambang', sans-serif;
      box-shadow: 0 4px 12px rgba(197, 160, 89, 0.4);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .print-btn:hover {
      background: linear-gradient(135deg, #d4af66 0%, #ad8841 100%);
    }

    /* A4 Landscape Ratio: 297mm x 210mm (~ 1050px x 742px) */
    .cert-wrapper {
      width: 1060px;
      height: 750px;
      background: #ffffff;
      padding: 24px;
      position: relative;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
      border-radius: 6px;
      overflow: hidden;
    }
    .outer-border {
      border: 8px solid #c5a059;
      height: 100%;
      padding: 10px;
      position: relative;
      background: radial-gradient(circle at center, #ffffff 0%, #faf8f2 100%);
    }
    .inner-border {
      border: 2px solid #1e3a8a;
      height: 100%;
      padding: 25px 40px;
      text-align: center;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Corner Ornaments */
    .corner-ornament {
      position: absolute;
      width: 45px;
      height: 45px;
      border: 3px solid #c5a059;
    }
    .top-left { top: -2px; left: -2px; border-right: none; border-bottom: none; }
    .top-right { top: -2px; right: -2px; border-left: none; border-bottom: none; }
    .bottom-left { bottom: -2px; left: -2px; border-right: none; border-top: none; }
    .bottom-right { bottom: -2px; right: -2px; border-left: none; border-top: none; }

    /* Watermark */
    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-10deg);
      font-size: 110px;
      opacity: 0.035;
      font-family: 'Cinzel', serif;
      font-weight: 900;
      color: #1e3a8a;
      user-select: none;
      pointer-events: none;
      white-space: nowrap;
    }

    /* Top Section */
    .cert-header-logo-row {
      display: flex;
      justify-content: center;
      margin-bottom: 2px;
    }
    .cert-header-logo {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      object-fit: contain;
      box-shadow: 0 2px 8px rgba(197, 160, 89, 0.4);
    }
    .academy-header {
      font-family: 'Moul', cursive;
      font-size: 21px;
      color: #1e3a8a;
      letter-spacing: 0.5px;
      margin-bottom: 2px;
    }
    .sub-academy {
      font-family: 'Cinzel', serif;
      font-size: 12px;
      letter-spacing: 2.5px;
      color: #c5a059;
      font-weight: 800;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .cert-title-kh {
      font-family: 'Moul', cursive;
      font-size: 26px;
      color: #c5a059;
      margin-bottom: 2px;
      text-shadow: 0 1px 2px rgba(0,0,0,0.08);
    }
    .cert-title-en {
      font-family: 'Cinzel', serif;
      font-size: 15px;
      font-weight: 900;
      color: #334155;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .presented-text {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 15px;
      color: #64748b;
      margin-bottom: 6px;
    }
    .student-name {
      font-size: 32px;
      font-weight: 900;
      color: #0f172a;
      display: inline-block;
      padding: 0 35px 4px 35px;
      border-bottom: 2px solid #c5a059;
      margin-bottom: 10px;
      font-family: 'Battambang', sans-serif;
    }
    .statement {
      font-size: 14.5px;
      line-height: 1.6;
      color: #334155;
      max-width: 800px;
      margin: 0 auto 12px auto;
    }
    .subject-highlight {
      font-weight: 800;
      color: #1e3a8a;
      font-size: 16px;
    }

    /* Badges */
    .badge-box {
      display: flex;
      justify-content: center;
      gap: 25px;
      margin-bottom: 10px;
    }
    .badge-item {
      background: #ffffff;
      border: 1px solid #e2d3b3;
      padding: 6px 20px;
      border-radius: 6px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.04);
      min-width: 140px;
    }
    .badge-title {
      font-size: 11px;
      color: #64748b;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .badge-value {
      font-size: 18px;
      font-weight: 800;
      color: #1e3a8a;
      font-family: 'Cinzel', serif;
    }

    /* Bottom Signatures & Seal Section */
    .footer-signatures {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      margin-top: 5px;
    }
    .sig-col {
      width: 240px;
      text-align: center;
    }
    .director-sig-col {
      position: relative;
    }
    .sig-stamp-container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .official-red-stamp {
      position: absolute;
      width: 104px;
      height: 104px;
      top: -38px;
      right: 22px;
      object-fit: contain;
      pointer-events: none;
      opacity: 0.94;
      transform: rotate(-6deg);
      filter: drop-shadow(0 2px 4px rgba(185, 28, 28, 0.25));
      mix-blend-mode: multiply;
      z-index: 2;
    }
    .sig-name {
      font-family: 'Playfair Display', serif;
      font-size: 22px;
      font-style: italic;
      color: #1e3a8a;
      margin-bottom: 4px;
      font-weight: 700;
      position: relative;
      z-index: 1;
    }
    .sig-title {
      border-top: 1.5px solid #94a3b8;
      padding-top: 5px;
      font-size: 12.5px;
      color: #334155;
      font-weight: 800;
    }
    .sig-sub {
      font-size: 11px;
      color: #64748b;
    }

    /* Center QR & Seal Block */
    .center-verify-block {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .qr-box {
      background: #ffffff;
      padding: 6px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    }
    .qr-box img {
      display: block;
      width: 82px;
      height: 82px;
    }
    .qr-text {
      font-size: 9px;
      font-weight: 900;
      color: #1e3a8a;
      margin-top: 3px;
      letter-spacing: 0.5px;
    }

    .seal-logo-wrap {
      width: 82px;
      height: 82px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cert-official-seal-img {
      width: 82px;
      height: 82px;
      border-radius: 50%;
      object-fit: contain;
      box-shadow: 0 4px 14px rgba(197, 160, 89, 0.4);
      border: 2px solid #c5a059;
      background: #fff;
    }

    .bottom-meta {
      font-size: 10px;
      color: #94a3b8;
      letter-spacing: 1px;
      margin-top: 4px;
    }

    @media print {
      body {
        background: none;
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
      .cert-wrapper {
        width: 297mm;
        height: 210mm;
        box-shadow: none;
        border-radius: 0;
        padding: 12mm;
      }
    }
  </style>
</head>
<body>
  <div class="no-print" style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-bottom: 20px;">
    <button class="print-btn" onclick="window.print()">🖨️ បោះពុម្ពទម្រង់ A4 ផ្តេក (Print / Save as PDF)</button>
    <a href="${verifyTgUrl}" target="_blank" style="text-decoration:none;"><button class="print-btn" style="background:#0284c7;">🤖 ផ្ទៀងផ្ទាត់លើ Telegram</button></a>
  </div>

  <div class="cert-wrapper">
    <div class="outer-border">
      <div class="inner-border">
        <div class="corner-ornament top-left"></div>
        <div class="corner-ornament top-right"></div>
        <div class="corner-ornament bottom-left"></div>
        <div class="corner-ornament bottom-right"></div>
        <div class="watermark">TEACHER SSONLINE</div>

        <!-- Header -->
        <div>
          <div class="cert-header-logo-row">
            <img src="${schoolLogoDataUrl || '/school_logo.png'}" alt="Teacher SSOnline Logo" class="cert-header-logo" />
          </div>
          <div class="academy-header">វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline</div>
          <div class="sub-academy">Teacher SSOnline English Institute • Automated Academy</div>

          <div class="cert-title-kh">${certHeading}</div>
          <div class="cert-title-en">${certSubheading}</div>

          <div class="presented-text">វិញ្ញាបនបត្រនេះត្រូវបានប្រគល់ជូនដោយមោទនភាពចំពោះ៖</div>
          <div class="student-name">${studentName}</div>

          <div class="statement">
            បានខិតខំប្រឹងប្រែងសិក្សា និងប្រឡងបញ្ចប់ដោយជោគជ័យនូវ${isAnnualExam ? 'មុខវិជ្ជា' : 'មេរៀន'}៖<br>
            <span class="subject-highlight">"${certTitle}"</span><br>
            ដែលបង្ហាញពីសមត្ថភាពដ៏ប្រសើរ ការយល់ដឹងច្បាស់លាស់ និងការតស៊ូប្រកបដោយមោទនភាព។
          </div>

          <!-- Badges -->
          <div class="badge-box">
            <div class="badge-item">
              <div class="badge-title">និទ្ទេស (GRADE)</div>
              <div class="badge-value">ថ្នាក់ ${grade}</div>
            </div>
            <div class="badge-item">
              <div class="badge-title">ពិន្ទុ (SCORE)</div>
              <div class="badge-value">${score} / ${total}</div>
            </div>
            <div class="badge-item">
              <div class="badge-title">ភាគរយ (PERCENT)</div>
              <div class="badge-value">${percent}%</div>
            </div>
            <div class="badge-item">
              <div class="badge-title">កាលបរិច្ឆេទ (DATE)</div>
              <div class="badge-value" style="font-size:14px; margin-top:2px;">${dateStr}</div>
            </div>
          </div>
        </div>

        <!-- Signatures & Verification Section -->
        <div>
          <div class="footer-signatures">
            <!-- Left: Class Instructor -->
            <div class="sig-col">
              <div class="sig-name">TeacherSornAiBot</div>
              <div class="sig-title">គ្រូបន្ទុកថ្នាក់ (Class Instructor)</div>
              <div class="sig-sub">Teacher Sorn AI System</div>
            </div>

            <!-- Center: Verified QR & Official Seal -->
            <div class="center-verify-block">
              <div class="qr-box">
                ${qrDataUrl ? `<img src="${qrDataUrl}" alt="QR Verified" />` : ''}
                <div class="qr-text">SCAN TO VERIFY</div>
              </div>

              <div class="seal-logo-wrap">
                <img src="${schoolLogoDataUrl || '/school_logo.png'}" alt="Official School Seal" class="cert-official-seal-img" />
              </div>
            </div>

            <!-- Right: School Director with Official Red Stamp (ត្រាសាលារៀន) -->
            <div class="sig-col director-sig-col">
              <div class="sig-stamp-container">
                <img src="${schoolStampDataUrl || '/school_stamp.png'}" alt="ត្រាសាលារៀន" class="official-red-stamp" />
                <div class="sig-name">លីម សន</div>
              </div>
              <div class="sig-title">នាយកសាលារៀន (School Director)</div>
              <div class="sig-sub">Director: Lim Sorn</div>
            </div>
          </div>

          <div class="bottom-meta">
            លេខកូដវិញ្ញាបនបត្រ៖ CERT-${certId} | ID សិស្ស៖ ${userId} | ស្កេន QR Code ដើម្បីផ្ទៀងផ្ទាត់លើ Telegram
          </div>
        </div>

      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Find the next lesson in sequence from the curriculum
 */
function findNextLesson(curriculum, currentMonthId, currentWeekId, currentLessonId) {
  if (!curriculum || !curriculum.months) return null;

  const months = curriculum.months;
  const mIdx = months.findIndex(m => m.id === currentMonthId);
  if (mIdx === -1) return null;

  const currentMonth = months[mIdx];
  const wIdx = currentMonth.weeks.findIndex(w => w.id === currentWeekId);
  if (wIdx === -1) return null;

  const currentWeek = currentMonth.weeks[wIdx];
  const lIdx = currentWeek.lessons.findIndex(l => l.id === currentLessonId);
  if (lIdx === -1) return null;

  // 1. Next lesson in same week
  if (lIdx + 1 < currentWeek.lessons.length) {
    const nextL = currentWeek.lessons[lIdx + 1];
    return {
      monthId: currentMonthId,
      weekId: currentWeekId,
      lessonId: nextL.id,
      lessonTitle: nextL.title,
      isEnd: false
    };
  }

  // 2. First lesson in next week (same month)
  if (wIdx + 1 < currentMonth.weeks.length) {
    const nextW = currentMonth.weeks[wIdx + 1];
    if (nextW.lessons && nextW.lessons.length > 0) {
      const nextL = nextW.lessons[0];
      return {
        monthId: currentMonthId,
        weekId: nextW.id,
        lessonId: nextL.id,
        lessonTitle: nextL.title,
        isEnd: false
      };
    }
  }

  // 3. First lesson in next month
  if (mIdx + 1 < months.length) {
    const nextM = months[mIdx + 1];
    if (nextM.weeks && nextM.weeks.length > 0 && nextM.weeks[0].lessons && nextM.weeks[0].lessons.length > 0) {
      const nextL = nextM.weeks[0].lessons[0];
      return {
        monthId: nextM.id,
        weekId: nextM.weeks[0].id,
        lessonId: nextL.id,
        lessonTitle: nextL.title,
        isEnd: false
      };
    }
  }

  // End of curriculum
  return {
    isEnd: true
  };
}

module.exports = {
  getGradeTitle,
  generateCertificateCard,
  generateCertificateHTML,
  findNextLesson
};
