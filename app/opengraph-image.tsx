import { ogContentType, ogSize, renderOgCard } from "./lib/og-card";

export const alt = "DashClue: know what's wrong with your car. Describe the problem and see the likely cause, urgency and repair cost.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    label: "AI car diagnosis",
    titleLines: ["Know what's wrong", "with your car"],
    summary: "Describe the problem in plain words. See what's likely wrong, how serious it is, and what it should cost to fix.",
    footer: ["dashclue.com", "3 free diagnostics a month", "No card needed"],
  });
}
