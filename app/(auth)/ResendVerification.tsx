"use client";

import { useActionState } from "react";
import { resendVerificationAction } from "@/app/lib/actions/auth/resend-verification";
import FormMessage from "@/app/components/ui/FormMessage";

const ResendVerification = ({ email }: { email: string }) => {
  const [state, action, isPending] = useActionState(
    resendVerificationAction,
    {},
  );

  return (
    <form action={action} className="flex flex-col gap-1">
      <input type="hidden" name="email" value={email} />
      <button
        type="submit"
        disabled={isPending}
        className="w-fit cursor-pointer text-xs text-white/60 underline underline-offset-2 hover:text-white disabled:opacity-40"
      >
        {isPending ? "Sending..." : "Resend verification email"}
      </button>
      <FormMessage
        error={state.error}
        success={state.message}
        className="text-xs"
      />
    </form>
  );
};

export default ResendVerification;
