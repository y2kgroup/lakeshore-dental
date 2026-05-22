import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { rootMetadata } from "@/lib/site";
import { JsonLd, localBusinessSchema } from "@/components/seo/json-ld";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  ...rootMetadata(),
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <JsonLd data={localBusinessSchema()} />
        <Analytics />
        <SpeedInsights />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
