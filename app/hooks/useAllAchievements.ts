import { useQuery } from "@tanstack/react-query";
import { fetchAchievements } from "../services/fetchAchievements";

export function useAchievements() {
  return useQuery({
    queryKey: ["achievements"],
    queryFn: fetchAchievements,
  });
}
