// chat_message.ts
export interface ChatMessage {
  type: "CHAT" | "LEAVE" | "JOIN";
  id: number;
  text: string;
  sender: string;
}
