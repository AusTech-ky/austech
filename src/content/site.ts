/**
 * Global site settings. Values marked PLACEHOLDER must be confirmed
 * before launch.
 */
export const site = {
  name: "Austech",
  legalName: "Austech Ltd.", // PLACEHOLDER — confirm registered entity name
  tagline: "Software that makes business work better.",
  description:
    "Austech is a Cayman Islands software company. We design and build bespoke software, business applications and modern websites that help growing businesses run simpler, serve customers better and see what's happening.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://austech.ky", // PLACEHOLDER domain
  email: "hello@austech.ky", // PLACEHOLDER
  location: {
    city: "George Town",
    region: "Grand Cayman",
    country: "Cayman Islands",
    countryCode: "KY",
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
  ],
  social: [
    // { label: "LinkedIn", href: "https://www.linkedin.com/company/…" },
  ] as { label: string; href: string }[],
} as const;

/**
 * Product names that are still provisional. Change them here and every
 * product page, case study and mockup updates with them.
 */
export const productNames = {
  relay: "Relay",
  fuelup: "Fuel Up",
  property: "Harbour", // PLACEHOLDER name — property management platform
  people: "Roster", // PLACEHOLDER name — HR platform
} as const;
