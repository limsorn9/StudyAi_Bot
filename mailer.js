const nodemailer = require('nodemailer');

/**
 * Configure Nodemailer Transporter
 * Supports Gmail SMTP using standard App Password or SMTP settings
 */
function getTransporter() {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASS || process.env.SMTP_PASS || process.env.EMAIL_PASS;

  if (user && pass) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });
  }

  // Check custom host/port if provided
  if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: user && pass ? { user, pass } : undefined
    });
  }

  return null;
}

/**
 * Send 6-Digit OTP Code directly to student's Gmail
 */
async function sendOtpEmail({ toEmail, fullName, otpCode, purpose = 'register' }) {
  const transporter = getTransporter();
  const cleanEmail = toEmail.trim().toLowerCase();
  const cleanName = fullName ? fullName.trim() : 'សិស្ស (Student)';

  const purposeTitle = purpose === 'login' 
    ? 'ចូលរៀនលើវេបសាយ (Course Login)' 
    : 'ចុះឈ្មោះចូលរៀន (Course Registration)';

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0b0f19; color: #ffffff; margin: 0; padding: 20px; }
    .email-container { max-width: 540px; margin: 0 auto; background: #131b2e; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #1e3a8a, #0284c7); padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; color: #ffffff; letter-spacing: 0.5px; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #93c5fd; }
    .content { padding: 30px 25px; text-align: center; }
    .greeting { font-size: 16px; color: #e2e8f0; margin-bottom: 12px; }
    .desc { font-size: 14px; color: #94a3b8; line-height: 1.6; margin-bottom: 24px; }
    .otp-box { background: #0b1120; border: 2px dashed #0284c7; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center; }
    .otp-label { font-size: 12px; text-transform: uppercase; color: #38bdf8; font-weight: 700; letter-spacing: 1px; }
    .otp-code { font-family: 'Courier New', monospace; font-size: 38px; font-weight: 900; letter-spacing: 8px; color: #facc15; margin: 10px 0; }
    .otp-exp { font-size: 12px; color: #64748b; }
    .security-note { font-size: 12px; color: #eab308; background: rgba(234, 179, 8, 0.1); border-left: 3px solid #eab308; padding: 10px 14px; text-align: left; border-radius: 6px; margin: 20px 0; }
    .footer { background: #0b101d; border-top: 1px solid #1e293b; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
    .footer strong { color: #94a3b8; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>វិទ្យាស្ថានភាសាអង់គ្លេស Teacher SSOnline</h1>
      <p>English Automated Academy • នាយកសាលា៖ លីម សន (Lim Sorn)</p>
    </div>
    <div class="content">
      <div class="greeting">សួស្តី <strong>${cleanName}</strong>! 👋</div>
      <div class="desc">
        អ្នកបានស្នើសុំលេខកូដសម្ងាត់ OTP សម្រាប់ <strong>${purposeTitle}</strong> លើប្រព័ន្ធសិក្សា Teacher SSOnline។
        សូមប្រើប្រាស់លេខកូដផ្ទៀងផ្ទាត់ ៦ ខ្ទង់ខាងក្រោម៖
      </div>
      <div class="otp-box">
        <div class="otp-label">លេខកូដផ្ទៀងផ្ទាត់ OTP (6-Digit Code)</div>
        <div class="otp-code">${otpCode}</div>
        <div class="otp-exp">⏳ មានសុពលភាពរយៈពេល ១៥ នាទីប៉ុណ្ណោះ</div>
      </div>
      <div class="security-note">
        ⚠️ <strong>ចំណាំសុវត្ថិភាព៖</strong> សូមកុំចែករំលែកលេខកូដ OTP នេះទៅកាន់អ្នកណាឡើយ។ ក្រុមការងារ Teacher SSOnline នឹងមិនទាមទារលេខកូដនេះពីអ្នកជាដាច់ខាត។
      </div>
    </div>
    <div class="footer">
      <div><strong>Teacher SSOnline English Academy</strong></div>
      <div>គេហទំព័រសិក្សាស្វ័យប្រវត្ត & វិញ្ញាបនបត្រ A4 ផ្លូវការ</div>
      <div style="margin-top: 8px;">📩 បញ្ជូនទៅកាន់៖ ${cleanEmail}</div>
    </div>
  </div>
</body>
</html>
  `;

  if (transporter) {
    try {
      const fromSender = process.env.GMAIL_USER || 'Teacher SSOnline <noreply@ssonline.edu.kh>';
      const info = await transporter.sendMail({
        from: fromSender,
        to: cleanEmail,
        subject: `🎓 [${otpCode}] លេខកូដផ្ទៀងផ្ទាត់ ${purposeTitle} - Teacher SSOnline`,
        text: `សួស្តី ${cleanName}! លេខកូដ OTP របស់អ្នកសម្រាប់ ${purposeTitle} គឺ៖ ${otpCode} (មានសុពលភាព ១៥ នាទី)។`,
        html: htmlContent
      });

      console.log(`✅ [GMAIL SENT] Sent OTP ${otpCode} to ${cleanEmail} (MsgID: ${info.messageId})`);
      return { success: true, delivered: true, previewCode: otpCode };
    } catch (err) {
      console.error(`❌ [GMAIL SEND ERROR] To: ${cleanEmail}:`, err.message);
      // Fallback: log to console so system still functions during development or if credentials expire
      console.log(`🔑 [OTP CONSOLE FALLBACK] To: ${cleanEmail} | OTP Code: ${otpCode}`);
      return { success: true, delivered: false, previewCode: otpCode, error: err.message };
    }
  } else {
    // No transporter configured yet, log clearly
    console.log(`ℹ️ [GMAIL DISPATCH - MOCK/DEV] To: ${cleanEmail} | OTP Code: ${otpCode}`);
    return { success: true, delivered: false, previewCode: otpCode, note: 'SMTP not configured' };
  }
}

module.exports = {
  sendOtpEmail,
  getTransporter
};
