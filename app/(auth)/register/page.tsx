"use client";

// Component imports
import Button from "@/app/components/ui/button";
import Field from "@/app/components/ui/field";
import ErrorList from "@/app/components/ui/ErrorList";
import AuthHeader from "@/app/components/AuthHeader";
import { registerAction } from "@/app/lib/actions/auth";
import { useActionState } from "react";

const Signup = () => {
  const [state, action, isPending] = useActionState(registerAction, {
    errors: null,
    success: false,
  });

  return (
    <>
      <AuthHeader
        title="Create an account"
        subtitle="Sync your solutions across all devices with MechanicAI"
      />

      {state.success ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-6 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-lg">
            ✓
          </div>
          <p className="text-sm text-emerald-400 font-medium">
            Account created!
          </p>
          <p className="text-xs text-white/40">
            Check your email and verify your address to get started.
          </p>
        </div>
      ) : (
        <form
          action={action}
          aria-label="Register Form"
          className="flex flex-col gap-4"
        >
          <div>
            <Field
              type="email"
              name="email"
              label="Email"
              placeholder="yourname@example.com"
            />
            <ErrorList errors={state.errors?.email} />
          </div>

          <div>
            <Field
              type="password"
              name="password"
              label="Password"
              placeholder="Create a password"
            />
            <ErrorList errors={state.errors?.password} />
          </div>

          <div>
            <Field
              type="password"
              name="confirmPassword"
              label="Confirm password"
              placeholder="Repeat your password"
            />
            <ErrorList errors={state.errors?.confirmPassword} />
          </div>

          <ErrorList errors={state.errors?.general} />

          <Button className="mt-2 w-full" disabled={isPending}>
            {isPending ? "Creating account…" : "Create account"}
          </Button>
        </form>
      )}
    </>
  );
};
export default Signup;
