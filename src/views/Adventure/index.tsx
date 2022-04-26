import React, { useEffect, useState } from 'react';
import { Rooms } from '../Rooms';
import { Room } from '../Room';
import { AdventureCharacters } from './adventure-characters';
import { CreateRoomForm } from './room-form';
import { CharacterForm } from './character-form';
import { useJoinRoom } from './hooks/use-join-room';
import { Button } from '../Authentication';

export interface AdventureProps {
  token: string;
  adventure: string;
}

export function Adventure({ token, adventure }: AdventureProps) {
  const [selectedRoom, setSelectedRoom] = useState('');
  const joinRoom = useJoinRoom()
  const onJoinRoom = (room: string) => {
    joinRoom({
      variables: { room },
      context: {
        headers: {
          Authorization: token,
        },
      },
    })
  }

 
  console.log(selectedRoom);

  return (
    <>
      <h1>{adventure} : </h1>
      <div className="border">
        <div className="flex justify-around">
          <AdventureCharacters token={token} adventure={adventure} />
          <CharacterForm token={token} adventure={adventure}/>
          <Rooms token={token} adventure={adventure} onClick={(room: string) => setSelectedRoom(room)} />
          <CreateRoomForm token={token} adventure={adventure}/>
        </div>
        {selectedRoom && <Button onClick={() => onJoinRoom(selectedRoom)}>Join Selected</Button>}
        {selectedRoom && <Room token={token} room={selectedRoom} />}
      </div>
    </>
  );
}