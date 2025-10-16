import { User } from "../types/global";

export const SECTIONS = [
  "Newton",
  "Bernoulli",
  "Galileo",
  "Charles",
  "Boyle",
] as const;

export const SECTIONS_OBJECT = [
  {
    id: "Newton",
    name: "Newton",
    description: "Newton",
  },
  {
    id: "Bernoulli",
    name: "Bernoulli",
    description: "Bernoulli",
  },
  {
    id: "Galileo",
    name: "Galileo",
    description: "Galileo",
  },
  {
    id: "Charles",
    name: "Charles",
    description: "Charles",
  },
  {
    id: "Boyle",
    name: "Boyle",
    description: "Boyle",
  },
];

export const LEADERBOARD_CATEGORIES = ["SECTION", "BATCH"];

export const NOTIFICATION_CATEGORIES = ["GENERAL", "CLUB"];

export const ACCOUNT_TYPES = ["student", "admin"] as const;
