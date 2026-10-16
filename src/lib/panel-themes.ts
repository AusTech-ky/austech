import type { Accent } from "@/content/types";

/**
 * Dark panels in a product's own colours: the home page product panels and
 * the top of each case study. Static class names, so Tailwind can see them.
 */
export type PanelTheme = {
  /** Panel background. */
  bg: string;
  /** Soft glows over the background. */
  glow: string;
  /** Faint grid lines. */
  grid: string;
  /** The coloured half of a headline. */
  accent: string;
  /** Ticks and dots. */
  dot: string;
  /** Solid chips and icon tiles. */
  badge: string;
};

export const panelThemes: Record<Accent, PanelTheme> = {
  people: {
    bg: "bg-[#170d0a]",
    glow: "bg-[radial-gradient(ellipse_70%_80%_at_85%_20%,rgb(226_88_11/0.42),transparent_70%),radial-gradient(ellipse_50%_60%_at_0%_100%,rgb(223_90_71/0.22),transparent_70%)]",
    grid: "[background-image:linear-gradient(rgb(255_170_140/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_170_140/0.06)_1px,transparent_1px)]",
    accent: "text-[#ffa27a]!",
    dot: "text-[#ff8a5c]",
    badge: "bg-[#e2580b]",
  },
  fuel: {
    bg: "bg-[#0a1430]",
    glow: "bg-[radial-gradient(ellipse_70%_80%_at_85%_20%,rgb(235_197_70/0.30),transparent_70%),radial-gradient(ellipse_60%_70%_at_0%_100%,rgb(47_82_136/0.55),transparent_70%)]",
    grid: "[background-image:linear-gradient(rgb(235_197_70/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(235_197_70/0.06)_1px,transparent_1px)]",
    accent: "text-[#ffd76a]!",
    dot: "text-[#f5c542]",
    badge: "bg-[#c79a12]",
  },
  swift: {
    bg: "bg-[#07112a]",
    glow: "bg-[radial-gradient(ellipse_70%_80%_at_85%_20%,rgb(37_99_235/0.48),transparent_70%),radial-gradient(ellipse_50%_60%_at_0%_100%,rgb(96_165_250/0.18),transparent_70%)]",
    grid: "[background-image:linear-gradient(rgb(147_197_253/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(147_197_253/0.06)_1px,transparent_1px)]",
    accent: "text-[#93c5fd]!",
    dot: "text-[#60a5fa]",
    badge: "bg-[#2563eb]",
  },
  sea: {
    bg: "bg-[#041a1d]",
    glow: "bg-[radial-gradient(ellipse_70%_80%_at_85%_20%,rgb(20_184_166/0.32),transparent_70%),radial-gradient(ellipse_60%_70%_at_0%_100%,rgb(15_60_110/0.55),transparent_70%)]",
    grid: "[background-image:linear-gradient(rgb(94_234_212/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(94_234_212/0.06)_1px,transparent_1px)]",
    accent: "text-[#7ee0d2]!",
    dot: "text-[#5eead4]",
    badge: "bg-[#0f766e]",
  },
  accent: {
    bg: "bg-[#0b0f1f]",
    glow: "bg-[radial-gradient(ellipse_70%_80%_at_85%_20%,rgb(214_190_150/0.22),transparent_70%),radial-gradient(ellipse_60%_70%_at_0%_100%,rgb(30_58_138/0.55),transparent_70%)]",
    grid: "[background-image:linear-gradient(rgb(214_190_150/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(214_190_150/0.06)_1px,transparent_1px)]",
    accent: "text-[#e6cfa6]!",
    dot: "text-[#d6be96]",
    badge: "bg-[#1e3a8a]",
  },
  relay: {
    bg: "bg-[#05190f]",
    glow: "bg-[radial-gradient(ellipse_70%_80%_at_85%_20%,rgb(15_159_110/0.40),transparent_70%),radial-gradient(ellipse_50%_60%_at_0%_100%,rgb(52_211_153/0.15),transparent_70%)]",
    grid: "[background-image:linear-gradient(rgb(110_231_183/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(110_231_183/0.06)_1px,transparent_1px)]",
    accent: "text-[#6ee7b7]!",
    dot: "text-[#34d399]",
    badge: "bg-[#0f9f6e]",
  },
  property: {
    bg: "bg-[#110d2b]",
    glow: "bg-[radial-gradient(ellipse_70%_80%_at_85%_20%,rgb(109_90_230/0.45),transparent_70%),radial-gradient(ellipse_50%_60%_at_0%_100%,rgb(168_152_255/0.15),transparent_70%)]",
    grid: "[background-image:linear-gradient(rgb(196_184_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(196_184_255/0.06)_1px,transparent_1px)]",
    accent: "text-[#c4b8ff]!",
    dot: "text-[#a898ff]",
    badge: "bg-[#6d5ae6]",
  },
};

/** The background, glow and grid layers of a panel; put it first inside a `relative isolate overflow-hidden` box. */
export const panelLayers = {
  grid: "absolute inset-0 -z-10 [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_75%)]",
  glow: "absolute inset-0 -z-10",
};
