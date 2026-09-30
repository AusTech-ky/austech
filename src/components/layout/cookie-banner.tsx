"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readConsent, saveConsent, type Consent } from "@/lib/consent";
import { cn } from "@/lib/cn";

/**
 * Small consent card in the corner. Shown until the visitor chooses; the
 * "Cookie settings" link in the footer dispatches `austech:open-cookies`
 * to bring it back.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Slide in a moment after load, rather than competing with the page's own entrance.
    const t = setTimeout(() => {
      if (!readConsent()) setOpen(true);
    }, 800);
    const reopen = () => setOpen(true);
    window.addEventListener("austech:open-cookies", reopen);
    return () => {
      clearTimeout(t);
      window.removeEventListener("austech:open-cookies", reopen);
    };
  }, []);

  const choose = (value: Consent) => {
    saveConsent(value);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      inert={!open}
      className={cn(
        "fixed bottom-4 left-4 right-4 z-50 max-w-sm rounded-2xl bg-white p-5 shadow-lift ring-1 ring-line transition-all duration-500 ease-[var(--ease-out-soft)] sm:left-6 sm:right-auto sm:bottom-6",
        open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <p className="text-[0.95rem] font-semibold text-ink">Cookies</p>
      <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted">
        We only use what&apos;s needed to run the site and keep the contact form free of spam. No advertising or
        tracking. Read our <Link href="/cookies" className="text-navy underline underline-offset-2">cookie policy</Link>{" "}
        and <Link href="/privacy" className="text-navy underline underline-offset-2">privacy policy</Link>.
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => choose("all")}
          className="h-9 rounded-full bg-navy px-4 text-[0.85rem] font-medium text-white transition-colors hover:bg-navy-deep"
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={() => choose("essential")}
          className="h-9 rounded-full bg-white px-4 text-[0.85rem] font-medium text-ink ring-1 ring-line-strong transition-colors hover:ring-ink/25"
        >
          Essential only
        </button>
      </div>
    </div>
  );
}

/** Footer link that reopens the banner. */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("austech:open-cookies"))} className={className}>
      Cookie settings
    </button>
  );
}

