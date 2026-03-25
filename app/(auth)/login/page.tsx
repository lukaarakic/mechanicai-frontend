import { z } from "zod";

// Components
import Button from "@/app/components/ui/button";
import Field from "@/app/components/ui/field";
import ErrorList from "@/app/components/ui/ErrorList";
import AuthHeader from "@/app/components/AuthHeader";
import { EmailSchema, PasswordSchema } from "@/app/lib/user-validation";
import Link from "next/link";
import Image from "next/image";
import GoogleLogo from "@/app/assets/icons/google-logo.png";

const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

const Login = () => {
  return (
    <>
      <AuthHeader
        title="Login"
        subtitle="Use your email to login into your account"
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

      <form aria-label="Login Form" className="w-full">
        <div className="mb-25">
          <Field
            name="email"
            label="Email"
            type="email"
            placeholder="yourname@example.com"
            className="w-full border"
          />
          <ErrorList />
        </div>

        <div className="mb-25">
          <Field
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            className="w-full border"
          />
          <ErrorList />
        </div>

        <Link
          href={"/forgot-password"}
          className="block text-right text-blue-700 transition-colors hover:text-blue-500"
        >
          Forgot password?
        </Link>

        <ErrorList />
        <Button className="mt-30 h-[3.125rem] w-full" type="submit">
          Login
        </Button>
      </form>
    </>
  );
};
export default Login;
