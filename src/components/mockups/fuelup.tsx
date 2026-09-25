import {
  BarChart3,
  Car,
  Download,
  Droplet,
  FileText,
  Fuel,
  Home,
  LayoutGrid,
  LifeBuoy,
  MapPin,
  Plus,
  Receipt,
  ScrollText,
  Settings,
  ShieldCheck,
  User,
  Users,
  Wallet,
  Bell,
  QrCode,
} from "lucide-react";
import { productNames } from "@/content/site";
import { Avatar, BarChart, Card, CardHeader, MButton, Pill, Progress, Search, Sidebar, StatusBar, TopBar } from "./primitives";

const AMBER = "#e27d0c";
const AMBER_SOFT = "#fdf3e7";

function Money({ value, size = 32 }: { value: string; size?: number }) {
  const [whole, cents] = value.split(".");
  return (
    <span className="nums font-semibold tracking-[-0.03em] text-ink" style={{ fontSize: size }}>
      <span className="mr-0.5 align-top font-medium text-muted" style={{ fontSize: size * 0.45, lineHeight: 2 }}>
        CI$
      </span>
      {whole}
      {cents && <span className="text-faint">.{cents}</span>}
    </span>
  );
}

// ─── Customer dashboard ─────────────────────────────────────────

const fills = [
  { when: "Today, 08:14", driver: "Marcus Ebanks", vehicle: "Hilux · KY-4821", station: "Walkers Road", gal: "18.4", amt: "96.20" },
  { when: "Today, 07:52", driver: "Keisha Bodden", vehicle: "Transit · KY-2290", station: "West Bay", gal: "22.1", amt: "118.40" },
  { when: "Yesterday, 17:30", driver: "Andre Powell", vehicle: "Ranger · KY-7713", station: "Savannah", gal: "15.0", amt: "78.45" },
  { when: "Yesterday, 12:06", driver: "Marcus Ebanks", vehicle: "Hilux · KY-4821", station: "Bodden Town", gal: "9.8", amt: "51.25" },
  { when: "23 Sep, 16:41", driver: "Leon Scott", vehicle: "Transit · KY-3056", station: "Walkers Road", gal: "20.6", amt: "107.70" },
  { when: "23 Sep, 09:18", driver: "Keisha Bodden", vehicle: "Transit · KY-2290", station: "George Town", gal: "17.2", amt: "89.95" },
];

const drivers = [
  { name: "Marcus Ebanks", vehicle: "Hilux · KY-4821", used: 612, limit: 800 },
  { name: "Keisha Bodden", vehicle: "Transit · KY-2290", used: 734, limit: 800 },
  { name: "Andre Powell", vehicle: "Ranger · KY-7713", used: 298, limit: 600 },
  { name: "Leon Scott", vehicle: "Transit · KY-3056", used: 455, limit: 800 },
];

export function FuelUpDashboard() {
  return (
    <div className="flex h-full bg-[#fcfcfb]">
      <Sidebar
        brand={productNames.fuelup}
        brandMark={Fuel}
        brandColor={AMBER}
        context={{ title: "Island Logistics Ltd", subtitle: "Business · #20418" }}
        items={[
          { label: "Overview", icon: LayoutGrid, active: true },
          { label: "Transactions", icon: Receipt },
          { label: "Drivers", icon: Users, count: "4" },
          { label: "Vehicles", icon: Car, count: "4" },
          { label: "Top up", icon: Wallet },
          { label: "Statements", icon: FileText },
          { label: "Settings", icon: Settings },
        ]}
        footer={
          <div className="rounded-[10px] border border-[#ececea] bg-white p-3">
            <div className="flex items-center gap-2 text-[12px] font-medium text-ink">
              <ShieldCheck className="size-3.5" style={{ color: AMBER }} /> Auto top-up on
            </div>
            <p className="mt-1 text-[11px] leading-[1.45] text-muted">
              Adds CI$2,500 when available credit drops below CI$1,000.
            </p>
          </div>
        }
      />
      <main className="min-w-0 flex-1 px-7 py-6">
        <TopBar
          title="Good morning, Daniel"
          subtitle="Here's how your fleet's fuel account is looking today."
          actions={
            <>
              <MButton icon={Download}>Statement</MButton>
              <MButton variant="primary" color={AMBER} icon={Plus}>
                Top up
              </MButton>
            </>
          }
        />

        <div className="mt-5 grid grid-cols-[1fr_1.2fr] gap-4">
          {/* Balance */}
          <Card className="relative overflow-hidden p-5">
            <div
              className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full opacity-60"
              style={{ background: `radial-gradient(closest-side, ${AMBER_SOFT}, transparent)` }}
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="text-[12.5px] font-medium text-muted">Available credit</p>
                <Pill color="#13915f" bg="#e7f5ee">
                  Account in good standing
                </Pill>
              </div>
              <div className="mt-2">
                <Money value="12,480.50" size={38} />
              </div>
              <div className="mt-5">
                <Progress value={37.6} color={AMBER} height={8} />
                <div className="mt-2 flex justify-between text-[11.5px] text-muted">
                  <span className="nums">
                    <span className="font-medium text-ink">CI$7,519.50</span> used
                  </span>
                  <span className="nums">CI$20,000 limit</span>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 divide-x divide-[#f0f0ee] rounded-[10px] bg-[#fafaf9] py-2.5 text-center">
                {[
                  ["Statement due", "5 Oct"],
                  ["Fills this month", "46"],
                  ["Avg. fill", "CI$69.89"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-[10.5px] text-muted">{k}</p>
                    <p className="nums mt-0.5 text-[13px] font-semibold text-ink">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Spend */}
          <Card>
            <CardHeader
              title="Monthly spend"
              right={
                <div className="flex rounded-[7px] bg-[#f4f4f2] p-0.5 text-[11px]">
                  <span className="rounded-[5px] bg-white px-2 py-0.5 font-medium text-ink shadow-[0_1px_1px_rgb(0_0_0/0.06)]">6M</span>
                  <span className="px-2 py-0.5">12M</span>
                </div>
              }
            />
            <div className="px-4">
              <div className="flex items-baseline gap-2">
                <Money value="3,214.80" size={24} />
                <span className="text-[11.5px] text-muted">September to date</span>
              </div>
              <div className="mt-4">
                <BarChart
                  data={[2710, 2980, 3120, 2860, 3390, 3214]}
                  labels={["Apr", "May", "Jun", "Jul", "Aug", "Sep"]}
                  width={464}
                  height={132}
                  color={AMBER}
                  activeIndex={5}
                  gap={34}
                  radius={6}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-4 grid grid-cols-[1.65fr_1fr] gap-4">
          {/* Transactions */}
          <Card>
            <CardHeader title="Recent fills" right={<span className="font-medium text-ink">View all</span>} />
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="border-y border-[#f1f1ef] text-[10.5px] uppercase tracking-[0.06em] text-faint">
                  <th className="px-4 py-2 font-medium">Driver</th>
                  <th className="py-2 font-medium">Station</th>
                  <th className="py-2 font-medium">When</th>
                  <th className="py-2 text-right font-medium">Gallons</th>
                  <th className="px-4 py-2 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {fills.slice(0, 5).map((f, i) => (
                  <tr key={i} className="border-b border-[#f5f5f3] last:border-0">
                    <td className="px-4 py-[7px]">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={f.driver} size={24} />
                        <div>
                          <p className="font-medium text-ink">{f.driver}</p>
                          <p className="text-[10.5px] text-muted">{f.vehicle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-ink-2">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3 text-faint" />
                        {f.station}
                      </span>
                    </td>
                    <td className="text-muted">{f.when}</td>
                    <td className="nums text-right text-ink-2">{f.gal}</td>
                    <td className="nums px-4 text-right font-medium text-ink">CI${f.amt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Drivers */}
          <Card>
            <CardHeader title="Driver limits" right="Monthly" />
            <div className="space-y-3.5 px-4 pb-4 pt-1">
              {drivers.map((d) => {
                const pct = (d.used / d.limit) * 100;
                const near = pct > 85;
                return (
                  <div key={d.name}>
                    <div className="flex items-center gap-2.5">
                      <Avatar name={d.name} size={26} />
                      <div className="min-w-0 flex-1">
                        <p className="text-[12px] font-medium text-ink">{d.name}</p>
                        <p className="text-[10.5px] text-muted">{d.vehicle}</p>
                      </div>
                      <p className="nums text-[11.5px] text-muted">
                        <span className={near ? "font-semibold text-[#c7820e]" : "font-medium text-ink"}>
                          ${d.used}
                        </span>{" "}
                        / {d.limit}
                      </p>
                    </div>
                    <div className="mt-2 pl-[36px]">
                      <Progress value={pct} color={near ? "#e0a13a" : "#d8d8d4"} height={4} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

// ─── Back office ────────────────────────────────────────────────

const accounts = [
  { name: "Island Logistics Ltd", id: "20418", type: "Business", bal: "12,480.50", used: 38, drivers: 4, last: "8 min ago", status: "Active" },
  { name: "Seven Mile Couriers", id: "20377", type: "Business", bal: "1,204.10", used: 88, drivers: 9, last: "22 min ago", status: "Near limit" },
  { name: "Coral Coast Construction", id: "20122", type: "Business", bal: "18,960.00", used: 21, drivers: 14, last: "1 hr ago", status: "Active" },
  { name: "Tiana Rankine", id: "31804", type: "Personal", bal: "342.75", used: 66, drivers: 1, last: "2 hrs ago", status: "Active" },
  { name: "North Side Landscaping", id: "20590", type: "Business", bal: "0.00", used: 100, drivers: 3, last: "Yesterday", status: "Overdue" },
  { name: "Harbour View Rentals", id: "20233", type: "Business", bal: "6,715.30", used: 46, drivers: 6, last: "Yesterday", status: "Active" },
  { name: "Blue Iguana Tours", id: "20611", type: "Business", bal: "2,090.00", used: 79, drivers: 5, last: "2 days ago", status: "Active" },
  { name: "Calvin Whittaker", id: "31522", type: "Personal", bal: "—", used: 0, drivers: 1, last: "3 wks ago", status: "Paused" },
];

const statusStyle: Record<string, [string, string]> = {
  Active: ["#13915f", "#e7f5ee"],
  "Near limit": ["#a86a06", "#fdf3e1"],
  Overdue: ["#c23a31", "#fcebea"],
  Paused: ["#5f6570", "#f0f0ee"],
};

export function FuelUpAdmin() {
  return (
    <div className="flex h-full bg-[#fcfcfb]">
      <Sidebar
        brand={productNames.fuelup}
        brandMark={Fuel}
        brandColor={AMBER}
        context={{ title: "Back Office", subtitle: "Staff · Head office" }}
        items={[
          { label: "Dashboard", icon: LayoutGrid },
          { label: "Accounts", icon: Users, active: true, count: "248" },
          { label: "Transactions", icon: Receipt },
          { label: "Top-ups", icon: Wallet, count: "14" },
          { label: "Statements", icon: FileText },
          { label: "Stations", icon: MapPin, count: "6" },
          { label: "Reports", icon: BarChart3 },
          { label: "Audit log", icon: ScrollText },
        ]}
        footer={
          <div className="flex items-center gap-2.5 px-2">
            <Avatar name="Sherice Tatum" size={26} index={0} />
            <div>
              <p className="text-[12px] font-medium text-ink">Sherice Tatum</p>
              <p className="text-[10.5px] text-muted">Accounts manager</p>
            </div>
          </div>
        }
      />
      <main className="min-w-0 flex-1 px-7 py-6">
        <TopBar
          title="Accounts"
          subtitle="248 accounts · synced just now"
          actions={
            <>
              <MButton icon={Download}>Export</MButton>
              <MButton variant="primary" color={AMBER} icon={Plus}>
                New account
              </MButton>
            </>
          }
        />

        <div className="mt-5 grid grid-cols-4 gap-3">
          {[
            { k: "Outstanding credit", v: "CI$184,220", s: "across 231 active accounts", c: "#0d1014" },
            { k: "Top-ups today", v: "14", s: "CI$6,840 received", c: "#0d1014" },
            { k: "Near limit", v: "12", s: "over 85% of credit used", c: "#a86a06" },
            { k: "Overdue", v: "3", s: "statements past due", c: "#c23a31" },
          ].map((m) => (
            <Card key={m.k} className="px-4 py-3.5">
              <p className="text-[11.5px] text-muted">{m.k}</p>
              <p className="nums mt-1 text-[22px] font-semibold tracking-[-0.02em]" style={{ color: m.c }}>
                {m.v}
              </p>
              <p className="mt-0.5 text-[10.5px] text-faint">{m.s}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-4">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex gap-1 text-[12px]">
              {[
                ["All", "248", true],
                ["Business", "164"],
                ["Personal", "84"],
                ["Near limit", "12"],
                ["Overdue", "3"],
              ].map(([l, n, a]) => (
                <span
                  key={l as string}
                  className={
                    a
                      ? "rounded-[7px] bg-[#f3f3f1] px-2.5 py-1 font-medium text-ink"
                      : "px-2.5 py-1 text-muted"
                  }
                >
                  {l} <span className="nums text-faint">{n}</span>
                </span>
              ))}
            </div>
            <Search placeholder="Search accounts, drivers, plates…" width={260} />
          </div>
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="border-y border-[#f1f1ef] text-[10.5px] uppercase tracking-[0.06em] text-faint">
                <th className="px-4 py-2 font-medium">Account</th>
                <th className="py-2 font-medium">Type</th>
                <th className="py-2 text-right font-medium">Available</th>
                <th className="w-[160px] py-2 pl-6 font-medium">Credit used</th>
                <th className="py-2 text-center font-medium">Drivers</th>
                <th className="py-2 font-medium">Last activity</th>
                <th className="px-4 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((a) => {
                const [c, bg] = statusStyle[a.status];
                return (
                  <tr key={a.id} className="border-b border-[#f5f5f3] last:border-0">
                    <td className="px-4 py-[8px]">
                      <p className="font-medium text-ink">{a.name}</p>
                      <p className="nums text-[10.5px] text-faint">#{a.id}</p>
                    </td>
                    <td className="text-ink-2">{a.type}</td>
                    <td className="nums text-right font-medium text-ink">{a.bal === "—" ? "—" : `CI$${a.bal}`}</td>
                    <td className="py-2 pl-6">
                      <div className="flex items-center gap-2">
                        <div className="w-[90px]">
                          <Progress
                            value={a.used}
                            height={5}
                            color={a.used >= 100 ? "#d9534a" : a.used > 85 ? "#e0a13a" : "#c9c9c5"}
                          />
                        </div>
                        <span className="nums text-[11px] text-muted">{a.used}%</span>
                      </div>
                    </td>
                    <td className="nums text-center text-ink-2">{a.drivers}</td>
                    <td className="text-muted">{a.last}</td>
                    <td className="px-4">
                      <Pill color={c} bg={bg}>
                        {a.status}
                      </Pill>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  );
}

// ─── Mobile ─────────────────────────────────────────────────────

export function FuelUpMobile() {
  return (
    <div className="flex h-full flex-col bg-[#f7f7f5]">
      <StatusBar />
      <div className="flex items-center justify-between px-5 pt-4">
        <div>
          <p className="text-[13px] text-muted">Good morning</p>
          <p className="text-[20px] font-semibold tracking-[-0.02em] text-ink">Island Logistics</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative grid size-10 place-items-center rounded-full bg-white shadow-[0_0_0_1px_#ececea]">
            <Bell className="size-[18px] text-ink-2" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full ring-2 ring-white" style={{ background: AMBER }} />
          </span>
          <Avatar name="Daniel Solomon" size={40} index={1} />
        </div>
      </div>

      <div
        className="relative mx-4 mt-5 overflow-hidden rounded-[22px] p-5 text-white shadow-[0_18px_30px_-16px_rgb(226_125_12/0.7)]"
        style={{ background: "linear-gradient(135deg,#f0962a 0%,#e27d0c 55%,#cf6c05 100%)" }}
      >
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 right-10 size-40 rounded-full bg-white/[0.07]" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-white/80">Available credit</p>
            <Fuel className="size-5 text-white/80" />
          </div>
          <p className="nums mt-1 text-[36px] font-semibold tracking-[-0.03em]">
            <span className="mr-1 align-top text-[16px] font-medium leading-[2.6] text-white/75">CI$</span>
            12,480<span className="text-white/60">.50</span>
          </p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/25">
            <div className="h-full w-[38%] rounded-full bg-white" />
          </div>
          <div className="nums mt-2 flex justify-between text-[11.5px] text-white/80">
            <span>CI$7,519.50 used</span>
            <span>Limit CI$20,000</span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2 px-4">
        {[
          { l: "Top up", i: Plus, primary: true },
          { l: "Statement", i: FileText },
          { l: "Drivers", i: Users },
          { l: "Vehicles", i: Car },
        ].map(({ l, i: I, primary }) => (
          <div key={l} className="flex flex-col items-center gap-1.5">
            <span
              className="grid size-[52px] place-items-center rounded-[16px] shadow-[0_0_0_1px_#ececea]"
              style={{ background: primary ? AMBER_SOFT : "#fff", color: primary ? AMBER : "#373c45" }}
            >
              <I className="size-5" strokeWidth={2} />
            </span>
            <span className="text-[11.5px] font-medium text-ink-2">{l}</span>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-6 flex-1 rounded-t-[22px] bg-white px-4 pt-4 shadow-[0_0_0_1px_#efefed]">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-semibold text-ink">Recent fills</p>
          <p className="text-[12px] font-medium" style={{ color: AMBER }}>
            See all
          </p>
        </div>
        <div className="mt-2 divide-y divide-[#f3f3f1]">
          {fills.slice(0, 4).map((f, i) => (
            <div key={i} className="flex items-center gap-3 py-3">
              <span className="grid size-10 place-items-center rounded-full" style={{ background: AMBER_SOFT }}>
                <Droplet className="size-[18px]" style={{ color: AMBER }} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-medium text-ink">{f.station}</p>
                <p className="truncate text-[11.5px] text-muted">
                  {f.driver.split(" ")[0]} · {f.gal} gal
                </p>
              </div>
              <div className="text-right">
                <p className="nums text-[13.5px] font-semibold text-ink">−CI${f.amt}</p>
                <p className="text-[11px] text-faint">{f.when.split(",")[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex h-[84px] shrink-0 items-start justify-around border-t border-[#efefed] bg-white px-6 pt-3">
        {[
          { l: "Home", i: Home, a: true },
          { l: "Activity", i: Receipt },
          { l: "Pay", i: QrCode },
          { l: "Help", i: LifeBuoy },
          { l: "Account", i: User },
        ].map(({ l, i: I, a }) => (
          <div key={l} className="flex flex-col items-center gap-1" style={{ color: a ? AMBER : "#9aa0aa" }}>
            <I className="size-[22px]" strokeWidth={a ? 2.2 : 1.8} />
            <span className="text-[10.5px] font-medium">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
