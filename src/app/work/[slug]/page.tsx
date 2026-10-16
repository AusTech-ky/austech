import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getCaseStudies, getNextProject, getProduct, getProject, serviceTitle } from "@/lib/content";
import { accentClasses } from "@/lib/accent";
import { cn } from "@/lib/cn";
import { panelLayers, panelThemes } from "@/lib/panel-themes";
import type { MockupView } from "@/content/types";
import { Mockup } from "@/components/mockups";
import { Stage } from "@/components/sections/stage";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { StickyProductBar } from "@/components/work/sticky-product-bar";
import { ChapterBar } from "@/components/work/chapter-bar";
import { CaseStory } from "@/components/work/case-story";

export async function generateStaticParams() {
  return (await getCaseStudies()).map((p) => ({ slug: p.slug }));
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
function Chapter({
  id,
  n,
  label,
  intro,
  tone,
  className,
  children,
}: {
  id?: string;
  n: string;
  label: string;
  intro: string;
  /** Colour of the chapter number. */
  tone: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-32 border-t border-line py-16 sm:py-24", className)}>
      <Container className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <p className={cn("font-mono text-[0.75rem]", tone)}>{n}</p>
          <h2 className="mt-3 text-h3 font-semibold text-ink">{label}</h2>
        </Reveal>
        <div className="lg:col-span-8">
          <Reveal>
            <p className="text-[clamp(1.2rem,1.05rem+0.6vw,1.55rem)] font-medium leading-[1.45] tracking-[-0.015em] text-ink">
              {intro}
            </p>
          </Reveal>
          {children && <div className="mt-10">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

function Gallery({ items, accent }: { items: MockupView[]; accent: Parameters<typeof Stage>[0]["accent"] }) {
  // Browser and tablet shots alternate sides; a shot's phone companion overlaps its corner.
  const browsers = items.filter((i) => i.frame !== "phone");
  const phones = items.filter((i) => i.frame === "phone");
  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Picture about three-quarters wide, what it shows beside it; sides alternate row to row. */}
      {browsers.map((v, i) => (
        <Reveal key={i}>
          <figure className="grid items-center gap-6 lg:grid-cols-12 lg:gap-12">
            <div className={cn("lg:col-span-9", i % 2 === 1 && "lg:order-2 lg:col-start-4")}>
              <Stage accent={accent} main={v} phone={"screenshot" in v ? v.companion : undefined} compact />
            </div>
            {(v.title || v.caption) && (
              <figcaption className={cn("lg:col-span-3", i % 2 === 1 && "lg:order-1 lg:col-start-1 lg:row-start-1")}>
                {v.title && <p className="text-[1.2rem] font-semibold tracking-[-0.02em] text-ink">{v.title}</p>}
                {v.caption && <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{v.caption}</p>}
              </figcaption>
            )}
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
              <p className="text-h3 font-semibold text-ink">{phones[0].caption}</p>
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
  const { challenge, approach, solution, impact } = project;
  if (!challenge || !approach || !solution || !impact) notFound();

  const [next, product] = await Promise.all([
    getNextProject(project.slug),
    project.productSlug ? getProduct(project.productSlug) : null,
  ]);
  const a = accentClasses[project.accent];
  const t = panelThemes[project.accent];
  const phone = project.gallery.find((g) => g.frame === "phone");
  const { headline, glance, story } = project;

  const facts = [
    ...(project.clientNamed ? [{ k: "Client", v: project.client }] : []),
    { k: "Sector", v: project.sector },
    { k: "Services", v: project.services.map(serviceTitle).join(", ") },
    { k: "Platform", v: project.platforms.join(", ") },
  ];

  const chapters = [
    { id: "challenge", label: "Challenge" },
    { id: "approach", label: "Approach" },
    { id: "solution", label: "Solution" },
    story ? { id: "story", label: story.title } : { id: "closer-look", label: "Closer look" },
    { id: "impact", label: "Impact" },
  ];

  const enter = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

  return (
    <article>
      {/* Header: a dark panel in the product's own colours, with its real screens rising out of the bottom. */}
      <header className="pt-20 sm:pt-24">
        <Container>
          <div className={cn("relative isolate overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]", t.bg)}>
            <div aria-hidden className={cn(panelLayers.glow, t.glow)} />
            <div aria-hidden className={cn(panelLayers.grid, t.grid)} />

            <div className="px-5 pt-7 sm:px-10 sm:pt-10 lg:px-16 lg:pt-12">
              <Link
                href="/work"
                className="enter group inline-flex items-center gap-1.5 text-[0.85rem] text-white/55 transition-colors hover:text-white"
              >
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" /> All work
              </Link>
              <p className="enter mt-9 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.85rem] text-white/60 sm:mt-12" style={enter(60)}>
                <span className={cn("size-2 rounded-full", t.badge)} />
                <span className="font-medium text-white">{project.name}</span>
                <span className="text-white/30">·</span>
                Case study
                {project.status === "live" && (
                  <span className="ml-1 rounded-full bg-[#13915f]/20 px-2 py-0.5 text-[0.7rem] font-medium text-[#7ee2b4] ring-1 ring-inset ring-[#7ee2b4]/25">
                    Live
                  </span>
                )}
              </p>
              <h1 className="enter mt-5 max-w-4xl text-h1 font-semibold text-white" style={enter(120)}>
                {headline ? (
                  <>
                    <span className="sr-only">{project.name}: </span>
                    {headline.title} <span className={cn("accent-serif", t.accent)}>{headline.accent}</span>
                  </>
                ) : (
                  project.name
                )}
              </h1>
              <p className="enter mt-6 max-w-[44rem] text-lead text-white/65" style={enter(180)}>
                {project.summary}
              </p>

              {glance && (
                <dl className="enter mt-10 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4" style={enter(240)}>
                  {glance.map((g) => (
                    <div key={g.title} className="rounded-2xl bg-white/[0.05] p-4 ring-1 ring-inset ring-white/10 sm:p-5">
                      <dt className="text-[clamp(1.2rem,0.95rem+1vw,1.7rem)] font-semibold leading-tight tracking-[-0.03em] text-white">
                        {g.title}
                      </dt>
                      <dd className="mt-1.5 text-[0.82rem] leading-snug text-white/60 sm:text-[0.88rem]">{g.detail}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div
                className={cn("enter relative mx-auto mt-12 max-w-[1000px] sm:mt-14", project.hero.frame !== "browser" && "-mb-[5%]")}
                style={enter(320)}
              >
                <div className={cn("relative", phone && "pr-[12%]")}>
                  <Mockup view={project.hero} className="rounded-b-none! shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]!" />
                  {phone && (
                    <div className="absolute bottom-[-3%] right-0 w-[22%]">
                      <Mockup view={phone} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <dl className="enter mt-8 grid grid-cols-2 gap-x-6 gap-y-5 px-1 sm:mt-10 sm:px-10 lg:grid-cols-4 lg:px-16" style={enter(380)}>
            {facts.map((f) => (
              <div key={f.k}>
                <dt className="eyebrow">{f.k}</dt>
                <dd className="mt-2 text-[0.92rem] leading-snug text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </header>

      {/* The chapters, with their bar pinned under the site header while they're on screen. */}
      <div>
      <ChapterBar chapters={chapters} activeClass={t.bg} />

      <Chapter id="challenge" n="01" label="The challenge" intro={challenge.intro} tone={a.text}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {challenge.points.map((p, i) => (
            <Reveal as="li" key={p} delay={i * 60} className="flex gap-4 rounded-2xl bg-canvas p-5">
              <span className="font-mono text-[0.75rem] leading-6 text-faint">0{i + 1}</span>
              <span className="text-[0.95rem] leading-relaxed text-ink-2">{p}</span>
            </Reveal>
          ))}
        </ul>
      </Chapter>

      <Chapter id="approach" n="02" label="Our approach" intro={approach.intro} tone={a.text}>
        <ol className="relative space-y-8 border-l border-line pl-8">
          {approach.steps.map((s, i) => (
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

      <Chapter id="solution" n="03" label="The solution" intro={solution.intro} tone={a.text} className="pb-10 sm:pb-12" />
      {/* Features span the full width under the chapter heading, four across, so the grid fills evenly. */}
      <section className="pb-16 sm:pb-24">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-card bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
            {solution.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 4) * 60} className="bg-paper p-6">
                <span className={cn("block h-0.5 w-6 rounded-full", a.bg)} />
                <h3 className="mt-5 text-[1rem] font-semibold tracking-[-0.01em] text-ink">{f.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{f.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {story ? (
        <>
          <Chapter id="story" n="04" label={story.title} intro={story.intro} tone={a.text} className="pb-8 sm:pb-10 lg:pb-0" />
          <section className="pb-16 sm:pb-24 lg:pb-12">
            <Container>
              <CaseStory story={story} accent={project.accent} />
            </Container>
          </section>
        </>
      ) : (
        <section id="closer-look" className="scroll-mt-32 border-t border-line py-16 sm:py-24">
          <Container>
            <Reveal>
              <p className={cn("font-mono text-[0.75rem]", a.text)}>04</p>
              <h2 className="mt-3 text-h3 font-semibold text-ink">A closer look</h2>
            </Reveal>
            <div className="mt-12">
              <Gallery items={project.gallery} accent={project.accent} />
            </div>
          </Container>
        </section>
      )}

      <Chapter id="impact" n="05" label="Business impact" intro={impact.intro} tone={a.text}>
        <div className="grid gap-4 sm:grid-cols-3">
          {impact.items.map((item, i) => (
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
          <div id="product-cta" className="mt-10">
          <Reveal className="flex flex-col gap-5 rounded-card bg-canvas p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-[1.05rem] font-semibold text-ink">
                {product.website ? `${product.name} is now part of ${product.website.label}` : `${product.name} is available as a product`}
                {product.international && (
                  <span className="font-normal text-muted"> (including for companies outside the Cayman Islands)</span>
                )}
              </p>
              <p className="mt-1 text-[0.92rem] text-muted">{product.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.website ? (
                <Button href={product.website.href} arrow>
                  Visit {product.website.label}
                </Button>
              ) : (
                <Button href={`/contact?project=${product.slug}`} arrow>
                  Request a demo
                </Button>
              )}
              <Button href={`/products#${product.slug}`} variant="secondary">
                See {product.name}
              </Button>
            </div>
          </Reveal>
          </div>
        )}
      </Chapter>
      </div>

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
      {product && (
        <StickyProductBar
          name={product.name}
          slug={product.slug}
          tagline={product.tagline}
          international={product.international}
          website={product.website}
        />
      )}
    </article>
  );
}
