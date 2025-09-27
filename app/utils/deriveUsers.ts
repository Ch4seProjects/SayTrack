import { User, Points } from "../types/User";

// Accepts either a User or a Points object
export function formatTotalPoints(user: User | Points): number {
  const character =
    "character" in user ? user.character : (user as any).character_points ?? 0;
  const participation =
    "participation" in user
      ? user.participation
      : (user as any).participation_points ?? 0;

  return character + participation;
}

export function rankUsers(users: User[]) {
  return [...users]
    .sort((a, b) => formatTotalPoints(b) - formatTotalPoints(a))
    .map((user, index) => ({
      ...user,
      totalPoints: formatTotalPoints(user),
    }));
}
