import { useQuery } from "@tanstack/react-query";
import { fetchPendingClubJoins } from "../services/fetchPendingClubJoins";
import { UserClub } from "../types/global";

export function usePendingClubJoins() {
  return useQuery<UserClub[]>({
    queryKey: ["pendingClubJoins"],
    queryFn: fetchPendingClubJoins,
  });
}
