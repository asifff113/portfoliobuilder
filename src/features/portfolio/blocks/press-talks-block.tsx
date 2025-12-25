"use client";

import { motion } from "framer-motion";
import { Mic, Video, Calendar, MapPin, ExternalLink, Award } from "lucide-react";

interface PressItem {
  id: string;
  type: "talk" | "podcast" | "article" | "award" | "interview";
  title: string;
  venue?: string;
  date: string;
  location?: string;
  description?: string;
  link?: string;
  imageUrl?: string;
}

interface PressTalksBlockProps {
  items: PressItem[];
  accentColor?: string;
}

const typeIcons = {
  talk: <Mic className="w-5 h-5" />,
  podcast: <Mic className="w-5 h-5" />,
  article: <ExternalLink className="w-5 h-5" />,
  award: <Award className="w-5 h-5" />,
  interview: <Video className="w-5 h-5" />,
};

const typeLabels = {
  talk: "Talk",
  podcast: "Podcast",
  article: "Article",
  award: "Award",
  interview: "Interview",
};

export function PressTalksBlock({ items, accentColor = "#06b6d4" }: PressTalksBlockProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Press & Talks</h2>
          <p className="text-white/50">Conferences, podcasts, and media features</p>
        </motion.div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="flex gap-6 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                {/* Type Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: accentColor + "20", color: accentColor }}
                >
                  {typeIcons[item.type]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{ backgroundColor: accentColor + "20", color: accentColor }}
                    >
                      {typeLabels[item.type]}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>

                  {item.venue && (
                    <p className="text-white/60 mb-2">{item.venue}</p>
                  )}

                  {item.description && (
                    <p className="text-white/50 text-sm line-clamp-2">{item.description}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-white/40">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Image */}
                {item.imageUrl && (
                  <div className="hidden md:block w-32 h-20 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Arrow */}
                {item.link && (
                  <div className="flex items-center">
                    <ExternalLink className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
