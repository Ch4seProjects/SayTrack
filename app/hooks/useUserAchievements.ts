import { useQuery } from "@tanstack/react-query";
import { fetchUserAchievements } from "../services/fetchUserAchievements";
import { UserAchievement } from "../types/global";

export function useUserAchievements(userId?: string) {
  return useQuery<UserAchievement[]>({
    queryKey: ["userAchievements", userId],
    queryFn: () =>
      userId ? fetchUserAchievements(userId) : Promise.resolve([]),
    enabled: !!userId && userId.trim() !== "",
  });
}
