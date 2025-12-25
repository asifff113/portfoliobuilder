"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, MousePointer, Globe, TrendingUp, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AnalyticsDashboardProps {
  portfolioId?: string;
}

// Mock data for demonstration
const mockData = {
  totalViews: 1247,
  uniqueVisitors: 892,
  avgTimeOnPage: "2:34",
  bounceRate: "32%",
  topPages: [
    { name: "Home", views: 456 },
    { name: "Projects", views: 312 },
    { name: "About", views: 234 },
    { name: "Contact", views: 189 },
  ],
  topReferrers: [
    { source: "LinkedIn", visits: 234 },
    { source: "Twitter", visits: 189 },
    { source: "Google", visits: 156 },
    { source: "GitHub", visits: 123 },
  ],
  recentActivity: [
    { time: "2 min ago", action: "Page view", page: "Projects" },
    { time: "5 min ago", action: "Link click", page: "GitHub" },
    { time: "12 min ago", action: "Page view", page: "Home" },
    { time: "18 min ago", action: "Contact form", page: "Contact" },
  ],
  viewsChart: [12, 19, 28, 35, 42, 38, 45, 52, 48, 61, 58, 72],
};

export function AnalyticsDashboard({ portfolioId }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-cyan-400" />
          Analytics
        </h2>
        <div className="flex gap-2">
          {(["7d", "30d", "90d"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                timeRange === range
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "bg-white/5 text-white/50 hover:bg-white/10"
              }`}
            >
              {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Eye className="h-5 w-5" />}
          label="Total Views"
          value={mockData.totalViews.toLocaleString()}
          trend="+12%"
          color="cyan"
        />
        <StatCard
          icon={<Globe className="h-5 w-5" />}
          label="Unique Visitors"
          value={mockData.uniqueVisitors.toLocaleString()}
          trend="+8%"
          color="purple"
        />
        <StatCard
          icon={<Clock className="h-5 w-5" />}
          label="Avg. Time"
          value={mockData.avgTimeOnPage}
          trend="+5%"
          color="emerald"
        />
        <StatCard
          icon={<MousePointer className="h-5 w-5" />}
          label="Bounce Rate"
          value={mockData.bounceRate}
          trend="-3%"
          color="amber"
        />
      </div>

      {/* Chart */}
      <Card className="border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Views Over Time</h3>
        <div className="h-32 flex items-end gap-1">
          {mockData.viewsChart.map((value, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${(value / Math.max(...mockData.viewsChart)) * 100}%` }}
              transition={{ delay: i * 0.05 }}
              className="flex-1 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-t opacity-80 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </Card>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card className="border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top Pages</h3>
          <div className="space-y-3">
            {mockData.topPages.map((page, i) => (
              <div key={page.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/50">
                    {i + 1}
                  </span>
                  <span className="text-white">{page.name}</span>
                </div>
                <span className="text-white/50">{page.views} views</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Referrers */}
        <Card className="border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top Referrers</h3>
          <div className="space-y-3">
            {mockData.topReferrers.map((ref) => (
              <div key={ref.source} className="flex items-center justify-between">
                <span className="text-white">{ref.source}</span>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-purple-500"
                      style={{
                        width: `${(ref.visits / mockData.topReferrers[0].visits) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-white/50 w-12 text-right">{ref.visits}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {mockData.recentActivity.map((activity, i) => (
            <div key={i} className="flex items-center gap-4 text-sm">
              <span className="text-white/40 w-20">{activity.time}</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-white/70">
                {activity.action}
              </span>
              <span className="text-white">{activity.page}</span>
            </div>
          ))}
        </div>
      </Card>

      <p className="text-center text-white/30 text-sm">
        Analytics data is simulated for demonstration purposes
      </p>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  trend,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  color: "cyan" | "purple" | "emerald" | "amber";
}) {
  const colorClasses = {
    cyan: "bg-cyan-500/20 text-cyan-400",
    purple: "bg-purple-500/20 text-purple-400",
    emerald: "bg-emerald-500/20 text-emerald-400",
    amber: "bg-amber-500/20 text-amber-400",
  };

  const trendPositive = trend.startsWith("+");

  return (
    <Card className="border-white/10 bg-white/5 p-4">
      <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <div className="flex items-center justify-between mt-1">
        <p className="text-sm text-white/50">{label}</p>
        <span className={`text-xs ${trendPositive ? "text-emerald-400" : "text-red-400"}`}>
          {trend}
        </span>
      </div>
    </Card>
  );
}
