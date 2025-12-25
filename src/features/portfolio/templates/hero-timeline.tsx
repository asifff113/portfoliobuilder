"use client";

import { Github, Linkedin, Mail, MapPin, ExternalLink } from "lucide-react";
import type { PortfolioHero, FeaturedProject, PortfolioProfile } from "@/types/portfolio";

interface HeroTimelineTemplateProps {
  hero: PortfolioHero;
  profile: PortfolioProfile;
  projects: FeaturedProject[];
  isPreview?: boolean;
}

export function HeroTimelineTemplate({
  hero,
  profile,
  projects,
  isPreview = false,
}: HeroTimelineTemplateProps) {
  const scale = isPreview ? "scale-[0.6] origin-top-left" : "";
  const containerWidth = isPreview ? "w-[166.67%]" : "w-full";

  return (
    <div className={`min-h-screen bg-gray-950 text-white ${scale} ${containerWidth}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 via-purple-500/10 to-pink-500/20" />
          <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-cyan-500/30 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/30 blur-3xl" style={{ animationDelay: "1s" }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-400">
                <MapPin className="h-4 w-4" />
                {profile.location || "Remote"}
              </div>

              <h1 className="text-5xl font-bold leading-tight lg:text-6xl">
                <span className="bg-linear-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                  {profile.fullName}
                </span>
              </h1>

              <p className="text-2xl font-light text-cyan-400">
                {hero.headline || profile.headline}
              </p>

              <p className="max-w-lg text-lg leading-relaxed text-white/70">
                {hero.summary || profile.bio}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                {hero.ctaUrl && (
                  <a
                    href={hero.ctaUrl}
                    className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-purple-500 px-6 py-3 font-medium text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40"
                  >
                    <Mail className="h-5 w-5" />
                    {hero.ctaText || "Get in Touch"}
                  </a>
                )}

                <div className="flex items-center gap-3">
                  {profile.githubUrl && (
                    <a
                      href={profile.githubUrl}
                      className="rounded-lg border border-white/10 bg-white/5 p-3 text-white/60 transition-all hover:border-cyan-400/50 hover:text-white"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {profile.linkedinUrl && (
                    <a
                      href={profile.linkedinUrl}
                      className="rounded-lg border border-white/10 bg-white/5 p-3 text-white/60 transition-all hover:border-cyan-400/50 hover:text-white"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Hero Image */}
            {hero.imageUrl && (
              <div className="relative mx-auto lg:mx-0">
                <div className="absolute -inset-4 rounded-3xl bg-linear-to-r from-cyan-500 to-purple-500 opacity-20 blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-white/10">
                  <img
                    src={hero.imageUrl}
                    alt={profile.fullName}
                    className="h-96 w-full object-cover lg:h-[28rem]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="relative py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-12 text-center text-3xl font-bold">
              <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>

            <div className="space-y-8">
              {projects.filter((p) => p.isFeatured).map((project, index) => (
                <div
                  key={project.id}
                  className={`flex flex-col gap-8 lg:flex-row ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Project Image */}
                  {project.imageUrl && (
                    <div className="relative flex-1">
                      <div className="absolute -inset-2 rounded-2xl bg-linear-to-r from-cyan-500/20 to-purple-500/20 blur-xl" />
                      <div className="relative overflow-hidden rounded-xl border border-white/10">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="aspect-video w-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Project Info */}
                  <div className="flex flex-1 flex-col justify-center space-y-4">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <p className="text-white/70">{project.description}</p>

                    {/* Tech Stack */}
                    {project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex items-center gap-4 pt-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          className="inline-flex items-center gap-2 text-white/60 hover:text-white"
                        >
                          <Github className="h-4 w-4" />
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-white/40">
            Built with{" "}
            <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              NeonCV
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}


