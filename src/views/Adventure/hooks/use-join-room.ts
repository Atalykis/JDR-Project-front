import { gql, useMutation } from '@apollo/client';
import React, { useMemo } from 'react';

const JOIN_ROOM = gql`
  mutation JoinRoom($room: String!) {
    joinRoom(room: $room) {
      name
      members
    }
  }
`;
export function useJoinRoom() {
  const [joinRoom] = useMutation(JOIN_ROOM);

  return useMemo(() => joinRoom, [joinRoom]);
}
