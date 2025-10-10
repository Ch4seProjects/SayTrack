import { useQuery } from "@tanstack/react-query";
import { fetchClubs } from "../services/fetchClubs";

export function useClubs() {
  return useQuery({
    queryKey: ["clubs"],
    queryFn: fetchClubs,
  });
}
