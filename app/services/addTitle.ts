import { getSupabaseClient } from "@/app/utils/client";

export async function addTitle(name: string, description: string) {
  const supabase = getSupabaseClient();

  try {
    if (!name.trim()) {
      throw new Error("Title name is required");
    }

    const { error: insertError } = await supabase.from("titles").insert({
      name,
      description,
    });

    if (insertError) throw insertError;

    return {
      success: true,
      message: "Title added successfully!",
    };
  } catch (err: any) {
    console.error("Error adding title:", err);
    return {
      success: false,
      message: "Failed to add title. Please try again later.",
    };
  }
}
