// src/services/searchService.ts
import { getSupabaseClient } from "@/app/utils/client";
import { Profile } from "@/app/types/global";

export async function searchService(query: string): Promise<Profile[]> {
  const supabase = getSupabaseClient();

  if (!query.trim()) return [];

  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, section, year, email")
    .ilike("name", `%${query}%`)
    .neq("type", "admin")
    .limit(10);

  if (error) {
    console.error("Error searching profiles:", error.message);
    return [];
  }

  return data || [];
}
