import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("auth_token")?.value;

  const response = await fetch(`${process.env.API_URL}/current-user`, {
    method: "GET",
    headers: { Authorization: `${jwtToken}` },
  });

  return response.ok ? await response.json() : null;
}
