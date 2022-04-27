import { gql, useQuery } from '@apollo/client';
import { stringifyForDisplay } from '@apollo/client/utilities';
import React, { useEffect, useState } from 'react';

const ROOM_INFOS = gql`
  query GetRoomInfo($name: String!) {
    room(name: $name) {
      characters {
        name
        owner
        adventure
        description
      }
      members
    }
  }
`;

export function useRoomInfos(token: string, room: string) {
  return useQuery(ROOM_INFOS, {
    variables: { name: room },
    context: {
      headers: {
        Authorization: token,
      },
    },
  });
}
