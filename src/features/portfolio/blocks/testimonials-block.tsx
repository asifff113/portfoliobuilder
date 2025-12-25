"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import type { TestimonialItem } from "@/types/portfolio";

interface TestimonialsBlockProps {
  testimonials: TestimonialItem[];
  accentColor?: string;
}

export function TestimonialsBlock({ testimonials, accentColor = "#06b6d4" }: TestimonialsBlockProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-12 text-center"
        >
          What People Say
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                style={{ backgroundColor: accentColor + "30" }}
              />
              <div className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-colors">
                <Quote 
                  className="absolute top-4 right-4 h-8 w-8 opacity-20"
                  style={{ color: accentColor }}
                />
                
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}80)` }}
                  >
                    {testimonial.name ? testimonial.name[0].toUpperCase() : "?"}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-white/50">
                      {testimonial.role}
                      {testimonial.company && ` at ${testimonial.company}`}
                    </p>
                  </div>
                </div>

                <p className="text-white/70 mb-4 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>

                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= (testimonial.rating || 5)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
