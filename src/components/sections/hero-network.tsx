/**
 * Animated backdrop for the home hero: the Austech chip at the centre, wired
 * to a network of nodes, with data pulses flowing in along circuit traces.
 * Pure SVG + CSS (keyframes in globals.css), so it costs no JavaScript and
 * falls still under prefers-reduced-motion.
 */

const SKY = "#60A5FA";
const SKY_LIGHT = "#93C5FD";
const NAVY = "#1E3A8A";
const NAVY_DEEP = "#0F1E4A";

/** Traces run node → chip pin, so pulses travel into the chip. */
const traces = [
  { node: [110, 150], d: "M110,150 L200,265.6 H231" },
  { node: [75, 360], d: "M75,360 L200,334.4 H231" },
  { node: [170, 480], d: "M170,480 L265.6,400 V369" },
  { node: [250, 80], d: "M250,80 L265.6,200 V231" },
  { node: [470, 110], d: "M470,110 L334.4,200 V231" },
  { node: [540, 280], d: "M540,280 L400,300 H369" },
  { node: [490, 470], d: "M490,470 L400,334.4 H369" },
  { node: [330, 545], d: "M330,545 L300,400 V369" },
] as const;

const mesh = [
  [0, 3], [0, 1], [1, 2], [2, 7], [3, 4], [4, 5], [5, 6], [6, 7],
] as const;

/** Chip pins, from the logo: 3 per side at 7/12/17 of a 24-unit grid, scaled so the body is 110px. */
const s = 110 / 16;
const u = (n: number) => 300 + (n - 12) * s;
const pins = [7, 12, 17].flatMap((p) => [
  `M${u(p)},${u(2)} V${u(4)}`,
  `M${u(p)},${u(20)} V${u(22)}`,
  `M${u(2)},${u(p)} H${u(4)}`,
  `M${u(20)},${u(p)} H${u(22)}`,
]);

const codeBars = [
  { x: 430, y: 36, w: 58, c: SKY },
  { x: 496, y: 36, w: 34, c: SKY_LIGHT },
  { x: 446, y: 52, w: 76, c: SKY_LIGHT },
  { x: 446, y: 68, w: 40, c: SKY },
  // Kept on the right edge: on phones the left of the graphic sits under the hero text.
  { x: 440, y: 548, w: 44, c: SKY_LIGHT },
  { x: 492, y: 548, w: 60, c: SKY },
  { x: 456, y: 564, w: 70, c: SKY },
];

export function HeroNetwork({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="hn-glow">
          <stop offset="0" stopColor={SKY} stopOpacity="0.35" />
          <stop offset="0.45" stopColor={NAVY} stopOpacity="0.25" />
          <stop offset="1" stopColor={NAVY} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="300" cy="300" r="230" fill="url(#hn-glow)" className="hn-breathe" />

      {/* Orbits */}
      <g className="hn-spin">
        <circle cx="300" cy="300" r="205" fill="none" stroke={SKY} strokeOpacity="0.14" strokeDasharray="3 7" />
        <circle cx="300" cy="95" r="3" fill={SKY} />
      </g>
      <g className="hn-spin-rev">
        <circle cx="300" cy="300" r="150" fill="none" stroke={SKY} strokeOpacity="0.28" strokeDasharray="3 5" />
        <circle cx="450" cy="300" r="2.5" fill={SKY_LIGHT} />
      </g>

      {/* Mesh between nodes */}
      <g stroke={SKY} strokeOpacity="0.16" strokeWidth="1">
        {mesh.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={traces[a].node[0]} y1={traces[a].node[1]} x2={traces[b].node[0]} y2={traces[b].node[1]} />
        ))}
      </g>

      {/* Traces + pulses */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {traces.map((t, i) => (
          <g key={t.d}>
            <path d={t.d} stroke={SKY} strokeOpacity="0.35" strokeWidth="1.2" />
            <path
              d={t.d}
              pathLength={100}
              stroke={SKY_LIGHT}
              strokeWidth="2.2"
              strokeDasharray="7 93"
              className="hn-flow"
              style={{ animationDelay: `${(i * 0.83) % 4}s` }}
            />
          </g>
        ))}
      </g>

      {/* Nodes */}
      {traces.map((t, i) => (
        <g key={`n-${i}`}>
          <circle
            cx={t.node[0]}
            cy={t.node[1]}
            r="6"
            fill="none"
            stroke={SKY}
            strokeWidth="1.5"
            className="hn-ping"
            style={{ animationDelay: `${(i * 0.61) % 3.2}s` }}
          />
          <circle cx={t.node[0]} cy={t.node[1]} r={i % 3 === 0 ? 5.5 : 4} fill={i % 2 ? SKY_LIGHT : SKY} />
        </g>
      ))}

      {/* The chip (Austech mark) */}
      <g strokeLinecap="round" strokeLinejoin="round">
        {pins.map((d, i) => (
          <path key={d} d={d} stroke={SKY} strokeWidth="3" className="hn-pin" style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
        <rect x={u(4)} y={u(4)} width={16 * s} height={16 * s} rx={2 * s} fill={NAVY_DEEP} stroke={SKY} strokeWidth="3" />
        <rect
          x={u(8)}
          y={u(8)}
          width={8 * s}
          height={8 * s}
          rx={s}
          fill={NAVY}
          stroke={SKY_LIGHT}
          strokeWidth="1.5"
          className="hn-core"
        />
        <g fill="none" stroke="#fff" strokeWidth="2.6">
          <polyline points="291,289 282,300 291,311" />
          <polyline points="309,289 318,300 309,311" />
          <line x1="303.5" y1="286" x2="296.5" y2="314" stroke={SKY_LIGHT} />
        </g>
      </g>

      {/* Code lines being written */}
      <g strokeLinecap="round" strokeWidth="5">
        {codeBars.map((b, i) => (
          <line
            key={`${b.x}-${b.y}`}
            x1={b.x}
            y1={b.y}
            x2={b.x + b.w}
            y2={b.y}
            stroke={b.c}
            strokeOpacity="0.45"
            className="hn-type"
            style={{ animationDelay: `${(i % 4) * 0.35 + (i > 3 ? 1.6 : 0)}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
