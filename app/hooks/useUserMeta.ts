import { useMemo } from "react";
import { User } from "../types/User";
import { formatTotalPoints } from "../utils/deriveUsers";

export function useUserMeta(user: User) {
  return useMemo(() => {
    const totalPoints = formatTotalPoints(user);
    const characterPercent = Math.round(
      (user.points.character / totalPoints) * 100
    );
    const participationPercent = Math.round(
      (user.points.participation / totalPoints) * 100
    );

    return {
      type: user.type,
      username: user.username,
      name: user.name,
      email: user.email,
      year: user.year,
      section: user.section,
      points: user.points,
      achievements: user.achievements,
      titles: user.titles,
      clubs: user.clubs,
      following: user.following,
      followers: user.followers,
      totalPoints,
      characterPercent,
      participationPercent,
    };
  }, [user]);
}
