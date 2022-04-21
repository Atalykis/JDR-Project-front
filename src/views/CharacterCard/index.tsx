import React from 'react';
import type { Character } from 'src/types/types';

export function CharacterCard({ character }: { character: Character }) {
  return (
    <div>
      {/* <img className="w-full overflow-hidden rounded-lg" src="https://fakeimg.pl/480x480/"></img> */}
      <h1 className="text-xl text-primary">{character.name}</h1>
      <p>{character.description}</p>
    </div>
  );
}
