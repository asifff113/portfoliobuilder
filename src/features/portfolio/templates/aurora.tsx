"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { FeaturedProject, PortfolioProfile, PortfolioHero } from "@/types/portfolio";

interface AuroraTemplateProps {
  hero: PortfolioHero;
  projects: FeaturedProject[];
  profile?: PortfolioProfile | null;
  isPreview?: boolean;
}

export function AuroraTemplate({ hero, projects, isPreview = false }: AuroraTemplateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Aurora background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    let animationId: number;

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create aurora waves
      for (let i = 0; i < 5; i++) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, `hsla(${180 + i * 30 + Math.sin(time + i) * 20}, 70%, 50%, 0.1)`);
        gradient.addColorStop(0.5, `hsla(${220 + i * 20 + Math.cos(time + i) * 20}, 70%, 50%, 0.15)`);
        gradient.addColorStop(1, `hsla(${280 + i * 10 + Math.sin(time * 0.5 + i) * 20}, 70%, 50%, 0.1)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();

        for (let x = 0; x <= canvas.width; x += 10) {
          const y = canvas.height * 0.3 + 
            Math.sin(x * 0.005 + time + i) * 100 + 
            Math.sin(x * 0.01 + time * 0.5) * 50;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Aurora Canvas */}
      <canvas ref={canvasRef} className={`${isPreview ? 'absolute' : 'fixed'} inset-0 pointer-events-none`} />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-4xl mx-auto">
            {hero.avatarUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8"
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-white/20 ring-offset-4 ring-offset-slate-950">
                  <img src={hero.avatarUrl} alt={hero.headline} className="w-full h-full object-cover" />
                </div>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/60 mb-4"
            >
              {hero.headline}
            </motion.p>

            {hero.summary && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-white/40"
              >
                {hero.summary}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex justify-center gap-4"
            >
              <a href="#projects" className="px-8 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-colors">
                View Work
              </a>
              {hero.email && (
                <a href={`mailto:${hero.email}`} className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transition-colors">
                  Contact
                </a>
              )}
            </motion.div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-16"
            >
              Featured Work
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden"
                >
                  {/* Glass Card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm" />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative p-6">
                    {project.imageUrl && (
                      <div className="aspect-video rounded-lg overflow-hidden mb-4">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-white/50 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 text-center text-white/40">
          <p>© {new Date().getFullYear()} {hero.headline}. Crafted with ✨</p>
        </footer>
      </div>
    </div>
  );
}

