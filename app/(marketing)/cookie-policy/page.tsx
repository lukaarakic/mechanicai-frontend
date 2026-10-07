import type { Metadata } from "next";
import LegalPage from "@/app/components/marketing/LegalPage";
import { COOKIES } from "@/app/content/legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Which cookies DashClue uses and why.",
  alternates: { canonical: "/cookie-policy" },
};

const CookiePolicy = () => (
  <LegalPage title="Cookie Policy" content={COOKIES} />
);

export default CookiePolicy;
