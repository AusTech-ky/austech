"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

/**
 * Bar pinned to the bottom of a case study whose work became a product.
 * Appears once the reader scrolls past the header, and steps aside while the
 * same call to action is on screen further down (`#product-cta`) or the
 * footer is showing, so it never doubles up or covers anything.
 */
export function StickyProductBar({
  name,
  slug,
  tagline,
  international,
}: {
  name: string;
  slug: string;
  tagline: string;
  international?: boolean;
}) {
  const [pastTop, setPastTop] = useState(false);
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = [document.getElementById("product-cta"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => !!el,
    );
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setCovered(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = pastTop && !covered;

  return (
    <div
      inert={!show}
      className={cn(
        "fixed inset-x-0 bottom-4 z-40 px-4 transition-all duration-500 ease-[var(--ease-out-soft)] sm:bottom-6",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <div className="mx-auto flex max-w-[1100px] flex-col gap-4 rounded-2xl bg-white/90 p-4 shadow-lift ring-1 ring-line backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="min-w-0">
          <p className="text-[0.95rem] font-semibold text-ink">
            {name} is available as a product
            {international && (
              <span className="font-normal text-muted"> (including for companies outside the Cayman Islands)</span>
            )}
          </p>
          <p className="mt-0.5 hidden text-[0.85rem] text-muted sm:block">{tagline}</p>
        </div>
        <div className="flex shrink-0 gap-2.5">
          <Button href={`/contact?project=${slug}`} arrow>
            Request a demo
          </Button>
          <Button href={`/products#${slug}`} variant="secondary" className="hidden sm:inline-flex">
            See {name}
          </Button>
        </div>
      </div>
    </div>
  );
}
