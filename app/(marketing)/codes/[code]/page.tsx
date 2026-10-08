import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReferenceArticle from "@/app/components/seo/ReferenceArticle";
import { codePath, getCode, getCodes } from "@/app/lib/seo-content";

type Props = { params: Promise<{ code: string }> };

// Pages live at deploy time are prebuilt. Later ones render on their publish
// day (until then they 404), and every page is refreshed daily, which also
// updates its related links as new pages go live.
export const revalidate = 86400;

export function generateStaticParams() {
  return getCodes().map(({ code }) => ({ code: code.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getCode((await params).code);
  if (!entry) return {};

  // The share image comes from ./opengraph-image.tsx.
  return {
    title: `${entry.code} Code: Meaning, Causes and Cost to Fix`,
    description: entry.answer,
    alternates: { canonical: codePath(entry.code) },
  };
}

const CodePage = async ({ params }: Props) => {
  const entry = getCode((await params).code);
  if (!entry) notFound();

  return (
    <ReferenceArticle
      entry={entry}
      heading={`${entry.code}: ${entry.title}`}
      trail={[
        ["Home", "/"],
        ["OBD2 codes", "/codes"],
        [entry.code, codePath(entry.code)],
      ]}
      meaningTitle={`What does ${entry.code} mean?`}
      ctaDefaultText={`My check engine light is on with code ${entry.code}.`}
    />
  );
};

export default CodePage;
