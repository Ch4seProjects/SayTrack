export type Section = "Newton" | "Bernoulli" | "Galileo" | "Charles" | "Boyle";
export type UserType = "student" | "admin";

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
  points: Points;
  achievements: Achievement[];
  titles: Title[];
  clubs: Club[];
  following: Following[];
  followers: Followers[];
}

export interface UserMeta extends User {
  totalPoints: number;
  characterPercent: number;
  participationPercent: number;
}
