"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { readPendingProblem } from "@/app/lib/pending-problem";

const REDIRECTED_KEY = "dashclue:pending-problem-redirected";

// After signup, send the user straight to the problem they typed on the
// landing page instead of an empty dashboard. Only once per browser session,
// so a user who can't start a chat yet isn't bounced on every visit.
const PendingProblemRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    if (readPendingProblem() === null) return;
    try {
      if (sessionStorage.getItem(REDIRECTED_KEY)) return;
      sessionStorage.setItem(REDIRECTED_KEY, "1");
    } catch {
      return;
    }
    router.replace("/chat");
  }, [router]);

  return null;
};

export default PendingProblemRedirect;
