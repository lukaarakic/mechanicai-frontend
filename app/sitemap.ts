import type { MetadataRoute } from "next";
import { getPosts } from "./lib/blog";
import { codePath, getCodes, getProblems, problemPath } from "./lib/seo-content";
import { SITE_URL } from "./lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    "",
    "/blog",
    "/codes",
    "/problems",
    "/terms",
    "/privacy",
    "/refund-policy",
    "/cookie-policy",
  ].map((path) => {
    const hub = ["/blog", "/codes", "/problems"].includes(path);
    return {
      url: `${SITE_URL}${path}`,
      changeFrequency: (path === "" || hub ? "weekly" : "yearly") as
        "weekly" | "yearly",
      priority: path === "" ? 1 : hub ? 0.7 : 0.3,
    };
  });

  const posts = await getPosts().catch(() => []);
  return [
    ...pages,
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...getCodes().map((entry) => ({
      url: `${SITE_URL}${codePath(entry.code)}`,
      lastModified: entry.publish_on,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...getProblems().map((entry) => ({
      url: `${SITE_URL}${problemPath(entry.slug)}`,
      lastModified: entry.publish_on,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
