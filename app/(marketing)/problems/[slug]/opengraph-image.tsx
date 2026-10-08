import { getProblem } from "@/app/lib/seo-content";
import { ogContentType, ogSize, renderOgCard } from "@/app/lib/og-card";

export const alt = "A common car problem explained by DashClue.";
export const size = ogSize;
export const contentType = ogContentType;

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const entry = getProblem((await params).slug);

  return renderOgCard({
    kicker: "Car problem",
    label: entry?.system ?? "Car problems",
    titleLines: ["What's", "wrong?"],
    summary: entry?.title ?? "Common car problems explained.",
    footer: ["dashclue.com/problems", "Causes and costs", "Free diagnosis"],
  });
}
