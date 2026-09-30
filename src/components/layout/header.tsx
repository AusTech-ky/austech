"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { cn } from "@/lib/cn";
import { Logo } from "./logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Home and contact open on a dark band; until the page scrolls, the header sits on it.
  const onDark = (pathname === "/" || pathname === "/contact") && !scrolled && !open;

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        // Solid when the menu is open (a translucent bar turns grey over the dark home hero).
        open
          ? "bg-paper shadow-[0_1px_0_var(--color-line)]"
          : scrolled
            ? "bg-paper/95 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl backdrop-saturate-150"
            : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Logo
          reversed={onDark}
          onClick={(e) => {
            // Already home: a link to the same page does nothing, so close the menu and go back to the top.
            setOpen(false);
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-[0.9rem] transition-colors",
                onDark
                  ? isActive(item.href)
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                  : isActive(item.href)
                    ? "text-ink"
                    : "text-muted hover:text-ink",
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span className={cn("absolute inset-x-3.5 -bottom-px h-px", onDark ? "bg-white" : "bg-ink")} aria-hidden />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" size="md" arrow className={cn(onDark && "bg-white! text-navy! hover:bg-white/90!")}>
            Discuss your project
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 grid size-10 place-items-center rounded-full md:hidden"
        >
          <span className="relative block h-3 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 h-[1.5px] w-5 transition-transform duration-300",
                onDark ? "bg-white" : "bg-ink",
                open && "translate-y-[5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-[1.5px] w-5 transition-transform duration-300",
                onDark ? "bg-white" : "bg-ink",
                open && "-translate-y-[5.5px] -rotate-45",
              )}
            />
          </span>
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper md:hidden"
      >
        <Container className="flex h-full flex-col pb-10 pt-6">
          <nav aria-label="Mobile" className="flex flex-col">
            {[{ label: "Home", href: "/" }, ...site.nav, { label: "Contact", href: "/contact" }].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between border-b border-line py-4 text-[1.6rem] font-medium tracking-[-0.03em] text-ink"
                style={{ animation: `fade-up 0.5s ${i * 40}ms both var(--ease-out-soft)` }}
              >
                {item.label}
                {(item.href === "/" ? pathname === "/" : isActive(item.href)) && (
                  <span className="size-2 rounded-full bg-accent" aria-hidden />
                )}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-10">
            <Button href="/contact" size="lg" arrow className="w-full">
              Discuss your project
            </Button>
            <p className="mt-4 text-center text-sm text-muted">
              {site.email} · {site.phone.display}
            </p>
          </div>
        </Container>
      </div>
    </header>
  );
}
