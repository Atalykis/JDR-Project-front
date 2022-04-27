import { gql, useMutation } from '@apollo/client';
import React, { useMemo } from 'react';

const CREATE_ADVENTURE = gql`
  mutation CreateAdventure($name: String!) {
    createAdventure(name: $name) {
      name
    }
  }
`;

export function useCreateAdventure() {
  const [createAdventure] = useMutation(CREATE_ADVENTURE);

  return useMemo(() => createAdventure, [createAdventure]);
}
