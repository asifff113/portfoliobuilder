"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { FeaturedProject, PortfolioProfile } from "@/types/portfolio";

interface LiquidMetalTemplateProps {
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

export function LiquidMetalTemplate({ hero, projects, isPreview = false }: LiquidMetalTemplateProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      {/* Liquid metal gradient background */}
      <div 
        className={`${isPreview ? 'absolute' : 'fixed'} inset-0 transition-all duration-1000`}
        style={{
          background: `
            radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, rgba(200,200,200,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(150,150,150,0.1) 0%, transparent 40%),
            linear-gradient(135deg, #18181b 0%, #09090b 50%, #18181b 100%)
          `,
        }}
      />

      {/* Chrome mesh */}
      <div 
        className={`${isPreview ? 'absolute' : 'fixed'} inset-0 pointer-events-none opacity-20`}
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.03) 50%, transparent 51%),
            linear-gradient(0deg, transparent 49%, rgba(255,255,255,0.03) 50%, transparent 51%)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            {/* Chrome orb */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 1 }}
              className="w-32 h-32 mx-auto mb-8 rounded-full"
              style={{
                background: "linear-gradient(135deg, #e4e4e7 0%, #71717a 25%, #27272a 50%, #71717a 75%, #e4e4e7 100%)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 -5px 20px rgba(255,255,255,0.2)",
              }}
            />

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl font-bold mb-4"
              style={{
                background: "linear-gradient(135deg, #e4e4e7 0%, #a1a1aa 50%, #e4e4e7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 4px 30px rgba(255,255,255,0.1)",
              }}
            >
              {hero.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-zinc-400 mb-2"
            >
              {hero.title}
            </motion.p>

            {hero.subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-zinc-500"
              >
                {hero.subtitle}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-10"
            >
              <a
                href="#work"
                className="inline-block px-8 py-3 rounded-full font-medium transition-all"
                style={{
                  background: "linear-gradient(135deg, #52525b 0%, #27272a 100%)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                View Work
              </a>
            </motion.div>
          </div>
        </section>

        {/* Projects */}
        <section id="work" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-16 text-zinc-300"
            >
              Featured Work
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(145deg, #27272a 0%, #18181b 100%)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Metal accent */}
                  <div 
                    className="w-12 h-12 rounded-lg mb-4"
                    style={{
                      background: "linear-gradient(135deg, #71717a 0%, #3f3f46 100%)",
                    }}
                  />
                  
                  <h3 className="text-xl font-semibold text-zinc-200 mb-2 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-500 text-sm mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded bg-zinc-800 text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center text-zinc-600">
          <p>Forged with precision ⬥</p>
        </footer>
      </div>
    </div>
  );
}
