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
    .matches(
      /^[A-Za-z]+(?:\s[A-Za-z]+)+$/,
      "Please enter your full name (first and last)"
    ),
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
  // reason: yup
  //   .string()
  //   .min(3, "Reason must be at least 3 characters")
  //   .required("Reason is required"),
});

export type SignUpType = yup.InferType<typeof signUpSchema>;
export type LoginType = yup.InferType<typeof loginSchema>;
export type GivePointsType = yup.InferType<typeof givePointsSchema>;
