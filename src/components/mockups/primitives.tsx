/**
 * Building blocks for product UI mockups. Everything here is drawn at
 * 1:1 design pixels and scaled by <ScaleFrame>.
 */
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

// ─── App shell ──────────────────────────────────────────────────

export function Sidebar({
  brand,
  brandMark,
  brandColor,
  context,
  items,
  footer,
  width = 216,
}: {
  brand: string;
  brandMark: LucideIcon;
  brandColor: string;
  context?: { title: string; subtitle: string };
  items: { label: string; icon: LucideIcon; active?: boolean; count?: string }[];
  footer?: React.ReactNode;
  width?: number;
}) {
  const Mark = brandMark;
  return (
    <aside
      className="flex h-full shrink-0 flex-col border-r border-[#ececea] bg-[#fafaf9] px-3 py-4"
      style={{ width }}
    >
      <div className="flex items-center gap-2.5 px-2">
        <span
          className="grid size-7 place-items-center rounded-[8px] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]"
          style={{ background: brandColor }}
        >
          <Mark className="size-4" strokeWidth={2.25} />
        </span>
        <span className="text-[14px] font-semibold tracking-[-0.01em] text-ink">{brand}</span>
      </div>

      {context && (
        <div className="mt-5 flex items-center gap-2.5 rounded-[10px] border border-[#ececea] bg-white px-2.5 py-2 shadow-[0_1px_2px_rgb(0_0_0/0.03)]">
          <div className="grid size-7 place-items-center rounded-[7px] bg-[#f1f1ef] text-[11px] font-semibold text-ink-2">
            {context.title
              .split(" ")
              .slice(0, 2)
              .map((w) => w[0])
              .join("")}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-medium text-ink">{context.title}</p>
            <p className="truncate text-[11px] text-muted">{context.subtitle}</p>
          </div>
          <svg width="10" height="10" viewBox="0 0 10 10" className="text-faint">
            <path d="M3 4l2-2 2 2M3 6l2 2 2-2" stroke="currentColor" fill="none" strokeWidth="1.2" />
          </svg>
        </div>
      )}

      <nav className="mt-5 space-y-0.5">
        {items.map(({ label, icon: Icon, active, count }) => (
          <div
            key={label}
            className={cn(
              "flex h-8 items-center gap-2.5 rounded-[8px] px-2.5 text-[13px]",
              active
                ? "bg-white font-medium text-ink shadow-[0_0_0_1px_#ececea,0_1px_2px_rgb(0_0_0/0.04)]"
                : "text-[#5b616b]",
            )}
          >
            <Icon className="size-[15px]" strokeWidth={active ? 2.1 : 1.8} style={active ? { color: brandColor } : undefined} />
            <span className="flex-1">{label}</span>
            {count && <span className="nums text-[11px] text-faint">{count}</span>}
          </div>
        ))}
      </nav>

      <div className="mt-auto">{footer}</div>
    </aside>
  );
}

export function TopBar({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-ink">{title}</h3>
        {subtitle && <p className="mt-0.5 text-[12.5px] text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function MButton({
  children,
  variant = "secondary",
  color,
  icon: Icon,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  color?: string;
  icon?: LucideIcon;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-[8px] px-3 text-[12.5px] font-medium",
        variant === "primary"
          ? "text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(0_0_0/0.12)]"
          : "border border-[#e5e5e2] bg-white text-ink shadow-[0_1px_2px_rgb(0_0_0/0.04)]",
      )}
      style={variant === "primary" ? { background: color ?? "#0d1014" } : undefined}
    >
      {Icon && <Icon className="size-3.5" strokeWidth={2} />}
      {children}
    </span>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-[12px] border border-[#ececea] bg-white shadow-[0_1px_2px_rgb(0_0_0/0.03)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 pt-3.5 pb-2">
      <p className="text-[12.5px] font-medium text-ink">{title}</p>
      {right && <div className="text-[11.5px] text-muted">{right}</div>}
    </div>
  );
}

// ─── Small elements ─────────────────────────────────────────────

const avatarPalette = ["#e9e3fb", "#e0efff", "#fde8d7", "#dff3ea", "#fbe3e8", "#eef0f3"];
const avatarInk = ["#5b46c9", "#2360c8", "#b45d12", "#15805a", "#b83a55", "#4b5260"];

export function Avatar({ name, size = 28, index }: { name: string; size?: number; index?: number }) {
  const i = index ?? [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % avatarPalette.length;
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-semibold"
      style={{
        width: size,
        height: size,
        background: avatarPalette[i],
        color: avatarInk[i],
        fontSize: Math.round(size * 0.38),
      }}
    >
      {initials}
    </span>
  );
}

export function Pill({
  children,
  color,
  bg,
  className,
}: {
  children: React.ReactNode;
  color: string;
  bg: string;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex h-[20px] items-center gap-1 rounded-full px-2 text-[11px] font-medium", className)}
      style={{ color, background: bg }}
    >
      {children}
    </span>
  );
}

export function Dot({ color, pulse }: { color: string; pulse?: boolean }) {
  return (
    <span className="relative inline-flex size-2">
      {pulse && (
        <span className="absolute inset-0 animate-pulse-ring rounded-full" style={{ background: color }} />
      )}
      <span className="relative inline-flex size-2 rounded-full" style={{ background: color }} />
    </span>
  );
}

export function Progress({ value, color, track = "#f0f0ee", height = 6 }: { value: number; color: string; track?: string; height?: number }) {
  return (
    <div className="w-full overflow-hidden rounded-full" style={{ background: track, height }}>
      <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

export function Search({ placeholder, width = 240 }: { placeholder: string; width?: number }) {
  return (
    <div
      className="flex h-8 items-center gap-2 rounded-[8px] border border-[#e8e8e5] bg-white px-2.5 text-[12px] text-faint"
      style={{ width }}
    >
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="7" cy="7" r="4.5" />
        <path d="M10.5 10.5L14 14" strokeLinecap="round" />
      </svg>
      <span className="flex-1">{placeholder}</span>
      <kbd className="rounded-[4px] border border-[#ececea] bg-[#fafaf9] px-1 font-mono text-[10px] text-faint">⌘K</kbd>
    </div>
  );
}

// ─── Charts (static SVG) ────────────────────────────────────────

/** Smooth area/line chart from a series. */
export function AreaChart({
  data,
  width,
  height,
  color,
  fill = true,
  strokeWidth = 2,
  highlightLast = true,
}: {
  data: number[];
  width: number;
  height: number;
  color: string;
  fill?: boolean;
  strokeWidth?: number;
  highlightLast?: boolean;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pad = 4;
  const pts = data.map((d, i) => [
    (i / (data.length - 1)) * width,
    pad + (1 - (d - min) / (max - min || 1)) * (height - pad * 2),
  ]);
  // Catmull-Rom → Bézier for a gentle curve
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${p2[0]} ${p2[1]}`;
  }
  const id = `g-${color.replace("#", "")}-${width}-${height}`;
  const last = pts[pts.length - 1];
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.16" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={`${d} L ${width} ${height} L 0 ${height} Z`} fill={`url(#${id})`} />}
      <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {highlightLast && (
        <>
          <circle cx={last[0]} cy={last[1]} r="6" fill={color} opacity="0.15" />
          <circle cx={last[0]} cy={last[1]} r="3" fill="white" stroke={color} strokeWidth="2" />
        </>
      )}
    </svg>
  );
}

export function BarChart({
  data,
  labels,
  width,
  height,
  color,
  muted = "#ecebe8",
  activeIndex,
  gap = 10,
  radius = 4,
}: {
  data: number[];
  labels?: string[];
  width: number;
  height: number;
  color: string;
  muted?: string;
  activeIndex?: number;
  gap?: number;
  radius?: number;
}) {
  const max = Math.max(...data);
  const labelH = labels ? 18 : 0;
  const chartH = height - labelH;
  const bw = (width - gap * (data.length - 1)) / data.length;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {[0.25, 0.5, 0.75].map((t) => (
        <line key={t} x1="0" x2={width} y1={chartH * t} y2={chartH * t} stroke="#f1f1ef" strokeDasharray="2 3" />
      ))}
      {data.map((v, i) => {
        const h = Math.max(3, (v / max) * (chartH - 4));
        const x = i * (bw + gap);
        const active = activeIndex === undefined ? true : i === activeIndex;
        return (
          <g key={i}>
            <rect x={x} y={chartH - h} width={bw} height={h} rx={radius} fill={active ? color : muted} />
            {labels && (
              <text
                x={x + bw / 2}
                y={height - 3}
                textAnchor="middle"
                fontSize="10.5"
                fill={i === activeIndex ? "#0d1014" : "#9aa0aa"}
                fontWeight={i === activeIndex ? 600 : 400}
              >
                {labels[i]}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ─── Phone chrome pieces ────────────────────────────────────────

export function StatusBar({ dark }: { dark?: boolean }) {
  const c = dark ? "#fff" : "#0d1014";
  return (
    <div className="flex h-[46px] items-end justify-between px-7 pb-1.5 text-[14px] font-semibold" style={{ color: c }}>
      <span className="nums">9:41</span>
      <span className="flex items-center gap-1.5">
        <svg width="17" height="11" viewBox="0 0 17 11" fill={c}>
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round">
          <path d="M1 4a9 9 0 0113 0M3.3 6.4a5.8 5.8 0 018.4 0M5.7 8.8a2.4 2.4 0 013.6 0" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={c} opacity="0.4" />
          <rect x="2" y="2" width="16" height="8" rx="2" fill={c} />
          <path d="M23 4v4" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      </span>
    </div>
  );
}
