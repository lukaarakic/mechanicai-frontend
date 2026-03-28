import { cookies } from "next/headers";

export async function getJWT() {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("auth_token")?.value;

  return jwtToken || null;
}
