'use client';

import CreateRoomButton from '@/components/buttons/CreateRoomButton';
import JoinRoomButton from '@/components/buttons/JoinRoomButton';
import RoomCard from '@/components/RoomCard';
import { useState } from 'react';
import { Room } from 'types/room';

const Dashboard: React.FC = () => {
  const [userRooms, setUserRooms] = useState<Room[]>([
    {
      id: "1",
      name: "Nono Room",
      createdBy: {
        username: "nono", // ID of the creator
      },
      messages: [
        {
          id: 1,
          text: "Welcome to Nono Room!",
          sender: "Nono",
          type: "CHAT",
        },
        {
          id: 2,
          text: "Nono has joined the room.",
          sender: "System",
          type: "JOIN",
        },
      ],
    },
    {
      id: "2",
      name: "Tech Talk Room",
      createdBy: {
        username: "bobo", // ID of the creator
      },
      messages: [
        {
          id: 1,
          text: "Today's topic is TypeScript.",
          sender: "Admin",
          type: "CHAT",
        },
        {
          id: 2,
          text: "Alice has joined the room.",
          sender: "System",
          type: "JOIN",
        },
      ],
    },
  ]);
  
  
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
          <CreateRoomButton text="Create Room"/>
          <JoinRoomButton text="Join Room" />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Rooms</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRooms.map((room , index) => (
              <li key={index} className="space-y-4">
                <RoomCard room={room} />
              </li>
            ))}
            {userRooms.length === 0 && (
              <div className="col-span-full text-center py-12 bg-card rounded-lg border border-gray-300 shadow-sm">
                <p className="text-muted-foreground">No rooms yet. Create or join one to get started!</p>
              </div>
            )}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
