import { redirect } from "next/navigation";

const Verify = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  const verificationKey = params["key"];

  console.log("Received verification key", verificationKey);

  const response = await fetch(`${process.env.API_URL}/verify-account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ key: verificationKey }),
  });

  if (!response.ok) {
    console.error("Email verification failed", response);

    return <div>Verification failed. The link might be expired.</div>;
  }

  console.log("Email verification successful", response);
  redirect("/login?verified=true");
};

export default Verify;
