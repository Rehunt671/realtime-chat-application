import React, { useState } from "react";
import Modal from "../modals/Modal";
import { useWebSocket } from "hooks/useWebsocket";
import { selectUser } from "stores/slices/userSlice";
import { useAppSelector } from "stores/hook";

interface EnterRoomButtonProps {
  text: string;
}

const EnterRoomButton: React.FC<EnterRoomButtonProps> = ({ text }) => {
  const { sendMessage } = useWebSocket();
  const user = useAppSelector(selectUser);
  const [roomId, setRoomId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEnterRoom = () => {
    if (!user) {
      alert("User is not authenticated.");
      return;
    }

    if (!roomId.trim()) {
      alert("Room id cannot be empty");
      return;
    }

    const enterRoomBody = { roomId: roomId, enteredBy: user.username };
    try {
      sendMessage("/enterRoom", enterRoomBody);
      setRoomId("");
      setIsModalOpen(false);
    } catch (error) {
      alert("Error enter room. Please try again.");
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-4 py-1 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-3 hover:animate-pulse"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {text}
      </button>

      {isModalOpen && (
        <Modal
          title="Enter Room"
          actionText="Enter"
          placeHolder="Enter Room ID"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleEnterRoom}
          input={roomId}
          setInput={setRoomId}
        />
      )}
    </>
  );
};

export default EnterRoomButton;
