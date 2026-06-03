import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

// Minimal OG image generator used by both the live site (Day 9 wires
// per-route Metadata to call this) and the Studio's OGImagePreview component.
// Day 9 polishes typography and brand treatment; Day 4 just needs it to
// return *something* renderable so editors can see their copy composited.

export const runtime = "edge";

const BRAND_BG = "#0a0a0f";
const BRAND_FG = "#f5f5f7";
const BRAND_ACCENT = "#ff7a18";

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "Foniolabs").slice(0, 120);
  const subtitle = (searchParams.get("subtitle") ?? "").slice(0, 200);
  const eyebrow = (searchParams.get("eyebrow") ?? "foniolabs.xyz").slice(0, 60);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: BRAND_BG,
          color: BRAND_FG,
          fontFamily: "system-ui, -apple-system, Inter, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: BRAND_ACCENT,
          }}
        >
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: title.length > 60 ? 64 : 84,
              lineHeight: 1.05,
              fontWeight: 700,
              maxWidth: "85%",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 32,
                lineHeight: 1.4,
                color: "rgba(245, 245, 247, 0.7)",
                maxWidth: "80%",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "rgba(245, 245, 247, 0.5)",
          }}
        >
          <div>Foniolabs</div>
          <div
            style={{
              height: 6,
              width: 120,
              background: BRAND_ACCENT,
              borderRadius: 999,
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
