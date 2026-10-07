"use server";

import { apiFetch } from "@/app/lib/api";
import { isUuid } from "@/app/lib/is-uuid";
import { revalidatePath } from "next/cache";

export async function removeCarAction(
  carId: string,
): Promise<{ error: string | null }> {
  if (!isUuid(carId)) return { error: "Car not found." };

  const res = await apiFetch(`/cars/${carId}`, { method: "DELETE" });

  if (!res.ok) {
    return { error: res.error ?? "Failed to remove car. Please try again." };
  }

  revalidatePath("/settings/cars");
  revalidatePath("/chat");
  return { error: null };
}
