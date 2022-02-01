import React, { useState } from 'react';
import { useCreateRoom } from './use-create-room';

export function RoomForm({ token }: { token: string }) {
  const [roomName, setRoomName] = useState('');
  const [adventure, setAdventure] = useState('');

  const createRoom = useCreateRoom(token);

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-slate-100">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" html-for="username">
            Room Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="roomname"
            type="text"
            placeholder="RoomName"
            value={roomName}
            onChange={(event) => setRoomName(event.currentTarget.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" html-for="password">
            Adventure
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="adventure"
            type="text"
            placeholder="TheGreatEscape"
            value={adventure}
            onChange={(event) => setAdventure(event.currentTarget.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => createRoom(roomName, adventure)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
