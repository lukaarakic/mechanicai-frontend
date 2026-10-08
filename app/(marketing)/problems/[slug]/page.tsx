import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReferenceArticle from "@/app/components/seo/ReferenceArticle";
import { getProblem, getProblems, problemPath } from "@/app/lib/seo-content";

type Props = { params: Promise<{ slug: string }> };

// Pages live at deploy time are prebuilt. Later ones render on their publish
// day (until then they 404), and every page is refreshed daily, which also
// updates its related links as new pages go live.
export const revalidate = 86400;

export function generateStaticParams() {
  return getProblems().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getProblem((await params).slug);
  if (!entry) return {};

  // The share image comes from ./opengraph-image.tsx.
  return {
    title: `${entry.title}: Causes, Fixes and Cost`,
    description: entry.answer,
    alternates: { canonical: problemPath(entry.slug) },
  };
}

const ProblemPage = async ({ params }: Props) => {
  const entry = getProblem((await params).slug);
  if (!entry) notFound();

  return (
    <ReferenceArticle
      entry={entry}
      heading={entry.title}
      trail={[
        ["Home", "/"],
        ["Car problems", "/problems"],
        [entry.title, problemPath(entry.slug)],
      ]}
      meaningTitle="Why it happens"
      ctaDefaultText={`${entry.query}.`}
    />
  );
};

export default ProblemPage;
