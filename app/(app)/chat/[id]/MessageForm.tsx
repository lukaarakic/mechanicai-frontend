"use client";

import Button from "@/app/components/ui/Button";
import ArrowLeft from "@/app/assets/icons/arrow-left.svg";
import { useRef, useState } from "react";
import { Textarea } from "@/app/components/ui/Textarea";
import FormMessage from "@/app/components/ui/FormMessage";
import { SendMessageState } from "@/app/types/chat";

const MessageForm = ({
  chatId,
  isPending,
  serverError,
  onSend,
}: {
  chatId: string;
  isPending: boolean;
  serverError?: SendMessageState["error"];
  onSend: (content: string) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    setError(undefined);
    e.preventDefault();
    const content = textareaRef.current?.value.trim();
    if (!content || isPending) return;
    if (content.length < 10) {
      setError("Content must be at least 10 characters.");
      return;
    }
    onSend(content);
    if (textareaRef.current) textareaRef.current.value = "";
  };

  return (
    <div className="sticky bottom-0 pb-6 pt-3 mt-auto bg-black/80 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="relative">
        <Textarea
          ref={textareaRef}
          name="content"
          placeholder="Ask a follow-up question..."
        />
        <input type="hidden" name="chatId" value={chatId} />
        <Button
          disabled={isPending}
          className="absolute bottom-2.5 right-2.5 h-7 w-7 rounded-lg bg-white hover:bg-white/90 p-0 flex items-center justify-center transition-all active:scale-95 disabled:opacity-40"
        >
          <ArrowLeft className="rotate-90 w-5 h-5" style={{ fill: "#000" }} />
        </Button>
      </form>

      {}
      <FormMessage error={error} />
      <FormMessage error={serverError?.content} />
      <FormMessage error={serverError?.general} />

      <p className="text-center text-white/20 text-xs mt-3">
        MechanicAI can make mistakes. Always consult a professional.
      </p>
    </div>
  );
};

export default MessageForm;
