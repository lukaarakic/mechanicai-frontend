import type { Metadata } from "next";
import Link from "next/link";
import CodeSearch from "@/app/components/seo/CodeSearch";
import ProblemInput from "@/app/components/landing/ProblemInput";
import JsonLd, { breadcrumbs } from "@/app/components/marketing/JsonLd";
import { codePath, getCodes, getPopularCodes, groupBySystem } from "@/app/lib/seo-content";

// Refreshed daily so newly published pages appear in the lists.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Free OBD2 Code Lookup: Check Engine Light Codes Explained",
  description:
    "Look up any check engine light code. See what it means, the most likely causes, whether it's safe to drive and what it costs to fix.",
  alternates: { canonical: "/codes" },
};

const Codes = () => {
  const codes = getCodes();
  const popular = getPopularCodes();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={breadcrumbs([["Home", "/"], ["OBD2 codes", "/codes"]])} />

      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        OBD2 code lookup
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-white/70">
        Type the code your scanner or auto parts store gave you. See what it means, the likely
        causes, whether you can keep driving and what the repair should cost. Free, no signup.
      </p>

      <div className="mt-8 max-w-2xl">
        <CodeSearch items={codes.map(({ code, title }) => ({ code, title }))} />
      </div>

      {popular.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-semibold text-white">Most common codes</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((code) => (
              <li key={code.code}>
                <Link
                  href={codePath(code.code)}
                  className="flex h-full flex-col rounded-xl border border-white/8 bg-white/[0.02] p-4 transition-colors hover:border-white/20"
                >
                  <span className="font-mono text-sm font-semibold text-blue-300">{code.code}</span>
                  <span className="mt-1 text-sm text-white/70">{code.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-xl font-semibold text-white">No code, just a problem?</h2>
        <p className="mt-2 mb-5 text-sm text-white/60">
          Describe what your car is doing and get a free diagnosis in about 2 minutes.
        </p>
        <ProblemInput />
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">All codes by system</h2>
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          {groupBySystem(codes).map(([system, entries]) => (
            <div key={system}>
              <h3 className="text-sm font-semibold tracking-wide text-white/50 uppercase">
                {system}
              </h3>
              <ul className="mt-3 flex flex-col gap-1.5 text-sm">
                {entries.map((code) => (
                  <li key={code.code} className="flex gap-3">
                    <Link
                      href={codePath(code.code)}
                      className="w-14 shrink-0 font-mono text-blue-300 hover:text-blue-200"
                    >
                      {code.code}
                    </Link>
                    <span className="text-white/60">{code.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Codes;
