import React from 'react';
interface AdventureCardProps {
  adventure: {
    name: string;
    gm: string;
  };
}

export function AdventureCard({ adventure }: AdventureCardProps) {
  return (
    <div>
      <h2>{adventure.name}</h2>
      <p>Masterized by : {adventure.gm}</p>
    </div>
  );
}
