import Image from "next/image";
import type { TeamMember } from "@/content/types";
import { Container, Section, SectionHeader } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

/** Renders nothing until `src/content/team.ts` has entries. */
export function TeamGrid({ team }: { team: TeamMember[] }) {
  if (team.length === 0) return null;
  return (
    <Section>
      <Container>
        <SectionHeader eyebrow="Team" title="The people you'll work with" />
        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal as="li" key={m.name} delay={(i % 4) * 60}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-canvas ring-1 ring-line">
                {m.image ? (
                  <Image src={m.image} alt={m.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-4xl font-semibold tracking-[-0.04em] text-faint">
                    {m.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </div>
                )}
              </div>
              <p className="mt-4 font-semibold text-ink">{m.name}</p>
              <p className="text-[0.9rem] text-muted">{m.role}</p>
              {m.bio && <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-2">{m.bio}</p>}
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
