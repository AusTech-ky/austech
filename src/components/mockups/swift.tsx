import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Bell,
  Calendar,
  Car,
  ChevronRight,
  Clock,
  FileText,
  Gauge,
  Layers,
  LayoutGrid,
  Map as MapIcon,
  Minus,
  Navigation,
  Plus,
  Settings,
  Share2,
  Wrench,
} from "lucide-react";
import { Avatar, Card, CardHeader, Dot, MButton, Pill, Progress, StatusBar } from "./primitives";
import { cn } from "@/lib/cn";

const BLUE = "#2563eb";

type Status = "moving" | "idle" | "parked" | "alert";
const statusColor: Record<Status, string> = {
  moving: "#2563eb",
  idle: "#e09a1a",
  parked: "#8b919b",
  alert: "#d9443a",
};
const statusLabel: Record<Status, string> = {
  moving: "Moving",
  idle: "Idle",
  parked: "Parked",
  alert: "Alert",
};

type Vehicle = {
  id: string;
  model: string;
  x: number;
  y: number;
  status: Status;
  heading?: number;
  place: string;
  meta: string;
};

/** World coordinates are a stylised Grand Cayman in a 1000×700 space. */
const vehicles: Vehicle[] = [
  { id: "KY-4821", model: "Toyota Hilux", x: 206, y: 420, status: "moving", heading: -12, place: "West Bay Rd", meta: "34 mph" },
  { id: "KY-2290", model: "Ford Transit", x: 318, y: 492, status: "moving", heading: 80, place: "Harbour Dr", meta: "18 mph" },
  { id: "KY-7713", model: "Ford Ranger", x: 520, y: 340, status: "idle", place: "Esterley Tibbetts Hwy", meta: "Idle 6 min" },
  { id: "KY-3056", model: "Kia Sportage", x: 176, y: 300, status: "parked", place: "Seven Mile Beach", meta: "Parked 2 h" },
  { id: "KY-5160", model: "Honda CR-V", x: 612, y: 470, status: "moving", heading: 95, place: "Shamrock Rd", meta: "41 mph" },
  { id: "KY-1184", model: "Toyota Yaris", x: 258, y: 182, status: "alert", place: "West Bay", meta: "Left zone" },
  { id: "KY-6402", model: "Nissan Kicks", x: 410, y: 468, status: "parked", place: "George Town", meta: "Parked 40 min" },
  { id: "KY-8837", model: "Hyundai Tucson", x: 720, y: 486, status: "idle", place: "Bodden Town", meta: "Idle 12 min" },
  { id: "KY-9075", model: "Toyota RAV4", x: 690, y: 262, status: "moving", heading: 10, place: "North Side", meta: "29 mph" },
  { id: "KY-4410", model: "Kia Picanto", x: 360, y: 400, status: "parked", place: "Crewe Rd", meta: "Parked 5 h" },
];

const route: [number, number][] = [
  [318, 506],
  [280, 500],
  [238, 488],
  [218, 460],
  [210, 440],
  [206, 420],
];

function MapBase({ showLabels = true }: { showLabels?: boolean }) {
  return (
    <>
      <rect x="-500" y="-500" width="2000" height="1700" fill="#e7eff8" />
      {/* Reef / shallows */}
      <path
        d="M120 150 C170 120,230 130,260 170 C285 205,280 260,300 300 C320 330,380 330,430 300 C480 270,520 250,560 250 C620 250,640 220,680 200 C760 170,860 180,940 200 L1100 210 L1100 520 C900 530,780 520,700 500 C600 480,500 490,420 510 C350 530,290 540,250 520 C220 505,205 470,200 430 C195 380,190 330,170 290 C150 250,110 220,100 190 C95 170,105 155,120 150 Z"
        fill="none"
        stroke="#d7e4f1"
        strokeWidth="26"
        strokeLinejoin="round"
      />
      {/* Land */}
      <path
        d="M120 150 C170 120,230 130,260 170 C285 205,280 260,300 300 C320 330,380 330,430 300 C480 270,520 250,560 250 C620 250,640 220,680 200 C760 170,860 180,940 200 L1100 210 L1100 520 C900 530,780 520,700 500 C600 480,500 490,420 510 C350 530,290 540,250 520 C220 505,205 470,200 430 C195 380,190 330,170 290 C150 250,110 220,100 190 C95 170,105 155,120 150 Z"
        fill="#f5f4ef"
        stroke="#dde3ea"
        strokeWidth="1.5"
      />
      {/* Parks / green areas */}
      <path d="M560 300 C600 290,650 300,660 330 C670 360,630 380,590 375 C555 370,540 330,560 300 Z" fill="#e6efdf" />
      <path d="M820 250 C860 240,900 250,905 280 C910 310,870 320,840 312 C815 305,805 270,820 250 Z" fill="#e6efdf" />
      <path d="M335 355 C360 345,395 350,400 372 C405 392,375 402,350 396 C330 390,322 368,335 355 Z" fill="#eaeee3" />
      {/* Road casings */}
      <g fill="none" stroke="#e4e1d8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M232 500 C212 440,196 350,168 270 C150 225,160 190,205 168" strokeWidth="11" />
        <path d="M232 500 C330 520,450 482,560 470 C680 458,820 490,1100 480" strokeWidth="11" />
        <path d="M300 472 C360 420,420 380,520 340 C600 312,700 296,820 272 C880 262,960 250,1100 250" strokeWidth="9" />
        <path d="M420 498 C430 440,462 400,520 340" strokeWidth="7" />
        <path d="M612 468 C616 420,640 360,690 262" strokeWidth="7" />
      </g>
      {/* Roads */}
      <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round">
        <path d="M232 500 C212 440,196 350,168 270 C150 225,160 190,205 168" strokeWidth="7" />
        <path d="M232 500 C330 520,450 482,560 470 C680 458,820 490,1100 480" strokeWidth="7" />
        <path d="M300 472 C360 420,420 380,520 340 C600 312,700 296,820 272 C880 262,960 250,1100 250" strokeWidth="5.5" />
        <path d="M420 498 C430 440,462 400,520 340" strokeWidth="4" />
        <path d="M612 468 C616 420,640 360,690 262" strokeWidth="4" />
        <path d="M260 488 C280 460,300 440,340 430 M350 505 C352 470,365 440,395 420 M470 485 C490 450,520 430,560 420 M700 488 C705 440,730 400,760 380" strokeWidth="2.5" />
      </g>
      {/* Airport strip */}
      <rect x="455" y="438" width="80" height="8" rx="2" fill="#e9e7e0" transform="rotate(-8 495 442)" />
      {showLabels && (
        <g fontFamily="var(--font-geist-mono), monospace" fontSize="10" letterSpacing="2" fill="#9aa2ad">
          <text x="150" y="208">WEST BAY</text>
          <text x="0" y="0" transform="translate(186 392) rotate(-76)">SEVEN MILE BEACH</text>
          <text x="262" y="478">GEORGE TOWN</text>
          <text x="505" y="498">SAVANNAH</text>
          <text x="742" y="512">BODDEN TOWN</text>
          <text x="690" y="236">NORTH SIDE</text>
          <text x="380" y="232" fill="#a9bfd6" fontStyle="italic">NORTH SOUND</text>
        </g>
      )}
    </>
  );
}

function Pin({ v, selected }: { v: Vehicle; selected?: boolean }) {
  const c = statusColor[v.status];
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: 0, top: 0 }}>
      {(selected || v.status === "alert") && (
        <span className="absolute inset-0 m-auto size-6 animate-pulse-ring rounded-full" style={{ background: c }} />
      )}
      <span
        className={cn(
          "relative grid place-items-center rounded-full bg-white shadow-[0_2px_6px_rgb(13_16_20/0.25)]",
          selected ? "size-[30px]" : "size-[22px]",
        )}
      >
        <span
          className={cn("grid place-items-center rounded-full", selected ? "size-[22px]" : "size-[16px]")}
          style={{ background: c }}
        >
          {v.status === "moving" ? (
            <Navigation
              className={selected ? "size-3 text-white" : "size-2.5 text-white"}
              fill="white"
              strokeWidth={0}
              style={{ transform: `rotate(${(v.heading ?? 0) + 45}deg)` }}
            />
          ) : v.status === "alert" ? (
            <span className="text-[10px] font-bold text-white">!</span>
          ) : (
            <span className="size-1.5 rounded-full bg-white" />
          )}
        </span>
      </span>
    </div>
  );
}

function FleetMap({
  width,
  height,
  s,
  tx,
  ty,
  selectedId,
  showRoute,
  only,
  showLabels = true,
}: {
  width: number;
  height: number;
  s: number;
  tx: number;
  ty: number;
  selectedId?: string;
  showRoute?: boolean;
  only?: string[];
  showLabels?: boolean;
}) {
  const list = only ? vehicles.filter((v) => only.includes(v.id)) : vehicles;
  const routeD = route.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ width, height }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="absolute inset-0">
        <g transform={`translate(${tx} ${ty}) scale(${s})`}>
          <MapBase showLabels={showLabels} />
          {showRoute && (
            <>
              <path d={routeD} fill="none" stroke={BLUE} strokeOpacity="0.18" strokeWidth={14 / s} strokeLinecap="round" strokeLinejoin="round" />
              <path d={routeD} fill="none" stroke={BLUE} strokeWidth={4 / s} strokeLinecap="round" strokeLinejoin="round" />
              <circle cx={route[0][0]} cy={route[0][1]} r={6 / s} fill="white" stroke={BLUE} strokeWidth={3 / s} />
            </>
          )}
        </g>
      </svg>
      {list.map((v) => (
        <div key={v.id} className="absolute" style={{ left: tx + v.x * s, top: ty + v.y * s }}>
          <Pin v={v} selected={v.id === selectedId} />
        </div>
      ))}
    </div>
  );
}

function Rail({ active }: { active: string }) {
  const items = [
    { k: "map", i: MapIcon },
    { k: "vehicles", i: Car },
    { k: "alerts", i: Bell },
    { k: "service", i: Wrench },
    { k: "agreements", i: FileText },
    { k: "reports", i: BarChart3 },
  ];
  return (
    <aside className="flex h-full w-[60px] shrink-0 flex-col items-center border-r border-[#ececea] bg-[#fafaf9] py-4">
      <span className="grid size-8 place-items-center rounded-[9px] text-[13px] font-bold italic text-white" style={{ background: BLUE }}>
        S
      </span>
      <div className="mt-6 flex flex-col gap-1.5">
        {items.map(({ k, i: I }) => (
          <span
            key={k}
            className={cn(
              "relative grid size-9 place-items-center rounded-[9px]",
              k === active ? "bg-white text-ink shadow-[0_0_0_1px_#ececea,0_1px_2px_rgb(0_0_0/0.05)]" : "text-[#8b919b]",
            )}
          >
            <I className="size-[17px]" strokeWidth={k === active ? 2.1 : 1.8} style={k === active ? { color: BLUE } : undefined} />
            {k === "alerts" && <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[#d9443a]" />}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-col items-center gap-3">
        <Settings className="size-[17px] text-[#8b919b]" />
        <Avatar name="Rhea Connolly" size={28} index={4} />
      </div>
    </aside>
  );
}

// ─── Live map ───────────────────────────────────────────────────

export function SwiftMap() {
  const MAP_W = 820;
  const s = 1.22;
  const tx = 410 - 440 * s;
  const ty = 380 - 350 * s;
  const sel = vehicles[0];
  return (
    <div className="flex h-full bg-white">
      <Rail active="map" />
      <section className="flex w-[320px] shrink-0 flex-col border-r border-[#ececea]">
        <div className="px-4 pb-3 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-[16px] font-semibold tracking-[-0.01em] text-ink">Fleet</p>
            <span className="flex items-center gap-1.5 text-[11px] text-muted">
              <Dot color="#13915f" pulse /> Live
            </span>
          </div>
          <div className="mt-3 flex h-8 items-center gap-2 rounded-[8px] border border-[#e8e8e5] px-2.5 text-[12px] text-faint">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="7" cy="7" r="4.5" />
              <path d="M10.5 10.5L14 14" strokeLinecap="round" />
            </svg>
            Search plate, model or customer
          </div>
        </div>
        <div className="flex-1 divide-y divide-[#f3f3f1] overflow-hidden border-t border-[#f1f1ef]">
          {vehicles.slice(0, 9).map((v, i) => (
            <div key={v.id} className={cn("flex items-center gap-3 px-4 py-[11px]", i === 0 && "bg-[#f4f7fe]")}>
              <span className="grid size-9 place-items-center rounded-[9px] bg-[#f4f4f2]">
                <Car className="size-4 text-ink-2" strokeWidth={1.8} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="nums text-[12.5px] font-semibold text-ink">{v.id}</p>
                  <p className="truncate text-[11.5px] text-muted">{v.model}</p>
                </div>
                <p className="mt-0.5 truncate text-[11px] text-faint">{v.place}</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: statusColor[v.status] }}>
                  <Dot color={statusColor[v.status]} /> {statusLabel[v.status]}
                </span>
                <p className="nums mt-0.5 text-[10.5px] text-faint">{v.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative flex-1 overflow-hidden" style={{ width: MAP_W }}>
        <FleetMap width={MAP_W} height={740} s={s} tx={tx} ty={ty} selectedId={sel.id} />

        {/* Filters */}
        <div className="absolute left-4 top-4 flex gap-1.5">
          {[
            ["All", "64", "#0d1014", true],
            ["Moving", "22", statusColor.moving],
            ["Idle", "9", statusColor.idle],
            ["Parked", "31", statusColor.parked],
            ["Alerts", "2", statusColor.alert],
          ].map(([l, n, c, a]) => (
            <span
              key={l as string}
              className={cn(
                "flex h-8 items-center gap-1.5 rounded-full px-3 text-[12px] shadow-[0_0_0_1px_rgb(13_16_20/0.06),0_2px_6px_rgb(13_16_20/0.06)]",
                a ? "bg-ink font-medium text-white" : "bg-white text-ink-2",
              )}
            >
              {!a && <span className="size-1.5 rounded-full" style={{ background: c as string }} />}
              {l}
              <span className={cn("nums", a ? "text-white/60" : "text-faint")}>{n}</span>
            </span>
          ))}
        </div>

        {/* Controls */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <div className="overflow-hidden rounded-[10px] bg-white shadow-[0_0_0_1px_rgb(13_16_20/0.06),0_2px_6px_rgb(13_16_20/0.08)]">
            <span className="grid size-9 place-items-center border-b border-[#f0f0ee]">
              <Plus className="size-4 text-ink-2" />
            </span>
            <span className="grid size-9 place-items-center">
              <Minus className="size-4 text-ink-2" />
            </span>
          </div>
          <span className="grid size-9 place-items-center rounded-[10px] bg-white shadow-[0_0_0_1px_rgb(13_16_20/0.06),0_2px_6px_rgb(13_16_20/0.08)]">
            <Layers className="size-4 text-ink-2" />
          </span>
        </div>

        {/* Selected vehicle popover */}
        <div
          className="absolute w-[272px] rounded-[14px] bg-white p-4 shadow-[0_0_0_1px_rgb(13_16_20/0.06),0_16px_40px_-12px_rgb(13_16_20/0.28)]"
          style={{ left: tx + sel.x * s + 28, top: ty + sel.y * s - 150 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="nums text-[15px] font-semibold text-ink">{sel.id}</p>
              <p className="text-[12px] text-muted">{sel.model} · Silver</p>
            </div>
            <Pill color={BLUE} bg="#eaf1fe">
              <Dot color={BLUE} /> Moving
            </Pill>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 rounded-[10px] bg-[#fafaf9] p-2.5">
            {[
              ["Speed", "34 mph"],
              ["Today", "41.2 mi"],
              ["Ignition", "07:48"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[10px] text-muted">{k}</p>
                <p className="nums text-[12.5px] font-semibold text-ink">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 text-[11.5px]">
            <Avatar name="Coral Bay Villas" size={20} index={3} />
            <span className="text-ink-2">
              Leased to <span className="font-medium text-ink">Coral Bay Villas</span>
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#f1f1ef] pt-3 text-[12px] font-medium" style={{ color: BLUE }}>
            <span>View trip history</span>
            <ChevronRight className="size-4" />
          </div>
        </div>

        {/* Alert toast */}
        <div className="absolute bottom-5 left-4 flex w-[330px] items-center gap-3 rounded-[12px] bg-white p-3 shadow-[0_0_0_1px_rgb(13_16_20/0.06),0_10px_30px_-10px_rgb(13_16_20/0.25)]">
          <span className="grid size-9 place-items-center rounded-[9px] bg-[#fcebea]">
            <AlertTriangle className="size-4 text-[#d9443a]" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] font-medium text-ink">KY-1184 left rental zone</p>
            <p className="text-[11px] text-muted">West Bay geofence · 2 min ago</p>
          </div>
          <span className="rounded-[7px] bg-[#f4f4f2] px-2 py-1 text-[11px] font-medium text-ink">Review</span>
        </div>

        <div className="absolute bottom-5 right-4 rounded-full bg-white/90 px-3 py-1.5 text-[11px] text-muted shadow-[0_0_0_1px_rgb(13_16_20/0.06)]">
          Updated 3s ago
        </div>
      </section>
    </div>
  );
}

// ─── Vehicle detail ─────────────────────────────────────────────

const trips = [
  { from: "Harbour Dr", to: "West Bay Rd", start: "08:02", end: "Now", dist: "4.8 mi", live: true },
  { from: "Crewe Rd", to: "Harbour Dr", start: "07:48", end: "07:58", dist: "3.1 mi" },
  { from: "Savannah", to: "Crewe Rd", start: "Yesterday 17:20", end: "17:44", dist: "9.6 mi" },
];

export function SwiftVehicle() {
  const MAP_W = 770;
  const MAP_H = 292;
  const s = 1.55;
  const tx = MAP_W / 2 - 262 * s;
  const ty = MAP_H / 2 - 462 * s;
  return (
    <div className="flex h-full bg-[#fcfcfb]">
      <Rail active="vehicles" />
      <main className="min-w-0 flex-1 px-7 py-5">
        <div className="flex items-center gap-1.5 text-[12px] text-muted">
          <ArrowLeft className="size-3.5" /> Vehicles <ChevronRight className="size-3 text-faint" />
          <span className="text-ink">KY-4821</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div className="flex items-center gap-4">
            <span className="grid size-12 place-items-center rounded-[12px] bg-[#eaf1fe]">
              <Car className="size-6" style={{ color: BLUE }} strokeWidth={1.8} />
            </span>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-[21px] font-semibold tracking-[-0.02em] text-ink">Toyota Hilux</h3>
                <span className="nums rounded-[6px] border border-[#e5e5e2] bg-white px-1.5 py-0.5 font-mono text-[11.5px] text-ink-2">
                  KY-4821
                </span>
                <Pill color={BLUE} bg="#eaf1fe">
                  <Dot color={BLUE} pulse /> Moving · 34 mph
                </Pill>
              </div>
              <p className="mt-0.5 text-[12.5px] text-muted">2023 · Double cab · Silver · West Bay Rd, heading north</p>
            </div>
          </div>
          <div className="flex gap-2">
            <MButton icon={Share2}>Share location</MButton>
            <MButton variant="primary" color={BLUE} icon={Bell}>
              New alert rule
            </MButton>
          </div>
        </div>

        <div className="mt-4 flex gap-5 border-b border-[#ececea] text-[12.5px]">
          {["Overview", "Trips", "Alerts", "Service", "Agreement", "Documents"].map((t, i) => (
            <span
              key={t}
              className={cn("pb-2.5", i === 0 ? "border-b-2 font-medium text-ink" : "text-muted")}
              style={i === 0 ? { borderColor: BLUE } : undefined}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-[1fr_300px] gap-4">
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="relative" style={{ height: MAP_H }}>
                <FleetMap width={MAP_W} height={MAP_H} s={s} tx={tx} ty={ty} selectedId="KY-4821" only={["KY-4821"]} showRoute showLabels />
                <div className="absolute left-3 top-3 flex items-center gap-2 rounded-[9px] bg-white px-2.5 py-1.5 text-[11.5px] shadow-[0_0_0_1px_rgb(13_16_20/0.06),0_2px_6px_rgb(13_16_20/0.08)]">
                  <Calendar className="size-3.5 text-muted" /> Today <span className="text-faint">·</span>
                  <span className="text-muted">Replay</span>
                </div>
              </div>
            </Card>
            <Card>
              <CardHeader title="Trips today" right="3 trips · 17.5 mi" />
              <div className="px-4 pb-3">
                {trips.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 border-t border-[#f3f3f1] py-2.5 first:border-0">
                    <div className="flex flex-col items-center">
                      <span className="size-2 rounded-full" style={{ background: t.live ? BLUE : "#c9c9c5" }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[12.5px] font-medium text-ink">
                        {t.from} <span className="text-faint">→</span> {t.to}
                      </p>
                      <p className="nums text-[11px] text-muted">
                        {t.start} – {t.end}
                      </p>
                    </div>
                    <p className="nums text-[12px] text-ink-2">{t.dist}</p>
                    {t.live && (
                      <Pill color={BLUE} bg="#eaf1fe">
                        Live
                      </Pill>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-[12.5px] font-medium text-ink">Agreement</p>
                <Pill color="#13915f" bg="#e7f5ee">
                  Active
                </Pill>
              </div>
              <div className="mt-3 flex items-center gap-2.5">
                <Avatar name="Coral Bay Villas" size={30} index={3} />
                <div>
                  <p className="text-[12.5px] font-medium text-ink">Coral Bay Villas</p>
                  <p className="text-[11px] text-muted">Lease · 24 months</p>
                </div>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-y-2 text-[11.5px]">
                <dt className="text-muted">Started</dt>
                <dd className="nums text-right text-ink">12 Mar 2025</dd>
                <dt className="text-muted">Ends</dt>
                <dd className="nums text-right text-ink">11 Mar 2027</dd>
              </dl>
              <div className="mt-3">
                <div className="mb-1.5 flex justify-between text-[11px]">
                  <span className="text-muted">Mileage allowance</span>
                  <span className="nums text-ink">14,210 / 24,000 mi</span>
                </div>
                <Progress value={59} color={BLUE} height={5} />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Wrench className="size-3.5 text-muted" />
                <p className="text-[12.5px] font-medium text-ink">Next service</p>
              </div>
              <p className="nums mt-2 text-[20px] font-semibold tracking-[-0.02em] text-ink">
                620 mi <span className="text-[12px] font-normal text-muted">remaining</span>
              </p>
              <div className="mt-2">
                <Progress value={88} color="#e09a1a" height={5} />
              </div>
              <p className="mt-2 text-[11px] text-muted">Booked for 2 Oct · Island Auto Care</p>
            </Card>

            <Card className="p-4">
              <p className="text-[12.5px] font-medium text-ink">Recent alerts</p>
              <div className="mt-2.5 space-y-2.5">
                {[
                  { i: Clock, t: "Moved outside hours", s: "Sun 23:14 · 2.1 mi", c: "#e09a1a" },
                  { i: Gauge, t: "Speed over 50 mph", s: "Thu 16:02 · Esterley Tibbetts", c: "#d9443a" },
                ].map(({ i: I, t, s: sub, c }) => (
                  <div key={t} className="flex items-center gap-2.5">
                    <span className="grid size-7 place-items-center rounded-[8px]" style={{ background: `${c}1a` }}>
                      <I className="size-3.5" style={{ color: c }} />
                    </span>
                    <div>
                      <p className="text-[12px] font-medium text-ink">{t}</p>
                      <p className="text-[10.5px] text-muted">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Mobile ─────────────────────────────────────────────────────

export function SwiftMobile() {
  const W = 366;
  const H = 520;
  const s = 1.3;
  const tx = W / 2 - 262 * s;
  const ty = H / 2 - 372 * s;
  return (
    <div className="relative h-full bg-[#e7eff8]">
      <div className="absolute inset-x-0 top-0" style={{ height: H }}>
        <FleetMap width={W} height={H} s={s} tx={tx} ty={ty} selectedId="KY-4821" showLabels={false} />
      </div>
      <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-white/85 to-transparent pb-6">
        <StatusBar />
        <div className="mx-4 mt-2 flex h-11 items-center gap-2 rounded-[14px] bg-white px-3.5 text-[14px] text-faint shadow-[0_0_0_1px_rgb(13_16_20/0.05),0_6px_16px_-6px_rgb(13_16_20/0.2)]">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7">
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5L14 14" strokeLinecap="round" />
          </svg>
          Find a vehicle
          <span className="ml-auto"><LayoutGrid className="size-4 text-muted" /></span>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 rounded-t-[28px] bg-white px-5 pb-10 pt-3 shadow-[0_-10px_30px_-10px_rgb(13_16_20/0.18)]">
        <div className="mx-auto h-1 w-9 rounded-full bg-[#e2e2df]" />
        <div className="mt-4 flex items-start justify-between">
          <div>
            <p className="nums text-[20px] font-semibold tracking-[-0.02em] text-ink">KY-4821</p>
            <p className="text-[13px] text-muted">Toyota Hilux · West Bay Rd</p>
          </div>
          <Pill color={BLUE} bg="#eaf1fe" className="h-6 px-2.5 text-[12px]">
            <Dot color={BLUE} pulse /> 34 mph
          </Pill>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ["Today", "41.2 mi"],
            ["Odometer", "38,406"],
            ["Service", "620 mi"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-[12px] bg-[#f6f6f4] px-3 py-2.5">
              <p className="text-[11px] text-muted">{k}</p>
              <p className="nums text-[14px] font-semibold text-ink">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2.5 rounded-[12px] border border-[#efefed] px-3 py-2.5">
          <Avatar name="Coral Bay Villas" size={30} index={3} />
          <div className="flex-1">
            <p className="text-[13px] font-medium text-ink">Coral Bay Villas</p>
            <p className="text-[11.5px] text-muted">Lease ends 11 Mar 2027</p>
          </div>
          <ChevronRight className="size-4 text-faint" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <span className="flex h-11 items-center justify-center gap-2 rounded-[12px] text-[14px] font-medium text-white" style={{ background: BLUE }}>
            <Navigation className="size-4" /> Directions
          </span>
          <span className="flex h-11 items-center justify-center gap-2 rounded-[12px] bg-[#f3f3f1] text-[14px] font-medium text-ink">
            <Clock className="size-4" /> Trips
          </span>
        </div>
      </div>
    </div>
  );
}
