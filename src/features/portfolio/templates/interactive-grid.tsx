"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Globe, ArrowUpRight, Code2, Layers, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PortfolioHero, PortfolioProfile, FeaturedProject } from "@/types/portfolio";

interface InteractiveGridTemplateProps {
  hero: PortfolioHero;
  profile: PortfolioProfile;
  projects: FeaturedProject[];
  isPreview?: boolean;
}

export function InteractiveGridTemplate({ hero, profile, projects, isPreview: _isPreview = false }: InteractiveGridTemplateProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8 font-sans">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[180px] gap-4"
      >
        {/* Hero Tile - Large */}
        <motion.div variants={item} className="md:col-span-4 lg:col-span-4 md:row-span-2 bg-white rounded-3xl p-8 md:p-12 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-colors" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for work
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-4">
              {hero.headline}
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl">
              {hero.summary}
            </p>
          </div>

          <div className="relative z-10 flex gap-4 pt-8">
            <Button className="rounded-full px-8 h-12 text-base" onClick={() => window.open(hero.ctaUrl, "_blank")}>
              {hero.ctaText}
            </Button>
            <Button variant="outline" className="rounded-full h-12 w-12 p-0" onClick={() => window.location.href = `mailto:${profile.email}`}>
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>

        {/* Profile Photo Tile */}
        <motion.div variants={item} className="md:col-span-2 lg:col-span-2 md:row-span-2 bg-gray-900 rounded-3xl overflow-hidden relative group">
          {profile.avatarUrl ? (
            <img 
              src={profile.avatarUrl} 
              alt={profile.fullName}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-indigo-500 to-purple-600">
              <span className="text-6xl font-bold text-white opacity-50">{profile.fullName.charAt(0)}</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent">
            <h3 className="text-white text-xl font-bold">{profile.fullName}</h3>
            <p className="text-white/70 text-sm">{profile.location}</p>
          </div>
        </motion.div>

        {/* Social Tiles */}
        <motion.div variants={item} className="md:col-span-1 bg-[#0077b5] text-white rounded-3xl p-6 flex flex-col justify-between hover:opacity-90 transition-opacity cursor-pointer" onClick={() => profile.linkedinUrl && window.open(profile.linkedinUrl, "_blank")}>
          <Linkedin className="h-8 w-8" />
          <span className="font-medium">LinkedIn</span>
        </motion.div>

        <motion.div variants={item} className="md:col-span-1 bg-[#333] text-white rounded-3xl p-6 flex flex-col justify-between hover:opacity-90 transition-opacity cursor-pointer" onClick={() => profile.githubUrl && window.open(profile.githubUrl, "_blank")}>
          <Github className="h-8 w-8" />
          <span className="font-medium">Github</span>
        </motion.div>

        {/* Tech Stack Tile */}
        <motion.div variants={item} className="md:col-span-2 bg-orange-50 rounded-3xl p-6 flex flex-col justify-between group hover:bg-orange-100 transition-colors">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-orange-100 rounded-2xl group-hover:bg-white transition-colors">
              <Layers className="h-6 w-6 text-orange-600" />
            </div>
            <ArrowUpRight className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Tailwind"].map(tech => (
                <span key={tech} className="text-xs font-medium bg-white px-2 py-1 rounded-md text-orange-800">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Section Header */}
        <motion.div variants={item} className="md:col-span-full mt-8 mb-4 flex items-center gap-4">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <div className="h-px flex-1 bg-gray-200" />
        </motion.div>

        {/* Project Tiles */}
        {projects.map((project) => (
          <motion.div 
            key={project.id}
            variants={item}
            className={`md:col-span-2 lg:col-span-3 md:row-span-2 bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all group flex flex-col`}
          >
            <div className="h-48 bg-gray-100 relative overflow-hidden">
              {project.imageUrl ? (
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <Code2 className="h-10 w-10 text-gray-300" />
                </div>
              )}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full shadow-sm hover:bg-blue-50 text-blue-600">
                    <Globe className="h-4 w-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-900">
                    <Github className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.slice(0, 3).map(tech => (
                  <span key={tech} className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-xs font-medium bg-gray-50 px-2 py-1 rounded-md text-gray-400">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Contact Tile */}
        <motion.div variants={item} className="md:col-span-full bg-black text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mt-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Ready to work together?</h2>
            <p className="text-white/60">I&apos;m currently available for freelance projects and open to full-time opportunities.</p>
          </div>
          <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-8 h-14 text-lg" onClick={() => window.location.href = `mailto:${profile.email}`}>
            Start a Conversation <Zap className="ml-2 h-5 w-5 fill-yellow-400 text-yellow-400" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
