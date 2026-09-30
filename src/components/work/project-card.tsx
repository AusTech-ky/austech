import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { accentClasses } from "@/lib/accent";
import { hasCaseStudy, serviceTitle } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/layout";
import { Stage } from "@/components/sections/stage";

export function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  const a = accentClasses[project.accent];
  const phone = large ? project.gallery.find((g) => g.frame === "phone") : undefined;
  const published = hasCaseStudy(project);
  const body = (
    <>
      <div className="transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-1">
        <Stage accent={project.accent} main={project.hero} phone={phone} />
      </div>
      <div className={cn("mt-6 flex items-start justify-between gap-6", large && "lg:mt-8")}>
        <div className="max-w-xl">
          <p className="flex items-center gap-2 text-[0.8rem] font-medium text-ink-2">
            <span className={cn("size-2 rounded-full", a.dot)} />
            {project.clientNamed ? `${project.client} · ${project.sector}` : project.sector}
          </p>
          <h2 className={cn("mt-3 font-semibold text-ink", large ? "text-h2" : "text-h3")}>{project.name}</h2>
          {published ? (
            <>
              <p className="mt-2 text-[1rem] leading-relaxed text-muted">{project.tagline}</p>
              <p className="mt-4 text-[0.8rem] text-faint">{project.services.map(serviceTitle).join(" · ")}</p>
            </>
          ) : (
            <Badge tone="soon" className="mt-3">
              In development
            </Badge>
          )}
        </div>
        {published && (
          <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full ring-1 ring-line transition-all duration-300 group-hover:bg-navy group-hover:ring-navy">
            <ArrowUpRight className="size-4 text-ink transition-colors group-hover:text-white" />
          </span>
        )}
      </div>
    </>
  );
  return published ? (
    <Link href={`/work/${project.slug}`} className="group block">
      {body}
    </Link>
  ) : (
    <div>{body}</div>
  );
}
