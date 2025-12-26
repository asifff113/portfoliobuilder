"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  User,
  Save,
  Loader2,
  Mail,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Phone,
  CheckCircle,
  Camera,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSupabaseBrowserClient } from "@/lib/supabase";

interface ProfileClientProps {
  user: {
    id: string;
    email: string;
    avatarUrl: string | null;
  };
  profile: {
    id: string;
    full_name: string | null;
    headline: string | null;
    bio: string | null;
    phone: string | null;
    location: string | null;
    website_url: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    avatar_url: string | null;
  } | null;
}

export function ProfileClient({ user, profile }: ProfileClientProps) {
  const supabase = getSupabaseBrowserClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile?.avatar_url || user.avatarUrl || null);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    headline: profile?.headline || "",
    bio: profile?.bio || "",
    phone: profile?.phone || "",
    location: profile?.location || "",
    website_url: profile?.website_url || "",
    linkedin_url: profile?.linkedin_url || "",
    github_url: profile?.github_url || "",
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB');
      return;
    }

    setIsUploadingAvatar(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Delete old avatar if exists
      if (avatarUrl) {
        const oldPath = avatarUrl.split('/avatars/')[1];
        if (oldPath) {
          await supabase.storage.from('avatars').remove([oldPath]);
        }
      }

      // Upload new avatar
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
        } as never)
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploadingAvatar(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveAvatar = async () => {
    if (!avatarUrl) return;

    setIsUploadingAvatar(true);

    try {
      // Extract path from URL
      const path = avatarUrl.split('/avatars/')[1];
      if (path) {
        await supabase.storage.from('avatars').remove([path]);
      }

      // Update profile to remove avatar URL
      const { error } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: null,
          updated_at: new Date().toISOString(),
        } as never)
        .eq('user_id', user.id);

      if (error) throw error;

      setAvatarUrl(null);
    } catch (error) {
      console.error('Failed to remove avatar:', error);
      alert('Failed to remove avatar. Please try again.');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          headline: formData.headline,
          bio: formData.bio,
          phone: formData.phone,
          location: formData.location,
          website_url: formData.website_url,
          linkedin_url: formData.linkedin_url,
          github_url: formData.github_url,
          updated_at: new Date().toISOString(),
        } as never)
        .eq("user_id", user.id);

      if (error) throw error;

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            My Profile
          </span>
        </h1>
        <p className="mt-2 text-white/60">
          Manage your personal information and social links
        </p>
      </div>

      {/* Profile Card */}
      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
          <CardDescription>
            Update your profile details that appear on your CV and portfolio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar & Email */}
          <div className="flex items-center gap-6 rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="relative">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {/* Avatar display */}
              {avatarUrl ? (
                <div className="relative h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src={avatarUrl}
                    alt="Profile avatar"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-cyan-500 to-purple-500 text-3xl font-bold text-white">
                  {formData.full_name?.[0]?.toUpperCase() || user.email[0]?.toUpperCase()}
                </div>
              )}
              
              {/* Upload/Loading overlay */}
              {isUploadingAvatar ? (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                </div>
              ) : (
                <button 
                  onClick={handleAvatarClick}
                  className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/20"
                  title="Upload new avatar"
                >
                  <Camera className="h-4 w-4" />
                </button>
              )}
              
              {/* Remove avatar button */}
              {avatarUrl && !isUploadingAvatar && (
                <button 
                  onClick={handleRemoveAvatar}
                  className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500/80 text-white hover:bg-red-500 transition-colors"
                  title="Remove avatar"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            <div className="flex-1">
              <p className="text-xl font-semibold text-white">{formData.full_name || "Your Name"}</p>
              <p className="text-white/50">{formData.headline || "Add a headline"}</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-white/40">
                <Mail className="h-4 w-4" />
                {user.email}
              </p>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white/70 uppercase tracking-wider">Basic Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white/70">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => updateField("full_name", e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-white/70">
                  Headline / Title
                </label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => updateField("headline", e.target.value)}
                  placeholder="e.g., Full-Stack Developer"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">
                Bio / Summary
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                rows={4}
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white/70 uppercase tracking-wider">Contact Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+1 234 567 890"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
                />
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
                  <MapPin className="h-4 w-4" />
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="City, Country"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white/70 uppercase tracking-wider">Social Links</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
                  <Globe className="h-4 w-4" />
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => updateField("website_url", e.target.value)}
                  placeholder="https://yoursite.com"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
                />
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.linkedin_url}
                  onChange={(e) => updateField("linkedin_url", e.target.value)}
                  placeholder="https://linkedin.com/in/you"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
                />
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
                  <Github className="h-4 w-4" />
                  GitHub
                </label>
                <input
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => updateField("github_url", e.target.value)}
                  placeholder="https://github.com/you"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-6">
            {saveSuccess && (
              <span className="flex items-center gap-2 text-sm text-green-400">
                <CheckCircle className="h-4 w-4" />
                Profile saved successfully
              </span>
            )}
            <Button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="bg-linear-to-r from-cyan-500 to-purple-500 px-6"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
