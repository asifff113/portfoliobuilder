"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  User,
  Briefcase,
  MapPin,
  FileText,
  Palette,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ACCENT_COLORS = [
  { name: "Neon Purple", value: "#8B5CF6" },
  { name: "Cyber Cyan", value: "#06B6D4" },
  { name: "Hot Pink", value: "#EC4899" },
  { name: "Ocean Blue", value: "#3B82F6" },
  { name: "Emerald", value: "#10B981" },
  { name: "Sunset Orange", value: "#F97316" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Form state
  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [accentColor, setAccentColor] = useState(ACCENT_COLORS[0].value);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Check if user is authenticated
  useEffect(() => {
    async function checkAuth() {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth");
        return;
      }

      // Pre-fill name from auth metadata
      if (user.user_metadata?.full_name) {
        setFullName(user.user_metadata.full_name);
      }

      setIsCheckingAuth(false);
    }

    checkAuth();
  }, [router]);

  async function handleComplete() {
    setIsLoading(true);

    try {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please sign in first");
        router.push("/auth");
        return;
      }

      // Update profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          headline,
          location,
          bio,
        } as never)
        .eq("user_id", user.id);

      if (profileError) {
        console.error("Profile error:", profileError);
        toast.error("Failed to save profile");
        return;
      }

      // Create user theme
      const { error: themeError } = await supabase.from("themes").insert({
        user_id: user.id,
        name: "My Theme",
        is_system: false,
        primary_color: accentColor,
        secondary_color: "#06B6D4",
        accent_color: "#EC4899",
        background_style: "mesh",
        background_color: isDarkMode ? "#0f0d15" : "#FAFAFA",
        heading_font: "Space Grotesk",
        body_font: "Inter",
        border_radius: "lg",
        shadow_intensity: "md",
      } as never);

      if (themeError) {
        console.error("Theme error:", themeError);
        // Don't block on theme error
      }

      toast.success("Welcome to NeonCV! 🎉");
      router.push("/app/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Onboarding error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-mesh" />
      <div className="bg-grid fixed inset-0 opacity-20" />

      {/* Floating Orbs */}
      <div
        className="animate-float pointer-events-none fixed left-1/4 top-1/4 h-72 w-72 rounded-full blur-3xl"
        style={{ backgroundColor: `${accentColor}30` }}
      />
      <div
        className="animate-float pointer-events-none fixed right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-neon-cyan/20 blur-3xl"
        style={{ animationDelay: "-3s" }}
      />

      <div className="glass-strong relative z-10 w-full max-w-lg rounded-2xl p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-neon-purple via-neon-pink to-neon-cyan">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-gradient text-2xl font-bold">Welcome to NeonCV</h1>
          <p className="mt-2 text-muted-foreground">
            Let&apos;s set up your profile in just a few steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-2 w-12 rounded-full transition-all",
                s <= step
                  ? "bg-linear-to-r from-neon-purple to-neon-pink"
                  : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="headline" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Professional Headline
              </Label>
              <Input
                id="headline"
                placeholder="Full Stack Developer | UI/UX Enthusiast"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                id="location"
                placeholder="San Francisco, CA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <Button
              onClick={() => setStep(2)}
              className="glow-sm mt-6 w-full bg-linear-to-r from-neon-purple via-neon-pink to-neon-cyan text-white hover:opacity-90"
              disabled={!fullName || !headline}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Bio */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bio" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Short Bio
              </Label>
              <textarea
                id="bio"
                rows={4}
                placeholder="Tell us a bit about yourself, your experience, and what you're passionate about..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="glow-sm flex-1 bg-linear-to-r from-neon-purple via-neon-pink to-neon-cyan text-white hover:opacity-90"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Theme */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Choose Your Accent Color
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setAccentColor(color.value)}
                    className={cn(
                      "flex h-16 items-center justify-center rounded-xl border-2 transition-all",
                      accentColor === color.value
                        ? "border-white scale-105"
                        : "border-transparent hover:border-white/30"
                    )}
                    style={{ backgroundColor: color.value }}
                  >
                    {accentColor === color.value && (
                      <div className="h-3 w-3 rounded-full bg-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Theme Preference</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsDarkMode(true)}
                  className={cn(
                    "flex h-20 flex-col items-center justify-center gap-2 rounded-xl border-2 transition-all",
                    isDarkMode
                      ? "border-white bg-zinc-900"
                      : "border-transparent bg-zinc-800 hover:border-white/30"
                  )}
                >
                  <div className="h-4 w-8 rounded bg-zinc-700" />
                  <span className="text-sm text-zinc-300">Dark</span>
                </button>
                <button
                  onClick={() => setIsDarkMode(false)}
                  className={cn(
                    "flex h-20 flex-col items-center justify-center gap-2 rounded-xl border-2 transition-all",
                    !isDarkMode
                      ? "border-primary bg-zinc-100"
                      : "border-transparent bg-zinc-200 hover:border-zinc-400"
                  )}
                >
                  <div className="h-4 w-8 rounded bg-zinc-300" />
                  <span className="text-sm text-zinc-700">Light</span>
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleComplete}
                disabled={isLoading}
                className="glow-sm flex-1 bg-linear-to-r from-neon-purple via-neon-pink to-neon-cyan text-white hover:opacity-90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  <>
                    Get Started
                    <Sparkles className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

