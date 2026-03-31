"use server";

import { CarSchema } from "@/app/lib/validations/car-validation";
import { getJWT } from "@/app/lib/get-jwt";
import { revalidatePath } from "next/cache";
import z from "zod";

export type AddCarState = {
  errors: Partial<Record<keyof z.infer<typeof CarSchema>, string>> & {
    general?: string;
  };
  success: boolean;
};

export async function addCarAction(
  prevState: AddCarState,
  formData: FormData,
): Promise<AddCarState> {
  const token = await getJWT();

  const parsedData = CarSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedData.success) {
    const fieldErros = parsedData.error.flatten().fieldErrors;
    return {
      errors: Object.fromEntries(
        Object.entries(fieldErros).map(([k, v]) => [
          k,
          v?.[0] ?? "Invalid value",
        ]),
      ),
      success: false,
    };
  }

  const res = await fetch(`${process.env.API_URL}/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({
      car: {
        ...parsedData.data,
      },
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    return {
      errors: {
        general:
          error["field-error"]?.[1] ?? error["error"] ?? "Failed to add car",
      },
      success: false,
    };
  }

  revalidatePath("/settings/cars");
  return {
    errors: {},
    success: true,
  };
}
