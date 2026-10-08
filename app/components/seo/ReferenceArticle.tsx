import Link from "next/link";
import { ChevronDown } from "lucide-react";
import DiagnosisCard from "@/app/components/chat/DiagnosisCard";
import ProblemInput from "@/app/components/landing/ProblemInput";
import JsonLd, { breadcrumbs, faqPage } from "@/app/components/marketing/JsonLd";
import {
  codePath,
  problemPath,
  relatedCodes,
  relatedProblems,
  toDiagnosis,
  type CodeEntry,
  type ProblemEntry,
} from "@/app/lib/seo-content";

const DRIVE_LABEL = {
  safe: "Usually safe to drive for now",
  caution: "Drive with caution",
  stop: "Stop driving",
} as const;

const DIY_LABEL = {
  yes: "Yes, a reasonable DIY job",
  maybe: "Possible with some experience",
  no: "Best left to a mechanic",
} as const;

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

type Props = {
  entry: CodeEntry | ProblemEntry;
  heading: string;
  // [name, path] from home down to this page.
  trail: [string, string][];
  meaningTitle: string;
  ctaDefaultText: string;
};

// The body of a /codes/[code] or /problems/[slug] page: the direct answer
// first (for readers and search snippets), quick facts, the details as the
// app's diagnosis card, FAQs and links to related pages.
const ReferenceArticle = ({ entry, heading, trail, meaningTitle, ctaDefaultText }: Props) => {
  // The whole range across the likely repairs, like the answer above it.
  const costLow = Math.min(...entry.costs.map((c) => c.low));
  const costHigh = Math.max(...entry.costs.map((c) => c.high));
  const codes = relatedCodes(entry);
  const problems = relatedProblems(entry);
  const facts = [
    ["Severity", entry.severity],
    ["Can I drive?", DRIVE_LABEL[entry.drive_safety]],
    ["DIY?", DIY_LABEL[entry.diy.verdict]],
    ...(entry.costs.length ? [["Repair cost range", `${usd(costLow)} – ${usd(costHigh)}`]] : []),
  ];

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={[breadcrumbs(trail), ...(entry.faqs.length ? [faqPage(entry.faqs)] : [])]} />

      <nav aria-label="Breadcrumb" className="text-sm text-white/50">
        <ol className="flex flex-wrap gap-1.5">
          {trail.map(([name, path], i) => (
            <li key={path} className="flex gap-1.5">
              {i > 0 && <span aria-hidden>/</span>}
              {i < trail.length - 1 ? (
                <Link href={path} className="hover:text-white">
                  {name}
                </Link>
              ) : (
                <span aria-current="page" className="text-white/70">
                  {name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {heading}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-white/75">{entry.answer}</p>

      <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {facts.map(([label, value]) => (
          <div key={label} className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
            <dt className="text-xs text-white/50">{label}</dt>
            <dd className="mt-1 text-sm font-medium text-white">{value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-8 rounded-2xl border border-blue-400/20 bg-blue-500/[0.06] p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-white">Get the answer for your exact car</h2>
        <p className="mt-1 mb-4 text-sm text-white/60">
          Add your car and a few details. DashClue asks up to 3 questions, then tells you
          the most likely cause and what it should cost.
        </p>
        <ProblemInput defaultText={ctaDefaultText} />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-white">{meaningTitle}</h2>
        <p className="mt-3 leading-relaxed text-white/70">{entry.meaning}</p>
        {entry.symptoms.length > 0 && (
          <>
            <h3 className="mt-6 text-lg font-semibold text-white">Common symptoms</h3>
            <ul className="mt-2 list-disc pl-5 text-white/70 marker:text-white/30">
              {entry.symptoms.map((symptom) => (
                <li key={symptom} className="mt-1">
                  {symptom}
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-semibold text-white">Causes, fixes and costs</h2>
        <DiagnosisCard diagnosis={toDiagnosis(entry, heading)} />
      </section>

      {entry.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-white">Frequently asked questions</h2>
          <div className="mt-4 divide-y divide-white/8 border-y border-white/8">
            {entry.faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-white">
                  {faq.question}
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-white/50 transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="mt-2 text-white/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {(codes.length > 0 || problems.length > 0) && (
        <section className="mt-12 grid gap-8 sm:grid-cols-2">
          {codes.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-white">Related codes</h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                {codes.map((code) => (
                  <li key={code.code}>
                    <Link href={codePath(code.code)} className="text-blue-300 hover:text-blue-200">
                      {code.code}
                    </Link>{" "}
                    <span className="text-white/60">{code.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {problems.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-white">Related problems</h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                {problems.map((problem) => (
                  <li key={problem.slug}>
                    <Link
                      href={problemPath(problem.slug)}
                      className="text-blue-300 hover:text-blue-200"
                    >
                      {problem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <p className="mt-12 text-xs leading-relaxed text-white/40">
        This guide covers most cars and is general advice, not an inspection. Prices are typical
        US independent-shop ranges and vary by region, car and shop. If your brakes, steering or a
        warning light feel unsafe, stop driving and contact a mechanic.
      </p>
    </article>
  );
};

export default ReferenceArticle;
