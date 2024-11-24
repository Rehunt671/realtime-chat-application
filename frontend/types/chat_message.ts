import { z } from 'zod';

export const ChatMessageSchema = z.object({
  id: z.number(),
  text: z.string(),
  sender: z.string(),
  type: z.enum(["CHAT", "LEAVE", "JOIN"]),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;