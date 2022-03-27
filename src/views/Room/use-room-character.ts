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

export function useRoomCharacters(token: string, room: string) {
  const [characters, setCharacters] = useState([{ name: '', owner: '', adventure: '', description: '' }]);
  getRoomCharacters(token, room).then(setCharacters);

  return characters;
}
