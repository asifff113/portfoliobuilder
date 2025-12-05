/**
 * Analytics Stats API
 * 
 * Returns analytics data for a portfolio.
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const portfolioId = searchParams.get("portfolioId");

    if (!portfolioId) {
      return NextResponse.json(
        { error: "Portfolio ID is required" },
        { status: 400 }
      );
    }

    const supabase = await getSupabaseServerClient();

    // Verify ownership
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data: portfolioData } = await supabase
      .from("portfolios")
      .select("user_id")
      .eq("id", portfolioId)
      .single();

    const portfolio = portfolioData as { user_id: string } | null;
    if (!portfolio || portfolio.user_id !== user.id) {
      return NextResponse.json(
        { error: "Portfolio not found or unauthorized" },
        { status: 403 }
      );
    }

    // Get stats
    const { data: stats } = await supabase
      .from("portfolio_stats")
      .select("*")
      .eq("portfolio_id", portfolioId)
      .single();

    // Get recent views (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: recentViewsData } = await supabase
      .from("portfolio_views")
      .select("created_at, device_type, referrer, country")
      .eq("portfolio_id", portfolioId)
      .gte("created_at", sevenDaysAgo.toISOString())
      .order("created_at", { ascending: false })
      .limit(100);

    const recentViews = (recentViewsData || []) as Array<{
      created_at: string;
      device_type: string | null;
      referrer: string | null;
      country: string | null;
    }>;

    // Get recent events
    const { data: recentEventsData } = await supabase
      .from("portfolio_events")
      .select("event_type, event_data, created_at")
      .eq("portfolio_id", portfolioId)
      .gte("created_at", sevenDaysAgo.toISOString())
      .order("created_at", { ascending: false })
      .limit(50);

    const recentEvents = (recentEventsData || []) as Array<{
      event_type: string;
      event_data: Record<string, unknown>;
      created_at: string;
    }>;

    // Calculate daily views for chart
    const dailyViews: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      dailyViews[dateStr] = 0;
    }

    recentViews.forEach((view) => {
      const dateStr = new Date(view.created_at).toISOString().split("T")[0];
      if (dailyViews[dateStr] !== undefined) {
        dailyViews[dateStr]++;
      }
    });

    // Calculate device breakdown
    const deviceBreakdown: Record<string, number> = {
      desktop: 0,
      mobile: 0,
      tablet: 0,
    };

    recentViews.forEach((view) => {
      if (view.device_type && deviceBreakdown[view.device_type] !== undefined) {
        deviceBreakdown[view.device_type]++;
      }
    });

    // Calculate top referrers
    const referrerCounts: Record<string, number> = {};
    recentViews.forEach((view) => {
      if (view.referrer) {
        try {
          const url = new URL(view.referrer);
          const domain = url.hostname;
          referrerCounts[domain] = (referrerCounts[domain] || 0) + 1;
        } catch {
          // Invalid URL, skip
        }
      }
    });

    const topReferrers = Object.entries(referrerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([domain, count]) => ({ domain, count }));

    return NextResponse.json({
      stats: stats || {
        total_views: 0,
        unique_views: 0,
        views_today: 0,
        views_this_week: 0,
        views_this_month: 0,
        cta_clicks: 0,
        project_clicks: 0,
      },
      dailyViews: Object.entries(dailyViews).map(([date, views]) => ({
        date,
        views,
      })),
      deviceBreakdown,
      topReferrers,
      recentEvents: recentEvents || [],
    });
  } catch (error) {
    console.error("Analytics stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

