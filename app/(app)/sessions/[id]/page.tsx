import Link from "next/link";

import ArrowLeft from "@/app/assets/icons/arrow-left.svg";
import LogoWhite from "@/app/assets/logo-white.svg";
import Markdown from "react-markdown";
import { Textarea } from "@/app/components/ui/textarea";
import Button from "@/app/components/ui/button";

const Session = () => {
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

      <div className="mt-auto sticky bottom-0 py-6">
        <form className="relative max-w-3xl mx-auto">
          <Textarea
            placeholder="Describe your car problem..."
            className="pr-14 py-4 bg-[--color-light-gray] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:border-white/20 transition-colors"
          />
          <Button className="absolute bottom-2 right-2 h-8 w-8 rounded-lg text-black bg-white hover:bg-white/90 p-0 flex items-center justify-center">
            <ArrowLeft
              className={`rotate-90 w-12 h-12`}
              style={{ fill: "#000" }}
            />
          </Button>
        </form>
        <p className="text-center text-white/20 text-xs mt-3">
          MechanicAI can make mistakes. Always consult a professional.
        </p>
      </div>
    </div>
  );
};

export default Session;
