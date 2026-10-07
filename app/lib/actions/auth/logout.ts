"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiFetch, AUTH_COOKIE } from "@/app/lib/api";

export async function logoutAction() {
  // Revoke the session on the API first so the token can't be reused.
  await apiFetch("/logout", {
    method: "POST",
    body: {},
    signOutOnUnauthorized: false,
  });

  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);

  redirect("/login");
}
