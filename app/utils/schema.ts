import * as yup from "yup";
import { SECTIONS, ACCOUNT_TYPES } from "../lib/constants";

export const signUpSchema = yup.object({
  type: yup
    .string()
    .required("Type is required")
    .oneOf(ACCOUNT_TYPES, "Invalid type"),
  name: yup
    .string()
    .required("Name is required")
    .trim()
    .max(200, "Name is too long"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),
  year: yup.string().when("type", {
    is: "student",
    then: (schema) =>
      schema
        .required("Year is required")
        .matches(/^\d{4}$/, "Year must be a 4-digit number")
        .test(
          "is-valid-year",
          "Year must be between 1900 and 2100",
          (value) =>
            !value ||
            (parseInt(value, 10) >= 1900 && parseInt(value, 10) <= 2100)
        ),
    otherwise: (schema) => schema.strip(),
  }),
  section: yup.string().when("type", {
    is: "student",
    then: (schema) =>
      schema.required("Section is required").oneOf(SECTIONS, "Invalid section"),
    otherwise: (schema) => schema.strip(),
  }),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
      "Password must be at least 8 characters long, include a number, a symbol, and an uppercase letter"
    ),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
      "Password must be at least 8 characters long, include a number, a symbol, and an uppercase letter"
    ),
});

export const givePointsSchema = yup.object().shape({
  student: yup
    .object({
      id: yup.string().required(),
      name: yup.string().required(),
    })
    .required("Please select a student"),
  points: yup
    .number()
    .typeError("Points must be a number")
    .positive("Points must be positive")
    .required("Points are required"),
  type: yup
    .string()
    .oneOf(["participation", "character"], "Select a point type")
    .required("Type is required"),
  reason: yup
    .string()
    .min(3, "Reason must be at least 3 characters")
    .required("Reason is required"),
});

export const editProfileSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .trim()
    .max(200, "Name is too long"),

  year: yup
    .string()
    .nullable()
    .matches(/^\d{4}$/, "Year must be a 4-digit number")
    .test(
      "is-valid-year",
      "Year must be between 1900 and 2100",
      (value) =>
        !value || (parseInt(value, 10) >= 1900 && parseInt(value, 10) <= 2100)
    )
    .optional(),

  section: yup
    .string()
    .nullable()
    .oneOf(SECTIONS, "Invalid section")
    .optional(),
  avatar_url: yup
    .mixed<File | string>()
    .test("is-valid-avatar", "Avatar must be a valid file or URL", (value) => {
      if (!value) return true; // optional
      if (typeof value === "string") return /^https?:\/\//.test(value); // must be valid URL
      if (value instanceof File) {
        // check file type and size
        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        const maxSize = 2 * 1024 * 1024; // 2 MB
        return validTypes.includes(value.type) && value.size <= maxSize;
      }
      return false;
    })
    .nullable()
    .optional(),
});

export const clubSchema = yup.object().shape({
  name: yup
    .string()
    .required("Club name is required")
    .min(3, "Club name must be at least 3 characters long")
    .max(50, "Club name must be at most 50 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long")
    .max(200, "Description must be at most 200 characters"),
});

export const titleSchema = yup.object().shape({
  name: yup
    .string()
    .required("Title name is required")
    .min(3, "Title name must be at least 3 characters long")
    .max(50, "Title name must be at most 50 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long")
    .max(200, "Description must be at most 200 characters"),
});

export const achievementSchema = yup.object().shape({
  name: yup
    .string()
    .required("Achievement name is required")
    .min(3, "Achievement name must be at least 3 characters long")
    .max(50, "Achievement name must be at most 50 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long")
    .max(200, "Description must be at most 200 characters"),
});

export const notificationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Notification title is required")
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters"),

  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters long")
    .max(500, "Message must be at most 500 characters"),

  club_id: yup
    .string()
    .nullable()
    .optional()
    .transform((v) => (v === "" ? null : v)),
});

export const awardTitleSchema = yup.object().shape({
  student: yup
    .object({
      id: yup.string().required(),
      name: yup.string().required(),
    })
    .required("Please select a student"),
  title_id: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .required("Title is required"),
});

export const awardAchievementSchema = yup.object().shape({
  student: yup
    .object({
      id: yup.string().required(),
      name: yup.string().required(),
    })
    .required("Please select a student"),
  achievement_id: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .required("Achievement is required"),
});

export type SignUpType = yup.InferType<typeof signUpSchema>;
export type LoginType = yup.InferType<typeof loginSchema>;
export type GivePointsType = yup.InferType<typeof givePointsSchema>;
export type EditProfileType = yup.InferType<typeof editProfileSchema>;
export type AddTitleType = yup.InferType<typeof titleSchema>;
export type AddAchievementType = yup.InferType<typeof achievementSchema>;
export type AddNotificationType = yup.InferType<typeof notificationSchema>;
export type AddClubType = yup.InferType<typeof clubSchema>;
export type AwardTitleType = yup.InferType<typeof awardTitleSchema>;
export type AwardAchievementType = yup.InferType<typeof awardAchievementSchema>;
