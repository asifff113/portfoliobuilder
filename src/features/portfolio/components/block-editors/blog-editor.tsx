"use client";

import { useState } from "react";
import { Plus, Trash2, FileText, Link, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  externalUrl?: string;
  readTime?: number;
}

interface BlogEditorProps {
  posts: BlogPost[];
  onChange: (posts: BlogPost[]) => void;
}

export function BlogEditor({ posts, onChange }: BlogEditorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addPost = () => {
    const newPost: BlogPost = {
      id: crypto.randomUUID(),
      title: "",
      excerpt: "",
      date: new Date().toISOString().split("T")[0],
      tags: [],
    };
    onChange([...posts, newPost]);
    setExpandedId(newPost.id);
  };

  const updatePost = (id: string, updates: Partial<BlogPost>) => {
    onChange(posts.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deletePost = (id: string) => {
    onChange(posts.filter((p) => p.id !== id));
  };

  const addTag = (postId: string, tag: string) => {
    const post = posts.find((p) => p.id === postId);
    if (post && tag.trim() && !post.tags.includes(tag.trim())) {
      updatePost(postId, { tags: [...post.tags, tag.trim()] });
    }
  };

  const removeTag = (postId: string, tag: string) => {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      updatePost(postId, { tags: post.tags.filter((t) => t !== tag) });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-cyan-400" />
          Blog / Notes
        </h3>
        <Button onClick={addPost} size="sm" className="neon-gradient">
          <Plus className="mr-2 h-4 w-4" />
          Add Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/20 p-8 text-center">
          <FileText className="mx-auto mb-4 h-12 w-12 text-white/30" />
          <p className="text-white/50">No blog posts yet. Add articles or notes to share.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="border-white/10 bg-white/5 p-4 cursor-pointer hover:bg-white/10 transition-colors"
              onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">{post.title || "Untitled Post"}</p>
                  <p className="text-sm text-white/50">{post.date}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePost(post.id);
                  }}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {expandedId === post.id && (
                <div
                  className="mt-4 space-y-4 border-t border-white/10 pt-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Title</label>
                    <input
                      type="text"
                      value={post.title}
                      onChange={(e) => updatePost(post.id, { title: e.target.value })}
                      placeholder="My Latest Article"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 mb-1">Excerpt</label>
                    <textarea
                      value={post.excerpt}
                      onChange={(e) => updatePost(post.id, { excerpt: e.target.value })}
                      placeholder="A brief summary of the post..."
                      rows={3}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/70 mb-1">Date</label>
                      <input
                        type="date"
                        value={post.date}
                        onChange={(e) => updatePost(post.id, { date: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-1">Read Time (min)</label>
                      <input
                        type="number"
                        value={post.readTime || ""}
                        onChange={(e) =>
                          updatePost(post.id, { readTime: parseInt(e.target.value) || undefined })
                        }
                        placeholder="5"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 mb-1">External URL (optional)</label>
                    <div className="flex gap-2">
                      <Link className="h-5 w-5 text-white/30 mt-2" />
                      <input
                        type="url"
                        value={post.externalUrl || ""}
                        onChange={(e) => updatePost(post.id, { externalUrl: e.target.value })}
                        placeholder="https://medium.com/@you/article"
                        className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(post.id, tag)}
                            className="hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Add tag and press Enter"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addTag(post.id, e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
