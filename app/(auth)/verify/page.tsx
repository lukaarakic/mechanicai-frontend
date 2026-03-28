import { redirect } from "next/navigation";

const Verify = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const verificationKey = params["key"];

  const response = await fetch(`${process.env.API_URL}/verify-account`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ key: verificationKey }),
  });

  if (!response.ok) {
    return (
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-2xl">
            ✕
          </div>
          <h2 className="text-base font-semibold text-white">
            Verification failed
          </h2>
          <p className="mt-1.5 text-sm text-white/40">
            This link may have expired or already been used.
          </p>
        </div>
      </div>
    );
  }

  redirect("/login?verified=true");
};

export default Verify;
