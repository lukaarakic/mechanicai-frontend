"use client";

import { z } from "zod";

// Components
import Button from "@/app/components/ui/button";
import Field from "@/app/components/ui/field";
import ErrorList from "@/app/components/ui/ErrorList";
import AuthHeader from "@/app/components/AuthHeader";
import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/app/lib/actions/auth";
import { useSearchParams } from "next/navigation";

const Login = () => {
  const [state, action, isPending] = useActionState(loginAction, {
    errors: null,
  });
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");

  return (
    <>
      <AuthHeader
        title="Welcome back"
        subtitle="Sign in to your account to continue"
      />

      {verified && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2.5 text-sm text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Email verified successfully!
        </div>
      )}

      <form
        action={action}
        aria-label="Login Form"
        className="flex flex-col gap-4"
      >
        <div>
          <Field
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="yourname@example.com"
          />
          <ErrorList errors={state.errors?.email} />
        </div>

        <div>
          <Field
            id="password"
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
          />
          <ErrorList errors={state.errors?.password} />
        </div>

        <Link
          href="/forgot-password"
          className="text-right text-xs text-white/40 transition-colors hover:text-white/70"
        >
          Forgot password?
        </Link>

        <ErrorList errors={state.errors?.general} />

        <Button className="mt-2 w-full" type="submit" disabled={isPending}>
          {isPending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </>
  );
};
export default Login;
