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
    order: 3,
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
    spotlight: {
      title: "Fuel on account,",
      accent: "without the paperwork.",
      lead: "Attendants record fills at the pump, cashiers approve them at the till, and invoices and statements go out on their own. Customers see their balance, drivers and limits online.",
      points: ["Works offline at the pump", "Invoices and statements sent for you", "QuickBooks sync"],
      notes: [
        { title: "Fill approved at the till", detail: "Pump 4 · Coral Bay Construction", icon: "check" },
        { title: "Monthly statements sent", detail: "Fuel Up · automated", icon: "mail" },
      ],
      screens: [
        {
          screenshot: "/work/fuel-up/operator-desktop.jpg",
          alt: "Fuel Up operator console with today's sales, month-to-date revenue, outstanding balances and a 30-day revenue chart",
          address: "app.fuelup.ky/app/admin",
          frame: "browser",
        },
        {
          screenshot: "/work/fuel-up/customer-mobile.jpg",
          alt: "Fuel Up customer portal on a phone showing account balance and available credit",
          frame: "phone",
        },
      ],
    },
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
    order: 4,
    hidden: true, // kept for later
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
    slug: "roster",
    name: productNames.people,
    category: "HR & payroll",
    tagline: "Sales in, commission out, payslips done.",
    description:
      "Payroll and HR for teams paid on salary, commission and tips. Bring in your sales reports and Roster works out every person's commission with your own rules, then payslips, leave and bank payments are done in the same place.",
    audience: "For businesses that pay their people on commission.",
    accent: "people",
    mockup: "people",
    status: "available",
    badge: "New",
    order: 2,
    features: [
      { title: "Commission from sales reports", description: "Bring in the sales system's reports and every person's commission is worked out." },
      { title: "Rates your way", description: "By service, product or amount sold, with steps that rise in bigger months." },
      { title: "Discounts & free services", description: "Your own rules for what still earns commission." },
      { title: "Tips", description: "Added to the right people and shown on their payslips." },
      { title: "Payslips & bank payments", description: "Checked, approved, mailed out and paid in one run." },
      { title: "Leave & employee app", description: "Staff see their pay, shifts and leave on their phone." },
    ],
    screens: [
      {
        screenshot: "/work/roster/pay-run-desktop.jpg",
        alt: "Roster pay run listing each person's salary, commission, tips and net pay",
        address: "manage.ky/payroll",
        frame: "browser",
      },
      {
        screenshot: "/work/roster/portal-mobile.jpg",
        alt: "Roster employee app on a phone showing the next shift, leave left and last pay",
        frame: "phone",
      },
    ],
    pricing: { model: "none" },
    caseStudySlug: "roster",
    website: { label: "manage.ky", href: "https://manage.ky" },
    spotlight: {
      title: "Payroll,",
      accent: "worked out for you.",
      lead: "Salary, hourly, commission and tips in one pay run, worked out with your rules. Payslips, leave and bank payments are done in the same place.",
      points: ["Salary, hourly or commission", "Leave and lieu days", "Payslips on every phone"],
      notes: [
        { title: "Commission worked out", detail: "8 people · from October's sales", icon: "check" },
        { title: "Payslips mailed out", detail: "Roster · just now", icon: "mail" },
      ],
    },
  },
];
