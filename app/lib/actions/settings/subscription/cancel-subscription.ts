"use server";

import { getJWT } from "@/app/lib/get-jwt";
import { getUser } from "@/app/lib/get-user";
import { revalidatePath } from "next/cache";

export async function cancelSubscriptionAction() {
  const token = await getJWT();
  const { id } = await getUser();

  const res = await fetch(
    `${process.env.API_URL}/accounts/${id}/payment/cancel`,
    {
      method: "POST",
      headers: { Authorization: `${token}` },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to cancel subscription");
  }

  console.log("Subscription cancelled");
  revalidatePath("/settings/subscription");
}
