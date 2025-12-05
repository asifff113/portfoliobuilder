"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCVStore } from "../store";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Facebook,
  Instagram,
  Plus,
  Trash2,
  Camera,
  X,
  Upload,
} from "lucide-react";
import type { CustomLink } from "@/types/cv";
import { AIInlineHelper, AIQuickButton } from "./ai-inline-helper";

export function PersonalInfoForm() {
  const { personalInfo, updatePersonalInfo } = useCVStore();

  const addCustomLink = () => {
    const newLink: CustomLink = {
      id: crypto.randomUUID(),
      label: "",
      url: "",
    };
    updatePersonalInfo({
      customLinks: [...(personalInfo.customLinks || []), newLink],
    });
  };

  const updateCustomLink = (id: string, updates: Partial<CustomLink>) => {
    updatePersonalInfo({
      customLinks: (personalInfo.customLinks || []).map((link) =>
        link.id === id ? { ...link, ...updates } : link
      ),
    });
  };

  const removeCustomLink = (id: string) => {
    updatePersonalInfo({
      customLinks: (personalInfo.customLinks || []).filter((link) => link.id !== id),
    });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      // Convert to base64 for storage
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        updatePersonalInfo({ avatarUrl: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUrlChange = (url: string) => {
    updatePersonalInfo({ avatarUrl: url });
  };

  const removePhoto = () => {
    updatePersonalInfo({ avatarUrl: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {/* Profile Photo Section */}
      <div className="space-y-3 rounded-lg border border-white/10 bg-muted/30 p-4">
        <Label className="text-sm font-medium">Profile Photo (Optional)</Label>
        <p className="text-xs text-muted-foreground">
          Add a professional photo to personalize your CV. Some templates display this photo.
        </p>
        
        <div className="flex items-start gap-4">
          {/* Photo Preview */}
          <div className="relative">
            {personalInfo.avatarUrl ? (
              <div className="relative">
                <img
                  src={personalInfo.avatarUrl}
                  alt="Profile"
                  className="h-20 w-20 rounded-lg object-cover border border-white/10"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -right-2 -top-2 h-6 w-6"
                  onClick={removePhoto}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div 
                className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-white/20 bg-muted/50 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Upload Options */}
          <div className="flex-1 space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="mr-2 h-3 w-3" />
              Upload Photo
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">or use URL</span>
              </div>
            </div>
            <Input
              placeholder="https://example.com/photo.jpg"
              value={personalInfo.avatarUrl?.startsWith('data:') ? '' : (personalInfo.avatarUrl || '')}
              onChange={(e) => handlePhotoUrlChange(e.target.value)}
              className="text-xs"
            />
          </div>
        </div>
      </div>

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
          <div className="flex items-center justify-between">
            <Label htmlFor="headline">Professional Headline</Label>
            <AIInlineHelper
              type="headline"
              context={{ role: personalInfo.headline || "professional" }}
              currentValue={personalInfo.headline}
              onAccept={(headline) => updatePersonalInfo({ headline })}
              size="icon"
            />
          </div>
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

      {/* Popular Social Links */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Social Links</Label>
        
        {/* LinkedIn */}
        <div className="space-y-2">
          <Label htmlFor="linkedin-label" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Linkedin className="h-3 w-3" />
            LinkedIn
          </Label>
          <Input
            id="linkedin-label"
            placeholder="Link label"
            value={personalInfo.linkedinLabel || "LinkedIn"}
            onChange={(e) => updatePersonalInfo({ linkedinLabel: e.target.value })}
          />
          <Input
            id="linkedin"
            placeholder="https://linkedin.com/in/johndoe"
            value={personalInfo.linkedinUrl}
            onChange={(e) => updatePersonalInfo({ linkedinUrl: e.target.value })}
          />
        </div>

        {/* GitHub */}
        <div className="space-y-2">
          <Label htmlFor="github-label" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Github className="h-3 w-3" />
            GitHub
          </Label>
          <Input
            id="github-label"
            placeholder="Link label"
            value={personalInfo.githubLabel || "GitHub"}
            onChange={(e) => updatePersonalInfo({ githubLabel: e.target.value })}
          />
          <Input
            id="github"
            placeholder="https://github.com/johndoe"
            value={personalInfo.githubUrl}
            onChange={(e) => updatePersonalInfo({ githubUrl: e.target.value })}
          />
        </div>

        {/* Twitter/X */}
        <div className="space-y-2">
          <Label htmlFor="twitter-label" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Twitter className="h-3 w-3" />
            Twitter / X
          </Label>
          <Input
            id="twitter-label"
            placeholder="Link label"
            value={personalInfo.twitterLabel || "Twitter"}
            onChange={(e) => updatePersonalInfo({ twitterLabel: e.target.value })}
          />
          <Input
            id="twitter"
            placeholder="https://twitter.com/johndoe"
            value={personalInfo.twitterUrl || ""}
            onChange={(e) => updatePersonalInfo({ twitterUrl: e.target.value })}
          />
        </div>

        {/* Facebook */}
        <div className="space-y-2">
          <Label htmlFor="facebook-label" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Facebook className="h-3 w-3" />
            Facebook
          </Label>
          <Input
            id="facebook-label"
            placeholder="Link label"
            value={personalInfo.facebookLabel || "Facebook"}
            onChange={(e) => updatePersonalInfo({ facebookLabel: e.target.value })}
          />
          <Input
            id="facebook"
            placeholder="https://facebook.com/johndoe"
            value={personalInfo.facebookUrl || ""}
            onChange={(e) => updatePersonalInfo({ facebookUrl: e.target.value })}
          />
        </div>

        {/* Instagram */}
        <div className="space-y-2">
          <Label htmlFor="instagram-label" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Instagram className="h-3 w-3" />
            Instagram
          </Label>
          <Input
            id="instagram-label"
            placeholder="Link label"
            value={personalInfo.instagramLabel || "Instagram"}
            onChange={(e) => updatePersonalInfo({ instagramLabel: e.target.value })}
          />
          <Input
            id="instagram"
            placeholder="https://instagram.com/johndoe"
            value={personalInfo.instagramUrl || ""}
            onChange={(e) => updatePersonalInfo({ instagramUrl: e.target.value })}
          />
        </div>
      </div>

      {/* Custom Links Section */}
      <div className="space-y-3 rounded-lg border border-white/5 bg-muted/30 p-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Custom Links</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addCustomLink}
            className="h-7"
          >
            <Plus className="mr-1.5 h-3 w-3" />
            Add Link
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Add any additional links with custom names</p>
        
        {(personalInfo.customLinks || []).length === 0 ? (
          <p className="py-4 text-center text-xs text-muted-foreground">
            No custom links yet. Click &ldquo;Add Link&rdquo; to add one.
          </p>
        ) : (
          <div className="space-y-3">
            {(personalInfo.customLinks || []).map((link) => (
              <div key={link.id} className="space-y-2 rounded-lg border border-white/5 bg-background/50 p-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Custom Link</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive hover:text-destructive"
                    onClick={() => removeCustomLink(link.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <Input
                  placeholder="Link name (e.g., Portfolio, Blog, YouTube)"
                  value={link.label}
                  onChange={(e) => updateCustomLink(link.id, { label: e.target.value })}
                />
                <Input
                  placeholder="https://example.com"
                  value={link.url}
                  onChange={(e) => updateCustomLink(link.id, { url: e.target.value })}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="summary">Professional Summary</Label>
          <div className="flex items-center gap-1">
            {personalInfo.summary && (
              <>
                <AIQuickButton
                  type="professional"
                  currentValue={personalInfo.summary}
                  onUpdate={(summary) => updatePersonalInfo({ summary })}
                />
                <AIQuickButton
                  type="concise"
                  currentValue={personalInfo.summary}
                  onUpdate={(summary) => updatePersonalInfo({ summary })}
                />
              </>
            )}
            <AIInlineHelper
              type="summary"
              context={{ 
                role: personalInfo.headline || "professional",
                skills: []
              }}
              currentValue={personalInfo.summary}
              onAccept={(summary) => updatePersonalInfo({ summary })}
              size="icon"
            />
          </div>
        </div>
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

