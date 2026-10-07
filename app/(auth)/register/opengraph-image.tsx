import { ogContentType, ogSize, renderOgCard } from "@/app/lib/og-card";

export const alt = "Create a free DashClue account: 3 free diagnostics a month, no card needed.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    label: "Get started",
    titleLines: ["Start your free", "diagnosis"],
    summary: "Describe what's wrong and get the likely cause in about 2 minutes. 3 free diagnostics a month, no card needed.",
    footer: ["dashclue.com/register", "3 free diagnostics a month", "No card needed"],
  });
}
