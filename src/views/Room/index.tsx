import React, { useEffect, useState } from 'react';
import { useRoomCharacters } from './use-room-character';
import { Board } from '../Board';
import { CharacterToken } from '../CharacterToken';

export function Room({ token, room }: { token: string; room: string }) {
  const [height, setHeight] = useState((window.screen.height * 8) / 10);
  const [width, setWidth] = useState((window.screen.width * 8) / 10);
  const characters = useRoomCharacters(token, room);

  return (
    <div className="bg-gray-300 w-screen h-screen">
      <div className={'w-[' + width + 'px] h-[' + height + 'px] relative '}>
        <Board width={width} height={height} />
        {characters.map((character) => (
          <CharacterToken character={character} />
        ))}
      </div>
    </div>
  );
}
