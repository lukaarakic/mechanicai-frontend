"use client";

import Button from "@/app/components/ui/Button";
import ArrowLeft from "@/app/assets/icons/arrow-left.svg";
import { useState } from "react";
import { Textarea } from "@/app/components/ui/Textarea";
import FormMessage from "@/app/components/ui/FormMessage";
import { SendMessageState } from "@/app/types/chat";
import {
  MESSAGE_MAX_LENGTH,
  MessageContentSchema,
} from "@/app/lib/validations/chat-validation";

const MessageForm = ({
  value,
  onChange,
  isPending,
  serverError,
  messagesRemaining,
  onSend,
}: {
  value: string;
  onChange: (value: string) => void;
  isPending: boolean;
  serverError?: SendMessageState["error"];
  messagesRemaining: number | null;
  onSend: (content: string) => void;
}) => {
  const [error, setError] = useState<string | undefined>();

  const submit = () => {
    if (isPending) return;
    setError(undefined);

    const parsed = MessageContentSchema.safeParse(value);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    onSend(parsed.data);
  };

  return (
    <div className="sticky bottom-0 pb-6 pt-3 mt-auto bg-black/80 backdrop-blur-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="relative"
      >
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <Textarea
          id="message"
          name="content"
          value={value}
          maxLength={MESSAGE_MAX_LENGTH}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            // Enter sends, Shift+Enter adds a new line.
            if (
              e.key === "Enter" &&
              !e.shiftKey &&
              !e.nativeEvent.isComposing
            ) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Reply or ask a follow-up question..."
          className="pr-12"
        />
        <Button
          type="submit"
          aria-label="Send message"
          disabled={isPending}
          className="absolute bottom-2.5 right-2.5 h-7 w-7 rounded-lg bg-white hover:bg-white/90 p-0 flex items-center justify-center transition-all active:scale-95 disabled:opacity-40"
        >
          <ArrowLeft className="rotate-90 w-5 h-5" style={{ fill: "#000" }} />
        </Button>
      </form>

      <FormMessage error={error} />
      <FormMessage error={serverError?.content} />
      <FormMessage error={serverError?.general} />

      <p className="text-center text-white/20 text-xs mt-3">
        {messagesRemaining !== null &&
          `${messagesRemaining} free ${messagesRemaining === 1 ? "message" : "messages"} left in this chat · `}
        DashClue can make mistakes. Always consult a professional.
      </p>
    </div>
  );
};

export default MessageForm;
