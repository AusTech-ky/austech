import { Container, Section, SectionHeader } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

export function Process({ steps, tone = "paper" }: { steps: { title: string; description: string }[]; tone?: "paper" | "canvas" }) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeader
          title={
            <>
              Clear steps. <span className="accent-serif">No black boxes.</span>
            </>
          }
          intro="You see working software early and often, and you're part of every decision that shapes it."
        />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-card bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80} className="bg-paper p-7 sm:p-8">
              <span className="font-mono text-[0.75rem] text-accent">0{i + 1}</span>
              <h3 className="mt-10 text-[1.2rem] font-semibold tracking-[-0.02em] text-ink">{s.title}</h3>
              <p className="mt-2.5 text-[0.93rem] leading-relaxed text-muted">{s.description}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
