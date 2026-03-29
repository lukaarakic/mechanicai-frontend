"use client";

import Button from "@/app/components/ui/Button";
import ArrowLeft from "@/app/assets/icons/arrow-left.svg";
import { useRef } from "react";
import { Textarea } from "@/app/components/ui/textarea";

const MessageForm = ({
  chatId,
  onSend,
  isPending,
}: {
  chatId: string;
  onSend: (content: string) => void;
  isPending: boolean;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = textareaRef.current?.value.trim();
    if (!content || isPending) return;
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
          <ArrowLeft
            className="rotate-90 w-3.5 h-3.5"
            style={{ fill: "#000" }}
          />
        </Button>
      </form>

      <p className="text-center text-white/20 text-xs mt-3">
        MechanicAI can make mistakes. Always consult a professional.
      </p>
    </div>
  );
};

export default MessageForm;
