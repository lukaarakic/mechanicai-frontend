import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "../types/user";

export async function getUser(): Promise<User> {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("auth_token")?.value;

  const response = await fetch(`${process.env.API_URL}/current-user`, {
    method: "GET",
    headers: { Authorization: `${jwtToken}` },
  });

  if (!response.ok) redirect("/login");

  return response.json();
}
