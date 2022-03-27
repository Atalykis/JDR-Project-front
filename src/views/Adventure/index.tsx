import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { CharacterCard } from '../CharacterCard';
import { useJoinRoom } from './use-join-room';
import { useCharacters } from './use-characters';
import type { Character } from 'src/types/types';

export function Adventure({ token, adventure }: { token: string; adventure: string }) {
  const characters = useCharacters(token, adventure);
  const joinRoom = useJoinRoom(token, () => navigate('/room'));
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Character | undefined>();

  return (
    <div>
      <div className="container mx-auto w-4/6 m-3 bg-slate-50">
        <img className="float-left m-1.5 rounded-lg" src="https://fakeimg.pl/250x200/"></img>
        <h1 className="m-1.5 text-3xl">{adventure}</h1>
        <h2 className="m-1.5">Adventurers : </h2>
        <p>
          Plusieurs fois pendant mes voyages au travers de Cornélia, j’ai rencontré des créatures terriblement dangereuses et puissantes. Capable de
          souffler une puissante énergie lumineuse capable de dévaster tout sur leur passage, même ce qui y résister finissait par périr tôt ou tard
          des liaisons provoqués. Des créatures à la peau écailleuse, recouverte de pierres précieuses, brillant et scintillant, un véritable trésor
          ambulant. Pour autant, rares sont les aventuriers à avoir eu entre leurs mains, une pincée de ce trésor.
        </p>
        <div className="clear-both"></div>
      </div>
      <h1 className="m-2 text-3xl">Character selection</h1>
      <div className="container mx-auto flex bg-slate-50">
        <div className="rounded-md bg-gray-200 m-1.5 w-32 flex p-0">
          <Link className="m-auto text-3xl font-black" to="/character-creation">
            +
          </Link>
        </div>
        {characters.map((character) => (
          <div
            onClick={() => setSelected(character)}
            className={classnames(
              'rounded-lg bg-slate-200 m-1.5 border-4 flex-column w-[240px] hover:border-indigo-500/100',
              character === selected && 'border-green-800',
            )}
          >
            <CharacterCard character={character}></CharacterCard>
          </div>
        ))}
      </div>
      {selected && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => joinRoom('TheBizarreRoom', selected)}
        >
          Join The Room
        </button>
      )}
    </div>
  );
}
