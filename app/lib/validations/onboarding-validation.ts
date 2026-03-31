import z from "zod";
import { CarSchema } from "./car-validation";

export const OnboardingSchema = z.object({
  profile: z.object({
    first_name: z.string().min(2, "First name must be at least 2 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters"),
  }),
  car: CarSchema,
});
