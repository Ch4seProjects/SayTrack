import { useQuery } from "@tanstack/react-query";
import { fetchPendingUsers } from "../services/fetchPendingUsers";
import { Profile } from "../types/global";

export function usePendingUsers() {
  return useQuery<Profile[]>({
    queryKey: ["pendingUsers"],
    queryFn: fetchPendingUsers,
  });
}
