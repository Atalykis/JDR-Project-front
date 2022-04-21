import React, { useEffect, useState } from 'react';
import { useCharacters } from './use-characters';
import { Rooms } from '../Rooms';
import { CharacterCard } from '../CharacterCard';
import { Room } from '../Room';

interface AdventureProps {
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

interface AdventureCharactersProps extends AdventureProps {}

function AdventureCharacters({ token, adventure }: AdventureCharactersProps) {
  const characters = useCharacters(token, adventure);

  console.log(characters);
  return (
    <>
      <h2>Characters : </h2>
      <ul>
        {characters.map((character) => {
          return (
            <li key={character.name}>
              <CharacterCard character={character} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
