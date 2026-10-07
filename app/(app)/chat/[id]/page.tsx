import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArrowLeft from "@/app/assets/icons/arrow-left.svg";
import { apiFetch } from "@/app/lib/api";
import { getUser } from "@/app/lib/get-user";
import { isUuid } from "@/app/lib/is-uuid";
import { Message } from "@/app/types/chat";
import ChatMessages from "./ChatMessages";

export const metadata: Metadata = {
  title: "Chat",
  description: "Review your diagnostic messages and continue the session.",
};

type ChatResponse = {
  chat: { id: string; title: string | null; category: string | null };
  messages: Message[];
  messages_remaining: number | null;
};

const Chat = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!isUuid(id)) notFound();

  const [user, res] = await Promise.all([
    getUser(),
    apiFetch<ChatResponse>(`/chats/${id}`),
  ]);

  if (res.status === 404) notFound();
  if (!res.ok || !res.data)
    throw new Error(`Failed to load chat (${res.status})`);

  const { chat, messages, messages_remaining } = res.data;

  return (
    <div className="flex min-h-full w-full max-w-3xl flex-col mx-auto px-4 lg:px-8">
      <div className="sticky top-0 z-10 flex items-center gap-3 py-4 bg-black/80 backdrop-blur-sm border-b border-white/[0.06]">
        <Link
          href="/dashboard"
          aria-label="Back to dashboard"
          className="flex items-center justify-center h-8 w-8 rounded-lg border border-white/10 bg-white/5 transition-colors hover:bg-white/10 hover:border-white/20"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="truncate text-sm text-white/40">
          {chat.title || "Diagnostic session"}
        </h1>
      </div>

      <ChatMessages
        key={id}
        chatId={id}
        messages={messages}
        messagesRemaining={messages_remaining}
        user={user}
      />
    </div>
  );
};

export default Chat;
