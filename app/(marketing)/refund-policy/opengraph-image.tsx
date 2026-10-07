import { ogContentType, ogSize, renderOgCard } from "@/app/lib/og-card";

export const alt = "DashClue Refund Policy.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    kicker: "Legal",
    label: "Legal",
    titleLines: ["Refund", "policy"],
    summary: "How refunds and cancellations work for DashClue Pro.",
    footer: ["dashclue.com/refund-policy", "Refunds \u00b7 Cancellations", "DashClue"],
  });
}
