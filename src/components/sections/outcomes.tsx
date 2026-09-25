import { Eye, HeartHandshake, Zap } from "lucide-react";
import { Container, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

const outcomes = [
  {
    icon: Zap,
    title: "Streamlined operations",
    body: "Less re-keying, chasing and checking. Work moves through the business on its own, and people spend time on what needs a person.",
  },
  {
    icon: HeartHandshake,
    title: "Better customer experience",
    body: "Customers get answers, updates and self-service when they want them, without waiting for office hours or a call back.",
  },
  {
    icon: Eye,
    title: "Operational visibility",
    body: "One live picture of what's happening across the business, so decisions are made on facts, not month-end surprises.",
  },
];

export function Outcomes() {
  return (
    <Section className="pb-0! sm:pb-0! lg:pb-0!">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Why it matters</p>
            <h2 className="mt-4 text-h2 font-semibold text-ink">
              We measure software by what it <span className="accent-serif">changes.</span>
            </h2>
            <p className="mt-5 max-w-md text-lead text-muted">
              Not by features or frameworks. Every project starts with the outcome you want and works backwards.
            </p>
          </Reveal>
          <ul className="divide-y divide-line border-y border-line lg:col-span-7">
            {outcomes.map(({ icon: Icon, title, body }, i) => (
              <Reveal
                as="li"
                key={title}
                delay={i * 80}
                className="grid gap-3 py-7 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8"
              >
                <h3 className="flex items-center gap-3 text-[1.1rem] font-semibold tracking-[-0.02em] text-ink">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft">
                    <Icon className="size-[18px] text-accent" strokeWidth={1.8} />
                  </span>
                  {title}
                </h3>
                <p className="text-[0.97rem] leading-relaxed text-muted">{body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
