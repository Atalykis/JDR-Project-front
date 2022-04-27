import React, { useMemo, useState } from 'react';
import { AdventureCard } from './adventure-card';
import { AdventureForm } from './adventure-form';
import { useAdventures } from './hooks/use-adventures';

export function Adventures({ token, onClick }: { token: string; onClick: (adventure: string) => void }) {
  const { loading, data } = useAdventures(token);

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
      <AdventureForm token={token} />
      </div>
  </>
  );
}

