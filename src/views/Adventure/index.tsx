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
  const [characters, setCharacters] = useState([{ name: '', owner: '', adventure: '' }]);

  useEffect(() => {
    getCharacters(token, adventure).then(setCharacters);
  }, [token, setCharacters]);

  return characters;
}
export function Adventure({ token, adventure }: { token: string; adventure: string }) {
  const characters = useCharacters(token, adventure);

  const select = (cul: any) => {
    setSelected(cul);
  };

  const [selected, setSelected] = useState(undefined);

  return (
    <div>
      <div>Character selection</div>
      <div className="flex bg-slate-50">
        <Link to="charactercreation" className="rounded-md bg-gray-100 m-1.5 h-48 w-32 flex p-0">
          <div className="m-auto text-3xl font-black"> + </div>
        </Link>
        {characters.map((character) => (
          <div className="rounded-md bg-slate-200 m-1.5 h-48 flex-column">
            <div>Avatar</div>
            <h1 className="text-xl text-primary">{character.name}</h1>
            <h2>{character.owner}</h2>
            <h3>{character.adventure}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
