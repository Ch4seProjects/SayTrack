// src/services/pointsService.ts
import { getSupabaseClient } from "@/app/utils/client";
import { UserPoints, RawUserPoints } from "@/app/types/global";

export async function fetchUserPoints(userId: string): Promise<UserPoints[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("user_points")
    .select("id, reason, points, point_type, created_at")
    .eq("user_id", userId);

  if (error || !data) {
    console.error("Error fetching user points:", error);
    return [];
  }

  return (data as RawUserPoints[]).map((up) => ({
    id: up.id,
    point_type: up.point_type,
    points: up.points,
    reason: up.reason,
    created_at: up.created_at,
    given_by: up.given_by
      ? {
          id: up.given_by.id,
          username: up.given_by.username,
          avatar_url: up.given_by.avatar_url,
        }
      : null,
  }));
}
