import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getJWT() {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("auth_token")?.value;

  if (!jwtToken) {
    console.error("JWT token not found in cookies. Redirecting to login.");
    redirect("/login");
  }

  return jwtToken;
}
