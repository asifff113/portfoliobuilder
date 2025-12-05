"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-neon-purple/20 blur-3xl" />
        <div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-neon-cyan/20 blur-3xl"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Content */}
      <div className="text-center">
        {/* 404 Number */}
        <h1 className="mb-4 text-[12rem] font-black leading-none tracking-tighter">
          <span className="bg-linear-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent">
            404
          </span>
        </h1>

        {/* Message */}
        <h2 className="mb-2 text-2xl font-bold text-white">Page Not Found</h2>
        <p className="mb-8 max-w-md text-white/60">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <Link href="/">
            <Button className="glow-sm bg-linear-to-r from-neon-purple to-neon-pink text-white">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            className="border-white/20"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
