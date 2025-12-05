"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Briefcase,
  Sparkles,
  Star,
  Lock,
  ArrowRight,
  Eye,
  Download,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  type: "cv" | "portfolio";
}

function TemplateCard({ template, type }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group relative overflow-hidden border-white/10 bg-white/5 transition-all hover:border-cyan-400/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
            {/* Header placeholder */}
            <div className="mb-4 space-y-2">
              <div className="h-4 w-3/4 rounded bg-white/30" />
              <div className="h-3 w-1/2 rounded bg-white/20" />
            </div>
            {/* Content placeholders */}
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
            <span className="flex items-center gap-1 rounded-full bg-linear-to-r from-amber-500 to-orange-500 px-2 py-0.5 text-xs font-medium text-white">
              <Lock className="h-3 w-3" />
              Pro
            </span>
          )}
          {template.isPopular && (
            <span className="flex items-center gap-1 rounded-full bg-linear-to-r from-cyan-500 to-purple-500 px-2 py-0.5 text-xs font-medium text-white">
              <Star className="h-3 w-3" />
              Popular
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex gap-3">
            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/20">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Link href={type === "cv" ? "/app/cv/new" : "/app/portfolio/new"}>
              <Button size="sm" className="bg-linear-to-r from-cyan-500 to-purple-500">
                Use Template
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Info */}
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-white">{template.name}</h3>
            <p className="mt-1 text-sm text-white/50">{template.description}</p>
          </div>
        </div>

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

export default function TemplatesPage() {
  const [activeTab, setActiveTab] = useState("cv");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Templates
            </span>
          </h1>
          <p className="mt-2 text-white/60">
            Choose from our collection of professionally designed templates
          </p>
        </div>

        {/* Pro Badge */}
        <Card className="border-amber-500/30 bg-linear-to-r from-amber-500/10 to-orange-500/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-amber-500 to-orange-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-white">Unlock Pro Templates</p>
              <p className="text-sm text-white/50">Get access to all 20+ premium templates</p>
            </div>
            <Button size="sm" className="ml-4 bg-linear-to-r from-amber-500 to-orange-500">
              Upgrade
            </Button>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white/5">
          <TabsTrigger
            value="cv"
            className="data-[state=active]:bg-linear-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <FileText className="mr-2 h-4 w-4" />
            CV Templates ({cvTemplates.length})
          </TabsTrigger>
          <TabsTrigger
            value="portfolio"
            className="data-[state=active]:bg-linear-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Portfolio Templates ({portfolioTemplates.length})
          </TabsTrigger>
        </TabsList>

        {/* CV Templates */}
        <TabsContent value="cv" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cvTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} type="cv" />
            ))}
          </div>
        </TabsContent>

        {/* Portfolio Templates */}
        <TabsContent value="portfolio" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} type="portfolio" />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Features Section */}
      <div className="mt-12 rounded-2xl border border-white/10 bg-linear-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 p-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Why Choose Our Templates?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Check,
              title: "ATS-Friendly",
              description: "Optimized for applicant tracking systems",
            },
            {
              icon: Sparkles,
              title: "Modern Design",
              description: "Stunning visuals that stand out",
            },
            {
              icon: FileText,
              title: "Easy to Edit",
              description: "Simple drag-and-drop customization",
            },
            {
              icon: Download,
              title: "Multi-Format",
              description: "Export to PDF, PNG, and more",
            },
          ].map((feature, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-cyan-500/20 to-purple-500/20">
                <feature.icon className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="font-semibold text-white">{feature.title}</h3>
              <p className="mt-1 text-sm text-white/50">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="mb-4 text-white/60">
          Can&apos;t find what you&apos;re looking for?
        </p>
        <Button variant="outline" className="border-white/20 hover:border-cyan-400">
          Request a Template
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

