"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Palette,
  Shield,
  Bell,
  LogOut,
  Save,
  Loader2,
  Mail,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Phone,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemePicker } from "@/features/themes";
import { getSupabaseBrowserClient } from "@/lib/supabase";

interface SettingsClientProps {
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

export function SettingsClient({ user, profile }: SettingsClientProps) {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
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
            Settings
          </span>
        </h1>
        <p className="mt-2 text-white/60">
          Manage your account, profile, and preferences
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/5">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-linear-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="data-[state=active]:bg-linear-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <Palette className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-linear-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className="data-[state=active]:bg-linear-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <Shield className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your profile details that appear on your CV and portfolio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar & Email (read-only) */}
              <div className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-cyan-500 to-purple-500 text-2xl font-bold text-white">
                  {formData.full_name?.[0]?.toUpperCase() || user.email[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-white">{formData.full_name || "Your Name"}</p>
                  <p className="flex items-center gap-2 text-sm text-white/50">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => updateField("full_name", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
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
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
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
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
                    <Phone className="h-4 w-4" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+1 234 567 890"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
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
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

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
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
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
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
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
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex items-center justify-end gap-3 pt-4">
                {saveSuccess && (
                  <span className="flex items-center gap-2 text-sm text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    Saved successfully
                  </span>
                )}
                <Button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="bg-linear-to-r from-cyan-500 to-purple-500"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle>Theme & Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of your AMCV experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThemePicker />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how and when you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: "email_updates", label: "Email Updates", description: "Receive product updates and tips" },
                { id: "portfolio_views", label: "Portfolio Views", description: "Get notified when someone views your portfolio" },
                { id: "cv_downloads", label: "CV Downloads", description: "Get notified when someone downloads your CV" },
                { id: "marketing", label: "Marketing", description: "Receive marketing and promotional content" },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4"
                >
                  <div>
                    <p className="font-medium text-white">{item.label}</p>
                    <p className="text-sm text-white/50">{item.description}</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" defaultChecked={item.id !== "marketing"} />
                    <div className="peer h-6 w-11 rounded-full bg-white/10 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white/50 after:transition-all after:content-[''] peer-checked:bg-linear-to-r peer-checked:from-cyan-500 peer-checked:to-purple-500 peer-checked:after:translate-x-full peer-checked:after:bg-white peer-focus:outline-none"></div>
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account security and access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Email */}
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">Email Address</p>
                    <p className="text-sm text-white/50">{user.email}</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-white/20">
                    Change
                  </Button>
                </div>
              </div>

              {/* Password */}
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">Password</p>
                    <p className="text-sm text-white/50">Last changed: Never</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-white/20">
                    Update
                  </Button>
                </div>
              </div>

              {/* Sign Out */}
              <div className="pt-4">
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-500/20 bg-red-500/5">
            <CardHeader>
              <CardTitle className="text-red-400">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions that affect your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <div>
                  <p className="font-medium text-white">Delete Account</p>
                  <p className="text-sm text-white/50">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

