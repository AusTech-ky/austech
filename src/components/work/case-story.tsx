"use client";

import { useEffect, useRef, useState } from "react";
import type { Accent, CaseStory as Story, MockupView } from "@/content/types";
import { Mockup } from "@/components/mockups";
import { stageTints } from "@/components/sections/stage";
import { accentClasses } from "@/lib/accent";
import { cn } from "@/lib/cn";
import { panelThemes } from "@/lib/panel-themes";

/** Where each kind of screen sits in the 1200×780 box on the pinned stage, so they all stand the same height. */
const place: Record<MockupView["frame"], string> = {
  browser: "inset-0",
  tablet: "inset-y-0 left-1/2 w-[92%] -translate-x-1/2",
  phone: "inset-y-0 left-1/2 w-[31.7%] -translate-x-1/2",
};

/**
 * Follows one piece of work through the system.
 *
 * Wide screens: the steps scroll past on the left while the screen stays
 * pinned on the right and changes at each step. Phones: a row of numbered
 * steps over cards that swipe sideways, each with its own screen, so
 * nothing is pinned and nothing is squeezed.
 */
export function CaseStory({ story, accent }: { story: Story; accent: Accent }) {
  const { steps } = story;
  const a = accentClasses[accent];
  const t = panelThemes[accent];

  // Wide screens: the step crossing the middle of the screen.
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Phones: the card in view, and the numbered chip that goes with it.
  const [card, setCard] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const chips = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = track.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCard(Number((e.target as HTMLElement).dataset.i));
      },
      { root, threshold: 0.6 },
    );
    Array.from(root.children).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const row = chips.current;
    const chip = row?.children[card] as HTMLElement | undefined;
    if (!row || !chip || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });
  }, [card]);

  const go = (i: number) => {
    const root = track.current;
    const el = root?.children[i] as HTMLElement | undefined;
    if (!root || !el) return;
    root.scrollTo({ left: el.offsetLeft - parseFloat(getComputedStyle(root).paddingLeft), behavior: "smooth" });
  };

  return (
    <>
      {/* Wide screens */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-14">
        <ol className="py-[12vh] lg:col-span-5">
          {steps.map((s, i) => (
            <li
              key={s.title}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-i={i}
              className="flex min-h-[62vh] flex-col justify-center"
            >
              <div className={cn("transition-opacity duration-500", i === active ? "opacity-100" : "opacity-30")}>
                <p className="flex items-center gap-3 text-[0.9rem] font-medium text-ink-2">
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-full text-[0.8rem] font-semibold transition-colors duration-500",
                      i === active ? cn(t.bg, "text-white") : "bg-canvas text-muted ring-1 ring-line",
                    )}
                  >
                    {i + 1}
                  </span>
                  {s.label}
                </p>
                <h3 className="mt-5 text-[clamp(1.6rem,1.2rem+1vw,2.2rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-ink">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="lg:col-span-7">
          <div className="sticky top-[max(8.5rem,calc(50vh_-_17rem))]">
            <div
              className={cn(
                "relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br p-8 ring-1 ring-inset ring-ink/[0.04]",
                stageTints[accent],
              )}
            >
              <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
              <div className="relative aspect-[1200/780]">
                {steps.map((s, i) => (
                  <div
                    key={s.title}
                    aria-hidden={i !== active}
                    className={cn(
                      "absolute transition-[opacity,scale] duration-700 ease-[var(--ease-out-soft)]",
                      place[s.screen.frame],
                      i === active ? "scale-100 opacity-100" : "pointer-events-none scale-[0.97] opacity-0",
                    )}
                  >
                    <Mockup view={s.screen} />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 flex items-center gap-4" aria-hidden>
              <span className="nums font-mono text-[0.75rem] text-muted">
                {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </span>
              <span className="flex flex-1 gap-1.5">
                {steps.map((s, i) => (
                  <span
                    key={s.title}
                    className={cn("h-1 flex-1 rounded-full transition-colors duration-500", i <= active ? a.bg : "bg-line")}
                  />
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Phones and tablets */}
      <div className="lg:hidden">
        <div
          ref={chips}
          className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {steps.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => go(i)}
              aria-current={i === card ? "step" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5 text-[0.85rem] ring-1 ring-inset transition-colors duration-300",
                i === card ? cn(t.bg, "text-white ring-transparent") : "bg-white text-muted ring-line",
              )}
            >
              <span
                className={cn(
                  "grid size-6 place-items-center rounded-full text-[0.72rem] font-semibold",
                  i === card ? "bg-white/15" : "bg-canvas text-ink-2",
                )}
              >
                {i + 1}
              </span>
              {s.label}
            </button>
          ))}
        </div>

        <div
          ref={track}
          className="relative -mx-5 mt-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {steps.map((s, i) => (
            <article
              key={s.title}
              data-i={i}
              aria-label={`Step ${i + 1} of ${steps.length}`}
              className="flex w-[86%] shrink-0 snap-start flex-col overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-line sm:w-[64%]"
            >
              <div className={cn("relative aspect-[4/3] overflow-hidden bg-gradient-to-br", stageTints[accent])}>
                <div
                  className={cn(
                    "absolute top-5",
                    s.screen.frame === "phone" ? "left-1/2 w-[46%] -translate-x-1/2" : "left-5 w-[125%]",
                  )}
                >
                  <Mockup view={s.screen} />
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[0.8rem] font-medium text-muted">
                  <span className={a.text}>{i + 1}</span>
                  <span className="mx-1.5 text-line-strong">·</span>
                  {s.label}
                </p>
                <h3 className="mt-2 text-[1.2rem] font-semibold leading-snug tracking-[-0.02em] text-ink">{s.title}</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-muted">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
