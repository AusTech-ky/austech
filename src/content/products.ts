import { productNames } from "./site";
import type { Product } from "./types";

/**
 * Our own software products.
 *
 * PRICING: no prices have been set. Every tier uses `kind: "placeholder"`,
 * which renders a visibly-marked placeholder. Replace with
 * `{ kind: "amount", amount, currency, period }` once pricing is final,
 * or `{ kind: "custom", label }` for quote-based tiers.
 */
export const products: Product[] = [
  {
    slug: "relay",
    name: productNames.relay,
    category: "Team messaging",
    tagline: "One WhatsApp number. Your whole team.",
    description:
      "A shared inbox for your WhatsApp business number. Assign conversations, leave internal notes, reply with consistent answers and keep every customer's history with the business.",
    audience: "For service teams that run customer conversations through WhatsApp.",
    accent: "relay",
    mockup: "relay",
    status: "available",
    order: 1,
    features: [
      { title: "Shared inbox", description: "Every conversation on your number, in one place, for the whole team." },
      { title: "Assign & hand over", description: "Clear ownership of each chat, with context that travels with it." },
      { title: "Internal notes", description: "Talk it over privately without leaving the conversation." },
      { title: "Quick replies", description: "Consistent answers to common questions in a couple of keystrokes." },
      { title: "Labels & status", description: "Organise by topic and track what's open, pending or resolved." },
      { title: "Team insights", description: "Response times and workload at a glance." },
    ],
    screens: [
      { product: "relay", view: "inbox", frame: "browser" },
      { product: "relay", view: "mobile", frame: "phone" },
    ],
    pricing: {
      model: "tiers",
      note: "WhatsApp Business Platform conversation fees are billed by Meta and are separate from subscription pricing.",
      tiers: [
        {
          name: "Team",
          description: "For small teams sharing one number.",
          price: { kind: "placeholder", period: "month", unit: "per workspace" },
          features: ["1 WhatsApp number", "Up to [n] team members", "Shared inbox & assignment", "Quick replies & labels"],
          cta: { label: "Get started", href: "/contact?project=relay" },
        },
        {
          name: "Business",
          description: "For growing teams that need oversight.",
          price: { kind: "placeholder", period: "month", unit: "per workspace" },
          features: ["Everything in Team", "Up to [n] team members", "Team insights & reporting", "Business-hours routing"],
          highlighted: true,
          cta: { label: "Get started", href: "/contact?project=relay" },
        },
        {
          name: "Enterprise",
          description: "Multiple numbers, integrations and support.",
          price: { kind: "custom", label: "Custom" },
          features: ["Multiple numbers", "CRM & system integrations", "Single sign-on", "Priority support"],
          cta: { label: "Talk to us", href: "/contact?project=relay" },
        },
      ],
    },
    caseStudySlug: "relay",
  },
  {
    slug: "fuel-up",
    name: productNames.fuelup,
    category: "Fuel credit platform",
    tagline: "Fuel credit accounts, finally self-serve.",
    description:
      "A customer platform and back office for fuel retailers that offer credit or prepaid accounts. Customers manage balances, drivers and statements; staff get a live view of every account.",
    audience: "For fuel retailers and forecourt operators running account customers.",
    accent: "fuel",
    mockup: "fuelup",
    status: "available",
    order: 2,
    features: [
      { title: "Customer portal", description: "Balances, fills and statements, available any time on any device." },
      { title: "Online top-ups", description: "Customers add credit themselves, reconciled automatically." },
      { title: "Drivers & vehicles", description: "Per-driver and per-vehicle access with spending limits." },
      { title: "Back office", description: "Every account's balance, activity and status for your staff." },
      { title: "Automatic statements", description: "Monthly statements and exports, generated on schedule." },
      { title: "Audit trail", description: "Every account change logged and attributable." },
    ],
    screens: [
      { product: "fuelup", view: "dashboard", frame: "browser" },
      { product: "fuelup", view: "mobile", frame: "phone" },
    ],
    pricing: {
      model: "custom",
      headline: "Priced to your operation",
      description:
        "Every retailer's network and account book is different. We scope a licence and setup around your sites, account volume and integrations.",
      includes: ["Setup & data migration", "Branding to your forecourt", "POS & payment integration", "Hosting, support & updates"],
      cta: { label: "Request a demo", href: "/contact?project=fuel-up" },
    },
    caseStudySlug: "fuel-up",
  },
  {
    slug: "property",
    name: productNames.property,
    category: "Property management",
    tagline: "Leases, rent and maintenance in one calm dashboard.",
    description:
      "A property management platform for landlords and managers with a handful of units or a few hundred: tenancies, rent collection, maintenance requests and owner reporting.",
    audience: "For landlords, property managers and strata.",
    accent: "property",
    mockup: "property",
    status: "coming-soon",
    order: 3,
    features: [
      { title: "Units & tenancies", description: "Every property, unit and lease with key dates in one place." },
      { title: "Rent tracking", description: "See what's paid, due and overdue, with automatic reminders." },
      { title: "Maintenance requests", description: "Tenants report issues; you assign, track and close them." },
      { title: "Owner reporting", description: "Clear statements for owners, generated automatically." },
    ],
    screens: [{ product: "property", view: "overview", frame: "browser" }],
    pricing: { model: "none" },
  },
  {
    slug: "people",
    name: productNames.people,
    category: "HR platform",
    tagline: "People admin without the paperwork.",
    description:
      "A lightweight HR platform for growing teams: employee records, leave and time off, documents and onboarding, designed around how SMBs in the region actually work.",
    audience: "For businesses with 10–250 people.",
    accent: "people",
    mockup: "people",
    status: "coming-soon",
    order: 4,
    features: [
      { title: "Employee records", description: "One secure place for every employee's details and documents." },
      { title: "Leave & time off", description: "Requests, approvals and balances without the email chains." },
      { title: "Onboarding", description: "Checklists that get new starters productive faster." },
      { title: "Work permit tracking", description: "Key expiry dates surfaced well before they're due." },
    ],
    screens: [{ product: "people", view: "overview", frame: "browser" }],
    pricing: { model: "none" },
  },
];
