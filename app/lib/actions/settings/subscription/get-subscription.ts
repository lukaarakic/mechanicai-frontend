"use server";

import { apiFetch } from "@/app/lib/api";
import { getUser } from "@/app/lib/get-user";

export type Subscription = {
  subscribed: boolean;
  status?: string;
  plan?: string;
  renews_at?: string | null;
  cancel_at_period_end?: boolean;
};

export async function getSubscription(): Promise<Subscription> {
  const { id } = await getUser();

  const res = await apiFetch<Subscription>(
    `/accounts/${id}/payment/subscription`,
  );

  if (!res.ok || !res.data) {
    throw new Error(`Failed to load subscription (${res.status})`);
  }

  return res.data;
}
