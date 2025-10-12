import { getSupabaseClient } from "@/app/utils/client";

export async function followUser(followerId: string, followingId: string) {
  const supabase = getSupabaseClient();

  try {
    if (!followerId || !followingId) {
      throw new Error("Missing follower or following ID");
    }

    // Prevent self-follow
    if (followerId === followingId) {
      throw new Error("You cannot follow yourself");
    }

    // Check if already following (optional)
    const { data: existing, error: existingError } = await supabase
      .from("user_follows")
      .select("follower_id")
      .eq("follower_id", followerId)
      .eq("following_id", followingId)
      .maybeSingle();

    if (existingError) throw existingError;
    if (existing) {
      return {
        success: false,
        message: "You are already following this user.",
      };
    }

    // Insert follow relationship
    const { error: insertError } = await supabase.from("user_follows").insert({
      follower_id: followerId,
      following_id: followingId,
      followed_at: new Date().toISOString(),
    });

    if (insertError) throw insertError;

    return {
      success: true,
      message: "You are now following this user!",
    };
  } catch (err: any) {
    console.error("Error following user:", err);
    return {
      success: false,
      message: err.message || "Failed to follow user. Please try again later.",
    };
  }
}
