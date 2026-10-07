import type { Metadata } from "next";
import LegalPage from "@/app/components/marketing/LegalPage";
import { REFUND } from "@/app/content/legal";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "How refunds and cancellations work for DashClue Pro.",
  alternates: { canonical: "/refund-policy" },
};

const RefundPolicy = () => <LegalPage title="Refund Policy" content={REFUND} />;

export default RefundPolicy;
