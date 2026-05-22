import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { ImagePlaceholder } from "@/components/image-placeholder"
import { cn } from "@/lib/utils"

export function HeroSection() {
  return (
    <section className="py-16 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.1]">
              Gentle care for your family&apos;s smiles
            </h1>
            <p className="text-lg sm:text-xl text-primary italic font-light leading-relaxed max-w-xl">
              Family dentistry that doesn&apos;t feel like a clinic. Calm, reassuring, and modern — for everyone from kids to grandparents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className={cn(buttonVariants(), "text-base px-6 py-6")}>
                Book Appointment
              </Link>
              <Link
                href="/services"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "text-base px-6 py-6"
                )}
              >
                Our Services
              </Link>
            </div>
          </div>
          <div>
            <ImagePlaceholder
              aspectRatio="4/3"
              description="Hero image: family in a calm clinic waiting room, warm lighting"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
