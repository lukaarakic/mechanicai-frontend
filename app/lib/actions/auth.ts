"use server";

import z from "zod";
import { LoginSchema } from "../user-validation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LoginState {
  errors: {
    email?: string[];
    password?: string[];
    general?: string[];
  } | null;
}

export async function loginAction(
  prevData: LoginState,
  formData: FormData,
): Promise<LoginState> {
  console.log(Object.fromEntries(formData.entries()));

  const parsedData = LoginSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedData.success) {
    console.error("Validation failed", parsedData.error);
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  let isSuccess = false;

  try {
    const response = await fetch(`${process.env.API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: parsedData.data.email,
        password: parsedData.data.password,
      }),
    });

    if (response.status === 401) {
      return {
        errors: {
          general: ["Invalid email or password. Please try again."],
        },
      };
    }

    if (!response.ok) {
      throw new Error("Server responded with an error");
    }

    const token = response.headers.get("authorization");

    if (token) {
      const cookieStore = await cookies();

      cookieStore.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
      });
    }

    isSuccess = true;
  } catch (error) {
    console.error("Login request failed", error);
    return {
      errors: {
        general: ["An unexpected error occurred. Please try again."],
      },
    };
  }

  if (isSuccess) redirect("/");

  return { errors: null };
}
