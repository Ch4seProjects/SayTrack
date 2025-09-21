import { User } from "../types/User";

export function formatTotalPoints(user: User): number {
  return user.points.character + user.points.participation;
}

export function rankUsers(users: User[]) {
  return [...users]
    .sort((a, b) => formatTotalPoints(b) - formatTotalPoints(a))
    .map((user, index) => ({
      ...user,
      totalPoints: formatTotalPoints(user),
    }));
}
