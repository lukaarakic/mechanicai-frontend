export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

export type ChatMessagesProps = {
  chatId: string;
  messages: Message[];
  user: {
    avatar: string;
  };
};

export type SendMessageState = {
  data: any;
  error: {
    content?: string;
    general?: string;
  } | null;
};
