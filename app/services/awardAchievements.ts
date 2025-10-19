import { getSupabaseClient } from "@/app/utils/client";
import { AwardAchievementType } from "@/app/utils/schema";

export async function awardAchievements(
  data: AwardAchievementType
): Promise<{ success: boolean; message: string }> {
  const supabase = getSupabaseClient();
  const { student, achievement_id } = data;

  try {
    const { data: existing, error: fetchError } = await supabase
      .from("user_achievements")
      .select("id")
      .eq("user_id", student.id)
      .eq("achievement_id", achievement_id)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (existing) {
      return {
        success: false,
        message: `${student.name} already has this achievement.`,
      };
    }

    const { error: insertError } = await supabase
      .from("user_achievements")
      .insert({
        user_id: student.id,
        achievement_id,
      });

    if (insertError) throw insertError;

    return {
      success: true,
      message: `Achievement awarded to ${student.name}.`,
    };
  } catch (err: any) {
    console.error("Error awarding achievement:", err);
    return {
      success: false,
      message:
        err?.code === "23505"
          ? `${student.name} already has this achievement.`
          : "Failed to award achievement. Please try again.",
    };
  }
}
