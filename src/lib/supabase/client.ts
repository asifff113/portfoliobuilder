/**
 * Supabase Browser Client
 *
 * Use this client in Client Components (marked with "use client")
 * for browser-side operations like auth state management.
 */

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/db";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Singleton instance for client-side usage
let browserClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    browserClient = createClient();
  }
  return browserClient;
}

