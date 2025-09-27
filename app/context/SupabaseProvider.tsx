// src/components/SupabaseProvider.tsx
"use client";

import { createContext, useContext, useState } from "react";
import { getSupabaseClient } from "../utils/client";
import type { Session } from "@supabase/supabase-js";

type SupabaseContextType = {
  supabase: ReturnType<typeof getSupabaseClient>;
  session: Session | null;
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

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const ctx = useContext(SupabaseContext);
  if (!ctx) throw new Error("useSupabase must be used within SupabaseProvider");
  return ctx;
}
