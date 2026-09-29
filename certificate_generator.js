/**
 * Certificate Generator & Progression Helper for StudyAi_Bot
 * Generates Telegram cards, printable HTML certificates, and tracks curriculum progression.
 */

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
  const { studentName, userId, lessonTitle, grade, score, total, percent, dateStr, certId } = data;
  const gradeTitle = getGradeTitle(grade);

  return (
    `╔══════════════════════════════════╗\n` +
    `   🎓 *វិញ្ញាបនបត្របញ្ចប់មេរៀនជោគជ័យ* 🎓\n` +
    `      *CERTIFICATE OF ACHIEVEMENT*\n` +
    `╚══════════════════════════════════╝\n\n` +
    `🏛️ *វិទ្យាស្ថាន STUDY AI ACADEMY*\n` +
    `សូមបញ្ជាក់ដោយមោទនភាពថា សិស្សានុសិស្ស៖\n\n` +
    `👤 ឈ្មោះ៖ *${studentName}* (ID: \`${userId}\`)\n\n` +
    `បានបញ្ចប់ការប្រឡងតេស្តសមត្ថភាពលើមេរៀន៖\n` +
    `📚 *"${lessonTitle}"*\n` +
    `ដោយទទួលបានជោគជ័យយ៉ាងត្រចះត្រចង់!\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `🏆 និទ្ទេសសម្រេចបាន៖ *ថ្នាក់ ${grade}* (${gradeTitle})\n` +
    `🎯 ពិន្ទុប្រឡង៖ *${score} / ${total}* (${percent}%)\n` +
    `📅 កាលបរិច្ឆេទ៖ *${dateStr}*\n` +
    `📜 លេខកូដវិញ្ញាបនបត្រ៖ \`CERT-${certId}\`\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `🎖️ _"ការខិតខំប្រឹងប្រែង និងការអនុវត្តជាប្រចាំ គឺជាកូនសោនៃភាពជោគជ័យ!"_\n\n` +
    `✍️ *គ្រូបង្គោល៖* Teacher Sorn (គ្រូសន)\n` +
    `🌐 *ប្រព័ន្ធបញ្ជាក់៖* StudyAi Bot Verified`
  );
}

/**
 * Generate Luxurious Printable HTML Certificate Document
 */
function generateCertificateHTML(data) {
  const { studentName, userId, lessonTitle, grade, score, total, percent, dateStr, certId } = data;
  const gradeTitle = getGradeTitle(grade);

  return `<!DOCTYPE html>
<html lang="km">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Certificate of Achievement - ${studentName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Cinzel:wght@600;800;900&family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Moul&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #11141a;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      font-family: 'Battambang', sans-serif;
    }
    .cert-container {
      width: 900px;
      max-width: 100%;
      background: radial-gradient(circle at center, #ffffff 0%, #f7f5ed 100%);
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
      position: relative;
    }
    .outer-border {
      border: 8px solid #c5a059;
      padding: 12px;
      position: relative;
    }
    .inner-border {
      border: 2px solid #9c7a36;
      padding: 40px 30px;
      text-align: center;
      position: relative;
    }
    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 160px;
      opacity: 0.04;
      font-family: 'Cinzel', serif;
      font-weight: 900;
      color: #9c7a36;
      user-select: none;
      pointer-events: none;
      white-space: nowrap;
    }
    .academy-header {
      font-family: 'Moul', cursive;
      font-size: 22px;
      color: #7a5a1f;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }
    .sub-academy {
      font-family: 'Cinzel', serif;
      font-size: 14px;
      letter-spacing: 3px;
      color: #666;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .cert-title {
      font-family: 'Cinzel', serif;
      font-size: 38px;
      font-weight: 900;
      color: #1a1a1a;
      letter-spacing: 4px;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .cert-subtitle {
      font-size: 18px;
      color: #8c6a28;
      font-weight: 700;
      margin-bottom: 25px;
    }
    .presented-text {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 18px;
      color: #555;
      margin-bottom: 12px;
    }
    .student-name {
      font-size: 34px;
      font-weight: 700;
      color: #0f172a;
      border-bottom: 2px solid #c5a059;
      display: inline-block;
      padding: 0 40px 8px 40px;
      margin-bottom: 18px;
    }
    .statement {
      font-size: 16px;
      line-height: 1.8;
      color: #334155;
      max-width: 650px;
      margin: 0 auto 25px auto;
    }
    .lesson-highlight {
      font-weight: 700;
      color: #1e3a8a;
    }
    .badge-box {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-bottom: 35px;
    }
    .badge-item {
      background: #fdfbf7;
      border: 1px solid #e2d3b3;
      padding: 10px 25px;
      border-radius: 6px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.03);
    }
    .badge-title {
      font-size: 13px;
      color: #777;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .badge-value {
      font-size: 22px;
      font-weight: 800;
      color: #c5a059;
      font-family: 'Cinzel', serif;
    }
    .footer-signatures {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0 40px;
      margin-top: 20px;
    }
    .signature-block {
      text-align: center;
      width: 200px;
    }
    .sig-line {
      border-top: 1px solid #888;
      padding-top: 8px;
      font-size: 13px;
      color: #444;
      font-weight: 700;
    }
    .seal {
      width: 90px;
      height: 90px;
      border: 3px dashed #c5a059;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #9c7a36;
      font-family: 'Cinzel', serif;
      font-weight: 800;
      font-size: 10px;
      line-height: 1.2;
      background: #fff;
    }
    .print-btn {
      position: absolute;
      top: -50px;
      right: 0;
      background: #c5a059;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
    }
    @media print {
      body { background: none; padding: 0; }
      .cert-container { box-shadow: none; width: 100%; }
      .print-btn { display: none; }
    }
  </style>
</head>
<body>
  <div class="cert-container">
    <button class="print-btn" onclick="window.print()">🖨️ បោះពុម្ព / Save PDF</button>
    <div class="outer-border">
      <div class="inner-border">
        <div class="watermark">STUDY AI</div>
        
        <div class="academy-header">វិទ្យាស្ថានបង្រៀនភាសាអង់គ្លេស STUDY AI</div>
        <div class="sub-academy">StudyAi Bot • Automated English Academy</div>
        
        <div class="cert-title">Certificate</div>
        <div class="cert-subtitle">OF ACHIEVEMENT & COMPLETION</div>
        
        <div class="presented-text">វិញ្ញាបនបត្រនេះត្រូវបានប្រគល់ជូនដោយមោទនភាពចំពោះ៖</div>
        <div class="student-name">${studentName}</div>
        
        <div class="statement">
          បានខិតខំប្រឹងប្រែងសិក្សា និងប្រឡងបញ្ចប់ដោយជោគជ័យនូវមេរៀន៖<br>
          <span class="lesson-highlight">"${lessonTitle}"</span><br>
          ដែលបង្ហាញពីការយល់ដឹងច្បាស់លាស់ និងសមត្ថភាពដ៏ប្រសើរ។
        </div>
        
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
        </div>
        
        <div class="footer-signatures">
          <div class="signature-block">
            <div style="font-family:'Playfair Display', serif; font-style:italic; font-size:20px; color:#1e3a8a; margin-bottom:5px;">Teacher Sorn</div>
            <div class="sig-line">គ្រូបង្គោល (Instructor)</div>
          </div>
          
          <div class="seal">
            <span>★ ★ ★</span>
            <span style="font-size:12px; margin:2px 0;">VERIFIED</span>
            <span style="font-size:8px;">STUDY AI</span>
          </div>
          
          <div class="signature-block">
            <div style="font-size:14px; color:#555; margin-bottom:5px;">${dateStr}</div>
            <div class="sig-line">កាលបរិច្ឆេទ (Issue Date)</div>
          </div>
        </div>
        
        <div style="margin-top: 25px; font-size: 11px; color: #888;">
          លេខកូដសម្គាល់៖ CERT-${certId} | ID សិស្ស៖ ${userId}
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Find the next lesson in sequence from the curriculum
 * Returns { monthId, weekId, lessonId, lessonTitle, isEnd }
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

  // End of entire curriculum!
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
