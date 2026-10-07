import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { apiFetch } from "@/app/lib/api";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Confirm your email to activate your DashClue account.",
};

const Verify = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const rawKey = params["key"];
  const verificationKey = typeof rawKey === "string" ? rawKey.trim() : "";

  if (!/^[A-Za-z0-9_-]{20,200}$/.test(verificationKey)) {
    redirect("/login?verified=invalid");
  }

  const res = await apiFetch("/verify-account", {
    method: "POST",
    auth: false,
    body: { key: verificationKey },
  });

  if (!res.ok) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-2xl text-red-400">
          ✕
        </div>
        <h1 className="text-base font-semibold text-white">
          Verification failed
        </h1>
        <p className="mt-1.5 text-sm text-white/50">
          This link may have expired or already been used. Log in to request a
          new one.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block text-sm text-white/70 underline underline-offset-2 hover:text-white"
        >
          Go to log in
        </Link>
      </div>
    );
  }

  redirect("/login?verified=true");
};

export default Verify;
