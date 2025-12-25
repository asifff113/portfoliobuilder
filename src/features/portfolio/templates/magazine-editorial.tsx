"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, ExternalLink, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PortfolioHero, PortfolioProfile, FeaturedProject, PortfolioBlock } from "@/types/portfolio";

interface MagazineEditorialTemplateProps {
  hero: PortfolioHero;
  profile: PortfolioProfile;
  projects: FeaturedProject[];
  blocks?: PortfolioBlock[];
  isPreview?: boolean;
}

export function MagazineEditorialTemplate({ hero, profile, projects, blocks: _blocks, isPreview: _isPreview = false }: MagazineEditorialTemplateProps) {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1a1a] font-serif">
      {/* Magazine Header */}
      <header className="border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="text-xs tracking-[0.3em] uppercase text-gray-500">
            {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
            {profile.fullName}
          </h1>
          <div className="text-xs tracking-[0.3em] uppercase text-gray-500">
            Portfolio
          </div>
        </div>
        <div className="h-1 bg-black" />
      </header>

      {/* Hero - Magazine Cover Style */}
      <section className="relative min-h-[90vh] flex flex-col justify-end px-8 py-16 bg-[#1a1a1a] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 50px, #fff 50px, #fff 51px)" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-12 relative z-10"
        >
          <div className="md:col-span-8">
            <div className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">
              Featured Story
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-8">
              {hero.headline}
            </h2>
            <div className="w-24 h-1 bg-white mb-8" />
          </div>
          
          <div className="md:col-span-4 flex flex-col justify-end">
            <p className="text-lg leading-relaxed text-gray-300 mb-8 font-sans">
              {hero.summary}
            </p>
            <Button 
              className="bg-white text-black hover:bg-gray-200 rounded-none w-fit px-8 py-6 text-sm font-sans tracking-widest uppercase"
              onClick={() => window.open(hero.ctaUrl, "_blank")}
            >
              {hero.ctaText}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Page Number */}
        <div className="absolute bottom-8 right-8 text-6xl font-black text-white/10">01</div>
      </section>

      {/* Projects - Magazine Layout */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <div className="text-xs tracking-[0.3em] uppercase text-gray-500">Selected Works</div>
            <div className="flex-1 h-px bg-black/20" />
            <div className="text-xs tracking-[0.3em] uppercase text-gray-500">{projects.length} Projects</div>
          </div>

          <div className="space-y-32">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`grid md:grid-cols-12 gap-12 items-center ${index % 2 === 1 ? "" : ""}`}
              >
                {/* Image */}
                <div className={`md:col-span-7 ${index % 2 === 1 ? "md:order-last" : ""}`}>
                  <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden group">
                    {project.imageUrl ? (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-9xl font-black text-gray-200">0{index + 1}</span>
                      </div>
                    )}
                    
                    {/* Hover Links */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-black text-sm tracking-widest uppercase font-sans hover:bg-gray-100 transition-colors">
                          View Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-white text-white text-sm tracking-widest uppercase font-sans hover:bg-white hover:text-black transition-colors">
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-5 space-y-6">
                  <div className="text-xs tracking-[0.3em] uppercase text-gray-400">
                    Project 0{index + 1}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black leading-tight">
                    {project.title}
                  </h3>
                  <div className="w-16 h-1 bg-black" />
                  <p className="text-lg leading-relaxed text-gray-600 font-sans">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-4">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-xs tracking-widest uppercase border-b border-black pb-1 font-sans">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Pull Quote Section */}
      <section className="py-24 px-8 bg-[#1a1a1a] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <Quote className="h-12 w-12 mx-auto mb-8 text-gray-600" />
          <blockquote className="text-3xl md:text-5xl font-light italic leading-relaxed mb-8">
            &quot;Great design is not just about how it looks, but how it works.&quot;
          </blockquote>
          <cite className="text-sm tracking-[0.3em] uppercase text-gray-400 not-italic">— {profile.fullName}</cite>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t-2 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-6">
              <h2 className="text-4xl font-black mb-6">Get in Touch</h2>
              <p className="text-gray-600 font-sans mb-8 max-w-md">
                Interested in working together? Let&apos;s discuss your next project.
              </p>
              <Button 
                className="bg-black text-white hover:bg-gray-800 rounded-none px-8 py-6 text-sm font-sans tracking-widest uppercase"
                onClick={() => window.location.href = `mailto:${profile.email}`}
              >
                <Mail className="mr-2 h-4 w-4" />
                {profile.email}
              </Button>
            </div>
            
            <div className="md:col-span-6 flex flex-col items-end justify-between">
              <div className="flex gap-6">
                {profile.linkedinUrl && (
                  <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </a>
                )}
                {profile.githubUrl && (
                  <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                    <Github className="h-6 w-6" />
                  </a>
                )}
              </div>
              
              <div className="text-right">
                <div className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2">
                  © {new Date().getFullYear()}
                </div>
                <div className="text-2xl font-black">{profile.fullName}</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

