"use client";

import { useState, useTransition } from "react";
import HistoryList from "./HistoryList";
import Button from "../ui/Button";
import FormMessage from "../ui/FormMessage";
import { getChats } from "@/app/lib/actions/chat/get-chats";
import { ChatSummary, HISTORY_PAGE_SIZE } from "@/app/types/history";

const PaginatedHistory = ({
  initialChats,
}: {
  initialChats: ChatSummary[];
}) => {
  const [chats, setChats] = useState(initialChats);
  const [hasMore, setHasMore] = useState(
    initialChats.length === HISTORY_PAGE_SIZE,
  );
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const loadMore = () => {
    setError(null);
    startTransition(async () => {
      try {
        const next = await getChats({ before: chats.at(-1)?.created_at });
        setChats((prev) => [...prev, ...next]);
        setHasMore(next.length === HISTORY_PAGE_SIZE);
      } catch {
        setError("Couldn't load more diagnostics. Please try again.");
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full">
        <HistoryList solutions={chats} />
      </div>
      <FormMessage error={error} />
      {hasMore && (
        <Button variant="outline" onClick={loadMore} disabled={isPending}>
          {isPending ? "Loading..." : "Load more"}
        </Button>
      )}
    </div>
  );
};

export default PaginatedHistory;
