import { gql, useQuery } from '@apollo/client';
import { stringifyForDisplay } from '@apollo/client/utilities';
import React, { useEffect, useState } from 'react';

const CHARACTERS_INFOS = gql`
  query GetRoomCharacters($name: String!) {
    room(name: $name) {
      characters {
        name
        owner
        adventure
        description
      }
    }
  }
`;

async function getRoomCharacters(token: string, name: string) {
  const { loading, error, data } = await useQuery(CHARACTERS_INFOS, {
    variables: { name },
    context: {
      headers: {
        Authorization: token,
      },
    },
  });
  return data.room.characters;
}

function useRoomCharacters(token: string, room: string) {
  const [characters, setCharacters] = useState([{ name: '', owner: '', adventure: '', description: '' }]);
  getRoomCharacters(token, room).then(setCharacters);

  return characters;
}

export function Room({ token, room }: { token: string; room: string }) {
  const characters = useRoomCharacters(token, room);
  return (
    <div>
      <div>
        <h1>Joueurs : </h1>
      </div>
      <div>
        <h1>Personnages</h1>
        {characters.map((character) => (
          <div>
            <h1>{character.name}</h1>
            <p>{character.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
