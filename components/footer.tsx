import Link from "next/link"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-3">
          <div className="space-y-4">
            <div className="font-display text-xl font-semibold text-primary">
              Lakeshore Dental
            </div>
            <p className="text-sm text-muted-foreground">
              Gentle care for your whole family
            </p>
          </div>

          <nav className="space-y-4" aria-label="Footer navigation">
            <div className="font-medium text-foreground">Quick Links</div>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4">
            <div className="font-medium text-foreground">Hours</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Mon–Fri: 8am–6pm</li>
              <li>Saturday: 9am–2pm</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lakeshore Dental. All rights reserved.
          </p>
          <nav className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
