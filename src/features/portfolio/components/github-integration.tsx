"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, Code2, ExternalLink, Loader2 } from "lucide-react";

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

interface GitHubIntegrationProps {
  username: string;
  maxRepos?: number;
  showPinned?: boolean;
  accentColor?: string;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  Rust: "#dea584",
  Go: "#00add8",
  Java: "#b07219",
  "C++": "#f34b7d",
  Ruby: "#701516",
  PHP: "#4f5d95",
  Swift: "#fa7343",
  Kotlin: "#a97bff",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

export function GitHubIntegration({
  username,
  maxRepos = 6,
  accentColor = "#06b6d4",
}: GitHubIntegrationProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      if (!username) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=stars&per_page=${maxRepos}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repos");
        }

        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError("Could not load GitHub repos");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username, maxRepos]);

  if (loading) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-white/50" />
        </div>
      </section>
    );
  }

  if (error || repos.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Open Source</h2>
            <p className="text-white/50">Featured repositories from GitHub</p>
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Code2 className="w-4 h-4" />
            View All
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo, index) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {repo.name}
                </h3>
                <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
              </div>

              <p className="text-sm text-white/50 mb-4 line-clamp-2">
                {repo.description || "No description"}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-white/40">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: languageColors[repo.language] || "#888" }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />
                    {repo.forks_count}
                  </span>
                </div>
              </div>

              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-0.5 rounded text-xs bg-white/5 text-white/40"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
