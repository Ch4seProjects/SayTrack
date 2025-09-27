"use client";

import { useState, useEffect } from "react";
import { getSupabaseClient } from "../utils/client";
import { NotificationContext } from "./NotificationContext";

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = getSupabaseClient();

  const fetchNotifications = async (): Promise<void> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .is("club_id", null)
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
