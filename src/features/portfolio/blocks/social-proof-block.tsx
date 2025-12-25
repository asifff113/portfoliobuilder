"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { SocialProofItem } from "@/types/portfolio";

interface SocialProofBlockProps {
  items: SocialProofItem[];
  accentColor?: string;
}

export function SocialProofBlock({ items, accentColor = "#06b6d4" }: SocialProofBlockProps) {
  if (!items || items.length === 0) return null;

  const logos = items.filter((i) => i.type === "logo");
  const badges = items.filter((i) => i.type === "badge" || i.type === "award");

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Logos Row */}
        {logos.length > 0 && (
          <div className="mb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-white/40 text-sm uppercase tracking-wider mb-8"
            >
              Trusted by
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
            >
              {logos.map((logo, index) => (
                <motion.div
                  key={logo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="group"
                >
                  {logo.link ? (
                    <a href={logo.link} target="_blank" rel="noopener noreferrer">
                      {logo.imageUrl ? (
                        <img
                          src={logo.imageUrl}
                          alt={logo.title}
                          className="h-8 md:h-10 w-auto object-contain opacity-50 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                        />
                      ) : (
                        <span className="text-white/50 group-hover:text-white font-medium transition-colors">
                          {logo.title}
                        </span>
                      )}
                    </a>
                  ) : logo.imageUrl ? (
                    <img
                      src={logo.imageUrl}
                      alt={logo.title}
                      className="h-8 md:h-10 w-auto object-contain opacity-50 grayscale"
                    />
                  ) : (
                    <span className="text-white/50 font-medium">{logo.title}</span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Badges & Awards */}
        {badges.length > 0 && (
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-white/40 text-sm uppercase tracking-wider mb-8"
            >
              Certifications & Awards
            </motion.p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  {badge.link ? (
                    <a
                      href={badge.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      {badge.imageUrl && (
                        <img src={badge.imageUrl} alt="" className="w-8 h-8 object-contain" />
                      )}
                      <span className="text-white/80 font-medium">{badge.title}</span>
                      <ExternalLink className="w-3 h-3 text-white/30 group-hover:text-white/60 transition-colors" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5">
                      {badge.imageUrl && (
                        <img src={badge.imageUrl} alt="" className="w-8 h-8 object-contain" />
                      )}
                      <span className="text-white/80 font-medium">{badge.title}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
