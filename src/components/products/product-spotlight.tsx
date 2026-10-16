import { CheckCircle2, Mail } from "lucide-react";
import type { Product, Spotlight } from "@/content/types";
import { Mockup } from "@/components/mockups";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { panelLayers, panelThemes } from "@/lib/panel-themes";

/** Roster's app mark from manage.ky: a person on a white disc, in Roster orange. */
function RosterMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden>
      <circle cx="256" cy="256" r="248" fill="#fff" />
      <g transform="translate(256 256) scale(.86) translate(-268 -262)" fill="#e2580b">
        <path d="M168 341V292A49 49 0 0 1 266 292V341" fill="none" stroke="#e2580b" strokeWidth="42" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="217" cy="160" r="30" />
        <circle cx="352" cy="334" r="28" />
      </g>
    </svg>
  );
}

/** Fuel Up's app icon: a navy pump with a yellow nozzle on a cream tile. */
function FuelUpMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 72" className={className} aria-hidden>
      <rect x="2" y="2" width="68" height="68" rx="18" fill="#f3e8c0" />
      <rect x="20" y="17" width="25" height="38" rx="3.5" fill="#2f5288" />
      <rect x="18" y="53" width="29" height="6" rx="2" fill="#2f5288" />
      <rect x="25" y="22" width="15" height="10" rx="2" fill="#f3e8c0" />
      <path d="M45 41h2a2 2 0 0 1 2 2v8a2 2 0 0 0 4 0V37" fill="none" stroke="#2f5288" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M48.5 22.5l3.5-1.5 5 8.5-.5 4.5-3.5 2.5-2.5-6z" fill="#ebc546" />
    </svg>
  );
}

const marks: Record<string, (p: { className?: string }) => React.ReactElement> = { roster: RosterMark, "fuel-up": FuelUpMark };

const noteIcons = { check: CheckCircle2, mail: Mail };

/**
 * A home page panel for one of our products: dark, in the product's own
 * colours, with its real screens and the way to get it.
 */
export function ProductSpotlight({ product, spotlight }: { product: Product; spotlight: Spotlight }) {
  const t = panelThemes[product.accent];
  const Mark = marks[product.slug];
  const screens = spotlight.screens ?? product.screens;
  const browser = screens.find((s) => s.frame === "browser") ?? screens[0];
  const phone = screens.find((s) => s.frame === "phone");
  const site = product.website;
  const lockup = site ? { href: site.href, small: site.label } : { href: `/products#${product.slug}`, small: product.category };

  return (
    <div id={product.slug} className={cn("relative isolate scroll-mt-20 overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]", t.bg)}>
      <div aria-hidden className={cn(panelLayers.glow, t.glow)} />
      <div aria-hidden className={cn(panelLayers.grid, t.grid)} />

      <div className="px-6 pt-10 sm:px-10 sm:pt-14 lg:px-16 lg:pt-16">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <a
            href={lockup.href}
            {...(site ? { target: "_blank", rel: "noopener" } : {})}
            className="inline-flex items-center gap-3 rounded-full bg-white/[0.06] py-1.5 pl-1.5 pr-4 text-left ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/10"
          >
            {Mark && <Mark className="size-9" />}
            <span className="grid leading-none">
              <span className="text-[0.7rem] text-white/55">{lockup.small}</span>
              <span className="mt-0.5 text-[1.05rem] font-medium tracking-[-0.01em] text-white">{product.name}</span>
            </span>
            {product.badge && (
              <span className={cn("ml-1 rounded-full px-2 py-0.5 text-[0.68rem] font-semibold text-white", t.badge)}>
                {product.badge}
              </span>
            )}
          </a>

          <h2 className="mt-8 text-h1 font-semibold text-white">
            {spotlight.title} <span className={cn("accent-serif sm:whitespace-nowrap", t.accent)}>{spotlight.accent}</span>
          </h2>
          <p className="mt-5 max-w-xl text-lead text-white/65">{spotlight.lead}</p>

          <ul className="mt-7 flex flex-wrap justify-center gap-2">
            {spotlight.points.map((p) => (
              <li
                key={p}
                className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] py-1.5 pl-2.5 pr-3.5 text-[0.85rem] text-white/80 ring-1 ring-inset ring-white/10"
              >
                <CheckCircle2 className={cn("size-3.5 shrink-0", t.dot)} />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button
              href={site?.href ?? `/contact?project=${product.slug}`}
              size="lg"
              arrow
              className="bg-white! text-ink! hover:bg-white/90!"
            >
              {site ? `Visit ${site.label}` : product.status === "coming-soon" ? "Join the early access list" : "Request a demo"}
            </Button>
            {product.caseStudySlug && (
              <Button
                href={`/work/${product.caseStudySlug}`}
                size="lg"
                arrow
                className="bg-white/[0.06]! text-white! shadow-none! ring-1 ring-white/15 hover:bg-white/10!"
              >
                Read the case study
              </Button>
            )}
          </div>
        </Reveal>

        <Reveal delay={120} className="relative mx-auto mt-14 max-w-[1000px] sm:mt-16">
          <div className={phone ? "relative pr-[12%]" : "relative"}>
            <Mockup view={browser} className="rounded-b-none! shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]!" />
            {phone && (
              <div className="absolute bottom-[-3%] right-0 w-[22%]">
                <Mockup view={phone} />
              </div>
            )}
          </div>

          {spotlight.notes.map((n, i) => {
            const Icon = noteIcons[n.icon];
            return (
              <div
                key={n.title}
                className={cn(
                  "absolute -left-4 hidden w-[260px]",
                  i === 0 ? "top-[24%] md:block lg:-left-12" : "top-[50%] lg:-left-6 lg:block",
                )}
              >
                <div className="flex items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-lift ring-1 ring-ink/5 backdrop-blur">
                  <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl", t.badge)}>
                    <Icon className="size-4 text-white" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.8rem] font-medium text-ink">{n.title}</p>
                    <p className="text-[0.72rem] text-muted">{n.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </div>
  );
}

/** The home page's products, as panels, under one heading. */
export function ProductSpotlights({ products, header }: { products: Product[]; header: React.ReactNode }) {
  const lit = products.filter((p) => p.spotlight);
  if (!lit.length) return null;
  return (
    <section className="pt-20 sm:pt-28 lg:pt-32">
      <Container>
        {header}
        <div className="mt-14 space-y-6 sm:mt-16">
          {lit.map((p) => (
            <ProductSpotlight key={p.slug} product={p} spotlight={p.spotlight!} />
          ))}
        </div>
      </Container>
    </section>
  );
}
