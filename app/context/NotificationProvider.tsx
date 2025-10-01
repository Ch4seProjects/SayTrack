"use client";

import { useState, useEffect } from "react";
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
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = getSupabaseClient();

  const fetchNotifications = async (): Promise<void> => {
    if (!userId) return;
    setLoading(true);
    try {
      // 1. Get clubs this user is a member of
      const { data: memberships, error: membershipError } = await supabase
        .from("user_clubs")
        .select("club_id")
        .eq("user_id", userId);

      if (membershipError) throw membershipError;

      const clubIds = memberships?.map((m: UserClub) => m.club_id) ?? [];

      // 2. Fetch notifications: global OR from clubs user belongs to
      const { data, error } = await supabase
        .from("notifications")
        .select("*, clubs(name)")
        .or(
          `club_id.is.null${
            clubIds.length > 0 ? `,club_id.in.(${clubIds.join(",")})` : ""
          }`
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNotifications(data ?? []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, loading, refresh: fetchNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
