"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * The case study's chapters as a row of pills that sticks under the site
 * header. The chapter being read is filled in the product's colour; on a
 * phone the row scrolls sideways and keeps that pill in view.
 */
export function ChapterBar({ chapters, activeClass }: { chapters: { id: string; label: string }[]; activeClass: string }) {
  const [active, setActive] = useState(0);
  const row = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      // The last chapter whose top has passed the upper third of the screen.
      const line = window.innerHeight * 0.35;
      let next = 0;
      chapters.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= line) next = i;
      });
      setActive(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [chapters]);

  // Keep the active pill in view inside the row (never scrolls the page).
  useEffect(() => {
    const el = row.current;
    const pill = el?.children[active] as HTMLElement | undefined;
    if (!el || !pill || el.scrollWidth <= el.clientWidth) return;
    el.scrollTo({ left: pill.offsetLeft - (el.clientWidth - pill.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  return (
    // A frosted band under the header, so text scrolling up passes beneath it rather than behind the pills.
    <div className="sticky top-16 z-30 mt-8 bg-paper/85 py-2 backdrop-blur-xl backdrop-saturate-150 sm:mt-10">
      <nav aria-label="Chapters" className="mx-auto w-fit max-w-[calc(100%-2.5rem)] sm:max-w-[calc(100%-4rem)]">
        <div
          ref={row}
          className="relative flex gap-1 overflow-x-auto rounded-full bg-white p-1 shadow-soft ring-1 ring-line [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {chapters.map((c, i) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              aria-current={i === active ? "location" : undefined}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[0.85rem] transition-colors duration-300",
                i === active ? cn(activeClass, "text-white") : "text-muted hover:bg-canvas hover:text-ink",
              )}
            >
              {c.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
