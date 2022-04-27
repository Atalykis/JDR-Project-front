import { gql, useMutation } from '@apollo/client';
import { useMemo } from 'react';

const ADD_CHARACTER = gql`
  mutation AddCharacter($room: String!, $character: CharacterInput!) {
    addCharacter(room: $room, character: $character) {
      name
      characters {
        name
      }
    }
  }
`;

export function useAddCharacter() {
  const [addCharacter] = useMutation(ADD_CHARACTER);

  return useMemo(() => addCharacter, [addCharacter]);
}
