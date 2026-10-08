import { getPosts } from "@/app/lib/blog";
import { codePath, getCodes, getProblems, problemPath } from "@/app/lib/seo-content";
import { CONTACT_EMAIL, PRO_PRICE, SITE_URL } from "@/app/lib/site";

// A plain-text summary of the site for AI assistants (llmstxt.org). Lists only
// pages that are live, and refreshes with the daily page batches.
export const revalidate = 86400;

export async function GET() {
  const posts = await getPosts().catch(() => []);
  const link = (title: string, path: string, note?: string) =>
    `- [${title}](${SITE_URL}${path})${note ? `: ${note}` : ""}`;

  const body = [
    "# DashClue",
    "",
    "> DashClue is a web app that helps drivers figure out what's wrong with their car before going to a mechanic. You describe the problem in plain words (a noise, a vibration, a warning light or an OBD2 code), answer up to 3 follow-up questions, and get the most likely causes for your exact car, how serious it is, whether it's safe to keep driving, whether it's a DIY job, and a repair cost range in US dollars.",
    "",
    `DashClue is not a repair shop and doesn't replace a mechanic; it helps drivers understand the problem and avoid overpaying. The free plan includes 3 diagnoses a month for one car, no card needed. Pro costs ${PRO_PRICE} a month for unlimited diagnoses, multiple cars and diagnosis history. Contact: ${CONTACT_EMAIL}.`,
    "",
    "## Main pages",
    "",
    link("Home", "/", "what DashClue does, how it works, pricing and FAQ"),
    link("OBD2 code lookup", "/codes", "free check engine light code lookup, no signup"),
    link("Common car problems", "/problems", "symptoms with causes, safety and repair costs"),
    link("Blog", "/blog", "car repair guides"),
    "",
    "## OBD2 codes",
    "",
    ...getCodes().map((c) => link(`${c.code}: ${c.title}`, codePath(c.code))),
    "",
    "## Car problems",
    "",
    ...getProblems().map((p) => link(p.title, problemPath(p.slug))),
    ...(posts.length
      ? ["", "## Blog posts", "", ...posts.map((p) => link(p.title, `/blog/${p.slug}`))]
      : []),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
