// src/components/SupabaseProvider.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getSupabaseClient } from "../utils/client";
import type { Session } from "@supabase/supabase-js";
import { User } from "../types/User";

type SupabaseContextType = {
  supabase: ReturnType<typeof getSupabaseClient>;
  session: Session | null;
  user: User | null;
  loadingUser: boolean;
  refreshUser: () => Promise<void>;
};

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

export function SupabaseProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: Session | null;
}) {
  const [supabase] = useState(() => getSupabaseClient());
  const [session] = useState<Session | null>(initialSession);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const fetchUser = async () => {
    if (!session?.user) {
      setUser(null);
      return;
    }
    setLoadingUser(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
      if (error) throw error;
      setUser(data);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [session]);

  return (
    <SupabaseContext.Provider
      value={{ supabase, session, user, loadingUser, refreshUser: fetchUser }}
    >
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const ctx = useContext(SupabaseContext);
  if (!ctx) throw new Error("useSupabase must be used within SupabaseProvider");
  return ctx;
}
