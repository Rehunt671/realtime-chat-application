import React from "react";
import { FormatChatDate } from "@/utils/formatDateTime";
import { ChatMessage } from "types/chat_message";
import { useAppSelector } from "stores/hook";
import { selectUser } from "stores/slices/userSlice";

interface ChatMessageProps {
  msg: ChatMessage;
}

const ChatMessageCard: React.FC<ChatMessageProps> = ({ msg }) => {
  const user = useAppSelector(selectUser);

  const renderMessageContent = () => {
    switch (msg.type) {
      case "CREATE":
        return (
          <span className="text-blue-600 font-semibold text-center">
            {msg.text}
          </span>
        );
      case "ENTER":
        return <span className="text-green-600 text-center">{msg.text}</span>;
      case "JOIN":
        return (
          <span className="text-indigo-600 text-center">
            {msg.sender + " has joined the chat"}.
          </span>
        );
      case "CHAT":
        return <span className="text-gray-800">{msg.text}</span>;
      case "LEAVE":
        return <span className="text-red-600 text-center">{msg.text}.</span>;
      case "EXIT":
        return <span className="text-yellow-600">{msg.text}</span>;
      default:
        return null;
    }
  };

  const isMessageFromCurrentUser = msg.sender === user?.username;
  const isChatMessage = ["CHAT"].includes(msg.type);

  const itemAlignment = !isChatMessage
    ? "justify-center"
    : isMessageFromCurrentUser
    ? "justify-end"
    : "justify-start";

  return (
    <div key={msg.id} className={`${itemAlignment} flex space-x-3`}>
      {isChatMessage && (
        <div className="bg-blue-600 h-10 w-10 flex items-center justify-center rounded-full text-white font-bold uppercase">
          {msg.sender}
          <span className="block text-sm text-gray-500 text-center">
            {FormatChatDate(msg.datetime)}
          </span>
        </div>
      )}
      <div className="flex justify-center items-center text-gray-800 bg-white px-3 py-2 rounded-lg shadow-md">
        {renderMessageContent()}
      </div>
    </div>
  );
};

export default ChatMessageCard;
