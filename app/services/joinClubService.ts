import { getSupabaseClient } from "@/app/utils/client";

export async function joinClub(userId: string, clubId: string) {
  const supabase = getSupabaseClient();

  try {
    if (!userId || !clubId) {
      throw new Error("Missing user or club ID");
    }

    const { error: insertError } = await supabase.from("user_clubs").insert({
      user_id: userId,
      club_id: clubId,
      role: "member",
      joined_at: new Date().toISOString(),
    });

    if (insertError) throw insertError;

    return {
      success: true,
      message: "You have successfully joined the club!",
    };
  } catch (err: any) {
    console.error("Error joining club:", err);
    return {
      success: false,
      message: "Failed to join club. Please try again later.",
    };
  }
}
