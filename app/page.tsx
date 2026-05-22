import { HeroSection } from "@/components/hero-section"
import { rootMetadata } from "@/lib/site"
import type { Metadata } from "next"

export const metadata: Metadata = rootMetadata()

export default function Home() {
  return <HeroSection />
}
