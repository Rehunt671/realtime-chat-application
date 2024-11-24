import Link from 'next/link';
import React, { useState } from 'react';

// Modal component
const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Are you sure you want to delete this room?</h3>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const RoomCard = ({ room, deleteRoom }) => {
  const currentUserId = undefined; 

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault(); 
    setIsModalOpen(true); 
  };

  const handleDeleteConfirm = () => {
    deleteRoom(room.id); 
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false); 
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-100">
        <Link href={`/room/${room.id}`}>
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{room.name || "Name"} </h3>

            <div className="flex justify-between items-center mt-6">
              <span className="text-sm text-gray-500">Created by: {room.creatorName}</span>

              {room.creatorId === currentUserId && (
                <button
                  onClick={handleDeleteClick}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </Link>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default RoomCard;
