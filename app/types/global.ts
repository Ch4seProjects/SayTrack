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
  id: string;
  name: string;
  description: string;
}

export interface Following {
  id: string;
}

export interface Followers {
  id: string;
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
  email: string;
  year: number;
  section: Section;
  type: UserType;
  character_points: number;
  participation_points: number;
  totalPoints: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
  club_id: string | null;
  clubs?: {
    name: string;
  } | null;
}

export interface RawUserClub {
  id: string;
  role: string;
  joined_at: string;
  club: Club;
}

export interface UserClub {
  club_id: string;
  name?: string;
  description?: string;
  role?: string;
  joined_at?: string;
}

export type RawUserTitle = {
  id: string;
  assigned_at: string;
  title: {
    id: string;
    name: string;
    description: string | null;
  };
};

export type UserTitle = {
  id: string;
  name: string;
  description: string | null;
  assigned_at: string;
};

export type RawUserAchievement = {
  id: string;
  achieved_at: string;
  achievement: {
    id: string;
    name: string;
    description: string | null;
  };
};

export type UserAchievement = {
  id: string;
  name: string;
  description: string | null;
  achieved_at: string;
};

export interface RawUserFollow {
  followed_at: string;
  follower?: {
    id: string;
    name: string;
    section: string | null;
  };
  following?: {
    id: string;
    name: string;
    section: string | null;
  };
}

export interface UserSummary {
  id: string;
  name: string;
  section: string | null;
  followed_at: string;
}

export interface SearchResult {
  id: string;
  name: string;
  year: number;
  section: Section;
}

export interface RawUserPoints {
  id: string;
  point_type: "participation" | "character";
  points: number;
  reason: string | null;
  created_at: string;
  given_by: {
    id: string;
    username: string;
    avatar_url: string | null;
  } | null;
}

export interface UserPoints {
  id: string;
  point_type: "participation" | "character";
  points: number;
  reason?: string | null;
  created_at: string;
  given_by?: {
    id: string;
    username: string;
    avatar_url?: string | null;
  } | null;
}
