"use client";

import Button from "@/app/components/ui/Button";
import Field from "@/app/components/ui/Field";
import FormMessage from "@/app/components/ui/FormMessage";
import { updateUserAction } from "@/app/lib/actions/settings/account/update-user";
import { User } from "@/app/types/user";
import { useActionState } from "react";

const ProfileForm = ({ user }: { user: User }) => {
  const [state, action, isPending] = useActionState(updateUserAction, {
    errors: { first_name: "", last_name: "", general: "" },
    success: false,
  });

  return (
    <form action={action} className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-1.5">
        <Field
          name="first_name"
          label="First Name"
          defaultValue={state.values?.first_name ?? user?.first_name}
          type="text"
        />
        <FormMessage error={state.errors.first_name} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Field
          name="last_name"
          label="Last Name"
          defaultValue={state.values?.last_name ?? user?.last_name}
          type="text"
        />
        <FormMessage error={state.errors.last_name} />
      </div>
      <FormMessage className="col-span-2" error={state.errors.general} />
      <FormMessage
        className="col-span-2"
        success={state.success ? "Profile updated successfully!" : undefined}
      />
      <Button className="w-fit" disabled={isPending}>
        Save changes
      </Button>
    </form>
  );
};

export default ProfileForm;
