"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const OtherLinks = () => {
  const pathname = usePathname();

  const linkClass =
    "text-white/60 underline-offset-2 transition-colors hover:text-white";

  return (
    <p className="text-sm text-white/30">
      {pathname === "/register" ? (
        <>
          Already have an account?{" "}
          <Link href="/login" className={linkClass}>
            Log in
          </Link>
        </>
      ) : pathname === "/login" ? (
        <>
          No account yet?{" "}
          <Link href="/register" className={linkClass}>
            Create one
          </Link>
        </>
      ) : pathname === "/forgot-password" ? (
        <Link href="/login" className={linkClass}>
          ← Back to log in
        </Link>
      ) : null}
    </p>
  );
};

export default OtherLinks;
