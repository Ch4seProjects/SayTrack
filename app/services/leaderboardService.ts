// src/services/leaderboardService.ts
import { getSupabaseClient } from "@/app/utils/client";
import { Profile } from "@/app/types/User";

export async function fetchLeaderboardProfiles(): Promise<Profile[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, name, year, section, type, character_points, participation_points"
    );

  if (error) {
    console.error("Error fetching profiles:", error);
    return [];
  }

  // Add total points
  const withTotals = data.map((u: Profile) => ({
    ...u,
    totalPoints: (u.character_points ?? 0) + (u.participation_points ?? 0),
  }));

  // Sort by total points descending
  return withTotals.sort(
    (a: Profile, b: Profile) => b.totalPoints - a.totalPoints
  );
}
