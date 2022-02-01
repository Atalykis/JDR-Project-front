import React, { useEffect, useState } from 'react';
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

  return (
    <div>
      <div>Character selection</div>
      <div>
        {characters.map((character) => (
          <div className="w-100 h-100 justify-center items-center bg-slate-100 m-5">
            <h1>{character.name}</h1>
            <h2>{character.owner}</h2>
            <h3>{character.adventure}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
