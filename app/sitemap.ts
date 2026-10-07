import type { MetadataRoute } from "next";
import { getPosts } from "./lib/blog";
import { SITE_URL } from "./lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    "",
    "/blog",
    "/terms",
    "/privacy",
    "/refund-policy",
    "/cookie-policy",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: (path === "" || path === "/blog" ? "weekly" : "yearly") as
      "weekly" | "yearly",
    priority: path === "" ? 1 : path === "/blog" ? 0.7 : 0.3,
  }));

  const posts = await getPosts().catch(() => []);
  return [
    ...pages,
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
