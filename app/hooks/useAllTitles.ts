import { useQuery } from "@tanstack/react-query";
import { fetchTitles } from "@/app/services/fetchTitles";

export function useTitles() {
  return useQuery({
    queryKey: ["titles"],
    queryFn: fetchTitles,
  });
}
