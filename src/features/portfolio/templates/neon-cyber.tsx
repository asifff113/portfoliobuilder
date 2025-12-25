"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Code, Terminal, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PortfolioHero, PortfolioProfile, FeaturedProject } from "@/types/portfolio";

interface NeonCyberTemplateProps {
  hero: PortfolioHero;
  profile: PortfolioProfile;
  projects: FeaturedProject[];
  isPreview?: boolean;
}

export function NeonCyberTemplate({ hero, profile, projects, isPreview = false }: NeonCyberTemplateProps) {
  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-cyan-500/30 selection:text-cyan-200 relative">
      {/* Background Grid & Effects */}
      <div className={`${isPreview ? 'absolute' : 'fixed'} inset-0 z-0 pointer-events-none`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-cyan-900/10 via-transparent to-transparent opacity-50" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          {/* Glitch Effect Title */}
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse">
              {hero.headline}
            </h1>
            <div className="absolute -inset-1 bg-cyan-500/20 blur-xl -z-10" />
          </div>

          <p className="text-lg md:text-xl text-cyan-100/70 max-w-2xl mx-auto leading-relaxed border-l-2 border-cyan-500/50 pl-6 text-left font-light">
            {hero.summary}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
            <Button 
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-none border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] transition-all"
              onClick={() => window.open(hero.ctaUrl, "_blank")}
            >
              <Terminal className="mr-2 h-5 w-5" />
              {hero.ctaText}
            </Button>
            
            <div className="flex gap-4 px-6 border-l border-white/10">
              {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-cyan-400 transition-colors">
                  <Github className="h-6 w-6" />
                </a>
              )}
              {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-purple-400 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="text-white/50 hover:text-pink-400 transition-colors">
                  <Mail className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cyan-500/50"
        >
          <span className="text-xs uppercase tracking-widest">System Online</span>
          <div className="w-px h-12 bg-linear-to-b from-cyan-500/50 to-transparent" />
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="relative z-10 py-32 px-6 bg-black/50 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 flex items-center gap-3">
                <Cpu className="h-8 w-8 text-purple-500" />
                Projects_Protocol
              </h2>
              <p className="text-white/50 font-mono text-sm">Executing deployment sequence...</p>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-xs text-cyan-500 mb-1">SYSTEM STATUS</div>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i < 4 ? 'bg-green-500' : 'bg-green-900'} animate-pulse`} style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-gray-900/50 border border-white/10 hover:border-cyan-500/50 transition-colors overflow-hidden"
              >
                {/* Cyber Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="aspect-video bg-gray-800 relative overflow-hidden group-hover:opacity-90 transition-opacity">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-800 to-gray-900">
                      <Code className="h-12 w-12 text-white/10 group-hover:text-cyan-500/50 transition-colors" />
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-xs">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-cyan-500 text-black hover:bg-cyan-400 transition-colors rounded-full"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 text-white hover:bg-white/20 transition-colors rounded-full backdrop-blur-md"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors font-mono">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-sm mt-2 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2 py-1 text-xs font-medium bg-cyan-950/30 text-cyan-300 border border-cyan-900/50"
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

      {/* Footer / Contact */}
      <footer className="relative z-10 py-20 px-6 border-t border-white/10 bg-black">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 mx-auto bg-linear-to-br from-cyan-500 to-purple-600 rounded-full blur-2xl opacity-20" />
          
          <h2 className="text-3xl font-bold text-white">Initialize Connection</h2>
          <p className="text-white/50 max-w-md mx-auto">
            Ready to collaborate on the next big project? Send a transmission.
          </p>

          <Button 
            size="lg"
            variant="outline"
            className="border-white/20 hover:border-cyan-500 hover:text-cyan-400 hover:bg-cyan-950/30 transition-all"
            onClick={() => window.location.href = `mailto:${profile.email}`}
          >
            <Mail className="mr-2 h-4 w-4" />
            {profile.email}
          </Button>

          <div className="pt-12 text-xs text-white/30 font-mono">
            <p>© {new Date().getFullYear()} {profile.fullName}. All systems operational.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

