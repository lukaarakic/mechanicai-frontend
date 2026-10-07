import z from "zod";

// Mirrors the API limit. Short answers like "No" are valid replies to the
// assistant's diagnostic questions.
export const MESSAGE_MAX_LENGTH = 4000;

export const MessageContentSchema = z
  .string()
  .trim()
  .min(1, "Please enter a message.")
  .max(
    MESSAGE_MAX_LENGTH,
    `Messages can be up to ${MESSAGE_MAX_LENGTH} characters.`,
  );
