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

  // Khmer date
  const now = new Date();
  const khMonths = ['មករា','កុម្ភៈ','មីនា','មេសា','ឧសភា','មិថុនា','កក្កដា','សីហា','កញ្ញា','តុលា','វិច្ឆិកា','ធ្នូ'];
  const khDateStr = `ថ្ងៃទី ${now.getDate()} ខែ${khMonths[now.getMonth()]} ឆ្នាំ${now.getFullYear()}`;

  const logoTag   = schoolLogoDataUrl  ? `<img src="${schoolLogoDataUrl}"  alt="Logo"  class="hdr-logo" />`  : '';
  const stampTag  = schoolStampDataUrl ? `<img src="${schoolStampDataUrl}" alt="Stamp" class="hdr-right" />` : '';
  const wmTag     = schoolLogoDataUrl  ? `<img src="${schoolLogoDataUrl}"  alt=""      class="wm-logo" />`   : '';
  const qrTag     = qrDataUrl          ? `<div class="qr-frame"><img src="${qrDataUrl}" alt="QR"/></div>`   : '';
  const sigTag    = directorSigDataUrl ? `<img src="${directorSigDataUrl}" alt="Signature" class="dir-sig-img" />` : '<div style="height:60px;"></div>';
  const stampOvr  = schoolStampDataUrl ? `<img src="${schoolStampDataUrl}" alt="Stamp" class="stamp-overlay" />` : '';

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
      background: #fffdf5;
      position: relative;
      box-shadow: 0 30px 80px rgba(0,0,0,0.7);
      overflow: hidden;
    }

    /* -------- GOLDEN BORDER -------- */
    .b-top, .b-bottom {
      position: absolute; left: 0; right: 0; height: 40px;
      background: repeating-linear-gradient(
        90deg,
        #c8860a 0px, #f5e24a 7px, #c8860a 14px,
        #8b1c1c 17px,
        #c8860a 20px, #f5e24a 27px, #c8860a 34px
      );
    }
    .b-top { top: 0; } .b-bottom { bottom: 0; }
    .b-left, .b-right {
      position: absolute; top: 0; bottom: 0; width: 40px;
      background: repeating-linear-gradient(
        180deg,
        #c8860a 0px, #f5e24a 7px, #c8860a 14px,
        #8b1c1c 17px,
        #c8860a 20px, #f5e24a 27px, #c8860a 34px
      );
    }
    .b-left { left: 0; } .b-right { right: 0; }
    .b-corner {
      position: absolute; width: 40px; height: 40px;
      background: linear-gradient(135deg, #d4a017, #f5e24a, #c8860a);
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; color: #6b0c0c; font-weight: 900; z-index: 5;
    }
    .b-corner.tl{top:0;left:0;} .b-corner.tr{top:0;right:0;}
    .b-corner.bl{bottom:0;left:0;} .b-corner.br{bottom:0;right:0;}
    /* Inner thin red line */
    .inner-red {
      position: absolute; top: 46px; left: 46px; right: 46px; bottom: 46px;
      border: 2px solid #8b1c1c; pointer-events: none; z-index: 2;
    }

    /* -------- CONTENT -------- */
    .cert-content {
      margin: 52px 54px;
      display: flex;
      flex-direction: column;
      min-height: calc(1123px - 104px);
      position: relative;
      z-index: 3;
    }
    .wm-logo {
      position: absolute; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 310px; height: 310px; object-fit: contain;
      opacity: 0.06; pointer-events: none; z-index: 0;
    }

    /* -------- HEADER -------- */
    .hdr {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 4px; position: relative; z-index: 1;
    }
    .hdr-logo, .hdr-right {
      width: 78px; height: 78px;
      object-fit: contain; border-radius: 50%;
    }
    .hdr-center { flex: 1; text-align: center; padding: 0 12px; }
    .hdr-name-kh {
      font-family: 'Moul', cursive; font-size: 15px;
      color: #8b1c1c; line-height: 1.6;
    }
    .hdr-name-en {
      font-family: 'Cinzel', serif; font-size: 10px;
      color: #1e3a8a; letter-spacing: 1.5px; font-weight: 800;
    }
    .hdr-dots { text-align: center; color: #c5a059; font-size: 12px; letter-spacing: 4px; margin: 3px 0; }

    /* -------- DIVIDER -------- */
    .orn-div {
      display: flex; align-items: center; gap: 8px;
      margin: 8px 0; position: relative; z-index: 1;
    }
    .orn-bar { flex: 1; height: 2px; max-width: 170px;
      background: linear-gradient(90deg, transparent, #c5a059, #8b1c1c, #c5a059, transparent); }
    .orn-sym { color: #c5a059; font-size: 14px; }

    /* -------- MAIN TITLE -------- */
    .main-title { text-align: center; position: relative; z-index: 1; margin: 6px 0; }
    .title-kh {
      font-family: 'Moul', cursive; font-size: 40px; color: #c0000b;
      display: block; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
    }
    .title-en {
      font-family: 'Cinzel', serif; font-size: 12px; font-weight: 900;
      color: #1e3a8a; letter-spacing: 2px; text-transform: uppercase;
    }

    /* -------- BODY -------- */
    .cert-body { text-align: center; position: relative; z-index: 1; flex: 1; margin-top: 8px; }
    .issuer  { font-size: 14px; color: #1e3a8a; font-weight: 700; margin-bottom: 4px; }
    .present { font-size: 13px; color: #555; margin-bottom: 8px; font-style: italic; }
    .name-lbl { font-size: 14px; color: #334155; margin-bottom: 4px; }
    .stu-name {
      display: inline-block;
      font-family: 'Battambang', sans-serif;
      font-size: 34px; font-weight: 900; color: #0f172a;
      border-bottom: 2.5px solid #c5a059;
      padding: 0 42px 5px 42px; margin-bottom: 14px;
    }
    .achieve { font-size: 14px; color: #334155; line-height: 2; }
    .subj-red { font-size: 18px; font-weight: 900; color: #8b1c1c; }
    .note { font-size: 12.5px; color: #64748b; margin-top: 6px; line-height: 1.7; }
    .date-small { font-size: 11.5px; color: #94a3b8; margin-top: 8px; }

    /* Grade boxes */
    .grade-row { display: flex; justify-content: center; gap: 14px; margin: 14px 0; }
    .g-box {
      background: linear-gradient(135deg, #fffdf5, #fef3d0);
      border: 1.5px solid #c5a059; border-radius: 8px;
      padding: 8px 18px; text-align: center; min-width: 110px;
      box-shadow: 0 2px 6px rgba(197,160,89,0.2);
    }
    .g-lbl { font-size: 9.5px; color: #64748b; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; }
    .g-val { font-size: 20px; font-weight: 900; color: #8b1c1c; font-family: 'Cinzel', serif; }
    .g-sub { font-size: 9.5px; color: #64748b; }

    /* -------- FOOTER -------- */
    .cert-footer { position: relative; z-index: 1; margin-top: 14px; }
    .footer-date { text-align: right; font-size: 13px; color: #334155; margin-bottom: 12px; }
    .sig-row { display: flex; justify-content: space-between; align-items: flex-end; }

    /* QR left */
    .qr-col { display: flex; flex-direction: column; gap: 4px; }
    .qr-frame {
      background: #fff; border: 2px solid #c5a059; border-radius: 6px;
      padding: 5px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: inline-block;
    }
    .qr-frame img { display: block; width: 90px; height: 90px; }
    .qr-lbl { font-size: 8.5px; color: #8b1c1c; font-weight: 900; letter-spacing: 1px; }
    .qr-id  { font-size: 8.5px; color: #64748b; }

    /* Center */
    .footer-center { text-align: center; font-size: 11px; color: #64748b; max-width: 250px; line-height: 1.5; }

    /* Director right */
    .dir-col { text-align: center; position: relative; width: 200px; }
    .dir-sig-img { width: 130px; height: 60px; object-fit: contain; display: block; margin: 0 auto; mix-blend-mode: multiply; }
    .stamp-overlay {
      position: absolute; width: 100px; height: 100px;
      bottom: 20px; right: -8px;
      object-fit: contain; opacity: 0.92; mix-blend-mode: multiply;
      transform: rotate(-8deg);
      filter: drop-shadow(0 2px 4px rgba(185,28,28,0.3));
    }
    .sig-line   { border-top: 1.5px solid #94a3b8; padding-top: 5px; font-size: 13px; color: #0f172a; font-weight: 800; }
    .sig-role   { font-size: 11px; color: #64748b; }
    .sig-inst   { font-size: 11px; color: #8b1c1c; font-weight: 800; }

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

    <!-- ======= GOLDEN BORDER ======= -->
    <div class="b-top"></div>
    <div class="b-bottom"></div>
    <div class="b-left"></div>
    <div class="b-right"></div>
    <div class="b-corner tl">✦</div>
    <div class="b-corner tr">✦</div>
    <div class="b-corner bl">✦</div>
    <div class="b-corner br">✦</div>
    <div class="inner-red"></div>

    <!-- ======= CONTENT ======= -->
    <div class="cert-content">
      ${wmTag}

      <!-- HEADER -->
      <div class="hdr">
        <div>${logoTag}</div>
        <div class="hdr-center">
          <div class="hdr-name-kh">វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស<br>Teacher SSOnline</div>
          <div class="hdr-dots">❖ · ✦ · ❖</div>
          <div class="hdr-name-en">English Language Institute · Est. 2024</div>
        </div>
        <div>${stampTag}</div>
      </div>

      <div class="orn-div"><div class="orn-bar"></div><span class="orn-sym">✦</span><div class="orn-bar"></div></div>

      <!-- MAIN TITLE -->
      <div class="main-title">
        <span class="title-kh">វិញ្ញាបនបត្រ</span>
        <div class="title-en">${certSubheading}</div>
      </div>

      <div class="orn-div"><div class="orn-bar"></div><span class="orn-sym">❖</span><div class="orn-bar"></div></div>

      <!-- BODY -->
      <div class="cert-body">
        <p class="issuer" style="margin-top:14px;">
          ឧបស្ថានស្ថិត វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline
        </p>
        <p class="present">សូមប្រកាន់ជូន :</p>
        <p class="name-lbl">ឈ្មោះ :</p>
        <div class="stu-name">${studentName}</div>
        <p class="achieve">
          បានប្រឡងបញ្ចប់ដោយជោគជ័យ${isAnnualExam ? 'នូវការប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ' : 'នូវវគ្គសិក្សា'}<br>
          <span class="subj-red">「 ${certTitle} 」</span>
        </p>
        <p class="note">
          ${isAnnualExam
            ? 'ដែលបង្ហាញពីការខិតខំ ការយកចិត្តទុកដាក់ និងការរីកចម្រើនផ្នែកភាសាអង់គ្លេស'
            : 'ដែលបង្ហាញពីការខិតខំប្រឹងប្រែង សមត្ថភាព និងឆ្នើមភាពដ៏ល្អ'
          }<br>
          Teacher SSOnline English Language Institute
        </p>

        <!-- Grade Boxes -->
        <div class="grade-row">
          <div class="g-box">
            <div class="g-lbl">Grade / និទ្ទេស</div>
            <div class="g-val">ថ្នាក់ ${grade}</div>
            <div class="g-sub">${gradeTitle.split('(')[0].trim()}</div>
          </div>
          <div class="g-box">
            <div class="g-lbl">Score / ពិន្ទុ</div>
            <div class="g-val">${score}/${total}</div>
            <div class="g-sub">${percent}%</div>
          </div>
          <div class="g-box">
            <div class="g-lbl">ID / លេខសិស្ស</div>
            <div class="g-val" style="font-size:13px;margin-top:4px;">${userId}</div>
          </div>
        </div>

        <p class="date-small">ព្រះរាជ ១៦ ខែច ទីសក្រាជ ភ្ជើមមិ អ.ស.២៥៦០ · ${dateStr}</p>
      </div>

      <!-- FOOTER: QR + Sig -->
      <div class="cert-footer">
        <div class="footer-date">${khDateStr}</div>
        <div class="sig-row">
          <!-- QR Left -->
          <div class="qr-col">
            ${qrTag}
            <div class="qr-lbl">▶ SCAN TO VERIFY</div>
            <div class="qr-id">CERT-${certId}</div>
            <div class="qr-id">ID: ${userId}</div>
          </div>

          <!-- Center note -->
          <div class="footer-center">
            <p>វិញ្ញាបនបត្រនេះចេញ​ ដោយ<br>Teacher SSOnline English Institute</p>
            <br>
            <p style="font-size:9.5px;color:#8b1c1c;font-weight:700;">
              TMS-SSO-${now.getFullYear()}-${certId}
            </p>
          </div>

          <!-- Director Right -->
          <div class="dir-col">
            ${sigTag}
            ${stampOvr}
            <div class="sig-line">លីម សន (Lim Sorn)</div>
            <div class="sig-role">នាយកវិទ្យាស្ថាន (School Director)</div>
            <div class="sig-inst">TeacherSornAiBot</div>
          </div>
        </div>
      </div>

    </div><!-- /cert-content -->
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
