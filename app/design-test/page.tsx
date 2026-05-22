import { Button } from "@/components/ui/button";

export default function DesignTestPage() {
  return (
    <div className="min-h-screen bg-background p-12">
      <div className="mx-auto max-w-4xl space-y-16">
        {/* Hero headline test */}
        <section className="space-y-6">
          <h1 className="font-display text-6xl font-normal text-foreground leading-none">
            Gentle care for<br />your family's smiles
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Calming, premium dental care in a warm independent practice setting.
            Modern but never clinical.
          </p>
        </section>

        {/* Button variants test */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Button Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button size="lg">Primary Action</Button>
            <Button size="lg" variant="secondary">Secondary</Button>
            <Button size="lg" variant="outline">Outline</Button>
            <Button size="lg" variant="ghost">Ghost</Button>
            <Button size="lg" variant="destructive">Destructive</Button>
          </div>
        </section>

        {/* Typography scale test */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Typography Scale</h2>
          <div className="space-y-4">
            <div className="font-display text-4xl">Display 4xl — Fraunces</div>
            <div className="font-display text-3xl">Display 3xl — Fraunces</div>
            <div className="font-display text-2xl">Display 2xl — Fraunces</div>
            <div className="font-display text-xl">Display xl — Fraunces</div>
            <div className="font-body text-lg">Body large — Inter 500</div>
            <div className="font-body text-base">Body base — Inter 400</div>
            <div className="font-body text-sm text-muted-foreground">
              Muted text — Inter 400
            </div>
          </div>
        </section>

        {/* Color tokens test */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Color Tokens</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-primary shadow-md"></div>
              <p className="text-sm font-medium">Primary (sage)</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-secondary shadow-md"></div>
              <p className="text-sm font-medium">Secondary (terracotta)</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-muted shadow-md"></div>
              <p className="text-sm font-medium">Muted (soft cream)</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-accent shadow-md"></div>
              <p className="text-sm font-medium">Accent (terracotta)</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
