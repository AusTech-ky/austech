import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getNextProject, getProduct, getProject, getProjects, serviceTitle } from "@/lib/content";
import { accentClasses } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { MockupView } from "@/content/types";
import { Mockup } from "@/components/mockups";
import { Stage } from "@/components/sections/stage";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.seo?.title ?? `${project.name} case study`,
    description: project.seo?.description ?? project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${project.name} case study`, description: project.summary, type: "article" },
  };
}

/** Two-column case study section: label on the left, content on the right. */
function Chapter({ n, label, intro, children }: { n: string; label: string; intro: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-16 sm:py-24">
      <Container className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <p className="font-mono text-[0.75rem] text-accent">{n}</p>
          <h2 className="mt-3 text-h3 font-semibold text-ink">{label}</h2>
        </Reveal>
        <div className="lg:col-span-8">
          <Reveal>
            <p className="text-[clamp(1.2rem,1.05rem+0.6vw,1.55rem)] font-medium leading-[1.45] tracking-[-0.015em] text-ink">
              {intro}
            </p>
          </Reveal>
          <div className="mt-10">{children}</div>
        </div>
      </Container>
    </section>
  );
}

function Gallery({ items, accent }: { items: MockupView[]; accent: Parameters<typeof Stage>[0]["accent"] }) {
  const browsers = items.filter((i) => i.frame === "browser");
  const phones = items.filter((i) => i.frame === "phone");
  return (
    <div className="space-y-6">
      {browsers.map((v, i) => (
        <Reveal key={`${v.view}-${i}`}>
          <figure>
            <Stage accent={accent} main={v} compact />
            {v.caption && <figcaption className="mt-3 text-[0.85rem] text-muted">{v.caption}</figcaption>}
          </figure>
        </Reveal>
      ))}
      {phones.length > 0 && (
        <Reveal>
          <div className="grid items-center gap-8 rounded-[1.75rem] bg-canvas p-8 sm:grid-cols-[minmax(0,280px)_1fr] sm:p-12 lg:gap-16">
            <div className="mx-auto w-full max-w-[260px]">
              <Mockup view={phones[0]} />
            </div>
            <div>
              <p className="eyebrow">On the move</p>
              <p className="mt-4 text-h3 font-semibold text-ink">{phones[0].caption}</p>
              <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">
                Every screen is designed mobile-first and works on any modern phone, with no app store download required.
              </p>
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const [next, product] = await Promise.all([
    getNextProject(project.slug),
    project.productSlug ? getProduct(project.productSlug) : null,
  ]);
  const a = accentClasses[project.accent];
  const phone = project.gallery.find((g) => g.frame === "phone");

  const facts = [
    { k: "Client", v: project.client },
    { k: "Sector", v: project.sector },
    { k: "Services", v: project.services.map(serviceTitle).join(", ") },
    { k: "Platform", v: project.platforms.join(", ") },
  ];

  return (
    <article>
      {/* Header */}
      <header className="relative overflow-x-clip pt-28 sm:pt-36">
        <Container>
          <Link
            href="/work"
            className="enter group inline-flex items-center gap-1.5 text-[0.85rem] text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" /> All work
          </Link>
          <p className="enter mt-10 flex items-center gap-2 text-[0.85rem] font-medium text-ink-2" style={{ "--enter-delay": "60ms" } as React.CSSProperties}>
            <span className={cn("size-2 rounded-full", a.dot)} />
            Case study
            {project.status === "live" && (
              <span className="ml-1 rounded-full bg-[#e7f5ee] px-2 py-0.5 text-[0.7rem] font-medium text-positive">Live</span>
            )}
          </p>
          <h1 className="enter mt-4 text-display font-semibold text-ink" style={{ "--enter-delay": "120ms" } as React.CSSProperties}>
            {project.name}
          </h1>
          <p className="enter mt-6 max-w-[44rem] text-lead text-muted" style={{ "--enter-delay": "180ms" } as React.CSSProperties}>
            {project.summary}
          </p>
          <dl className="enter mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 lg:grid-cols-4" style={{ "--enter-delay": "240ms" } as React.CSSProperties}>
            {facts.map((f) => (
              <div key={f.k}>
                <dt className="eyebrow">{f.k}</dt>
                <dd className="mt-2 text-[0.92rem] leading-snug text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Container>
        <Container className="mt-14">
          <div className="enter" style={{ "--enter-delay": "320ms" } as React.CSSProperties}>
            <Stage accent={project.accent} main={project.hero} phone={phone} />
          </div>
        </Container>
      </header>

      <div className="mt-8" />

      <Chapter n="01" label="The challenge" intro={project.challenge.intro}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {project.challenge.points.map((p, i) => (
            <Reveal as="li" key={p} delay={i * 60} className="flex gap-4 rounded-2xl bg-canvas p-5">
              <span className="font-mono text-[0.75rem] leading-6 text-faint">0{i + 1}</span>
              <span className="text-[0.95rem] leading-relaxed text-ink-2">{p}</span>
            </Reveal>
          ))}
        </ul>
      </Chapter>

      <Chapter n="02" label="Our approach" intro={project.approach.intro}>
        <ol className="relative space-y-8 border-l border-line pl-8">
          {project.approach.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 60} className="relative">
              <span className="absolute -left-[37px] top-1 grid size-[17px] place-items-center rounded-full bg-paper ring-1 ring-line-strong">
                <span className={cn("size-[7px] rounded-full", a.dot)} />
              </span>
              <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-ink">{s.title}</h3>
              <p className="mt-2 max-w-2xl text-[0.97rem] leading-relaxed text-muted">{s.description}</p>
            </Reveal>
          ))}
        </ol>
      </Chapter>

      <Chapter n="03" label="The solution" intro={project.solution.intro}>
        <div className="grid gap-px overflow-hidden rounded-card bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
          {project.solution.features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 60} className="bg-paper p-6">
              <span className={cn("block h-0.5 w-6 rounded-full", a.bg)} />
              <h3 className="mt-5 text-[1rem] font-semibold tracking-[-0.01em] text-ink">{f.title}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{f.description}</p>
            </Reveal>
          ))}
        </div>
      </Chapter>

      <section className="border-t border-line py-16 sm:py-24">
        <Container>
          <Reveal>
            <p className="font-mono text-[0.75rem] text-accent">04</p>
            <h2 className="mt-3 text-h3 font-semibold text-ink">A closer look</h2>
          </Reveal>
          <div className="mt-12">
            <Gallery items={project.gallery} accent={project.accent} />
          </div>
        </Container>
      </section>

      <Chapter n="05" label="Business impact" intro={project.impact.intro}>
        <div className="grid gap-4 sm:grid-cols-3">
          {project.impact.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80} className="rounded-card bg-white p-6 ring-1 ring-line">
              {item.metric ? (
                <p className="nums text-[2.4rem] font-semibold tracking-[-0.04em] text-ink">{item.metric}</p>
              ) : (
                <span className={cn("grid size-8 place-items-center rounded-full", a.soft)}>
                  <span className={cn("size-2 rounded-full", a.dot)} />
                </span>
              )}
              <h3 className="mt-6 text-[1.05rem] font-semibold tracking-[-0.01em] text-ink">{item.title}</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{item.description}</p>
            </Reveal>
          ))}
        </div>

        {product && (
          <Reveal className="mt-10 flex flex-col gap-5 rounded-card bg-canvas p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-[1.05rem] font-semibold text-ink">{product.name} is available as a product</p>
              <p className="mt-1 text-[0.92rem] text-muted">{product.tagline}</p>
            </div>
            <Button href={`/products#${product.slug}`} variant="secondary" arrow>
              See {product.name}
            </Button>
          </Reveal>
        )}
      </Chapter>

      {/* Next project */}
      {next && next.slug !== project.slug && (
        <section className="border-t border-line">
          <Container>
            <Link href={`/work/${next.slug}`} className="group flex flex-col gap-4 py-16 sm:flex-row sm:items-end sm:justify-between sm:py-24">
              <div>
                <p className="eyebrow">Next case study</p>
                <p className="mt-4 text-h1 font-semibold text-ink transition-colors group-hover:text-accent">{next.name}</p>
                <p className="mt-3 max-w-xl text-muted">{next.tagline}</p>
              </div>
              <span className="grid size-14 shrink-0 place-items-center rounded-full ring-1 ring-line transition-all duration-300 group-hover:bg-ink group-hover:ring-ink">
                <ArrowRight className="size-5 text-ink transition-all group-hover:translate-x-0.5 group-hover:text-white" />
              </span>
            </Link>
          </Container>
        </section>
      )}

      <CtaBand />
    </article>
  );
}
