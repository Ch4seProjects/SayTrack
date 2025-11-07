import { getSupabaseClient } from "@/app/utils/client";
import { UserSummary, RawUserFollow } from "@/app/types/global";

export async function fetchUserFollowing(
  userId: string
): Promise<UserSummary[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("user_follows")
    .select(
      `
      followed_at,
      following:profiles!user_follows_following_id_fkey (
        id,
        name,
        section,
        avatar_url
      )
    `
    )
    .eq("follower_id", userId);

  if (error || !data) {
    console.error("Error fetching user following:", error);
    return [];
  }

  return (data as RawUserFollow[]).map((uf) => ({
    id: uf.following!.id,
    name: uf.following!.name,
    section: uf.following!.section,
    followed_at: uf.followed_at,
    avatar_url: uf.following!.avatar_url,
  }));
}

export async function countUserFollowing(userId: string): Promise<number> {
  const supabase = getSupabaseClient();
  const { count, error } = await supabase
    .from("user_follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", userId);

  if (error) {
    console.error("Error counting user following:", error);
    return 0;
  }
  return count ?? 0;
}

export async function countUserFollowers(userId: string): Promise<number> {
  const supabase = getSupabaseClient();
  const { count, error } = await supabase
    .from("user_follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", userId);

  if (error) {
    console.error("Error counting user followers:", error);
    return 0;
  }
  return count ?? 0;
}
