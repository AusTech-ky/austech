import type { Service } from "./types";

export const services: Service[] = [
  {
    key: "business-apps",
    title: "Business applications",
    short: "Portals, dashboards and internal tools that replace spreadsheets, paper and phone calls.",
    problem:
      "“Half our day goes on chasing information. It lives in spreadsheets, inboxes and people's heads, and nobody has the full picture.”",
    approach:
      "We map how work actually moves through your business, then build a focused application around it: one place for the data, clear roles and permissions, and screens designed for the people who use them every day.",
    outcomes: [
      "Fewer manual steps and re-keyed data",
      "Real-time visibility across teams and locations",
      "Customers who can serve themselves, any time",
    ],
    deliverables: ["Customer portals", "Operations dashboards", "Internal admin tools", "Mobile-ready web apps"],
    icon: "layout",
  },
  {
    key: "bespoke-software",
    title: "Bespoke software",
    short: "Software shaped around the way you operate, for when off-the-shelf tools stop fitting.",
    problem:
      "“We've tried three different SaaS tools. Each one does 70% of what we need, and we patch the rest together by hand.”",
    approach:
      "We design the product with you: discovery, prototypes you can click, then an iterative build with working software every couple of weeks. You own the result, and it can grow as the business does.",
    outcomes: [
      "A system that fits your process, not the other way round",
      "No per-seat fees scaling against your growth",
      "A real competitive advantage, not a commodity tool",
    ],
    deliverables: ["Product discovery & prototyping", "Web & mobile platforms", "Data models & APIs", "Long-term product partnership"],
    icon: "code",
  },
  {
    key: "websites",
    title: "Modern websites",
    short: "Fast, considered websites that explain what you do and turn visitors into enquiries.",
    problem:
      "“Our website looks dated, it's slow on mobile, and we can't update it without calling someone.”",
    approach:
      "We start with the story and the conversion path, then design and build a fast, accessible site with a content system your team can actually use. Search-friendly from day one.",
    outcomes: [
      "A credible first impression that matches your service",
      "More qualified enquiries, fewer irrelevant ones",
      "Content your own team can update in minutes",
    ],
    deliverables: ["Marketing sites", "Content management", "SEO foundations", "Analytics & tracking"],
    icon: "globe",
  },
  {
    key: "automation",
    title: "Process automation",
    short: "Remove the repetitive work: approvals, reminders, reports and data entry.",
    problem:
      "“Every month-end someone spends two days building the same report. Invoices go out late because approvals sit in an inbox.”",
    approach:
      "We find the repetitive, rules-based work that eats your team's time and automate it with notifications, scheduled jobs and workflows. Exceptions still come to a person.",
    outcomes: [
      "Hours returned to your team every week",
      "Fewer errors from manual copying",
      "Consistent, on-time processes that don't depend on one person",
    ],
    deliverables: ["Workflow automation", "Scheduled reporting", "Notifications & reminders", "Document generation"],
    icon: "workflow",
  },
  {
    key: "integrations",
    title: "Integrations",
    short: "Connect the systems you already use so data flows between them without copying and pasting.",
    problem:
      "“Our accounting, our booking system and our CRM don't talk to each other, so we copy the same data into all three.”",
    approach:
      "We connect your existing tools through their APIs (payments, accounting, messaging, telematics, identity) and build reliable sync with logging and alerts, so you know when something needs attention.",
    outcomes: [
      "One source of truth across your tools",
      "Faster, more accurate reporting",
      "Freedom to keep the tools your team likes",
    ],
    deliverables: ["API integrations", "Payment gateways", "WhatsApp & messaging", "Data sync & migration"],
    icon: "plug",
  },
];

/** How we typically work together. Shown on the Services page. */
export const engagementModels = [
  {
    title: "Fixed-scope project",
    description:
      "A defined outcome, a clear plan and a fixed budget. Best for websites, portals and well-understood applications.",
  },
  {
    title: "Product partnership",
    description:
      "An ongoing team that designs, ships and improves your platform over time, with a shared roadmap and regular releases.",
  },
  {
    title: "Care & support",
    description:
      "Hosting, monitoring, security updates and small improvements for software we've built, so it stays healthy after launch.",
  },
];

export const process = [
  {
    title: "Understand",
    description: "We learn how your business runs, where the friction is, and what a better outcome looks like.",
  },
  {
    title: "Design",
    description: "Clickable prototypes and a clear plan, so you can see and shape the product before it's built.",
  },
  {
    title: "Build",
    description: "Short cycles with working software you can use as it grows. No six-month disappearing act.",
  },
  {
    title: "Evolve",
    description: "Launch is the beginning. We measure, support and improve the product as your business changes.",
  },
];
