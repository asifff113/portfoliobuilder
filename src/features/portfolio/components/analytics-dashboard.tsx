"use client";

import { useState, useEffect } from "react";
import {
  Eye,
  MousePointer,
  TrendingUp,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Loader2,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnalyticsStats {
  total_views: number;
  unique_views: number;
  views_today: number;
  views_this_week: number;
  views_this_month: number;
  cta_clicks: number;
  project_clicks: number;
}

interface DailyView {
  date: string;
  views: number;
}

interface TopReferrer {
  domain: string;
  count: number;
}

interface AnalyticsData {
  stats: AnalyticsStats;
  dailyViews: DailyView[];
  deviceBreakdown: Record<string, number>;
  topReferrers: TopReferrer[];
  recentEvents: Array<{
    event_type: string;
    event_data: Record<string, unknown>;
    created_at: string;
  }>;
}

interface AnalyticsDashboardProps {
  portfolioId: string;
}

export function AnalyticsDashboard({ portfolioId }: AnalyticsDashboardProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/analytics/stats?portfolioId=${portfolioId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load analytics");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [portfolioId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-neon-cyan" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center">
        <p className="text-red-400">{error}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchAnalytics}
          className="mt-4 border-red-500/30 text-red-400 hover:bg-red-500/10"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  if (!data) return null;

  const maxViews = Math.max(...data.dailyViews.map((d) => d.views), 1);
  const totalDeviceViews = Object.values(data.deviceBreakdown).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <BarChart3 className="h-5 w-5 text-neon-cyan" />
          Analytics
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={fetchAnalytics}
          className="text-white/60 hover:text-white"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Eye className="h-5 w-5" />}
          label="Total Views"
          value={data.stats.total_views}
          color="cyan"
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="This Week"
          value={data.stats.views_this_week}
          color="green"
        />
        <StatCard
          icon={<MousePointer className="h-5 w-5" />}
          label="CTA Clicks"
          value={data.stats.cta_clicks}
          color="purple"
        />
        <StatCard
          icon={<Globe className="h-5 w-5" />}
          label="Project Clicks"
          value={data.stats.project_clicks}
          color="orange"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Views Chart */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="mb-4 text-sm font-medium text-white/70">Views (Last 7 Days)</h3>
          <div className="flex h-32 items-end gap-2">
            {data.dailyViews.map((day) => (
              <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-linear-to-t from-neon-cyan/50 to-neon-cyan transition-all hover:from-neon-cyan/70 hover:to-neon-cyan"
                  style={{
                    height: `${(day.views / maxViews) * 100}%`,
                    minHeight: day.views > 0 ? "4px" : "0",
                  }}
                />
                <span className="text-[10px] text-white/40">
                  {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="mb-4 text-sm font-medium text-white/70">Device Breakdown</h3>
          <div className="space-y-3">
            <DeviceBar
              icon={<Monitor className="h-4 w-4" />}
              label="Desktop"
              value={data.deviceBreakdown.desktop || 0}
              total={totalDeviceViews}
              color="cyan"
            />
            <DeviceBar
              icon={<Smartphone className="h-4 w-4" />}
              label="Mobile"
              value={data.deviceBreakdown.mobile || 0}
              total={totalDeviceViews}
              color="purple"
            />
            <DeviceBar
              icon={<Tablet className="h-4 w-4" />}
              label="Tablet"
              value={data.deviceBreakdown.tablet || 0}
              total={totalDeviceViews}
              color="orange"
            />
          </div>
        </div>
      </div>

      {/* Top Referrers */}
      {data.topReferrers.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="mb-4 text-sm font-medium text-white/70">Top Referrers</h3>
          <div className="space-y-2">
            {data.topReferrers.map((referrer) => (
              <div
                key={referrer.domain}
                className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
              >
                <span className="text-sm text-white/80">{referrer.domain}</span>
                <span className="text-sm font-medium text-neon-cyan">{referrer.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Events */}
      {data.recentEvents.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="mb-4 text-sm font-medium text-white/70">Recent Activity</h3>
          <div className="space-y-2">
            {data.recentEvents.slice(0, 5).map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      event.event_type === "cta_click" && "bg-neon-purple",
                      event.event_type === "project_click" && "bg-neon-orange",
                      event.event_type === "social_click" && "bg-neon-cyan"
                    )}
                  />
                  <span className="text-sm text-white/80">
                    {event.event_type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                </div>
                <span className="text-xs text-white/40">
                  {new Date(event.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: "cyan" | "green" | "purple" | "orange";
}) {
  const colorClasses = {
    cyan: "text-neon-cyan bg-neon-cyan/10 border-neon-cyan/20",
    green: "text-neon-green bg-neon-green/10 border-neon-green/20",
    purple: "text-neon-purple bg-neon-purple/10 border-neon-purple/20",
    orange: "text-neon-orange bg-neon-orange/10 border-neon-orange/20",
  };

  return (
    <div className={cn("rounded-xl border p-4", colorClasses[color])}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-white/60">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
}

// Device Bar Component
function DeviceBar({
  icon,
  label,
  value,
  total,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  total: number;
  color: "cyan" | "purple" | "orange";
}) {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  const colorClasses = {
    cyan: "bg-neon-cyan",
    purple: "bg-neon-purple",
    orange: "bg-neon-orange",
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-white/70">
          {icon}
          {label}
        </div>
        <span className="text-white/50">
          {value} ({percentage.toFixed(0)}%)
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={cn("h-full rounded-full transition-all", colorClasses[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

