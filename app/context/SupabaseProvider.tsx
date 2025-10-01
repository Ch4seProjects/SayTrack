// src/components/SupabaseProvider.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getSupabaseClient } from "../utils/client";
import type { Session, AuthChangeEvent } from "@supabase/supabase-js";
import { User } from "../types/global";

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
  const [session, setSession] = useState<Session | null>(initialSession);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const fetchUser = async (s: Session | null = session) => {
    if (!s?.user) {
      setUser(null);
      return;
    }
    setLoadingUser(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", s.user.id)
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
    // listen for login/logout/session refresh
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, newSession: Session | null) => {
        setSession(newSession);
        fetchUser(newSession);
      }
    );

    // in case initialSession was null but supabase already has one cached
    supabase.auth
      .getSession()
      .then(({ data }: { data: { session: Session | null } }) => {
        setSession(data.session);
        fetchUser(data.session);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

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
