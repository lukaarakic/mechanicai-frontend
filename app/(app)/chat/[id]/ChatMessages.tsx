"use client";

import Image from "next/image";
import Markdown from "react-markdown";
import MessageForm from "./MessageForm";
import LogoWhite from "@/app/assets/logo-white.svg";
import { useOptimistic, useState, useTransition } from "react";
import sendMessageAction from "@/app/lib/actions/chat/send-message";
import { ChatMessagesProps, Message, SendMessageState } from "@/app/types/chat";

const ChatMessages = ({ chatId, messages, user }: ChatMessagesProps) => {
  const [serverError, setServerError] = useState<SendMessageState["error"]>();
  const [isPending, startTransition] = useTransition();
  const [optimisticMessages, addOptimisticMessages] = useOptimistic(
    messages,
    (state: Message[], newMessage: Message) => [...state, newMessage],
  );

  const handleSend = (content: string) => {
    startTransition(async () => {
      setServerError(undefined);

      addOptimisticMessages({
        id: crypto.randomUUID(),
        content,
        role: "user",
      });

      const data = await sendMessageAction(
        { data: null, error: null },
        (() => {
          const fd = new FormData();
          fd.append("content", content);
          fd.append("chatId", chatId);
          return fd;
        })(),
      );

      if (data.error) {
        setServerError(data.error);
        return;
      }
    });
  };

  return (
    <>
      {optimisticMessages.map(
        (message: { id: string; content: string; role: string }) => (
          <div className="flex flex-col gap-4 py-8" key={message.id}>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg border border-white/10 bg-white/5 overflow-hidden">
                  {message.role === "user" ? (
                    <Image
                      src={user.avatar}
                      alt="User avatar"
                      width={28}
                      height={28}
                      unoptimized
                      className="w-full"
                    />
                  ) : (
                    <LogoWhite className="w-6 h-6" />
                  )}
                </div>
                {message.role === "user" ? (
                  <span className="text-xs text-white/30">You</span>
                ) : (
                  <span className="text-xs text-white/30">MechanicAI</span>
                )}
              </div>

              <div className="ml-9 rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.03] px-4 py-4">
                <div className="markdown prose prose-invert prose-sm max-w-none prose-p:text-white/80 prose-headings:text-white prose-strong:text-white">
                  <Markdown>{message.content}</Markdown>
                </div>
              </div>
            </div>
          </div>
        ),
      )}

      {isPending && !serverError && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg border border-white/10 bg-white/5">
              <LogoWhite className="w-6 h-6" />
            </div>
            <span className="text-xs text-white/30">MechanicAI</span>
          </div>
          <div className="ml-9 rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.03] px-4 py-4">
            <div className="flex gap-1 items-center h-5">
              <span className="h-1.5 w-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      )}

      <MessageForm
        chatId={chatId}
        onSend={handleSend}
        isPending={isPending}
        serverError={serverError}
      />
    </>
  );
};

export default ChatMessages;
