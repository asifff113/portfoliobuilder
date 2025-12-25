"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Globe, ExternalLink, Code2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PortfolioHero, PortfolioProfile, FeaturedProject, PortfolioBlock } from "@/types/portfolio";

interface GlassmorphismTemplateProps {
  hero: PortfolioHero;
  profile: PortfolioProfile;
  projects: FeaturedProject[];
  blocks?: PortfolioBlock[];
  isPreview?: boolean;
}

export function GlassmorphismTemplate({ hero, profile, projects, blocks: _blocks, isPreview = false }: GlassmorphismTemplateProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-pink-800 text-white font-sans overflow-hidden relative">
      {/* Animated Background Orbs */}
      <div className={`${isPreview ? 'absolute' : 'fixed'} inset-0 z-0 overflow-hidden pointer-events-none`}>
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-xl font-bold">{profile.fullName}</span>
          <div className="flex gap-6 text-sm">
            <a href="#about" className="hover:text-purple-300 transition-colors">About</a>
            <a href="#projects" className="hover:text-purple-300 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-purple-300 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[80vh] flex items-center px-6 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-linear-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                {hero.headline}
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed">
                {hero.summary}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-full px-8 h-12 text-white transition-all hover:scale-105"
                  onClick={() => window.open(hero.ctaUrl, "_blank")}
                >
                  {hero.ctaText}
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="flex gap-3">
                  {profile.githubUrl && (
                    <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all hover:scale-110">
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {profile.linkedinUrl && (
                    <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all hover:scale-110">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-16 text-center"
          >
            Featured Work
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              >
                {/* Project Image */}
                <div className="aspect-video bg-white/5 relative overflow-hidden">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Code2 className="h-12 w-12 text-white/20" />
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
                          <Globe className="h-4 w-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors">{project.title}</h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map(tech => (
                      <span key={tech} className="text-xs bg-white/10 px-3 py-1 rounded-full border border-white/10">
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

      {/* Contact Section */}
      <footer id="contact" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Let&apos;s Connect</h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Have a project in mind or just want to say hi? I&apos;d love to hear from you.
            </p>
            <Button 
              className="bg-white text-purple-900 hover:bg-white/90 rounded-full px-10 h-14 text-lg font-semibold transition-all hover:scale-105"
              onClick={() => window.location.href = `mailto:${profile.email}`}
            >
              <Mail className="mr-2 h-5 w-5" />
              Get in Touch
            </Button>

            <div className="mt-12 pt-8 border-t border-white/10 text-white/40 text-sm">
              © {new Date().getFullYear()} {profile.fullName}. Crafted with care.
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

