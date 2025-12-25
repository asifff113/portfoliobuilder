"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, ArrowRight } from "lucide-react";
import type { PortfolioHero, FeaturedProject } from "@/types/portfolio";

interface ThreeDCardsTemplateProps {
  hero: PortfolioHero;
  projects: FeaturedProject[];
  isPreview?: boolean;
}

// 3D Tilt Card Component
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Floating Gradient Background
function FloatingGradient({ isPreview = false }: { isPreview?: boolean }) {
  return (
    <div className={`${isPreview ? 'absolute' : 'fixed'} inset-0 overflow-hidden pointer-events-none`}>
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-purple-500/20 via-transparent to-transparent blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 100, -50, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-cyan-500/20 via-transparent to-transparent blur-3xl"
      />
    </div>
  );
}

export function ThreeDCardsTemplate({ hero, projects, isPreview = false }: ThreeDCardsTemplateProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      <FloatingGradient isPreview={isPreview} />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 py-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-white/10 text-sm mb-6"
              >
                ✨ Available for work
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              >
                {hero.headline || (
                  <>
                    I craft <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">digital</span>{" "}
                    experiences
                  </>
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white/60 mb-8 max-w-xl"
              >
                {hero.summary || "Full-stack developer specializing in modern web technologies and immersive user experiences."}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#projects"
                  className="group px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                {hero.email && (
                  <a
                    href={`mailto:${hero.email}`}
                    className="px-6 py-3 border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition-colors"
                  >
                    Contact Me
                  </a>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex gap-4 mt-10"
              >
                {hero.socialLinks?.github && (
                  <a href={hero.socialLinks.github} className="p-2 text-white/50 hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {hero.socialLinks?.linkedin && (
                  <a href={hero.socialLinks.linkedin} className="p-2 text-white/50 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </motion.div>
            </motion.div>

            {/* 3D Avatar Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:justify-end"
              style={{ perspective: "1000px" }}
            >
              <TiltCard className="relative">
                <div className="w-80 h-96 rounded-3xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 backdrop-blur-sm overflow-hidden">
                  {hero.avatarUrl ? (
                    <img src={hero.avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">👨‍💻</div>
                  )}
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
                  
                  {/* Floating decorative elements */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-purple-500/30 blur-2xl"
                    style={{ transform: "translateZ(40px)" }}
                  />
                  <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-cyan-500/30 blur-2xl"
                    style={{ transform: "translateZ(40px)" }}
                  />
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Work</span>
              </h2>
              <p className="text-white/50 text-lg">Projects that showcase my expertise</p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1000px" }}>
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TiltCard className="h-full">
                    <div className="h-full rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 overflow-hidden group">
                      {project.imageUrl && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6" style={{ transform: "translateZ(30px)" }}>
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-white/50 text-sm mb-4 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags?.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 rounded-md text-xs bg-white/5 text-white/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                            >
                              Live Demo <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              className="text-sm text-white/50 hover:text-white flex items-center gap-1"
                            >
                              <Github className="w-3 h-3" /> Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
            style={{ perspective: "1000px" }}
          >
            <TiltCard>
              <div className="p-12 rounded-3xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to start a project?
                </h2>
                <p className="text-white/60 mb-8 max-w-xl mx-auto">
                  Let&apos;s collaborate and create something amazing together.
                </p>
                {hero.email && (
                  <a
                    href={`mailto:${hero.email}`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Mail className="w-5 h-5" />
                    Let&apos;s Talk
                  </a>
                )}
              </div>
            </TiltCard>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

