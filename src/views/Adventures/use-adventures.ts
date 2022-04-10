import { gql, useQuery } from '@apollo/client';

const GET_ADVENTURES = gql`
  query GetAdventures {
    adventures {
      name
      gm
    }
  }
`;

export function useAdventures(token: string) {
  return useQuery(GET_ADVENTURES, {
    variables: {},
    context: {
      headers: {
        Authorization: token,
      },
    },
  });
}
