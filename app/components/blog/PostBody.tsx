import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 mb-3 text-2xl font-semibold text-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold text-white">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold text-white">{children}</h4>
    ),
    normal: ({ children }) => <p className="mb-5 text-white/80">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mb-5 border-l-2 border-white/20 pl-4 text-white/70 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 list-disc pl-6 text-white/80">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 list-decimal pl-6 text-white/80">{children}</ol>
    ),
  },
  listItem: ({ children }) => <li className="mb-1.5">{children}</li>,
  marks: {
    strong: ({ children }) => (
      <strong className="text-white">{children}</strong>
    ),
    link: ({ value, children }) => {
      const href: string = value?.href ?? "";
      const external =
        /^https?:\/\//.test(href) && !href.includes("dashclue.com");
      return (
        <a
          href={href}
          className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};

const PostBody = ({ value }: { value: PortableTextBlock[] }) => (
  <div className="text-base leading-relaxed">
    <PortableText value={value} components={components} />
  </div>
);

export default PostBody;
