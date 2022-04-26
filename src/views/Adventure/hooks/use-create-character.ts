import { gql, useMutation } from '@apollo/client';
import { useMemo } from 'react';

const CREATE_CHARACTER = gql`
  mutation CreateCharacter($name: String!, $adventure: String!, $description: String!) {
    createCharacter(name: $name, adventure: $adventure, description: $description) {
      name
      owner
      adventure
      description
    }
  }
`;
export function useCreateCharacter() {
  const [createCharacter] = useMutation(CREATE_CHARACTER);

  return useMemo(() => createCharacter, [createCharacter]);
}
