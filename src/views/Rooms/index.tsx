import { useRooms } from './use-rooms';
import React, { useCallback, useState } from 'react';
import { RoomCard } from './room-card';
import { Button, Input } from '../Authentication';
import { useCreateRoom } from './use-create-room';

interface RoomsProps {
  token: string;
  adventure: string;

  onClick: (room: string) => void;
}
export function Rooms({ token, adventure, onClick }: RoomsProps) {
  const { loading, data } = useRooms(token, adventure);
  const [roomName, setRoomName] = useState('');
  const createRoom = useCreateRoom();
  const onCreateRoom = (room: string) => {
    createRoom({
      variables: { name: room, adventure },
      context: {
        headers: {
          Authorization: token,
        },
      },
    })
  }



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
      <div>
        <h2>Create Room</h2>
        <Input id="roomName" type="text" placeholder="Room Name" value={roomName} onChange={(e) => setRoomName(e.currentTarget.value)} />
        <Button onClick={() => onCreateRoom(roomName)}>Create</Button>
      </div>
    </>
  );
}
