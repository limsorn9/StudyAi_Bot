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
  const { studentName, userId, grade, score, total, percent, dateStr, certId, isAnnualExam, isBeginnerFinal } = data;
  const certTitle = data.title || data.lessonTitle || 'ភាសាអង់គ្លេស';
  const gradeTitle = getGradeTitle(grade);
  const examType = isBeginnerFinal
    ? '🎓 ការប្រឡងបញ្ចប់ថ្នាក់ដំបូង (Beginner Final Exam)'
    : (isAnnualExam ? '🏆 ការប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ' : '📚 ការប្រឡងបញ្ចប់មេរៀន');
  const certType = isBeginnerFinal
    ? 'វិញ្ញាបនបត្របញ្ចប់ការសិក្សា ថ្នាក់ដំបូង (A-Z)'
    : (isAnnualExam ? 'វិញ្ញាបនបត្របញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ' : 'វិញ្ញាបនបត្របញ្ចប់មេរៀនជោគជ័យ');

  const baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.BASE_URL || '';
  const botUser = process.env.TELEGRAM_BOT_USERNAME || 'StudyAiEngKH_bot';
  const verifyWebUrl = baseUrl ? `${baseUrl}/cert/${certId}` : null;
  const verifyTgUrl = `https://t.me/${botUser}?start=verify_${certId}`;

  const instructorName = isBeginnerFinal ? 'អ្នកគ្រូ ពិសិដ្ឋ (Teacher Piseth AI)' : `@${botUser}`;

  return (
    `╔════════════════════════════════════════════╗\n` +
    `   🎓 *វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស Teacher SSOnline* 🎓\n` +
    `        *TEACHER SSONLINE ENGLISH INSTITUTE*\n` +
    `╚════════════════════════════════════════════╝\n\n` +
    `📜 *${certType}*\n` +
    `*(CERTIFICATE OF ACHIEVEMENT & GRADUATION)*\n\n` +
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
    `👩‍🏫 *គ្រូបន្ទុកថ្នាក់ (Instructor):* ${instructorName}\n` +
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
  const isBeginnerFinal = data.isBeginnerFinal || false;
  const certSubheading = isBeginnerFinal
    ? 'CERTIFICATE OF GRADUATION – BEGINNER FOUNDATION (A-Z)'
    : (isAnnualExam
      ? 'ANNUAL SUBJECT FINAL EXAMINATION CERTIFICATE'
      : 'CERTIFICATE OF ACHIEVEMENT & COMPLETION');

  let finalStudentName = studentName;
  if (data.khmerName && data.khmerName.trim() && studentName && data.khmerName.trim() !== studentName.trim()) {
    finalStudentName = `${data.khmerName} (${studentName})`;
  } else if (data.khmerName && data.khmerName.trim()) {
    finalStudentName = data.khmerName;
  }



  const baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.BASE_URL || '';
  const botUser = process.env.TELEGRAM_BOT_USERNAME || 'StudyAiEngKH_bot';
  const verifyWebUrl = baseUrl ? `${baseUrl}/cert/${certId}` : null;
  const verifyTgUrl = `https://t.me/${botUser}?start=verify_${certId}`;
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
    const fPng = path.join(__dirname, 'public', 'director_signature.png');
    const fJpg = path.join(__dirname, 'public', 'director_signature.jpg');
    if (fs.existsSync(fPng)) {
      directorSigDataUrl = `data:image/png;base64,${fs.readFileSync(fPng).toString('base64')}`;
    } else if (fs.existsSync(fJpg)) {
      directorSigDataUrl = `data:image/jpeg;base64,${fs.readFileSync(fJpg).toString('base64')}`;
    }
  } catch (err) { console.error('Signature Error:', err); }

  // Khmer date & number helper
  const toKhmerNum = (num) => {
    const khDigits = ['០','១','២','៣','៤','៥','៦','៧','៨','៩'];
    return String(num).replace(/[0-9]/g, d => khDigits[d]);
  };
  const now = new Date();
  const khMonths = ['មករា','កុម្ភៈ','មីនា','មេសា','ឧសភា','មិថុនា','កក្កដា','សីហា','កញ្ញា','តុលា','វិច្ឆិកា','ធ្នូ'];
  const khDateStr = `ថ្ងៃទី${toKhmerNum(now.getDate())} ខែ${khMonths[now.getMonth()]} ឆ្នាំ${toKhmerNum(now.getFullYear())}`;

  // Only ONE official stamp is used in the entire certificate, placed on the left & slightly above the director's signature
  const logoTag   = schoolLogoDataUrl  ? `<img src="${schoolLogoDataUrl}"  alt="Logo"  class="hdr-logo" />`  : '';
  const wmTag     = schoolLogoDataUrl  ? `<img src="${schoolLogoDataUrl}"  alt=""      class="wm-logo" />`   : '';
  const qrTag     = qrDataUrl          ? `<div class="qr-frame"><img src="${qrDataUrl}" alt="QR"/></div>`   : '';
  const sigTag    = directorSigDataUrl ? `<img src="${directorSigDataUrl}" alt="Director Signature" class="sig-director" />` : '<div style="height:60px;"></div>';
  const stampOvr  = schoolStampDataUrl ? `<img src="${schoolStampDataUrl}" alt="Official Stamp" class="stamp-official" />` : '';

  // Student Photo in Header (no stamp, elegant frame)
  const studentPhotoTag = data.photoUrl ? `
    <div class="stu-photo-frame">
      <img src="${data.photoUrl}" alt="Student Photo" class="stu-photo-img" />
    </div>
  ` : '';

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
    @page { size: 297mm 210mm; margin: 0; }
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
    .no-print { margin-bottom: 14px; display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
    .print-btn {
      background: linear-gradient(135deg, #c5a059, #9c7a36);
      color: #fff; border: none; padding: 10px 24px; border-radius: 6px;
      cursor: pointer; font-size: 14px; font-weight: bold;
      font-family: 'Battambang', sans-serif;
      box-shadow: 0 4px 12px rgba(197,160,89,0.4);
    }

    /* ========== A4 LANDSCAPE (1123 x 794) ========== */
    .cert-wrapper {
      width: 1123px;
      height: 794px;
      background: #ffffff;
      position: relative;
      box-shadow: 0 20px 60px rgba(0,0,0,0.25);
      box-sizing: border-box;
      padding: 16px;
      overflow: hidden;
    }

    /* Clean, classic, elegant double border */
    .cert-frame-outer {
      border: 2.5px solid #b8860b;
      padding: 5px;
      height: 100%;
      box-sizing: border-box;
      background: transparent;
      position: relative;
      z-index: 1;
    }
    .cert-frame-inner {
      border: 1.5px solid #8b1c1c;
      padding: 14px 24px;
      height: 100%;
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: transparent;
    }
    /* Logo in background: centered watermark, transparent */
    .wm-logo {
      position: absolute; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 520px; height: 520px; object-fit: contain;
      opacity: 0.08; mix-blend-mode: multiply;
      pointer-events: none; z-index: 0;
    }

    /* -------- HEADER -------- */
    .hdr {
      display: flex; align-items: flex-start; justify-content: space-between;
      position: relative; z-index: 1;
    }
    /* Logo in header: enlarged x3 (~175px), centered in remaining left space, shifted down */
    .hdr-logo-box {
      width: 260px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 15px;
    }
    .hdr-logo {
      width: 175px; height: 175px;
      object-fit: contain; border-radius: 50%;
      filter: drop-shadow(0 4px 12px rgba(0,0,0,0.18));
    }
    .hdr-spacer {
      width: 260px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 15px;
    }
    .stu-photo-frame {
      width: 82px;
      height: 104px;
      border: 2px solid #b8860b;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
      background: #f8fafc;
    }
    .stu-photo-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
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
      display: flex; align-items: center; justify-content: center; gap: 8px;
      margin: 3px 0; position: relative; z-index: 1;
    }
    .orn-bar { flex: 1; height: 1.5px; max-width: 160px;
      background: linear-gradient(90deg, transparent, #c5a059, #8b1c1c, #c5a059, transparent); }
    .orn-sym { color: #c5a059; font-size: 12px; }

    /* -------- MAIN TITLE -------- */
    .main-title { text-align: center; position: relative; z-index: 1; margin: 0; }
    .title-kh {
      font-family: 'Moul', cursive; font-size: 34px; color: #c0000b;
      display: block; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
      letter-spacing: 1px; line-height: 1.2;
    }
    .title-en {
      font-family: 'Cinzel', serif; font-size: 10px; font-weight: 900;
      color: #1e3a8a; letter-spacing: 2px; text-transform: uppercase;
      margin-top: 1px;
    }

    /* -------- BODY -------- */
    .cert-body { text-align: center; position: relative; z-index: 1; margin: 2px 0; }
    .cert-line-1 {
      font-family: 'Khmer OS Muol Light', 'Khmer OS Moul Light', 'Moul', cursive;
      font-size: 15px; color: #1e3a8a; line-height: 1.4; margin-bottom: 2px;
    }
    .cert-line-2 {
      font-family: 'Khmer OS Muol Light', 'Khmer OS Moul Light', 'Moul', cursive;
      font-size: 14.5px; color: #0f172a; line-height: 1.4; margin-bottom: 6px;
    }
    .stu-name {
      display: inline-block;
      font-family: 'Khmer OS Muol Light', 'Khmer OS Moul Light', 'Moul', 'Battambang', sans-serif;
      font-size: 30px; font-weight: bold; color: #0f172a;
      border-bottom: 2px solid #c5a059;
      padding: 0 35px 3px 35px; margin-bottom: 6px;
    }
    .achieve { font-size: 13.5px; color: #334155; line-height: 1.7; }
    .subj-red { font-size: 16.5px; font-weight: 900; color: #8b1c1c; }
    .official-decree-note {
      font-size: 12px; color: #475569; margin-top: 3px; font-weight: 600;
    }


    /* -------- FOOTER -------- */
    .cert-footer { position: relative; z-index: 1; }
    .footer-row {
      display: flex; justify-content: space-between; align-items: flex-end;
    }

    /* QR Col (Left) */
    .qr-col {
      display: flex; flex-direction: column; gap: 2px; width: 140px; margin-bottom: 4px;
    }
    .qr-frame {
      background: #fff; border: 2px solid #c5a059; border-radius: 6px;
      padding: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.08); display: inline-block;
      width: fit-content;
    }
    .qr-frame img { display: block; width: 80px; height: 80px; }
    .qr-badge { font-size: 8px; color: #8b1c1c; font-weight: 900; letter-spacing: 0.8px; margin-top: 2px; }
    .qr-id { font-size: 8px; color: #0f172a; font-weight: 700; }
    .qr-sub { font-size: 7.5px; color: #64748b; }

    /* Center Note */
    .footer-center {
      flex: 1; text-align: center; padding: 0 10px 10px 10px;
      display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
    }
    .cert-legal-text {
      font-size: 11px; color: #475569; line-height: 1.6; font-style: italic;
    }
    .cert-code-pill {
      margin-top: 5px; font-size: 8.5px; color: #8b1c1c; font-weight: 800;
      background: rgba(139,28,28,0.06); padding: 3px 10px; border-radius: 12px;
      border: 1px solid rgba(139,28,28,0.15); display: inline-block;
    }

    /* ========================================================
       DIRECTOR BLOCK: EXACT REPLICA OF USER'S 100% MOCKUP IMAGE
       Stamp height = logo height = 175px
       ======================================================== */
    .dir-block {
      position: relative;
      width: 460px;
      height: 200px;
    }

    .stamp-official {
      position: absolute;
      left: 0;
      top: 0;
      width: 175px;
      height: 175px; /* Exactly matches logo height (175px) */
      object-fit: contain;
      z-index: 1;
      pointer-events: none;
      filter: drop-shadow(0 2px 6px rgba(185,28,28,0.25));
    }

    .dir-date-khmer {
      position: absolute;
      left: 112px;
      top: 25px;
      z-index: 2;
      font-family: 'Battambang', sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: #0f172a;
      white-space: nowrap;
    }

    .dir-role-kh {
      position: absolute;
      left: 145px;
      top: 52px;
      z-index: 2;
      font-family: 'Khmer OS Muol Light', 'Khmer OS Moul Light', 'Moul', cursive;
      font-size: 15px;
      font-weight: bold;
      color: #000000;
      white-space: nowrap;
    }

    .sig-director {
      position: absolute;
      left: 165px;
      top: 78px;
      z-index: 3;
      width: 160px;
      height: 72px;
      object-fit: contain;
    }

    .dir-name-kh {
      position: absolute;
      left: 200px;
      top: 152px;
      z-index: 2;
      font-family: 'Khmer OS Muol Light', 'Khmer OS Moul Light', 'Moul', cursive;
      font-size: 22px;
      font-weight: 900;
      color: #e51d1d;
      white-space: nowrap;
      letter-spacing: 0.5px;
    }

    @media print {
      body { background: none; padding: 0; }
      .no-print { display: none !important; }
      .cert-wrapper {
        width: 297mm;
        height: 210mm;
        box-shadow: none;
      }
    }
  </style>
</head>
<body>

  <div class="no-print">
    <button class="print-btn" onclick="window.print()">🖨️ បោះពុម្ព / Save PDF (A4 ផ្តេក)</button>
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
          <div class="hdr-spacer">${studentPhotoTag}</div>
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
          <div class="stu-name">${finalStudentName}</div>
          <p class="achieve">
            បានប្រឡងបញ្ចប់ដោយជោគជ័យ${isBeginnerFinal ? 'នូវវគ្គបណ្តុះបណ្តាលភាសាអង់គ្លេសកម្រិតដំបូង (English for Children - A to Z)' : (isAnnualExam ? 'នូវការប្រឡងបញ្ចប់មុខវិជ្ជាប្រចាំឆ្នាំ' : 'នូវវគ្គបណ្តុះបណ្តាល')}<br>
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

            <!-- Director Right: 100% Match with user image -->
            <div class="dir-block">
              ${stampOvr}
              <div class="dir-date-khmer">
                បាត់ដំបង ថ្ងៃទី${toKhmerNum(now.getDate())} ខែ${khMonths[now.getMonth()]} ឆ្នាំ${toKhmerNum(now.getFullYear())}
              </div>
              <div class="dir-role-kh">នាយកវិទ្យាស្ថាន</div>
              ${sigTag}
              <div class="dir-name-kh">លីម សន</div>
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
