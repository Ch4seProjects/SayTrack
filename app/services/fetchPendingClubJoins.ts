import { getSupabaseClient } from "@/app/utils/client";
import { UserClub } from "@/app/types/global";

export async function fetchPendingClubJoins(): Promise<UserClub[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("user_clubs")
    .select(
      `
      id,
      user_id,
      club_id,
      role,
      joined_at,
      status,
      user:profiles (
        id,
        name,
        email
      ),
      club:clubs (
        id,
        name,
        description
      )
    `
    )
    .eq("status", "pending");

  if (error || !data) {
    console.error("Error fetching pending club joins:", error);
    return [];
  }

  return data as UserClub[];
}
