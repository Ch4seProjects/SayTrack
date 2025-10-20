import { createClient } from "@supabase/supabase-js";

export function getAdminSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.log("supabaseUrl: ", supabaseUrl);
    console.log("serviceRoleKey: ", serviceRoleKey);
    throw new Error("Missing Supabase URL or Service Role Key");
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return supabase.auth.admin;
}
