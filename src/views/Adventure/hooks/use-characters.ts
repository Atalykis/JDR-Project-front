import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';

const GET_CHARACTERS = gql`
  query GetOwnedCharacters($adventure: String!) {
    characters(adventure: $adventure) {
      name
      owner
      adventure
      description
    }
  }
`;

export function useCharacters(token: string, adventure: string) {
  return useQuery(GET_CHARACTERS, {
    variables: { adventure },
    context: {
      headers: {
        Authorization: token,
      },
    },
  });
}
