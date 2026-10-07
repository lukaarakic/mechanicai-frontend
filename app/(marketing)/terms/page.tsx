import type { Metadata } from "next";
import LegalPage from "@/app/components/marketing/LegalPage";
import { TERMS } from "@/app/content/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms for using DashClue, including plans, billing and safety.",
  alternates: { canonical: "/terms" },
};

const TermsofService = () => (
  <LegalPage title="Terms of Service" content={TERMS} />
);

export default TermsofService;
