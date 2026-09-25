import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getEngagementModels, getProcess, getServices } from "@/lib/content";
import { PageHeader } from "@/components/sections/page-header";
import { Process } from "@/components/sections/process";
import { CtaBand } from "@/components/sections/cta-band";
import { serviceIcons } from "@/components/sections/capabilities";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeader } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business applications, bespoke software, modern websites, automation and integrations, each tied to a real business problem and a measurable outcome.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const [services, models, steps] = await Promise.all([getServices(), getEngagementModels(), getProcess()]);

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Start with the problem. <span className="accent-serif text-accent">Build the fix.</span>
          </>
        }
        lead="We don't sell technology for its own sake. Each of our services exists to solve a problem growing businesses tell us about, and each is measured by what changes afterwards."
      >
        <nav aria-label="Services" className="flex flex-wrap gap-2">
          {services.map((s) => (
            <a
              key={s.key}
              href={`#${s.key}`}
              className="rounded-full bg-white px-3.5 py-1.5 text-[0.85rem] text-ink-2 ring-1 ring-line transition-colors hover:text-ink hover:ring-ink/20"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="border-t border-line">
        {services.map((s, i) => {
          const Icon = serviceIcons[s.icon];
          return (
            <section key={s.key} id={s.key} className="scroll-mt-20 border-b border-line">
              <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-12 lg:gap-12">
                <Reveal className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 place-items-center rounded-xl bg-white text-accent shadow-soft ring-1 ring-line">
                        <Icon className="size-5" strokeWidth={1.8} />
                      </span>
                      <span className="font-mono text-[0.75rem] text-faint">0{i + 1}</span>
                    </div>
                    <h2 className="mt-6 text-h2 font-semibold text-ink">{s.title}</h2>
                    <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">{s.short}</p>
                  </div>
                </Reveal>

                <div className="space-y-10 lg:col-span-7 lg:col-start-6">
                  <Reveal>
                    <p className="eyebrow">The problem</p>
                    <blockquote className="mt-4 font-serif text-[clamp(1.5rem,1.2rem+1.2vw,2.1rem)] leading-[1.3] tracking-[-0.01em] text-ink">
                      {s.problem}
                    </blockquote>
                  </Reveal>
                  <Reveal>
                    <p className="eyebrow">How we help</p>
                    <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-2">{s.approach}</p>
                  </Reveal>
                  <Reveal className="grid gap-8 rounded-card bg-canvas p-6 sm:grid-cols-2 sm:p-8">
                    <div>
                      <p className="eyebrow">Outcomes</p>
                      <ul className="mt-4 space-y-3">
                        {s.outcomes.map((o) => (
                          <li key={o} className="flex gap-3 text-[0.95rem] leading-snug text-ink">
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft">
                              <Check className="size-3 text-accent" strokeWidth={2.5} />
                            </span>
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="eyebrow">Typical deliverables</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {s.deliverables.map((d) => (
                          <li key={d} className="rounded-full bg-white px-3 py-1.5 text-[0.82rem] text-ink-2 ring-1 ring-line">
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Ways to work together"
            title="Engagements that fit the stage you're at"
            intro="Whether you need a single well-defined project or a long-term product team, the way we work stays the same: open, iterative and focused on outcomes."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {models.map((m, i) => (
              <Reveal key={m.title} delay={i * 80} className="rounded-card bg-white p-7 ring-1 ring-line">
                <span className="font-mono text-[0.75rem] text-accent">0{i + 1}</span>
                <h3 className="mt-8 text-[1.2rem] font-semibold tracking-[-0.02em] text-ink">{m.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{m.description}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/contact" arrow>
              Discuss your project
            </Button>
          </div>
        </Container>
      </Section>

      <Process steps={steps} tone="canvas" />
      <div className="pt-20 sm:pt-28" />
      <CtaBand />
    </>
  );
}
