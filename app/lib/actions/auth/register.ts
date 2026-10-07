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
  // The email was already registered but never verified.
  pendingVerification?: boolean;
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

  // Signing up again with an unverified email: send a fresh link instead of an
  // error, so leaving the "check your email" screen doesn't lock people out.
  // A 400 here means a link was sent in the last few minutes, which is fine.
  if (res.status === 403 && !res.fieldError) {
    const resend = await apiFetch("/verify-account-resend", {
      method: "POST",
      auth: false,
      body: { email: parsedData.data.email },
    });

    if (resend.status === 429 || resend.status >= 500 || resend.status === 0) {
      return {
        errors: {
          general: "Couldn't send a new verification email. Please try again.",
        },
      };
    }

    return {
      errors: null,
      success: true,
      email: parsedData.data.email,
      pendingVerification: true,
    };
  }

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
