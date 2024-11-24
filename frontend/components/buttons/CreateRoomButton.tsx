import React, { useState } from 'react';
import Modal from '../modals/Modal';

interface CreateRoomButtonProps {
  text: string;
}

const CreateRoomButton: React.FC<CreateRoomButtonProps> = ({ text }) => {
  const [roomName, setRoomName] = useState('');  
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleCreateRoom = () => {
    if (!roomName.trim()) {
      alert('Room name cannot be empty');
      return;
    }
    alert(`Room "${roomName}" created`);
    setIsModalOpen(false);
  };

  const handleClick = () => {
    setIsModalOpen(true);  
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);  
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-1 rounded-full shadow-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16M4 12h16" />
        </svg>
        {text}
      </button>

      {isModalOpen && (
        <Modal 
          title='Create Room'
          actionText='Create'
          placeHolder='Enter Room Name'
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          onSubmit={handleCreateRoom}
          input={roomName}
          setInput={setRoomName}  
        />
      )}
    </>
  );
};

export default CreateRoomButton;
