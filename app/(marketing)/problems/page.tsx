import type { Metadata } from "next";
import Link from "next/link";
import ProblemInput from "@/app/components/landing/ProblemInput";
import JsonLd, { breadcrumbs } from "@/app/components/marketing/JsonLd";
import { getProblems, groupBySystem, problemPath } from "@/app/lib/seo-content";

// Refreshed daily so newly published pages appear in the lists.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Common Car Problems: Causes, Fixes and Repair Costs",
  description:
    "Car shaking, strange noises, warning lights or won't start? See the likely causes, whether it's safe to drive and what the repair should cost.",
  alternates: { canonical: "/problems" },
};

const Problems = () => (
  <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
    <JsonLd data={breadcrumbs([["Home", "/"], ["Car problems", "/problems"]])} />

    <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
      Common car problems
    </h1>
    <p className="mt-4 max-w-2xl text-lg text-white/70">
      Find your symptom to see what usually causes it, how urgent it is and what it costs to fix.
    </p>

    <div className="mt-12 grid gap-10 md:grid-cols-2">
      {groupBySystem(getProblems()).map(([system, entries]) => (
        <section key={system}>
          <h2 className="text-sm font-semibold tracking-wide text-white/50 uppercase">{system}</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {entries.map((problem) => (
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
        </section>
      ))}
    </div>

    <section className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-xl font-semibold text-white">Don&apos;t see your problem?</h2>
      <p className="mt-2 mb-5 text-sm text-white/60">
        Describe what your car is doing and get a free diagnosis in about 2 minutes.
      </p>
      <ProblemInput />
    </section>
  </div>
);

export default Problems;
