"use client";

import Markdown, { Components } from "react-markdown";
import MessageForm from "./MessageForm";
import LogoWhite from "@/app/assets/logo-white.svg";
import {
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";
import sendMessageAction from "@/app/lib/actions/chat/send-message";
import { ChatMessagesProps, Message, SendMessageState } from "@/app/types/chat";
import Avatar from "@/app/components/ui/Avatar";
import { ButtonLink } from "@/app/components/ui/Button";
import DiagnosisCard from "@/app/components/chat/DiagnosisCard";

// Links in AI replies open in a new tab and never pass referrer/rank.
const markdownComponents: Components = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  a: ({ node, ...props }) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="underline underline-offset-2 hover:text-white"
    />
  ),
};

// The chat scrolls inside the app's <main>, not the window.
const scrollToBottom = (el: HTMLElement | null, behavior: ScrollBehavior) => {
  const scroller = el?.closest("main");
  scroller?.scrollTo({ top: scroller.scrollHeight, behavior });
};

const ChatMessages = ({
  chatId,
  messages,
  messagesRemaining,
  user,
}: ChatMessagesProps) => {
  const [serverError, setServerError] =
    useState<SendMessageState["error"]>(null);
  const [limitHit, setLimitHit] = useState(false);
  const [draft, setDraft] = useState("");
  const [isPending, startTransition] = useTransition();
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state: Message[], newMessage: Message) => [...state, newMessage],
  );
  const listRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  // Ids already scrolled to, so a message that reappears (e.g. after a failed
  // send removes the optimistic one) doesn't yank the view around.
  const seenIds = useRef<Set<string> | null>(null);

  const limitReached = limitHit || messagesRemaining === 0;
  const lastMessage = optimisticMessages.at(-1);

  useEffect(() => {
    if (!lastMessage) return;

    const isFirstRender = seenIds.current === null;
    seenIds.current ??= new Set();
    if (seenIds.current.has(lastMessage.id)) return;
    optimisticMessages.forEach((m) => seenIds.current!.add(m.id));

    const behavior: ScrollBehavior = isFirstRender ? "auto" : "smooth";
    if (lastMessage.role === "assistant") {
      // Show the start of the reply so a long diagnosis is read top-down.
      lastMessageRef.current?.scrollIntoView({ behavior, block: "start" });
    } else {
      scrollToBottom(listRef.current, behavior);
    }
  }, [lastMessage, optimisticMessages]);

  // Keep the typing indicator in view while waiting for the reply.
  useEffect(() => {
    if (isPending) scrollToBottom(listRef.current, "smooth");
  }, [isPending]);

  const handleSend = (content: string) => {
    setServerError(null);
    setDraft("");

    startTransition(async () => {
      addOptimisticMessage({ id: crypto.randomUUID(), content, role: "user" });

      const result = await sendMessageAction(chatId, content);

      if (result.error) {
        setServerError(result.error);
        // Give the text back so the user can retry without retyping.
        setDraft(content);
        if (result.limitReached) setLimitHit(true);
      }
    });
  };

  return (
    <>
      <div ref={listRef} aria-live="polite" className="flex flex-col">
        {optimisticMessages.map((message) => (
          <div
            key={message.id}
            ref={message.id === lastMessage?.id ? lastMessageRef : undefined}
            // Clears the sticky chat header when scrolled into view.
            className="flex scroll-mt-16 flex-col gap-4 py-8"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg border border-white/10 bg-white/5 overflow-hidden">
                  {message.role === "user" ? (
                    <Avatar
                      src={user.avatar}
                      name={user.first_name}
                      size={28}
                    />
                  ) : (
                    <LogoWhite className="w-6 h-6" />
                  )}
                </div>
                <span className="text-xs text-white/30">
                  {message.role === "user" ? "You" : "DashClue"}
                </span>
              </div>

              {message.diagnosis ? (
                <div className="sm:ml-9">
                  <DiagnosisCard diagnosis={message.diagnosis} />
                </div>
              ) : (
                <div className="ml-9 rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.03] px-4 py-4">
                  <div className="markdown max-w-none break-words text-sm text-white/80">
                    <Markdown components={markdownComponents}>
                      {message.content}
                    </Markdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isPending && (
          <div className="flex flex-col gap-2" role="status">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg border border-white/10 bg-white/5">
                <LogoWhite className="w-6 h-6" />
              </div>
              <span className="text-xs text-white/30">DashClue</span>
            </div>
            <div className="ml-9 rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.03] px-4 py-4">
              <span className="sr-only">DashClue is typing…</span>
              <div className="flex gap-1 items-center h-5">
                <span className="h-1.5 w-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {limitReached ? (
        <div className="sticky bottom-0 mt-auto flex flex-col items-center gap-3 bg-black/80 pb-6 pt-4 text-center backdrop-blur-sm">
          <p className="text-sm text-white/50">
            You&apos;ve used all free messages in this chat.
          </p>
          <ButtonLink href="/settings/subscription">Upgrade to Pro</ButtonLink>
        </div>
      ) : (
        <MessageForm
          value={draft}
          onChange={setDraft}
          onSend={handleSend}
          isPending={isPending}
          serverError={serverError}
          messagesRemaining={messagesRemaining}
        />
      )}
    </>
  );
};

export default ChatMessages;
