import Link from "next/link";
import { site } from "@/content/site";

/** Horizontal logo: chip icon, AUS in navy, TECH in sky. `reversed` is the white version for dark backgrounds. */
export function Logo({
  className,
  reversed,
  onClick,
}: {
  className?: string;
  reversed?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link href="/" onClick={onClick} className="group flex items-center" aria-label={`${site.name} home`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={reversed ? "/brand/austech-logo-horizontal-reversed.svg" : "/brand/austech-logo-horizontal-colour.svg"}
        alt={site.name}
        width={684}
        height={99}
        className={className ?? "h-6 w-auto sm:h-7"}
      />
    </Link>
  );
}
