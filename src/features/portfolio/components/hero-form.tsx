"use client";

import { Card } from "@/components/ui/card";
import { usePortfolioStore } from "../store";
import type { PortfolioProfile } from "@/types/portfolio";

interface HeroFormProps {
  profile?: PortfolioProfile | null;
}

export function HeroForm({ profile }: HeroFormProps) {
  const hero = usePortfolioStore((s) => s.hero);
  const updateHero = usePortfolioStore((s) => s.updateHero);

  return (
    <Card className="border-white/10 bg-white/5 p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">Hero Section</h3>

      <div className="space-y-4">
        {/* Headline */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white/70">
            Headline
          </label>
          <input
            type="text"
            value={hero.headline}
            onChange={(e) => updateHero({ headline: e.target.value })}
            placeholder={profile?.headline || "Full-Stack Developer & Designer"}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-lg text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
          />
          <p className="mt-1 text-xs text-white/40">
            Your main title or professional identity
          </p>
        </div>

        {/* Summary */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white/70">
            Summary
          </label>
          <textarea
            value={hero.summary}
            onChange={(e) => updateHero({ summary: e.target.value })}
            placeholder={profile?.bio || "A brief introduction about yourself and what you do..."}
            rows={4}
            className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
          />
          <p className="mt-1 text-xs text-white/40">
            A short paragraph about who you are
          </p>
        </div>

        {/* Hero Image URL */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white/70">
            Hero Image URL
          </label>
          <input
            type="url"
            value={hero.imageUrl || ""}
            onChange={(e) => updateHero({ imageUrl: e.target.value || null })}
            placeholder="https://example.com/your-photo.jpg"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
          />
          <p className="mt-1 text-xs text-white/40">
            Optional: A profile photo or hero image
          </p>
        </div>

        {/* CTA Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              CTA Button Text
            </label>
            <input
              type="text"
              value={hero.ctaText}
              onChange={(e) => updateHero({ ctaText: e.target.value })}
              placeholder="Get in Touch"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              CTA Button URL
            </label>
            <input
              type="url"
              value={hero.ctaUrl}
              onChange={(e) => updateHero({ ctaUrl: e.target.value })}
              placeholder="mailto:you@example.com"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Preview hint */}
      {profile && (
        <div className="mt-6 rounded-lg border border-white/5 bg-white/5 p-4">
          <p className="text-xs text-white/50">
            <span className="font-medium text-cyan-400">Tip:</span> Your profile
            info ({profile.fullName}, {profile.email}) will be used as defaults.
            Customize the fields above to override them.
          </p>
        </div>
      )}
    </Card>
  );
}

