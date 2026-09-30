import type { Accent, MockupView } from "@/content/types";
import { Mockup } from "@/components/mockups";
import { cn } from "@/lib/cn";

const tints: Record<Accent, string> = {
  fuel: "from-[#fdf1e2] via-[#fbf6ef] to-[#f7f6f3]",
  swift: "from-[#e6eefd] via-[#f1f5fc] to-[#f6f6f4]",
  relay: "from-[#e3f4ec] via-[#eff7f3] to-[#f6f6f4]",
  property: "from-[#eeebfc] via-[#f4f2fb] to-[#f6f6f4]",
  people: "from-[#fbe9e6] via-[#faf2f0] to-[#f6f6f4]",
  sea: "from-[#e0f1ee] via-[#edf6f4] to-[#f6f6f4]",
  accent: "from-[#e9eefc] via-[#f2f4fb] to-[#f6f6f4]",
};

/**
 * A soft, tinted "stage" that presents a product screen, optionally with a
 * phone overlapping the corner.
 */
export function Stage({
  accent,
  main,
  phone,
  className,
  compact,
}: {
  accent: Accent;
  main: MockupView;
  phone?: MockupView;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.25rem] bg-gradient-to-br ring-1 ring-inset ring-ink/[0.04] sm:rounded-[1.75rem]",
        tints[accent],
        compact ? "p-4 sm:p-6" : "p-4 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0",
        className,
      )}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className={cn("relative", phone && "pr-[12%] sm:pr-[13%]")}>
        <Mockup view={main} className={cn(!compact && "rounded-b-none!")} />
        {phone && (
          <div className="absolute bottom-[-4%] right-0 w-[22%] sm:bottom-[-6%]">
            <Mockup view={phone} />
          </div>
        )}
      </div>
    </div>
  );
}
