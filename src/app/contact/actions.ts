"use server";

import { inquiryOptions } from "@/content/inquiry";
import { headers } from "next/headers";
import { getProduct } from "@/lib/content";
import { allowSubmission, clientIp, verifyTurnstile } from "@/lib/form-guard";
import { site } from "@/content/site";
import { isSesConfigured, sendSesEmail } from "@/lib/ses";
import { acknowledgementEmail, adminEmail, type InquiryEmailData } from "@/lib/inquiry-emails";

export type InquiryField =
  | "name"
  | "company"
  | "email"
  | "projectType"
  | "projectOther"
  | "product"
  | "budget"
  | "timeline"
  | "message";

export type InquiryValues = Partial<Record<Exclude<InquiryField, "projectType">, string>> & {
  projectType?: string[];
};

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<InquiryField, string>>;
  values?: InquiryValues;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();

  // Honeypot: real people never fill this in.
  if (get("website")) return { status: "success" };

  const ip = clientIp(await headers());
  if (!allowSubmission(ip)) {
    return { status: "error", message: `That's a lot of messages. Please try again later, or email us at ${site.email}.` };
  }

  const known = new Set<string>(inquiryOptions.projectTypes.map((t) => t.value));
  const values = {
    name: get("name"),
    company: get("company"),
    email: get("email"),
    projectType: formData.getAll("projectType").map(String).filter((v) => known.has(v)),
    projectOther: get("projectOther"),
    product: get("product"),
    budget: get("budget"),
    timeline: get("timeline"),
    message: get("message"),
  };

  const errors: InquiryState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.projectType.length === 0) errors.projectType = "Choose at least one option.";
  if (values.projectType.includes("other") && values.projectOther.length < 2)
    errors.projectOther = "Tell us briefly what you have in mind.";
  const product = values.projectType.includes("product") && values.product ? await getProduct(values.product) : null;
  if (values.projectType.includes("product") && !product) errors.product = "Choose which product.";
  if (values.message.length < 10) errors.message = "A sentence or two about the project helps us prepare.";
  if (values.message.length > 5000) errors.message = "Please keep your message under 5,000 characters.";

  if (Object.keys(errors).length) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  // Checked after the fields so a typo doesn't burn the visitor's single-use token.
  if (!(await verifyTurnstile(get("cf-turnstile-response"), ip))) {
    return { status: "error", message: "We couldn't confirm you're not a bot. Please try again.", values };
  }

  const looking = values.projectType
    .map((v) =>
      v === "other"
        ? `Other: ${values.projectOther}`
        : v === "product" && product
          ? product.name
          : inquiryOptions.projectTypes.find((t) => t.value === v)?.label,
    )
    .join(", ");
  const data: InquiryEmailData = {
    name: values.name,
    company: values.company || undefined,
    email: values.email,
    lookingFor: looking,
    product: product?.name,
    budget: values.budget || undefined,
    timeline: values.timeline || undefined,
    message: values.message,
  };

  try {
    await deliver(data);
  } catch (err) {
    console.error("[inquiry] delivery failed", err);
    return {
      status: "error",
      message: `Sorry, something went wrong sending your message. Please email us at ${site.email}.`,
      values,
    };
  }

  return { status: "success" };
}

/**
 * Delivery through Amazon SES when AWS credentials are set (see lib/ses.ts):
 * a notification to Austech, then an acknowledgement to the sender. Without
 * credentials the inquiry is logged to the server console, as in development.
 */
async function deliver(data: InquiryEmailData) {
  const admin = adminEmail(data);
  if (!isSesConfigured()) {
    console.info(`[inquiry] ${admin.subject}\n${admin.text}`);
    return;
  }
  const from = process.env.INQUIRY_FROM ?? `${site.name} <website@${new URL(site.url).hostname}>`;
  await sendSesEmail({ from, to: [process.env.INQUIRY_TO ?? site.email], replyTo: [data.email], ...admin });
  // The enquiry is already with us; a failed acknowledgement shouldn't tell the visitor it failed.
  try {
    await sendSesEmail({ from, to: [data.email], replyTo: [site.email], ...acknowledgementEmail(data) });
  } catch (err) {
    console.error("[inquiry] acknowledgement failed", err);
  }
}
