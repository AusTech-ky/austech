# Austech website

Marketing site for Austech, a software company in the Cayman Islands. Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Copy `.env.example` to `.env.local` and fill in values as needed.

## Design system

The site should read as a product company, not an agency: light, crisp and calm, with the software itself as the main visual.

- **Colour:** warm paper white (`paper`, `canvas`), near-black ink, and a single calm cobalt accent. Each product has its own accent (`fuel`, `swift`, `relay`, `property`, `people`), used only inside its UI and badges so the site chrome stays restrained.
- **Type:** Geist for UI and body text, Geist Mono for small labels and numbers, and Instrument Serif italic for one or two accent words per headline. The scale is fluid (`text-display`, `text-h1`–`h3`, `text-lead`) with tight tracking on large sizes.
- **Space:** 1200px container, section rhythm of `py-20 / 28 / 32`, and 1px-line grids (`gap-px bg-line`) for dense lists.
- **Motion:** content fades up once as you scroll (`<Reveal>`), the hero enters in stages (`.enter`), and hover states nudge arrows and lift cards. All motion respects `prefers-reduced-motion`.
- **Product mockups** (`src/components/mockups`) are coded React screens, not images. Each one is drawn at a fixed design size (1200×780 browser, 390×800 phone) and scaled to fit by `<ScaleFrame>`, so it stays sharp and keeps its layout at every breakpoint.

Tokens live in `src/app/globals.css` under `@theme`.

## Content structure (CMS-ready)

All content is typed data. Pages never import data files directly; they go through `src/lib/content.ts`. Its functions are async, so you can point them at a headless CMS without changing any page.

| File | What it holds |
| --- | --- |
| `src/content/types.ts` | Content model: `Project`, `Product`, `Pricing`, `Service`, `TeamMember`, … |
| `src/content/site.ts` | Company name, contact details, nav, and **`productNames`** (rename Relay etc. here) |
| `src/content/projects.ts` | Case studies: challenge → approach → solution → screens → impact |
| `src/content/products.ts` | Products, features and pricing |
| `src/content/services.ts` | Services (problem → approach → outcomes), engagement models, process |
| `src/content/team.ts` | Team members. The About page shows a team section once this has entries |
| `src/content/inquiry.ts` | Contact form options |

**Add a case study:** add an object to `projects.ts`. Routes, the sitemap and metadata all update automatically. Screens refer to mockups as `{ product, view, frame }`.

**Add a product screen:** build a component in `components/mockups/`, register it in `components/mockups/index.tsx`, then reference it from your data.

**Pricing:** each price is one of three kinds:
- `{ kind: "amount", amount, currency, period }`: a real, published price.
- `{ kind: "placeholder" }`: shown with a striped "Placeholder · pricing TBC" badge.
- `{ kind: "custom", label }`: quote-based.

A product's `pricing.model` can be `"tiers"`, `"custom"` or `"none"`.

## Before launch: placeholders to confirm

- `site.ts`: legal name, domain, email (all marked `PLACEHOLDER`)
- `productNames.property` ("Harbour") and `productNames.people` ("Roster") are placeholder names
- `products.ts`: every Relay tier price is a placeholder, and the "[n]" team-member limits need filling in
- `projects.ts`: the Fuel Up client name. Have Swift and the Fuel Up client approve their case study copy. Only add impact `metric`s that are real and approved
- Contact delivery: set `RESEND_API_KEY` (or swap `deliver()` in `src/app/contact/actions.ts` for your CRM)
- Social links in `site.ts`

## SEO

The site has per-page metadata and canonical URLs, Organization JSON-LD, `sitemap.xml`, `robots.txt`, a generated Open Graph image and an SVG favicon. All pages are statically generated except `/contact`, which reads `?project=` to pre-fill the form.
