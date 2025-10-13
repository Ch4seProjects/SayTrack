import { getSupabaseClient } from "@/app/utils/client";

export async function updateProfile(
  userId: string,
  updates: {
    name?: string;
    year?: string;
    section?: string;
  }
) {
  const supabase = getSupabaseClient();

  try {
    if (!userId) {
      throw new Error("Missing user ID");
    }

    // Validate fields
    if (!updates.name?.trim()) {
      throw new Error("Name cannot be empty");
    }

    // Update the user's profile
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        name: updates.name.trim(),
        year: updates.year || null,
        section: updates.section || null,
      })
      .eq("id", userId);

    if (updateError) throw updateError;

    return {
      success: true,
      message: "Profile updated successfully!",
    };
  } catch (err: any) {
    console.error("Error updating profile:", err);
    return {
      success: false,
      message:
        err.message || "Failed to update profile. Please try again later.",
    };
  }
}
