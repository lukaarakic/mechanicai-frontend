// Zod imports
import { z } from "zod";

// Component imports
import Button from "@/app/components/ui/button";
import Field from "@/app/components/ui/field";
import ErrorList from "@/app/components/ui/ErrorList";
import AuthHeader from "@/app/components/AuthHeader";
import { EmailSchema, PasswordSchema } from "@/app/lib/user-validation";
import GoogleLogo from "@/app/assets/icons/google-logo.png";
import Image from "next/image";

const RegisterSchema = z
  .object({
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: PasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

const Signup = () => {
  return (
    <>
      <AuthHeader
        title="Sign up"
        subtitle="Create your MechanicAI account with your email to sync all solutions
        across your devices"
      />

      <button className="mb-30 box-border flex h-[3.125rem] w-full cursor-pointer items-center justify-center rounded-7 border-2 border-white py-15 text-18 font-medium">
        <Image src={GoogleLogo} alt="Google Logo" className="mr-3" />
        Continue with Google
      </button>

      <div className="flex w-full items-center justify-center gap-3 opacity-50">
        <div className="h-0.5 w-full bg-white" />
        <span className="text-13 font-semibold">OR</span>
        <div className="h-0.5 w-full bg-white" />
      </div>

      <form aria-label="Register Form" className="w-full space-y-25">
        <div>
          <Field label="Email" placeholder="yourname@example.com" />
          <ErrorList />
        </div>

        <div>
          <Field
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            className="w-full border"
          />
          <ErrorList />
        </div>

        <div>
          <Field
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            className="w-full border"
          />
          <ErrorList />
        </div>

        <ErrorList />
        <Button className="mt-30 h-[3.125rem] w-full"> Register</Button>
      </form>
    </>
  );
};
export default Signup;
