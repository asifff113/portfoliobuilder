/**
 * Analytics Tracking API
 * 
 * Records portfolio views and events.
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

// Helper to detect device type from user agent
function getDeviceType(userAgent: string): string {
  if (/mobile/i.test(userAgent)) return "mobile";
  if (/tablet|ipad/i.test(userAgent)) return "tablet";
  return "desktop";
}

// Helper to hash IP for privacy
function hashIP(ip: string): string {
  // Simple hash for privacy - in production, use a proper hashing algorithm
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { portfolioId, eventType, eventData } = body;

    if (!portfolioId) {
      return NextResponse.json(
        { error: "Portfolio ID is required" },
        { status: 400 }
      );
    }

    const supabase = await getSupabaseServerClient();

    // Get request metadata
    const userAgent = request.headers.get("user-agent") || "";
    const referrer = request.headers.get("referer") || "";
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || 
               request.headers.get("x-real-ip") || 
               "unknown";

    if (eventType) {
      // Record an event using direct insert
      const { error } = await supabase
        .from("portfolio_events")
        .insert({
          portfolio_id: portfolioId,
          event_type: eventType,
          event_data: eventData || {},
        } as never);

      if (error) {
        console.error("Error recording event:", error);
        return NextResponse.json(
          { error: "Failed to record event" },
          { status: 500 }
        );
      }
    } else {
      // Record a view using direct insert
      const { error } = await supabase
        .from("portfolio_views")
        .insert({
          portfolio_id: portfolioId,
          viewer_ip: hashIP(ip),
          user_agent: userAgent.substring(0, 500),
          referrer: referrer.substring(0, 500),
          device_type: getDeviceType(userAgent),
        } as never);

      if (error) {
        console.error("Error recording view:", error);
        return NextResponse.json(
          { error: "Failed to record view" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

