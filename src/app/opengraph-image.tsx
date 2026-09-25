import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #fcfcfb 0%, #eef2fd 100%)",
          color: "#0d1014",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#0d1014",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>{site.name.toLowerCase()}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, maxWidth: 950 }}>
            We build software that makes business work better.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#666c77" }}>
            {`Bespoke software · Business applications · Modern websites · ${site.location.region}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
