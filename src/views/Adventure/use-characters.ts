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

export function useCharacters(token: string, adventure: string) {
  const [characters, setCharacters] = useState([{ name: '', owner: '', adventure: '', description: '' }]);

  useEffect(() => {
    getCharacters(token, adventure).then(setCharacters);
  }, [token, setCharacters]);

  return characters;
}
