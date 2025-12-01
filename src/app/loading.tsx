import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-neon-purple/20 blur-3xl" />
        <div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-neon-cyan/20 blur-3xl"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Loader */}
      <div className="text-center">
        <div className="relative mx-auto mb-6 h-16 w-16">
          {/* Spinning ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-neon-purple" />
          <div
            className="absolute inset-1 animate-spin rounded-full border-4 border-transparent border-t-neon-cyan"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-neon-pink" />
          </div>
        </div>

        <p className="text-lg font-medium text-white/80">Loading...</p>
        <p className="mt-1 text-sm text-white/40">Please wait a moment</p>
      </div>
    </div>
  );
}

