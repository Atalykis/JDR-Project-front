import { useRooms } from './use-rooms';
import React from 'react';
import { RoomCard } from './room-card';

interface RoomsProps {
  token: string;
  adventure: string;

  onClick: (room: string) => void;
}
export function Rooms({ token, adventure, onClick }: RoomsProps) {
  const { loading, data } = useRooms(token, adventure);

  if (loading) {
    return <div>Loading Rooms...</div>;
  }

  if (!data) {
    return <div>No Rooms Found in {adventure}</div>;
  }

  return (
    <>
      <h2>Rooms : </h2>
      <ul>
        {data.rooms.map((room: { name: string; gm: string; adventure: string }) => {
          return (
            <li key={room.name}>
              <RoomCard room={room} onClick={onClick} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
