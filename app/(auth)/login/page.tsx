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
        title="Login"
        subtitle="Use your email to login into your account"
      />

      {/* <button className="mb-30 box-border flex h-[3.125rem] w-full cursor-pointer items-center justify-center rounded-7 border-2 border-white py-15 text-18 font-medium">
        <Image src={GoogleLogo} alt="Google Logo" className="mr-3" />
        Continue with Google
      </button>

      <div className="flex w-full items-center justify-center gap-3 opacity-50">
        <div className="h-0.5 w-full bg-white" />
        <span className="text-13 font-semibold">OR</span>
        <div className="h-0.5 w-full bg-white" />
      </div> */}

      <form action={action} aria-label="Login Form" className="w-full">
        <div className="mb-25">
          <Field
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="yourname@example.com"
            className="w-full border"
          />
          <ErrorList errors={state.errors?.email} />
        </div>

        <div className="mb-25">
          <Field
            id="password"
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            className="w-full border"
          />
          <ErrorList errors={state.errors?.password} />
        </div>

        <Link
          href={"/forgot-password"}
          className="block text-right text-blue-700 transition-colors hover:text-blue-500"
        >
          Forgot password?
        </Link>

        <ErrorList errors={state.errors?.general} />
        {verified && (
          <div className="mb-4 text-green-500">
            Email verified successfully!
          </div>
        )}
        <Button
          className="mt-30 h-[3.125rem] w-full"
          type="submit"
          disabled={isPending}
        >
          Login
        </Button>
      </form>
    </>
  );
};
export default Login;
