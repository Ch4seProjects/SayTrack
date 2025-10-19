import { getSupabaseClient } from "@/app/utils/client";
import { AwardTitleType } from "@/app/utils/schema";

export async function awardTitle(
  data: AwardTitleType
): Promise<{ success: boolean; message: string }> {
  const supabase = getSupabaseClient();
  const { student, title_id } = data;

  try {
    const { data: existing, error: fetchError } = await supabase
      .from("user_titles")
      .select("id")
      .eq("user_id", student.id)
      .eq("title_id", title_id)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (existing) {
      return {
        success: false,
        message: `${student.name} already has this title.`,
      };
    }

    const { error: insertError } = await supabase.from("user_titles").insert({
      user_id: student.id,
      title_id,
    });

    if (insertError) throw insertError;

    return {
      success: true,
      message: `Title awarded to ${student.name}.`,
    };
  } catch (err: any) {
    console.error("Error awarding title:", err);
    return {
      success: false,
      message:
        err?.code === "23505"
          ? `${student.name} already has this title.`
          : "Failed to award title. Please try again.",
    };
  }
}
