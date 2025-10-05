import { useQuery } from "@tanstack/react-query";
import { fetchUserClubs } from "../services/fetchUserClubs";

export function useUserClubs(userId?: string) {
  return useQuery({
    queryKey: ["userClubs", userId],
    queryFn: () => (userId ? fetchUserClubs(userId) : Promise.resolve([])),
    enabled: !!userId,
  });
}
