"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import type { PortfolioHero, FeaturedProject } from "@/types/portfolio";

interface ParticleNetworkTemplateProps {
  hero: PortfolioHero;
  projects: FeaturedProject[];
  isPreview?: boolean;
}

// Particle Network Canvas Component
function ParticleCanvas({ isPreview = false }: { isPreview?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];
    const mouse = { x: 0, y: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.8)";
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - distance / 150)})`;
            ctx.stroke();
          }
        });

        // Connect to mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.4 * (1 - distance / 200)})`;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.lineWidth = 1;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`${isPreview ? 'absolute' : 'fixed'} inset-0 z-0 pointer-events-none`}
      style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)" }}
    />
  );
}

export function ParticleNetworkTemplate({ hero, projects, isPreview = false }: ParticleNetworkTemplateProps) {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ParticleCanvas isPreview={isPreview} />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {hero.avatarUrl && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden ring-4 ring-cyan-500/30"
              >
                <img src={hero.avatarUrl} alt="" className="w-full h-full object-cover" />
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {hero.headline || "Creative Developer"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/60 mb-8 max-w-2xl mx-auto"
            >
              {hero.summary || "Building digital experiences that matter"}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 justify-center"
            >
              <a href="#projects" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:opacity-90 transition-opacity">
                View Work
              </a>
              <a href="#contact" className="px-8 py-4 border border-white/20 rounded-full font-semibold hover:bg-white/10 transition-colors">
                Contact Me
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-6 justify-center mt-12"
            >
              {hero.socialLinks?.github && (
                <a href={hero.socialLinks.github} className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
              )}
              {hero.socialLinks?.linkedin && (
                <a href={hero.socialLinks.linkedin} className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {hero.email && (
                <a href={`mailto:${hero.email}`} className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, y: { repeat: Infinity, duration: 1.5 } }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-bounce" />
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center mb-16"
            >
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </motion.h2>

            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm"
                >
                  {project.imageUrl && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/50 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Let&apos;s Connect
              </span>
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Have a project in mind? I&apos;d love to hear from you.
            </p>
            {hero.email && (
              <a
                href={`mailto:${hero.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                <Mail className="w-5 h-5" />
                Get in Touch
              </a>
            )}
          </motion.div>
        </section>
      </div>
    </div>
  );
}

