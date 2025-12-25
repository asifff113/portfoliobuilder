"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import type { FeaturedProject, PortfolioProfile } from "@/types/portfolio";

interface HolographicTemplateProps {
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

export function HolographicTemplate({ hero, projects, isPreview = false }: HolographicTemplateProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white relative overflow-hidden"
    >
      {/* Holographic Grid Background */}
      <div className={`${isPreview ? 'absolute' : 'fixed'} inset-0 pointer-events-none`}>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
            transform: `perspective(500px) rotateX(60deg) translateY(-50%)`,
            transformOrigin: "center bottom",
          }}
        />
        
        {/* Holographic Glow Following Mouse */}
        <div
          className="absolute w-96 h-96 rounded-full blur-[100px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,255,255,0.3), rgba(255,0,255,0.2), transparent 70%)",
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: "left 0.3s ease-out, top 0.3s ease-out",
          }}
        />
      </div>

      {/* Scan Lines Overlay */}
      <div
        className={`${isPreview ? 'absolute' : 'fixed'} inset-0 pointer-events-none opacity-10`}
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            {/* Holographic Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block mb-8"
            >
              <div className="px-4 py-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 text-cyan-400 text-sm tracking-widest uppercase">
                ◇ System Online ◇
              </div>
            </motion.div>

            {/* Name with Holographic Effect */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-bold mb-6 relative"
            >
              <span
                className="absolute inset-0 text-cyan-400 blur-sm"
                style={{ transform: "translateX(2px) translateY(2px)" }}
              >
                {hero.name}
              </span>
              <span
                className="absolute inset-0 text-pink-400 blur-sm"
                style={{ transform: "translateX(-2px) translateY(-2px)" }}
              >
                {hero.name}
              </span>
              <span className="relative bg-gradient-to-r from-cyan-400 via-white to-pink-400 bg-clip-text text-transparent">
                {hero.name}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <p className="text-xl md:text-2xl text-cyan-300 font-mono">
                [{hero.title}]
              </p>
              {hero.subtitle && (
                <p className="text-white/50 font-mono text-sm">
                  // {hero.subtitle}
                </p>
              )}
            </motion.div>

            {/* Holographic Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-8 mt-12"
            >
              {[
                { label: "PROJECTS", value: projects.length },
                { label: "EXPERIENCE", value: "5+" },
                { label: "CLIENTS", value: "50+" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 font-mono">{stat.value}</div>
                  <div className="text-xs text-white/30 tracking-widest">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-16 font-mono text-cyan-400"
            >
              [ PROJECTS.ARCHIVE ]
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, i) => (
                <HolographicCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center border-t border-cyan-500/20">
          <p className="text-cyan-400/50 font-mono text-sm">
            ◇ END OF TRANSMISSION ◇
          </p>
        </footer>
      </div>
    </div>
  );
}

function HolographicCard({ project, index }: { project: FeaturedProject; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / rect.width) * 15;
    const rotateX = ((centerY - e.clientY) / rect.height) * 15;
    setRotation({ x: rotateX, y: rotateY });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotation({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: "preserve-3d",
      }}
      className="group relative p-6 rounded-xl border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm transition-transform duration-200"
    >
      {/* Holographic Shimmer */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(0,255,255,0.1), rgba(255,0,255,0.1), rgba(0,255,255,0.1))",
          backgroundSize: "200% 200%",
          animation: "shimmer 2s linear infinite",
        }}
      />

      <div className="relative">
        <span className="text-cyan-400/50 font-mono text-xs">PROJECT_{String(index + 1).padStart(2, "0")}</span>
        <h3 className="text-xl font-bold text-white mt-2 mb-3">{project.title}</h3>
        <p className="text-white/50 text-sm mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 rounded text-xs font-mono border border-cyan-500/30 text-cyan-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
