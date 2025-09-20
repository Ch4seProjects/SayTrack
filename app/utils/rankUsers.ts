import { User } from "../types/User";

export function rankUsers(users: User[]) {
  return [...users]
    .sort((a, b) => b.points - a.points)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    }));
}
