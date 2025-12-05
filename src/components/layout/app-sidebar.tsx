"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Palette,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { isUserAdminClient } from "@/lib/premium";

const navItems = [
  {
    title: "Dashboard",
    href: "/app/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "CV Builder",
    href: "/app/cv",
    icon: FileText,
  },
  {
    title: "Portfolio Builder",
    href: "/app/portfolio",
    icon: Briefcase,
  },
  {
    title: "Templates",
    href: "/app/templates",
    icon: Palette,
  },
  {
    title: "Settings",
    href: "/app/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    isUserAdminClient().then(setIsAdmin);
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-white/5 bg-sidebar transition-all duration-300 lg:flex",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-white/5 px-4">
          <Link href="/app/dashboard" className="flex items-center gap-2">
            <div className="glow-sm flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-neon-purple via-neon-pink to-neon-cyan">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-gradient text-xl font-bold tracking-tight">NeonCV</span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-linear-to-r from-neon-purple/20 via-neon-pink/15 to-neon-cyan/10 text-foreground"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    isActive ? "text-neon-purple" : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                {!isCollapsed && <span>{item.title}</span>}
                {isActive && !isCollapsed && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-neon-purple" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Admin Link */}
        {isAdmin && (
          <div className="border-t border-white/5 p-3">
            <Link
              href="/admin"
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                "bg-linear-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 text-orange-400 hover:from-red-500/20 hover:via-orange-500/20 hover:to-yellow-500/20"
              )}
            >
              <Shield className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>Admin Panel</span>}
            </Link>
          </div>
        )}

        {/* Footer */}
        {!isCollapsed && !isAdmin && (
          <div className="border-t border-white/5 p-4">
            <div className="rounded-xl bg-linear-to-r from-neon-purple/10 via-neon-pink/10 to-neon-cyan/10 p-4">
              <p className="text-sm font-medium">Upgrade to Pro</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Unlock all templates and features
              </p>
              <Button
                size="sm"
                className="glow-sm mt-3 w-full bg-linear-to-r from-neon-purple to-neon-pink text-white"
              >
                Upgrade
              </Button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

