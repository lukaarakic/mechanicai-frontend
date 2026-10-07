"use server";

import z from "zod";
import { PasswordSchema } from "@/app/lib/validations/user-validation";
import { apiFetch } from "@/app/lib/api";

const UpdatePasswordSchema = z
  .object({
    password: z.string().min(1, "Current password is required"),
    "new-password": PasswordSchema,
    "password-confirm": z.string(),
  })
  .refine((data) => data["new-password"] === data["password-confirm"], {
    path: ["password-confirm"],
    message: "Passwords do not match",
  });

type UpdatePasswordState = {
  errors: {
    password?: string;
    "new-password"?: string;
    "password-confirm"?: string;
    general?: string;
  };
  success: boolean;
};

export async function updatePasswordAction(
  prevState: UpdatePasswordState,
  formData: FormData,
): Promise<UpdatePasswordState> {
  const parsedData = UpdatePasswordSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedData.success) {
    const fieldErrors = parsedData.error.flatten().fieldErrors;
    return {
      errors: {
        password: fieldErrors.password?.[0],
        "new-password": fieldErrors["new-password"]?.[0],
        "password-confirm": fieldErrors["password-confirm"]?.[0],
      },
      success: false,
    };
  }

  const res = await apiFetch("/change-password", {
    method: "POST",
    body: parsedData.data,
    // A wrong current password is also a 401.
    signOutOnUnauthorized: false,
  });

  if (!res.ok) {
    const [field, message] = res.fieldError ?? [];
    if (field === "password") {
      return {
        errors: { password: "Current password is incorrect." },
        success: false,
      };
    }
    if (field === "new-password" || field === "password-confirm") {
      return { errors: { [field]: message }, success: false };
    }
    return {
      errors: { general: res.error ?? "Failed to update password" },
      success: false,
    };
  }

  return { errors: {}, success: true };
}
