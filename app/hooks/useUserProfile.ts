import { useQuery } from "@tanstack/react-query";
import { fetchProfileById } from "../services/fetchProfileById";
import { Profile } from "@/app/types/global";

export function useUserProfile(userId?: string) {
  return useQuery<Profile | null>({
    queryKey: ["userProfile", userId],
    queryFn: () => (userId ? fetchProfileById(userId) : Promise.resolve(null)),
    enabled: !!userId,
  });
}
