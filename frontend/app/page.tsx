'use client';

import { useState } from 'react';
import CreateButton from '../components/buttons/create';
import RoomCard from '../components/RoomCard';

const Dashboard: React.FC = () => {
  const [roomId, setRoomId] = useState<string>('');
  const [rooms, setRooms] = useState<string[]>(['Room1', 'Room2', 'Room3']); // Example rooms
  const [userRooms, setUserRooms] = useState<string[]>(['Room1', 'Room2', 'Room3']); // Rooms created by the user

  const createRoom = () => {
    if (!roomId.trim()) {
      alert('Room name cannot be empty');
      return;
    }
    setUserRooms((prev) => [...prev, roomId]);
    setRoomId('');
  };

  const deleteRoom = (id: string) => {
    setUserRooms((prev) => prev.filter((room) => room !== id));
    alert(`Room ${id} deleted`);
  };

  const joinRoom = (id: string) => {
    // Redirect to chat room page
    alert(`Joining Room: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-50 p-8 items-center">
      <div className="max-w-4xl mx-auto space-y-8 pt-16">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Chat Rooms
          </h1>

          <p className="text-muted-foreground">Create or join a room to start chatting</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room Name"
            className="w-full sm:w-2/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <CreateButton text="Create Room" onClick={createRoom} />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Available Rooms</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRooms.map((room) => (
              <RoomCard key={room} room={room} deleteRoom={deleteRoom} />
            ))}
            {rooms.length === 0 && (
              <div className="col-span-full text-center py-12 bg-card rounded-lg border border-gray-300 shadow-sm">
                <p className="text-muted-foreground">
                  No rooms yet. Create one to get started!
                </p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
