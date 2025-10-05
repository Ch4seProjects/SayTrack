// src/services/titleService.ts
import { getSupabaseClient } from "@/app/utils/client";
import { UserTitle, RawUserTitle } from "@/app/types/global";

export async function fetchUserTitles(userId: string): Promise<UserTitle[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("user_titles")
    .select(
      `
      id,
      assigned_at,
      title:titles (
        id,
        name,
        description
      )
    `
    )
    .eq("user_id", userId);

  if (error || !data) {
    console.error("Error fetching user titles:", error);
    return [];
  }

  return (data as RawUserTitle[]).map((ut) => ({
    id: ut.title.id,
    name: ut.title.name,
    description: ut.title.description,
    assigned_at: ut.assigned_at,
  }));
}
