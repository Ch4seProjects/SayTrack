import { getSupabaseClient } from "@/app/utils/client";
import { Achievement } from "../types/global";

export async function fetchAchievements(): Promise<Achievement[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("achievements")
    .select("id, name, description");

  if (error || !data) {
    console.error("Error fetching achievements:", error);
    return [];
  }

  return data as Achievement[];
}
