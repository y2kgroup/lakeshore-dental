import type { MetadataRoute } from "next"
import { SITE } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === "production"

  if (!isProd) {
    // Noindex in dev/preview — block all crawlers
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    }
  }

  // Production — allow everything except admin/api, point to sitemap
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  }
}
