import Link from "next/link";
import {
  Sparkles,
  FileText,
  Download,
  Palette,
  Zap,
  Shield,
  ArrowRight,
  Github,
  Twitter,
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-mesh" />
      <div className="bg-grid fixed inset-0 opacity-30" />

      {/* Floating Orbs */}
      <div className="animate-float pointer-events-none fixed left-1/4 top-1/4 h-96 w-96 rounded-full bg-neon-purple/20 blur-3xl" />
      <div
        className="animate-float pointer-events-none fixed right-1/4 top-1/2 h-80 w-80 rounded-full bg-neon-cyan/20 blur-3xl"
        style={{ animationDelay: "-2s" }}
      />
      <div
        className="animate-float pointer-events-none fixed bottom-1/4 left-1/3 h-72 w-72 rounded-full bg-neon-pink/15 blur-3xl"
        style={{ animationDelay: "-4s" }}
      />

      {/* Navigation */}
      <nav className="glass-strong fixed left-0 right-0 top-0 z-50 border-b border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="glow-sm flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-purple via-neon-pink to-neon-cyan">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-gradient text-xl font-bold tracking-tight">NeonCV</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="/templates"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Templates
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auth"
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign In
            </Link>
            <Link
              href="/auth"
              className="glow-sm rounded-lg bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan px-5 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:opacity-90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
        {/* Badge */}
        <div className="glass animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-neon-green" />
          <span className="text-sm text-muted-foreground">Now with AI-powered suggestions</span>
        </div>

        {/* Main Heading */}
        <h1 className="animate-fade-in mb-6 max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Build{" "}
          <span className="text-gradient relative">
            stunning CVs
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 10C50 2 150 2 298 10"
                stroke="url(#underline-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="underline-gradient"
                  x1="0"
                  y1="0"
                  x2="300"
                  y2="0"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="oklch(0.72 0.28 290)" />
                  <stop offset="0.5" stopColor="oklch(0.78 0.25 340)" />
                  <stop offset="1" stopColor="oklch(0.8 0.2 195)" />
                </linearGradient>
              </defs>
            </svg>
          </span>{" "}
          <br />
          in minutes
        </h1>

        <p className="animate-fade-in mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Create professional CVs and portfolios with our futuristic builder. Export to PDF, DOCX,
          and more. Stand out with vibrant, modern designs.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/app/cv/new"
            className="animate-pulse-glow group flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105"
          >
            Start Building
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/templates"
            className="glass flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-medium transition-all hover:bg-white/10"
          >
            <Palette className="h-5 w-5 text-neon-cyan" />
            View Templates
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 md:gap-16">
          {[
            { value: "50+", label: "Templates" },
            { value: "100K+", label: "CVs Created" },
            { value: "4.9★", label: "User Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-gradient text-3xl font-bold md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Everything you need to{" "}
              <span className="text-gradient">stand out</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Powerful features designed to help you create professional, eye-catching CVs and
              portfolios in minutes.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: FileText,
                title: "Multiple Templates",
                description:
                  "Choose from 50+ professionally designed templates. From minimal to creative, find your perfect style.",
                color: "neon-purple",
              },
              {
                icon: Download,
                title: "Export Anywhere",
                description:
                  "Download your CV in PDF, DOCX, or JSON formats. Perfect for any application or platform.",
                color: "neon-cyan",
              },
              {
                icon: Palette,
                title: "Custom Themes",
                description:
                  "Personalize colors, fonts, and layouts. Create a unique look that represents you.",
                color: "neon-pink",
              },
              {
                icon: Zap,
                title: "AI-Powered",
                description:
                  "Get intelligent suggestions for your content. Improve your descriptions with AI assistance.",
                color: "neon-orange",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description:
                  "Your data is encrypted and secure. Control who sees your portfolio with privacy settings.",
                color: "neon-green",
              },
              {
                icon: Sparkles,
                title: "Real-time Preview",
                description:
                  "See changes instantly as you type. What you see is exactly what you&apos;ll get.",
                color: "neon-blue",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="glass group rounded-2xl p-6 transition-all hover:bg-white/5"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-${feature.color}/20`}
                >
                  <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-32">
        <div className="border-gradient mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-neon-purple/10 via-neon-pink/5 to-neon-cyan/10 p-12 text-center backdrop-blur-xl md:p-16">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Ready to create your <span className="text-gradient">perfect CV</span>?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of professionals who&apos;ve landed their dream jobs with NeonCV.
          </p>
          <Link
            href="/app/cv/new"
            className="glow-md inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan px-10 py-4 text-lg font-semibold text-white transition-all hover:scale-105"
          >
            Get Started Free
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-purple via-neon-pink to-neon-cyan">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">NeonCV</span>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NeonCV. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
