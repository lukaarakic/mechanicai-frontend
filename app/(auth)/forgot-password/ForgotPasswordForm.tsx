"use client";

import Button from "@/app/components/ui/Button";
import Field from "@/app/components/ui/Field";
import FormMessage from "@/app/components/ui/FormMessage";
import { forgotPasswordAction } from "@/app/lib/actions/auth/forgot-password";
import { useActionState } from "react";

const ForgotPasswordForm = () => {
  const [state, action, isPending] = useActionState(forgotPasswordAction, {
    errors: {},
    success: "",
  });

  return (
    <>
      <form
        action={action}
        aria-label="Forgot password form"
        className="inline-block w-full"
      >
        <div className="mb-4">
          <Field
            placeholder="name@example.com"
            type="email"
            name="email"
            label="Email"
          />
          <FormMessage error={state.errors.email} />
        </div>

        <FormMessage error={state.errors.general} />
        <FormMessage success={state.success} />

        <Button className="w-full mt-4" type="submit" disabled={isPending}>
          Recover password
        </Button>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
