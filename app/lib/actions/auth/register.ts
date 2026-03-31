"use server";

import { RegisterSchema } from "@/app/lib/validations/user-validation";
import { flattenZodErrors } from "@/app/utils/flattenZodErrors";
import z from "zod";

type RegisterState = {
  errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  } | null;
  success?: boolean;
};

export async function registerAction(
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const parsedData = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedData.success) {
    const fieldErrors = parsedData.error.flatten().fieldErrors;

    return {
      errors: {
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
        general:
          parsedData.error.flatten().formErrors[0] ||
          "Please fix the errors below.",
      },
    };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: parsedData.data.email,
        password: parsedData.data.password,
        "password-confirm": parsedData.data.confirmPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Registration failed", errorData);
      const [field, message] = errorData["field-error"] || [];

      return {
        errors: {
          email:
            field === "email"
              ? "Already an account with that email exists."
              : undefined,
          password: field === "password" ? message : undefined,
          confirmPassword: field === "password-confirm" ? message : undefined,
          general: errorData.error || "Registration failed. Please try again.",
        },
      };
    }

    return {
      errors: null,
      success: true,
    };
  } catch (err) {
    console.error("Registration request failed", err);
    return {
      errors: {
        general: "An unexpected error occurred. Please try again.",
      },
    };
  }
}
