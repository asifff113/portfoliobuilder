"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, ExternalLink } from "lucide-react";
import type { GalleryItem } from "@/types/portfolio";

interface GalleryBlockProps {
  items: GalleryItem[];
  accentColor?: string;
}

export function GalleryBlock({ items, accentColor = "#06b6d4" }: GalleryBlockProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const goNext = () => setSelectedIndex((prev) => (prev !== null ? (prev + 1) % items.length : null));
  const goPrev = () => setSelectedIndex((prev) => (prev !== null ? (prev - 1 + items.length) % items.length : null));

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-12 text-center"
        >
          Gallery
        </motion.h2>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="break-inside-avoid group cursor-pointer relative rounded-xl overflow-hidden"
              onClick={() => openLightbox(index)}
            >
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={item.caption || ""}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="relative aspect-video bg-black">
                  <video src={item.url} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Play className="w-6 h-6 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                {item.caption && (
                  <p className="absolute bottom-4 left-4 right-4 text-white text-sm">
                    {item.caption}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
              onClick={closeLightbox}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation */}
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Content */}
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-5xl max-h-[85vh] m-4"
                onClick={(e) => e.stopPropagation()}
              >
                {items[selectedIndex].type === "image" ? (
                  <img
                    src={items[selectedIndex].url}
                    alt={items[selectedIndex].caption || ""}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  />
                ) : (
                  <video
                    src={items[selectedIndex].url}
                    controls
                    autoPlay
                    className="max-w-full max-h-[80vh] rounded-lg"
                  />
                )}
                {items[selectedIndex].caption && (
                  <p className="text-white/70 text-center mt-4">
                    {items[selectedIndex].caption}
                  </p>
                )}
              </motion.div>

              {/* Thumbnail strip */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={(e) => { e.stopPropagation(); setSelectedIndex(index); }}
                    className={`w-12 h-12 rounded overflow-hidden transition-all ${
                      index === selectedIndex ? "ring-2 ring-white" : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    {item.type === "image" ? (
                      <img src={item.url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-white/20 flex items-center justify-center">
                        <Play className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
