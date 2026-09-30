import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { acknowledgementEmail, adminEmail, type InquiryEmailData } from "@/lib/inquiry-emails";

export const metadata: Metadata = { title: "Email preview", robots: { index: false } };

/** Development only: the inquiry emails rendered with sample data. Nothing is sent. */
const sample: InquiryEmailData = {
  name: "Hannah Reid",
  company: "Island Fuels",
  email: "hannah.reid@example.com",
  lookingFor: "Fuel Up, Website",
  product: "Fuel Up",
  budget: "US$10k – 25k",
  timeline: "Within 1–3 months",
  message:
    "We run four stations with around 200 fleet accounts on paper vouchers.\nWe'd like to see a demo of Fuel Up, and talk about a new website too.",
};

export default function EmailPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  const emails = [
    { who: "To Austech (info@austech.ky)", ...adminEmail(sample, "/brand/email-logo-white.png") },
    { who: `To ${sample.name} (${sample.email})`, ...acknowledgementEmail(sample, "/brand/email-logo-white.png") },
  ];
  return (
    <div className="mx-auto grid max-w-[1320px] gap-8 px-5 pb-24 pt-28 lg:grid-cols-2">
      {emails.map((e) => (
        <section key={e.who}>
          <p className="text-[0.8rem] text-muted">{e.who}</p>
          <p className="mt-1 text-[0.95rem] font-semibold text-ink">{e.subject}</p>
          <iframe title={e.subject} srcDoc={e.html} className="mt-4 w-full rounded-xl ring-1 ring-line" style={{ height: 1000 }} />
        </section>
      ))}
    </div>
  );
}
