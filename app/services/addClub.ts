import { getSupabaseClient } from "@/app/utils/client";

export async function addClub(name: string, description: string) {
  const supabase = getSupabaseClient();

  try {
    if (!name.trim()) {
      throw new Error("Club name is required");
    }

    const { error: insertError } = await supabase.from("clubs").insert({
      name,
      description,
    });

    if (insertError) throw insertError;

    return {
      success: true,
      message: "Club added successfully!",
    };
  } catch (err: any) {
    console.error("Error adding club:", err);
    return {
      success: false,
      message: "Failed to add club. Please try again later.",
    };
  }
}
