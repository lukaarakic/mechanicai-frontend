import { ogContentType, ogSize, renderOgCard } from "@/app/lib/og-card";

export const alt = "The DashClue blog: car repair guides for drivers.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    kicker: "The Blog",
    label: "Guides for drivers",
    titleLines: ["Car repair", "guides"],
    summary: "Warning lights, strange noises and maintenance advice, in plain language.",
    footer: ["dashclue.com/blog", "Brakes \u00b7 Engine \u00b7 Starting", "Written for drivers"],
  });
}
