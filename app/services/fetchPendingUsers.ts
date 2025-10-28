import { getSupabaseClient } from "@/app/utils/client";
import { Profile } from "../types/global";

export async function fetchPendingUsers(): Promise<Profile[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("status", "pending");

  if (error || !data) {
    console.error("Error fetching pending users:", error);
    return [];
  }

  return data as Profile[];
}
