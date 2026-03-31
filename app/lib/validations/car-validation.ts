import z from "zod";

export const CarSchema = z.object({
  make: z.string().min(1, "Make is required").max(50),
  model: z.string().min(1, "Model is required").max(50),
  year: z.coerce
    .number()
    .min(1900, "Year must be a valid year")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  size: z.coerce
    .number()
    .min(50, "Engine size must be a positive number")
    .max(10000, "Engine size must be a reasonable number"),
  power: z.coerce
    .number()
    .min(1, "Power must be a positive number")
    .max(1000, "Power must be a reasonable number"),
});
