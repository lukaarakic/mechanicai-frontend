import { getPost, sanityImageUrl } from "@/app/lib/blog";
import { ogContentType, ogSize, renderOgCard } from "@/app/lib/og-card";

export const alt = "A car repair guide from the DashClue blog.";
export const size = ogSize;
export const contentType = ogContentType;

type Props = { params: Promise<{ slug: string }> };

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i;

// Posts use their Sanity cover (made with mechanicai-studio/covers in the same
// design as the page cards), center-cropped from 16:9 to the OG size. A post
// without a cover gets a text card instead.
export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = SLUG.test(slug) ? await getPost(slug) : null;

  const cover = sanityImageUrl(post?.mainImage, ogSize.width, ogSize.height);
  if (cover) {
    const res = await fetch(cover.replace("auto=format", "fm=png"), {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      return new Response(await res.arrayBuffer(), {
        headers: { "Content-Type": ogContentType },
      });
    }
  }

  return renderOgCard({
    kicker: "The Blog",
    label: "Guides for drivers",
    titleLines: ["DashClue", "blog"],
    summary: post?.title ?? "Car repair guides, warning lights and maintenance advice.",
    footer: ["dashclue.com/blog", "Car repair guides", "Written for drivers"],
  });
}
