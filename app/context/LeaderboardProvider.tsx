"use client";

import { useState, useMemo, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { LeaderboardCategory, Profile } from "../types/global";
import { fetchLeaderboardProfiles } from "../services/fetchLeaderboardProfiles";
import { LeaderboardContext } from "./LeaderboardContext";
import { useSupabase } from "./SupabaseProvider";

export function LeaderboardsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSupabase();

  const [category, setCategory] = useState<LeaderboardCategory>("SECTION");

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["leaderboardProfiles"],
    queryFn: fetchLeaderboardProfiles,
  });

  // Optional: refetch on category change if you want fresh data
  useEffect(() => {
    refetch();
  }, [category, refetch]);

  const filteredUsers = useMemo(() => {
    if (!user) return [];

    let group: Profile[] = [];

    if (category === "SECTION") {
      group = users.filter((u) => u.section === user.section);
    } else if (category === "BATCH") {
      group = users.filter((u) => u.year === user.year);
    } else {
      group = [...users];
    }

    return group.sort((a, b) => b.totalPoints - a.totalPoints);
  }, [category, users, user]);

  const currentUserRank = useMemo(() => {
    if (!user || filteredUsers.length === 0) return null;
    const idx = filteredUsers.findIndex((u) => u.id === user.id);
    return idx >= 0 ? idx + 1 : null; // 1-based rank
  }, [filteredUsers, user]);

  return (
    <LeaderboardContext.Provider
      value={{
        users,
        filteredUsers,
        loading: isLoading,
        refresh: () => refetch(),
        category,
        setCategory,
        currentUserRank,
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
}

// --- Hook (unchanged) ---
export function useLeaderboards() {
  const ctx = useContext(LeaderboardContext);
  if (!ctx)
    throw new Error("useLeaderboards must be used within LeaderboardsProvider");
  return ctx;
}
