"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const OtherLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/register" ? (
        <p>
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-blue-700 hover:text-blue-500 transition-colors"
          >
            Log in
          </Link>
        </p>
      ) : pathname === "/login" ? (
        <p>
          Don’t have an account yet?{" "}
          <Link
            href={"/register"}
            className="text-blue-700 hover:text-blue-500 transition-colors"
          >
            Register now.
          </Link>
        </p>
      ) : pathname === "/forgot-password" ? (
        <Link
          href={"/login"}
          className="text-blue-700 hover:text-blue-500 transition-colors"
        >
          Go back to login page
        </Link>
      ) : null}
    </>
  );
};

export default OtherLinks;
