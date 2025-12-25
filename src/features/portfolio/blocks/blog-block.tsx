"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight, ExternalLink, Tag } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  externalUrl?: string;
  readTime?: number;
}

interface BlogBlockProps {
  posts: BlogPost[];
  accentColor?: string;
}

export function BlogBlock({ posts, accentColor = "#06b6d4" }: BlogBlockProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Blog & Notes</h2>
          <p className="text-white/50">Thoughts, tutorials, and insights</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors"
            >
              {/* Meta */}
              <div className="flex items-center gap-4 mb-4 text-sm text-white/40">
                <time>{new Date(post.date).toLocaleDateString("en-US", { 
                  month: "short", 
                  day: "numeric", 
                  year: "numeric" 
                })}</time>
                {post.readTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime} min read
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-white/50 mb-4 line-clamp-2">{post.excerpt}</p>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md text-xs bg-white/5 text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Link */}
              {post.externalUrl ? (
                <a
                  href={post.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                  style={{ color: accentColor }}
                >
                  Read on Medium
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <button
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                  style={{ color: accentColor }}
                >
                  Read more
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
