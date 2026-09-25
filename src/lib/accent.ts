import type { Accent } from "@/content/types";

/**
 * Static class maps per accent (Tailwind needs full class names at build
 * time, so accents can't be interpolated).
 */
export const accentClasses: Record<
  Accent,
  { text: string; bg: string; soft: string; dot: string; hex: string }
> = {
  fuel: { text: "text-fuel", bg: "bg-fuel", soft: "bg-fuel-soft", dot: "bg-fuel", hex: "#e27d0c" },
  swift: { text: "text-swift", bg: "bg-swift", soft: "bg-swift-soft", dot: "bg-swift", hex: "#2563eb" },
  relay: { text: "text-relay", bg: "bg-relay", soft: "bg-relay-soft", dot: "bg-relay", hex: "#0f9f6e" },
  property: { text: "text-property", bg: "bg-property", soft: "bg-property-soft", dot: "bg-property", hex: "#6d5ae6" },
  people: { text: "text-people", bg: "bg-people", soft: "bg-people-soft", dot: "bg-people", hex: "#df5a47" },
  accent: { text: "text-accent", bg: "bg-accent", soft: "bg-accent-soft", dot: "bg-accent", hex: "#2f55d4" },
};
