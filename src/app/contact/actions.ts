"use server";

import { inquiryOptions } from "@/content/inquiry";
import { site } from "@/content/site";

export type InquiryField = "name" | "company" | "email" | "projectType" | "budget" | "timeline" | "message";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<InquiryField, string>>;
  values?: Partial<Record<InquiryField, string>>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();

  // Honeypot: real people never fill this in.
  if (get("website")) return { status: "success" };

  const values = {
    name: get("name"),
    company: get("company"),
    email: get("email"),
    projectType: get("projectType"),
    budget: get("budget"),
    timeline: get("timeline"),
    message: get("message"),
  };

  const errors: InquiryState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(values.email)) errors.email = "Please enter a valid email address.";
  if (!inquiryOptions.projectTypes.some((t) => t.value === values.projectType))
    errors.projectType = "Choose the option closest to your project.";
  if (values.message.length < 10) errors.message = "A sentence or two about the project helps us prepare.";
  if (values.message.length > 5000) errors.message = "Please keep your message under 5,000 characters.";

  if (Object.keys(errors).length) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  const projectLabel = inquiryOptions.projectTypes.find((t) => t.value === values.projectType)?.label;
  const body = [
    `Name: ${values.name}`,
    `Company: ${values.company || "—"}`,
    `Email: ${values.email}`,
    `Project type: ${projectLabel}`,
    `Budget: ${values.budget || "—"}`,
    `Timeline: ${values.timeline || "—"}`,
    "",
    values.message,
  ].join("\n");

  try {
    await deliver({ subject: `New inquiry: ${values.name}${values.company ? ` (${values.company})` : ""}`, body, replyTo: values.email });
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
 * Delivery. If RESEND_API_KEY is set, sends via Resend's HTTP API;
 * otherwise logs to the server console (useful in development).
 * Swap this for your CRM, helpdesk or email provider of choice.
 */
async function deliver({ subject, body, replyTo }: { subject: string; body: string; replyTo: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info(`[inquiry] ${subject}\n${body}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM ?? `Website <website@${new URL(site.url).hostname}>`,
      to: process.env.INQUIRY_TO ?? site.email,
      reply_to: replyTo,
      subject,
      text: body,
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}
