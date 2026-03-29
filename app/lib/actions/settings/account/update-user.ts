"use server";

import z from "zod";
import { getJWT } from "../../../get-jwt";
import { revalidatePath } from "next/cache";

const UpdateUserSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(64, "First name must be less than 64 characters"),
  last_name: z
    .string()
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
  const token = await getJWT();

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

  const res = await fetch(`${process.env.API_URL}/update-user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(parsedData.data),
  });

  if (!res.ok)
    return { errors: { general: "Failed to update user" }, success: false };

  revalidatePath("/settings/account");
  return { errors: {}, success: true };
}
