import { useQuery } from "@tanstack/react-query";
import { fetchUserTitles } from "../services/fetchUserTitles";
import { UserTitle } from "../types/global";

export function useUserTitles(userId?: string) {
  return useQuery<UserTitle[]>({
    queryKey: ["userTitles", userId],
    queryFn: () => (userId ? fetchUserTitles(userId) : Promise.resolve([])),
    enabled: !!userId && userId.trim() !== "",
  });
}
