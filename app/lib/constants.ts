import { User } from "../types/User";

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

export const dummyUsers: User[] = [
  {
    type: "student",
    username: "juan",
    name: "Juan Dela Cruz",
    email: "juan.delacruz@example.com",
    year: 2025,
    section: "Galileo",
    points: 3200,
  },
  {
    type: "student",
    username: "maria",
    name: "Maria Clara",
    email: "maria.clara@example.com",
    year: 2024,
    section: "Newton",
    points: 1200,
  },
  {
    type: "student",
    username: "andres",
    name: "Andres Bonifacio",
    email: "andres.bonifacio@example.com",
    year: 2023,
    section: "Bernoulli",
    points: 800,
  },
  {
    type: "student",
    username: "gabriela",
    name: "Gabriela Silang",
    email: "gabriela.silang@example.com",
    year: 2022,
    section: "Charles",
    points: 1400,
  },
  {
    type: "student",
    username: "emilio",
    name: "Emilio Aguinaldo",
    email: "emilio.aguinaldo@example.com",
    year: 2021,
    section: "Boyle",
    points: 2700,
  },
  {
    type: "student",
    username: "apolinario",
    name: "Apolinario Mabini",
    email: "apolinario.mabini@example.com",
    year: 2020,
    section: "Newton",
    points: 1600,
  },
  {
    type: "student",
    username: "jose",
    name: "Jose Rizal",
    email: "jose.rizal@example.com",
    year: 2019,
    section: "Galileo",
    points: 3100,
  },
  {
    type: "student",
    username: "melchora",
    name: "Melchora Aquino",
    email: "melchora.aquino@example.com",
    year: 2018,
    section: "Bernoulli",
    points: 2400,
  },
  {
    type: "student",
    username: "marcelo",
    name: "Marcelo H. del Pilar",
    email: "marcelo.pilar@example.com",
    year: 2017,
    section: "Charles",
    points: 2000,
  },
  {
    type: "student",
    username: "graciano",
    name: "Graciano Lopez Jaena",
    email: "graciano.jaena@example.com",
    year: 2016,
    section: "Boyle",
    points: 1900,
  },
];
