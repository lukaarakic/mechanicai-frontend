"use server";

import { OnboardingData } from "@/app/types/onboarding";
import { revalidatePath } from "next/cache";
import z from "zod";
import { getJWT } from "../get-jwt";
import { flattenZodErrors } from "@/app/utils/flattenZodErrors";
import { OnboardingSchema } from "../validations/onboarding-validation";

export async function onboardingAction(data: OnboardingData) {
  const token = await getJWT();

  const parsedData = OnboardingSchema.safeParse(data);

  if (!parsedData.success) {
    const errors = flattenZodErrors(
      // @ts-expect-error - this is the correct type, but zod's types are very broken
      z.treeifyError(parsedData.error).properties ?? {},
    );
    return {
      errors,
      success: false,
    };
  }

  const response = await fetch(`${process.env.API_URL}/onboard`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `${token}`,
    },
    body: JSON.stringify({
      profile: { ...data.profile, onboarding_done: true },
      car: data.car,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    return { error };
  }

  revalidatePath("/");
  return { success: true };
}
