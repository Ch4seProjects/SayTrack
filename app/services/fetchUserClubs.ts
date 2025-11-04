import { getSupabaseClient } from "@/app/utils/client";
import { UserClub, RawUserClub } from "@/app/types/global";

export async function fetchUserClubs(userId: string): Promise<UserClub[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("user_clubs")
    .select(
      `
      id,
      user_id,
      role,
      joined_at,
      status,
      club:clubs (
        id,
        name,
        description
      )
    `
    )
    .eq("user_id", userId);

  if (error || !data) {
    console.error("Error fetching user clubs:", error);
    return [];
  }

  return (data as RawUserClub[]).map((uc) => ({
    id: uc.id,
    user_id: uc.user_id,
    club_id: uc.club.id,
    name: uc.club.name,
    description: uc.club.description,
    role: uc.role,
    joined_at: uc.joined_at,
    status: uc.status,
  }));
}
