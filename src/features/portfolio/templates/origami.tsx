"use client";

import { motion } from "framer-motion";
import type { FeaturedProject, PortfolioProfile } from "@/types/portfolio";

interface OrigamiTemplateProps {
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

export function OrigamiTemplate({ hero, projects, isPreview = false }: OrigamiTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-sky-50 text-gray-800 relative">
      {/* Paper texture */}
      <div 
        className={`${isPreview ? 'absolute' : 'fixed'} inset-0 pointer-events-none opacity-40`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            {/* Origami crane */}
            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl mb-8"
            >
              🕊️
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-light mb-6 tracking-wide"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              {hero.name}
            </motion.h1>

            {/* Decorative fold line */}
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-6" />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 font-light"
            >
              {hero.title}
            </motion.p>

            {hero.subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-500 mt-4"
              >
                {hero.subtitle}
              </motion.p>
            )}
          </div>
        </section>

        {/* Projects */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-light text-center mb-16"
            >
              折り紙 <span className="text-gray-400">Projects</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative"
                >
                  {/* Folded corner effect */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-rose-200 to-rose-300 transform rotate-45 shadow-lg" />
                  
                  <div className="relative bg-white p-8 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-rose-300">
                    <span className="text-4xl mb-4 block">
                      {["🦩", "🌸", "🍃", "🦋", "🌊", "🗻"][i % 6]}
                    </span>
                    <h3 className="text-xl font-medium mb-3">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-rose-50 text-rose-600 rounded-full"
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
        <footer className="py-12 text-center text-gray-400">
          <p className="font-light">千羽鶴 — {hero.name}</p>
        </footer>
      </div>
    </div>
  );
}
