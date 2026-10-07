"use server";

import { ForgotPasswordSchema } from "../../validations/user-validation";
import { apiFetch } from "@/app/lib/api";

type ForgotPasswordState = {
  errors: {
    email?: string;
    general?: string;
  };
  success?: string;
};

export async function forgotPasswordAction(
  prevState: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const parsedData = ForgotPasswordSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedData.success) {
    return {
      errors: {
        email:
          parsedData.error.flatten().fieldErrors.email?.[0] ??
          "Invalid email address",
      },
    };
  }

  const res = await apiFetch("/reset-password-request", {
    method: "POST",
    auth: false,
    body: { email: parsedData.data.email },
  });

  if (res.status === 429 || res.status >= 500 || res.status === 0) {
    return {
      errors: {
        general: res.error ?? "Couldn't send the email. Please try again.",
      },
    };
  }

  // Same answer whether or not the email has an account.
  return {
    errors: {},
    success:
      "If an account exists for that email, we've sent a password reset link.",
  };
}
