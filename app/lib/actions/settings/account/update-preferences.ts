"use server";

import { revalidatePath } from "next/cache";
import z from "zod";
import { apiFetch } from "@/app/lib/api";

const PreferencesSchema = z.object({
  distance_unit: z.enum(["km", "mi"]),
});

export type UpdatePreferencesState = { error: string | null; success: boolean };

export async function updatePreferencesAction(
  prevState: UpdatePreferencesState,
  formData: FormData,
): Promise<UpdatePreferencesState> {
  const parsed = PreferencesSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Choose kilometers or miles.", success: false };

  const res = await apiFetch("/update-user", {
    method: "PATCH",
    body: parsed.data,
  });

  if (!res.ok) {
    return { error: res.error ?? "Failed to save preferences", success: false };
  }

  revalidatePath("/settings/account");
  return { error: null, success: true };
}
