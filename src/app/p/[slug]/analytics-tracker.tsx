"use client";

import { useEffect } from "react";

interface AnalyticsTrackerProps {
  portfolioId: string;
}

export function AnalyticsTracker({ portfolioId }: AnalyticsTrackerProps) {
  useEffect(() => {
    // Track page view
    const trackView = async () => {
      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            portfolioId,
          }),
        });
      } catch (error) {
        // Silently fail - analytics shouldn't break the page
        console.debug("Analytics tracking failed:", error);
      }
    };

    trackView();
  }, [portfolioId]);

  // This component doesn't render anything
  return null;
}

// Helper function to track events from other components
export function trackEvent(
  portfolioId: string,
  eventType: string,
  eventData?: Record<string, unknown>
) {
  fetch("/api/analytics/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      portfolioId,
      eventType,
      eventData,
    }),
  }).catch(() => {
    // Silently fail
  });
}

