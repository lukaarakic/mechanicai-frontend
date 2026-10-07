"use server";

import { apiFetch } from "@/app/lib/api";
import { EmailSchema } from "@/app/lib/validations/user-validation";

export type ResendVerificationState = {
  message?: string;
  error?: string;
};

export async function resendVerificationAction(
  prevState: ResendVerificationState,
  formData: FormData,
): Promise<ResendVerificationState> {
  const email = EmailSchema.safeParse(formData.get("email"));
  if (!email.success) return { error: "Enter a valid email address." };

  const res = await apiFetch("/verify-account-resend", {
    method: "POST",
    auth: false,
    body: { email: email.data },
  });

  if (res.status === 429 || res.status >= 500 || res.status === 0) {
    return { error: res.error ?? "Couldn't send the email. Please try again." };
  }

  // Don't reveal whether the address is registered or already verified.
  return {
    message: "If that account still needs verifying, we've sent a new link.",
  };
}
