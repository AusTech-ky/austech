import { getFeaturedProjects, getProcess, getProducts, getServices } from "@/lib/content";
import { Hero } from "@/components/sections/hero";
import { Outcomes } from "@/components/sections/outcomes";
import { Capabilities } from "@/components/sections/capabilities";
import { Process } from "@/components/sections/process";
import { CtaBand } from "@/components/sections/cta-band";
import { ProjectFeature } from "@/components/work/project-feature";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeader } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

export default async function HomePage() {
  const [projects, products, services, steps] = await Promise.all([
    getFeaturedProjects(),
    getProducts(),
    getServices(),
    getProcess(),
  ]);

  return (
    <>
      <Hero />
      <Outcomes />
      <Capabilities services={services} />

      {/* Selected work */}
      <Section tone="canvas" id="work">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader
              title={
                <>
                  Software people <span className="accent-serif">rely on</span>, every day
                </>
              }
              intro="Platforms we've designed and built for businesses in the Cayman Islands, running in production."
            />
            <Button href="/work" variant="secondary" arrow className="self-start sm:self-auto">
              All work
            </Button>
          </div>
          <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
            {projects.map((p, i) => (
              <ProjectFeature key={p.slug} project={p} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Products */}
      <Section>
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader
              title={
                <>
                  Ready-made platforms, built <span className="accent-serif">the same way</span>
                </>
              }
              intro="Some problems come up again and again. So we turned our best solutions into products you can start using quickly."
            />
            <Button href="/products" variant="secondary" arrow className="self-start sm:self-auto">
              All products
            </Button>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Process steps={steps} tone="canvas" />
      <div className="pt-20 sm:pt-28" />
      <CtaBand />
    </>
  );
}
