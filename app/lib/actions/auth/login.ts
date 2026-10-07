"use server";

import { LoginSchema } from "@/app/lib/validations/user-validation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiFetch, AUTH_COOKIE, AUTH_COOKIE_MAX_AGE } from "@/app/lib/api";

export type LoginState = {
  errors: {
    email?: string;
    password?: string;
    general?: string;
  } | null;
  // Set when the account exists but the email isn't verified yet.
  unverifiedEmail?: string;
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

  const res = await apiFetch("/login", {
    method: "POST",
    auth: false,
    body: {
      email: parsedData.data.email,
      password: parsedData.data.password,
    },
  });

  if (!res.ok) {
    if (res.status === 403 && res.fieldError?.[0] === "email") {
      return {
        errors: { general: "Please verify your email before logging in." },
        unverifiedEmail: parsedData.data.email,
      };
    }

    // Same message for unknown email and wrong password, so the form
    // doesn't reveal which emails have accounts.
    return {
      errors: {
        general:
          res.status === 401
            ? "Invalid email or password."
            : (res.error ?? "Login failed. Please try again."),
      },
    };
  }

  const token = res.headers.get("authorization");
  if (!token) {
    return { errors: { general: "Login failed. Please try again." } };
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_COOKIE_MAX_AGE,
  });

  redirect("/dashboard");
}
