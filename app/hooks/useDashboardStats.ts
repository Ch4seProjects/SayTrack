import { useEffect, useState } from "react";
import { fetchUserCountsBySection } from "../services/fetchUserCountsBySection";
import { fetchClubs } from "../services/fetchClubs";
import { fetchAchievements } from "../services/fetchAchievements";
import { fetchTitles } from "../services/fetchTitles";

export function useDashboardStats() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sectionCounts, setSectionCounts] = useState<
    { section: string; count: number }[]
  >([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalClubs, setTotalClubs] = useState(0);
  const [totalTitles, setTotalTitles] = useState(0);
  const [totalAchievements, setTotalAchievements] = useState(0);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        setError(null);

        // Fetch both in parallel for speed
        const [userStats, clubs, titles, achievements] = await Promise.all([
          fetchUserCountsBySection(),
          fetchClubs(),
          fetchTitles(),
          fetchAchievements(),
        ]);

        setSectionCounts(userStats.sectionCounts);
        setTotalUsers(userStats.totalCount);
        setTotalAdmins(userStats.totalAdmins);
        setTotalClubs(clubs.length);
        setTotalTitles(titles.length);
        setTotalAchievements(achievements.length);
      } catch (err) {
        console.error("Error loading dashboard stats:", err);
        setError("Failed to load stats");
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return {
    loading,
    error,
    sectionCounts,
    totalAdmins,
    totalUsers,
    totalClubs,
    totalTitles,
    totalAchievements,
  };
}
