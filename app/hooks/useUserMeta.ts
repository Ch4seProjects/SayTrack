import { useMemo } from "react";
import { User, UserMeta } from "../types/User";
import { formatTotalPoints } from "../utils/deriveUsers";

export function useUserMeta(user: User): UserMeta {
  return useMemo(() => {
    const totalPoints = formatTotalPoints(user);
    const characterPercent = Math.round(
      (user.points.character / totalPoints) * 100
    );
    const participationPercent = Math.round(
      (user.points.participation / totalPoints) * 100
    );

    return {
      ...user,
      totalPoints,
      characterPercent,
      participationPercent,
    };
  }, [user]);
}
