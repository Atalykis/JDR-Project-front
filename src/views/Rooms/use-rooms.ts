import { gql, useQuery } from '@apollo/client';

const GET_ADVENTURE_ROOMS = gql`
  query GetAdventureRooms($adventure: String!) {
    rooms(adventure: $adventure) {
      name
      gm
      adventure
    }
  }
`;

export function useRooms(token: string, adventure: string) {
  return useQuery(GET_ADVENTURE_ROOMS, {
    variables: { adventure: adventure },
    context: {
      headers: {
        Authorization: token,
      },
    },
  });
}
