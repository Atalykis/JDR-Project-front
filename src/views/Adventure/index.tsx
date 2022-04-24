import React, { useEffect, useState } from 'react';
import { Rooms } from '../Rooms';
import { Room } from '../Room';
import { AdventureCharacters } from './adventure-character';

export interface AdventureProps {
  token: string;
  adventure: string;
}

export function Adventure({ token, adventure }: AdventureProps) {
  const [selectedRoom, setSelectedRoom] = useState('');

  console.log(selectedRoom);

  return (
    <div className="border">
      <h1>{adventure} : </h1>
      <div className="flex justify-around">
        <AdventureCharacters token={token} adventure={adventure} />
        <Rooms token={token} adventure={adventure} onClick={(room: string) => setSelectedRoom(room)} />
      </div>
      {selectedRoom && <Room token={token} room={selectedRoom} />}
    </div>
  );
}

