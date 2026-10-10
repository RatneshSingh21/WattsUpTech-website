import nodemailer from "nodemailer";

function transporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
}

export function isMailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendNotifyEmail(subject: string, text: string) {
  try {
    const to = process.env.CONTACT_NOTIFY_EMAIL || process.env.NEXT_PUBLIC_BUSINESS_EMAIL;
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;
    if (!to || !from) {
      console.log("[notify] email not configured, skipping. Subject:", subject);
      return false;
    }
    const t = transporter();
    if (!t) {
      console.log("[notify] SMTP not configured, skipping. Subject:", subject);
      return false;
    }
    await t.sendMail({ from, to, subject, text });
    return true;
  } catch (e) {
    console.error("sendNotifyEmail failed:", e);
    return false;
  }
}
