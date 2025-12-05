"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Palette,
  Briefcase,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "CV Templates",
    href: "/admin/templates/cv",
    icon: FileText,
  },
  {
    title: "Portfolio Templates",
    href: "/admin/templates/portfolio",
    icon: Briefcase,
  },
  {
    title: "Themes",
    href: "/admin/themes",
    icon: Palette,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-red-500/10 bg-linear-to-b from-[#0a0a12] to-[#080810] transition-all duration-300 lg:flex",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-red-500/10 px-4">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-red-600 via-orange-500 to-yellow-500 shadow-lg shadow-red-500/20">
            <Shield className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <span className="bg-linear-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-lg font-bold text-transparent">
                Admin Panel
              </span>
              <p className="text-xs text-white/40">NeonCV</p>
            </div>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 text-white/40 hover:bg-white/5 hover:text-white"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-linear-to-r from-red-500/20 via-orange-500/15 to-yellow-500/10 text-white shadow-lg shadow-red-500/5"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive
                    ? "text-red-400"
                    : "text-white/40 group-hover:text-white"
                )}
              />
              {!isCollapsed && <span>{item.title}</span>}
              {isActive && !isCollapsed && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-linear-to-r from-red-500 to-orange-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer - Back to App */}
      <div className="border-t border-red-500/10 p-4">
        <Link
          href="/app/dashboard"
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/50 transition-all hover:bg-white/5 hover:text-white",
            isCollapsed && "justify-center"
          )}
        >
          <ArrowLeft className="h-5 w-5" />
          {!isCollapsed && <span>Back to App</span>}
        </Link>
      </div>
    </aside>
  );
}

