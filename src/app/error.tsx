"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-red-500/10 blur-3xl" />
        <div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-orange-500/10 blur-3xl"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Content */}
      <div className="text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-red-500/20 to-orange-500/20">
          <AlertTriangle className="h-10 w-10 text-red-400" />
        </div>

        {/* Message */}
        <h1 className="mb-2 text-3xl font-bold text-white">Something went wrong!</h1>
        <p className="mb-8 max-w-md text-white/60">
          We encountered an unexpected error. Don&apos;t worry, our team has been notified.
        </p>

        {/* Error details (only in development) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-8 rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-left">
            <p className="font-mono text-sm text-red-400">{error.message}</p>
            {error.digest && (
              <p className="mt-2 font-mono text-xs text-white/40">Digest: {error.digest}</p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={reset}
            className="bg-linear-to-r from-red-500 to-orange-500 text-white"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="border-white/20">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

