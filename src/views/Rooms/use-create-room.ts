import { gql, useMutation } from '@apollo/client';
import { useMemo } from 'react';

const CREATE_ROOM = gql`
  mutation CreateRoom($name: String!, $adventure: String!) {
    createRoom(name: $name, adventure: $adventure) {
      name
      adventure
    }
  }
`;
export function useCreateRoom() {
  const [createRoom] = useMutation(CREATE_ROOM);

  return useMemo(() => createRoom, [createRoom]);
}
