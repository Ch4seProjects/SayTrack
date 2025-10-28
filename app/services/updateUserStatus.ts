import { getSupabaseClient } from "@/app/utils/client";

export async function updateUserStatus(
  userId: string,
  status: "approved" | "rejected"
) {
  const supabase = getSupabaseClient();

  try {
    if (!userId.trim()) {
      throw new Error("User ID is required");
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ status })
      .eq("id", userId);

    if (updateError) throw updateError;

    return {
      success: true,
      message: `User ${status} successfully!`,
    };
  } catch (err: any) {
    console.error(`Error updating user status to ${status}:`, err);
    return {
      success: false,
      message: `Failed to update user status. Please try again later.`,
    };
  }
}
