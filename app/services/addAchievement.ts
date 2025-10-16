import { getSupabaseClient } from "@/app/utils/client";

export async function addAchievement(name: string, description: string) {
  const supabase = getSupabaseClient();

  try {
    if (!name.trim()) {
      throw new Error("Achievement name is required");
    }

    const { error: insertError } = await supabase.from("achievements").insert({
      name,
      description,
    });

    if (insertError) throw insertError;

    return {
      success: true,
      message: "Achievement added successfully!",
    };
  } catch (err: any) {
    console.error("Error adding Achievement:", err);
    return {
      success: false,
      message: "Failed to add Achievement. Please try again later.",
    };
  }
}
