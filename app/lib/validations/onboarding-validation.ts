import z from "zod";
import { CarSchema } from "./car-validation";

export const ProfileSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(64, "First name must be less than 64 characters"),
  last_name: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(64, "Last name must be less than 64 characters"),
  avatar: z
    .string()
    .regex(
      /^https:\/\/api\.dicebear\.com\/9\.x\/[a-z-]+\/svg\?seed=[A-Za-z0-9]{1,64}$/,
      "Please pick an avatar",
    ),
});

export const OnboardingSchema = z.object({
  profile: ProfileSchema,
  car: CarSchema,
});
