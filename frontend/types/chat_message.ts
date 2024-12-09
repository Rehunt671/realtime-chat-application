// chat_message.ts
export interface ChatMessage {
  type: "CREATE" | "ENTER" | "JOIN" | "CHAT" | "LEAVE" | "EXIT";
  id: number;
  text: string;
  sender: string;
  datetime: Date;
}
