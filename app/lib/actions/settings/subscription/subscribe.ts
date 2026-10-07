"use server";

import { apiFetch } from "@/app/lib/api";
import { getUser } from "@/app/lib/get-user";

export async function subscribeAction(): Promise<
  { customerId: string; error: null } | { customerId: null; error: string }
> {
  const user = await getUser();

  const res = await apiFetch<{ customer_id: string }>(
    `/accounts/${user.id}/payment/subscribe`,
    { method: "POST" },
  );

  if (!res.ok || !res.data?.customer_id) {
    return {
      customerId: null,
      error: res.error ?? "Couldn't start checkout. Please try again.",
    };
  }

  return { customerId: res.data.customer_id, error: null };
}
