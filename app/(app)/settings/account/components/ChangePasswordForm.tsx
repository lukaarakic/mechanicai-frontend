"use client";

import Button from "@/app/components/ui/Button";
import Field from "@/app/components/ui/Field";
import FormMessage from "@/app/components/ui/FormMessage";
import { updatePasswordAction } from "@/app/lib/actions/settings/account/change-password";
import { useActionState } from "react";

const ChangePasswordForm = () => {
  const [state, action, isPending] = useActionState(updatePasswordAction, {
    errors: {},
    success: false,
  });

  return (
    <form action={action} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Field
          name="password"
          label="Current password"
          placeholder="••••••••"
          type="password"
        />
        <FormMessage error={state.errors.password} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Field
            name="new-password"
            label="New password"
            placeholder="••••••••"
            type="password"
          />
          <FormMessage error={state.errors["new-password"]} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Field
            name="password-confirm"
            label="Confirm password"
            placeholder="••••••••"
            type="password"
          />
          <FormMessage error={state.errors["password-confirm"]} />
        </div>
      </div>
      <FormMessage error={state.errors.general} />
      <FormMessage
        success={state.success ? "Password updated successfully!" : undefined}
      />

      <Button className="w-fit" variant="outline" disabled={isPending}>
        Update password
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
