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

export function useRoomCharacters(token: string, room: string) {
  return useQuery(CHARACTERS_INFOS, {
    variables: { name: room },
    context: {
      headers: {
        Authorization: token,
      },
    },
  });
}
