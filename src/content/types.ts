/**
 * Content model.
 *
 * Everything the site renders — projects, products, services, team — is
 * described by these types and lives in plain data files. Pages read it
 * through `src/lib/content.ts`, so swapping the data files for a headless
 * CMS (Sanity, Payload, Contentful…) only means re-implementing those
 * accessor functions against the same shapes.
 */

/** Product accent palette. Maps to --color-{accent} tokens in globals.css. */
export type Accent = "fuel" | "swift" | "relay" | "property" | "people" | "accent";

/** Keys for the coded product UI mockups in `components/mockups`. */
export type MockupKey = "fuelup" | "swift" | "relay" | "property" | "people";

/** A single screen of a product, rendered as a coded mockup. */
export type MockupView = {
  product: MockupKey;
  /** Which screen of that product to show. Each mockup defines its own views. */
  view: string;
  /** Device frame. */
  frame: "browser" | "phone";
  caption?: string;
};

export type ServiceKey =
  | "websites"
  | "business-apps"
  | "bespoke-software"
  | "automation"
  | "integrations";

// ─── Projects / case studies ─────────────────────────────────────

export type ImpactItem = {
  /**
   * Optional headline figure. Only use real, client-approved numbers.
   * Leave undefined to render a qualitative outcome instead.
   */
  metric?: string;
  title: string;
  description: string;
};

export type Project = {
  slug: string;
  name: string;
  client: string;
  /** Short line shown on cards. */
  tagline: string;
  summary: string;
  sector: string;
  services: ServiceKey[];
  platforms: string[];
  accent: Accent;
  status: "live" | "in-development";
  /** Ordering + whether the project appears on the home page. */
  featured: boolean;
  order: number;
  /** Hero mockup for cards and the top of the case study. */
  hero: MockupView;
  challenge: {
    intro: string;
    points: string[];
  };
  approach: {
    intro: string;
    steps: { title: string; description: string }[];
  };
  solution: {
    intro: string;
    features: { title: string; description: string }[];
  };
  gallery: MockupView[];
  impact: {
    intro: string;
    items: ImpactItem[];
  };
  /** Related product on /products, if this work became one. */
  productSlug?: string;
  seo?: { title?: string; description?: string };
};

// ─── Products ────────────────────────────────────────────────────

/**
 * Price value. Never hard-code a price in a component — describe it here.
 * - `amount`: a real, published price.
 * - `placeholder`: pricing not yet set; renders a clearly-marked placeholder.
 * - `custom`: quoted per customer (e.g. "Talk to us").
 */
export type Price =
  | { kind: "amount"; amount: number; currency: string; period?: "month" | "year" | "one-off"; unit?: string }
  | { kind: "placeholder"; label?: string; period?: "month" | "year" | "one-off"; unit?: string }
  | { kind: "custom"; label: string };

export type PricingTier = {
  name: string;
  description: string;
  price: Price;
  features: string[];
  highlighted?: boolean;
  /** Label shown on a highlighted tier. Defaults to "Recommended". */
  highlightLabel?: string;
  cta: { label: string; href: string };
};

export type Pricing =
  | { model: "tiers"; note?: string; tiers: PricingTier[] }
  | { model: "custom"; headline: string; description: string; includes: string[]; cta: { label: string; href: string } }
  | { model: "none" };

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  accent: Accent;
  mockup: MockupKey;
  status: "available" | "coming-soon";
  order: number;
  /** Audience line, e.g. "For teams that share one WhatsApp number". */
  audience: string;
  features: { title: string; description: string }[];
  screens: MockupView[];
  pricing: Pricing;
  /** Case study slug if this product has one. */
  caseStudySlug?: string;
};

// ─── Services ────────────────────────────────────────────────────

export type Service = {
  key: ServiceKey;
  title: string;
  short: string;
  /** Business problem in the client's own words. */
  problem: string;
  approach: string;
  outcomes: string[];
  deliverables: string[];
  icon: "globe" | "layout" | "code" | "workflow" | "plug";
};

// ─── Team (not shown until populated) ────────────────────────────

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  image?: string;
  links?: { label: string; href: string }[];
};
