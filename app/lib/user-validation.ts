import { z } from "zod";

export const PasswordSchema = z
  .string({ error: "Password is required" })
  .min(6, { message: "Password is too short" })
  .max(50, { message: "Password is too long" });
export const EmailSchema = z
  .string({ error: "Email is required" })
  .email({ message: "Email is invalid" })
  .min(3, { message: "Email is too short" })
  .max(100, { message: "Email is too long" })
  .transform((value) => value.toLowerCase());

export const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});
