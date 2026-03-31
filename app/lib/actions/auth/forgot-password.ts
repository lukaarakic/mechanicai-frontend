"use server";

import { redirect } from "next/navigation";
import { ForgotPasswordSchema } from "../../validations/user-validation";

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
    const fieldErrors = parsedData.error.flatten().fieldErrors;
    return {
      errors: {
        email: fieldErrors.email?.[0],
        general:
          parsedData.error.flatten().formErrors?.[0] || "Invalid email address",
      },
    };
  }

  const response = await fetch(
    `${process.env.API_URL}/reset-password-request`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: parsedData.data.email }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    return {
      errors: {
        general:
          errorData.message ||
          "An error occurred while requesting password reset",
      },
    };
  }

  return {
    ...prevState,
    success: "Password reset link sent to your email.",
  };
}
