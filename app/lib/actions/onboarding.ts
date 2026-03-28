"use server";

import { OnboardingData } from "@/app/types/onboarding";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function onboardingAction(data: OnboardingData) {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("auth_token")?.value;

  const response = await fetch(`${process.env.API_URL}/onboard`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `${jwtToken}`,
    },
    body: JSON.stringify({
      profile: { ...data.profile, onboarding_done: true },
      car: data.car,
    }),
  });

  revalidatePath("/");
}
