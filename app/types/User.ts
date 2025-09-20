export type Section = "Newton" | "Bernoulli" | "Galileo" | "Charles" | "Boyle";
export type UserType = "student" | "admin";

export interface User {
  type: UserType;
  username: string;
  name: string;
  email: string;
  year: number;
  section: Section;
  points: number;
}
