"use server";

import { getJWT } from "@/app/lib/get-jwt";
import { getUser } from "@/app/lib/get-user";

export async function getSubscription() {
  const token = await getJWT();
  const { id } = await getUser();

  const res = await fetch(
    `${process.env.API_URL}/accounts/${id}/payment/subscription`,
    {
      method: "GET",
      headers: { Authorization: `${token}` },
      cache: "no-store",
    },
  );

  const data = await res.json();

  return res.ok
    ? data
    : {
        subscribed: false,
        cancel_at_period_end: data.cancel_at_period_end,
        renews_at: data.renews_at,
      };
}
