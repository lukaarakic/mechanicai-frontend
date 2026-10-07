import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LEGAL_UPDATED } from "@/app/content/legal";

const LegalPage = ({ title, content }: { title: string; content: string }) => (
  <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <h1 className="text-3xl font-semibold tracking-tight text-white">
      {title}
    </h1>
    <p className="mt-2 text-sm text-white/50">Last updated: {LEGAL_UPDATED}</p>
    <div className="legal mt-12">
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  </article>
);

export default LegalPage;
