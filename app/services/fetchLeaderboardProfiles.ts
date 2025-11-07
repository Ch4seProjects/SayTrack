import { getSupabaseClient } from "@/app/utils/client";
import { Profile } from "@/app/types/global";

export async function fetchLeaderboardProfiles(): Promise<Profile[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, name, year, email, section, type, status, character_points, participation_points, avatar_url"
    )
    .neq("status", "rejected"); // 👈 exclude rejected users

  if (error) {
    console.error("Error fetching profiles:", error);
    return [];
  }

  // Filter again defensively in case of nulls
  const filtered = (data || []).filter((u: Profile) => u.status !== "rejected");

  // Add total points
  const withTotals = filtered.map((u: Profile) => ({
    ...u,
    totalPoints: (u.character_points ?? 0) + (u.participation_points ?? 0),
  }));

  // Sort by total points descending
  return withTotals.sort(
    (a: Profile, b: Profile) => b.totalPoints - a.totalPoints
  );
}
