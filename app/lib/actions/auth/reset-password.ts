"use server";

import { redirect } from "next/navigation";
import { ResetPasswordSchema } from "../../validations/user-validation";

type ResetPasswordState = {
  errors: {
    password?: string;
    "password-confirm"?: string;
    general?: string;
  } | null;
};

export async function resetPasswordAction(
  key: string,
  prevState: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const parsedData = ResetPasswordSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedData.success) {
    const fieldErrors = parsedData.error.flatten().fieldErrors;
    return {
      errors: {
        password: fieldErrors.password?.[0],
        "password-confirm": fieldErrors["password-confirm"]?.[0],
        general: parsedData.error.flatten().formErrors[0],
      },
    };
  }

  console.log(
    "Resetting password with data:",
    parsedData.data,
    "and key:",
    key,
  );

  const response = await fetch(`${process.env.API_URL}/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...parsedData.data, key }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.log("Reset password error:", error);
    return {
      errors: {
        general: error.error || "Failed to reset password",
      },
    };
  }

  redirect("/login?reset=true");

  return { errors: null };
}
