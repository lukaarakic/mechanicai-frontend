"use server";

import { apiFetch } from "@/app/lib/api";
import { getUser } from "@/app/lib/get-user";
import { revalidatePath } from "next/cache";

export async function cancelSubscriptionAction(): Promise<{
  error: string | null;
}> {
  const { id } = await getUser();

  const res = await apiFetch(`/accounts/${id}/payment/cancel`, {
    method: "POST",
  });

  if (!res.ok) {
    return { error: res.error ?? "Failed to cancel subscription" };
  }

  revalidatePath("/settings/subscription");
  return { error: null };
}
