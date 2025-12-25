"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import {
  Menu,
  Bell,
  Search,
  LogOut,
  Settings,
  User as UserIcon,
  ChevronDown,
  Sparkles,
  FileText,
  Briefcase,
  LayoutDashboard,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { toast } from "sonner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { title: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
  { title: "CV Builder", href: "/app/cv", icon: FileText },
  { title: "Portfolio Builder", href: "/app/portfolio", icon: Briefcase },
  { title: "Templates", href: "/app/templates", icon: Palette },
  { title: "Settings", href: "/app/settings", icon: Settings },
];

interface AppTopbarProps {
  user: User;
}

export function AppTopbar({ user }: AppTopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userInitials =
    user.user_metadata?.full_name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() ||
    user.email?.charAt(0).toUpperCase() ||
    "U";

  async function handleSignOut() {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Failed to sign out");
      return;
    }

    toast.success("Signed out successfully");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/5 bg-background/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      {/* Accent Bar */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-neon-purple via-neon-pink to-neon-cyan" />

      {/* Mobile Menu Button */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex h-16 items-center gap-2 border-b border-white/5 px-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-neon-purple via-neon-pink to-neon-cyan">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-gradient text-xl font-bold">AMCV</span>
          </div>
          <nav className="space-y-1 p-3">
            {mobileNavItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-linear-to-r from-neon-purple/20 via-neon-pink/15 to-neon-cyan/10 text-foreground"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Search */}
      <div className="hidden flex-1 md:block">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search CVs, portfolios, templates..."
            className="pl-10 bg-muted/50 border-white/5"
          />
        </div>
      </div>

      {/* Mobile Search Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
      >
        <Search className="h-5 w-5" />
      </Button>

      <div className="flex-1 md:hidden" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-neon-pink" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-linear-to-br from-neon-purple to-neon-pink text-white text-xs">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium">
                  {user.user_metadata?.full_name || "User"}
                </p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/app/settings">
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/app/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="absolute inset-x-0 top-16 border-b border-white/5 bg-background p-4 md:hidden">
          <Input
            type="search"
            placeholder="Search..."
            className="w-full"
            autoFocus
          />
        </div>
      )}
    </header>
  );
}

