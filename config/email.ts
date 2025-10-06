import nodemailer from "nodemailer";
require("dotenv").config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // based on email provider used to send email - gmail - smtp.gmail.com, zoho - smtp.zoho.com
  // service: process.env.EMAIL_SERVICE,
  port: 587, // 587, 465, 25
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMailToTomiwa = async () => {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: "afolabitomiwa005@gmail.com,", // the person email to be sent to
    subject: "Hello ✔", // heading of the email
    text: "Hello world?", // plain‑text body for the email content. this can be used or the html
    html: "<b>Hello world?</b>", // HTML body for the email content. this can be used or the text
  });

  console.log("Message sent:", info.messageId);
};

export type ResetEmailOptions = {
  name?: string; // optional recipient name
  expiresInMinutes?: number; // default 60
  from?: string; // optional from override
  companyName?: string; // optional company signature
};

export const sendPinResetEmail = async (
  to: string,
  resetUrl: string,
  options: ResetEmailOptions = {}
) => {
  const {
    name = "Friend",
    expiresInMinutes = 60,
    from = '"No-Reply" <cpBankc@tech.com>',
    companyName = "CpBank",
  } = options;

  //   // Plain text fallback (good for clients that block HTML)
  //   const plainText = `
  // Hi ${name},

  // We received a request to reset your password. Click the link below to reset it (valid for ${expiresInMinutes} minutes):

  // ${resetUrl}

  // If you didn't request this, just ignore this email and your password will stay the same.

  // — ${companyName}
  // `;

  // HTML email with inline CSS (widely supported)
  const html = `
<!-- Preheader: hidden preview text -->
<span style="display:none;max-height:0px;overflow:hidden;">Reset your pin — link valid for ${expiresInMinutes} minutes.</span

<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-family:-apple-system, BlinkMacSystemFont,'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color:#f4f6f8; padding:24px 0;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff; border-radius:12px; box-shadow:0 6px 18px rgba(16,24,40,0.06); overflow:hidden;">
        <tr>
          <td style="padding:28px 32px;">
            <!-- Header -->
            <h1 style="margin:0 0 8px 0; font-size:20px; line-height:1.25; color:#0f172a; font-weight:600;">
              Password reset request
            </h1>
            <p style="margin:0 0 20px 0; color:#475569; font-size:14px; line-height:1.5;">
              Hey ${name}, we got a request to reset your pin. Click the button below to choose a new one.
            </p>

            <!-- Button -->
            <div style="text-align:left; margin:18px 0;">
              <a href="${resetUrl}" target="_blank" rel="noopener noreferrer"
                 style="display:inline-block; text-decoration:none; padding:12px 20px; border-radius:10px; font-weight:600; font-size:15px; line-height:1; background:linear-gradient(90deg,#06b6d4,#0ea5a0); color:#ffffff;">
                Reset pin
              </a>
            </div>

            <!-- Fallback link -->
            <p style="margin:0 0 14px 0; color:#64748b; font-size:13px; line-height:1.4;">
              If the button doesn't work, copy & paste this link into your browser:
            </p>
            <p style="word-break:break-all; margin:0 0 18px 0;">
              <a href="${resetUrl}" target="_blank" rel="noopener noreferrer" style="color:#0ea5a0; text-decoration:underline; font-size:13px;">
                ${resetUrl}
              </a>
            </p>

            <!-- Note -->
            <p style="margin:0; color:#94a3b8; font-size:12px; line-height:1.4;">
              This link will expire in ${expiresInMinutes} minutes. If you didn't request a pin reset, no action is required.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc; padding:18px 32px; border-top:1px solid #eef2f7; text-align:left;">
            <p style="margin:0; color:#7f8a9b; font-size:12px;">
              — ${companyName} Team<br/>
              If you have questions, reply to this email and we'll help out.
            </p>
          </td>
        </tr>
      </table>

      <!-- Small legal / branding -->
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px; margin-top:12px;">
        <tr>
          <td style="text-align:center; color:#9aa4b2; font-size:11px;">
            © ${new Date().getFullYear()} ${companyName}. All rights reserved.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`;

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject: `${companyName} — Reset your pin`,
      //   text: plainText,
      html,
    });

    console.log(
      `[sendPasswordResetEmail] Message sent to ${to}: ${info.messageId}`
    );
    return info;
  } catch (err) {
    console.error(`[sendPasswordResetEmail] Failed to send to ${to}:`, err);
    throw err;
  }
};
