import React, { useEffect, useState } from 'react';
import { DrawingBoard } from '../Board';
import { Button } from '../Basic-component/button';
import { useKickPlayer } from './hooks/use-kick-player';
import { useLeaveRoom } from './hooks/use-leave-room';
import { useRoomInfos } from './hooks/use-room-infos';
import type { Character } from 'src/types/types';
export function Room({ token, room }: { token: string; room: string }) {
  const [id, setId] = useState(0);
  const { data , loading } = useRoomInfos(token, room);
  const [selectedMember, setSelectedMember] = useState('');

  const leaveRoom = useLeaveRoom();
  const onLeaveRoom = () => {
    leaveRoom({
      variables: { room },
      context: {
        headers: {
          authorization: token,
        },
      },
    })
  }

  const kickPlayer = useKickPlayer()
  const onKickPlayer = (player: string) => {
    kickPlayer({
      variables: { room, player },
      context: {
        headers: {
          authorization: token,
        },
      },
    })
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Room not found</div>;
  }

  return (

    <div className="bg-gray-300">
      <Button onClick={() => setId(id + 1)}>Reset</Button>
      <Button onClick={() => onLeaveRoom()}>Leave Room</Button>
      <Button onClick={() => onKickPlayer(selectedMember)}>Kick Selected Player</Button>
      <div className='flex'>
        <ul className='mx-5'>
          <li>Members :</li>
          {data.room.members.map((member: string) => <li key={member} onClick={() => setSelectedMember(member)}> - {member}</li>)}
        </ul>
        <ul>
          <li>Characters :</li>
          {data.room.characters.map((character: Character) => <li key={character.name}> - {character.name} - {character.description}</li>)}
        </ul>
      </div>
      <div className="p-4">
        <DrawingBoard key={id} id={id} token={token} room={room} />
      </div>
    </div>
  );
}
