import type { Metadata } from "next"

// ============================================================================
// SITE CONFIGURATION
// ============================================================================
// Central source of truth for sitewide metadata, business info, and SEO.
// All routes import rootMetadata() and use siteMetadata() for per-route metadata.
// ============================================================================

export const SITE = {
  /** Business name as it appears on the site and in Google Business Profile. */
  name: "Lakeshore Dental",

  /** One-line tagline used in OG image and as default description fallback. */
  tagline: "Gentle care for your family's smiles",

  /** Default meta description. ~155 chars, action-oriented, includes location if local. */
  defaultDescription: "Gentle care for your family's smiles. Visit us at 245 Lake Street in Burlington, VT for comprehensive dental services.",

  /** Production URL. Read from env in prod; fall back to localhost for dev. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "production"
      ? "https://lakeshoredental.com"
      : "http://localhost:3102"),

  /** Default locale. Use BCP-47 format. */
  locale: "en_US",

  /** Twitter/X handle WITHOUT the @, or null if no presence. */
  twitterHandle: null as string | null,

  // -------------------------------------------------------------------------
  // NAP — used by JSON-LD and contact page. Must match Google Business Profile.
  // -------------------------------------------------------------------------
  contact: {
    phone: "+1-802-555-0142",
    email: "hello@lakeshoredental.com",
    address: {
      streetAddress: "245 Lake Street",
      addressLocality: "Burlington",
      addressRegion: "VT",
      postalCode: "05401",
      addressCountry: "US",
    },
    geo: {
      latitude: 44.4759,
      longitude: -73.2121,
    },
  },

  /** Opening hours for LocalBusiness JSON-LD. Use 24h "HH:MM" format. */
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "08:00", closes: "17:00" },
    { days: ["Friday"], opens: "08:00", closes: "14:00" },
  ] as Array<{ days: string[]; opens: string; closes: string }>,

  /** Social profile URLs — used in `sameAs` of JSON-LD. */
  social: {
    linkedin: null as string | null,
    facebook: null as string | null,
    instagram: null as string | null,
    twitter: null as string | null,
    github: null as string | null,
  },

  /** Schema.org type for sitewide JSON-LD. */
  schemaType: "Dentist" as
    | "LocalBusiness"
    | "Dentist"
    | "Restaurant"
    | "LegalService"
    | "MedicalClinic"
    | "Organization"
    | "Person"
    | "SoftwareApplication",

  /** Free-form price range string. Omit if not applicable. */
  priceRange: null as string | null,

  // -------------------------------------------------------------------------
  // OG image runtime constants — from locked design tokens in app/globals.css
  // -------------------------------------------------------------------------
  og: {
    background: "#428a65", // Primary sage green: hsl(155 35% 40%)
    foreground: "#f7f2ed", // Background warm cream: hsl(40 25% 97%)
    accent: "#f7f2ed",
  },

  /** Static OG fallback path in /public/. */
  defaultOgImage: "/og-default.png",
} as const

// ============================================================================
// METADATA BUILDERS
// ============================================================================

/**
 * Builds the root layout Metadata object. Sets metadataBase, title template,
 * default OG/Twitter, and env-aware robots policy.
 *
 * Used in app/layout.tsx as the sitewide metadata foundation.
 */
export function rootMetadata(): Metadata {
  const isProd =
    process.env.VERCEL_ENV === "production" ||
    (process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV)

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${SITE.name} — ${SITE.tagline}`,
      template: `%s | ${SITE.name}`,
    },
    description: SITE.defaultDescription,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: SITE.locale,
      url: SITE.url,
      title: SITE.name,
      description: SITE.defaultDescription,
      images: [
        {
          url: SITE.defaultOgImage,
          width: 1200,
          height: 630,
          alt: SITE.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE.name,
      description: SITE.defaultDescription,
      images: [SITE.defaultOgImage],
      ...(SITE.twitterHandle ? { site: `@${SITE.twitterHandle}` } : {}),
    },
    robots: isProd
      ? { index: true, follow: true }
      : { index: false, follow: false },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  }
}

/**
 * Per-route metadata input type. Matches the canonical template.
 */
type RouteMetadataInput = {
  /** Page path, including leading slash. E.g., "/contact". */
  path: string
  /** Page-specific title. Title template prepends this with " | <SITE.name>". */
  title: string
  /** Page-specific description. ~155 chars. */
  description: string
  /** Optional custom OG image path (relative to /public/ or absolute URL). */
  image?: string
  /** Optional override for openGraph type or extra openGraph fields. */
  openGraph?: Metadata["openGraph"]
  /** Optional. Set true to noindex this specific page. */
  noindex?: boolean
}

/**
 * Builds per-route Metadata. Handles canonical, openGraph.url, twitter inherit.
 *
 * Usage in route pages:
 *   export const metadata = siteMetadata({
 *     path: "/contact",
 *     title: "Contact",
 *     description: "Visit us at 245 Lake Street in Burlington, VT — or send a message and we'll get back the same day.",
 *   })
 */
export function siteMetadata({
  path,
  title,
  description,
  image,
  openGraph,
  noindex,
}: RouteMetadataInput): Metadata {
  const canonical = `${SITE.url}${path === "/" ? "" : path}`
  const ogImage = image ?? SITE.defaultOgImage

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: SITE.locale,
      url: canonical,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      ...(SITE.twitterHandle ? { site: `@${SITE.twitterHandle}` } : {}),
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  }
}
