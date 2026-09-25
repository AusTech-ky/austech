import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

export function CtaBand({
  title = (
    <>
      Is there a part of your business that should be <span className="accent-serif">simpler?</span>
    </>
  ),
  body = "Tell us what's slowing you down. We'll give you an honest view of what software could do about it, even if the answer is “not much”.",
}: {
  title?: React.ReactNode;
  body?: string;
}) {
  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-ink px-6 py-16 text-center sm:px-12 sm:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(125_152_240/0.28),transparent)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-h2 font-semibold text-white">{title}</h2>
              <p className="mx-auto mt-5 max-w-xl text-lead text-white/65">{body}</p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href="/contact" size="lg" arrow className="bg-white! text-ink! hover:bg-white/90!">
                  Discuss your project
                </Button>
                <Button
                  href={`mailto:${site.email}`}
                  size="lg"
                  className="bg-white/10! text-white! shadow-none! ring-1 ring-white/15 hover:bg-white/15!"
                >
                  {site.email}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
