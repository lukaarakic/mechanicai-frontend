import Link from "next/link";
import CreateChatButton from "../components/CreateChatButton";
import Button from "../components/ui/button";
import { getUser } from "../lib/getUser";

const Index = async () => {
  const user = await getUser();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6">
      <div className="pointer-events-none fixed left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-3xl" />

      <div className="relative text-center mb-10">
        <h1 className="by-the-sea mb-3 text-5xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
          Hi there, {user?.first_name}.
        </h1>
        <p className="text-lg text-white/30">
          What would you like to fix today?
        </p>
      </div>

      <div className="w-full max-w-md mb-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/20">
          Recent
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 text-center">
          <p className="text-sm text-white/20">No history yet</p>
        </div>
      </div>

      <Button>
        <Link href="/chat">Create new chat</Link>
      </Button>
    </div>
  );
};

export default Index;
