import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { getPosts, sanityImageUrl } from "@/app/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Car repair tips, warning light guides and maintenance advice from DashClue.",
  alternates: { canonical: "/blog" },
};

const Blog = async () => {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-tight text-white">Blog</h1>
      <p className="mt-3 text-white/70">
        Car repair tips, warning light guides and maintenance advice.
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 text-white/50">No posts yet. Check back soon.</p>
      ) : (
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const image = sanityImageUrl(post.mainImage, 800);
            return (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col"
                >
                  {image && (
                    <Image
                      src={image}
                      alt={post.imageAlt ?? ""}
                      width={800}
                      height={450}
                      className="aspect-video w-full rounded-xl border border-white/8 object-cover"
                    />
                  )}
                  <time
                    dateTime={post.publishedAt}
                    className="mt-4 text-xs text-white/50"
                  >
                    {format(post.publishedAt, "MMMM d, yyyy")}
                  </time>
                  <h2 className="mt-1 text-lg font-semibold text-white group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm text-white/60">
                    {post.description}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Blog;
