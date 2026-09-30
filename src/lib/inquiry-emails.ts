import { site } from "@/content/site";

/**
 * The two emails a project inquiry sends: a notification to Austech and an
 * acknowledgement to the person who filled in the form. Table layout and
 * inline styles, because that is what email clients reliably render.
 * Preview them in development at /emails/preview.
 */

export type InquiryEmailData = {
  name: string;
  company?: string;
  email: string;
  lookingFor: string;
  /** Set when the enquiry is about one of our products. */
  product?: string;
  budget?: string;
  timeline?: string;
  message: string;
};

export type Email = { subject: string; text: string; html: string };

const NAVY = "#1E3A8A";
const DARK = "#0B1220";
const SKY = "#60A5FA";
const INK = "#0B1220";
const MUTED = "#5B6472";
const SOFT = "#F4F7FC";
const FONT = "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const multiline = (s: string) => esc(s).replace(/\n/g, "<br>");

const defaultLogo = `${site.url}/brand/email-logo-white.png`;

/**
 * Branded shell: a navy header band with the white logo and a sky rule,
 * a white body, and a quiet centred footer.
 */
function shell({ preheader, body, logoUrl }: { preheader: string; body: string; logoUrl: string }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only"><title>${esc(site.name)}</title></head>
<body style="margin:0;padding:0;background:#E9EEF6;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E9EEF6;">
<tr><td align="center" style="padding:36px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border-radius:18px;overflow:hidden;">
    <tr><td style="padding:30px 36px 26px;background:${NAVY};background-image:linear-gradient(135deg,${DARK} 0%,${NAVY} 100%);">
      <img src="${logoUrl}" width="150" height="22" alt="${esc(site.name)}" style="display:block;border:0;">
    </td></tr>
    <tr><td style="height:4px;background:${SKY};line-height:4px;font-size:0;">&nbsp;</td></tr>
    <tr><td style="padding:36px 36px 34px;${FONT}color:${INK};">${body}</td></tr>
  </table>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
    <tr><td align="center" style="padding:22px 24px 0;${FONT}font-size:12px;line-height:19px;color:${MUTED};">
      <a href="mailto:${site.email}" style="color:${NAVY};text-decoration:none;font-weight:600;">${site.email}</a>
      &nbsp;·&nbsp;
      <a href="${site.phone.href}" style="color:${NAVY};text-decoration:none;font-weight:600;">${site.phone.display}</a><br>
      ${esc(site.name)} · ${esc(site.location.region)}, ${esc(site.location.country)}
    </td></tr>
  </table>
</td></tr>
</table>
</body></html>`;
}

/** Details as soft tiles: label above value, no ruled table. */
function details(items: [string, string | undefined][]) {
  const shown = items.filter(([, v]) => v && v.trim());
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SOFT};border-radius:12px;">
${shown
  .map(
    ([k, v], i) => `<tr><td style="padding:${i === 0 ? 18 : 10}px 20px ${i === shown.length - 1 ? 18 : 10}px;">
  <p style="margin:0 0 3px;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${NAVY};">${esc(k)}</p>
  <p style="margin:0;font-size:14px;line-height:21px;color:${INK};">${multiline(v!)}</p>
</td></tr>`,
  )
  .join("\n")}
</table>`;
}

/** Sent to Austech. Reply-to is set to the person who asked, so replying answers them. */
export function adminEmail(d: InquiryEmailData, logoUrl = defaultLogo): Email {
  const who = `${d.name}${d.company ? ` (${d.company})` : ""}`;
  const subject = d.product ? `${d.product} enquiry from ${who}` : `New enquiry from ${who}`;
  const rows: [string, string | undefined][] = [
    ["Name", d.name],
    ["Company", d.company],
    ["Email", d.email],
    ["Looking for", d.lookingFor],
    ["Budget", d.budget],
    ["Timeline", d.timeline],
    ["Message", d.message],
  ];
  const html = shell({
    logoUrl,
    preheader: d.product ? `${d.name} is asking about ${d.product}.` : `${d.name} sent an enquiry.`,
    body: `<h1 style="margin:0 0 8px;font-size:24px;line-height:31px;font-weight:700;color:${INK};">${
      d.product ? `${esc(d.name)} is interested in ${esc(d.product)}.` : `${esc(d.name)} would like to talk.`
    }</h1>
<p style="margin:0 0 26px;font-size:15px;line-height:23px;color:${MUTED};">Sent from the contact form on ${esc(new URL(site.url).hostname)}.</p>
${details(rows)}`,
  });
  const text = [subject, "", ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)].join("\n");
  return { subject, text, html };
}

/** Sent to the person who filled in the form. */
export function acknowledgementEmail(d: InquiryEmailData, logoUrl = defaultLogo): Email {
  const first = d.name.trim().split(/\s+/)[0];
  const about = d.product ? ` about ${d.product}` : "";
  const subject = `We've received your enquiry${about} · ${site.name}`;
  const html = shell({
    logoUrl,
    preheader: "Thanks for getting in touch. We'll be in touch soon.",
    body: `<h1 style="margin:0 0 12px;font-size:24px;line-height:31px;font-weight:700;color:${INK};">Hello ${esc(first)}, we've received your enquiry${esc(about)}.</h1>
<p style="margin:0 0 28px;font-size:15px;line-height:24px;color:${MUTED};">We'll be in touch soon.</p>
<p style="margin:0 0 10px;font-size:13px;font-weight:600;color:${INK};">What you sent us</p>
${details([
  ["Looking for", d.lookingFor],
  ["Budget", d.budget],
  ["Timeline", d.timeline],
  ["Message", d.message],
])}
<p style="margin:28px 0 0;font-size:15px;line-height:24px;color:${INK};">The ${esc(site.name)} team</p>`,
  });
  const text = [
    `Hello ${first}, we've received your enquiry${about}.`,
    "",
    "We'll be in touch soon.",
    "",
    `Looking for: ${d.lookingFor}`,
    d.budget ? `Budget: ${d.budget}` : "",
    d.timeline ? `Timeline: ${d.timeline}` : "",
    "",
    d.message,
    "",
    `The ${site.name} team`,
    `${site.email} · ${site.phone.display}`,
  ]
    .filter((l, i, a) => l !== "" || a[i - 1] !== "")
    .join("\n");
  return { subject, text, html };
}
