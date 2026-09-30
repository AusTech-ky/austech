import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-[background-color,color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white shadow-[0_1px_0_rgb(255_255_255/0.12)_inset,0_1px_2px_rgb(15_30_74/0.25)] hover:bg-navy-deep",
  secondary:
    "bg-white text-ink ring-1 ring-line-strong shadow-[0_1px_2px_rgb(13_16_20/0.04)] hover:ring-ink/25 hover:bg-white",
  ghost: "text-ink hover:text-accent px-0!",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4.5 text-[0.9rem]",
  lg: "h-12 px-6 text-[0.95rem]",
};

type Props = {
  href?: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({ href, variant = "primary", size = "md", arrow, className, children, ...rest }: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 -mr-0.5 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}

/** Inline text link with an animated arrow. */
export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-ink transition-colors hover:text-accent",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5"
      />
    </Link>
  );
}
