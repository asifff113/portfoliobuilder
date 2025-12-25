"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PortfolioHero, PortfolioProfile, FeaturedProject } from "@/types/portfolio";

interface MinimalistLuxeTemplateProps {
  hero: PortfolioHero;
  profile: PortfolioProfile;
  projects: FeaturedProject[];
  isPreview?: boolean;
}

export function MinimalistLuxeTemplate({ hero, profile, projects, isPreview = false }: MinimalistLuxeTemplateProps) {
  return (
    <div className="min-h-screen bg-[#f8f8f8] text-[#1a1a1a] selection:bg-[#d4a574] selection:text-white font-sans relative">
      {/* Navigation */}
      <nav className={`${isPreview ? 'absolute' : 'fixed'} top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center mix-blend-difference text-white`}>
        <span className="text-xl font-bold tracking-tighter uppercase">{profile.fullName}</span>
        <div className="flex gap-6 text-sm font-medium tracking-wide">
          <a href="#work" className="hover:opacity-70 transition-opacity">WORK</a>
          <a href="#about" className="hover:opacity-70 transition-opacity">ABOUT</a>
          <a href="#contact" className="hover:opacity-70 transition-opacity">CONTACT</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-8 md:px-20 pt-20 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl z-10"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light leading-[0.9] tracking-tight mb-12">
            {hero.headline}
          </h1>
          
          <div className="flex flex-col md:flex-row gap-12 md:items-end justify-between border-t border-black/10 pt-8">
            <p className="text-xl md:text-2xl font-light max-w-xl leading-relaxed text-black/80">
              {hero.summary}
            </p>
            
            <Button 
              className="bg-black text-white rounded-full px-8 py-6 text-lg hover:bg-[#d4a574] transition-colors duration-500 group"
              onClick={() => window.open(hero.ctaUrl, "_blank")}
            >
              {hero.ctaText}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#e8e8e8] z-0 hidden lg:block" />
        <div className="absolute bottom-10 left-8 text-sm font-medium tracking-widest text-black/40 uppercase">
          Based in {profile.location}
        </div>
      </section>

      {/* Selected Works */}
      <section id="work" className="py-32 px-8 md:px-20 bg-white">
        <div className="flex items-end justify-between mb-20">
          <h2 className="text-4xl md:text-6xl font-serif font-light">Selected Works</h2>
          <span className="text-sm font-medium tracking-widest text-black/40 uppercase hidden md:block">
            {new Date().getFullYear()} Collection
          </span>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="group grid md:grid-cols-12 gap-8 md:gap-16 items-center"
            >
              {/* Project Image */}
              <div className={`md:col-span-7 ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                <div className="aspect-4/3 bg-[#f0f0f0] overflow-hidden relative">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-black/10 text-9xl font-serif">
                      {index + 1}
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="bg-white rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <ArrowUpRight className="h-8 w-8" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="md:col-span-5 space-y-6">
                <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-[#d4a574] uppercase">
                  <span>0{index + 1}</span>
                  <div className="h-px w-12 bg-[#d4a574]" />
                  <span>{project.techStack[0]}</span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-serif font-light group-hover:text-[#d4a574] transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-lg text-black/60 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-xs border border-black/10 px-3 py-1 rounded-full text-black/60">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-6 flex gap-6">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold tracking-widest uppercase hover:text-[#d4a574] transition-colors border-b border-black pb-1 hover:border-[#d4a574]">
                      View Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold tracking-widest uppercase hover:text-[#d4a574] transition-colors border-b border-black pb-1 hover:border-[#d4a574]">
                      Github
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#1a1a1a] text-white py-32 px-8 md:px-20">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-serif font-light mb-12">
              Let&apos;s create something <span className="italic text-[#d4a574]">extraordinary</span>.
            </h2>
            <Button 
              className="bg-white text-black hover:bg-[#d4a574] hover:text-white rounded-full px-10 py-8 text-xl transition-colors duration-300"
              onClick={() => window.location.href = `mailto:${profile.email}`}
            >
              Get in Touch
            </Button>
          </div>

          <div className="flex flex-col justify-between space-y-12">
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="text-[#d4a574] text-sm font-bold tracking-widest uppercase mb-6">Socials</h4>
                <div className="space-y-4 flex flex-col items-start">
                  {profile.linkedinUrl && (
                    <a href={profile.linkedinUrl} className="text-xl hover:text-[#d4a574] transition-colors">LinkedIn</a>
                  )}
                  {profile.githubUrl && (
                    <a href={profile.githubUrl} className="text-xl hover:text-[#d4a574] transition-colors">Github</a>
                  )}
                  <a href="#" className="text-xl hover:text-[#d4a574] transition-colors">Twitter</a>
                  <a href="#" className="text-xl hover:text-[#d4a574] transition-colors">Instagram</a>
                </div>
              </div>
              <div>
                <h4 className="text-[#d4a574] text-sm font-bold tracking-widest uppercase mb-6">Contact</h4>
                <div className="space-y-4">
                  <p className="text-xl">{profile.email}</p>
                  <p className="text-xl">{profile.phone}</p>
                  <p className="text-xl">{profile.location}</p>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/10 flex justify-between items-end text-sm text-white/40">
              <p>© {new Date().getFullYear()} {profile.fullName}</p>
              <p>Designed with NeonCV</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

