"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Renders children at a fixed design size (e.g. 1200×780) and scales the
 * whole thing to fit the available width. Mockups keep pixel-perfect
 * composition on every screen instead of reflowing into mush on mobile.
 */
export function ScaleFrame({
  width,
  height,
  label,
  className,
  innerClassName,
  children,
}: {
  width: number;
  height: number;
  label: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={cn("relative w-full", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-0 top-0 origin-top-left select-none transition-opacity duration-500",
          innerClassName,
        )}
        style={{
          width,
          height,
          transform: `scale(${scale ?? 1})`,
          opacity: scale === null ? 0 : 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}
