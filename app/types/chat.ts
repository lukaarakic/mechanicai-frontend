// Mirrors DiagnosisReport in the backend (app/services/diagnosis_report.rb).
export type Diagnosis = {
  summary: string;
  vehicle: string;
  severity: "Low" | "Moderate" | "High" | "Critical";
  drive_safety: "safe" | "caution" | "stop";
  safety_note: string | null;
  causes: {
    name: string;
    likelihood: "High" | "Medium" | "Low";
    detail: string | null;
    check: string | null;
  }[];
  diy: {
    verdict: "yes" | "maybe" | "no";
    difficulty: "Easy" | "Moderate" | "Hard" | "Workshop only";
    summary: string | null;
    steps: string[];
  };
  costs: { repair: string; low: number; high: number; note: string | null }[];
  cost_note: string | null;
};

export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  // Set on the reply that diagnoses the problem; older chats only have content.
  diagnosis?: Diagnosis | null;
};

export type ChatMessagesProps = {
  chatId: string;
  messages: Message[];
  // null for Pro users (no limit).
  messagesRemaining: number | null;
  user: {
    avatar: string | null;
    first_name: string | null;
  };
};

export type SendMessageState = {
  error: {
    content?: string;
    general?: string;
  } | null;
  limitReached?: boolean;
};
