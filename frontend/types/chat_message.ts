// chat_message.ts
export interface ChatMessage {
  type: "ENTER" | "JOIN" | "CHAT" | "LEAVE" | "EXIT";
  id: number;
  text: string;
  sender: string;
}
