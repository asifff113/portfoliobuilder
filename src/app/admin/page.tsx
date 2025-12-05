import { getAdminStats, getUsers } from "@/lib/admin";
import {
  Users,
  FileText,
  Briefcase,
  Ban,
  TrendingUp,
  Activity,
  Clock,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default async function AdminDashboard() {
  const stats = await getAdminStats();
  const { users: recentUsers } = await getUsers(1, 5);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      shadowColor: "shadow-blue-500/20",
      href: "/admin/users",
    },
    {
      title: "Total CVs",
      value: stats.totalCVs,
      icon: FileText,
      gradient: "from-purple-500 to-pink-500",
      shadowColor: "shadow-purple-500/20",
      href: "/admin/cvs",
    },
    {
      title: "Total Portfolios",
      value: stats.totalPortfolios,
      icon: Briefcase,
      gradient: "from-orange-500 to-yellow-500",
      shadowColor: "shadow-orange-500/20",
      href: "/admin/templates/portfolio",
    },
    {
      title: "Banned Users",
      value: stats.bannedUsers,
      icon: Ban,
      gradient: "from-red-500 to-rose-500",
      shadowColor: "shadow-red-500/20",
      href: "/admin/users?filter=banned",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="mt-1 text-white/50">
          Overview of your NeonCV platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className={`group relative overflow-hidden border-white/5 bg-white/2 p-6 transition-all hover:border-white/10 hover:bg-white/4 ${stat.shadowColor}`}>
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-linear-to-br ${stat.gradient} opacity-0 transition-opacity group-hover:opacity-5`} />
              
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-white/50">{stat.title}</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
                <div className={`rounded-xl bg-linear-to-br ${stat.gradient} p-3 shadow-lg ${stat.shadowColor}`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Trend indicator */}
              <div className="relative mt-4 flex items-center gap-1 text-xs text-emerald-400">
                <TrendingUp className="h-3 w-3" />
                <span>Active</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <Card className="border-white/5 bg-white/2 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 p-2">
                <Users className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-white">Recent Users</h2>
            </div>
            <Link
              href="/admin/users"
              className="text-sm text-white/50 transition-colors hover:text-white"
            >
              View all →
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {recentUsers.length === 0 ? (
              <p className="text-center text-sm text-white/40 py-8">No users yet</p>
            ) : (
              recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between rounded-lg bg-white/2 p-3 transition-colors hover:bg-white/4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-pink-500 text-sm font-medium text-white">
                      {user.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {user.full_name || "Unnamed User"}
                      </p>
                      <p className="text-xs text-white/40">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {user.is_banned && (
                      <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs text-red-400">
                        Banned
                      </span>
                    )}
                    {user.is_admin && (
                      <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-xs text-orange-400">
                        Admin
                      </span>
                    )}
                    <span className="text-xs text-white/30">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="border-white/5 bg-white/2 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-linear-to-br from-orange-500 to-yellow-500 p-2">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
          </div>

          <div className="mt-6 grid gap-3">
            <Link
              href="/admin/users"
              className="flex items-center gap-4 rounded-xl bg-linear-to-r from-blue-500/10 to-cyan-500/10 p-4 transition-all hover:from-blue-500/20 hover:to-cyan-500/20"
            >
              <div className="rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 p-2.5">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">Manage Users</p>
                <p className="text-sm text-white/50">View, ban, or edit users</p>
              </div>
            </Link>

            <Link
              href="/admin/templates/cv"
              className="flex items-center gap-4 rounded-xl bg-linear-to-r from-purple-500/10 to-pink-500/10 p-4 transition-all hover:from-purple-500/20 hover:to-pink-500/20"
            >
              <div className="rounded-lg bg-linear-to-br from-purple-500 to-pink-500 p-2.5">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">CV Templates</p>
                <p className="text-sm text-white/50">Add or edit CV templates</p>
              </div>
            </Link>

            <Link
              href="/admin/themes"
              className="flex items-center gap-4 rounded-xl bg-linear-to-r from-green-500/10 to-emerald-500/10 p-4 transition-all hover:from-green-500/20 hover:to-emerald-500/20"
            >
              <div className="rounded-lg bg-linear-to-br from-green-500 to-emerald-500 p-2.5">
                <span className="text-lg">🎨</span>
              </div>
              <div>
                <p className="font-medium text-white">Manage Themes</p>
                <p className="text-sm text-white/50">Create system themes</p>
              </div>
            </Link>
          </div>
        </Card>
      </div>

      {/* System Info */}
      <Card className="border-white/5 bg-white/2 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-linear-to-br from-gray-500 to-gray-600 p-2">
            <Clock className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-white">System Information</h2>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-white/2 p-4">
            <p className="text-sm text-white/50">Platform</p>
            <p className="mt-1 font-medium text-white">NeonCV</p>
          </div>
          <div className="rounded-lg bg-white/2 p-4">
            <p className="text-sm text-white/50">Version</p>
            <p className="mt-1 font-medium text-white">1.0.0</p>
          </div>
          <div className="rounded-lg bg-white/2 p-4">
            <p className="text-sm text-white/50">Database</p>
            <p className="mt-1 font-medium text-white">Supabase (PostgreSQL)</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

