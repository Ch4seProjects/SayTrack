// src/services/leaderboardService.ts
import { getSupabaseClient } from "@/app/utils/client";
import { RawUserAchievement, UserAchievement } from "@/app/types/global";

export async function fetchUserAchievements(
  userId: string
): Promise<UserAchievement[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("user_achievements")
    .select(
      `
      id,
      achieved_at,
      achievement:achievements (
        id,
        name,
        description
      )
    `
    )
    .eq("user_id", userId);

  if (error || !data) {
    console.error("Error fetching user achievements:", error);
    return [];
  }

  return (data as RawUserAchievement[]).map((ua) => ({
    id: ua.achievement.id,
    name: ua.achievement.name,
    description: ua.achievement.description,
    achieved_at: ua.achieved_at,
  }));
}
