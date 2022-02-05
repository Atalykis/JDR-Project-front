import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useCreateCharacter(token: string, callback: () => any) {
  return async (name: string, description: string, adventure: string) => {
    const response: any = await fetch('http://localhost:3000/character', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ name: name, description: description, adventure: adventure }),
    });
    const character = await response.text();
    callback();
  };
}

export const CharacterForm = ({ token, adventure }: { token: string; adventure: string }) => {
  const [characterName, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const goToAdventure = () => {
    navigate('/adventure');
  };
  const createCharacter = useCreateCharacter(token, () => goToAdventure());

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-slate-100">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" html-for="characterName">
            Character Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="characterName"
            type="text"
            placeholder="Jojo"
            value={characterName}
            onChange={(event) => setName(event.currentTarget.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" html-for="description">
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            placeholder="TheGreatEscape"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => createCharacter(characterName, description, adventure)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
