import { User } from "../types/global";

export const SECTIONS = [
  "Newton",
  "Bernoulli",
  "Galileo",
  "Charles",
  "Boyle",
] as const;

export const LEADERBOARD_CATEGORIES = ["SECTION", "BATCH"];

export const NOTIFICATION_CATEGORIES = ["GENERAL", "CLUB"];

export const ACCOUNT_TYPES = ["student", "admin"] as const;
