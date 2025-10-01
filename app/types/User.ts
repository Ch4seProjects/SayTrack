export type Section = "Newton" | "Bernoulli" | "Galileo" | "Charles" | "Boyle";
export type UserType = "student" | "admin";
export type LeaderboardCategory = "SECTION" | "BATCH";

export interface Points {
  character: number;
  participation: number;
}

export interface Achievement {
  title: string;
}

export interface Title {
  title: string;
}

export interface Club {
  name: string;
}

export interface UserClub {
  club_id: string;
  user_id: string;
  role: string;
  joined_at: string;
}

export interface Following {
  id: string;
}

export interface Followers {
  id: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
  club_id: string | null;
}

export interface User {
  type: UserType;
  id: string;
  name: string;
  email: string;
  year: number;
  section: Section;
  participation_points: number;
  character_points: number;
  created_at: string;
}

export interface UserMeta extends User {
  totalPoints: number;
  characterPercent: number;
  participationPercent: number;
}

export interface Profile {
  id: string;
  name: string;
  year: number;
  section: Section;
  type: UserType;
  character_points: number;
  participation_points: number;
  totalPoints: number;
}
