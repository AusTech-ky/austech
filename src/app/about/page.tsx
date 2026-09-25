import type { Metadata } from "next";
import { site } from "@/content/site";
import { getTeam } from "@/lib/content";
import { PageHeader } from "@/components/sections/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { TeamGrid } from "@/components/about/team-grid";
import { Container, Section, SectionHeader } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a software company in the Cayman Islands. We believe technology should make businesses simpler, and we build software to prove it.`,
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Outcomes over output",
    body: "We measure our work by what changes in your business: time saved, customers served, decisions made with better information.",
  },
  {
    title: "Simple is harder, and worth it",
    body: "Anyone can add features. The craft is in removing steps, choosing sensible defaults and making the right thing obvious.",
  },
  {
    title: "Close to the work",
    body: "We spend time where the software will be used: the front desk, the forecourt, the yard. That's where the real requirements are.",
  },
  {
    title: "Built to last",
    body: "Clear code, sound architecture and proper documentation, so your software stays an asset, not a liability, for years.",
  },
  {
    title: "Honest advice",
    body: "Sometimes the right answer is an off-the-shelf tool, or a smaller first step. We'll tell you, even when it means less work for us.",
  },
  {
    title: "You own it",
    body: "Bespoke work belongs to you: the code, the data and the freedom to take it anywhere.",
  },
];

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            Technology should make business <span className="accent-serif text-accent">simpler.</span>
          </>
        }
      />

      <section className="border-t border-line py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Our view</p>
          </Reveal>
          <div className="space-y-6 text-[clamp(1.15rem,1.05rem+0.4vw,1.4rem)] leading-[1.6] tracking-[-0.01em] text-ink-2 lg:col-span-8">
            <Reveal as="div">
              <p>
                Too much business software makes work more complicated, not less. Tools that don&apos;t fit, systems
                that don&apos;t talk to each other, and processes bent around whatever the software happens to allow.
              </p>
            </Reveal>
            <Reveal as="div">
              <p>
                {site.name} exists to do the opposite. We&apos;re a software company based in {site.location.region}, and
                we build the products, applications and websites that help growing businesses work the way they
                should: <span className="text-ink">fewer manual steps, happier customers, and a clear view of what&apos;s going on.</span>
              </p>
            </Reveal>
            <Reveal as="div">
              <p>
                We think like a product company, not an agency. That means caring about how software is used long
                after launch, and building our own products alongside our client work, held to the same standard.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section tone="canvas">
        <Container>
          <SectionHeader eyebrow="Principles" title="What we hold ourselves to" />
          <div className="mt-14 grid gap-px overflow-hidden rounded-card bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 70} className="bg-paper p-7 sm:p-8">
                <span className="font-mono text-[0.75rem] text-accent">0{i + 1}</span>
                <h3 className="mt-8 text-[1.15rem] font-semibold tracking-[-0.02em] text-ink">{p.title}</h3>
                <p className="mt-2.5 text-[0.93rem] leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Where we are</p>
            <h2 className="mt-4 text-h2 font-semibold text-ink">
              Local to Cayman. <span className="accent-serif">Built to world standards.</span>
            </h2>
          </Reveal>
          <Reveal delay={80} className="space-y-5 text-[1.05rem] leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
            <p>
              We know how business works here: the pace, the customers, the channels people actually use. That&apos;s
              why WhatsApp integrations, local payment flows and island logistics show up in our work.
            </p>
            <p>
              We work in person with clients across the Cayman Islands and remotely with businesses throughout the
              Caribbean and beyond, using the same modern tools and practices as the best product teams anywhere.
            </p>
          </Reveal>
        </Container>
      </section>

      <TeamGrid team={team} />

      <CtaBand />
    </>
  );
}
