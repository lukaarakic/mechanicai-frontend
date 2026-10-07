"use server";

import { RegisterSchema } from "@/app/lib/validations/user-validation";
import { apiFetch } from "@/app/lib/api";

type RegisterState = {
  errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  } | null;
  success?: boolean;
  email?: string;
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

  const res = await apiFetch("/register", {
    method: "POST",
    auth: false,
    body: {
      email: parsedData.data.email,
      password: parsedData.data.password,
      "password-confirm": parsedData.data.confirmPassword,
    },
  });

  if (!res.ok) {
    const [field, message] = res.fieldError ?? [];

    return {
      errors: {
        email:
          field === "email"
            ? "An account with that email already exists."
            : undefined,
        password: field === "password" ? message : undefined,
        confirmPassword: field === "password-confirm" ? message : undefined,
        general: res.error ?? "Registration failed. Please try again.",
      },
    };
  }

  return { errors: null, success: true, email: parsedData.data.email };
}
