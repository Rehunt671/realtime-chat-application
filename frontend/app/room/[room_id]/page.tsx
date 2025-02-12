"use client";
import ChatMessageCard from "@/components/ChatMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect, useState, useRef } from "react";
import { useAppSelector } from "stores/hook";
import { selectUser } from "stores/slices/userSlice";
import { selectWebsocket } from "stores/slices/webSocketSlice";
import Stomp from "stompjs";
import { useWebSocket } from "hooks/useWebsocket";
import { redirect } from "next/navigation";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
const ChatRoom: React.FC = () => {
  const { client } = useAppSelector(selectWebsocket);
  const { sendMessage } = useWebSocket();
  const [newMessage, setNewMessage] = useState("");
  const user = useAppSelector(selectUser);
  const [room, setRoom] = useState(user?.currentRoom);
  const messages = room?.messages || [];
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!room) {
      sendMessage("/getMe", user.username);
      redirect("/dashboard");
    }
    const onManipulateRoom = (payload: Stomp.Message) => {
      const updatedRoom = JSON.parse(payload.body);
      setRoom(updatedRoom);
    };
    const subscription = client.subscribe(
      `/topic/room/${room.id}`,
      onManipulateRoom
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [room]);

  const handleSendMessage = () => {
    if (!newMessage) return;
    sendMessage("/sendChatMessage", {
      sender: user.username,
      text: newMessage,
      roomId: room.id,
    });
    setNewMessage("");
  };

  const handleCopyRoomID = () => {
    navigator.clipboard.writeText(room.id.toString()).then(() => {
      alert("Room ID copied to clipboard");
    });
  };

  const handleLeaveRoom = () => {
    client.unsubscribe(`/topic/room/${room.id}`);
    sendMessage("/leaveRoom", { roomId: room.id, leavedBy: user.username });
  };

  if (!user) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-3xl space-y-8 bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleLeaveRoom}
            className="bg-transparent p-2 rounded-full hover:bg-gray-100 transition-all duration-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8 text-gray-600 hover:text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
          </button>

          <h2 className="text-4xl font-semibold text-gradient bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 mx-auto">
            {room?.name}
          </h2>

          <button
            onClick={handleCopyRoomID}
            className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-2 px-4 rounded-lg hover:bg-gradient-to-l hover:scale-95 transition-all duration-200"
          >
            Copy Room ID
          </button>
        </div>

        <div
          ref={chatContainerRef}
          className="h-96 overflow-y-auto bg-gradient-to-br from-teal-50 to-indigo-50 rounded-lg p-4 border-2 border-gray-300 shadow-md"
        >
          <ul className="space-y-6">
            {messages.map((msg, index) => (
              <ChatMessageCard key={index} msg={msg} />
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-4 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gradient-to-r from-indigo-100 to-indigo-50 text-gray-700 text-lg placeholder-gray-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-gradient-to-l hover:from-pink-600 hover:to-yellow-600 transition-all"
          >
            <PaperAirplaneIcon className="h-6 w-6 text-white transform " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
