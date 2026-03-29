"use server";

import { getJWT } from "@/app/lib/get-jwt";
import { revalidatePath } from "next/cache";

export async function removeCarAction(carId: string) {
  const token = await getJWT();

  const res = await fetch(`${process.env.API_URL}/cars/${carId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to remove car");
  }

  revalidatePath("/settings/cars");
}
