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

export function getOrdinalSuffix(rank: number | null): string {
  if (rank === null || rank <= 0) return "";

  const j = rank % 10;
  const k = rank % 100;

  if (j === 1 && k !== 11) {
    return `${rank}st`;
  }
  if (j === 2 && k !== 12) {
    return `${rank}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${rank}rd`;
  }
  return `${rank}th`;
}
