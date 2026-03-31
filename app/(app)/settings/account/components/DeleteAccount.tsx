"use client";

import { useActionState, useState } from "react";
import Button from "@/app/components/ui/Button";
import Field from "@/app/components/ui/Field";
import { deleteAccountAction } from "@/app/lib/actions/settings/account/delete-account";
import FormMessage from "@/app/components/ui/FormMessage";

const DeleteAccount = () => {
  const [confirmed, setConfirmed] = useState(false);
  const [state, action, isPending] = useActionState(deleteAccountAction, {
    errors: {},
    success: false,
  });

  console.log(state);

  return (
    <div className="rounded-xl border border-red-500/15 bg-red-500/4 p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-red-400">Delete account</p>
          <p className="text-xs text-white/30 mt-0.5">
            Permanently delete your account and all data. This cannot be undone.
          </p>
        </div>
        {!confirmed && (
          <Button
            variant="destructive"
            onClick={() => setConfirmed(true)}
            type="button"
          >
            Delete
          </Button>
        )}
      </div>

      {confirmed && (
        <form action={action} className="flex flex-col gap-3">
          <Field
            name="password"
            label="Enter your password to confirm"
            type="password"
            placeholder="••••••••"
          />
          <FormMessage error={state.errors.password} />
          <div className="flex gap-2">
            <Button variant="destructive" disabled={isPending}>
              {isPending ? "Deleting..." : "Confirm delete"}
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => setConfirmed(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DeleteAccount;
