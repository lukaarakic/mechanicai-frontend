import { ogContentType, ogSize, renderOgCard } from "@/app/lib/og-card";

export const alt = "DashClue Terms of Service.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    kicker: "Legal",
    label: "Legal",
    titleLines: ["Terms of", "service"],
    summary: "The terms for using DashClue, including plans, billing and safety.",
    footer: ["dashclue.com/terms", "Plans \u00b7 Billing \u00b7 Safety", "DashClue"],
  });
}
