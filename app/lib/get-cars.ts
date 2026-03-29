"use server";

import { getJWT } from "./get-jwt";

export async function getCars() {
  const token = await getJWT();

  const res = await fetch(`${process.env.API_URL}/cars`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  const data = await res.json();

  return res.ok ? data : [];
}
