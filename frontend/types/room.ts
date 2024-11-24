import { z } from 'zod';
import { ChatMessageSchema } from './chat_message';
import { UserSchema } from './user';

export const RoomSchema = z.object({
  id: z.string(),
  name: z.string(),
  joiningUsers: z.array(UserSchema).default([]),
  messages: z.array(ChatMessageSchema).default([]),
  createdBy: UserSchema.optional(),
});

export type Room = z.infer<typeof RoomSchema>;