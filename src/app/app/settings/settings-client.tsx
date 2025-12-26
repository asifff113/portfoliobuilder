"use client";

import { useRouter } from "next/navigation";
import {
  Palette,
  Shield,
  Bell,
  LogOut,
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
}

export function SettingsClient({ user }: SettingsClientProps) {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
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
          Manage your app preferences and account
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/5">
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
                    <div className="peer h-6 w-11 rounded-full bg-white/10 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white/50 after:transition-all after:content-[''] peer-checked:bg-linear-to-r peer-checked:from-cyan-500 peer-checked:to-purple-500 peer-checked:after:translate-x-full peer-checked:after:bg-white peer-focus:outline-none"></div>
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

