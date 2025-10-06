"use client";

import { useSupabase } from "@/app/context/SupabaseProvider";
import { useUserMeta } from "@/app/hooks/useUserMeta";

export function useIsAdmin(): boolean {
  const { user } = useSupabase();
  const userMeta = useUserMeta(user);

  return userMeta?.type === "admin";
}
