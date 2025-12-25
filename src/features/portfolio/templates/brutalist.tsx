"use client";

import { motion } from "framer-motion";
import type { FeaturedProject, PortfolioProfile } from "@/types/portfolio";

interface BrutalistTemplateProps {
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

export function BrutalistTemplate({ hero, projects, isPreview: _isPreview = false }: BrutalistTemplateProps) {
  return (
    <div className="min-h-screen bg-white text-black font-mono">
      {/* Header */}
      <header className="border-b-4 border-black p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-black uppercase tracking-tight">
            {hero.name}
          </h1>
          <nav className="flex gap-6 text-sm uppercase tracking-wider">
            <a href="#work" className="hover:underline underline-offset-4">Work</a>
            <a href="#about" className="hover:underline underline-offset-4">About</a>
            <a href="#contact" className="hover:underline underline-offset-4">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b-4 border-black">
        <div className="max-w-7xl mx-auto p-12 md:p-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[10rem] font-black uppercase leading-none tracking-tighter"
          >
            {hero.title}
          </motion.h2>
          {hero.subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl mt-8 max-w-2xl uppercase tracking-wide"
            >
              {hero.subtitle}
            </motion.p>
          )}
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-black text-white py-4 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap text-2xl font-black uppercase"
        >
          {Array(10).fill("• DESIGN • CODE • CREATE • BUILD • SHIP •").map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </motion.div>
      </div>

      {/* Projects */}
      <section id="work" className="border-b-4 border-black">
        <div className="max-w-7xl mx-auto p-6">
          <h3 className="text-4xl font-black uppercase mb-8 tracking-tight">
            Selected Work
          </h3>
          <div className="grid md:grid-cols-2 gap-0">
            {projects.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ backgroundColor: "#000", color: "#fff" }}
                className="border-4 border-black p-8 transition-colors cursor-pointer"
              >
                <span className="text-sm uppercase tracking-wider opacity-50">
                  0{i + 1}
                </span>
                <h4 className="text-3xl font-black uppercase mt-2 mb-4">
                  {project.title}
                </h4>
                <p className="opacity-70 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 border-2 border-current text-xs uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-b-4 border-black bg-yellow-300">
        <div className="max-w-7xl mx-auto p-12 md:p-24">
          <h3 className="text-4xl font-black uppercase mb-8">About</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-xl leading-relaxed">
                I'm a designer & developer who believes in the power of
                brutalist design. Raw. Honest. Functional.
              </p>
            </div>
            <div className="space-y-4">
              <div className="border-4 border-black p-4 bg-white">
                <span className="text-sm uppercase">Experience</span>
                <p className="text-2xl font-black">5+ Years</p>
              </div>
              <div className="border-4 border-black p-4 bg-white">
                <span className="text-sm uppercase">Projects</span>
                <p className="text-2xl font-black">{projects.length}+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-black text-white">
        <div className="max-w-7xl mx-auto p-12 md:p-24 text-center">
          <h3 className="text-4xl md:text-6xl font-black uppercase mb-8">
            Let's Work Together
          </h3>
          {hero.email && (
            <a
              href={`mailto:${hero.email}`}
              className="inline-block text-2xl md:text-4xl font-black uppercase border-4 border-white px-8 py-4 hover:bg-white hover:text-black transition-colors"
            >
              {hero.email}
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black p-6 text-center text-sm uppercase">
        © {new Date().getFullYear()} {hero.name}. All rights reserved.
      </footer>
    </div>
  );
}
