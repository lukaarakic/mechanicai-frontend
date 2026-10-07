export const HISTORY_PAGE_SIZE = 12;

export type ChatSummary = {
  id: string;
  created_at: string;
  title: string | null;
  category: string | null;
  car: {
    make: string;
    model: string;
    year: number;
    size: number;
    power: number;
  } | null;
};
