"use client";

import { Shield, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { AdminUser } from "@/lib/admin";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface AdminTopbarProps {
  admin: AdminUser;
}

export function AdminTopbar({ admin }: AdminTopbarProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/auth");
  };

  const initials = admin.profile.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || admin.email[0].toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-red-500/10 bg-[#080810]/80 px-4 backdrop-blur-xl lg:px-8">
      {/* Search */}
      <div className="flex flex-1 items-center gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <Input
            placeholder="Search users, templates..."
            className="h-10 border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus:border-red-500/50 focus:ring-red-500/20"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Admin Badge */}
        <div className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 px-3 py-1.5 sm:flex">
          <Shield className="h-3.5 w-3.5 text-red-400" />
          <span className="text-xs font-medium text-red-400">Admin</span>
        </div>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-white/50 hover:bg-white/5 hover:text-white"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full ring-2 ring-red-500/20 transition-all hover:ring-red-500/40"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={admin.profile.avatar_url || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-500 text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 border-white/10 bg-[#0a0a12]"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-white">
                  {admin.profile.full_name || "Admin"}
                </p>
                <p className="text-xs text-white/50">{admin.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              onClick={() => router.push("/app/dashboard")}
              className="text-white/70 focus:bg-white/5 focus:text-white"
            >
              Back to App
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/admin/settings")}
              className="text-white/70 focus:bg-white/5 focus:text-white"
            >
              Admin Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

