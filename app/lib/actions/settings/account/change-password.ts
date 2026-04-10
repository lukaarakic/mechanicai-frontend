"use server";

import z from "zod";
import { revalidatePath } from "next/cache";
import { PasswordSchema } from "@/app/lib/validations/user-validation";
import { getJWT } from "@/app/lib/get-jwt";

const UpdatePasswordSchema = z
  .object({
    password: PasswordSchema,
    "new-password": PasswordSchema,
    "password-confirm": PasswordSchema,
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
  const token = await getJWT();

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

  const res = await fetch(`${process.env.API_URL}/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(parsedData.data),
  });

  if (!res.ok) {
    return { errors: { general: "Failed to update password" }, success: false };
  }

  revalidatePath("/settings/account");
  return { errors: {}, success: true };
}
