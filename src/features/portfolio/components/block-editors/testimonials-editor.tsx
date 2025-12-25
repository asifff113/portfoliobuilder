"use client";

import { useState } from "react";
import { Plus, Trash2, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { TestimonialItem } from "@/types/portfolio";

interface TestimonialsEditorProps {
  testimonials: TestimonialItem[];
  onChange: (testimonials: TestimonialItem[]) => void;
}

export function TestimonialsEditor({ testimonials, onChange }: TestimonialsEditorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addTestimonial = () => {
    const newTestimonial: TestimonialItem = {
      id: crypto.randomUUID(),
      name: "",
      role: "",
      company: "",
      quote: "",
      avatarUrl: null,
      rating: 5,
    };
    onChange([...testimonials, newTestimonial]);
    setExpandedId(newTestimonial.id);
  };

  const updateTestimonial = (id: string, updates: Partial<TestimonialItem>) => {
    onChange(testimonials.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTestimonial = (id: string) => {
    onChange(testimonials.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Testimonials</h3>
        <Button onClick={addTestimonial} size="sm" className="neon-gradient">
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      {testimonials.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/20 p-8 text-center">
          <User className="mx-auto mb-4 h-12 w-12 text-white/30" />
          <p className="text-white/50">No testimonials yet. Add client reviews to build trust.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-white/10 bg-white/5 p-4 cursor-pointer hover:bg-white/10 transition-colors"
              onClick={() => setExpandedId(expandedId === testimonial.id ? null : testimonial.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {testimonial.name ? testimonial.name[0].toUpperCase() : "?"}
                  </div>
                  <div>
                    <p className="font-medium text-white">{testimonial.name || "Unnamed"}</p>
                    <p className="text-sm text-white/50">{testimonial.role} {testimonial.company && `at ${testimonial.company}`}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= (testimonial.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-white/20"}`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => { e.stopPropagation(); deleteTestimonial(testimonial.id); }}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {expandedId === testimonial.id && (
                <div className="mt-4 space-y-4 border-t border-white/10 pt-4" onClick={(e) => e.stopPropagation()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/70 mb-1">Name</label>
                      <input
                        type="text"
                        value={testimonial.name}
                        onChange={(e) => updateTestimonial(testimonial.id, { name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-1">Role</label>
                      <input
                        type="text"
                        value={testimonial.role}
                        onChange={(e) => updateTestimonial(testimonial.id, { role: e.target.value })}
                        placeholder="CEO"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Company</label>
                    <input
                      type="text"
                      value={testimonial.company}
                      onChange={(e) => updateTestimonial(testimonial.id, { company: e.target.value })}
                      placeholder="Acme Inc."
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Quote</label>
                    <textarea
                      value={testimonial.quote}
                      onChange={(e) => updateTestimonial(testimonial.id, { quote: e.target.value })}
                      placeholder="Working with them was an amazing experience..."
                      rows={3}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => updateTestimonial(testimonial.id, { rating: star })}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`h-6 w-6 ${star <= (testimonial.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-white/20"}`}
                          />
                        </button>
                      ))}
                    </div>
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
