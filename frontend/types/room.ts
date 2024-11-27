// room.ts
import { ChatMessage } from "./chat_message";
import { User } from "./user";

export interface Room {
  id: number;
  name: string;
  messages: ChatMessage[];
  createdBy?: string;
}
