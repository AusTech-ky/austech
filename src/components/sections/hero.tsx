import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { site } from "@/content/site";
import { Mockup } from "@/components/mockups";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";

const d = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section className="relative overflow-x-clip pt-28 sm:pt-36 lg:pt-40">
      {/* Ambient light */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[720px] w-[1400px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(47_85_212/0.07),transparent)]"
      />

      <Container>
        <div className="max-w-[56rem]">
          <p className="enter inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1.5 pr-3.5 text-[0.8rem] text-ink-2 shadow-[0_0_0_1px_var(--color-line),0_1px_2px_rgb(13_16_20/0.04)]" style={d(0)}>
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[0.7rem] font-medium text-accent-strong">
              {site.location.region}
            </span>
            Software for growing businesses
          </p>

          <h1 className="enter mt-7 text-display font-semibold text-ink" style={d(80)}>
            We build software that makes business{" "}
            <span className="accent-serif whitespace-nowrap text-[1.08em] text-accent">work better.</span>
          </h1>

          <p className="enter mt-7 max-w-[40rem] text-lead text-muted" style={d(160)}>
            Bespoke software, business applications and modern websites for small and mid-sized businesses. We
            streamline how you operate, improve how you serve customers, and help you see what&apos;s really
            going on.
          </p>

          <div className="enter mt-9 flex flex-col gap-3 sm:flex-row" style={d(240)}>
            <Button href="/contact" size="lg" arrow>
              Discuss your project
            </Button>
            <Button href="/work" size="lg" variant="secondary">
              Explore our work
            </Button>
          </div>
        </div>
      </Container>

      {/* Product composition */}
      <Container className="relative mt-16 sm:mt-20">
        <div className="enter relative" style={d(360)}>
          <div className="bg-grid pointer-events-none absolute -inset-x-8 -top-10 bottom-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

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
