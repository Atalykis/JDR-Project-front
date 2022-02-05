import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
async function getCharacters(token: string, adventure: string) {
  const response: any = await fetch(`http://localhost:3000/characters?adventure=${adventure}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  return response.json();
}

function useCharacters(token: string, adventure: string) {
  const [characters, setCharacters] = useState([{ name: '', owner: '', adventure: '', description: '' }]);

  useEffect(() => {
    getCharacters(token, adventure).then(setCharacters);
  }, [token, setCharacters]);

  return characters;
}

export function Adventure({ token, adventure }: { token: string; adventure: string }) {
  const characters = useCharacters(token, adventure);
  const [selected, setSelected] = useState({ name: '', owner: '', adventure: '', description: '' });

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
          <div onClick={() => setSelected(character)} className="rounded-lg bg-slate-200 m-1.5 flex-column w-[240px]">
            <img className="w-full overflow-hidden rounded-lg" src="https://fakeimg.pl/480x480/"></img>
            <h1 className="text-xl text-primary">{character.name}</h1>
            <p>{character.description}</p>
          </div>
        ))}
      </div>
      <button onClick={() => joinRoom(character)}>Join The Room</button>
    </div>
  );
}
