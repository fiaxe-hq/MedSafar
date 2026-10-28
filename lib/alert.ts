import { env } from "./cloudflare";
import type { Lead } from "./leads";

/**
 * The email sent to the team for each completed enquiry, over SMTP from an
 * existing mailbox (for example care@medsafar.com).
 *
 * Settings, all Worker secrets: SMTP_HOST, SMTP_PORT (465 for SSL, 587 for
 * STARTTLS), SMTP_USER, SMTP_PASSWORD, and ALERT_EMAIL_TO (one address, or
 * several separated by commas). Until they are set, the alert is only
 * written to the log.
 *
 * A failed alert never fails the enquiry: it is already saved in D1.
 */

const rows: [keyof Lead, string][] = [
  ["name", "Name"],
  ["phone", "Mobile"],
  ["email", "Email"],
  ["country", "Country"],
  ["treatment", "Treatment"],
  ["timeline", "Travel"],
  ["budget", "Matters most"],
  ["preference", "City or hospital"],
  ["notes", "Notes"],
  ["reportFile", "Report"],
  ["source", "Page"],
  ["createdAt", "Received"],
];

export async function sendLeadAlert(lead: Lead, origin: string): Promise<void> {
  const e = env();
  const host = e.SMTP_HOST?.trim();
  const user = e.SMTP_USER?.trim();
  const password = e.SMTP_PASSWORD;
  const to = (e.ALERT_EMAIL_TO ?? "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);

  // Header values: no line breaks, so a typed name cannot add headers.
  const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").slice(0, 150);
  const subject = oneLine(`New enquiry: ${lead.name || lead.phone}${lead.treatment ? ` (${lead.treatment})` : ""}`);
  const fields = rows
    .map(([key, title]) => [title, String(lead[key] ?? "").trim()] as const)
    .filter(([, value]) => value);
  const adminUrl = `${origin}/admin/enquiries`;

  const text = [...fields.map(([title, value]) => `${title}: ${value}`), "", `All enquiries: ${adminUrl}`].join("\n");
  const html = `<table cellpadding="6" style="border-collapse:collapse;font:15px/1.5 system-ui,sans-serif;color:#1a1a1a">${fields
    .map(
      ([title, value]) =>
        `<tr><td style="color:#666;vertical-align:top;white-space:nowrap">${escape(title)}</td><td style="white-space:pre-wrap">${escape(value)}</td></tr>`,
    )
    .join("")}</table><p style="font:15px system-ui,sans-serif"><a href="${escape(adminUrl)}">All enquiries</a></p>`;

  // The SMTP client needs the Worker's TCP sockets, which `next dev` does not have.
  const onWorker = typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers";
  if (!host || !user || !password || !to.length || !onWorker) {
    console.log(`[alert] not sent (SMTP not set up here)\n${subject}\n${text}`);
    return;
  }

  try {
    const port = Number(e.SMTP_PORT) || 465;
    const { WorkerMailer } = await import("worker-mailer");
    await WorkerMailer.send(
      {
        host,
        port,
        secure: port === 465,
        startTls: port !== 465,
        credentials: { username: user, password },
        authType: ["plain", "login"],
      },
      {
        from: { name: "Medsafar website", email: user },
        to,
        // Replying goes straight to the patient.
        reply: lead.email ? { name: oneLine(lead.name ?? ""), email: oneLine(lead.email) } : undefined,
        subject,
        text,
        html,
      },
    );
  } catch (error) {
    console.error("[alert] email failed", error instanceof Error ? error.message : String(error));
  }
}

function escape(value: string): string {
  return value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}
