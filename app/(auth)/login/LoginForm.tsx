"use client";

import Button from "@/app/components/ui/Button";
import Field from "@/app/components/ui/Field";
import AuthHeader from "@/app/components/AuthHeader";
import Link from "next/link";
import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction, LoginState } from "@/app/lib/actions/auth/login";
import FormMessage from "@/app/components/ui/FormMessage";
import ResendVerification from "../ResendVerification";

const Banner = ({
  tone,
  children,
}: {
  tone: "success" | "error";
  children: React.ReactNode;
}) => (
  <div
    role="status"
    className={
      tone === "success"
        ? "mb-4 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2.5 text-sm text-emerald-400"
        : "mb-4 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-sm text-red-400"
    }
  >
    {children}
  </div>
);

const LoginForm = () => {
  const [state, action, isPending] = useActionState<LoginState, FormData>(
    loginAction,
    { errors: null },
  );
  // Controlled so the email survives React's form reset after a failed login.
  const [email, setEmail] = useState("");
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");
  const reset = searchParams.get("reset");

  return (
    <>
      <AuthHeader
        title="Welcome back"
        subtitle="Log in to your account to continue"
      />

      {verified === "true" && (
        <Banner tone="success">Email verified! You can log in now.</Banner>
      )}
      {verified === "invalid" && (
        <Banner tone="error">
          That verification link is invalid or expired. Log in to get a new one.
        </Banner>
      )}
      {reset === "true" && (
        <Banner tone="success">
          Password reset! Log in with your new password.
        </Banner>
      )}
      {reset === "invalid" && (
        <Banner tone="error">
          That reset link is invalid. Request a new one below.
        </Banner>
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
            id="password"
            type="password"
            name="password"
            label="Password"
            autoComplete="current-password"
            placeholder="Enter your password"
            required
          />

          <FormMessage error={state.errors?.password} />
        </div>

        <Link
          href="/forgot-password"
          className="self-end text-xs text-white/40 transition-colors hover:text-white/70"
        >
          Forgot password?
        </Link>

        <FormMessage error={state.errors?.general} />

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? "Logging in…" : "Log in"}
        </Button>
      </form>

      {state.unverifiedEmail && (
        <div className="mt-4">
          <ResendVerification email={state.unverifiedEmail} />
        </div>
      )}
    </>
  );
};

export default LoginForm;
