"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Eye, FileText, ExternalLink, Copy, Check } from "lucide-react";

interface PlaygroundItem {
  id: string;
  title: string;
  description?: string;
  embedUrl?: string; // CodePen, CodeSandbox, etc.
  codeSnippet?: string;
  language?: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface PlaygroundBlockProps {
  items: PlaygroundItem[];
  accentColor?: string;
}

export function PlaygroundBlock({ items, accentColor = "#06b6d4" }: PlaygroundBlockProps) {
  const [activeTab, setActiveTab] = useState<Record<string, "preview" | "code">>(
    items.reduce((acc, item) => ({ ...acc, [item.id]: "preview" }), {})
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!items || items.length === 0) return null;

  const copyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Playground</h2>
          <p className="text-white/50">Interactive demos and code experiments</p>
        </motion.div>

        <div className="space-y-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-white/50 mt-0.5">{item.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Tab Switcher */}
                  <div className="flex rounded-lg bg-white/5 p-1">
                    <button
                      onClick={() => setActiveTab({ ...activeTab, [item.id]: "preview" })}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                        activeTab[item.id] === "preview"
                          ? "bg-white/10 text-white"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    {item.codeSnippet && (
                      <button
                        onClick={() => setActiveTab({ ...activeTab, [item.id]: "code" })}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                          activeTab[item.id] === "code"
                            ? "bg-white/10 text-white"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        <Code className="w-4 h-4" />
                        Code
                      </button>
                    )}
                  </div>

                  {/* Links */}
                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                {activeTab[item.id] === "preview" ? (
                  <div className="aspect-video bg-black/20">
                    {item.embedUrl ? (
                      <iframe
                        src={item.embedUrl}
                        className="w-full h-full border-0"
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/30">
                        <FileText className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <pre className="p-6 overflow-x-auto text-sm">
                      <code className="text-white/80">{item.codeSnippet}</code>
                    </pre>
                    <button
                      onClick={() => copyCode(item.id, item.codeSnippet || "")}
                      className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-white/50" />
                      )}
                    </button>
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
