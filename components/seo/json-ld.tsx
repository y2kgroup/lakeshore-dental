// components/seo/json-ld.tsx
//
// Generic JSON-LD embed component + builders for the most common types.
//
// Usage in app/layout.tsx (sitewide):
//   import { JsonLd, localBusinessSchema } from "@/components/seo/json-ld"
//   ...
//   <body>
//     <JsonLd data={localBusinessSchema()} />
//     ...
//   </body>
//
// Usage on a page (page-specific):
//   import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld"
//   ...
//   <main>
//     <JsonLd data={breadcrumbSchema([
//       { name: "Home", url: "/" },
//       { name: "Services", url: "/services" },
//       { name: "Teeth Whitening" },
//     ])} />
//     ...
//   </main>
//
// See references/structured-data.md for type selection (LocalBusiness subtypes,
// Organization vs Person, when to add Service / Article / FAQPage, etc.).

import { SITE } from "@/lib/site"

// ---------------------------------------------------------------------------
// The embed component
// ---------------------------------------------------------------------------

export function JsonLd<T extends Record<string, unknown>>({ data }: { data: T }) {
  return (
    <script
      type="application/ld+json"
      // Safe: we serialize a known-shape object via JSON.stringify (handles escaping).
      // Never hand-write JSON inside the template literal — that's how the
      // "Unparsable structured data" warning is born.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ---------------------------------------------------------------------------
// Builders — one per schema.org type we commonly use
// ---------------------------------------------------------------------------

/**
 * LocalBusiness (or specific subtype like Dentist, LegalService, Restaurant).
 * Reads from SITE in lib/site.ts. The subtype is driven by SITE.schemaType.
 *
 * Place in app/layout.tsx so it renders sitewide.
 */
export function localBusinessSchema() {
  const { name, url, tagline, contact, hours, social, schemaType, priceRange, defaultOgImage } = SITE

  const hoursSpec = hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }))

  const sameAs = Object.values(social).filter((v): v is string => typeof v === "string" && v.length > 0)

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": `${url}/#business`,
    name,
    description: tagline,
    url,
    image: `${url}${defaultOgImage}`,
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.streetAddress,
      addressLocality: contact.address.addressLocality,
      addressRegion: contact.address.addressRegion,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.addressCountry,
    },
    ...(contact.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: contact.geo.latitude,
            longitude: contact.geo.longitude,
          },
        }
      : {}),
    ...(hoursSpec.length > 0 ? { openingHoursSpecification: hoursSpec } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(priceRange ? { priceRange } : {}),
  }
}

/**
 * Organization — for agencies / B2B / sites without a primary storefront.
 * Use this OR localBusinessSchema(), not both for a single-location business.
 *
 * If switching, change SITE.schemaType to "Organization" and call this instead.
 */
export function organizationSchema() {
  const { name, url, tagline, contact, social, defaultOgImage } = SITE

  const sameAs = Object.values(social).filter((v): v is string => typeof v === "string" && v.length > 0)

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}/#organization`,
    name,
    description: tagline,
    url,
    logo: `${url}/logo.png`,
    image: `${url}${defaultOgImage}`,
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(contact.address.streetAddress
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: contact.address.streetAddress,
            addressLocality: contact.address.addressLocality,
            addressRegion: contact.address.addressRegion,
            postalCode: contact.address.postalCode,
            addressCountry: contact.address.addressCountry,
          },
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }
}

/**
 * Service — for a service-detail page (e.g., /services/teeth-whitening).
 * Cross-references the sitewide LocalBusiness/Organization via @id.
 */
export function serviceSchema(params: {
  path: string // "/services/teeth-whitening"
  name: string
  description: string
  serviceType?: string // e.g., "Cosmetic Dentistry"
  areaServed?: string // e.g., "Burlington, VT"
  price?: string // omit if not published
  priceCurrency?: string // e.g., "USD"
}) {
  const { url, schemaType } = SITE
  const parentIdSuffix = schemaType === "Organization" ? "#organization" : "#business"

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}${params.path}#service`,
    name: params.name,
    description: params.description,
    ...(params.serviceType ? { serviceType: params.serviceType } : {}),
    provider: { "@id": `${url}/${parentIdSuffix}` },
    ...(params.areaServed
      ? { areaServed: { "@type": "City", name: params.areaServed } }
      : {}),
    ...(params.price && params.priceCurrency
      ? {
          offers: {
            "@type": "Offer",
            price: params.price,
            priceCurrency: params.priceCurrency,
          },
        }
      : {}),
  }
}

/**
 * BreadcrumbList — for pages 2+ levels deep.
 * Pass items in order; the LAST item omits `url` (current page).
 */
export function breadcrumbSchema(items: Array<{ name: string; url?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: `${SITE.url}${item.url.startsWith("/") ? "" : "/"}${item.url}` } : {}),
    })),
  }
}

/**
 * FAQPage — for pages with a visible FAQ section.
 * Every question/answer pair MUST be visible on the page (Google's rule).
 */
export function faqSchema(qa: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

/**
 * BlogPosting / Article — for blog post pages.
 */
export function articleSchema(params: {
  path: string
  headline: string
  description: string
  image: string // absolute URL
  datePublished: string // ISO 8601
  dateModified?: string
  authorName: string
}) {
  const { url, schemaType } = SITE
  const publisherIdSuffix = schemaType === "Organization" ? "#organization" : "#business"

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}${params.path}#article`,
    headline: params.headline,
    description: params.description,
    image: params.image,
    datePublished: params.datePublished,
    ...(params.dateModified ? { dateModified: params.dateModified } : {}),
    author: { "@type": "Person", name: params.authorName },
    publisher: { "@id": `${url}/${publisherIdSuffix}` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${url}${params.path}`,
    },
  }
}
