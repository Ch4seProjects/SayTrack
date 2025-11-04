import { getSupabaseClient } from "@/app/utils/client";

export async function updateClubJoinStatus(
  userId: string,
  clubId: string,
  status: "joined" | "rejected"
) {
  const supabase = getSupabaseClient();

  try {
    if (!userId.trim() || !clubId.trim()) {
      throw new Error("Both user ID and club ID are required");
    }

    if (status === "joined") {
      const { error: updateError } = await supabase
        .from("user_clubs")
        .update({ status: "joined" })
        .eq("user_id", userId)
        .eq("club_id", clubId);

      if (updateError) throw updateError;

      return {
        success: true,
        message: "User successfully approved and joined the club!",
      };
    } else if (status === "rejected") {
      const { error: deleteError } = await supabase
        .from("user_clubs")
        .delete()
        .eq("user_id", userId)
        .eq("club_id", clubId);

      if (deleteError) throw deleteError;

      return {
        success: true,
        message: "User’s club join request has been rejected and removed.",
      };
    }

    return {
      success: false,
      message: "Invalid status provided.",
    };
  } catch (err: any) {
    console.error(`Error updating club join status to ${status}:`, err);
    return {
      success: false,
      message: "Failed to update club join status. Please try again later.",
    };
  }
}
