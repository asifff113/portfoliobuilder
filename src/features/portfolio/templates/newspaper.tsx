"use client";

import { motion } from "framer-motion";
import type { FeaturedProject, PortfolioProfile, PortfolioHero } from "@/types/portfolio";

interface NewspaperTemplateProps {
  hero: PortfolioHero;
  projects: FeaturedProject[];
  profile?: PortfolioProfile | null;
  isPreview?: boolean;
}

export function NewspaperTemplate({ hero, projects, isPreview = false }: NewspaperTemplateProps) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#f5f1e8] text-[#1a1a1a] font-serif relative">
      {/* Paper texture overlay */}
      <div 
        className={`${isPreview ? 'absolute' : 'fixed'} inset-0 pointer-events-none opacity-30`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        {/* Masthead */}
        <header className="text-center border-b-4 border-double border-[#1a1a1a] pb-4 mb-6">
          <p className="text-sm tracking-widest mb-2">{today}</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-2" style={{ fontFamily: "Georgia, serif" }}>
            THE {hero.headline.toUpperCase()} TIMES
          </h1>
          <div className="flex justify-center items-center gap-4 text-sm">
            <span>Vol. MMXXIV</span>
            <span>•</span>
            <span>Portfolio Edition</span>
            <span>•</span>
            <span>Price: Free</span>
          </div>
        </header>

        {/* Main Headline */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-b border-[#1a1a1a] pb-8 mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-center">
            {hero.headline}
          </h2>
          {hero.summary && (
            <p className="text-xl text-center text-[#555] italic">
              {hero.summary}
            </p>
          )}
        </motion.section>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Main Feature */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold border-b border-[#1a1a1a] pb-2 mb-4">
              FEATURED PROJECTS
            </h3>
            <div className="space-y-6">
              {projects.slice(0, 2).map((project, i) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="border-b border-[#ccc] pb-6"
                >
                  <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                  <p className="text-sm leading-relaxed text-[#333] mb-3" style={{ columnCount: 2, columnGap: "1.5rem" }}>
                    {project.description} — A groundbreaking project that showcases innovative solutions and cutting-edge technology. The development process involved careful planning, meticulous execution, and a deep understanding of user needs.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-xs bg-[#1a1a1a] text-[#f5f1e8] px-2 py-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="border-2 border-[#1a1a1a] p-4">
              <h4 className="font-bold text-center mb-3 border-b border-[#1a1a1a] pb-2">
                QUICK FACTS
              </h4>
              <ul className="text-sm space-y-2">
                <li>◆ {projects.length} Projects Completed</li>
                <li>◆ Available for Hire</li>
                <li>◆ Remote & Onsite</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold border-b border-[#1a1a1a] pb-2 mb-3">
                MORE PROJECTS
              </h4>
              {projects.slice(2).map((project) => (
                <div key={project.id} className="border-b border-[#ccc] py-3">
                  <h5 className="font-bold text-sm">{project.title}</h5>
                  <p className="text-xs text-[#666]">{project.description.slice(0, 80)}...</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center border-t-2 border-[#1a1a1a] pt-4">
          <p className="text-sm text-[#666]">
            © {new Date().getFullYear()} {hero.headline}. All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

