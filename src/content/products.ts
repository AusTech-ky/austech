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
    status: "coming-soon",
    order: 2,
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
    pricing: { model: "none" },
  },
  {
    slug: "fuel-up",
    name: productNames.fuelup,
    category: "Fuel management platform",
    tagline: "From the pump to the statement, in one system.",
    description:
      "A fuel management platform for station networks with credit customers. Attendants record fills at the pump, cashiers approve them at the till, invoices and statements go out automatically, and customers manage their own account online.",
    audience: "For fuel retailers and station operators with fleet and business account customers.",
    accent: "fuel",
    mockup: "fuelup",
    status: "available",
    order: 1,
    features: [
      { title: "Pump app", description: "Fills captured by driver PIN and plate, and it keeps working offline." },
      { title: "Cashier desk", description: "Every fill reviewed and approved at the till, by pump number." },
      { title: "Customer portal", description: "Balance, available credit, invoices and statements on any device." },
      { title: "Drivers, vehicles & limits", description: "Customers set spending limits and permitted fuels themselves." },
      { title: "Automatic invoicing", description: "Invoices issued as fills are approved; statements in one bulk send." },
      { title: "QuickBooks sync", description: "Invoices out, payments back, with no double entry." },
    ],
    screens: [
      {
        screenshot: "/work/fuel-up/customer-desktop.jpg",
        alt: "Fuel Up customer portal showing account balance, available credit and a six-month activity chart",
        address: "app.fuelup.ky/app/customer",
        frame: "browser",
      },
      {
        screenshot: "/work/fuel-up/customer-mobile.jpg",
        alt: "Fuel Up customer portal on a phone showing account balance and available credit",
        frame: "phone",
      },
    ],
    pricing: {
      model: "custom",
      headline: "Priced to your operation",
      description:
        "Every retailer's network and account book is different. We scope a licence and setup around your sites, account volume and integrations.",
      includes: ["Setup & data migration", "Branding to your stations", "QuickBooks & POS integration", "Hosting, support & updates"],
      cta: { label: "Request a demo", href: "/contact?project=fuel-up" },
    },
    caseStudySlug: "fuel-up",
    international: true,
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
