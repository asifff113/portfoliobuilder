"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle, Loader2 } from "lucide-react";

interface NewsletterBlockProps {
  config: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    successMessage?: string;
    style?: "minimal" | "card" | "fullwidth";
  };
  accentColor?: string;
}

export function NewsletterBlock({ config, accentColor = "#06b6d4" }: NewsletterBlockProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    setEmail("");
  };

  const style = config.style || "card";

  return (
    <section className={`py-16 px-6 ${style === "fullwidth" ? "bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`max-w-2xl mx-auto ${
          style === "card" 
            ? "p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm" 
            : "text-center"
        }`}
      >
        <div className="flex justify-center mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: accentColor + "20" }}
          >
            <Sparkles className="w-6 h-6" style={{ color: accentColor }} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white text-center mb-2">
          {config.title || "Stay Updated"}
        </h2>
        <p className="text-white/50 text-center mb-6">
          {config.subtitle || "Get the latest updates delivered to your inbox"}
        </p>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: accentColor }} />
            <p className="text-white font-medium">
              {config.successMessage || "Thanks for subscribing!"}
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none"
            />
            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-xl font-semibold text-white flex items-center gap-2"
              style={{ backgroundColor: accentColor }}
            >
              {status === "loading" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                config.buttonText || "Subscribe"
              )}
            </motion.button>
          </form>
        )}

        <p className="text-white/30 text-xs text-center mt-4">
          No spam, unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
}
