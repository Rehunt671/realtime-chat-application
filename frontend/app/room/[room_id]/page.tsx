"use client";
import { useMutationCreateRoom } from "api/room";
import { useState } from "react";
import { Room } from "types/room";

const initialMessages = [
  { id: 1, user: "Alice", message: "Hello, how are you?" },
  { id: 2, user: "Bob", message: "I am good, thanks! How about you?" },
];

const ChatRoom: React.FC = () => {
  const createRoomMutation = useMutationCreateRoom();
  const getQuery; = useQueryGetRooms();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const room = null;
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObj = {
        id: messages.length + 1,
        user: "You",
        message: newMessage,
      };
      setMessages((prevMessages) => [...prevMessages, newMessageObj]);
      setNewMessage("");
    }
  };

  const handleCopyRoomID = () => {
    navigator.clipboard.writeText(room.id).then(() => {
      alert("Room ID copied to clipboard");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-50 items-center pt-24 p-8">
      {/* Chat Room Content */}
      <div className="max-w-4xl mx-auto space-y-8 pt-16 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">{room.name}</h2>

        {/* Copy Room ID Button */}
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={handleCopyRoomID}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
          >
            Copy Room ID: {room.id}
          </button>
        </div>

        {/* Messages Section */}
        <div className="h-96 overflow-y-scroll border-b border-gray-300 pb-4">
          <ul className="space-y-4">
            {messages.map((msg) => (
              <li key={msg.id} className="flex flex-col">
                <span className="font-semibold text-gray-700">{msg.user}:</span>
                <p className="text-gray-800">{msg.message}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Send New Message Section */}
        <div className="mt-4 flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
