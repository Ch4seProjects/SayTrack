"use client";

import { useQuery } from "@tanstack/react-query";
import { getSupabaseClient } from "../utils/client";
import { NotificationContext } from "./NotificationContext";
import { UserClub } from "../types/global";

export function NotificationProvider({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) {
  const supabase = getSupabaseClient();

  const fetchNotifications = async (): Promise<any[]> => {
    if (!userId || userId.trim() === "") {
      console.warn("⚠️ fetchNotifications called without valid userId");
      return [];
    }

    const supabase = getSupabaseClient();

    const { data: memberships, error: membershipError } = await supabase
      .from("user_clubs")
      .select("club_id")
      .eq("user_id", userId);

    if (membershipError) throw membershipError;

    const clubIds =
      memberships?.map((m: UserClub) => m.id).filter(Boolean) ?? [];

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
    queryKey: ["notifications", userId],
    queryFn: fetchNotifications,
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
