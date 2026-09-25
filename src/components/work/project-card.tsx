import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { accentClasses } from "@/lib/accent";
import { serviceTitle } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Stage } from "@/components/sections/stage";

export function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  const a = accentClasses[project.accent];
  const phone = large ? project.gallery.find((g) => g.frame === "phone") : undefined;
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-1">
        <Stage accent={project.accent} main={project.hero} phone={phone} />
      </div>
      <div className={cn("mt-6 flex items-start justify-between gap-6", large && "lg:mt-8")}>
        <div className="max-w-xl">
          <p className="flex items-center gap-2 text-[0.8rem] font-medium text-ink-2">
            <span className={cn("size-2 rounded-full", a.dot)} />
            {project.client} · {project.sector}
          </p>
          <h2 className={cn("mt-3 font-semibold text-ink", large ? "text-h2" : "text-h3")}>{project.name}</h2>
          <p className="mt-2 text-[1rem] leading-relaxed text-muted">{project.tagline}</p>
          <p className="mt-4 text-[0.8rem] text-faint">{project.services.map(serviceTitle).join(" · ")}</p>
        </div>
        <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full ring-1 ring-line transition-all duration-300 group-hover:bg-ink group-hover:ring-ink">
          <ArrowUpRight className="size-4 text-ink transition-colors group-hover:text-white" />
        </span>
      </div>
    </Link>
  );
}
