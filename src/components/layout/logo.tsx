import Link from "next/link";
import { site } from "@/content/site";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden>
      <rect width="28" height="28" rx="8" fill="#0d1014" />
      <path d="M8 19.5 14 8l6 11.5" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 16.2c1.5-1 3-1 4.5 0s3 1 4.5 0" fill="none" stroke="#7d98f0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <LogoMark className="size-7 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:rotate-[-6deg]" />
      <span className="text-[1.05rem] font-semibold tracking-[-0.03em] text-ink">{site.name.toLowerCase()}</span>
    </Link>
  );
}
