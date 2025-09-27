import { useMemo } from "react";
import { User, UserMeta, Points } from "../types/User";
import { formatTotalPoints } from "../utils/deriveUsers";

export function useUserMeta(user: User | null): UserMeta | null {
  return useMemo(() => {
    if (!user) return null;

    const points: Points = {
      character: user.character_points ?? 0,
      participation: user.participation_points ?? 0,
    };

    const totalPoints = formatTotalPoints(points);

    const characterPercent =
      totalPoints > 0 ? Math.round((points.character / totalPoints) * 100) : 0;
    const participationPercent =
      totalPoints > 0
        ? Math.round((points.participation / totalPoints) * 100)
        : 0;

    return {
      ...user,
      points,
      totalPoints,
      characterPercent,
      participationPercent,
    };
  }, [user]);
}
