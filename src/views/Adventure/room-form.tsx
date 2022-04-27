import React, { useState } from 'react';
import type { AdventureProps } from './index';
import { useCreateRoom } from './hooks/use-create-room';
import { Input } from '../Basic-component/input';
import { Button } from '../Basic-component/button';
export function CreateRoomForm({ token, adventure }: AdventureProps) {
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

  return (
    <div className="border">
      <h2>Create Room</h2>
      <Input id="roomName" type="text" placeholder="Room Name" value={roomName} onChange={(e) => setRoomName(e.currentTarget.value)} />
      <Button onClick={() => onCreateRoom(roomName)}>Create</Button>
    </div>
  );
}