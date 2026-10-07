import "server-only";
import type { PortableTextBlock } from "@portabletext/react";

// Blog posts live in Sanity (the CMS the old marketing site used). Queried
// over Sanity's HTTP API with Next's fetch cache, so no Sanity SDK is bundled.
const PROJECT_ID = process.env.SANITY_PROJECT_ID;
const DATASET = process.env.SANITY_DATASET ?? "production";
const API_VERSION = "2025-03-19";
const REVALIDATE_SECONDS = 3600;

export type SanityImage = { asset?: { _ref?: string } };

export type PostSummary = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  mainImage?: SanityImage;
  imageAlt?: string;
};

export type Post = PostSummary & {
  keywords?: string;
  body: PortableTextBlock[];
  prevPost: { title: string; slug: string } | null;
  nextPost: { title: string; slug: string } | null;
};

export const isBlogConfigured = Boolean(PROJECT_ID);

async function query<T>(
  groq: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  if (!PROJECT_ID) return null;

  const url = new URL(
    `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}`,
  );
  url.searchParams.set("query", groq);
  // Values are passed as GROQ parameters (JSON-encoded), never spliced into the query.
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }

  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) throw new Error(`Sanity query failed (${res.status})`);
  return ((await res.json()) as { result: T }).result;
}

const SUMMARY_FIELDS = `title, "slug": slug.current, description, publishedAt, mainImage, imageAlt`;

export async function getPosts(): Promise<PostSummary[]> {
  return (
    (await query<PostSummary[]>(
      `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${SUMMARY_FIELDS} }`,
    )) ?? []
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  return query<Post>(
    `*[_type == "post" && slug.current == $slug][0] {
      ${SUMMARY_FIELDS}, keywords, body,
      "prevPost": prevPost->{ title, "slug": slug.current },
      "nextPost": nextPost->{ title, "slug": slug.current }
    }`,
    { slug },
  );
}

// Sanity image refs look like "image-<id>-<width>x<height>-<format>".
// With a height, the image is center-cropped to exactly width x height.
export function sanityImageUrl(
  image: SanityImage | undefined,
  width: number,
  height?: number,
): string | null {
  const ref = image?.asset?._ref;
  const match = ref?.match(/^image-([a-zA-Z0-9]+)-(\d+x\d+)-([a-z]+)$/);
  if (!match || !PROJECT_ID) return null;
  const [, id, size, format] = match;
  const crop = height ? `&h=${height}&fit=crop` : "";
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${size}.${format}?w=${width}${crop}&auto=format`;
}
