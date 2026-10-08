"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

type Item = { code: string; title: string };

const MAX_RESULTS = 8;

// The free OBD2 lookup: filters the code list in the browser as you type and
// opens the code's page on Enter.
const CodeSearch = ({ items }: { items: Item[] }) => {
  const router = useRouter();
  const id = useId();
  const [query, setQuery] = useState("");

  const q = query.trim().toUpperCase();
  const results = q
    ? items
        .filter((item) => item.code.includes(q) || item.title.toUpperCase().includes(q))
        .sort((a, b) => Number(b.code.startsWith(q)) - Number(a.code.startsWith(q)))
        .slice(0, MAX_RESULTS)
    : [];
  const unknownCode = /^[PBCU][0-9A-F]{4}$/.test(q) && !items.some((item) => item.code === q);

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (results[0]) router.push(`/codes/${results[0].code.toLowerCase()}`);
        }}
        className="relative"
      >
        <label htmlFor={id} className="sr-only">
          Enter an OBD2 code
        </label>
        <Search
          className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-white/40"
          aria-hidden
        />
        <input
          id={id}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a code, e.g. P0420"
          autoComplete="off"
          spellCheck={false}
          className="block w-full rounded-2xl border border-white/15 bg-white/[0.04] py-4 pr-4 pl-12 text-lg text-white uppercase outline-none transition-colors placeholder:text-white/40 placeholder:normal-case focus:border-white/30 focus:bg-white/[0.07]"
        />
      </form>

      {results.length > 0 && (
        <ul className="mt-3 divide-y divide-white/6 overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0b]">
          {results.map((item) => (
            <li key={item.code}>
              <Link
                href={`/codes/${item.code.toLowerCase()}`}
                className="flex gap-4 px-4 py-3 hover:bg-white/[0.04]"
              >
                <span className="w-14 shrink-0 font-mono text-sm font-semibold text-blue-300">
                  {item.code}
                </span>
                <span className="text-sm text-white/70">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {q && results.length === 0 && (
        <p className="mt-3 text-sm text-white/60">
          {unknownCode
            ? `We don't have a guide for ${q} yet. It may be specific to your car's make. Describe it below and DashClue will look into it for your car.`
            : "No matching codes. Try the full code, e.g. P0300."}
        </p>
      )}
    </div>
  );
};

export default CodeSearch;
