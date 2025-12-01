"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCVStore } from "../store";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
} from "lucide-react";

export function PersonalInfoForm() {
  const { personalInfo, updatePersonalInfo } = useCVStore();

  return (
    <div className="space-y-4">
      {/* Name & Headline */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="headline">Professional Headline</Label>
          <Input
            id="headline"
            placeholder="Senior Software Engineer"
            value={personalInfo.headline}
            onChange={(e) => updatePersonalInfo({ headline: e.target.value })}
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-3 w-3" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-3 w-3" />
            Phone
          </Label>
          <Input
            id="phone"
            placeholder="+1 (555) 123-4567"
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
          />
        </div>
      </div>

      {/* Location & Website */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            Location
          </Label>
          <Input
            id="location"
            placeholder="San Francisco, CA"
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website" className="flex items-center gap-2">
            <Globe className="h-3 w-3" />
            Website
          </Label>
          <Input
            id="website"
            placeholder="https://johndoe.com"
            value={personalInfo.website}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center gap-2">
            <Linkedin className="h-3 w-3" />
            LinkedIn
          </Label>
          <Input
            id="linkedin"
            placeholder="https://linkedin.com/in/johndoe"
            value={personalInfo.linkedinUrl}
            onChange={(e) => updatePersonalInfo({ linkedinUrl: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="github" className="flex items-center gap-2">
            <Github className="h-3 w-3" />
            GitHub
          </Label>
          <Input
            id="github"
            placeholder="https://github.com/johndoe"
            value={personalInfo.githubUrl}
            onChange={(e) => updatePersonalInfo({ githubUrl: e.target.value })}
          />
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <textarea
          id="summary"
          rows={4}
          placeholder="A brief summary of your professional background, key skills, and career objectives..."
          value={personalInfo.summary}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
}

