import { Lock } from "lucide-react";
import { cn } from "@/lib/cn";
import { ScaleFrame } from "./scale-frame";

export const BROWSER = { width: 1200, height: 780, chrome: 40 };
export const PHONE = { width: 390, height: 800 };

/** Desktop browser window. Children render in a 1200×740 viewport. */
export function BrowserFrame({
  address,
  label,
  className,
  children,
}: {
  address: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("overflow-hidden rounded-[10px] bg-white shadow-frame sm:rounded-[14px]", className)}>
      <ScaleFrame width={BROWSER.width} height={BROWSER.height} label={label}>
        <div className="flex h-full flex-col bg-white">
          <div
            className="relative flex shrink-0 items-center border-b border-[#ececea] bg-[#f7f7f6] px-4"
            style={{ height: BROWSER.chrome }}
          >
            <div className="flex gap-2">
              <span className="size-3 rounded-full bg-[#e3e3e0]" />
              <span className="size-3 rounded-full bg-[#e3e3e0]" />
              <span className="size-3 rounded-full bg-[#e3e3e0]" />
            </div>
            <div className="absolute left-1/2 flex h-[26px] w-[380px] -translate-x-1/2 items-center justify-center gap-1.5 rounded-[7px] bg-white text-[12px] text-muted shadow-[0_0_0_1px_#ebebe8]">
              <Lock className="size-3 text-faint" strokeWidth={2.2} />
              {address}
            </div>
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
        </div>
      </ScaleFrame>
    </div>
  );
}

/** Phone. Children render in a 366×776 screen with rounded corners. */
export function PhoneFrame({
  label,
  className,
  screenClassName,
  children,
}: {
  label: string;
  className?: string;
  screenClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "[filter:drop-shadow(0_30px_40px_rgb(13_16_20/0.18))_drop-shadow(0_2px_4px_rgb(13_16_20/0.08))]",
        className,
      )}
    >
      <ScaleFrame width={PHONE.width} height={PHONE.height} label={label}>
        <div className="h-full w-full rounded-[58px] bg-[#16181c] p-[12px] shadow-[inset_0_0_0_1.5px_#3a3d44,inset_0_0_0_4px_#0c0d0f]">
          <div className={cn("relative h-full w-full overflow-hidden rounded-[46px] bg-white", screenClassName)}>
            <div className="absolute left-1/2 top-[11px] z-20 h-[32px] w-[108px] -translate-x-1/2 rounded-full bg-[#0c0d0f]" />
            {children}
            <div className="absolute bottom-[8px] left-1/2 z-20 h-[5px] w-[130px] -translate-x-1/2 rounded-full bg-ink/80" />
          </div>
        </div>
      </ScaleFrame>
    </div>
  );
}
