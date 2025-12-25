"use client";

import { motion } from "framer-motion";
import type { FeaturedProject, PortfolioProfile, PortfolioHero } from "@/types/portfolio";

interface TokyoNightTemplateProps {
  hero: PortfolioHero;
  projects: FeaturedProject[];
  profile?: PortfolioProfile | null;
  isPreview?: boolean;
}

export function TokyoNightTemplate({ hero, projects, isPreview: _isPreview = false }: TokyoNightTemplateProps) {
  return (
    <div className="min-h-screen bg-[#1a1b26] text-[#a9b1d6] font-sans">
      {/* Neon Sign Header */}
      <header className="relative py-8 px-6 border-b border-[#3d59a1]/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono"
          >
            <span className="text-[#7aa2f7]">const</span>{" "}
            <span className="text-[#bb9af7]">developer</span>{" "}
            <span className="text-[#89ddff]">=</span>{" "}
            <span className="text-[#9ece6a]">"{hero.headline}"</span>
          </motion.div>
          
          <nav className="hidden md:flex gap-6 font-mono text-sm">
            <a href="#work" className="text-[#7aa2f7] hover:text-[#bb9af7] transition-colors">
              {"<Work />"}
            </a>
            <a href="#about" className="text-[#7aa2f7] hover:text-[#bb9af7] transition-colors">
              {"<About />"}
            </a>
            <a href="#contact" className="text-[#7aa2f7] hover:text-[#bb9af7] transition-colors">
              {"<Contact />"}
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Japanese Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Code Comment */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#565f89] font-mono mb-4"
          >
            {"// Welcome to my digital space"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-[#c0caf5]">{hero.headline}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-xl md:text-2xl mb-8"
          >
            <span className="text-[#bb9af7]">function</span>{" "}
            <span className="text-[#7aa2f7]">{hero.headline.replace(/\s/g, "_")}</span>
            <span className="text-[#89ddff]">()</span>{" "}
            <span className="text-[#89ddff]">{"{"}</span>
          </motion.div>

          {hero.summary && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[#9ece6a] font-mono pl-8 mb-4"
            >
              return "{hero.summary}";
            </motion.p>
          )}

          <p className="text-[#89ddff] font-mono">{"}"}</p>

          {/* Floating Cherry Blossoms */}
          <div className="absolute top-0 right-0 text-4xl opacity-30">🌸</div>
          <div className="absolute bottom-10 right-20 text-2xl opacity-20">🌸</div>
        </div>
      </section>

      {/* Projects */}
      <section id="work" className="py-20 px-6 bg-[#16161e]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-[#565f89] font-mono mb-2">{"// Featured projects"}</p>
            <h2 className="text-3xl font-bold text-[#c0caf5]">
              <span className="text-[#bb9af7]">export</span>{" "}
              <span className="text-[#7aa2f7]">Projects</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-lg border border-[#3d59a1]/30 bg-[#1a1b26] hover:border-[#7aa2f7]/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[#565f89] font-mono text-sm mb-1">
                      {"// project_" + String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-xl font-bold text-[#c0caf5] group-hover:text-[#7aa2f7] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-[#9ece6a] font-mono text-sm">
                    {"</>"}
                  </span>
                </div>

                <p className="text-[#a9b1d6]/70 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-[#3d59a1]/20 text-[#7aa2f7]"
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
      <section id="contact" className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#565f89] font-mono mb-4">{"// Let's connect"}</p>
            <h2 className="text-3xl font-bold text-[#c0caf5] mb-8">
              <span className="text-[#bb9af7]">await</span>{" "}
              <span className="text-[#7aa2f7]">contact</span>
              <span className="text-[#89ddff]">()</span>
            </h2>

            {hero.email && (
              <a
                href={`mailto:${hero.email}`}
                className="inline-block px-8 py-3 rounded-lg font-mono text-[#1a1b26] bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] hover:from-[#bb9af7] hover:to-[#7aa2f7] transition-all"
              >
                {hero.email}
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#3d59a1]/30 text-center">
        <p className="text-[#565f89] font-mono text-sm">
          {"/* Made with 💜 in Tokyo Night */"}
        </p>
      </footer>
    </div>
  );
}

