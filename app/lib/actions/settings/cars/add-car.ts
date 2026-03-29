"use server";

import { getJWT } from "@/app/lib/get-jwt";
import { revalidatePath } from "next/cache";
import z from "zod";

const AddCarSchema = z.object({
  make: z.string().min(1, "Make is required").max(50),
  model: z.string().min(1, "Model is required").max(50),
  year: z.coerce
    .number()
    .min(1900, "Year must be a valid year")
    .max(new Date().getFullYear()),
  size: z.coerce
    .number()
    .min(50, "Engine size must be a positive number")
    .max(10000),
  power: z.coerce.number().min(1, "Power must be a positive number").max(2000),
});

export type AddCarState = {
  errors: Partial<Record<keyof z.infer<typeof AddCarSchema>, string>> & {
    general?: string;
  };
  success: boolean;
};

export async function addCarAction(
  prevState: AddCarState,
  formData: FormData,
): Promise<AddCarState> {
  const token = await getJWT();

  const parsedData = AddCarSchema.safeParse(
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
        general: error["field-error"]?.[1] ?? "Failed to add car",
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
