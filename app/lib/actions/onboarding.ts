"use server";

import { OnboardingData, OnboardingErrorState } from "@/app/types/onboarding";
import { revalidatePath } from "next/cache";
import z from "zod";
import { apiFetch } from "../api";
import { flattenZodErrors } from "@/app/utils/flattenZodErrors";
import { OnboardingSchema } from "../validations/onboarding-validation";

type OnboardingResult =
  { success: true } | { success: false; errors: OnboardingErrorState };

export async function onboardingAction(
  data: OnboardingData,
): Promise<OnboardingResult> {
  const parsedData = OnboardingSchema.safeParse(data);

  if (!parsedData.success) {
    const errors = flattenZodErrors(
      // @ts-expect-error - this is the correct type, but zod's types are very broken
      z.treeifyError(parsedData.error).properties ?? {},
    );
    return { errors, success: false };
  }

  const res = await apiFetch<{ errors?: Record<string, string[]> }>(
    "/onboard",
    {
      method: "PATCH",
      body: parsedData.data,
    },
  );

  if (!res.ok) {
    return {
      success: false,
      errors: {
        general:
          res.error ?? "Unable to complete onboarding. Please try again.",
      },
    };
  }

  revalidatePath("/", "layout");
  return { success: true };
}
