import { ImageResponse } from "next/og";
import { siteName } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteName;

// Default OG image for the whole site. Individual routes can override this
// by adding their own opengraph-image.tsx in that route's folder.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 82% 18%, rgba(59,130,246,0.55), rgba(59,130,246,0) 42%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              backgroundColor: "#3b82f6",
              display: "flex",
            }}
          />
          <span style={{ fontSize: 28, color: "#e7e5e4", letterSpacing: 2 }}>
            {siteName.toUpperCase()}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Teaching AI to every major.
          </span>
          <span style={{ fontSize: 30, color: "#a1a1aa" }}>
            Mondays, 8:30–9:30 PM · Mills 127 · All skill levels welcome
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
