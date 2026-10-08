import { getCode } from "@/app/lib/seo-content";
import { ogContentType, ogSize, renderOgCard } from "@/app/lib/og-card";

export const alt = "An OBD2 trouble code explained by DashClue.";
export const size = ogSize;
export const contentType = ogContentType;

type Props = { params: Promise<{ code: string }> };

export default async function Image({ params }: Props) {
  const entry = getCode((await params).code);

  return renderOgCard({
    kicker: "OBD2 code",
    label: entry?.system ?? "Check engine light",
    titleLines: [entry?.code ?? "OBD2", "explained"],
    summary: entry?.title ?? "Check engine light codes explained.",
    footer: ["dashclue.com/codes", "Causes and costs", "Free lookup"],
  });
}
