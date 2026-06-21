import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

async function sendEmail(payload: {
  to: string[];
  subject: string;
  html: string;
  from: string;
}) {
  if (!resend) {
    return;
  }

  await resend.emails.send(payload);
}

export async function sendWelcomeEmail(email: string, name: string) {
  await sendEmail({
    from: "Aura BI <onboarding@aurabi1.com>",
    to: [email],
    subject: "Welcome to Aura Business Intelligence",
    html: `<p>Hello ${name},</p><p>Welcome to Aura Business Intelligence. Your free 7-day trial begins now.</p>`,
  });
}

export async function sendTrialReminder(email: string, name: string) {
  await sendEmail({
    from: "Aura BI <reminders@aurabi1.com>",
    to: [email],
    subject: "Your Aura trial ends tomorrow",
    html: `<p>Hello ${name},</p><p>This is a reminder that your free trial ends tomorrow.</p>`,
  });
}

export async function sendTrialExpiredEmail(email: string, name: string) {
  await sendEmail({
    from: "Aura BI <alerts@aurabi1.com>",
    to: [email],
    subject: "Your Aura trial has expired",
    html: `<p>Hello ${name},</p><p>Your free trial has ended. Upgrade to continue accessing your insights.</p>`,
  });
}

export async function sendWeeklyCEOBriefing(email: string, name: string) {
  await sendEmail({
    from: "Aura BI <briefing@aurabi1.com>",
    to: [email],
    subject: "Weekly CEO Briefing",
    html: `<p>Hello ${name},</p><p>Your weekly CEO briefing is ready inside your Aura dashboard.</p>`,
  });
}