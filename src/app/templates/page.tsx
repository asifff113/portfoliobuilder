import Link from "next/link";
import {
  FileText,
  Briefcase,
  Sparkles,
  Star,
  Lock,
  ArrowRight,
  ArrowLeft,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// CV Templates
const cvTemplates = [
  {
    id: "neon-minimal",
    name: "Neon Minimal",
    description: "Clean, modern design with subtle neon accents",
    category: "Professional",
    isPro: false,
    isPopular: true,
    downloads: 12500,
    previewColors: ["#a855f7", "#06b6d4", "#ffffff"],
  },
  {
    id: "card-grid",
    name: "Card Grid",
    description: "Glassmorphism cards with gradient backgrounds",
    category: "Creative",
    isPro: false,
    isPopular: true,
    downloads: 8200,
    previewColors: ["#ec4899", "#8b5cf6", "#0f172a"],
  },
  {
    id: "executive",
    name: "Executive",
    description: "Traditional layout for senior positions",
    category: "Professional",
    isPro: true,
    isPopular: false,
    downloads: 5600,
    previewColors: ["#1e3a5f", "#0ea5e9", "#f8fafc"],
  },
  {
    id: "developer",
    name: "Developer",
    description: "Code-inspired design for tech professionals",
    category: "Tech",
    isPro: true,
    isPopular: false,
    downloads: 4100,
    previewColors: ["#22c55e", "#0f172a", "#e2e8f0"],
  },
  {
    id: "creative-bold",
    name: "Creative Bold",
    description: "Eye-catching design for creative roles",
    category: "Creative",
    isPro: true,
    isPopular: false,
    downloads: 3800,
    previewColors: ["#f97316", "#fbbf24", "#1c1917"],
  },
  {
    id: "academic",
    name: "Academic",
    description: "Structured format for research & education",
    category: "Academic",
    isPro: false,
    isPopular: false,
    downloads: 2900,
    previewColors: ["#6366f1", "#a5b4fc", "#ffffff"],
  },
];

// Portfolio Templates
const portfolioTemplates = [
  {
    id: "hero-timeline",
    name: "Hero Timeline",
    description: "Full-page hero with animated background",
    category: "Developer",
    isPro: false,
    isPopular: true,
    downloads: 9800,
    previewColors: ["#06b6d4", "#a855f7", "#0a0a0f"],
  },
  {
    id: "project-grid",
    name: "Project Grid",
    description: "Card-based project showcase with sidebar",
    category: "Designer",
    isPro: false,
    isPopular: true,
    downloads: 7500,
    previewColors: ["#ec4899", "#06b6d4", "#111827"],
  },
  {
    id: "minimal-folio",
    name: "Minimal Folio",
    description: "Clean whitespace-focused portfolio",
    category: "Photographer",
    isPro: true,
    isPopular: false,
    downloads: 4200,
    previewColors: ["#0a0a0a", "#fafafa", "#a1a1aa"],
  },
  {
    id: "agency",
    name: "Agency Style",
    description: "Professional agency-inspired layout",
    category: "Agency",
    isPro: true,
    isPopular: false,
    downloads: 3100,
    previewColors: ["#f43f5e", "#fb7185", "#1f2937"],
  },
];

interface TemplateCardProps {
  template: (typeof cvTemplates)[0];
}

function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card className="group relative overflow-hidden border-white/10 bg-white/5 transition-all hover:border-cyan-400/30">
      {/* Preview */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Gradient Preview */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${template.previewColors[0]} 0%, ${template.previewColors[1]} 50%, ${template.previewColors[2]} 100%)`,
          }}
        />

        {/* Template Preview Overlay */}
        <div className="absolute inset-4 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm">
          <div className="flex h-full flex-col p-4">
            <div className="mb-4 space-y-2">
              <div className="h-4 w-3/4 rounded bg-white/30" />
              <div className="h-3 w-1/2 rounded bg-white/20" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="h-2 w-full rounded bg-white/15" />
              <div className="h-2 w-5/6 rounded bg-white/15" />
              <div className="h-2 w-4/5 rounded bg-white/15" />
              <div className="mt-4 h-2 w-full rounded bg-white/15" />
              <div className="h-2 w-3/4 rounded bg-white/15" />
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          {template.isPro && (
            <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-0.5 text-xs font-medium text-white">
              <Lock className="h-3 w-3" />
              Pro
            </span>
          )}
          {template.isPopular && (
            <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-2 py-0.5 text-xs font-medium text-white">
              <Star className="h-3 w-3" />
              Popular
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
          <Link href="/auth">
            <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-purple-500">
              Use Template
            </Button>
          </Link>
        </div>
      </div>

      {/* Info */}
      <CardContent className="p-4">
        <h3 className="font-semibold text-white">{template.name}</h3>
        <p className="mt-1 text-sm text-white/50">{template.description}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
            {template.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-white/40">
            <Download className="h-3 w-3" />
            {template.downloads.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PublicTemplatesPage() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Background */}
      <div className="fixed inset-0 bg-mesh" />
      <div className="bg-grid fixed inset-0 opacity-30" />
      <div className="animate-float pointer-events-none fixed left-1/4 top-1/4 h-96 w-96 rounded-full bg-neon-purple/20 blur-3xl" />
      <div
        className="animate-float pointer-events-none fixed right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-neon-cyan/20 blur-3xl"
        style={{ animationDelay: "-2s" }}
      />

      {/* Navigation */}
      <nav className="glass-strong sticky top-0 z-50 border-b border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="glow-sm flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-purple via-neon-pink to-neon-cyan">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-gradient text-xl font-bold tracking-tight">NeonCV</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="glow-sm bg-gradient-to-r from-neon-purple to-neon-pink text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="relative mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Beautiful Templates
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/60">
            Choose from our collection of professionally designed CV and portfolio templates.
            Stand out from the crowd with stunning, modern designs.
          </p>
        </div>

        {/* Pro Badge */}
        <div className="mb-12 flex justify-center">
          <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-semibold text-white">Unlock All Pro Templates</p>
                <p className="text-sm text-white/50">Get access to 20+ premium templates with Pro</p>
              </div>
              <Link href="/auth">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500">
                  Upgrade to Pro
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* CV Templates */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-pink/20">
              <FileText className="h-5 w-5 text-neon-purple" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">CV Templates</h2>
              <p className="text-sm text-white/50">{cvTemplates.length} templates available</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cvTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>

        {/* Portfolio Templates */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20">
              <Briefcase className="h-5 w-5 text-neon-cyan" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Portfolio Templates</h2>
              <p className="text-sm text-white/50">{portfolioTemplates.length} templates available</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="border-white/10 bg-gradient-to-r from-neon-purple/10 via-neon-pink/10 to-neon-cyan/10 p-12">
            <h2 className="mb-4 text-3xl font-bold text-white">
              Ready to create your perfect CV?
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-white/60">
              Sign up now and start building your professional CV or portfolio in minutes.
            </p>
            <Link href="/auth">
              <Button size="lg" className="glow-sm bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan text-white">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-white/40">
            © 2025 NeonCV. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

