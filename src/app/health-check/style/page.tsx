import { ThemeToggle } from "@/components/health-check/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function StylePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            get<span className="font-mono">stay</span>
          </h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
              Theme Configuration
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Modern minimal design with Poppins and Space Mono fonts
            </p>
          </section>

          {/* Color Palette */}
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold">Color Palette</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="overflow-hidden">
                <div className="h-24 bg-[#010105]" />
                <CardContent className="pt-4">
                  <p className="text-sm font-mono">#010105</p>
                  <p className="text-xs text-muted-foreground">Deep Black</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <div className="h-24 bg-[#3932D8]" />
                <CardContent className="pt-4">
                  <p className="text-sm font-mono">#3932D8</p>
                  <p className="text-xs text-muted-foreground">Royal Blue</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <div className="h-24 bg-[#B7B4F0]" />
                <CardContent className="pt-4">
                  <p className="text-sm font-mono">#B7B4F0</p>
                  <p className="text-xs text-muted-foreground">Lavender</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <div className="h-24 bg-[#E7E7E5]" />
                <CardContent className="pt-4">
                  <p className="text-sm font-mono">#E7E7E5</p>
                  <p className="text-xs text-muted-foreground">Light Gray</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <div className="h-24 bg-[#FFFFFD]" />
                <CardContent className="pt-4">
                  <p className="text-sm font-mono">#FFFFFD</p>
                  <p className="text-xs text-muted-foreground">Off White</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Typography */}
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold">Typography</h2>
            
            {/* Poppins Font Demo */}
            <Card>
              <CardHeader>
                <CardTitle>Poppins - Primary Font</CardTitle>
                <CardDescription>Available weights: 300, 400, 500, 600, 700</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Light (300)</p>
                    <p className="text-2xl font-light">The quick brown fox jumps over the lazy dog</p>
                    <p className="text-sm font-light text-muted-foreground">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Regular (400)</p>
                    <p className="text-2xl font-normal">The quick brown fox jumps over the lazy dog</p>
                    <p className="text-sm font-normal text-muted-foreground">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Medium (500)</p>
                    <p className="text-2xl font-medium">The quick brown fox jumps over the lazy dog</p>
                    <p className="text-sm font-medium text-muted-foreground">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Semibold (600)</p>
                    <p className="text-2xl font-semibold">The quick brown fox jumps over the lazy dog</p>
                    <p className="text-sm font-semibold text-muted-foreground">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Bold (700)</p>
                    <p className="text-2xl font-bold">The quick brown fox jumps over the lazy dog</p>
                    <p className="text-sm font-bold text-muted-foreground">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Space Mono Font Demo */}
            <Card>
              <CardHeader>
                <CardTitle className="font-mono">Space Mono - Accent Font</CardTitle>
                <CardDescription>Available weights: 400, 700</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Regular (400)</p>
                    <p className="text-2xl font-mono font-normal">The quick brown fox jumps over the lazy dog</p>
                    <p className="text-sm font-mono font-normal text-muted-foreground">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Bold (700)</p>
                    <p className="text-2xl font-mono font-bold">The quick brown fox jumps over the lazy dog</p>
                    <p className="text-sm font-mono font-bold text-muted-foreground">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-2">Code Examples</p>
                    <div className="space-y-2">
                      <code className="block text-sm font-mono bg-muted px-3 py-2 rounded">const theme = "modern";</code>
                      <code className="block text-sm font-mono bg-muted px-3 py-2 rounded">function getStay() &#123; return "hostel"; &#125;</code>
                      <code className="block text-sm font-mono bg-muted px-3 py-2 rounded">npm install @shadcn/ui</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Heading Hierarchy */}
            <Card>
              <CardHeader>
                <CardTitle>Heading Hierarchy</CardTitle>
                <CardDescription>Responsive heading sizes with proper scaling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">H1</p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">Heading Level 1</h1>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">H2</p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">Heading Level 2</h2>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">H3</p>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">Heading Level 3</h3>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">H4</p>
                  <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold">Heading Level 4</h4>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">H5</p>
                  <h5 className="text-lg md:text-xl lg:text-2xl font-semibold">Heading Level 5</h5>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">H6</p>
                  <h6 className="text-base md:text-lg lg:text-xl font-semibold">Heading Level 6</h6>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Components */}
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold">Components</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full">Primary Button</Button>
                  <Button variant="secondary" className="w-full">Secondary Button</Button>
                  <Button variant="outline" className="w-full">Outline Button</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Cards</CardTitle>
                  <CardDescription>Clean and minimal card design</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Cards use subtle borders and backgrounds to create depth without overwhelming the design.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>GetStay 1.0 - Modern Minimal Theme</p>
        </div>
      </footer>
    </div>
  );
}
