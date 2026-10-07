"use server";

import { CarSchema } from "@/app/lib/validations/car-validation";
import { apiFetch } from "@/app/lib/api";
import { revalidatePath } from "next/cache";
import z from "zod";

export type AddCarState = {
  errors: Partial<Record<keyof z.infer<typeof CarSchema>, string>> & {
    general?: string;
  };
  success: boolean;
  // Echoed back on error so the form (reset by React after each action) keeps the input.
  values?: Record<string, string>;
};

export async function addCarAction(
  prevState: AddCarState,
  formData: FormData,
): Promise<AddCarState> {
  const values = Object.fromEntries(
    ["make", "model", "year", "size", "power"].map((k) => [
      k,
      String(formData.get(k) ?? ""),
    ]),
  );
  const parsedData = CarSchema.safeParse(values);

  if (!parsedData.success) {
    const fieldErrors = parsedData.error.flatten().fieldErrors;
    return {
      errors: Object.fromEntries(
        Object.entries(fieldErrors).map(([k, v]) => [
          k,
          v?.[0] ?? "Invalid value",
        ]),
      ),
      success: false,
      values,
    };
  }

  const res = await apiFetch("/cars", {
    method: "POST",
    body: { car: parsedData.data },
  });

  if (!res.ok) {
    return {
      errors: { general: res.error ?? "Failed to add car" },
      success: false,
      values,
    };
  }

  revalidatePath("/settings/cars");
  revalidatePath("/chat");
  return { errors: {}, success: true };
}
