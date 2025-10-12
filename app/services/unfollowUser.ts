import { getSupabaseClient } from "@/app/utils/client";

export async function unfollowUser(followerId: string, followingId: string) {
  const supabase = getSupabaseClient();

  try {
    if (!followerId || !followingId) {
      throw new Error("Missing follower or following ID");
    }

    const { error: deleteError } = await supabase
      .from("user_follows")
      .delete()
      .eq("follower_id", followerId)
      .eq("following_id", followingId);

    if (deleteError) throw deleteError;

    return {
      success: true,
      message: "You have unfollowed this user.",
    };
  } catch (err: any) {
    console.error("Error unfollowing user:", err);
    return {
      success: false,
      message:
        err.message || "Failed to unfollow user. Please try again later.",
    };
  }
}
