"use server";

import { redirect } from "next/navigation";
import { ResetPasswordSchema } from "../../validations/user-validation";
import { apiFetch } from "@/app/lib/api";

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

  const res = await apiFetch("/reset-password", {
    method: "POST",
    auth: false,
    body: { ...parsedData.data, key },
  });

  if (!res.ok) {
    const [field, message] = res.fieldError ?? [];
    return {
      errors: {
        password: field === "password" ? message : undefined,
        general:
          field === "password"
            ? undefined
            : "This reset link is invalid or has expired. Request a new one.",
      },
    };
  }

  redirect("/login?reset=true");
}
