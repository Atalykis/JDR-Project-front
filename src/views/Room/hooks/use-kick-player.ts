import { gql, useMutation } from '@apollo/client';
import { useMemo } from 'react';

const KICK_PLAYER = gql`
  mutation KickPlayer($room: String!, $player: String!) {
    kickPlayer(room: $room, player: $player) {
      name
      members
    }
  }
`;
export function useKickPlayer() {
  const [kickPlayer] = useMutation(KICK_PLAYER);

  return useMemo(() => kickPlayer, [kickPlayer]);
}
