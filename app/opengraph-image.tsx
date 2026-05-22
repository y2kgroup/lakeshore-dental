// app/opengraph-image.tsx
//
// Default site-wide OG image. Renders the business name, tagline, and host on
// a brand-colored background. Per-route OG images override this by creating
// app/<route>/opengraph-image.tsx with the same export shape.
//
// CONSTRAINTS (Satori/ImageResponse — see references/og-images.md):
// - Every element with children MUST have `display: "flex"` in inline style.
// - Hex colors only; CSS variables won't resolve.
// - Inline `style={{...}}` only; no className, no Tailwind utilities.
// - Custom fonts must be loaded via the `fonts` array (see commented example below).

import { ImageResponse } from "next/og"
import { SITE } from "@/lib/site"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = SITE.name

export default async function OpengraphImage() {
  // ── Optional: load a custom brand font.
  // Place a .ttf or .otf in public/fonts/ and uncomment.
  //
  // const displayFont = await fetch(
  //   new URL("../public/fonts/{{FONT_FILENAME}}.ttf", import.meta.url)
  // ).then((res) => res.arrayBuffer())

  const hostOnly = SITE.url.replace(/^https?:\/\//, "").replace(/\/$/, "")

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
          background: SITE.og.background,
          color: SITE.og.foreground,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top row — brand mark line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 32,
            fontWeight: 500,
            opacity: 0.85,
          }}
        >
          {/* Optional brand dot. Remove if a logo image is loaded instead. */}
          <div
            style={{
              display: "flex",
              width: 24,
              height: 24,
              borderRadius: 999,
              background: SITE.og.accent,
            }}
          />
          <div style={{ display: "flex" }}>{SITE.name}</div>
        </div>

        {/* Middle — headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 960,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1,
            }}
          >
            {SITE.tagline}
          </div>
        </div>

        {/* Bottom row — URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
            opacity: 0.75,
          }}
        >
          <div style={{ display: "flex" }}>{hostOnly}</div>
          <div
            style={{
              display: "flex",
              width: 80,
              height: 4,
              background: SITE.og.foreground,
              opacity: 0.4,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      // fonts: [
      //   { name: "Display", data: displayFont, weight: 700, style: "normal" },
      // ],
    }
  )
}
