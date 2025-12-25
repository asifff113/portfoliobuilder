"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Star } from "lucide-react";
import type { ServiceItem } from "@/types/portfolio";

interface ServicesBlockProps {
  services: ServiceItem[];
  accentColor?: string;
}

export function ServicesBlock({ services, accentColor = "#06b6d4" }: ServicesBlockProps) {
  if (!services || services.length === 0) return null;

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Services</h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Professional services tailored to your needs
          </p>
        </motion.div>

        <div className={`grid gap-6 ${services.length === 1 ? "max-w-md mx-auto" : services.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : "md:grid-cols-2 lg:grid-cols-3"}`}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group rounded-2xl border bg-white/5 p-8 transition-all hover:bg-white/10 ${
                service.isPopular 
                  ? "border-2 scale-105" 
                  : "border-white/10"
              }`}
              style={{ borderColor: service.isPopular ? accentColor : undefined }}
            >
              {/* Popular badge */}
              {service.isPopular && (
                <div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                  style={{ backgroundColor: accentColor, color: "white" }}
                >
                  <Star className="w-3 h-3" fill="currentColor" />
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-white/50 text-sm">{service.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span 
                  className="text-3xl font-bold"
                  style={{ color: accentColor }}
                >
                  {service.price}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {(service.features || []).map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70">
                    <CheckCircle 
                      className="w-5 h-5 shrink-0 mt-0.5" 
                      style={{ color: accentColor }} 
                    />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-opacity hover:opacity-90 ${
                  service.isPopular ? "text-white" : "text-white border border-white/20 hover:bg-white/10"
                }`}
                style={{ backgroundColor: service.isPopular ? accentColor : undefined }}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
