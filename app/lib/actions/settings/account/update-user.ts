"use server";

import z from "zod";
import { apiFetch } from "@/app/lib/api";
import { revalidatePath } from "next/cache";

const UpdateUserSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(64, "First name must be less than 64 characters"),
  last_name: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(64, "Last name must be less than 64 characters"),
});

type UpdateUserState = {
  errors: {
    first_name?: string;
    last_name?: string;
    general?: string;
  };
  values?: {
    first_name?: string;
    last_name?: string;
  };
  success: boolean;
};

export async function updateUserAction(
  prevState: UpdateUserState,
  formData: FormData,
): Promise<UpdateUserState> {
  const parsedData = UpdateUserSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedData.success) {
    const fieldErrors = parsedData.error.flatten().fieldErrors;
    return {
      errors: {
        first_name: fieldErrors.first_name?.[0],
        last_name: fieldErrors.last_name?.[0],
      },
      values: {
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
      },
      success: false,
    };
  }

  const res = await apiFetch("/update-user", {
    method: "PATCH",
    body: parsedData.data,
  });

  if (!res.ok)
    return {
      errors: { general: res.error ?? "Failed to update profile" },
      success: false,
    };

  // The name also shows in the navbar and on the dashboard.
  revalidatePath("/", "layout");
  return { errors: {}, success: true };
}
