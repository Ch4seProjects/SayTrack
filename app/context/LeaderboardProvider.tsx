"use client";
import { useState, useEffect, useContext, useMemo } from "react";
import { LeaderboardCategory, Profile } from "../types/global";
import { fetchLeaderboardProfiles } from "../services/leaderboardService";
import { LeaderboardContext } from "./LeaderboardContext";
import { useSupabase } from "./SupabaseProvider";

export function LeaderboardsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSupabase();
  const [category, setCategory] = useState<LeaderboardCategory>("SECTION");
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const profiles = await fetchLeaderboardProfiles();
    setUsers(profiles);
    setLoading(false);
  };

  const filteredUsers = useMemo(() => {
    if (!user) return [];

    let group: typeof users = [];
    if (category === "SECTION") {
      group = users.filter((u) => u.section === user.section);
    } else if (category === "BATCH") {
      group = users.filter((u) => u.year === user.year);
    } else {
      group = [...users];
    }

    return group.sort((a, b) => b.totalPoints - a.totalPoints);
  }, [category, users]);

  const currentUserRank = useMemo(() => {
    if (!user || filteredUsers.length === 0) return null;
    const idx = filteredUsers.findIndex((u) => u.id === user.id);
    return idx >= 0 ? idx + 1 : null; // 1-based rank
  }, [filteredUsers, user]);

  useEffect(() => {
    load();
  }, []);

  return (
    <LeaderboardContext.Provider
      value={{
        users,
        filteredUsers,
        loading,
        refresh: load,
        category,
        setCategory,
        currentUserRank,
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
}

export function useLeaderboards() {
  const ctx = useContext(LeaderboardContext);
  if (!ctx)
    throw new Error("useLeaderboards must be used within LeaderboardProvider");
  return ctx;
}
