"use client";

import { motion } from "framer-motion";
import type { FeaturedProject, PortfolioProfile, PortfolioHero } from "@/types/portfolio";

interface NoirFilmTemplateProps {
  hero: PortfolioHero;
  projects: FeaturedProject[];
  profile?: PortfolioProfile | null;
  isPreview?: boolean;
}

export function NoirFilmTemplate({ hero, projects, isPreview = false }: NoirFilmTemplateProps) {
  return (
    <div className="min-h-screen bg-black text-white font-serif relative">
      {/* Film grain overlay */}
      <div 
        className={`${isPreview ? 'absolute' : 'fixed'} inset-0 pointer-events-none opacity-20 z-50`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div 
        className={`${isPreview ? 'absolute' : 'fixed'} inset-0 pointer-events-none`}
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              {/* Film strip decoration */}
              <div className="flex justify-center mb-8">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-8 h-10 border-2 border-white/30 mx-1" />
                ))}
              </div>

              <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight italic">
                {hero.headline}
              </h1>
              
              <div className="h-px w-48 bg-white/50 mx-auto mb-6" />
              
              <p className="text-xl md:text-2xl text-white/70 italic mb-4">
                {hero.headline}
              </p>
              
              {hero.summary && (
                <p className="text-lg text-white/50 italic">
                  "{hero.summary}"
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Projects */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16 italic"
            >
              Featured Works
            </motion.h2>

            <div className="space-y-16">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Image placeholder */}
                  <div className="w-full md:w-1/2 aspect-video bg-white/10 rounded-lg overflow-hidden">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/30">
                        [ Scene {i + 1} ]
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <span className="text-sm text-white/40 tracking-widest">ACT {i + 1}</span>
                    <h3 className="text-2xl font-bold italic mt-2 mb-3">{project.title}</h3>
                    <p className="text-white/60 italic">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center border-t border-white/10">
          <p className="text-white/40 italic">FIN</p>
        </footer>
      </div>
    </div>
  );
}

