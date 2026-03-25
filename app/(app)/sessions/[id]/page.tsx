import Link from "next/link";

import ArrowLeft from "@/app/assets/icons/arrow-left.svg";
import LogoWhite from "@/app/assets/logo-white.svg";
import Markdown from "react-markdown";
import MessageForm from "./MessageForm";

const Session = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="mx-auto min-h-screen mt-20 flex flex-col px-10 lg:px-20">
      <div className="sticky top-10 mb-20 flex items-center gap-10 lg:top-20">
        <Link
          href="/"
          className="-z-0 block rounded-full bg-light-gray transition-colors duration-200 ease-in-out hover:bg-blue-700"
        >
          <ArrowLeft className="h-12 w-12" />
        </Link>
      </div>

      <div className="flex flex-col justify-center xl:flex-row gap-4">
        <div className="flex self-start rounded-full bg-light-gray">
          <LogoWhite className="w-12 h-12" />
        </div>

        <div className="markdown max-w-3xl w-full grow-0">
          <Markdown>
            {`1. **Most likely cause(s):** ...
2. **Severity:** medium
3. **Can the user fix this?** ...
4. **Rough repair cost:** $300-500`}
          </Markdown>
        </div>
      </div>

      <MessageForm sessionId={id} />
    </div>
  );
};

export default Session;
