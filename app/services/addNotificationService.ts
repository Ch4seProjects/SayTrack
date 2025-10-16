import { getSupabaseClient } from "@/app/utils/client";

export async function addNotification(
  title: string,
  message: string,
  club_id?: string | null
) {
  const supabase = getSupabaseClient();

  try {
    if (!title.trim()) {
      throw new Error("Notification title is required");
    }
    if (!message.trim()) {
      throw new Error("Notification message is required");
    }

    const payload: Record<string, any> = {
      title,
      message,
      created_at: new Date().toISOString(),
    };

    if (club_id && club_id.trim() !== "") {
      payload.club_id = club_id;
    }

    const { error: insertError } = await supabase
      .from("notifications")
      .insert(payload);

    if (insertError) throw insertError;

    return {
      success: true,
      message: "Notification created successfully!",
    };
  } catch (err: any) {
    console.error("Error adding notification:", err);
    return {
      success: false,
      message: "Failed to create notification. Please try again later.",
    };
  }
}
