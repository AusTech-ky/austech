import {
  Calendar,
  CalendarDays,
  LayoutGrid,
  Plane,
  Receipt,
  Settings,
  Stethoscope,
  UserPlus,
  Users,
  BadgeCheck,
  FolderOpen,
} from "lucide-react";
import { productNames } from "@/content/site";
import { Avatar, Card, CardHeader, MButton, Sidebar, TopBar } from "./primitives";
import { cn } from "@/lib/cn";

const CORAL = "#df5a47";

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
