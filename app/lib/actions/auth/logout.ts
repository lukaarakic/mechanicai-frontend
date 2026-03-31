"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  cookieStore.delete("auth_token");
  await fetch(`${process.env.API_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  redirect("/login");
}
