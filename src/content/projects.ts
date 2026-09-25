import { productNames } from "./site";
import type { Project } from "./types";

/**
 * Case studies. Copy is written from what we know of each engagement —
 * have clients review it before launch. Only add `metric` values to
 * impact items when the figure is real and approved.
 */
export const projects: Project[] = [
  {
    slug: "fuel-up",
    name: productNames.fuelup,
    client: "Fuel retail", // PLACEHOLDER — client name if approved for publication
    tagline: "A digital fuel credit platform that lets customers manage their account without calling the office.",
    summary:
      "A customer platform for fuel credit accounts: balances, top-ups, drivers, vehicles and statements, all self-serve, backed by a back office that gives staff a live view of every account.",
    sector: "Energy & retail",
    services: ["bespoke-software", "business-apps", "integrations"],
    platforms: ["Web app", "Mobile web", "Admin console"],
    accent: "fuel",
    status: "live",
    featured: true,
    order: 1,
    hero: { product: "fuelup", view: "dashboard", frame: "browser" },
    challenge: {
      intro:
        "Fuel credit accounts ran on paper vouchers, phone calls and spreadsheets. Customers couldn't see their balance without asking, and staff spent their days answering the same questions.",
      points: [
        "Customers had no self-serve way to check balances, spending or statements",
        "Topping up credit meant a call, a bank transfer and a manual reconciliation",
        "Business customers couldn't control which drivers and vehicles could spend",
        "Management had no live view of outstanding credit across accounts",
      ],
    },
    approach: {
      intro:
        "We started at the forecourt and the front office, watching how accounts were opened, used and settled, then designed around the two people who matter most: the account holder and the staff member serving them.",
      steps: [
        { title: "Mapped the account lifecycle", description: "From opening an account to monthly settlement, we documented every hand-off and where information went missing." },
        { title: "Prototyped with real customers", description: "Clickable prototypes of the balance, top-up and driver screens were tested with account holders before we wrote production code." },
        { title: "Built the back office alongside", description: "Staff tools were designed in parallel, so every customer action had a clear, auditable counterpart in the office." },
      ],
    },
    solution: {
      intro:
        "A responsive customer platform and admin console that share a single ledger, so what a customer sees and what staff see are always the same numbers.",
      features: [
        { title: "Live balance & spending", description: "Account holders see available credit, recent fills and monthly spend the moment a transaction is recorded." },
        { title: "Self-serve top-ups", description: "Customers add credit online, with payments reconciled against their account automatically." },
        { title: "Drivers, vehicles & limits", description: "Business accounts issue access per driver or vehicle, with spending limits they control themselves." },
        { title: "Statements on demand", description: "Monthly statements and transaction exports are generated automatically and always available." },
        { title: "Staff back office", description: "A single view of every account's balance, activity and status, with tools to adjust, credit and support." },
        { title: "Audit trail", description: "Every change to an account is logged with who made it and why." },
      ],
    },
    gallery: [
      { product: "fuelup", view: "dashboard", frame: "browser", caption: "Customer dashboard: available credit, monthly spend and recent fills at a glance." },
      { product: "fuelup", view: "mobile", frame: "phone", caption: "Designed for the forecourt: balance and top-up on any phone." },
      { product: "fuelup", view: "admin", frame: "browser", caption: "Back office: every account, balance and alert in one place." },
    ],
    impact: {
      intro:
        "The platform moved routine account work from the phone to the customer's own screen, and gave the business a live picture of its credit book.",
      items: [
        { title: "Self-serve by default", description: "Balances, statements and top-ups no longer need a phone call or an office visit." },
        { title: "Control for business customers", description: "Fleet customers manage their own drivers, vehicles and limits, which reduces misuse and disputes." },
        { title: "Visibility for management", description: "Outstanding credit and account activity are visible in real time, not at month-end." },
      ],
    },
    productSlug: "fuel-up",
  },
  {
    slug: "swift-vehicle-tracking",
    name: "Swift Fleet",
    client: "Swift", // Vehicle leasing & rental
    tagline: "A live vehicle tracking platform for a leasing and rental fleet.",
    summary:
      "A real-time fleet platform for Swift, a vehicle leasing and rental company. It shows where every vehicle is, how it's being used and what needs attention, on a map the whole team can work from.",
    sector: "Vehicle leasing & rental",
    services: ["bespoke-software", "integrations", "automation"],
    platforms: ["Web app", "Mobile web", "Telematics integration"],
    accent: "swift",
    status: "live",
    featured: true,
    order: 2,
    hero: { product: "swift", view: "map", frame: "browser" },
    challenge: {
      intro:
        "Swift's fleet is its business. When vehicles are out on lease or rental, the team needs to know where they are, whether they're being used as agreed, and when they need attention. The information existed, but it was scattered and hard to act on.",
      points: [
        "Locating a vehicle meant logging into a separate tracking portal, one vehicle at a time",
        "No single view of which vehicles were moving, idle, parked or overdue for service",
        "Unusual activity, like after-hours movement or leaving an area, was spotted late, if at all",
        "Reporting on utilisation and mileage was manual and slow",
      ],
    },
    approach: {
      intro:
        "We treated the map as the product's front door and built outwards from the questions the team asks every day: where is it, is it OK, and what do I need to do?",
      steps: [
        { title: "Integrated the telematics feed", description: "Vehicle positions, ignition state and odometer data were brought into one platform, normalised and stored for history." },
        { title: "Designed around daily questions", description: "Every screen answers a real operational question, from “where is KY-4821?” to “which vehicles are due for service this week?”" },
        { title: "Made alerts actionable", description: "Rules for geofences, after-hours movement and service intervals raise alerts routed to the right person." },
      ],
    },
    solution: {
      intro:
        "A fast, map-first web platform that shows the whole fleet live, with vehicle history, alerts and reporting one click away.",
      features: [
        { title: "Live fleet map", description: "Every vehicle's position and status, updating in real time, with filters for moving, idle and parked." },
        { title: "Trip history", description: "Replay any vehicle's routes, stops and mileage for any date range." },
        { title: "Geofences & alerts", description: "Define zones and rules; get notified when a vehicle leaves an area or moves out of hours." },
        { title: "Service scheduling", description: "Mileage-based service reminders keep maintenance ahead of breakdowns." },
        { title: "Lease & rental context", description: "See which customer has a vehicle and the terms of the agreement next to its live status." },
        { title: "Utilisation reports", description: "Usage and mileage reporting across the fleet, generated automatically." },
      ],
    },
    gallery: [
      { product: "swift", view: "map", frame: "browser", caption: "Live fleet map with status filters and vehicle list." },
      { product: "swift", view: "vehicle", frame: "browser", caption: "Vehicle detail: trip history, alerts, service and lease context in one place." },
      { product: "swift", view: "mobile", frame: "phone", caption: "Locate any vehicle from the yard or on the road." },
    ],
    impact: {
      intro:
        "Swift's team moved from reactive lookups to a live operational picture of the fleet.",
      items: [
        { title: "One view of the fleet", description: "Location, status and history for every vehicle in a single place instead of a vehicle-by-vehicle lookup." },
        { title: "Problems surfaced early", description: "Alerts flag unusual movement and upcoming service before they become costly." },
        { title: "Reporting without the spreadsheet", description: "Utilisation and mileage data is ready when it's needed." },
      ],
    },
  },
  {
    slug: "relay",
    name: productNames.relay,
    client: "Austech product",
    tagline: "A shared WhatsApp inbox so a whole team can serve customers from one business number.",
    summary:
      `${productNames.relay} lets multiple team members manage one WhatsApp business number together, with shared conversations, assignments, internal notes and a full history, so customers get fast, consistent answers.`,
    sector: "Customer communication",
    services: ["bespoke-software", "integrations"],
    platforms: ["Web app", "WhatsApp Business Platform"],
    accent: "relay",
    status: "live",
    featured: true,
    order: 3,
    hero: { product: "relay", view: "inbox", frame: "browser" },
    challenge: {
      intro:
        "For many Caribbean businesses, WhatsApp is the customer service channel. But a WhatsApp number usually lives on one phone, in one person's pocket.",
      points: [
        "Only one person could reply, so messages waited when they were busy or off shift",
        "No way to hand a conversation to a colleague with the context intact",
        "Customer history disappeared when a phone was replaced or a staff member left",
        "Managers had no view of response times or unanswered chats",
      ],
    },
    approach: {
      intro:
        "We built it for teams like our clients': busy front desks and small service teams who live in WhatsApp and don't want another complicated help-desk tool.",
      steps: [
        { title: "Kept the WhatsApp feel", description: "Conversations look and behave like the app people already know, so there's almost nothing to learn." },
        { title: "Added only what teams need", description: "Assignment, notes, labels and quick replies. Collaboration without help-desk bureaucracy." },
        { title: "Built on the official platform", description: "Integrated with the WhatsApp Business Platform for reliable delivery and a compliant, supported setup." },
      ],
    },
    solution: {
      intro:
        "A web app where the whole team works from one shared WhatsApp inbox, with clear ownership of every conversation.",
      features: [
        { title: "Shared team inbox", description: "Every conversation on your business number, visible to the people who need it." },
        { title: "Assignment & ownership", description: "Assign chats to teammates so customers always know someone's on it." },
        { title: "Internal notes", description: "Discuss a conversation privately with colleagues, right next to the customer thread." },
        { title: "Quick replies & labels", description: "Answer common questions consistently and organise conversations by topic or status." },
        { title: "Customer history", description: "Full history per contact that stays with the business, not someone's phone." },
        { title: "Team insights", description: "Response times, open conversations and workload across the team." },
      ],
    },
    gallery: [
      { product: "relay", view: "inbox", frame: "browser", caption: "Shared inbox with assignment, notes and customer context." },
      { product: "relay", view: "team", frame: "browser", caption: "Team overview: open conversations, response times and workload." },
      { product: "relay", view: "mobile", frame: "phone", caption: "Reply from anywhere, with the same shared inbox." },
    ],
    impact: {
      intro:
        `${productNames.relay} turns a single phone into a team channel, so customers get answers faster and the business keeps its own history.`,
      items: [
        { title: "No more single point of failure", description: "Any teammate can pick up a conversation, with full context." },
        { title: "Clear ownership", description: "Every chat has an owner and a status, so nothing slips through." },
        { title: "Visibility for managers", description: "See workload and response times without looking over anyone's shoulder." },
      ],
    },
    productSlug: "relay",
  },
];
