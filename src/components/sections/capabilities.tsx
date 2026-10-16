import { ArrowDown, ArrowRight, ArrowUpRight, Braces, Check, CreditCard, FileSpreadsheet, Globe, LayoutDashboard, Plug, Workflow } from "lucide-react";
import Link from "next/link";
import type { Service, ServiceKey } from "@/content/types";
import { Container, Section, SectionHeader } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ClientLogos } from "./client-logos";
import { cn } from "@/lib/cn";

export const serviceIcons = {
  globe: Globe,
  layout: LayoutDashboard,
  code: Braces,
  workflow: Workflow,
  plug: Plug,
} as const;

/*
 * A real piece of something we built for each service, drawn small in that
 * client's own colours (the same idea as the cards on manage.ky). Figures
 * are the demo data shown in each case study's screenshots.
 */

const card = "rounded-xl bg-white shadow-[0_10px_26px_-16px_var(--pic-shadow)]";

/** Fuel Up: the office's outstanding balance, and a fill waiting at the till. */
function PicFuelUp() {
  return (
    <div className="grid w-[min(360px,100%)] gap-2.5 text-left">
      <div className={cn(card, "flex items-center gap-3 p-3.5")}>
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#fdecec] text-[#dc2626]">
          <CreditCard className="size-4" />
        </span>
        <div>
          <p className="text-[9.5px] font-medium tracking-[0.12em] text-[#6b7280]">OUTSTANDING (KYD)</p>
          <p className="nums text-[20px] font-semibold leading-tight tracking-[-0.02em] text-[#111827]">$26,153.72</p>
          <p className="text-[11px] text-[#6b7280]">6 unpaid · 1 overdue</p>
        </div>
      </div>
      <div className={cn(card, "flex items-center gap-3 p-3")}>
        <span className="grid w-12 shrink-0 justify-items-center rounded-lg bg-[#fbefc3] py-1.5 text-[#1e3a8a]">
          <span className="text-[8px] font-semibold tracking-[0.14em]">PUMP</span>
          <span className="text-[19px] font-bold leading-none">4</span>
          <span className="mt-0.5 text-[7.5px] font-semibold tracking-[0.12em] text-[#6b7280]">SELF</span>
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <b className="text-[13px] font-semibold text-[#111827]">C151589</b>
            <span className="rounded-full bg-[#eef0ff] px-1.5 py-px text-[8.5px] font-semibold tracking-[0.1em] text-[#4338ca]">PENDING</span>
          </div>
          <p className="text-[11px] text-[#6b7280]">Sunrise Taxi Co.</p>
          <span className="mt-1.5 inline-flex items-center rounded-full bg-[#e8173f] px-2.5 py-1 text-[10.5px] font-medium text-white">
            Approve fill-up
          </span>
        </div>
      </div>
    </div>
  );
}

/** The furniture store: one product, on island, on its way and already sold, and the bays it sits in. */
function PicStock() {
  const counts: [string, string, boolean?][] = [
    ["6", "On island"],
    ["8", "Incoming", true],
    ["3", "Committed"],
  ];
  return (
    <div className="grid w-[min(380px,100%)] gap-2.5 text-left">
      <div className={cn(card, "p-3.5")}>
        <div className="flex items-center gap-3">
          <span className="size-9 shrink-0 rounded bg-gradient-to-br from-[#ece5d8] to-[#cbbca3]" />
          <div className="min-w-0">
            <p className="truncate text-[12.5px] font-medium text-[#1f1f1f]">Woven Rattan Lounge Chair, Natural</p>
            <p className="text-[10px] tracking-[0.1em] text-[#8a8a8a]">CL-2041-NAT</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {counts.map(([n, l, hot]) => (
            <div key={l} className={cn("rounded-lg px-2.5 py-2", hot ? "bg-[#f1e8d8]" : "bg-[#f6f5f2]")}>
              <p className="nums text-[19px] font-semibold leading-none text-[#1f1f1f]">{n}</p>
              <p className="mt-1 text-[8.5px] font-medium tracking-[0.12em] text-[#7a7a7a]">{l.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {[
          ["RS 17A", "4"],
          ["RS RUGS", "2"],
        ].map(([bay, n]) => (
          <span key={bay} className="rounded-full bg-white px-2.5 py-1 text-[10.5px] text-[#4a4a4a] ring-1 ring-[#e6e1d8]">
            <b className="font-semibold text-[#1f1f1f]">{bay}</b> · {n} in this bay
          </span>
        ))}
      </div>
    </div>
  );
}

/** The charter website: live sandbar conditions over the sea, and the way to book. */
function PicCharter() {
  const conditions: [string, string][] = [
    ["WATER", "84°F"],
    ["WEATHER", "Sunny"],
    ["RAIN", "10%"],
    ["AIR", "82°F"],
  ];
  return (
    <div className="w-[min(320px,100%)] overflow-hidden rounded-xl bg-[radial-gradient(ellipse_90%_70%_at_70%_0%,#0f5b5a,transparent_70%),linear-gradient(180deg,#0b3a44,#071a2c)] p-4 text-left text-white shadow-[0_18px_36px_-18px_rgb(4_40_50/0.7)]">
      <div className="grid grid-cols-4 gap-1 text-center">
        {conditions.map(([k, v]) => (
          <div key={k}>
            <p className="text-[7.5px] font-semibold tracking-[0.14em] text-white/60">{k}</p>
            <p className="mt-0.5 font-serif text-[13px]">{v}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 font-serif text-[21px] leading-[1.1] tracking-[-0.01em]">
        The island on <i className="text-[#b9cfe0]">your</i> schedule.
      </p>
      <span className="mt-4 inline-flex items-center gap-2 bg-white px-3 py-1.5 text-[9.5px] font-semibold tracking-[0.16em] text-[#0b1b2b]">
        BOOK NOW <ArrowUpRight className="size-3" />
      </span>
    </div>
  );
}

/** Swift: bank lines arriving already sorted, each with its account, car and how sure the AI is. */
function PicBank() {
  const rows = [
    { memo: "POS 2231 SAMPLE AUTO PARTS", account: "Repairs & maintenance", car: "DEMO-03", conf: "91%" },
    { memo: "POS EXAMPLE FUELS 0911", account: "Fuel", car: "DEMO-06", conf: "93%" },
  ];
  return (
    <div className="grid w-[min(340px,100%)] gap-2 text-left">
      {rows.map((r) => (
        <div key={r.memo} className={cn(card, "px-3.5 py-3")}>
          <p className="font-mono text-[10px] text-[#6b7280]">{r.memo}</p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <b className="truncate text-[12.5px] font-semibold text-[#0f172a]">{r.account}</b>
            <span className="shrink-0 rounded-md bg-[#eef2ff] px-1.5 py-px font-mono text-[9.5px] text-[#1d4ed8]">{r.car}</span>
            <span className="ml-auto shrink-0 rounded-full bg-[#e8f6ec] px-1.5 py-px text-[10px] font-medium text-[#15803d]">{r.conf}</span>
          </div>
        </div>
      ))}
      <span className="inline-flex items-center gap-1.5 justify-self-end rounded-lg bg-[#2563eb] px-3 py-1.5 text-[11px] font-medium text-white shadow-[0_8px_18px_-10px_rgb(37_99_235/0.8)]">
        <Check className="size-3" strokeWidth={2.5} /> Confirm 29 high-confidence
      </span>
    </div>
  );
}

/** Roster on manage.ky: a sales report dropped in, and each person's commission out. */
function PicSales() {
  const people: [string, string][] = [
    ["Maria Ebanks", "KYD 1,264.00"],
    ["Kerry-Ann Bodden", "KYD 842.50"],
    ["Devon Scott", "KYD 315.75"],
  ];
  return (
    <div className="grid w-[min(290px,100%)] gap-2 text-left">
      <div className="flex items-center gap-2.5 rounded-xl border-[1.5px] border-dashed border-[#eab08c] bg-white/70 px-3 py-2.5">
        <FileSpreadsheet className="size-5 shrink-0 text-[#16a34a]" />
        <div>
          <p className="text-[12.5px] font-semibold text-[#0a0a0a]">sales-october.csv</p>
          <p className="text-[10.5px] text-[#737373]">Dropped in</p>
        </div>
      </div>
      <ArrowDown className="mx-auto size-4 text-[#e2580b]" />
      {people.map(([n, v]) => (
        <div key={n} className={cn(card, "flex items-center justify-between gap-3 rounded-[10px] px-3 py-1.5 text-[12px] text-[#737373]")}>
          <b className="font-semibold text-[#0a0a0a]">{n}</b>
          <span className="nums">{v}</span>
        </div>
      ))}
    </div>
  );
}

/** Each service's picture: whose work it is, their colours, and the piece itself. */
const pics: Record<ServiceKey, { from: string; dot: string; bg: string; shadow: string; Pic: () => React.ReactElement }> = {
  "business-apps": {
    from: "Fuel Up",
    dot: "bg-[#ebc546]",
    bg: "bg-[linear-gradient(160deg,#fffaf0,#f7ebc6)]",
    shadow: "rgb(150 110 20 / 0.45)",
    Pic: PicFuelUp,
  },
  "bespoke-software": {
    from: "Furniture store",
    dot: "bg-[#b9a27c]",
    bg: "bg-[linear-gradient(160deg,#fbfaf7,#ece4d6)]",
    shadow: "rgb(110 90 50 / 0.4)",
    Pic: PicStock,
  },
  websites: {
    from: "Charter website",
    dot: "bg-[#0f766e]",
    bg: "bg-[linear-gradient(160deg,#f1f9f8,#d3ebe7)]",
    shadow: "rgb(10 90 90 / 0.4)",
    Pic: PicCharter,
  },
  automation: {
    from: "Swift",
    dot: "bg-[#2563eb]",
    bg: "bg-[linear-gradient(160deg,#f5f8ff,#dde8fd)]",
    shadow: "rgb(30 70 180 / 0.4)",
    Pic: PicBank,
  },
  integrations: {
    from: "Roster",
    dot: "bg-[#e2580b]",
    bg: "bg-[linear-gradient(160deg,#fff7f1,#fce6d9)]",
    shadow: "rgb(160 60 10 / 0.45)",
    Pic: PicSales,
  },
};

export function Capabilities({ services }: { services: Service[] }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          title={
            <>
              Software shaped around <span className="accent-serif">how you work</span>
            </>
          }
          intro="From a website that earns trust to the system your whole operation runs on. We design and build the software growing businesses depend on."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            const { from, dot, bg, shadow, Pic } = pics[s.key];
            return (
              <Reveal
                key={s.key}
                delay={i * 60}
                className={cn(i < 2 ? "lg:col-span-3" : "lg:col-span-2", i === 4 && "sm:col-span-2 lg:col-span-2")}
              >
                {/* The whole card links via the heading's stretched link, so the logos can be links of their own. */}
                <div className="group relative flex h-full flex-col rounded-[22px] bg-white p-2 pb-6 ring-1 ring-line transition-shadow duration-500 ease-[var(--ease-out-soft)] hover:shadow-lift">
                  <div
                    aria-hidden
                    className={cn("pop relative grid h-[290px] place-items-center overflow-hidden rounded-[16px] px-5 pb-5 pt-11", bg)}
                    style={{ "--pic-shadow": shadow } as React.CSSProperties}
                  >
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-[0.72rem] font-medium text-ink-2 ring-1 ring-black/5">
                      <span className={cn("size-1.5 rounded-full", dot)} />
                      {from}
                    </span>
                    <Pic />
                  </div>

                  <div className="px-4 pt-5 sm:px-5">
                    <div className="flex items-center gap-2.5">
                      <Icon className="size-[18px] shrink-0 text-navy" strokeWidth={1.8} />
                      <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em] text-ink">
                        <Link href={`/services#${s.key}`} className="after:absolute after:inset-0 after:rounded-[22px]">
                          {s.title}
                        </Link>
                      </h3>
                      <ArrowRight className="ml-auto size-4 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-ink" />
                    </div>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{s.short}</p>
                  </div>
                  <ClientLogos service={s.key} className="mt-auto px-4 pt-6 sm:px-5" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
