"use client";

import { Github, Linkedin, Mail, MapPin, ExternalLink, Globe } from "lucide-react";
import type { PortfolioHero, FeaturedProject, PortfolioProfile } from "@/types/portfolio";

interface ProjectGridTemplateProps {
  hero: PortfolioHero;
  profile: PortfolioProfile;
  projects: FeaturedProject[];
  isPreview?: boolean;
}

export function ProjectGridTemplate({
  hero,
  profile,
  projects,
  isPreview = false,
}: ProjectGridTemplateProps) {
  const scale = isPreview ? "scale-[0.6] origin-top-left" : "";
  const containerWidth = isPreview ? "w-[166.67%]" : "w-full";

  return (
    <div className={`min-h-screen bg-gray-950 text-white ${scale} ${containerWidth}`}>
      {/* Sidebar + Main Content Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="sticky top-0 h-auto w-full shrink-0 border-b border-white/10 bg-linear-to-b from-gray-900 to-gray-950 p-8 lg:h-screen lg:w-80 lg:border-b-0 lg:border-r">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Avatar */}
            {hero.imageUrl && (
              <div className="relative mb-6">
                <div className="absolute -inset-1 rounded-full bg-linear-to-r from-cyan-500 to-purple-500 opacity-75 blur" />
                <img
                  src={hero.imageUrl}
                  alt={profile.fullName}
                  className="relative h-32 w-32 rounded-full border-4 border-gray-950 object-cover"
                />
              </div>
            )}

            {/* Name & Title */}
            <h1 className="text-2xl font-bold text-white">{profile.fullName}</h1>
            <p className="mt-1 bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-lg text-transparent">
              {hero.headline || profile.headline}
            </p>

            {/* Location */}
            {profile.location && (
              <div className="mt-4 flex items-center gap-2 text-white/50">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>
            )}

            {/* Bio */}
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              {hero.summary || profile.bio}
            </p>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-3">
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-white/60 transition-all hover:border-cyan-400/50 hover:text-cyan-400"
                >
                  <Mail className="h-5 w-5" />
                </a>
              )}
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-white/60 transition-all hover:border-cyan-400/50 hover:text-cyan-400"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-white/60 transition-all hover:border-cyan-400/50 hover:text-cyan-400"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {profile.website && (
                <a
                  href={profile.website}
                  className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-white/60 transition-all hover:border-cyan-400/50 hover:text-cyan-400"
                >
                  <Globe className="h-5 w-5" />
                </a>
              )}
            </div>

            {/* CTA */}
            {hero.ctaUrl && (
              <a
                href={hero.ctaUrl}
                className="mt-8 w-full rounded-xl bg-linear-to-r from-cyan-500 to-purple-500 py-3 text-center font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/25"
              >
                {hero.ctaText || "Get in Touch"}
              </a>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h2 className="mb-8 text-3xl font-bold">
            <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          {/* Project Grid */}
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-cyan-400/30"
              >
                {/* Project Image */}
                {project.imageUrl ? (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-linear-to-br from-cyan-500/10 to-purple-500/10">
                    <Globe className="h-12 w-12 text-white/20" />
                  </div>
                )}

                {/* Project Info */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-white/60">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  {project.techStack.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/60"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/60">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Links */}
                  <div className="mt-4 flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        className="inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white"
                      >
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    )}
                  </div>
                </div>

                {/* Featured Badge */}
                {project.isFeatured && (
                  <div className="absolute right-3 top-3 rounded-full bg-linear-to-r from-cyan-500 to-purple-500 px-2.5 py-0.5 text-xs font-medium text-white">
                    Featured
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Empty State */}
          {projects.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/20 py-16 text-center">
              <Globe className="mb-4 h-12 w-12 text-white/20" />
              <p className="text-white/50">No projects to display yet</p>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center">
        <p className="text-sm text-white/40">
          Built with{" "}
          <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            NeonCV
          </span>
        </p>
      </footer>
    </div>
  );
}

