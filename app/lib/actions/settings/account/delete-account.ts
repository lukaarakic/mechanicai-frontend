"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import z from "zod";
import { apiFetch, AUTH_COOKIE } from "@/app/lib/api";

const DeleteAccountSchema = z.object({
  password: z.string().min(1, "Enter your password to confirm"),
});

export type DeleteAccountState = {
  errors: { password?: string; general?: string };
  success: boolean;
};

export async function deleteAccountAction(
  prevState: DeleteAccountState,
  formData: FormData,
): Promise<DeleteAccountState> {
  const parsed = DeleteAccountSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      errors: { password: parsed.error.flatten().fieldErrors.password?.[0] },
      success: false,
    };
  }

  const res = await apiFetch("/close-account", {
    method: "POST",
    body: { password: parsed.data.password },
    // A wrong password is also a 401.
    signOutOnUnauthorized: false,
  });

  if (!res.ok) {
    const [field, message] = res.fieldError ?? [];
    if (field === "password" && res.status === 401) {
      return { errors: { password: "Incorrect password." }, success: false };
    }
    return {
      errors: { general: message ?? res.error ?? "Failed to delete account" },
      success: false,
    };
  }

  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);

  redirect("/login");
}
