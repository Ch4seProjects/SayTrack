"use client";

import { useQuery } from "@tanstack/react-query";
import { getSupabaseClient } from "../utils/client";
import { NotificationContext } from "./NotificationContext";
import { UserClub } from "../types/global";
import { useIsAdmin } from "../hooks/useIsAdmin";

export function NotificationProvider({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId?: string;
}) {
  const isAdmin = useIsAdmin();

  const fetchUserNotifications = async (): Promise<any[]> => {
    if (!userId || userId.trim() === "") {
      console.warn("⚠️ Skipping notifications fetch — no valid userId");
      return [];
    }

    const supabase = getSupabaseClient();

    if (isAdmin) {
      const { data, error } = await supabase
        .from("notifications")
        .select("*, clubs(name)")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching all notifications (admin):", error);
        return [];
      }

      return data ?? [];
    }

    const { data: memberships, error: membershipError } = await supabase
      .from("user_clubs")
      .select("club_id")
      .eq("user_id", userId)
      .eq("status", "joined");

    if (membershipError) throw membershipError;

    const clubIds =
      memberships?.map((m: UserClub) => m.club_id).filter(Boolean) ?? [];

    let query = supabase
      .from("notifications")
      .select("*, clubs(name)")
      .order("created_at", { ascending: false });

    if (clubIds.length > 0) {
      query = query.or(`club_id.is.null,club_id.in.(${clubIds.join(",")})`);
    } else {
      query = query.or(`club_id.is.null`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }

    return data ?? [];
  };

  const {
    data: notifications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["notifications", userId, isAdmin],
    queryFn: fetchUserNotifications,
    enabled: !!userId && userId.trim() !== "",
    staleTime: 1000 * 30,
    refetchOnWindowFocus: true,
  });

  return (
    <NotificationContext.Provider
      value={{ notifications, loading: isLoading, refresh: refetch }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
