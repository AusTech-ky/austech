import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { PageHeader } from "@/components/sections/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { ProjectCard } from "@/components/work/project-card";
import { Container } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies of software we've designed and built: fuel management platforms, incoming-stock and warehouse systems, live vehicle tracking and shared WhatsApp inboxes for businesses in the Cayman Islands.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const projects = await getProjects();
  const [first, ...rest] = projects;

  return (
    <>
      <PageHeader
        title={
          <>
            Software in production, <span className="accent-serif">doing real work</span>
          </>
        }
        lead="A selection of platforms we've designed and built. Each one started with a business problem, not a feature list."
      />

      <section className="pb-24 sm:pb-32">
        <Container>
          {first && (
            <Reveal>
              <ProjectCard project={first} large />
            </Reveal>
          )}
          <div className="mt-20 grid gap-x-6 gap-y-20 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title={
          <>
            Your project could be <span className="accent-serif">next.</span>
          </>
        }
        body="If you've got a process, product or platform idea you'd like to talk through, we'd love to hear about it."
      />
    </>
  );
}
