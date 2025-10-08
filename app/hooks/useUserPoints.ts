import { useQuery } from "@tanstack/react-query";
import { fetchUserPoints } from "../services/fetchUserPoints";
import { UserPoints } from "../types/global";

export function useUserPoints(userId?: string) {
  return useQuery<UserPoints[]>({
    queryKey: ["userPoints", userId],
    queryFn: () => (userId ? fetchUserPoints(userId) : Promise.resolve([])),
    enabled: !!userId && userId.trim() !== "",
  });
}
