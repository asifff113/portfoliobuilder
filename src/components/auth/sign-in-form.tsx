"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { toast } from "sonner";

export function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = getSupabaseBrowserClient();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // More helpful error messages
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password. Please check and try again.");
        } else if (error.message.includes("Email not confirmed")) {
          toast.error("Please confirm your email before signing in.");
        } else {
          toast.error(error.message);
        }
        return;
      }

      toast.success("Welcome back!");
      router.push("/app/dashboard");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = getSupabaseBrowserClient();
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setResetEmailSent(true);
      toast.success("Password reset email sent! Check your inbox.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // Forgot Password View
  if (showForgotPassword) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => {
            setShowForgotPassword(false);
            setResetEmailSent(false);
          }}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </button>

        {resetEmailSent ? (
          <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-center">
            <h3 className="font-medium text-green-400">Check your email!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;ve sent a password reset link to <strong>{email}</strong>
            </p>
          </div>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Reset your password</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter your email and we&apos;ll send you a reset link
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-neon-purple to-neon-pink text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        )}
      </div>
    );
  }

  // Sign In View
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signin-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="signin-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="signin-password">Password</Label>
          <button
            type="button"
            className="text-sm text-primary hover:underline"
            onClick={() => setShowForgotPassword(true)}
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="signin-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="glow-sm w-full bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan text-white hover:opacity-90"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}
