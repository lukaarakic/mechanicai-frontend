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
        title="Register"
        subtitle="Create your MechanicAI account with your email to sync all solutions
        across your devices"
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

      <form
        action={action}
        aria-label="Register Form"
        className="w-full space-y-25"
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
            placeholder="Enter your password"
            className="w-full border"
          />
          <ErrorList errors={state.errors?.password} />
        </div>

        <div>
          <Field
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            className="w-full border"
          />
          <ErrorList errors={state.errors?.confirmPassword} />
        </div>

        <ErrorList errors={state.errors?.general} />
        {state.success && (
          <p className="text-green-500">
            Registration successful! Verify your email and log in to your new
            account.
          </p>
        )}
        <Button className="mt-30 h-[3.125rem] w-full" disabled={isPending}>
          Register
        </Button>
      </form>
    </>
  );
};
export default Signup;
