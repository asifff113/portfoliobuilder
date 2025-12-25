"use client";

import { motion } from "framer-motion";
import type { FeaturedProject, PortfolioProfile, PortfolioHero } from "@/types/portfolio";

interface IsometricTemplateProps {
  hero: PortfolioHero;
  projects: FeaturedProject[];
  profile?: PortfolioProfile | null;
  isPreview?: boolean;
}

export function IsometricTemplate({ hero, projects, isPreview = false }: IsometricTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white relative">
      {/* Isometric Grid Background */}
      <div className={`${isPreview ? 'absolute' : 'fixed'} inset-0 pointer-events-none opacity-20`}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="iso-grid" width="100" height="57.7" patternUnits="userSpaceOnUse">
              <path
                d="M50 0 L100 28.85 L50 57.7 L0 28.85 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-purple-500"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#iso-grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="min-h-screen flex items-center px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  {hero.headline}
                </span>
              </h1>
              <p className="text-2xl text-white/70 mb-4">{hero.headline}</p>
              {hero.summary && (
                <p className="text-lg text-white/50 mb-8">{hero.summary}</p>
              )}
              
              <div className="flex gap-4">
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 font-medium hover:opacity-90 transition-opacity"
                >
                  View Projects
                </a>
                {hero.email && (
                  <a
                    href={`mailto:${hero.email}`}
                    className="px-6 py-3 rounded-lg border border-white/20 font-medium hover:bg-white/10 transition-colors"
                  >
                    Contact Me
                  </a>
                )}
              </div>
            </motion.div>

            {/* Right - 3D Isometric Blocks */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative h-96"
            >
              {[
                { size: 120, x: 50, y: 100, delay: 0, color: "from-purple-500 to-purple-600" },
                { size: 80, x: 150, y: 50, delay: 0.1, color: "from-pink-500 to-pink-600" },
                { size: 100, x: 200, y: 150, delay: 0.2, color: "from-orange-500 to-orange-600" },
                { size: 60, x: 100, y: 200, delay: 0.3, color: "from-blue-500 to-blue-600" },
                { size: 90, x: 250, y: 80, delay: 0.4, color: "from-teal-500 to-teal-600" },
              ].map((block, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: block.delay + 0.5 }}
                  className="absolute"
                  style={{ left: block.x, top: block.y }}
                >
                  <IsometricBox size={block.size} gradient={block.color} />
                </motion.div>
              ))}
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
              className="text-3xl font-bold mb-12 text-center"
            >
              Featured Work
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors">
                    {/* Isometric Icon */}
                    <div className="mb-4">
                      <IsometricBox size={50} gradient="from-purple-500 to-pink-500" />
                    </div>

                    <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-sm mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-300"
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
          <p>© {new Date().getFullYear()} {hero.headline}</p>
        </footer>
      </div>
    </div>
  );
}

// Isometric Box Component
function IsometricBox({ size, gradient }: { size: number; gradient: string }) {
  const halfSize = size / 2;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Top Face */}
      <div
        className={`absolute bg-gradient-to-br ${gradient} opacity-90`}
        style={{
          width: size,
          height: halfSize,
          transform: "rotateX(60deg) rotateZ(45deg)",
          transformOrigin: "center center",
          top: -halfSize / 4,
        }}
      />
      {/* Left Face */}
      <div
        className={`absolute bg-gradient-to-b ${gradient} opacity-70`}
        style={{
          width: halfSize,
          height: size,
          left: 0,
          transform: "skewY(30deg)",
          transformOrigin: "left bottom",
        }}
      />
      {/* Right Face */}
      <div
        className={`absolute bg-gradient-to-b ${gradient} opacity-50`}
        style={{
          width: halfSize,
          height: size,
          right: 0,
          transform: "skewY(-30deg)",
          transformOrigin: "right bottom",
        }}
      />
    </div>
  );
}

