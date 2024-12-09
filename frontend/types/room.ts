import { ChatMessage } from "./chat_message";

export interface Room {
  id: number;
  name: string;
  messages: ChatMessage[];
  createdBy?: string;
}
