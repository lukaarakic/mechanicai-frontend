"use server";

import { getJWT } from "@/app/lib/get-jwt";
import { getUser } from "@/app/lib/get-user";

export async function subscribeAction(): Promise<{ customer_id: string }> {
  const user = await getUser();
  const token = await getJWT();

  const response = await fetch(
    `${process.env.API_URL}/accounts/${user.id}/payment/subscribe`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    },
  );

  if (!response.ok) {
    console.log(await response.json());
    // throw new Error("Failed to create subscription");
  }

  const data = await response.json();
  return data;
}
