"use client";
import { Profile } from "../types/global";
import { createContext, useContext } from "react";
import { LeaderboardCategory } from "../types/global";

export interface LeaderboardContextType {
  users: Profile[];
  filteredUsers: Profile[];
  loading: boolean;
  refresh: () => Promise<void>;
  category: LeaderboardCategory;
  setCategory: (category: LeaderboardCategory) => void;
  currentUserRank: number | null;
}

export const LeaderboardContext = createContext<
  LeaderboardContextType | undefined
>(undefined);

export function useLeaderboardContext() {
  const context = useContext(LeaderboardContext);
  if (!context) {
    throw new Error(
      "useLeaderboardContext must be used within a LeaderboardProvider"
    );
  }
  return context;
}
