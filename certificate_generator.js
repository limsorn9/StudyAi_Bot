/**
 * Certificate Generator & Progression Helper for StudyAi_Bot
 * Official A4 Portrait Certificate – Khmer Style with Golden Border
 * Issued by: School Director Lim Sorn | Instructor: TeacherSornAiBot
 * Teacher SSOnline English Language Institute – Est. 2024
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
    default:  return 'ខ្សោយ (Needs Improvement)';
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
 * Generate Official A4 Portrait HTML Certificate (Khmer Golden Border Style)
 */
async function generateCertificateHTML(data) {
  const { studentName, userId, grade, score, total, percent, dateStr, certId, isAnnualExam } = data;
  const certTitle = data.title || data.lessonTitle || 'ភាសាអង់គ្លេស';
  const gradeTitle = getGradeTitle(grade);
  const certSubheading = isAnnualExam
    ? 'ANNUAL SUBJECT FINAL EXAMINATION CERTIFICATE'
    : 'CERTIFICATE OF ACHIEVEMENT & COMPLETION';

  const baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.BASE_URL || '';
  const verifyWebUrl = baseUrl ? `${baseUrl}/cert/${certId}` : null;
  const verifyTgUrl = `https://t.me/TeacherSornAiBot?start=verify_${certId}`;
  const verifyUrl = data.verifyUrl || verifyWebUrl || verifyTgUrl;

  // QR Code
  let qrDataUrl = '';
  try {
    qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      margin: 1, width: 140,
      color: { dark: '#1e3a8a', light: '#ffffff' }
    });
  } catch (err) { console.error('QR Code Error:', err); }

  // School Logo
  let schoolLogoDataUrl = '';
  try {
    const f = path.join(__dirname, 'public', 'school_logo.png');
    if (fs.existsSync(f)) schoolLogoDataUrl = `data:image/png;base64,${fs.readFileSync(f).toString('base64')}`;
  } catch (err) { console.error('Logo Error:', err); }

  // School Stamp
  let schoolStampDataUrl = '';
  try {
    const f = path.join(__dirname, 'public', 'school_stamp.png');
    if (fs.existsSync(f)) schoolStampDataUrl = `data:image/png;base64,${fs.readFileSync(f).toString('base64')}`;
  } catch (err) { console.error('Stamp Error:', err); }

  // Director Signature
  let directorSigDataUrl = '';
  try {
    const f = path.join(__dirname, 'public', 'director_signature.jpg');
    if (fs.existsSync(f)) directorSigDataUrl = `data:image/jpeg;base64,${fs.readFileSync(f).toString('base64')}`;
  } catch (err) { console.error('Signature Error:', err); }

  // Khmer date & number helper
  const toKhmerNum = (num) => {
    const khDigits = ['០','១','២','៣','៤','៥','៦','៧','៨','៩'];
    return String(num).replace(/[0-9]/g, d => khDigits[d]);
  };
  const now = new Date();
  const khMonths = ['មករា','កុម្ភៈ','មីនា','មេសា','ឧសភា','មិថុនា','កក្កដា','សីហា','កញ្ញា','តុលា','វិច្ឆិកា','ធ្នូ'];
  const khDateStr = `ថ្ងៃទី ${toKhmerNum(now.getDate())} ខែ${khMonths[now.getMonth()]} ឆ្នាំ${toKhmerNum(now.getFullYear())}`;

  // Only ONE official stamp is used in the entire certificate, placed on the left & slightly above the director's signature
  const logoTag   = schoolLogoDataUrl  ? `<img src="${schoolLogoDataUrl}"  alt="Logo"  class="hdr-logo" />`  : '';
  const wmTag     = schoolLogoDataUrl  ? `<img src="${schoolLogoDataUrl}"  alt=""      class="wm-logo" />`   : '';
  const qrTag     = qrDataUrl          ? `<div class="qr-frame"><img src="${qrDataUrl}" alt="QR"/></div>`   : '';
  const sigTag    = directorSigDataUrl ? `<img src="${directorSigDataUrl}" alt="Director Signature" class="sig-director" />` : '<div style="height:60px;"></div>';
  const stampOvr  = schoolStampDataUrl ? `<img src="${schoolStampDataUrl}" alt="Official Stamp" class="stamp-official" />` : '';

  return `<!DOCTYPE html>
<html lang="km">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Certificate – ${studentName} – Teacher SSOnline</title>
  <link rel="icon" type="image/png" href="${schoolLogoDataUrl || '/school_logo.png'}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Battambang:wght@400;700;900&family=Moul&family=Cinzel:wght@600;800;900&family=Playfair+Display:ital,wght@0,600;1,400&display=swap" rel="stylesheet">
  <style>
    @page { size: 210mm 297mm; margin: 0; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #1a1a2e;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      font-family: 'Battambang', sans-serif;
    }
    .no-print { margin-bottom: 16px; display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
    .print-btn {
      background: linear-gradient(135deg, #c5a059, #9c7a36);
      color: #fff; border: none; padding: 10px 24px; border-radius: 6px;
      cursor: pointer; font-size: 14px; font-weight: bold;
      font-family: 'Battambang', sans-serif;
      box-shadow: 0 4px 12px rgba(197,160,89,0.4);
    }

    /* ========== A4 PORTRAIT 794x1123 ========== */
    .cert-wrapper {
      width: 794px;
      min-height: 1123px;
      background: #ffffff;
      position: relative;
      box-shadow: 0 20px 60px rgba(0,0,0,0.25);
      box-sizing: border-box;
      padding: 18px;
    }

    /* Clean, classic, elegant double border (No striped gradient) */
    .cert-frame-outer {
      border: 2px solid #b8860b;
      padding: 6px;
      min-height: calc(1123px - 36px);
      box-sizing: border-box;
      background: transparent;
      position: relative;
      z-index: 1;
    }
    .cert-frame-inner {
      border: 1px solid #8b1c1c;
      padding: 20px 24px;
      min-height: calc(1123px - 52px);
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: column;
      background: transparent;
    }
    /* Logo in background: 2x size (660px), centered on A4, transparent background */
    .wm-logo {
      position: absolute; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 660px; height: 660px; object-fit: contain;
      opacity: 0.10; mix-blend-mode: multiply;
      pointer-events: none; z-index: 0;
    }

    /* -------- HEADER -------- */
    .hdr {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 2px; position: relative; z-index: 1;
    }
    /* Logo in header: 2x size (140px), transparent background */
    .hdr-logo-box {
      width: 145px; display: flex; align-items: center; justify-content: flex-start;
    }
    .hdr-logo {
      width: 140px; height: 140px;
      object-fit: contain; border-radius: 50%;
      filter: drop-shadow(0 3px 10px rgba(0,0,0,0.18));
    }
    .hdr-spacer { width: 145px; } /* Empty balancer - ONLY 1 stamp on whole certificate */
    .hdr-center { flex: 1; text-align: center; padding: 0 10px; }
    .kingdom-box { margin-bottom: 3px; }
    .kingdom-title {
      font-family: 'Moul', cursive; font-size: 15px;
      color: #0f172a; line-height: 1.4; letter-spacing: 0.5px;
    }
    .kingdom-motto {
      font-family: 'Moul', cursive; font-size: 13px;
      color: #0f172a; line-height: 1.4;
    }
    .hdr-kbach { color: #c5a059; font-size: 12px; letter-spacing: 3px; margin: 2px 0; }
    .hdr-name-kh {
      font-family: 'Moul', cursive; font-size: 14.5px;
      color: #8b1c1c; line-height: 1.4;
    }
    .hdr-name-en {
      font-family: 'Cinzel', serif; font-size: 10px;
      color: #1e3a8a; letter-spacing: 1.8px; font-weight: 800;
    }

    /* -------- DIVIDER -------- */
    .orn-div {
      display: flex; align-items: center; justify-content: center; gap: 10px;
      margin: 6px 0; position: relative; z-index: 1;
    }
    .orn-bar { flex: 1; height: 2px; max-width: 180px;
      background: linear-gradient(90deg, transparent, #c5a059, #8b1c1c, #c5a059, transparent); }
    .orn-sym { color: #c5a059; font-size: 14px; }

    /* -------- MAIN TITLE -------- */
    .main-title { text-align: center; position: relative; z-index: 1; margin: 4px 0 2px 0; }
    .title-kh {
      font-family: 'Moul', cursive; font-size: 42px; color: #c0000b;
      display: block; text-shadow: 1px 1px 2px rgba(0,0,0,0.12);
      letter-spacing: 1px;
    }
    .title-en {
      font-family: 'Cinzel', serif; font-size: 11px; font-weight: 900;
      color: #1e3a8a; letter-spacing: 2.2px; text-transform: uppercase;
      margin-top: 2px;
    }

    /* -------- BODY -------- */
    .cert-body { text-align: center; position: relative; z-index: 1; flex: 1; margin-top: 10px; }
    .cert-line-1 {
      font-family: 'Khmer OS Muol Light', 'Khmer OS Moul Light', 'Moul', cursive;
      font-size: 17px;
      font-weight: normal;
      color: #1e3a8a;
      line-height: 1.6;
      margin-bottom: 6px;
      letter-spacing: 0.3px;
    }
    .cert-line-2 {
      font-family: 'Khmer OS Muol Light', 'Khmer OS Moul Light', 'Moul', cursive;
      font-size: 16px;
      font-weight: normal;
      color: #0f172a;
      line-height: 1.6;
      margin-bottom: 12px;
      letter-spacing: 0.3px;
    }
    .stu-name {
      display: inline-block;
      font-family: 'Khmer OS Muol Light', 'Khmer OS Moul Light', 'Moul', 'Battambang', sans-serif;
      font-size: 34px;
      font-weight: bold;
      color: #0f172a;
      border-bottom: 2.5px solid #c5a059;
      padding: 0 40px 6px 40px;
      margin-bottom: 14px;
    }
    .achieve { font-size: 14px; color: #334155; line-height: 1.9; }
    .subj-red { font-size: 18px; font-weight: 900; color: #8b1c1c; }
    .official-decree-note {
      font-size: 13px; color: #475569; margin-top: 6px; font-weight: 600;
    }


    /* -------- FOOTER -------- */
    .cert-footer { position: relative; z-index: 1; margin-top: 10px; }
    .footer-row {
      display: flex; justify-content: space-between; align-items: flex-end;
    }

    /* QR Col (Left) */
    .qr-col {
      display: flex; flex-direction: column; gap: 3px; width: 140px;
    }
    .qr-frame {
      background: #fff; border: 2px solid #c5a059; border-radius: 6px;
      padding: 5px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: inline-block;
      width: fit-content;
    }
    .qr-frame img { display: block; width: 88px; height: 88px; }
    .qr-badge { font-size: 8.5px; color: #8b1c1c; font-weight: 900; letter-spacing: 0.8px; margin-top: 2px; }
    .qr-id { font-size: 8.5px; color: #0f172a; font-weight: 700; }
    .qr-sub { font-size: 8px; color: #64748b; }

    /* Center Note */
    .footer-center {
      flex: 1; text-align: center; padding: 0 10px 10px 10px;
      display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
    }
    .cert-legal-text {
      font-size: 11px; color: #475569; line-height: 1.6; font-style: italic;
    }
    .cert-code-pill {
      margin-top: 6px; font-size: 9px; color: #8b1c1c; font-weight: 800;
      background: rgba(139,28,28,0.06); padding: 3px 10px; border-radius: 12px;
      border: 1px solid rgba(139,28,28,0.15);
    }

    /* Director Block (Right) - Authentic Cambodian administrative stamp & signature */
    .dir-block {
      width: 350px; text-align: center;
      display: flex; flex-direction: column; align-items: center;
      position: relative;
    }
    .dir-date-khmer {
      font-size: 12px; color: #334155; line-height: 1.5; margin-bottom: 2px;
      text-align: center;
    }
    .dir-role-kh {
      font-family: 'Khmer OS Muol Light', 'Khmer OS Moul Light', 'Moul', cursive;
      font-size: 13.5px; color: #0f172a;
      margin-bottom: 4px;
    }
    /* Signature and Stamp Container */
    .sig-stamp-container {
      position: relative;
      width: 340px;
      height: 160px;
      margin: 0 auto;
    }
    /* Official stamp: DOUBLE SIZE (220px), on the LEFT, shifted UP, 100% transparent background */
    .stamp-official {
      position: absolute;
      left: -12px;
      top: -30px; /* ខិតលើបន្តិច */
      width: 220px; /* ធំជាងនឹងគុណនឹងពីរ! */
      height: 220px;
      object-fit: contain;
      transform: rotate(-6deg);
      z-index: 2;
      filter: drop-shadow(0 2px 6px rgba(185,28,28,0.3));
      pointer-events: none;
    }
    /* Director Signature: on the RIGHT */
    .sig-director {
      position: absolute;
      right: 12px;
      bottom: 15px;
      width: 185px;
      height: 95px;
      object-fit: contain;
      mix-blend-mode: multiply;
      z-index: 1;
    }
    .dir-name-underline {
      width: 210px;
      border-top: 1.5px solid #94a3b8;
      margin-top: 4px;
      padding-top: 4px;
    }
    .dir-name-kh {
      font-family: 'Khmer OS Muol Light', 'Khmer OS Moul Light', 'Moul', cursive;
      font-size: 14.5px; color: #0f172a;
    }
    .dir-name-en {
      font-size: 10.5px; color: #64748b; font-weight: 700;
    }

    @media print {
      body { background: none; padding: 0; }
      .no-print { display: none !important; }
      .cert-wrapper { width: 210mm; min-height: 297mm; box-shadow: none; }
    }
  </style>
</head>
<body>

  <div class="no-print">
    <button class="print-btn" onclick="window.print()">🖨️ បោះពុម្ព / Save PDF (A4 ឈរ)</button>
    <a href="${verifyTgUrl}" target="_blank" style="text-decoration:none;">
      <button class="print-btn" style="background:linear-gradient(135deg,#0369a1,#0284c7);">
        📱 ផ្ទៀងផ្ទាត់ Telegram
      </button>
    </a>
  </div>

  <div class="cert-wrapper">
    ${wmTag}
    <div class="cert-frame-outer">
      <div class="cert-frame-inner">

        <!-- HEADER (Only Logo on Left, Center Kingdom & Institute, Right Balanced Spacer - NO STAMP) -->
        <div class="hdr">
          <div class="hdr-logo-box">${logoTag}</div>
          <div class="hdr-center">
            <div class="kingdom-box">
              <div class="kingdom-title">ព្រះរាជាណាចក្រកម្ពុជា</div>
              <div class="kingdom-motto">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
            </div>
            <div class="hdr-kbach">❖ · ✦ · ❖</div>
            <div class="hdr-name-kh">វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline</div>
            <div class="hdr-name-en">TEACHER SSONLINE ENGLISH LANGUAGE INSTITUTE</div>
          </div>
          <div class="hdr-spacer"></div>
        </div>

        <div class="orn-div"><div class="orn-bar"></div><span class="orn-sym">✦</span><div class="orn-bar"></div></div>

        <!-- MAIN TITLE -->
        <div class="main-title">
          <span class="title-kh">វិញ្ញាបនបត្រ</span>
          <div class="title-en">${certSubheading}</div>
        </div>

        <div class="orn-div"><div class="orn-bar"></div><span class="orn-sym">❖</span><div class="orn-bar"></div></div>

        <!-- BODY: 2 lines with FONT KHMER OS MOULIGHT -->
        <div class="cert-body">
          <div class="cert-line-1">វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline</div>
          <div class="cert-line-2">សូមប្រគល់ជូនសិស្សឈ្មោះ</div>
          <div class="stu-name">${studentName}</div>
          <p class="achieve">
            បានប្រឡងបញ្ចប់ដោយជោគជ័យ${isAnnualExam ? 'នូវការប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ' : 'នូវវគ្គបណ្តុះបណ្តាល'}<br>
            <span class="subj-red">「 ${certTitle} 」</span>
          </p>
          <p class="official-decree-note">
            វិញ្ញាបនបត្រនេះប្រគល់ជូនសាមីជនប្រើប្រាស់តាមការដែលអាចប្រើបាន។
          </p>
        </div>

        <!-- FOOTER: QR Left, Note Center, Director Sig + Single Big Stamp on Left Shifted Up -->
        <div class="cert-footer">
          <div class="footer-row">
            <!-- QR Left -->
            <div class="qr-col">
              ${qrTag}
              <div class="qr-badge">▶ SCAN TO VERIFY</div>
              <div class="qr-id">CERT-${certId}</div>
              <div class="qr-sub">Student ID: ${userId}</div>
            </div>

            <!-- Center note -->
            <div class="footer-center">
              <p class="cert-legal-text">
                វិញ្ញាបនបត្រផ្លូវការចេញដោយ<br>Teacher SSOnline English Institute
              </p>
              <div class="cert-code-pill">
                TMS-SSO-${now.getFullYear()}-${certId}
              </div>
            </div>

            <!-- Director Right: Date + Role + Container(Big Stamp Left Shifted Up + Sig Right) + Underline Name -->
            <div class="dir-block">
              <div class="dir-date-khmer">
                រាជធានីភ្នំពេញ ថ្ងៃទី ${toKhmerNum(now.getDate())} ខែ${khMonths[now.getMonth()]} ឆ្នាំ${toKhmerNum(now.getFullYear())}
              </div>
              <div class="dir-role-kh">នាយកវិទ្យាស្ថាន</div>

              <div class="sig-stamp-container">
                <!-- ONLY 1 STAMP: BIGGER (142px), on LEFT, shifted UP (top: -14px) overlapping signature -->
                ${stampOvr}
                <!-- Director Signature: on RIGHT -->
                ${sigTag}
              </div>

              <div class="dir-name-underline">
                <div class="dir-name-kh">លីម សន</div>
                <div class="dir-name-en">Lim Sorn (School Director)</div>
              </div>
            </div>
          </div>
        </div>

      </div><!-- /cert-frame-inner -->
    </div><!-- /cert-frame-outer -->
  </div><!-- /cert-wrapper -->
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
    return { monthId: currentMonthId, weekId: currentWeekId, lessonId: nextL.id, lessonTitle: nextL.title, isEnd: false };
  }

  // 2. First lesson in next week (same month)
  if (wIdx + 1 < currentMonth.weeks.length) {
    const nextW = currentMonth.weeks[wIdx + 1];
    if (nextW.lessons && nextW.lessons.length > 0) {
      const nextL = nextW.lessons[0];
      return { monthId: currentMonthId, weekId: nextW.id, lessonId: nextL.id, lessonTitle: nextL.title, isEnd: false };
    }
  }

  // 3. First lesson in next month
  if (mIdx + 1 < months.length) {
    const nextM = months[mIdx + 1];
    if (nextM.weeks && nextM.weeks.length > 0 && nextM.weeks[0].lessons && nextM.weeks[0].lessons.length > 0) {
      const nextL = nextM.weeks[0].lessons[0];
      return { monthId: nextM.id, weekId: nextM.weeks[0].id, lessonId: nextL.id, lessonTitle: nextL.title, isEnd: false };
    }
  }

  return { isEnd: true };
}

module.exports = {
  getGradeTitle,
  generateCertificateCard,
  generateCertificateHTML,
  findNextLesson
};
