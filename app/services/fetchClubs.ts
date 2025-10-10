import { getSupabaseClient } from "@/app/utils/client";
import { Club } from "@/app/types/global";

export async function fetchClubs(): Promise<Club[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("clubs")
    .select("id, name, description");

  if (error || !data) {
    console.error("Error fetching clubs:", error);
    return [];
  }

  return data as Club[];
}
