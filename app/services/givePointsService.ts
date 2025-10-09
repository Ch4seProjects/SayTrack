import { getSupabaseClient } from "@/app/utils/client";
import { GivePointsType } from "@/app/utils/schema";

export async function givePoints(
  data: GivePointsType,
  adminId: string
): Promise<{ success: boolean; message: string }> {
  const supabase = getSupabaseClient();

  const { student, points, type, reason } = data;

  try {
    // 1️⃣ Insert into user_points log
    const { error: insertError } = await supabase.from("user_points").insert({
      user_id: student.id,
      given_by: adminId,
      point_type: type,
      points,
      reason: reason,
    });

    if (insertError) throw insertError;

    // 2️⃣ Increment user's points using RPC (atomic + safe)
    const { error: rpcError } = await supabase.rpc("increment_points", {
      user_id: student.id,
      amount: points,
      point_type: type,
      reason: reason,
    });

    if (rpcError) throw rpcError;

    return {
      success: true,
      message: `Gave ${points} ${type} points to ${student.name}.`,
    };
  } catch (err: any) {
    console.error("Error giving points:", err);
    return {
      success: false,
      message: "Failed to give points. Please try again.",
    };
  }
}
