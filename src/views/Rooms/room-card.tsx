import React from 'react';
interface RoomCardProps {
  room: {
    name: string;
    gm: string;
    adventure: string;
  };
  onClick: (room: string) => void;
}

export function RoomCard({ room, onClick }: RoomCardProps) {
  return (
    <div onClick={() => onClick(room.name)}>
      <h2> - {room.name}</h2>
    </div>
  );
}
