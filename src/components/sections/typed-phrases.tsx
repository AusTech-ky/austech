"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 55;
const ERASE_MS = 28;
const HOLD_MS = 1900;
const GAP_MS = 350;

/**
 * Types each phrase, holds it, erases it, then moves to the next. Space for
 * the longest phrase is reserved up front so the layout never jumps.
 * Under prefers-reduced-motion the first phrase is shown still.
 */
export function TypedPhrases({ phrases, className }: { phrases: readonly string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(phrases[0].length);
  const [erasing, setErasing] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Hold the server-rendered first phrase for a beat, then start the loop.
    const t = setTimeout(() => {
      setAnimate(true);
      setErasing(true);
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!animate) return;
    const phrase = phrases[index];
    let t: ReturnType<typeof setTimeout>;
    if (erasing) {
      if (length > 0) t = setTimeout(() => setLength((l) => l - 1), ERASE_MS);
      else
        t = setTimeout(() => {
          setErasing(false);
          setIndex((i) => (i + 1) % phrases.length);
        }, GAP_MS);
    } else if (length < phrase.length) {
      t = setTimeout(() => setLength((l) => l + 1), TYPE_MS);
    } else {
      t = setTimeout(() => setErasing(true), HOLD_MS);
    }
    return () => clearTimeout(t);
  }, [animate, erasing, index, length, phrases]);

  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a));

  return (
    <span className={`grid ${className ?? ""}`} aria-hidden>
      <span className="invisible col-start-1 row-start-1">{longest}</span>
      <span className="col-start-1 row-start-1">
        {phrases[index].slice(0, length)}
        <span className="ml-[0.06em] inline-block h-[0.82em] w-[0.06em] translate-y-[0.08em] animate-caret bg-sky" />
      </span>
    </span>
  );
}
