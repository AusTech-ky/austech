import Image from "next/image";
import Link from "next/link";
import type { ServiceKey } from "@/content/types";
import { cn } from "@/lib/cn";

/** Clients shown under each service, each linking to its case study. */
const clients: Partial<Record<ServiceKey, { name: string; logo: string; width: number; height: number; href: string; className: string; opacity?: string }[]>> = {
  websites: [
    { name: "Fuel Up", logo: "/clients/fuel-up-grey.png", width: 1187, height: 331, href: "/work/fuel-up", className: "h-6" },
    { name: "Boat charter website", logo: "/clients/19-north.svg", width: 2200, height: 400, href: "/work/boat-charter-website", className: "h-7" },
  ],
  "bespoke-software": [
    { name: "Home furnishings retailer", logo: "/clients/ahh.png", width: 514, height: 122, href: "/work/furniture-inventory", className: "h-9", opacity: "opacity-60 hover:opacity-90" },
  ],
};

/** Light grey client logos under a small "Clients" label. */
export function ClientLogos({ service = "websites", className }: { service?: ServiceKey; className?: string }) {
  const list = clients[service];
  if (!list?.length) return null;
  return (
    <div className={cn("relative z-10", className)}>
      <p className="text-[0.75rem] font-medium text-faint">Clients</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-7 gap-y-3">
        {list.map((c) => (
          <Link key={c.href} href={c.href} aria-label={`${c.name} case study`} className="block">
            <Image
              src={c.logo}
              alt={c.name}
              width={c.width}
              height={c.height}
              className={cn("w-auto brightness-0 transition-opacity duration-300", c.opacity ?? "opacity-30 hover:opacity-60", c.className)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
