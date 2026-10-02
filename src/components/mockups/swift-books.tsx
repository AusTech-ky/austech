import {
  Banknote,
  BarChart3,
  Car,
  Check,
  CheckCircle2,
  FileSpreadsheet,
  Link2,
  ListChecks,
  Receipt,
  Send,
  Sparkles,
  Upload,
} from "lucide-react";
import { Card, CardHeader, MButton, Pill, Progress, Sidebar, TopBar } from "./primitives";
import { cn } from "@/lib/cn";

/*
 * Swift's bank processing tool, drawn with dummy data. Every name, memo and
 * amount here is invented for the case study.
 */

const BLUE = "#2563eb";

function nav(active: string) {
  return [
    { label: "Upload statement", icon: Upload },
    { label: "Review", icon: ListChecks, count: "48", active: active === "review" },
    { label: "Credits", icon: Banknote, count: "12", active: active === "credits" },
    { label: "Expense reports", icon: Receipt, active: active === "report" },
    { label: "Vehicles", icon: Car },
    { label: "Reports", icon: BarChart3 },
  ];
}

function Shell({ active, children }: { active: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full bg-white">
      <Sidebar
        brand="Swift Ops"
        brandMark={FileSpreadsheet}
        brandColor={BLUE}
        context={{ title: "Operating account", subtitle: "Statement · Sep 1–15" }}
        items={nav(active)}
      />
      <main className="min-w-0 flex-1 overflow-hidden px-7 py-6">{children}</main>
    </div>
  );
}

function Tabs({ active }: { active: "expenses" | "credits" | "summary" }) {
  const tabs = [
    { key: "expenses", label: "Expenses", count: 36 },
    { key: "credits", label: "Credits", count: 12 },
    { key: "summary", label: "Summary" },
  ] as const;
  return (
    <div className="mt-5 flex gap-1 border-b border-[#ececea]">
      {tabs.map((t) => (
        <span
          key={t.key}
          className={cn(
            "-mb-px flex h-9 items-center gap-1.5 border-b-2 px-3 text-[12.5px]",
            active === t.key ? "border-[#2563eb] font-medium text-ink" : "border-transparent text-muted",
          )}
        >
          {t.label}
          {"count" in t && <span className="nums text-[11px] text-faint">{t.count}</span>}
        </span>
      ))}
    </div>
  );
}

function Confidence({ value }: { value: number }) {
  const low = value < 0.7;
  return (
    <div className="flex items-center gap-2">
      <div className="w-12">
        <Progress value={value * 100} color={low ? "#e09a1a" : "#16a34a"} height={5} />
      </div>
      <span className={cn("nums text-[11px]", low ? "text-[#b7791f]" : "text-muted")}>{Math.round(value * 100)}%</span>
    </div>
  );
}

// ─── Review: every bank line, categorised ───────────────────────

const expenseRows = [
  { date: "Sep 15", memo: "POS DVDL GT VEH LIC RENEW 0915", merchant: "DVDL", account: "Vehicle licensing", vehicle: "KY-4821", amount: "214.00", conf: 0.97, done: true },
  { date: "Sep 15", memo: "POS DVDL GT VEH LIC RENEW 0915", merchant: "DVDL", account: "Vehicle licensing", vehicle: "KY-5160", amount: "214.00", conf: 0.96, done: true },
  { date: "Sep 14", memo: "POS 2231 ISLAND AUTO PARTS", merchant: "Island Auto Parts", account: "Repairs & maintenance", vehicle: "KY-7713", amount: "386.40", conf: 0.91, done: true },
  { date: "Sep 13", memo: "TRF TO R. EBANKS DEP REFUND", merchant: "Customer refund", account: "Lessee deposits", vehicle: "KY-2290", amount: "400.00", conf: 0.88, done: false },
  { date: "Sep 12", memo: "POS 0412 GT MART 0912", merchant: "—", account: "Unsure", vehicle: "", amount: "57.18", conf: 0.52, done: false },
  { date: "Sep 12", memo: "DD SAGICOR GEN INS POL 77104", merchant: "Sagicor General", account: "Vehicle insurance", vehicle: "KY-1184", amount: "1,240.00", conf: 0.94, done: true },
  { date: "Sep 11", memo: "POS RUBIS WB 0911", merchant: "Rubis", account: "Fuel", vehicle: "KY-3056", amount: "92.65", conf: 0.93, done: true },
  { date: "Sep 10", memo: "DD CUC ACCT 30418", merchant: "CUC", account: "Utilities", vehicle: "", amount: "611.27", conf: 0.98, done: true },
  { date: "Sep 10", memo: "SVC CHG WIRE FEE", merchant: "Bank fees", account: "Bank charges", vehicle: "", amount: "25.00", conf: 0.99, done: true },
  { date: "Sep 09", memo: "POS 7781 TYRE WORLD", merchant: "Tyre World", account: "Repairs & maintenance", vehicle: "KY-6402", amount: "528.00", conf: 0.66, done: false },
  { date: "Sep 08", memo: "DD MICROSOFT 365 BUS", merchant: "Microsoft", account: "Software & subscriptions", vehicle: "", amount: "66.00", conf: 0.98, done: true },
  { date: "Sep 08", memo: "POS DVDL GT VEH LIC RENEW 0908", merchant: "DVDL", account: "Vehicle licensing", vehicle: "KY-6402", amount: "214.00", conf: 0.96, done: true },
  { date: "Sep 05", memo: "POS 3302 QUICK LUBE GT", merchant: "Quick Lube", account: "Repairs & maintenance", vehicle: "KY-1184", amount: "89.95", conf: 0.89, done: true },
];

export function SwiftBooksReview() {
  return (
    <Shell active="review">
      <TopBar
        title="Review · Sep 1–15"
        subtitle="Operating account · 48 transactions · categorised in 41 seconds"
        actions={
          <>
            <MButton icon={Sparkles}>Re-run AI</MButton>
            <MButton variant="primary" color={BLUE} icon={Check}>
              Confirm 29 high-confidence
            </MButton>
          </>
        }
      />
      <Tabs active="expenses" />
      <Card className="mt-4 overflow-hidden">
        <div className="grid grid-cols-[56px_1.5fr_1fr_1.05fr_74px_86px_88px_28px] gap-3 border-b border-[#f0f0ee] bg-[#fafaf9] px-4 py-2 text-[10.5px] font-medium uppercase tracking-[0.06em] text-faint">
          <span>Date</span>
          <span>Bank memo</span>
          <span>Merchant</span>
          <span>Account</span>
          <span>Vehicle</span>
          <span>AI match</span>
          <span className="text-right">Amount</span>
          <span />
        </div>
        {expenseRows.map((r, i) => (
          <div
            key={i}
            className={cn(
              "grid grid-cols-[56px_1.5fr_1fr_1.05fr_74px_86px_88px_28px] items-center gap-3 border-b border-[#f4f4f2] px-4 py-[9px] text-[12px] last:border-0",
              r.conf < 0.7 && "bg-[#fffaf0]",
            )}
          >
            <span className="text-muted">{r.date}</span>
            <span className="truncate font-mono text-[11px] text-ink-2">{r.memo}</span>
            <span className="truncate text-ink">{r.merchant}</span>
            <span className={cn("truncate", r.account === "Unsure" ? "italic text-[#b7791f]" : "text-ink")}>{r.account}</span>
            <span>
              {r.vehicle ? (
                <Pill color="#1d4ed8" bg="#eaf1fe">
                  {r.vehicle}
                </Pill>
              ) : (
                <span className="text-faint">—</span>
              )}
            </span>
            <Confidence value={r.conf} />
            <span className="nums text-right font-medium text-ink">${r.amount}</span>
            <span className="flex justify-end">
              {r.done ? (
                <CheckCircle2 className="size-4 text-[#16a34a]" />
              ) : (
                <span className="size-4 rounded-full border-[1.5px] border-[#d8d8d4]" />
              )}
            </span>
          </div>
        ))}
      </Card>
    </Shell>
  );
}

// ─── Credits: deposits matched to invoices ──────────────────────

const creditRows = [
  { date: "Sep 15", memo: "TRF FROM ISLAND LOGISTICS INV-1043", customer: "Island Logistics Ltd", invoice: "INV-1043", how: "Invoice no.", score: 95, amount: "2,850.00", applied: true },
  { date: "Sep 14", memo: "CHQ DEP 000183 HARBOUR PLUMBING", customer: "Harbour Plumbing", invoice: "INV-1051", how: "Name + amount", score: 88, amount: "1,190.00", applied: true },
  { date: "Sep 13", memo: "TRF M. BODDEN LEASE SEPT", customer: "Marcus Bodden", invoice: "INV-1058", how: "Name + amount", score: 84, amount: "975.00", applied: false },
  { date: "Sep 12", memo: "CARD SETTLEMENT 0912", customer: "Website payments", invoice: "6 bookings", how: "Card batch", score: 92, amount: "3,412.50", applied: true },
  { date: "Sep 11", memo: "TRF SEAVIEW CONSTR", customer: "—", invoice: "Pick invoice", how: "No match", score: 0, amount: "640.00", applied: false },
  { date: "Sep 10", memo: "TRF FROM CORAL BAY HOTEL INV1039", customer: "Coral Bay Hotel", invoice: "INV-1039", how: "Invoice no.", score: 95, amount: "4,200.00", applied: true },
  { date: "Sep 09", memo: "CARD SETTLEMENT 0909", customer: "Website payments", invoice: "4 bookings", how: "Card batch", score: 92, amount: "1,860.00", applied: true },
  { date: "Sep 08", memo: "TRF K. WATSON WEEKLY RENTAL", customer: "Kerry Watson", invoice: "INV-1036", how: "Name + amount", score: 86, amount: "385.00", applied: true },
  { date: "Sep 05", memo: "CHQ DEP 000179 ISLAND LOGISTICS", customer: "Island Logistics Ltd", invoice: "INV-1031", how: "Name + amount", score: 90, amount: "2,850.00", applied: true },
];

export function SwiftBooksCredits() {
  return (
    <Shell active="credits">
      <TopBar
        title="Credits · Sep 1–15"
        subtitle="12 deposits · 9 matched to open invoices"
        actions={
          <MButton variant="primary" color={BLUE} icon={Link2}>
            Apply 9 to Zoho Books
          </MButton>
        }
      />
      <Tabs active="credits" />
      <Card className="mt-4 overflow-hidden">
        <div className="grid grid-cols-[56px_1.5fr_1fr_88px_150px_92px_84px] gap-3 border-b border-[#f0f0ee] bg-[#fafaf9] px-4 py-2 text-[10.5px] font-medium uppercase tracking-[0.06em] text-faint">
          <span>Date</span>
          <span>Bank memo</span>
          <span>Customer</span>
          <span>Invoice</span>
          <span>Matched by</span>
          <span className="text-right">Amount</span>
          <span />
        </div>
        {creditRows.map((r, i) => (
          <div
            key={i}
            className={cn(
              "grid grid-cols-[56px_1.5fr_1fr_88px_150px_92px_84px] items-center gap-3 border-b border-[#f4f4f2] px-4 py-[11px] text-[12px] last:border-0",
              r.score === 0 && "bg-[#fffaf0]",
            )}
          >
            <span className="text-muted">{r.date}</span>
            <span className="truncate font-mono text-[11px] text-ink-2">{r.memo}</span>
            <span className="truncate text-ink">{r.customer}</span>
            <span className={cn("font-medium", r.score ? "text-[#1d4ed8]" : "italic text-[#b7791f]")}>{r.invoice}</span>
            <span className="whitespace-nowrap text-muted">
              {r.how}
              {r.score > 0 && <span className="nums ml-1 text-faint">· {r.score}</span>}
            </span>
            <span className="nums text-right font-medium text-ink">${r.amount}</span>
            <span className="flex justify-end">
              {r.applied ? (
                <Pill color="#15803d" bg="#e8f6ee">
                  <Check className="size-3" strokeWidth={2.5} /> Applied
                </Pill>
              ) : (
                <span className="inline-flex h-[22px] items-center rounded-[6px] border border-[#e5e5e2] px-2 text-[11px] font-medium text-ink">
                  Apply
                </span>
              )}
            </span>
          </div>
        ))}
      </Card>
    </Shell>
  );
}

// ─── Expense report: ready for Zoho, with cost per vehicle ──────

const byAccount = [
  { name: "Repairs & maintenance", amount: 4182.4, n: 11 },
  { name: "Vehicle insurance", amount: 3720.0, n: 3 },
  { name: "Vehicle licensing", amount: 1712.0, n: 8 },
  { name: "Fuel", amount: 846.3, n: 9 },
  { name: "Utilities", amount: 611.27, n: 1 },
  { name: "Other", amount: 529.6, n: 4 },
];
const byVehicle = [
  { plate: "KY-7713", model: "Ford Ranger", amount: 1914.4 },
  { plate: "KY-1184", model: "Toyota Yaris", amount: 1454.0 },
  { plate: "KY-6402", model: "Nissan Kicks", amount: 1102.0 },
  { plate: "KY-4821", model: "Toyota Hilux", amount: 860.65 },
  { plate: "KY-5160", model: "Honda CR-V", amount: 642.0 },
];
const licences = [
  { plate: "KY-4821", model: "Toyota Hilux", due: "Sep 30", paid: "Sep 15", amount: 214 },
  { plate: "KY-5160", model: "Honda CR-V", due: "Sep 30", paid: "Sep 15", amount: 214 },
  { plate: "KY-6402", model: "Nissan Kicks", due: "Oct 04", paid: "Sep 08", amount: 214 },
  { plate: "KY-3056", model: "Kia Sportage", due: "Oct 12", paid: null, amount: 214 },
];
const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function SwiftBooksReport() {
  const total = byAccount.reduce((a, b) => a + b.amount, 0);
  const max = byVehicle[0].amount;
  return (
    <Shell active="report">
      <TopBar
        title="Expense report · Sep 1–15 2026"
        subtitle="36 expenses approved · 0 waiting for review"
        actions={
          <MButton variant="primary" color={BLUE} icon={Send}>
            Submit to Zoho Expense
          </MButton>
        }
      />
      <div className="mt-5 grid grid-cols-3 gap-4">
        {[
          { label: "Total expenses", value: `$${fmt(total)}`, sub: "36 transactions" },
          { label: "Linked to a vehicle", value: "27 of 36", sub: "by plate or memo" },
          { label: "Payments applied", value: "$9,437.50", sub: "9 invoices settled" },
        ].map((s) => (
          <Card key={s.label} className="px-4 py-3.5">
            <p className="text-[11.5px] text-muted">{s.label}</p>
            <p className="nums mt-1 text-[22px] font-semibold tracking-[-0.02em] text-ink">{s.value}</p>
            <p className="mt-0.5 text-[11px] text-faint">{s.sub}</p>
          </Card>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-[1.1fr_1fr] gap-4">
        <Card>
          <CardHeader title="By account" right="Zoho Expense categories" />
          <div className="px-4 pb-3">
            {byAccount.map((r) => (
              <div key={r.name} className="flex items-center gap-3 border-b border-[#f4f4f2] py-[9px] text-[12px] last:border-0">
                <span className="flex-1 text-ink">{r.name}</span>
                <span className="text-faint">{r.n}</span>
                <span className="nums w-24 text-right font-medium text-ink">${fmt(r.amount)}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Cost per vehicle" right="This statement" />
          <div className="space-y-3 px-4 pb-4 pt-1">
            {byVehicle.map((v) => (
              <div key={v.plate}>
                <div className="flex items-center justify-between text-[12px]">
                  <span>
                    <span className="font-medium text-ink">{v.plate}</span>
                    <span className="ml-2 text-muted">{v.model}</span>
                  </span>
                  <span className="nums font-medium text-ink">${fmt(v.amount)}</span>
                </div>
                <div className="mt-1.5">
                  <Progress value={(v.amount / max) * 100} color={BLUE} height={5} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader title="Vehicle licence renewals" right="Matched from DVDL payments on the statement" />
        <div className="px-4 pb-2">
          {licences.map((l) => (
            <div key={l.plate} className="grid grid-cols-[90px_1fr_110px_120px_90px] items-center gap-3 border-b border-[#f4f4f2] py-[9px] text-[12px] last:border-0">
              <span className="font-medium text-ink">{l.plate}</span>
              <span className="text-muted">{l.model}</span>
              <span className="text-muted">Due {l.due}</span>
              <span>
                {l.paid ? (
                  <Pill color="#15803d" bg="#e8f6ee">
                    <Check className="size-3" strokeWidth={2.5} /> Paid {l.paid}
                  </Pill>
                ) : (
                  <Pill color="#b7791f" bg="#fdf3e2">
                    Not yet paid
                  </Pill>
                )}
              </span>
              <span className="nums text-right font-medium text-ink">${fmt(l.amount)}</span>
            </div>
          ))}
        </div>
      </Card>
    </Shell>
  );
}
