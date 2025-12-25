"use client";

import { motion } from "framer-motion";
import type { FeaturedProject, PortfolioProfile } from "@/types/portfolio";

interface RetroVaporwaveTemplateProps {
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

export function RetroVaporwaveTemplate({ hero, projects, isPreview = false }: RetroVaporwaveTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-900 to-blue-900 text-white font-sans overflow-hidden relative">
      {/* Grid Background */}
      <div className={`${isPreview ? 'absolute' : 'fixed'} inset-0 pointer-events-none`}>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,0,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,0,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: "perspective(500px) rotateX(60deg)",
            transformOrigin: "center 100%",
          }}
        />
        {/* Sun */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-t-full bg-gradient-to-t from-orange-500 via-pink-500 to-purple-500 opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Glitch Text */}
            <h1
              className="text-6xl md:text-8xl font-black mb-4 tracking-wider"
              style={{
                textShadow: `
                  0 0 10px #ff00ff,
                  0 0 20px #ff00ff,
                  0 0 40px #ff00ff,
                  4px 4px 0 #00ffff,
                  -4px -4px 0 #ff0080
                `,
              }}
            >
              {hero.name}
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl uppercase tracking-[0.3em] text-pink-300"
            >
              {hero.title}
            </motion.p>
            {hero.subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg mt-6 text-cyan-300 italic"
              >
                「 {hero.subtitle} 」
              </motion.p>
            )}
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute top-20 left-10 text-6xl"
          >
            🌴
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
            className="absolute top-32 right-16 text-5xl"
          >
            🗿
          </motion.div>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, delay: 1 }}
            className="absolute bottom-40 left-20 text-4xl"
          >
            🌸
          </motion.div>
        </section>

        {/* Projects */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-black mb-16 text-center tracking-wider"
              style={{ textShadow: "0 0 20px #ff00ff, 0 0 40px #00ffff" }}
            >
              ⌬ PROJECTS ⌬
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,0,255,0.5)" }}
                  className="relative p-6 rounded-lg overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,0,255,0.2), rgba(0,255,255,0.2))",
                    border: "2px solid rgba(255,0,255,0.5)",
                  }}
                >
                  {/* Scanlines */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                    }}
                  />

                  <span className="text-pink-400 text-sm uppercase tracking-widest">
                    Project 0{i + 1}
                  </span>
                  <h3 className="text-2xl font-bold mt-2 mb-3 text-cyan-300">
                    {project.title}
                  </h3>
                  <p className="text-white/70 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-pink-500/30 to-cyan-500/30 border border-pink-500/50"
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

        {/* Contact */}
        <section className="py-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto p-12 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(255,0,255,0.3), rgba(0,255,255,0.3))",
              border: "2px solid rgba(255,0,255,0.5)",
              boxShadow: "0 0 50px rgba(255,0,255,0.3)",
            }}
          >
            <h3
              className="text-4xl font-black mb-6"
              style={{ textShadow: "0 0 20px #ff00ff" }}
            >
              ✧ CONNECT ✧
            </h3>
            {hero.email && (
              <a
                href={`mailto:${hero.email}`}
                className="inline-block px-8 py-3 rounded-full text-lg font-bold uppercase tracking-wider bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-cyan-500 hover:to-pink-500 transition-all"
              >
                {hero.email}
              </a>
            )}
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-pink-300/50 text-sm">
          <p>「 {new Date().getFullYear()} · {hero.name} · A E S T H E T I C 」</p>
        </footer>
      </div>
    </div>
  );
}
