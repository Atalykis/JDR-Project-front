import { gql, useMutation } from '@apollo/client';
import { useMemo } from 'react';

const LEAVE_ROOM = gql`
  mutation LeaveRoom($room: String!) {
    leaveRoom(room: $room) {
      name
      members
    }
  }
`;
export function useLeaveRoom() {
  const [leaveRoom] = useMutation(LEAVE_ROOM);

  return useMemo(() => leaveRoom, [leaveRoom]);
}
