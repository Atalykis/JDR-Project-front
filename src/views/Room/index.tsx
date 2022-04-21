import React, { useEffect, useState } from 'react';
import { useRoomCharacters } from './use-room-character';
import { CharacterToken } from '../CharacterToken';
import { DrawingBoard } from '../Board';
import { Button } from '../Authentication';

export function Room({ token, room }: { token: string; room: string }) {
  const [id, setId] = useState(0);
  const { data, loading } = useRoomCharacters(token, room);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Room not found</div>;
  }

  console.log(data);

  return (
    <div className="bg-gray-300">
      {/* {data.room.characters.map((character: any) => (
        <CharacterToken key={character.name} character={character} />
      ))} */}
      <Button onClick={() => setId(id + 1)}>Reset</Button>
      <div className="p-4">
        <DrawingBoard key={id} id={id} token={token} room={room} />
      </div>
    </div>
  );
}

// return (
//   <>
//   </>
// );
