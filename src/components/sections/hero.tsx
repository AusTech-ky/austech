import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { site } from "@/content/site";
import { Mockup } from "@/components/mockups";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { HeroNetwork } from "./hero-network";
import { TypedPhrases } from "./typed-phrases";

const d = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

/**
 * Completes "Software built …". Everything we make is bespoke; the phrases say how.
 * Keep each one short enough to sit on one line at desktop width (about 18
 * characters), or the reserved space leaves a gap under the shorter ones.
 */
const phrases = [
  "to work better.",
  "to save time.",
  "to solve problems.",
  "just for you.",
  "for your needs.",
] as const;

export function Hero() {
  return (
    <section className="relative overflow-x-clip">
      {/* Dark brand band with the animated network behind the headline */}
      <div className="relative isolate overflow-hidden bg-[#0b1220] pb-40 pt-28 sm:pb-52 sm:pt-36 lg:pt-40">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_75%_40%,rgb(30_58_138/0.55),transparent_70%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 [background-image:linear-gradient(rgb(96_165_250/0.07)_1px,transparent_1px),linear-gradient(90deg,rgb(96_165_250/0.07)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_75%)]"
        />
        <HeroNetwork className="enter pointer-events-none absolute -right-[55%] top-16 -z-10 h-[55%] w-auto opacity-25 sm:-right-[12%] sm:top-10 sm:h-[88%] sm:opacity-60 lg:-right-[2%] lg:top-6 lg:h-[92%] lg:opacity-100" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgb(96_165_250/0.6),transparent)]" />

        <Container>
          <div className="max-w-[46rem]">
            <p
              className="enter inline-flex items-center gap-2 rounded-full bg-white/[0.06] py-1 pl-1.5 pr-3.5 text-[0.8rem] text-white/75 ring-1 ring-inset ring-white/10 backdrop-blur"
              style={d(0)}
            >
              <span className="rounded-full bg-sky/15 px-2 py-0.5 text-[0.7rem] font-medium text-sky">
                {site.location.region}
              </span>
              Software for growing businesses
            </p>

            <h1 className="enter mt-7 text-display font-semibold text-white" style={d(80)}>
              <span className="sr-only">Software built around your business.</span>
              <span aria-hidden>Software built</span>
              {/* One line at every width: shrinks on narrow phones so the longest phrase (~8em) still fits */}
              <TypedPhrases
                phrases={phrases}
                className="whitespace-nowrap text-[length:min(1em,calc((100vw_-_2.5rem)/8))] font-[250] tracking-[-0.03em] text-sky"
              />
            </h1>

            <p className="enter mt-7 max-w-[38rem] text-lead text-white/65" style={d(160)}>
              <span className="sm:hidden">
                Bespoke software, apps and websites that streamline how you run, serve customers and see what&apos;s
                going on.
              </span>
              <span className="hidden sm:inline">
                Bespoke software, business applications and modern websites for small and mid-sized businesses. We
                streamline how you operate, improve how you serve customers, and help you see what&apos;s really
                going on.
              </span>
            </p>

            <div className="enter mt-9 flex flex-col gap-3 sm:flex-row" style={d(240)}>
              <Button href="/contact" size="lg" arrow className="bg-white! text-navy! hover:bg-white/90!">
                Discuss your project
              </Button>
              <Button
                href="/work"
                size="lg"
                className="bg-white/[0.06]! text-white! shadow-none! ring-1 ring-white/15 hover:bg-white/10!"
              >
                Explore our work
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Product composition, overlapping the band */}
      <Container className="relative -mt-28 sm:-mt-36">
        <div className="enter relative" style={d(360)}>
          <div className="relative pr-[9%] sm:pr-[12%]">
            <Mockup view={{ product: "relay", view: "inbox", frame: "browser" }} className="rounded-b-none!" />
          </div>

          {/* Phone */}
          <div className="absolute -bottom-6 right-0 w-[27%] animate-float sm:w-[23%] lg:w-[21%]">
            <Mockup view={{ product: "fuelup", view: "mobile", frame: "phone" }} />
          </div>

          {/* Floating notifications */}
          <div className="enter absolute -left-2 top-[22%] hidden w-[270px] md:block lg:-left-10" style={d(900)}>
            <div className="flex items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-lift ring-1 ring-ink/5 backdrop-blur">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#fcebea]">
                <AlertTriangle className="size-4 text-negative" />
              </span>
              <div className="min-w-0">
                <p className="text-[0.8rem] font-medium text-ink">KY-1184 left rental zone</p>
                <p className="text-[0.72rem] text-muted">Swift Fleet · just now</p>
              </div>
            </div>
          </div>
          <div className="enter absolute -left-2 top-[48%] hidden w-[280px] lg:-left-16 lg:block" style={d(1100)}>
            <div className="flex items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-lift ring-1 ring-ink/5 backdrop-blur">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-relay-soft">
                <CheckCircle2 className="size-4 text-relay" />
              </span>
              <div className="min-w-0">
                <p className="text-[0.8rem] font-medium text-ink">Statements sent to 231 accounts</p>
                <p className="text-[0.72rem] text-muted">Fuel Up · automated</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="relative h-px bg-line" />
    </section>
  );
}
