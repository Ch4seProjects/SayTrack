import { getSupabaseClient } from "@/app/utils/client";
import { Title } from "../types/global";

export async function fetchTitles(): Promise<Title[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("titles")
    .select("id, name, description");

  if (error || !data) {
    console.error("Error fetching clubs:", error);
    return [];
  }

  return data as Title[];
}
