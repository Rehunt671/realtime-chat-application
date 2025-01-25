import Link from "next/link";
import React, { useState } from "react";
import { Room } from "types/room";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "stores/hook";
import { selectUser } from "stores/slices/userSlice";
import { useWebSocket } from "hooks/useWebsocket";

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{message}</h3>
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

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const { sendMessage } = useWebSocket();
  const user = useAppSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [action, setAction] = useState<"delete" | "exit">();

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setModalMessage("Are you sure you want to delete this room?");
    setAction("delete");
    setIsModalOpen(true);
  };

  const handleExitClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setModalMessage("Are you sure you want to exit this room?");
    setAction("exit");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    let requestBody = null;
  
    switch (action) {
      case "delete":
        requestBody = { roomId: room.id, deletedBy: user.username };
        sendMessage("/deleteRoom", requestBody);
        break;
  
      case "exit":
        requestBody = { roomId: room.id, exitedBy: user.username };
        sendMessage("/exitRoom", requestBody);
        break;
  
      default:
        console.warn("Unhandled action:", action);
    }
  
    setIsModalOpen(false);
  };
  
  const handleJoinRoom = async (e: React.MouseEvent) => {
    const joinRoomBody = { roomId: room.id, joinedBy: user.username };
    try {
      sendMessage("/joinRoom", joinRoomBody);
    } catch (error) {
      alert("Error joining room. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-100">
        <Link onClick={handleJoinRoom} href={`/room/${room.id}`}>
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {room.name}
            </h3>
            <div className="flex justify-between items-center mt-6">
              <span className="text-sm text-gray-500">
                Created by: {room.createdBy}
              </span>
              {room.createdBy === user.username ? (
                <div>
                  <button
                    onClick={handleDeleteClick}
                    className="text-white bg-red-500 hover:bg-red-700 transition-colors duration-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg flex items-center space-x-2"
                    aria-label="Delete Room"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleExitClick}
                  className="text-white bg-red-500 hover:bg-red-700 transition-colors duration-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg flex items-center space-x-2"
                  aria-label="Exit Room"
                >
                  <FontAwesomeIcon icon={faDoorOpen} className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </Link>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        message={modalMessage}
      />
    </>
  );
};

export default RoomCard;
