import type { MockupKey, MockupView } from "@/content/types";
import { productNames } from "@/content/site";
import Image from "next/image";
import { BROWSER, BrowserFrame, PHONE, PhoneFrame, TABLET, TabletFrame } from "./frames";
import { FuelUpAdmin, FuelUpDashboard, FuelUpMobile } from "./fuelup";
import { SwiftMap, SwiftMobile, SwiftVehicle } from "./swift";
import { RelayInbox, RelayMobile, RelayTeam } from "./relay";
import { PeopleOverview, PropertyOverview } from "./upcoming";

type Screen = { component: React.ComponentType; label: string };

/**
 * Registry of coded product screens. Content refers to screens by
 * `{ product, view }`, so adding a screen is: build the component,
 * register it here, reference it in data.
 */
const registry: Record<MockupKey, { address: string; views: Record<string, Screen> }> = {
  fuelup: {
    address: `${productNames.fuelup} · Account`,
    views: {
      dashboard: { component: FuelUpDashboard, label: `${productNames.fuelup} customer dashboard showing available credit, monthly spend, recent fills and driver limits` },
      admin: { component: FuelUpAdmin, label: `${productNames.fuelup} back office listing customer accounts with balances and credit usage` },
      mobile: { component: FuelUpMobile, label: `${productNames.fuelup} mobile app showing available credit and recent fills` },
    },
  },
  swift: {
    address: "Swift · Fleet",
    views: {
      map: { component: SwiftMap, label: "Swift fleet platform live map with vehicle positions, status filters and a selected vehicle" },
      vehicle: { component: SwiftVehicle, label: "Swift vehicle detail with trip route, lease agreement, service status and alerts" },
      mobile: { component: SwiftMobile, label: "Swift mobile view locating a vehicle on the map" },
    },
  },
  relay: {
    address: `${productNames.relay} · Inbox`,
    views: {
      inbox: { component: RelayInbox, label: `${productNames.relay} shared WhatsApp inbox with conversation list, assigned chat thread, internal note and contact details` },
      team: { component: RelayTeam, label: `${productNames.relay} team overview with response times and workload` },
      mobile: { component: RelayMobile, label: `${productNames.relay} mobile conversation view` },
    },
  },
  property: {
    address: `${productNames.property} · Overview`,
    views: {
      overview: { component: PropertyOverview, label: `${productNames.property} property management dashboard (in development)` },
    },
  },
  people: {
    address: `${productNames.people} · Home`,
    views: {
      overview: { component: PeopleOverview, label: `${productNames.people} HR dashboard (in development)` },
    },
  },
};

/** A real screenshot, sized to the frame's viewport. */
function Screenshot({ src, frame }: { src: string; frame: "browser" | "tablet" | "phone" }) {
  const w = frame === "phone" ? PHONE.width - 24 : frame === "tablet" ? TABLET.width : BROWSER.width;
  const h = frame === "phone" ? PHONE.height - 24 : frame === "tablet" ? TABLET.height : BROWSER.height - BROWSER.chrome;
  // Served as captured (2x JPEGs): re-encoding at the optimiser's default quality made UI text grainy.
  const image = <Image src={src} alt="" width={w} height={h} unoptimized className="h-full w-full object-cover object-top" />;
  // Phone shots start below a status bar (capture them at 366×726) so the notch never covers the page.
  return frame === "phone" ? <div className="h-full bg-[#0c0d0f] pt-[50px]">{image}</div> : image;
}

export function Mockup({ view, className }: { view: MockupView; className?: string }) {
  if ("screenshot" in view) {
    if (view.frame === "tablet")
      return (
        <TabletFrame label={view.alt} className={className}>
          <Screenshot src={view.screenshot} frame="tablet" />
        </TabletFrame>
      );
    return view.frame === "phone" ? (
      <PhoneFrame label={view.alt} className={className}>
        <Screenshot src={view.screenshot} frame="phone" />
      </PhoneFrame>
    ) : (
      <BrowserFrame address={view.address ?? ""} label={view.alt} className={className}>
        <Screenshot src={view.screenshot} frame="browser" />
      </BrowserFrame>
    );
  }

  const product = registry[view.product];
  const screen = product?.views[view.view];
  if (!screen) return null;
  const Component = screen.component;

  if (view.frame === "phone") {
    return (
      <PhoneFrame label={screen.label} className={className}>
        <Component />
      </PhoneFrame>
    );
  }
  return (
    <BrowserFrame address={product.address} label={screen.label} className={className}>
      <Component />
    </BrowserFrame>
  );
}
