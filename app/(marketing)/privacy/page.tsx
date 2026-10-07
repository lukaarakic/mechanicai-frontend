import type { Metadata } from "next";
import LegalPage from "@/app/components/marketing/LegalPage";
import { PRIVACY } from "@/app/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DashClue collects, uses and protects your personal data.",
  alternates: { canonical: "/privacy" },
};

const PrivacyPolicy = () => (
  <LegalPage title="Privacy Policy" content={PRIVACY} />
);

export default PrivacyPolicy;
