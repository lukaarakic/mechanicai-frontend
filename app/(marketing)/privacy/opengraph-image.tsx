import { ogContentType, ogSize, renderOgCard } from "@/app/lib/og-card";

export const alt = "DashClue Privacy Policy.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    kicker: "Legal",
    label: "Legal",
    titleLines: ["Privacy", "policy"],
    summary: "How DashClue collects, uses and protects your personal data.",
    footer: ["dashclue.com/privacy", "Your data \u00b7 Your rights", "DashClue"],
  });
}
