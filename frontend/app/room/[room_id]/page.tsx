"use client";
import ChatMessageCard from "@/components/ChatMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect, useState } from "react";
import { useAppSelector } from "stores/hook";
import { selectUser } from "stores/slices/userSlice";
import { selectWebsocket } from "stores/slices/webSocketSlice";
import Stomp from "stompjs";
import { useWebSocket } from "api/websocket/useWebsocket";
import { redirect } from "next/navigation";

const ChatRoom: React.FC = () => {
  console.log("init variable");
  const { client } = useAppSelector(selectWebsocket);
  const { sendMessage } = useWebSocket();
  const [newMessage, setNewMessage] = useState("");
  const user = useAppSelector(selectUser);
  const [room, setRoom] = useState(user?.currentRoom);
  const messages = room?.messages || [];

  useEffect(() => {
    return () => {
      // run only component unmount
      const updateUserBody = { ...user, currentRoom: null };
      client.unsubscribe(`/topic/room/${room.id}`);
      sendMessage("/updateUser", updateUserBody);
    };
  }, []);

  useEffect(() => {
    const onUpdateRoom = (payload: Stomp.Message) => {
      if (payload.body.status) {
        sendMessage("/getMe", user.username);
        redirect("/dashboard");
      }
      const updatedRoom = JSON.parse(payload.body);
      setRoom(updatedRoom);
    };
    console.log("subscribe room");
    client.subscribe(`/topic/room/${room.id}`, onUpdateRoom);
  }, [room]);

  const handleSendMessage = () => {
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

  if (!user) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      {/* Chat Room Content */}
      <div className="w-full max-w-3xl space-y-8 bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-semibold text-gradient bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
            {room?.name}
          </h2>
          <button
            onClick={handleCopyRoomID}
            className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-2 px-4 rounded-lg hover:bg-gradient-to-l transition-all duration-300"
          >
            Copy Room ID
          </button>
        </div>

        {/* Messages Section */}
        <div className="h-96 overflow-y-auto bg-gray-100 rounded-lg p-4 border-2 border-gray-300 shadow-sm">
          <ul className="space-y-6">
            {messages.map((msg, index) => (
              <ChatMessageCard key={index} msg={msg} />
            ))}
          </ul>
        </div>

        {/* Send New Message Section */}
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
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
