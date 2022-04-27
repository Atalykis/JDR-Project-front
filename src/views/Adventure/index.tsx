import React, { useEffect, useState } from 'react';
import { Rooms } from '../Rooms';
import { Room } from '../Room';
import { AdventureCharacters } from './adventure-characters';
import { CreateRoomForm } from './room-form';
import { CharacterForm } from './character-form';
import { useJoinRoom } from './hooks/use-join-room';
import { Button } from '../Basic-component/button';
import { useAddCharacter } from './hooks/use-add-charcter';
import type { Character } from 'src/types/types';

export interface AdventureProps {
  token: string;
  adventure: string;
}

export function Adventure({ token, adventure }: AdventureProps) {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState({} as Character);

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

  const addCharacter = useAddCharacter()
  const onAddCharacter = (character: Character) => {
    addCharacter({
      variables: { room: selectedRoom, character: {name: character.name, owner: character.owner, adventure: character.adventure} },
      context: {
        headers: {
          Authorization: token,
        },
      },
    })
  }

  return (
    <>
      <h1>{adventure} : </h1>
      <div className="border">
        <div className="flex justify-around">
          <AdventureCharacters token={token} adventure={adventure} select={setSelectedCharacter}/>
          <CharacterForm token={token} adventure={adventure}/>
          {selectedCharacter && selectedRoom && <Button onClick={() => onAddCharacter(selectedCharacter)}>Add in Selected</Button>}
          <Rooms token={token} adventure={adventure} onClick={(room: string) => setSelectedRoom(room)} />
          {selectedRoom && <Button onClick={() => onJoinRoom(selectedRoom)}>Join Selected</Button>}
          <CreateRoomForm token={token} adventure={adventure}/>
        </div>
        {selectedRoom && <Room token={token} room={selectedRoom} />}
      </div>
    </>
  );
}