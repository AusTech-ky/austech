import { ArrowUpRight, Check } from "lucide-react";
import type { Product } from "@/content/types";
import { productLink } from "@/lib/product-link";
import { cn } from "@/lib/cn";
import { Mockup } from "@/components/mockups";

/**
 * A dark, full-width feature for the one product we want people to stop
 * on (e.g. one about to launch). Deliberately unlike the light cards and
 * stages around it.
 */
export function ProductSpotlight({ product, className }: { product: Product; className?: string }) {
  const link = productLink(product);
  const soon = product.status === "coming-soon";
  const label = product.statusLabel ?? (soon ? "Coming soon" : "Available now");

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[1.5rem] bg-[#0b1220] text-white ring-1 ring-white/5 sm:rounded-[2rem]",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_85%_20%,rgb(223_90_71/0.38),transparent_70%),radial-gradient(ellipse_50%_60%_at_0%_100%,rgb(30_58_138/0.55),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_75%)]"
      />

      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="px-6 pt-8 sm:px-10 sm:pt-12 lg:col-span-5 lg:py-14 lg:pl-14 lg:pr-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full bg-people/15 px-3 py-1 text-[0.75rem] font-semibold tracking-[0.02em] text-[#ff9c8c] ring-1 ring-inset ring-people/40">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-people opacity-70 motion-reduce:animate-none" />
                <span className="relative size-2 rounded-full bg-people" />
              </span>
              {label}
            </span>
            <span className="text-[0.8rem] font-medium text-white/55">{product.category}</span>
          </div>

          <h3 className="mt-6 text-[clamp(2.75rem,6vw,4.25rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
            {product.name}
            {product.brand && (
              <span className="mt-2 block text-[0.42em] font-medium tracking-[-0.01em] text-white/60">
                by <span className="text-white">{product.brand.by}</span>
              </span>
            )}
          </h3>
          <p className="mt-6 text-[1.15rem] font-medium text-white/90">{product.tagline}</p>
          <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-white/60">{product.description}</p>

          <ul className="mt-7 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f.title} className="flex items-center gap-2 text-[0.9rem] text-white/80">
                <Check className="size-4 shrink-0 text-[#ff9c8c]" strokeWidth={2.4} aria-hidden />
                {f.title}
              </li>
            ))}
          </ul>

          <a
            href={link.href}
            {...(link.external && { target: "_blank", rel: "noopener" })}
            className="group mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[0.95rem] font-semibold tracking-[-0.01em] text-[#0b1220] transition-[background-color,transform] duration-300 ease-[var(--ease-out-soft)] hover:bg-[#ffe9e5] active:scale-[0.98]"
          >
            {link.label}
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2.2}
            />
          </a>
        </div>

        <div className="relative pl-6 sm:pl-10 lg:col-span-7 lg:pl-4">
          <div className="translate-x-[6%] translate-y-[4%] lg:translate-x-[8%] lg:translate-y-[10%] lg:-rotate-[2deg]">
            <Mockup view={product.screens[0]} className="shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] ring-1 ring-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
