import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { getProduct, getProducts } from "@/lib/content";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { Container } from "@/components/ui/layout";
import { HeroNetwork } from "@/components/sections/hero-network";

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
  const [product, products] = await Promise.all([slug ? getProduct(slug) : null, getProducts()]);

  const defaults = product
    ? {
        projectType: ["product"],
        product: product.slug,
        message:
          product.status === "coming-soon"
            ? `I'd like early access to ${product.name} (${product.category.toLowerCase()}).`
            : `I'm interested in ${product.name}. `,
      }
    : undefined;

  return (
    <section className="relative isolate overflow-hidden bg-[#0b1220] pb-24 pt-32 sm:pb-32 sm:pt-40">
      {/* The home hero's dark band, simplified: glow, grid and the network drifting behind the form. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_80%_30%,rgb(30_58_138/0.55),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:linear-gradient(rgb(96_165_250/0.07)_1px,transparent_1px),linear-gradient(90deg,rgb(96_165_250/0.07)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_60%_30%,black,transparent_75%)]"
      />
      <HeroNetwork className="enter pointer-events-none absolute -right-[70%] top-24 -z-10 h-[420px] w-auto opacity-20 sm:top-10 sm:-right-[15%] sm:h-[680px] sm:opacity-50 lg:-right-[6%] lg:top-4 lg:h-[820px] lg:opacity-70" />

      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h1 className="enter text-h1 font-semibold text-white" style={{ "--enter-delay": "70ms" } as React.CSSProperties}>
            Let&apos;s talk about <span className="accent-serif text-sky!">your project</span>
          </h1>
          <p className="enter mt-6 max-w-md text-lead text-white/65" style={{ "--enter-delay": "140ms" } as React.CSSProperties}>
            Whether it&apos;s a clear brief or just a problem that&apos;s bugging you, tell us a little about it and
            we&apos;ll take it from there.
          </p>

          <ol className="enter mt-12 space-y-6" style={{ "--enter-delay": "210ms" } as React.CSSProperties}>
            {nextSteps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/[0.06] font-mono text-[0.72rem] text-sky ring-1 ring-inset ring-white/15">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[0.95rem] font-medium text-white">{s.title}</p>
                  <p className="mt-1 text-[0.9rem] leading-relaxed text-white/60">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="enter mt-12 space-y-3 border-t border-white/10 pt-8 text-[0.92rem]" style={{ "--enter-delay": "280ms" } as React.CSSProperties}>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-white transition-colors hover:text-sky">
              <Mail className="size-4 text-white/50" /> {site.email}
            </a>
            <a href={site.phone.href} className="flex items-center gap-3 text-white transition-colors hover:text-sky">
              <Phone className="size-4 text-white/50" /> {site.phone.display}
            </a>
            <p className="flex items-center gap-3 text-white/70">
              <MapPin className="size-4 text-white/50" /> {site.location.city}, {site.location.region}, {site.location.country}
            </p>
          </div>
        </div>

        <div className="enter lg:col-span-7" style={{ "--enter-delay": "180ms" } as React.CSSProperties}>
          <InquiryForm
            defaults={defaults}
            products={products.map((p) => ({ slug: p.slug, name: p.name, soon: p.status === "coming-soon" }))}
            turnstileSiteKey={process.env.TURNSTILE_SITE_KEY}
          />
          <p className="mt-4 text-center text-[0.75rem] text-white/40">
            <Link href="/privacy" className="underline underline-offset-2 hover:text-white/70">
              Privacy policy
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
