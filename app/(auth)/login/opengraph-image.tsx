import { ogContentType, ogSize, renderOgCard } from "@/app/lib/og-card";

export const alt = "Log in to DashClue.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    label: "Account",
    titleLines: ["Log in"],
    summary: "Pick up where you left off and keep diagnosing your car.",
    footer: ["dashclue.com/login", "AI car diagnosis", "On call 24/7"],
  });
}
