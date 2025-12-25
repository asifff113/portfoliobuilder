"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, CheckCircle } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  client?: string;
  duration?: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics?: { label: string; value: string }[];
  techStack?: string[];
  images?: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
}

interface CaseStudyBlockProps {
  caseStudies: CaseStudy[];
  accentColor?: string;
}

export function CaseStudyBlock({ caseStudies, accentColor = "#06b6d4" }: CaseStudyBlockProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!caseStudies || caseStudies.length === 0) return null;

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Case Studies</h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Deep dives into projects showing problem, solution, and measurable results
          </p>
        </motion.div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
            >
              {/* Header */}
              <div className="p-8 border-b border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{study.title}</h3>
                    {study.client && (
                      <p className="text-white/50 mt-1">Client: {study.client}</p>
                    )}
                  </div>
                  {study.duration && (
                    <span className="px-4 py-1.5 rounded-full bg-white/5 text-white/60 text-sm">
                      {study.duration}
                    </span>
                  )}
                </div>

                {/* Tech Stack */}
                {study.techStack && study.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {study.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: accentColor + "20", color: accentColor }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Content Grid */}
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Challenge */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-sm">!</span>
                    The Challenge
                  </h4>
                  <p className="text-white/60 leading-relaxed">{study.challenge}</p>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm">✓</span>
                    The Solution
                  </h4>
                  <p className="text-white/60 leading-relaxed">{study.solution}</p>
                </div>
              </div>

              {/* Results */}
              <div className="px-8 pb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Key Results</h4>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {study.results.map((result, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: accentColor }} />
                      <span className="text-white/70">{result}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              {study.metrics && study.metrics.length > 0 && (
                <div className="px-8 pb-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {study.metrics.map((metric, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="text-center p-4 rounded-xl bg-white/5"
                      >
                        <p className="text-3xl font-bold" style={{ color: accentColor }}>
                          {metric.value}
                        </p>
                        <p className="text-white/50 text-sm mt-1">{metric.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="px-8 pb-8 flex gap-4">
                {study.liveUrl && (
                  <a
                    href={study.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: accentColor }}
                  >
                    View Live
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {study.caseStudyUrl && (
                  <a
                    href={study.caseStudyUrl}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium border border-white/20 text-white hover:bg-white/10 transition-colors"
                  >
                    Full Case Study
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
