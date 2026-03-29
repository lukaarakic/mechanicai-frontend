import Link from "next/link";
import ArrowLeft from "@/app/assets/icons/arrow-left.svg";
import { getJWT } from "@/app/lib/get-jwt";
import { getUser } from "@/app/lib/get-user";
import ChatMessages from "./ChatMessages";

const Chat = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const token = await getJWT();
  const user = await getUser();

  const res = await fetch(`${process.env.API_URL}/chats/${id}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  if (!res.ok) {
    return (
      <div>
        Error loading chat: {res.status} {res.statusText}
      </div>
    );
  }

  const data = await res.json();

  const initialMessages = data.messages || [];

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto w-full px-4 lg:px-8">
      <div className="sticky top-0 z-10 flex items-center gap-3 py-4 bg-black/80 backdrop-blur-sm border-b border-white/[0.06]">
        <Link
          href="/"
          className="flex items-center justify-center h-8 w-8 rounded-lg border border-white/10 bg-white/5 transition-colors hover:bg-white/10 hover:border-white/20"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <span className="text-sm text-white/40">
          {data.chat.title || "Diagnostic session"}
        </span>
      </div>

      <ChatMessages chatId={id} messages={initialMessages} user={user} />
    </div>
  );
};

export default Chat;
