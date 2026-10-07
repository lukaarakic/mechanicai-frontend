import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import PostBody from "@/app/components/blog/PostBody";
import ProblemInput from "@/app/components/landing/ProblemInput";
import { getPost, sanityImageUrl } from "@/app/lib/blog";
import { SITE_URL } from "@/app/lib/site";

type Props = { params: Promise<{ slug: string }> };

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i;

async function loadPost(slug: string) {
  if (!SLUG.test(slug)) return null;
  return getPost(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await loadPost((await params).slug);
  if (!post) return {};

  // The share image comes from ./opengraph-image.tsx.
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      siteName: "DashClue",
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
    },
  };
}

const BlogPost = async ({ params }: Props) => {
  const post = await loadPost((await params).slug);
  if (!post) notFound();

  const image = sanityImageUrl(post.mainImage, 1600);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    ...(image ? { image } : {}),
    publisher: { "@type": "Organization", name: "DashClue", url: SITE_URL },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        // Built from CMS fields; JSON.stringify output can't close the tag
        // because "<" is escaped below.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Link href="/blog" className="text-sm text-white/60 hover:text-white">
        ← All posts
      </Link>
      <time
        dateTime={post.publishedAt}
        className="mt-8 block text-sm text-white/50"
      >
        {format(post.publishedAt, "MMMM d, yyyy")}
      </time>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg text-white/70">{post.description}</p>

      {image && (
        <Image
          src={image}
          alt={post.imageAlt ?? ""}
          width={1600}
          height={900}
          priority
          className="mt-8 aspect-video w-full rounded-2xl border border-white/8 object-cover"
        />
      )}

      <div className="mt-12">
        <PostBody value={post.body ?? []} />
      </div>

      {(post.prevPost || post.nextPost) && (
        <nav
          aria-label="More posts"
          className="mt-12 flex flex-col gap-3 border-t border-white/8 pt-6 text-sm sm:flex-row sm:justify-between"
        >
          {post.prevPost ? (
            <Link
              href={`/blog/${post.prevPost.slug}`}
              className="text-blue-300 hover:text-blue-200"
            >
              ← {post.prevPost.title}
            </Link>
          ) : (
            <span />
          )}
          {post.nextPost && (
            <Link
              href={`/blog/${post.nextPost.slug}`}
              className="text-blue-300 hover:text-blue-200 sm:text-right"
            >
              {post.nextPost.title} →
            </Link>
          )}
        </nav>
      )}

      <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-xl font-semibold text-white">
          Not sure what&apos;s wrong with your car?
        </h2>
        <p className="mt-2 mb-5 text-sm text-white/60">
          Describe it and get a free diagnosis in about 2 minutes.
        </p>
        <ProblemInput />
      </section>
    </article>
  );
};

export default BlogPost;
