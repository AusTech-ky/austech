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
    tagline: "A fuel management platform that runs a station network's credit customers, from the pump to the monthly statement.",
    summary:
      "One system for a fuel retailer and its account customers: pump attendants record fills on a tablet, cashiers approve them at the till, invoices and statements go out automatically, and customers manage their own drivers, vehicles and limits online.",
    sector: "Energy & retail",
    services: ["bespoke-software", "business-apps", "integrations"],
    platforms: ["Web app", "Tablet & mobile", "Works offline at the pump"],
    accent: "fuel",
    status: "live",
    featured: true,
    order: 1,
    hero: {
      screenshot: "/work/fuel-up/operator-desktop.jpg",
      alt: "Fuel Up operator console with today's sales, month-to-date revenue, outstanding balances and a 30-day revenue chart",
      address: "app.fuelup.ky/app/admin",
      frame: "browser",
    },
    challenge: {
      intro:
        "Fleet and business customers fuel on credit, which meant paper slips at the pump, manual keying at the till and invoices pieced together at month-end. Customers only found out what they owed when the statement arrived.",
      points: [
        "Fills were written down at the pump and re-keyed later, so mistakes surfaced weeks after the fact",
        "Cashiers had no quick way to check a driver, vehicle or account before approving a sale",
        "Building invoices and statements for every account was a monthly manual job",
        "Customers couldn't see their balance, control their drivers or pull their own invoices",
      ],
    },
    approach: {
      intro:
        "We built around each person who touches a fill: the attendant at the pump, the cashier at the till, the operator in the office and the customer paying the bill. Each gets their own portal, all working from one shared record.",
      steps: [
        { title: "Start at the pump", description: "Attendants record each fill on a tablet with the driver's PIN, the plate and the pump, and it keeps working when the connection drops." },
        { title: "Check it at the till", description: "Every fill lands on the cashier's screen for review before it's approved, with the account's limits and status to hand." },
        { title: "Bill it automatically", description: "Approved fills flow straight into invoices, statements and the accounting system, with no re-keying." },
      ],
    },
    solution: {
      intro:
        "Five portals on one ledger: operator console, pump app, cashier desk, mobile delivery and customer portal. What the customer sees and what staff see are always the same numbers.",
      features: [
        { title: "Pump app that works offline", description: "Attendants capture fills by driver PIN and plate, with photos and signatures, and sync as soon as the connection is back." },
        { title: "Cashier desk", description: "Pending fills appear by pump number for review and approval, with an announcement when a new one arrives." },
        { title: "Customer portal", description: "Account balance, available credit, fills, invoices and statements, on any device, with no app to download." },
        { title: "Drivers, vehicles & limits", description: "Customers add their own drivers and vehicles, set per-transaction, daily and monthly spending limits, and restrict which fuel each vehicle can take." },
        { title: "Automatic invoices & statements", description: "Invoices are generated and emailed as fills are approved, and statements go out to every account in one bulk send." },
        { title: "Operator console", description: "Sales, revenue by fuel grade, outstanding balances and every customer across all stations, with pricing set per station and service tier." },
        { title: "Purchase orders & vouchers", description: "Customers can require a PO number on fills, and stations can sell and redeem gift certificates." },
        { title: "Mobile deliveries", description: "Delivery trucks record fills on site, so customers who can't come to the station are billed the same way." },
        { title: "QuickBooks integration", description: "Invoices sync to QuickBooks and payments sync back, so balances stay reconciled without double entry." },
      ],
    },
    gallery: [
      {
        screenshot: "/work/fuel-up/customer-desktop.jpg",
        alt: "Fuel Up customer portal showing account balance, available credit, active vehicles and drivers, and a six-month activity chart",
        address: "app.fuelup.ky/app/customer",
        frame: "browser",
        caption: "Customer portal: balance, available credit and six months of activity at a glance.",
      },
      {
        screenshot: "/work/fuel-up/invoices-desktop.jpg",
        alt: "Fuel Up customer invoices with the account balance, unpaid total and a list of issued and paid invoices",
        address: "app.fuelup.ky/app/customer/invoices",
        frame: "browser",
        caption: "Invoices: every bill, its status and a PDF copy, always up to date.",
      },
      {
        screenshot: "/work/fuel-up/cashier-desktop.jpg",
        alt: "Fuel Up cashier desk with four fills pending approval by pump number and a list of recent transactions",
        address: "app.fuelup.ky/app/cashier",
        frame: "browser",
        caption: "Cashier desk: fills from the pumps wait here for approval, one tile per pump.",
      },
      {
        screenshot: "/work/fuel-up/customer-mobile.jpg",
        alt: "Fuel Up customer portal on a phone showing account balance and available credit",
        frame: "phone",
        caption: "Customers check their balance and available credit from any phone.",
      },
    ],
    impact: {
      intro:
        "Fuel Up replaced paper slips and month-end spreadsheets with one record that starts at the pump and ends in the customer's statement.",
      items: [
        { title: "No re-keying", description: "A fill is captured once at the pump and flows through approval, invoicing and accounting untouched." },
        { title: "Customers serve themselves", description: "Balances, invoices, statements, drivers and limits are online, so fewer calls reach the office." },
        { title: "A live view of the credit book", description: "Operators see sales and outstanding balances across every station as they happen, not at month-end." },
      ],
    },
    productSlug: "fuel-up",
  },
  {
    slug: "furniture-inventory",
    name: "Furniture Store Inventory Management",
    client: "Home furnishings retailer",
    tagline:
      "Incoming stock, preorders and a warehouse portal for a Cayman home store, so customers can buy what's still on the water.",
    summary:
      "Inventory management software for a home furnishings store in Grand Cayman. Stock that's still on its way to the island can be sold before it lands, purchase orders track every shipment from the supplier to the shelf, and the warehouse team receives deliveries and finds any item from their phones.",
    sector: "Home furnishings retail",
    services: ["bespoke-software", "integrations"],
    platforms: ["Shopify app", "Warehouse portal", "Mobile web"],
    accent: "accent",
    status: "live",
    featured: false,
    order: 2,
    hero: {
      screenshot: "/work/furniture-inventory/ipad-product.jpg",
      alt: "Warehouse portal on an iPad: a product's stock on island, incoming and committed, and the warehouse bays it sits in",
      frame: "tablet",
    },
    challenge: {
      intro:
        "Almost everything a Cayman retailer sells is shipped in. By the time an order has crossed the sea and cleared customs, a month or more can have passed, and until it lands that stock is invisible to customers. For a store selling furniture and homeware, that's a month of sales waiting on a boat.",
      points: [
        "Stock on its way to the island couldn't be sold until it was physically in the store",
        "Nobody could say at a glance how much of a product was on island, incoming or already promised to a customer",
        "Purchase orders, shipments and supplier invoices lived in separate places",
        "Finding an item in the warehouse, or checking a delivery against what was ordered, relied on memory and paper",
      ],
    },
    approach: {
      intro:
        "We treated the long shipping time as an opportunity rather than a delay, and built from the purchase order outwards, so every other screen could trust the same numbers.",
      steps: [
        { title: "Make incoming stock sellable", description: "Once a purchase order is confirmed, its stock can be shown and sold in the online store with its expected arrival, so customers can preorder long before the container is unpacked." },
        { title: "Track it from supplier to shelf", description: "Each order is split into shipments with their own dates and tracking, so the team knows what's on the water, what's in customs and what's due this week." },
        { title: "Put the warehouse on a tablet", description: "Receiving and locating stock happen on the warehouse floor, so the portal was designed for an iPad or phone in one hand and a box in the other." },
      ],
    },
    solution: {
      intro:
        "A purchasing and incoming-stock app inside the store's Shopify admin, and a warehouse portal the team use on iPads and phones, both working from one record of what's ordered, on the water, on island and sold.",
      features: [
        { title: "Sell before it lands", description: "Confirmed incoming stock can be preordered in the online store, with arrival dates customers can see." },
        { title: "On island vs incoming", description: "Every product shows what's in Cayman, what's on its way and what's already committed to a customer." },
        { title: "Purchase orders", description: "Orders, shipments, costs and supplier invoices kept together, from draft to fully received." },
        { title: "Landed cost & margin", description: "Freight, duty and fees spread across the order, so the true cost and margin of each item is clear." },
        { title: "Receiving", description: "The warehouse counts each delivery against the order on an iPad, flags damage and adds photos as they go." },
        { title: "Warehouse locations", description: "Every item is tied to the bays it sits in, so anyone can find it without asking who put it away." },
        { title: "Orders to pick", description: "Customer orders appear for the warehouse with what to pull and where it is." },
        { title: "Shopify, kept in step", description: "Inventory moves back to Shopify as stock is received, so the store and the warehouse never disagree." },
      ],
    },
    gallery: [
      {
        screenshot: "/work/furniture-inventory/ipad-po-list.jpg",
        alt: "Warehouse portal on an iPad: purchase orders with draft and confirmed orders, line and unit counts and expected arrival dates",
        frame: "tablet",
        title: "Purchase orders",
        caption: "The portal is built for an iPad on the warehouse floor: every order from draft to confirmed, with what's in it and when it's expected to land.",
      },
      {
        screenshot: "/work/furniture-inventory/desktop-po.jpg",
        alt: "A purchase order in the desktop view, with costs, landed costs, notes and supplier details beside the lines",
        address: "Warehouse · Purchase order",
        frame: "browser",
        title: "Desk or phone",
        caption: "The purchasing team switch to a desktop view with notes and supplier details alongside the order. The same order opens on a phone for a quick check away from the desk.",
        companion: {
          screenshot: "/work/furniture-inventory/phone-po.jpg",
          alt: "The same purchase order on a phone",
          frame: "phone",
        },
      },
      {
        screenshot: "/work/furniture-inventory/ipad-receive.jpg",
        alt: "Receiving a shipment on an iPad: expected and received counts per line, with location, damaged and photo options",
        frame: "tablet",
        title: "Receiving",
        caption: "Deliveries are counted line by line against the order on an iPad, with damage, photos and a location recorded on the spot.",
      },
      {
        screenshot: "/work/furniture-inventory/phone-product.jpg",
        alt: "Warehouse portal on a phone showing a product's stock on island and incoming, and its warehouse location",
        frame: "phone",
        caption: "What's on island, what's incoming and which bay it's in, from any phone on the warehouse floor.",
      },
    ],
    impact: {
      intro:
        "The store can sell stock from the moment it's ordered, and the warehouse runs from the same numbers the store does.",
      items: [
        { title: "Sales don't wait for the boat", description: "Customers preorder incoming stock weeks before it clears customs, instead of waiting for it to reach the floor." },
        { title: "One answer to “do we have it?”", description: "On island, incoming and committed stock are shown side by side, so staff answer customers with confidence." },
        { title: "A warehouse anyone can find their way around", description: "Deliveries are received and put away with a location, so items are found in seconds, not searched for." },
      ],
    },
    seo: {
      title: "Furniture store inventory management case study",
      description:
        "Incoming stock, preorders and a warehouse portal for a Cayman home store, so customers can buy products that are still on their way to the island.",
    },
  },
  {
    slug: "boat-charter-website",
    name: "Boat Charter Website",
    client: "Private yacht charter", // anonymised at the client's request
    tagline:
      "A website for a private luxury catamaran charter in Grand Cayman, with video-led design, live sandbar conditions and online booking.",
    summary:
      "The website for a private luxury catamaran charter in Grand Cayman. Drone video of the boat leads every page, live conditions come from the Stingray City sandbar, guests book a date through an embedded Peek checkout, and the owners edit the site themselves.",
    sector: "Luxury yacht charters",
    services: ["websites", "integrations"],
    platforms: ["Website", "Mobile web", "Page editor"],
    accent: "sea",
    status: "live",
    // A website example: shown on the Work page and the Modern websites card, not in home page Selected work.
    featured: false,
    order: 2,
    hero: {
      screenshot: "/work/19-north/desktop.jpg",
      alt: "Charter home page: drone video of the catamaran with live water, weather, rain and air readings for Stingray City",
      address: "Charter website",
      frame: "browser",
    },
    challenge: {
      intro:
        "The client runs a Leopard 50 sailing catamaran, as a private charter: one group at a time, with the day shaped around them. They needed a website that sold that feeling, not another list of boat tours, and that they could keep up to date themselves.",
      points: [
        "The offer is private and bespoke, but most charter sites read like ticketed “adventures”",
        "The owners wanted to change pages, questions and policies without calling a developer",
      ],
    },
    approach: {
      intro:
        "We designed the site around the boat and the water, and around the questions guests ask before they book.",
      steps: [
        { title: "Let the boat sell the day", description: "Drone footage of the boat runs behind the page headers, so the first thing a guest sees is the yacht on Caribbean water, not a stock photo." },
        { title: "An editorial, quietly luxurious design", description: "Serif headlines, a deep navy and sea palette, fine hairline rules and generous space: closer to a travel magazine than a tour operator." },
        { title: "Book where they already decide", description: "Peek's calendar and checkout are embedded in the page, so a guest picks a date without being sent to another site." },
      ],
    },
    solution: {
      intro:
        "A fast, video-led website that the owners run themselves, with booking, measurement and answers built in.",
      features: [
        { title: "Video headers", description: "Lively drone footage of the boat at anchor and under way leads the home page and each section." },
        { title: "Live sandbar conditions", description: "Water and air temperature, wind, weather and rain for the Stingray City sandbar, updated on the page." },
        { title: "Peek booking, embedded", description: "Availability, booking and payment through Peek, right inside the site's own booking section." },
        { title: "Gallery", description: "A full gallery of photos and video of the yacht and the places a day can take in." },
        { title: "Questions & answers", description: "A Q&A section the owners add to, reword and reorder from their dashboard." },
        { title: "Editable pages", description: "A visual page editor, so the owners change wording, photos and sections without touching code." },
        { title: "Email alerts", description: "When someone gets in touch, the owners and the customer both get a branded email." },
        { title: "Analytics & Tag Manager", description: "Google Analytics through Google Tag Manager, behind a consent banner, so they can see where guests come from." },
      ],
    },
    gallery: [
      {
        screenshot: "/work/19-north/boat-desktop.jpg",
        alt: "Yacht section over drone video of the catamaran, with length, cabins, kitchen, jetski, crew and power",
        address: "Charter website · The yacht",
        frame: "browser",
        title: "Meet the yacht",
        caption: "The yacht section opens on video of the boat itself, with the numbers guests ask about laid out underneath.",
      },
      {
        screenshot: "/work/19-north/page-editor-hd.jpg",
        alt: "Page editor with the home page open",
        address: "Charter website · Page editor",
        frame: "browser",
        title: "Page editor",
        caption: "The owners drag in sections and change wording, photos and video themselves, previewing on desktop, tablet and phone before they publish.",
      },
      {
        screenshot: "/work/19-north/email-crew.jpg",
        alt: "Branded email the owners receive when someone sends the contact form",
        address: "Mail · Contact enquiry from Hannah Reid",
        frame: "browser",
        title: "Email alerts",
        caption: "When someone gets in touch, the owners and the customer both get a branded email.",
      },
      {
        screenshot: "/work/19-north/home-mobile.jpg",
        alt: "Charter home page on a phone, with live sandbar conditions",
        frame: "phone",
        caption: "Live conditions and one-tap booking, on any phone.",
      },
    ],
    impact: {
      intro:
        "The site sells a private day on the water the way the owners describe it, and they keep it current themselves.",
      items: [
        { title: "A bespoke offer, presented as one", description: "Guests see the boat, the water and a day planned around them, not a list of tours and time slots." },
        { title: "Booking without leaving the site", description: "Guests go from browsing to a confirmed date in one place." },
        { title: "Owned by the business", description: "Pages, questions and policies are updated by the owners, and analytics show what's working." },
      ],
    },
  },
  {
    slug: "swift-vehicle-tracking",
    name: "Swift Fleet",
    client: "Swift", // Vehicle leasing & rental
    clientNamed: true,
    tagline: "A live vehicle tracking platform for a leasing and rental fleet.",
    summary:
      "A real-time fleet platform for Swift, a vehicle leasing and rental company. It shows where every vehicle is, how it's being used and what needs attention, on a map the whole team can work from.",
    sector: "Vehicle leasing & rental",
    services: ["bespoke-software", "integrations", "automation"],
    platforms: ["Web app", "Mobile web", "Telematics integration"],
    accent: "swift",
    status: "coming-soon",
    featured: true,
    order: 3,
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
    status: "coming-soon",
    featured: true,
    order: 4,
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
