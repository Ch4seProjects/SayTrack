import { getSupabaseClient } from "@/app/utils/client";
import { Profile } from "@/app/types/global";

export async function fetchProfileById(id: string): Promise<Profile | null> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, name, email, section, year, character_points, participation_points"
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  if (!data) return null;

  return {
    ...data,
    totalPoints:
      (data.character_points ?? 0) + (data.participation_points ?? 0),
  };
}
