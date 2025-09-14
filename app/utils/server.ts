// src/utils/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createServerSupabase() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // server cookie adapter for the ssr client:
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // best-effort: Next.js cookie API can differ between runtimes — this mirrors examples in the docs
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // no-op: if setAll can't run in this runtime, middleware has already set cookies for the browser
          }
        },
      },
    }
  );
}
