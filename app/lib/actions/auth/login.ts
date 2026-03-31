"use server";

import { LoginSchema } from "@/app/lib/validations/user-validation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginState = {
  errors: {
    email?: string;
    password?: string;
    general?: string;
  } | null;
};

export async function loginAction(
  prevData: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsedData = LoginSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedData.success) {
    const fieldErrors = parsedData.error.flatten().fieldErrors;
    return {
      errors: {
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        general: parsedData.error.flatten().formErrors[0],
      },
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

    if (!response.ok) {
      const errorData = await response.json();
      const [field, message] = errorData["field-error"] || [];

      return {
        errors: {
          email:
            field === "email"
              ? "Could not find an account with that email."
              : undefined,
          password: field === "password" ? "Invalid password." : undefined,
          general: errorData.error || "Login failed. Please try again.",
        },
      };
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
        general: "An unexpected error occurred. Please try again.",
      },
    };
  }

  if (isSuccess) redirect("/");

  return { errors: null };
}
