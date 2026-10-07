import { ogContentType, ogSize, renderOgCard } from "@/app/lib/og-card";

export const alt = "DashClue Cookie Policy.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    kicker: "Legal",
    label: "Legal",
    titleLines: ["Cookie", "policy"],
    summary: "Which cookies DashClue uses and why. Only the ones the service needs, no tracking.",
    footer: ["dashclue.com/cookie-policy", "Strictly necessary only", "DashClue"],
  });
}
