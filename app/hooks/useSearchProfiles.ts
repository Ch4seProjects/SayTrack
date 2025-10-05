import { useQuery } from "@tanstack/react-query";
import { searchService } from "@/app/services/searchService";
import { Profile } from "@/app/types/global";

export function useSearchProfiles(query: string) {
  return useQuery<Profile[]>({
    queryKey: ["searchProfiles", query],
    queryFn: () => (query.trim() ? searchService(query) : Promise.resolve([])),
    enabled: query.trim() !== "",
  });
}
