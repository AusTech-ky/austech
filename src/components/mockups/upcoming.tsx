import {
  Building2,
  Calendar,
  CalendarDays,
  FileText,
  Home,
  LayoutGrid,
  Plane,
  Plus,
  Receipt,
  Settings,
  Stethoscope,
  UserPlus,
  Users,
  Wrench,
  BadgeCheck,
  FolderOpen,
} from "lucide-react";
import { productNames } from "@/content/site";
import { Avatar, AreaChart, Card, CardHeader, MButton, Pill, Progress, Sidebar, TopBar } from "./primitives";
import { cn } from "@/lib/cn";

const VIOLET = "#6d5ae6";
const CORAL = "#df5a47";

// ─── Property management ────────────────────────────────────────

const properties = [
  { name: "Seaview Residences", area: "West Bay", units: 24, occ: 96, due: "CI$3,450", tone: "#e9e3fb" },
  { name: "Palm Court", area: "George Town", units: 12, occ: 100, due: "—", tone: "#e0efff" },
  { name: "Harbour Lofts", area: "George Town", units: 18, occ: 89, due: "CI$1,900", tone: "#dff3ea" },
  { name: "Mangrove Cottages", area: "Bodden Town", units: 8, occ: 88, due: "CI$2,100", tone: "#fde8d7" },
  { name: "Rum Point Villas", area: "North Side", units: 6, occ: 83, due: "—", tone: "#fbe3e8" },
];

const requests = [
  { t: "AC not cooling", u: "Seaview · 4B", p: "High", c: "#c23a31", bg: "#fcebea", who: "Island Air" },
  { t: "Leaking kitchen tap", u: "Harbour Lofts · 12", p: "Medium", c: "#a86a06", bg: "#fdf3e1", who: "Unassigned" },
  { t: "Gate remote replacement", u: "Palm Court · 3", p: "Low", c: "#5f6570", bg: "#f0f0ee", who: "Caretaker" },
  { t: "Pool pump inspection", u: "Rum Point Villas", p: "Low", c: "#5f6570", bg: "#f0f0ee", who: "Blue Water Pools" },
];

export function PropertyOverview() {
  return (
    <div className="flex h-full bg-[#fcfcfb]">
      <Sidebar
        brand={productNames.property}
        brandMark={Building2}
        brandColor={VIOLET}
        context={{ title: "Cayman Estates Mgmt", subtitle: "62 units · 4 properties" }}
        items={[
          { label: "Overview", icon: LayoutGrid, active: true },
          { label: "Properties", icon: Building2, count: "4" },
          { label: "Tenancies", icon: Home, count: "58" },
          { label: "Rent", icon: Receipt },
          { label: "Maintenance", icon: Wrench, count: "7" },
          { label: "Documents", icon: FileText },
          { label: "Settings", icon: Settings },
        ]}
      />
      <main className="min-w-0 flex-1 px-7 py-6">
        <TopBar
          title="Portfolio overview"
          subtitle="September 2026"
          actions={
            <>
              <MButton icon={FileText}>Owner report</MButton>
              <MButton variant="primary" color={VIOLET} icon={Plus}>
                New tenancy
              </MButton>
            </>
          }
        />
        <div className="mt-5 grid grid-cols-[1.25fr_1fr_1fr] gap-3">
          <Card className="p-4">
            <p className="text-[11.5px] text-muted">Rent collected · September</p>
            <p className="nums mt-1 text-[24px] font-semibold tracking-[-0.02em] text-ink">
              CI$96,400 <span className="text-[12px] font-normal text-muted">of CI$103,850</span>
            </p>
            <div className="mt-3">
              <Progress value={93} color={VIOLET} height={7} />
            </div>
            <div className="mt-2 flex gap-4 text-[11px] text-muted">
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full" style={{ background: VIOLET }} /> Paid 54</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#e0a13a]" /> Due 3</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#d9534a]" /> Overdue 1</span>
            </div>
          </Card>
          <Card className="p-4">
            <p className="text-[11.5px] text-muted">Occupancy</p>
            <p className="nums mt-1 text-[24px] font-semibold tracking-[-0.02em] text-ink">94%</p>
            <div className="mt-1">
              <AreaChart data={[88, 90, 89, 92, 91, 93, 94]} width={200} height={40} color={VIOLET} />
            </div>
          </Card>
          <Card className="p-4">
            <p className="text-[11.5px] text-muted">Leases ending · 60 days</p>
            <p className="nums mt-1 text-[24px] font-semibold tracking-[-0.02em] text-ink">5</p>
            <div className="mt-3 flex -space-x-1.5">
              {["Ana Ruiz", "Tom Keel", "Lia Chen", "Omar Bush", "Rita Ebanks"].map((n) => (
                <span key={n} className="rounded-full ring-2 ring-white">
                  <Avatar name={n} size={26} />
                </span>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-4 grid grid-cols-[1.35fr_1fr] gap-4">
          <Card>
            <CardHeader title="Properties" right="4 properties · 62 units" />
            <div className="px-4 pb-2">
              {properties.map((p) => (
                <div key={p.name} className="flex items-center gap-3 border-t border-[#f3f3f1] py-3 first:border-0">
                  <span className="grid size-10 place-items-center rounded-[10px]" style={{ background: p.tone }}>
                    <Building2 className="size-[18px] text-ink-2" strokeWidth={1.7} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-medium text-ink">{p.name}</p>
                    <p className="text-[11px] text-muted">
                      {p.area} · {p.units} units
                    </p>
                  </div>
                  <div className="w-[120px]">
                    <div className="mb-1 flex justify-between text-[10.5px]">
                      <span className="text-muted">Occupied</span>
                      <span className="nums font-medium text-ink">{p.occ}%</span>
                    </div>
                    <Progress value={p.occ} color={VIOLET} height={4} />
                  </div>
                  <div className="w-[80px] text-right">
                    <p className="text-[10.5px] text-muted">Outstanding</p>
                    <p className="nums text-[12px] font-medium text-ink">{p.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardHeader title="Maintenance" right="7 open" />
            <div className="space-y-2 px-4 pb-4">
              {requests.map((r) => (
                <div key={r.t} className="rounded-[10px] border border-[#f0f0ee] px-3 py-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[12.5px] font-medium text-ink">{r.t}</p>
                      <p className="text-[11px] text-muted">{r.u}</p>
                    </div>
                    <Pill color={r.c} bg={r.bg}>{r.p}</Pill>
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted">
                    <Wrench className="size-3" /> {r.who}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

// ─── HR ─────────────────────────────────────────────────────────

const days = ["Mon 28", "Tue 29", "Wed 30", "Thu 1", "Fri 2"];
const out = [
  { name: "Keisha Bodden", from: 0, to: 2, type: "Vacation", c: CORAL, bg: "#fcefed" },
  { name: "Andre Powell", from: 1, to: 1, type: "Sick", c: "#a86a06", bg: "#fdf3e1" },
  { name: "Lia Chen", from: 2, to: 4, type: "Vacation", c: CORAL, bg: "#fcefed" },
  { name: "Omar Bush", from: 4, to: 4, type: "Training", c: "#2f55d4", bg: "#eef2fd" },
];

export function PeopleOverview() {
  return (
    <div className="flex h-full bg-[#fcfcfb]">
      <Sidebar
        brand={productNames.people}
        brandMark={Users}
        brandColor={CORAL}
        context={{ title: "Seven Mile Group", subtitle: "86 people · 3 locations" }}
        items={[
          { label: "Home", icon: LayoutGrid, active: true },
          { label: "People", icon: Users, count: "86" },
          { label: "Time off", icon: Plane, count: "4" },
          { label: "Calendar", icon: CalendarDays },
          { label: "Onboarding", icon: UserPlus, count: "2" },
          { label: "Documents", icon: FolderOpen },
          { label: "Settings", icon: Settings },
        ]}
      />
      <main className="min-w-0 flex-1 px-7 py-6">
        <TopBar
          title="Good afternoon, Renée"
          subtitle="4 requests need your approval"
          actions={
            <MButton variant="primary" color={CORAL} icon={UserPlus}>
              Add person
            </MButton>
          }
        />

        <div className="mt-5 grid grid-cols-4 gap-3">
          {[
            ["Headcount", "86", "+3 this quarter"],
            ["Out today", "3", "2 vacation · 1 sick"],
            ["Starting soon", "2", "onboarding in progress"],
            ["Leave balance", "14.5", "avg. days remaining"],
          ].map(([k, v, s]) => (
            <Card key={k} className="px-4 py-3">
              <p className="text-[11.5px] text-muted">{k}</p>
              <p className="nums mt-0.5 text-[20px] font-semibold tracking-[-0.02em] text-ink">{v}</p>
              <p className="text-[10.5px] text-faint">{s}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-4">
          <CardHeader title="Who's out this week" right="28 Sep – 2 Oct" />
          <div className="px-4 pb-4">
            <div className="grid grid-cols-[150px_repeat(5,1fr)] border-b border-[#f1f1ef] pb-2 text-[11px] text-muted">
              <span />
              {days.map((d, i) => (
                <span key={d} className={cn("text-center", i === 0 && "font-semibold text-ink")}>
                  {d}
                </span>
              ))}
            </div>
            {out.map((o) => (
              <div key={o.name} className="grid grid-cols-[150px_repeat(5,1fr)] items-center py-2">
                <span className="flex items-center gap-2 text-[12px] font-medium text-ink">
                  <Avatar name={o.name} size={22} /> {o.name}
                </span>
                <div
                  className="flex h-7 items-center rounded-[7px] px-2.5 text-[11px] font-medium"
                  style={{
                    gridColumn: `${o.from + 2} / ${o.to + 3}`,
                    background: o.bg,
                    color: o.c,
                    boxShadow: `inset 3px 0 0 ${o.c}`,
                  }}
                >
                  {o.type}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-4 grid grid-cols-[1.2fr_1fr] gap-4">
          <Card>
            <CardHeader title="Approvals" right="4 pending" />
            <div className="px-4 pb-3">
              {[
                { n: "Marcus Ebanks", r: "Vacation · 3 days", d: "12–14 Oct", i: Plane },
                { n: "Tiana Rankine", r: "Sick leave · 1 day", d: "Today", i: Stethoscope },
                { n: "Leon Scott", r: "Expense · CI$84.00", d: "Training materials", i: Receipt },
              ].map(({ n, r, d, i: I }) => (
                <div key={n} className="flex items-center gap-3 border-t border-[#f3f3f1] py-2.5 first:border-0">
                  <Avatar name={n} size={30} />
                  <div className="flex-1">
                    <p className="text-[12.5px] font-medium text-ink">{n}</p>
                    <p className="flex items-center gap-1 text-[11px] text-muted">
                      <I className="size-3" /> {r} · {d}
                    </p>
                  </div>
                  <span className="rounded-[7px] border border-[#e8e8e5] px-2.5 py-1 text-[11.5px] text-ink-2">Decline</span>
                  <span className="rounded-[7px] px-2.5 py-1 text-[11.5px] font-medium text-white" style={{ background: CORAL }}>
                    Approve
                  </span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardHeader title="Work permits expiring" right="Next 90 days" />
            <div className="space-y-2.5 px-4 pb-4">
              {[
                { n: "Rohan Mehta", d: "14 Oct", days: 19, c: "#c23a31" },
                { n: "Grace Allen", d: "3 Nov", days: 39, c: "#a86a06" },
                { n: "Paolo Reyes", d: "21 Dec", days: 87, c: "#5f6570" },
              ].map((p) => (
                <div key={p.n} className="flex items-center gap-2.5">
                  <Avatar name={p.n} size={26} />
                  <div className="flex-1">
                    <p className="text-[12px] font-medium text-ink">{p.n}</p>
                    <p className="flex items-center gap-1 text-[10.5px] text-muted">
                      <Calendar className="size-3" /> Expires {p.d}
                    </p>
                  </div>
                  <span className="nums text-[11.5px] font-medium" style={{ color: p.c }}>
                    {p.days} days
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2 rounded-[9px] bg-[#f6f6f4] px-2.5 py-2 text-[11px] text-muted">
                <BadgeCheck className="size-3.5" style={{ color: CORAL }} /> Renewal reminders sent automatically
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
