import React, { useState } from 'react';
import { Button, Input } from '../Authentication';
import { useCreateCharacter } from './hooks/use-create-character';

export const CharacterForm = ({ token, adventure }: { token: string; adventure: string }) => {
  const [characterName, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const createCharacter = useCreateCharacter();

  const onCreateCharacter = (character: string, description: string) => {
    createCharacter({
      variables: { name: character, description, adventure },
      context: {
        headers: {
          Authorization: token,
        },
      },
    })
  }

  return (
    <div className="border">
    <h2>Create Character</h2>
    <Input id="characterName" type="text" placeholder="Character Name" value={characterName} onChange={(e) => setName(e.currentTarget.value)} />
    <Input id="characterDescription" type="text" placeholder="Character Description" value={description} onChange={(e) => setDescription(e.currentTarget.value)} />
    <Button onClick={() => onCreateCharacter(characterName, description)}>Create</Button>
  </div>
    );
  };

  // <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-slate-100">
  //   <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  //     <div className="mb-4">
  //       <label className="block text-gray-700 text-sm font-bold mb-2" html-for="characterName">
  //         Character Name
  //       </label>
  //       <input
  //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  //         id="characterName"
  //         type="text"
  //         placeholder="Jojo"
  //         value={characterName}
  //         onChange={(event) => setName(event.currentTarget.value)}
  //       />
  //     </div>
  //     <div className="mb-6">
  //       <label className="block text-gray-700 text-sm font-bold mb-2" html-for="description">
  //         Description
  //       </label>
  //       <input
  //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
  //         id="description"
  //         type="text"
  //         placeholder="TheGreatEscape"
  //         value={description}
  //         onChange={(event) => setDescription(event.currentTarget.value)}
  //       />
  //     </div>
  //     <div className="flex items-center justify-between">
  //       <button
  //         onClick={() => createCharacter(characterName, description, adventure)}
  //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  //         type="button"
  //       >
  //         Create
  //       </button>
  //     </div>
  //   </form>
  // </div>