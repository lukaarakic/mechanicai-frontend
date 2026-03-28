"use client";

import Button from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import ArrowLeft from "@/app/assets/icons/arrow-left.svg";
import { useActionState } from "react";
import sendMessageAction from "@/app/lib/actions/chat";

const MessageForm = ({ sessionId }: { sessionId: string }) => {
  const initialState = { data: null, error: null };

  const [state, action, isPending] = useActionState(
    sendMessageAction,
    initialState,
  );

  return (
    <div className="mt-auto sticky bottom-0 py-6">
      <form action={action} className="relative mx-auto">
        <Textarea
          name="content"
          placeholder="Describe your car problem..."
          className="pr-14 py-4 bg-[--color-light-gray] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:border-white/20 transition-colors"
        />
        <input type="hidden" name="sessionId" value={sessionId} />
        <Button className="absolute bottom-2 right-2 h-8 w-8 rounded-lg text-black bg-white hover:bg-white/90 p-0 flex items-center justify-center">
          <ArrowLeft
            className={`rotate-90 w-12 h-12`}
            style={{ fill: "#000" }}
          />
        </Button>

        {state.error && (
          <p className="text-red-500 text-sm mt-2">{state.error}</p>
        )}
      </form>
      <p className="text-center text-white/20 text-xs mt-3">
        MechanicAI can make mistakes. Always consult a professional.
      </p>
    </div>
  );
};

export default MessageForm;
