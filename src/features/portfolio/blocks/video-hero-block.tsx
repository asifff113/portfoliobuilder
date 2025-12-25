"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoHeroBlockProps {
  config: {
    videoUrl?: string;
    posterUrl?: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    overlay?: "none" | "light" | "dark" | "gradient";
    autoplay?: boolean;
    muted?: boolean;
    loop?: boolean;
  };
  accentColor?: string;
}

export function VideoHeroBlock({ config, accentColor = "#06b6d4" }: VideoHeroBlockProps) {
  const [isPlaying, setIsPlaying] = useState(config.autoplay ?? true);
  const [isMuted, setIsMuted] = useState(config.muted ?? true);

  const overlayStyles = {
    none: "",
    light: "bg-white/30",
    dark: "bg-black/50",
    gradient: "bg-gradient-to-t from-black/80 via-black/20 to-transparent",
  };

  const togglePlay = () => {
    const video = document.getElementById("hero-video") as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const video = document.getElementById("hero-video") as HTMLVideoElement;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      {config.videoUrl ? (
        <video
          id="hero-video"
          autoPlay={config.autoplay ?? true}
          muted={config.muted ?? true}
          loop={config.loop ?? true}
          playsInline
          poster={config.posterUrl}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={config.videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      )}

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayStyles[config.overlay || "gradient"]}`} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-4xl"
        >
          {config.title || "Your Name"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl"
        >
          {config.subtitle || "Creative Developer & Designer"}
        </motion.p>

        {config.ctaText && (
          <motion.a
            href={config.ctaLink || "#"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full text-white font-semibold text-lg"
            style={{ backgroundColor: accentColor }}
          >
            {config.ctaText}
          </motion.a>
        )}
      </div>

      {/* Video Controls */}
      {config.videoUrl && (
        <div className="absolute bottom-8 right-8 z-20 flex gap-2">
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </button>
          <button
            onClick={toggleMute}
            className="p-3 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
