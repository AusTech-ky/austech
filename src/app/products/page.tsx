import type { Metadata } from "next";
import Link from "next/link";
import type { Product } from "@/content/types";
import { getProducts } from "@/lib/content";
import { accentClasses } from "@/lib/accent";
import { cn } from "@/lib/cn";
import { PageHeader } from "@/components/sections/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { Stage } from "@/components/sections/stage";
import { PricingBlock } from "@/components/products/pricing";
import { Button, TextLink } from "@/components/ui/button";
import { Badge, Container } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Software products from Austech: a shared WhatsApp team inbox, a fuel management platform for station networks, and property management and HR platforms coming soon.",
  alternates: { canonical: "/products" },
};

function ProductSection({ product, index }: { product: Product; index: number }) {
  const a = accentClasses[product.accent];
  const soon = product.status === "coming-soon";
  const browser = product.screens.find((s) => s.frame === "browser") ?? product.screens[0];
  const phone = product.screens.find((s) => s.frame === "phone");

  return (
    <section id={product.slug} className={cn("scroll-mt-16 py-20 sm:py-28", index % 2 === 1 && "bg-canvas")}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="flex items-center gap-2 text-[0.85rem] font-medium text-ink-2">
                <span className={cn("size-2 rounded-full", a.dot)} />
                {product.category}
              </span>
              {soon ? <Badge tone="soon">Coming soon</Badge> : <Badge>Available now</Badge>}
            </div>
            <h2 className="mt-5 text-h1 font-semibold text-ink">{product.name}</h2>
            <p className="mt-3 text-h3 font-medium text-ink-2">{product.tagline}</p>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-6 lg:col-start-7 lg:pt-2">
            <p className="text-[1.05rem] leading-relaxed text-muted">{product.description}</p>
            <p className="mt-4 text-[0.9rem] font-medium text-ink">{product.audience}</p>
            {product.international && (
              <p className="mt-1 text-[0.85rem] text-muted">(Available for companies outside the Cayman Islands too.)</p>
            )}
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              {soon ? (
                <Button href={`/contact?project=${product.slug}`} arrow>
                  Join the early access list
                </Button>
              ) : (
                <Button href={`/contact?project=${product.slug}`} arrow>
                  Request a demo
                </Button>
              )}
              {product.caseStudySlug && <TextLink href={`/work/${product.caseStudySlug}`}>Read the case study</TextLink>}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <div className={cn(soon && "relative")}>
            <Stage accent={product.accent} main={browser} phone={phone} />
            {soon && (
              <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
                <span className="rounded-full bg-white/90 px-3 py-1.5 text-[0.75rem] font-medium text-ink-2 shadow-soft ring-1 ring-line backdrop-blur">
                  Preview · in development
                </span>
              </div>
            )}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {product.features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 60}>
              <span className={cn("block h-0.5 w-6 rounded-full", a.bg)} />
              <h3 className="mt-4 text-[1.02rem] font-semibold tracking-[-0.01em] text-ink">{f.title}</h3>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-muted">{f.description}</p>
            </Reveal>
          ))}
        </div>

        {product.pricing.model !== "none" && (
          <div className="mt-16">
            <PricingBlock pricing={product.pricing} productName={product.name} />
          </div>
        )}
      </Container>
    </section>
  );
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <PageHeader
        title={
          <>
            Our own software, <span className="accent-serif">ready to use</span>
          </>
        }
        lead="Some problems come up for business after business. We turn our best solutions into focused products, built with the same care as our bespoke work and shaped by the people who use them."
      >
        <nav aria-label="Products" className="flex flex-wrap gap-2">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`#${p.slug}`}
              className="flex items-center gap-2 rounded-full bg-white py-1.5 pl-3 pr-3.5 text-[0.85rem] text-ink-2 ring-1 ring-line transition-colors hover:text-ink hover:ring-ink/20"
            >
              <span className={cn("size-1.5 rounded-full", accentClasses[p.accent].dot)} />
              {p.name}
              {p.status === "coming-soon" && (
                <span className="rounded-full bg-accent-soft px-1.5 py-px text-[0.65rem] font-medium text-navy">Soon</span>
              )}
            </Link>
          ))}
        </nav>
      </PageHeader>

      <div className="border-t border-line">
        {products.map((p, i) => (
          <ProductSection key={p.slug} product={p} index={i} />
        ))}
      </div>

      <div className="pt-20 sm:pt-28" />
      <CtaBand
        title={
          <>
            Need something a product <span className="accent-serif">can&apos;t do?</span>
          </>
        }
        body="Our products are a starting point. We can extend them, integrate them with your systems, or build something entirely your own."
      />
    </>
  );
}
