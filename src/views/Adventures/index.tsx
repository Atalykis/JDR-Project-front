import { gql, useMutation } from '@apollo/client';
import React, { useMemo, useState } from 'react';
import { Button, Input } from '../Authentication';
import { AdventureCard } from './adventure-card';
import { useAdventures } from './use-adventures';

export function Adventures({ token, onClick }: { token: string; onClick: (adventure: string) => void }) {
  const { loading, data } = useAdventures(token);
  const [adventureName, setAdventureName] = useState('');
  const createAdventure = useCreateAdventure();
  const onCreateAdventure = (adventure: string) => {
    createAdventure({
      variables: { name: adventure },
      context: {
        headers: {
          Authorization: token,
        },
      },
    })
  }
  if (loading) {
    return <div>Loading Adventures...</div>;
  }

  if (!data) {
    return <div>No Adventures Found</div>;
  }

  console.log(data);

  return (
    <>
      <div className="flex justify-around border">
        {data.adventures.map((adventure: { name: string; gm: string }) => {
          return <AdventureCard key={adventure.name} adventure={adventure} onClick={onClick} />;
        })}
      <div>
      <h2>Create Adventure</h2>
      <Input id="adventureName" type="text" placeholder="Adventure Name" value={adventureName} onChange={(e) => setAdventureName(e.currentTarget.value)} />
      <Button onClick={() => onCreateAdventure(adventureName)}>Create</Button>
    </div>
      </div>
  </>
  );
}

const CREATE_ADVENTURE = gql`
mutation CreateAdventure($name: String!) {
  createAdventure(name: $name) {
    name
  }
}
`;

function useCreateAdventure() {
  const [createAdventure] = useMutation(CREATE_ADVENTURE);

  return useMemo(() => createAdventure, [createAdventure]);
}