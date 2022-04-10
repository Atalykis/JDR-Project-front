import React from 'react';
import { AdventureCard } from './adventure-card';
import { useAdventures } from './use-adventures';

export function Adventures({ token }: { token: string }) {
  const { loading, data } = useAdventures(token);
  if (loading) {
    return <div>Loading Adventures...</div>;
  }

  if (!data) {
    return <div>No Adventures Found</div>;
  }

  console.log(data);

  return (
    <div className="flex justify-around">
      {data.adventures.map((adventure: { name: string; gm: string }) => {
        return <AdventureCard key={adventure.name} adventure={adventure} />;
      })}
    </div>
  );
}
