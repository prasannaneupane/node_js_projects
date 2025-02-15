import { z } from "zod";

const GenderEnum = z.enum(["Male", "Female", "Other"]);

export const createUserSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  password: z.string(),
  gender: GenderEnum,
});

export const loginUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});