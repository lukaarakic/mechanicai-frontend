"use server";

import z, { email } from "zod";
import { LoginSchema, RegisterSchema } from "../validations/user-validation";
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
  const parsedData = LoginSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedData.success) {
    console.error("Validation failed", parsedData.error);
    return {
      errors: {
        ...parsedData.error.flatten().fieldErrors,
        general: parsedData.error.flatten().formErrors,
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

    if (response.status === 401) {
      return {
        errors: {
          general: ["Invalid email or password. Please try again."],
        },
      };
    }

    if (response.status === 403) {
      return {
        errors: {
          general: ["Your email is not verified. Please check your inbox."],
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

type RegisterState = {
  errors: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    general?: string[];
  } | null;
  success?: boolean;
};

export async function registerAction(
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const parsedData = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedData.success) {
    console.error("Validation failed", parsedData.error);
    return {
      errors: {
        ...parsedData.error.flatten().fieldErrors,
        general: parsedData.error.flatten().formErrors,
      },
    };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: parsedData.data.email,
        password: parsedData.data.password,
        "password-confirm": parsedData.data.confirmPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Registration failed", errorData);
      return {
        errors: {
          general: [
            errorData.message || "Registration failed. Please try again.",
          ],
        },
      };
    }

    return {
      errors: null,
      success: true,
    };
  } catch (err) {
    console.error("Registration request failed", err);
    return {
      errors: {
        general: ["An unexpected error occurred. Please try again."],
      },
    };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  cookieStore.delete("auth_token");
  await fetch(`${process.env.API_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
}
