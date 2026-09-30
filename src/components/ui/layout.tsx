import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  tone = "paper",
  children,
}: {
  id?: string;
  className?: string;
  tone?: "paper" | "canvas";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-20 sm:py-28 lg:py-32", tone === "canvas" && "bg-canvas", className)}
    >
      {children}
    </section>
  );
}


/** Standard section heading: title, optional intro. */
export function SectionHeader({
  title,
  intro,
  align = "left",
  className,
  children,
}: {
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <h2 className="text-h2 font-semibold text-ink">{title}</h2>
      {intro && <p className="mt-5 text-lead text-muted">{intro}</p>}
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "soon" | "placeholder";
  className?: string;
}) {
  const tones = {
    neutral: "bg-white text-ink-2 ring-line",
    accent: "bg-accent-soft text-accent-strong ring-accent/15",
    soon: "bg-[#fff8eb] text-[#9a5d06] ring-[#f3dcb0]",
    placeholder: "bg-[repeating-linear-gradient(135deg,#fff7e6_0_6px,#fff1d6_6px_12px)] text-[#8a5a00] ring-[#efd49b]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-medium tracking-[0.01em] ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
