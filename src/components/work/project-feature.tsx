import Link from "next/link";
import type { Project } from "@/content/types";
import { accentClasses } from "@/lib/accent";
import { hasCaseStudy, serviceTitle } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Button, TextLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { Stage } from "@/components/sections/stage";

/** Large, alternating showcase row for a project. Coming-soon projects show as a teaser. */
export function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const a = accentClasses[project.accent];
  const phone = project.gallery.find((g) => g.frame === "phone");
  const flip = index % 2 === 1;
  const published = hasCaseStudy(project);
  const stage = (
    <div className="transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-1">
      <Stage accent={project.accent} main={project.hero} phone={phone} />
    </div>
  );
  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <Reveal className={cn("lg:col-span-4", flip && "lg:order-2 lg:col-start-9")}>
        <p className="flex items-center gap-2 text-[0.8rem] font-medium text-ink-2">
          <span className={cn("size-2 rounded-full", a.dot)} />
          {project.clientNamed ? `${project.client} · ${project.sector}` : project.sector}
        </p>
        <h3 className="mt-4 text-h2 font-semibold text-ink">{project.name}</h3>
        {published ? (
          <>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">{project.tagline}</p>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {project.services.map((s) => (
                <li key={s} className="rounded-full bg-canvas px-3 py-1 text-[0.75rem] text-ink-2 ring-1 ring-inset ring-line">
                  {serviceTitle(s)}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {/* Work that became a product can be demoed, not just read about. */}
              {project.productSlug && (
                <Button href={`/contact?project=${project.productSlug}`} arrow>
                  Request a demo
                </Button>
              )}
              <TextLink href={`/work/${project.slug}`}>Read the case study</TextLink>
            </div>
          </>
        ) : (
          <Badge tone="soon" className="mt-5">
            In development
          </Badge>
        )}
      </Reveal>
      <Reveal delay={120} className={cn("lg:col-span-8", flip && "lg:order-1 lg:col-start-1")}>
        {published ? (
          <Link href={`/work/${project.slug}`} className="group block" aria-label={`${project.name} case study`}>
            {stage}
          </Link>
        ) : (
          stage
        )}
      </Reveal>
    </article>
  );
}
