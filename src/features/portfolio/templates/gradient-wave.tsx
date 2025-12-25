"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { FeaturedProject, PortfolioProfile, PortfolioHero } from "@/types/portfolio";

interface GradientWaveTemplateProps {
  hero: PortfolioHero;
  projects: FeaturedProject[];
  profile?: PortfolioProfile | null;
  isPreview?: boolean;
}

export function GradientWaveTemplate({ hero, projects, isPreview = false }: GradientWaveTemplateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    let animationId: number;

    const colors = [
      { r: 255, g: 100, b: 100 },
      { r: 255, g: 200, b: 100 },
      { r: 100, g: 255, b: 200 },
      { r: 100, g: 200, b: 255 },
      { r: 200, g: 100, b: 255 },
    ];

    const draw = () => {
      time += 0.01;
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      colors.forEach((color, i) => {
        const offset = (i / (colors.length - 1) + Math.sin(time + i) * 0.1) % 1;
        gradient.addColorStop(
          Math.max(0, Math.min(1, offset)),
          `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`
        );
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Wave overlays
      ctx.globalCompositeOperation = "overlay";
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = canvas.height * (0.6 + i * 0.1) + 
            Math.sin(x * 0.003 + time + i) * 50 +
            Math.sin(x * 0.007 + time * 0.5) * 30;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 - i * 0.02})`;
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <canvas ref={canvasRef} className={`${isPreview ? 'absolute' : 'fixed'} inset-0`} />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black mb-6 drop-shadow-2xl"
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-light mb-4 drop-shadow-lg"
            >
              {hero.headline}
            </motion.p>

            {hero.summary && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-white/80"
              >
                {hero.summary}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex justify-center gap-4"
            >
              <a href="#projects" className="px-8 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors font-medium">
                View Work
              </a>
              {hero.email && (
                <a href={`mailto:${hero.email}`} className="px-8 py-3 rounded-full bg-white text-gray-900 hover:bg-white/90 transition-colors font-medium">
                  Say Hello
                </a>
              )}
            </motion.div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 px-6 bg-black/20 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white text-center mb-16"
            >
              Selected Projects
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 rounded-md text-xs bg-white/10 text-white/80">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

