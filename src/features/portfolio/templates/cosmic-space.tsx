"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { FeaturedProject, PortfolioProfile } from "@/types/portfolio";

interface CosmicSpaceTemplateProps {
  hero: {
    name: string;
    title: string;
    subtitle?: string;
    avatarUrl?: string;
    email?: string;
  };
  projects: FeaturedProject[];
  profile?: PortfolioProfile | null;
  isPreview?: boolean;
}

export function CosmicSpaceTemplate({ hero, projects, isPreview = false }: CosmicSpaceTemplateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Starfield animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars: { x: number; y: number; size: number; speed: number }[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Create stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 10, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`;
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#000010] text-white relative overflow-hidden">
      {/* Starfield */}
      <canvas ref={canvasRef} className={`${isPreview ? 'absolute' : 'fixed'} inset-0`} />

      {/* Nebula gradients */}
      <div className={`${isPreview ? 'absolute' : 'fixed'} inset-0 pointer-events-none`}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-600/10 rounded-full blur-[80px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Planet decoration */}
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 shadow-[0_0_60px_rgba(167,139,250,0.5)]" />
              
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {hero.name}
              </h1>
              
              <p className="text-xl text-white/60 mb-2">{hero.title}</p>
              
              {hero.subtitle && (
                <p className="text-white/40">{hero.subtitle}</p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex justify-center gap-4"
              >
                <a href="#projects" className="px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-colors">
                  Explore
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-16"
            >
              Stellar Projects
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-4 flex items-center justify-center text-xl">
                    ✦
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center text-white/40">
          <p>Reaching for the stars ✦</p>
        </footer>
      </div>
    </div>
  );
}
