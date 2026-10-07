import z from "zod";

export const CAR_MIN_YEAR = 1900;
export const CAR_MAX_YEAR = new Date().getFullYear() + 1;

export const CarSchema = z.object({
  make: z.string().trim().min(1, "Make is required").max(50),
  model: z.string().trim().min(1, "Model is required").max(50),
  year: z.coerce
    .number({ error: "Year is required" })
    .int("Year must be a whole number")
    .min(CAR_MIN_YEAR, "Year must be a valid year")
    .max(CAR_MAX_YEAR, "Year cannot be in the future"),
  size: z.coerce
    .number({ error: "Engine size is required" })
    .int("Engine size must be a whole number")
    .min(50, "Engine size must be at least 50cc")
    .max(10000, "Engine size must be a reasonable number"),
  power: z.coerce
    .number({ error: "Power is required" })
    .int("Power must be a whole number")
    .min(1, "Power must be a positive number")
    .max(2000, "Power must be a reasonable number"),
});
