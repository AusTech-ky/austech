import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/content/types";
import { accentClasses } from "@/lib/accent";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/layout";
import { externalProps } from "@/components/ui/button";
import { Stage } from "@/components/sections/stage";

/** "New", "Coming soon" or "Available"; a product's own badge wears its colour. */
export function ProductBadge({ product, now }: { product: Product; now?: boolean }) {
  const a = accentClasses[product.accent];
  if (product.badge) return <Badge tone="plain" className={cn(a.soft, a.text)}>{product.badge}</Badge>;
  if (product.status === "coming-soon") return <Badge tone="soon">Coming soon</Badge>;
  return <Badge>{now ? "Available now" : "Available"}</Badge>;
}

export function ProductCard({ product, size = "lg" }: { product: Product; size?: "lg" | "sm" }) {
  const a = accentClasses[product.accent];
  const soon = product.status === "coming-soon";
  const site = product.website;
  return (
    <Link
      href={site?.href ?? `/products#${product.slug}`}
      {...(site ? externalProps : {})}
      className="group flex h-full flex-col overflow-hidden rounded-card bg-white ring-1 ring-line transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div className="p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-[0.8rem] font-medium text-ink-2">
            <span className={cn("size-2 rounded-full", a.dot)} />
            {product.category}
          </span>
          <ProductBadge product={product} />
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-h3 font-semibold text-ink">
              {product.name}
              {site && <span className="ml-2 text-[0.85rem] font-normal tracking-normal text-muted">by {site.label}</span>}
            </h3>
            <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{product.tagline}</p>
          </div>
          <ArrowUpRight className="mt-1 size-5 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
        </div>
      </div>
      <div className={cn("mt-auto px-3 pb-3", size === "sm" && "opacity-95")}>
        <Stage accent={product.accent} main={product.screens[0]} compact className={cn(soon && "[&_[role=img]]:grayscale-[35%]")} />
      </div>
    </Link>
  );
}
