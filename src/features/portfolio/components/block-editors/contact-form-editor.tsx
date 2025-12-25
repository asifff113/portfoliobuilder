"use client";

import { useState } from "react";
import { Send, Mail, User, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactFormEditorProps {
  config: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    successMessage?: string;
    fields?: Array<{
      id: string;
      label: string;
      type: "text" | "email" | "textarea";
      required: boolean;
    }>;
  };
  onChange: (config: ContactFormEditorProps["config"]) => void;
}

const defaultFields = [
  { id: "name", label: "Name", type: "text" as const, required: true },
  { id: "email", label: "Email", type: "email" as const, required: true },
  { id: "message", label: "Message", type: "textarea" as const, required: true },
];

export function ContactFormEditor({ config, onChange }: ContactFormEditorProps) {
  const fields = config.fields || defaultFields;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Contact Form</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-white/70 mb-1">Title</label>
          <input
            type="text"
            value={config.title || ""}
            onChange={(e) => onChange({ ...config, title: e.target.value })}
            placeholder="Get in Touch"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-white/70 mb-1">Subtitle</label>
          <input
            type="text"
            value={config.subtitle || ""}
            onChange={(e) => onChange({ ...config, subtitle: e.target.value })}
            placeholder="I'd love to hear from you!"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">Button Text</label>
            <input
              type="text"
              value={config.buttonText || ""}
              onChange={(e) => onChange({ ...config, buttonText: e.target.value })}
              placeholder="Send Message"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Success Message</label>
            <input
              type="text"
              value={config.successMessage || ""}
              onChange={(e) => onChange({ ...config, successMessage: e.target.value })}
              placeholder="Thanks! I'll get back to you soon."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Form Preview */}
      <div className="mt-6 p-4 rounded-lg border border-white/10 bg-white/5">
        <p className="text-xs text-white/40 mb-3">Preview</p>
        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field.id}>
              <label className="block text-sm text-white/70 mb-1">{field.label}</label>
              {field.type === "textarea" ? (
                <div className="w-full h-20 rounded-lg border border-white/10 bg-white/5" />
              ) : (
                <div className="w-full h-10 rounded-lg border border-white/10 bg-white/5" />
              )}
            </div>
          ))}
          <Button className="neon-gradient w-full" disabled>
            <Send className="mr-2 h-4 w-4" />
            {config.buttonText || "Send Message"}
          </Button>
        </div>
      </div>
    </div>
  );
}
