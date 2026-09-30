import { createHash, createHmac } from "node:crypto";

/**
 * Minimal Amazon SES (v2) sender: one signed HTTPS request, no SDK.
 *
 * Needs AWS_REGION, AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY (plus
 * AWS_SESSION_TOKEN when using temporary credentials; SES_CONFIGURATION_SET and
 * SES_TENANT to send through a configuration set and tenant). The IAM user only
 * needs `ses:SendEmail`, and the From address's domain must be verified in
 * SES in the same region.
 */

export type SesMessage = {
  from: string;
  to: string[];
  replyTo?: string[];
  subject: string;
  text: string;
  html?: string;
};

export function isSesConfigured() {
  return Boolean(process.env.AWS_REGION && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY);
}

const sha256 = (data: string) => createHash("sha256").update(data, "utf8").digest("hex");
const hmac = (key: Buffer | string, data: string) => createHmac("sha256", key).update(data, "utf8").digest();

export async function sendSesEmail(msg: SesMessage): Promise<void> {
  const region = process.env.AWS_REGION!;
  const accessKey = process.env.AWS_ACCESS_KEY_ID!;
  const secretKey = process.env.AWS_SECRET_ACCESS_KEY!;
  const sessionToken = process.env.AWS_SESSION_TOKEN;

  const host = `email.${region}.amazonaws.com`;
  const path = "/v2/email/outbound-emails";
  const body = JSON.stringify({
    FromEmailAddress: msg.from,
    // Optional: route events (bounces, complaints) through a configuration set, e.g. to an SNS topic.
    ...(process.env.SES_CONFIGURATION_SET ? { ConfigurationSetName: process.env.SES_CONFIGURATION_SET } : {}),
    // Optional: send as an SES tenant, so reputation and suppression stay scoped to this site.
    ...(process.env.SES_TENANT ? { TenantName: process.env.SES_TENANT } : {}),
    Destination: { ToAddresses: msg.to },
    ReplyToAddresses: msg.replyTo,
    Content: {
      Simple: {
        Subject: { Data: msg.subject, Charset: "UTF-8" },
        Body: {
          Text: { Data: msg.text, Charset: "UTF-8" },
          ...(msg.html ? { Html: { Data: msg.html, Charset: "UTF-8" } } : {}),
        },
      },
    },
  });

  // AWS Signature Version 4.
  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, ""); // YYYYMMDDTHHMMSSZ
  const dateStamp = amzDate.slice(0, 8);
  const headers: Record<string, string> = {
    "content-type": "application/json",
    host,
    "x-amz-date": amzDate,
    ...(sessionToken ? { "x-amz-security-token": sessionToken } : {}),
  };
  const names = Object.keys(headers).sort();
  const signedHeaders = names.join(";");
  const canonicalRequest = [
    "POST",
    path,
    "",
    names.map((n) => `${n}:${headers[n]}\n`).join(""),
    signedHeaders,
    sha256(body),
  ].join("\n");
  const scope = `${dateStamp}/${region}/ses/aws4_request`;
  const stringToSign = ["AWS4-HMAC-SHA256", amzDate, scope, sha256(canonicalRequest)].join("\n");
  const signingKey = hmac(hmac(hmac(hmac(`AWS4${secretKey}`, dateStamp), region), "ses"), "aws4_request");
  const signature = createHmac("sha256", signingKey).update(stringToSign, "utf8").digest("hex");

  // host is signed but not sent by hand: fetch sets the same value itself.
  const { host: _signedOnly, ...sent } = headers;
  void _signedOnly;
  const res = await fetch(`https://${host}${path}`, {
    method: "POST",
    headers: {
      ...sent,
      Authorization: `AWS4-HMAC-SHA256 Credential=${accessKey}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    },
    body,
  });
  if (!res.ok) throw new Error(`SES responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
}
