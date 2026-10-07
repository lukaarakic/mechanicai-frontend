"use client";

import Button from "@/app/components/ui/Button";
import Field from "@/app/components/ui/Field";
import AuthHeader from "@/app/components/AuthHeader";
import { registerAction } from "@/app/lib/actions/auth/register";
import { useActionState, useState } from "react";
import FormMessage from "@/app/components/ui/FormMessage";
import ResendVerification from "../ResendVerification";
import { usePendingProblem } from "@/app/lib/pending-problem";

const RegisterForm = () => {
  const [state, action, isPending] = useActionState(registerAction, {
    errors: null,
    success: false,
  });
  const pendingProblem = usePendingProblem();
  // Controlled so the email survives React's form reset after a failed submit.
  const [email, setEmail] = useState("");

  return (
    <>
      <AuthHeader
        title="Create an account"
        subtitle="Diagnose car problems in minutes with DashClue"
      />

      {pendingProblem && !state.success && (
        <div
          role="status"
          className="mb-4 rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-2.5 text-sm text-blue-200"
        >
          We saved your problem. Create a free account and it will be waiting in
          your first diagnosis.
        </div>
      )}

      {state.success ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-6 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-lg">
            ✓
          </div>
          <p className="text-sm text-emerald-400 font-medium">
            {state.pendingVerification
              ? "Check your email"
              : "Account created!"}
          </p>
          <p className="text-xs text-white/50">
            {state.pendingVerification
              ? `${state.email} is already registered but not verified yet. We sent the verification link again. Open it to get started.`
              : `We sent a verification link to ${state.email}. Open it to get started.`}
          </p>
          {state.email && <ResendVerification email={state.email} />}
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
              autoComplete="email"
              placeholder="yourname@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FormMessage error={state.errors?.email} />
          </div>

          <div>
            <Field
              type="password"
              name="password"
              label="Password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              required
            />
            <FormMessage error={state.errors?.password} />
          </div>

          <div>
            <Field
              type="password"
              name="confirmPassword"
              label="Confirm password"
              autoComplete="new-password"
              placeholder="Repeat your password"
              required
            />
            <FormMessage error={state.errors?.confirmPassword} />
          </div>

          <FormMessage error={state.errors?.general} />

          <Button className="mt-2 w-full" disabled={isPending}>
            {isPending ? "Creating account…" : "Create account"}
          </Button>
        </form>
      )}
    </>
  );
};

export default RegisterForm;
