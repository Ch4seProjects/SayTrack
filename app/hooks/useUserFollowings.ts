"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUserFollowing } from "@/app/services/fetchUserFollowing";
import { UserSummary } from "@/app/types/global";

export function useUserFollowings(userId?: string) {
  return useQuery<UserSummary[]>({
    queryKey: ["userFollowings", userId],
    queryFn: () => (userId ? fetchUserFollowing(userId) : Promise.resolve([])),
    enabled: !!userId,
  });
}
