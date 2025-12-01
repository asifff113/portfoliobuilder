"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "@/components/auth/sign-in-form";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { Separator } from "@/components/ui/separator";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-mesh" />
      <div className="bg-grid fixed inset-0 opacity-20" />

      {/* Floating Orbs */}
      <div className="animate-float pointer-events-none fixed left-1/4 top-1/3 h-72 w-72 rounded-full bg-neon-purple/20 blur-3xl" />
      <div
        className="animate-float pointer-events-none fixed right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-neon-cyan/20 blur-3xl"
        style={{ animationDelay: "-3s" }}
      />

      {/* Auth Card */}
      <div className="glass-strong relative z-10 w-full max-w-md rounded-2xl p-8">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="glow-sm flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-purple via-neon-pink to-neon-cyan">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="text-gradient text-2xl font-bold tracking-tight">NeonCV</span>
        </Link>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "signin" | "signup")}
          className="w-full"
        >
          <TabsList className="mb-6 grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger
              value="signin"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple/20 data-[state=active]:to-neon-pink/20"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-pink/20 data-[state=active]:to-neon-cyan/20"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="mt-0">
            <SignInForm />
          </TabsContent>

          <TabsContent value="signup" className="mt-0">
            <SignUpForm />
          </TabsContent>
        </Tabs>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-sm text-muted-foreground">or continue with</span>
          <Separator className="flex-1" />
        </div>

        {/* OAuth Buttons */}
        <OAuthButtons />

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

