"use client";

import Button from "@/app/components/ui/Button";
import Field from "@/app/components/ui/Field";
import AuthHeader from "@/app/components/AuthHeader";
import { useActionState } from "react";
import { resetPasswordAction } from "@/app/lib/actions/auth/reset-password";
import FormMessage from "@/app/components/ui/FormMessage";

const ResetPasswordForm = ({ resetKey }: { resetKey: string }) => {
  const [state, action, isPending] = useActionState(
    resetPasswordAction.bind(null, resetKey),
    {
      errors: null,
    },
  );

  return (
    <>
      <AuthHeader
        title="Reset your password"
        subtitle="No worries, it happens to the best of us."
      />

      <form
        action={action}
        aria-label="Reset Password Form"
        className="flex flex-col gap-4"
      >
        <div>
          <Field
            id="password"
            name="password"
            label="New Password"
            type="password"
            placeholder="Enter your new password"
          />
          <FormMessage error={state.errors?.password} />
        </div>

        <div>
          <Field
            id="password-confirm"
            type="password"
            name="password-confirm"
            label="Confirm Password"
            placeholder="Confirm your new password"
          />
          <FormMessage error={state.errors?.["password-confirm"]} />
        </div>

        <FormMessage error={state.errors?.general} />

        <Button className="mt-2 w-full" type="submit" disabled={isPending}>
          {isPending ? "Resetting password…" : "Reset Password"}
        </Button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
