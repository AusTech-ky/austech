import { Check } from "lucide-react";
import type { Price, Pricing, PricingTier } from "@/content/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

const periodLabel = { month: "/ month", year: "/ year", "one-off": "one-off" } as const;

/** Renders any Price shape. Placeholders are visibly marked, never disguised as real. */
export function PriceTag({ price, emphasis }: { price: Price; emphasis?: boolean }) {
  if (price.kind === "custom") {
    return <p className="text-[2rem] font-semibold tracking-[-0.03em] text-ink">{price.label}</p>;
  }

  if (price.kind === "placeholder") {
    return (
      <div>
        <div className="flex items-baseline gap-1.5">
          <span
            className={cn(
              "rounded-md px-1.5 text-[2rem] font-semibold tracking-[-0.03em] text-[#8a5a00]",
              "bg-[repeating-linear-gradient(135deg,#fff7e6_0_6px,#fff1d6_6px_12px)] ring-1 ring-inset ring-[#efd49b]",
            )}
            aria-label="Price to be confirmed"
          >
            $ —
          </span>
          {price.period && <span className="text-[0.9rem] text-muted">{periodLabel[price.period]}</span>}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge tone="placeholder">{price.label ?? "Placeholder · pricing TBC"}</Badge>
          {price.unit && <span className="text-[0.78rem] text-faint">{price.unit}</span>}
        </div>
      </div>
    );
  }

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    maximumFractionDigits: price.amount % 1 === 0 ? 0 : 2,
  }).format(price.amount);
  return (
    <div>
      <div className="flex items-baseline gap-1.5">
        <span className={cn("nums font-semibold tracking-[-0.03em] text-ink", emphasis ? "text-[2.4rem]" : "text-[2rem]")}>
          {formatted}
        </span>
        {price.period && <span className="text-[0.9rem] text-muted">{periodLabel[price.period]}</span>}
      </div>
      {price.unit && <p className="mt-1 text-[0.78rem] text-faint">{price.unit}</p>}
    </div>
  );
}

function TierCard({ tier, index }: { tier: PricingTier; index: number }) {
  return (
    <Reveal
      delay={index * 70}
      className={cn(
        "relative flex flex-col rounded-card p-6 sm:p-7",
        tier.highlighted ? "bg-white shadow-lift ring-1 ring-ink/10" : "bg-white/60 ring-1 ring-line",
      )}
    >
      {tier.highlighted && (
        <span className="absolute -top-3 left-6 rounded-full bg-ink px-2.5 py-1 text-[0.7rem] font-medium text-white">
          {tier.highlightLabel ?? "Recommended"}
        </span>
      )}
      <h4 className="text-[1.1rem] font-semibold tracking-[-0.02em] text-ink">{tier.name}</h4>
      <p className="mt-1 text-[0.88rem] text-muted">{tier.description}</p>
      <div className="mt-6 min-h-[5.5rem]">
        <PriceTag price={tier.price} emphasis={tier.highlighted} />
      </div>
      <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6">
        {tier.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-[0.9rem] text-ink-2">
            <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2.2} />
            {f}
          </li>
        ))}
      </ul>
      <Button href={tier.cta.href} variant={tier.highlighted ? "primary" : "secondary"} className="mt-8 w-full">
        {tier.cta.label}
      </Button>
    </Reveal>
  );
}

/** Chooses the right pricing presentation from data. */
export function PricingBlock({ pricing, productName }: { pricing: Pricing; productName: string }) {
  if (pricing.model === "none") return null;

  if (pricing.model === "custom") {
    return (
      <Reveal className="grid gap-8 rounded-card bg-white p-6 ring-1 ring-line sm:p-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
        <div>
          <p className="eyebrow">Pricing</p>
          <h4 className="mt-3 text-h3 font-semibold text-ink">{pricing.headline}</h4>
          <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">{pricing.description}</p>
          <Button href={pricing.cta.href} arrow className="mt-7">
            {pricing.cta.label}
          </Button>
        </div>
        <div>
          <p className="text-[0.85rem] font-medium text-ink">Every {productName} setup includes</p>
          <ul className="mt-4 space-y-2.5">
            {pricing.includes.map((i) => (
              <li key={i} className="flex gap-2.5 text-[0.9rem] text-ink-2">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2.2} />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <p className="eyebrow">Pricing</p>
        {pricing.note && <p className="max-w-md text-[0.8rem] text-faint sm:text-right">{pricing.note}</p>}
      </div>
      <div className={cn("mt-5 grid gap-4", pricing.tiers.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
        {pricing.tiers.map((t, i) => (
          <TierCard key={t.name} tier={t} index={i} />
        ))}
      </div>
    </div>
  );
}
