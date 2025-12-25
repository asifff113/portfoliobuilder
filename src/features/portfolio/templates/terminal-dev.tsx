"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Terminal, FolderOpen, FileCode, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PortfolioHero, PortfolioProfile, FeaturedProject, PortfolioBlock } from "@/types/portfolio";

interface TerminalDevTemplateProps {
  hero: PortfolioHero;
  profile: PortfolioProfile;
  projects: FeaturedProject[];
  blocks?: PortfolioBlock[];
  isPreview?: boolean;
}

// Typing animation hook
function useTypingEffect(text: string, speed: number = 50) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    setIsComplete(false);
    
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isComplete };
}

export function TerminalDevTemplate({ hero, profile, projects, blocks: _blocks, isPreview: _isPreview = false }: TerminalDevTemplateProps) {
  const { displayedText: heroText, isComplete: heroComplete } = useTypingEffect(hero.headline, 40);
  const username = profile.fullName.toLowerCase().replace(/\s+/g, "");

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono">
      {/* Terminal Header */}
      <header className="sticky top-0 z-50 bg-[#161b22] border-b border-[#30363d] px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-sm text-[#8b949e]">{username}@portfolio ~ %</span>
          </div>
          <div className="flex gap-4 text-sm">
            <a href="#about" className="text-[#58a6ff] hover:underline">./about</a>
            <a href="#projects" className="text-[#58a6ff] hover:underline">./projects</a>
            <a href="#contact" className="text-[#58a6ff] hover:underline">./contact</a>
          </div>
        </div>
      </header>

      {/* Hero Terminal */}
      <section className="min-h-[80vh] flex items-center px-4 py-20">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden shadow-2xl"
          >
            {/* Terminal Title Bar */}
            <div className="bg-[#21262d] px-4 py-2 border-b border-[#30363d] flex items-center gap-3">
              <Terminal className="h-4 w-4 text-[#8b949e]" />
              <span className="text-sm text-[#8b949e]">bash — 80×24</span>
            </div>

            {/* Terminal Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-2">
                <span className="text-[#27c93f]">➜</span>
                <span className="text-[#58a6ff]">~</span>
                <span className="text-white">cat welcome.txt</span>
              </div>
              
              <div className="pl-4 space-y-2">
                <p className="text-2xl md:text-4xl font-bold text-white">
                  {heroText}
                  {!heroComplete && <span className="animate-pulse text-[#27c93f]">▋</span>}
                </p>
              </div>

              <div className="flex items-start gap-2 pt-4">
                <span className="text-[#27c93f]">➜</span>
                <span className="text-[#58a6ff]">~</span>
                <span className="text-white">echo $BIO</span>
              </div>
              
              <div className="pl-4">
                <p className="text-[#8b949e] leading-relaxed">{hero.summary}</p>
              </div>

              <div className="flex items-start gap-2 pt-4">
                <span className="text-[#27c93f]">➜</span>
                <span className="text-[#58a6ff]">~</span>
                <span className="text-white">ls -la social/</span>
              </div>
              
              <div className="pl-4 flex flex-wrap gap-4 pt-2">
                {profile.githubUrl && (
                  <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#58a6ff] hover:underline">
                    <Github className="h-4 w-4" />
                    github
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#58a6ff] hover:underline">
                    <Linkedin className="h-4 w-4" />
                    linkedin
                  </a>
                )}
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-[#58a6ff] hover:underline">
                    <Mail className="h-4 w-4" />
                    email
                  </a>
                )}
              </div>

              <div className="flex items-start gap-2 pt-4">
                <span className="text-[#27c93f]">➜</span>
                <span className="text-[#58a6ff]">~</span>
                <span className="text-white animate-pulse">▋</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
            <div className="bg-[#21262d] px-4 py-2 border-b border-[#30363d] flex items-center gap-3">
              <FolderOpen className="h-4 w-4 text-[#8b949e]" />
              <span className="text-sm text-[#8b949e]">projects/</span>
            </div>

            <div className="divide-y divide-[#30363d]">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 hover:bg-[#21262d]/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <FileCode className="h-4 w-4 text-[#8b949e]" />
                        <h3 className="font-bold text-[#58a6ff] group-hover:underline truncate">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-sm text-[#8b949e] mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map(tech => (
                          <span key={tech} className="text-xs px-2 py-1 bg-[#21262d] rounded-full text-[#7ee787]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 shrink-0">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-[#30363d] rounded transition-colors text-[#8b949e] hover:text-white"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-[#30363d] rounded transition-colors text-[#8b949e] hover:text-white"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="py-20 px-4 border-t border-[#30363d]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
            <div className="flex items-start gap-2 mb-4">
              <span className="text-[#27c93f]">➜</span>
              <span className="text-[#58a6ff]">~</span>
              <span className="text-white">./contact.sh</span>
            </div>
            
            <div className="pl-4 space-y-4">
              <p className="text-[#8b949e]">
                # Ready to collaborate? Run the command below:
              </p>
              
              <div className="flex items-center gap-2 bg-[#21262d] px-4 py-3 rounded">
                <ChevronRight className="h-4 w-4 text-[#27c93f]" />
                <code className="text-[#ff7b72]">mail</code>
                <code className="text-white">-s</code>
                <code className="text-[#a5d6ff]">&quot;Hello&quot;</code>
                <code className="text-[#58a6ff]">{profile.email}</code>
              </div>

              <Button 
                className="bg-[#238636] hover:bg-[#2ea043] text-white rounded-md px-6 py-2 mt-4"
                onClick={() => window.location.href = `mailto:${profile.email}`}
              >
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </div>

          <div className="mt-12 text-center text-[#8b949e] text-sm">
            <p>/* {profile.fullName} © {new Date().getFullYear()} — Built with NeonCV */</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

