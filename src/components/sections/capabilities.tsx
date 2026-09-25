import { ArrowRight, Braces, Globe, LayoutDashboard, Plug, Workflow } from "lucide-react";
import Link from "next/link";
import type { Service } from "@/content/types";
import { Container, Section, SectionHeader } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

export const serviceIcons = {
  globe: Globe,
  layout: LayoutDashboard,
  code: Braces,
  workflow: Workflow,
  plug: Plug,
} as const;

/* Small, quiet illustrations: each hints at the thing, not a stock icon. */

function AppGlyph() {
  return (
    <div className="grid grid-cols-[64px_1fr] gap-3 rounded-xl bg-white p-3 shadow-soft ring-1 ring-line">
      <div className="space-y-1.5">
        <div className="h-2 w-10 rounded-full bg-ink/80" />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={cn("h-2 rounded-full", i === 0 ? "w-12 bg-accent/70" : "w-9 bg-line")} />
        ))}
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-1.5">
          {["62%", "1,204", "18"].map((v) => (
            <div key={v} className="rounded-md bg-canvas px-1.5 py-1">
              <div className="h-1 w-6 rounded-full bg-line-strong" />
              <p className="nums mt-1 text-[10px] font-semibold text-ink">{v}</p>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 160 40" className="h-10 w-full">
          <path d="M0 32 C20 30,30 18,50 20 S80 30,100 16 S140 8,160 6" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
          <path d="M0 32 C20 30,30 18,50 20 S80 30,100 16 S140 8,160 6 L160 40 L0 40Z" fill="var(--color-accent)" opacity="0.07" />
        </svg>
      </div>
    </div>
  );
}

function FlowGlyph() {
  const steps = ["New booking", "Invoice created", "Confirmation sent"];
  return (
    <div className="flex flex-col gap-1.5">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <span
            className={cn(
              "flex h-7 items-center gap-2 rounded-lg bg-white px-2.5 text-[11px] font-medium text-ink shadow-soft ring-1 ring-line",
              i === 1 && "ml-5",
              i === 2 && "ml-10",
            )}
          >
            <span className={cn("size-1.5 rounded-full", i === 2 ? "bg-positive" : "bg-accent")} />
            {s}
          </span>
        </div>
      ))}
    </div>
  );
}

function PlugGlyph() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {["Payments", "Accounting", "WhatsApp", "Telematics", "Email", "Calendar"].map((s) => (
        <span key={s} className="rounded-md bg-white px-2 py-1 text-[11px] text-ink-2 ring-1 ring-line">
          {s}
        </span>
      ))}
    </div>
  );
}

function SiteGlyph() {
  return (
    <div className="rounded-xl bg-white p-3 shadow-soft ring-1 ring-line">
      <div className="flex items-center justify-between">
        <div className="h-1.5 w-8 rounded-full bg-ink/80" />
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1 w-4 rounded-full bg-line-strong" />
          ))}
        </div>
      </div>
      <div className="mt-3 h-2.5 w-3/4 rounded-full bg-ink/80" />
      <div className="mt-1.5 h-2.5 w-1/2 rounded-full bg-ink/80" />
      <div className="mt-2.5 h-1.5 w-2/3 rounded-full bg-line" />
      <div className="mt-3 h-4 w-14 rounded-full bg-accent/80" />
    </div>
  );
}

function CodeGlyph() {
  return (
    <div className="rounded-xl bg-white p-3 font-mono text-[10.5px] leading-[1.7] shadow-soft ring-1 ring-line">
      <p>
        <span className="text-accent">when</span> <span className="text-ink">order.approved</span>
      </p>
      <p className="pl-3 text-muted">
        reserve<span className="text-ink">(stock)</span>
      </p>
      <p className="pl-3 text-muted">
        notify<span className="text-ink">(customer)</span>
      </p>
      <p className="pl-3 text-muted">
        sync<span className="text-ink">(accounts)</span>
      </p>
    </div>
  );
}

const glyphs = {
  "business-apps": AppGlyph,
  "bespoke-software": CodeGlyph,
  websites: SiteGlyph,
  automation: FlowGlyph,
  integrations: PlugGlyph,
} as const;

export function Capabilities({ services }: { services: Service[] }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="What we build"
          title={
            <>
              Software shaped around <span className="accent-serif">how you work</span>
            </>
          }
          intro="From a website that earns trust to the system your whole operation runs on. We design and build the software growing businesses depend on."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            const Glyph = glyphs[s.key];
            const wide = i < 2;
            return (
              <Reveal
                key={s.key}
                delay={i * 60}
                className={cn(wide ? "lg:col-span-3" : "lg:col-span-2", i === 4 && "sm:col-span-2 lg:col-span-2")}
              >
                <Link
                  href={`/services#${s.key}`}
                  className="group flex h-full flex-col rounded-card bg-canvas p-6 ring-1 ring-inset ring-transparent transition-all duration-500 ease-[var(--ease-out-soft)] hover:bg-white hover:shadow-lift hover:ring-line sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-xl bg-white text-ink shadow-soft ring-1 ring-line transition-colors group-hover:text-accent">
                      <Icon className="size-[18px]" strokeWidth={1.8} />
                    </span>
                    <ArrowRight className="size-4 -translate-x-1 text-faint opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-ink group-hover:opacity-100" />
                  </div>
                  <div className={cn("mt-8 flex-1", wide ? "lg:grid lg:grid-cols-[1fr_minmax(0,240px)] lg:gap-8" : "")}>
                    <div>
                      <h3 className="text-h3 font-semibold text-ink">{s.title}</h3>
                      <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{s.short}</p>
                    </div>
                    <div className={cn("mt-7", wide && "lg:mt-0 lg:self-end")}>
                      <Glyph />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
