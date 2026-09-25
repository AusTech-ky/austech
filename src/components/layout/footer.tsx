import Link from "next/link";
import { site } from "@/content/site";
import { getProducts, getServices } from "@/lib/content";
import { Container } from "@/components/ui/layout";
import { Logo } from "./logo";

export async function Footer() {
  const [services, products] = await Promise.all([getServices(), getProducts()]);
  const year = new Date().getFullYear();

  const columns = [
    {
      title: "Services",
      links: services.map((s) => ({ label: s.title, href: `/services#${s.key}` })),
    },
    {
      title: "Products",
      links: products.map((p) => ({
        label: p.status === "coming-soon" ? `${p.name} (soon)` : p.name,
        href: `/products#${p.slug}`,
      })),
    },
    {
      title: "Company",
      links: [
        { label: "Work", href: "/work" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="border-t border-line bg-paper">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{site.tagline} Bespoke software, business applications and modern websites, built in the Cayman Islands.</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block text-[0.95rem] font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
            >
              {site.email}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[0.9rem] text-ink-2 transition-colors hover:text-ink">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-[0.8rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName} · {site.location.region}, {site.location.country}
          </p>
          <p className="flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-positive" />
              <span className="relative size-1.5 rounded-full bg-positive" />
            </span>
            Taking on new projects
          </p>
        </div>
      </Container>
    </footer>
  );
}
