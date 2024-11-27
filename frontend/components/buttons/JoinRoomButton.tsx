import React, { useState } from "react";
import Modal from "../modals/Modal";

interface JoinRoomButtonProps {
  text: string;
}

const JoinRoomButton: React.FC<JoinRoomButtonProps> = ({ text }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomId, setRoomId] = useState("");

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      alert(`Joining Room: ${roomId}`);
      setRoomId("");
      setIsModalOpen(false);
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
          title="Join Room"
          actionText="Join"
          placeHolder="Enter Room ID"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleJoinRoom}
          input={roomId}
          setInput={setRoomId}
        />
      )}
    </>
  );
};

export default JoinRoomButton;
