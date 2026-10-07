import type { Metadata } from "next";
import NewChatForm from "./NewChatForm";
import { getCars } from "@/app/lib/get-cars";
import { getUser } from "@/app/lib/get-user";

export const metadata: Metadata = {
  title: "New Chat",
  description: "Start a new diagnostic conversation for your vehicle.",
};

const NewChat = async () => {
  const [cars, user] = await Promise.all([getCars(), getUser()]);

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4 py-12">
      <NewChatForm cars={cars} freeChatsRemaining={user.free_chats_remaining} />
    </div>
  );
};

export default NewChat;
