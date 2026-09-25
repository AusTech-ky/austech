import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { getProduct } from "@/lib/content";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { Container } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "Contact",
  description: `Tell us about your project. ${site.name} builds bespoke software, business applications and websites for businesses in the Cayman Islands and the Caribbean.`,
  alternates: { canonical: "/contact" },
};

const nextSteps = [
  { title: "We reply within a day", body: "A real person reads your message and gets back to you, usually with a few questions." },
  { title: "A short conversation", body: "30–45 minutes to understand the problem, the people involved and what success looks like." },
  { title: "A clear proposal", body: "An honest recommendation, a plan and a fixed quote or budget range. No obligation." },
];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { project } = await searchParams;
  const slug = typeof project === "string" ? project : undefined;
  const product = slug ? await getProduct(slug) : null;

  const defaults = product
    ? {
        projectType: "product",
        message:
          product.status === "coming-soon"
            ? `I'd like early access to ${product.name} (${product.category.toLowerCase()}).`
            : `I'm interested in ${product.name}. `,
      }
    : undefined;

  return (
    <section className="relative overflow-x-clip pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[560px] w-[1200px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(47_85_212/0.06),transparent)]"
      />
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="enter eyebrow">Contact</p>
          <h1 className="enter mt-5 text-h1 font-semibold text-ink" style={{ "--enter-delay": "70ms" } as React.CSSProperties}>
            Let&apos;s talk about <span className="accent-serif text-accent">your project</span>
          </h1>
          <p className="enter mt-6 max-w-md text-lead text-muted" style={{ "--enter-delay": "140ms" } as React.CSSProperties}>
            Whether it&apos;s a clear brief or just a problem that&apos;s bugging you, tell us a little about it and
            we&apos;ll take it from there.
          </p>

          <ol className="enter mt-12 space-y-6" style={{ "--enter-delay": "210ms" } as React.CSSProperties}>
            {nextSteps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white font-mono text-[0.72rem] text-accent ring-1 ring-line">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[0.95rem] font-medium text-ink">{s.title}</p>
                  <p className="mt-1 text-[0.9rem] leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="enter mt-12 space-y-3 border-t border-line pt-8 text-[0.92rem]" style={{ "--enter-delay": "280ms" } as React.CSSProperties}>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-ink transition-colors hover:text-accent">
              <Mail className="size-4 text-muted" /> {site.email}
            </a>
            <p className="flex items-center gap-3 text-ink-2">
              <MapPin className="size-4 text-muted" /> {site.location.city}, {site.location.region}, {site.location.country}
            </p>
          </div>
        </div>

        <div className="enter lg:col-span-7" style={{ "--enter-delay": "180ms" } as React.CSSProperties}>
          <InquiryForm defaults={defaults} />
        </div>
      </Container>
    </section>
  );
}
