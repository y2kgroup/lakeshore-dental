import { ContactForm } from "@/components/forms/contact-form"
import { siteMetadata } from "@/lib/site"
import type { Metadata } from "next"

export const metadata: Metadata = siteMetadata({
  path: "/contact",
  title: "Contact",
  description: "Visit us at 245 Lake Street in Burlington, VT — or send a message and we'll get back the same day.",
})

export default function ContactPage() {
  return (
    <main>
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="mb-12 space-y-4 text-center">
              <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
                Get in touch
              </h1>
              <p className="text-lg text-muted-foreground">
                Have a question or ready to book? Send us a message and we&apos;ll get
                back to you within 1-2 business days.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 sm:p-8 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
