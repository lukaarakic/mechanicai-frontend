"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import z from "zod";
import { PasswordSchema } from "@/app/lib/user-validation";
import { getJWT } from "@/app/lib/get-jwt";

const DeleteAccountSchema = z.object({
  password: PasswordSchema,
});

export type DeleteAccountState = {
  errors: { password?: string; general?: string };
  success: boolean;
};

export async function deleteAccountAction(
  prevState: DeleteAccountState,
  formData: FormData,
): Promise<DeleteAccountState> {
  const token = await getJWT();

  const parsed = DeleteAccountSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      errors: { password: parsed.error.flatten().fieldErrors.password?.[0] },
      success: false,
    };
  }

  const res = await fetch(`${process.env.API_URL}/close-account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({ password: parsed.data.password }),
  });

  if (!res.ok) {
    const error = await res.json();
    return {
      errors: {
        general: error["field-error"]?.[1] ?? "Failed to delete account",
      },
      success: false,
    };
  }

  const cookieStore = await cookies();
  cookieStore.delete("auth_token");

  redirect("/login");
}
