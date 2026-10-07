import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Signed-in app pages: nothing useful to index.
      disallow: ["/dashboard", "/chat", "/history", "/settings", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
