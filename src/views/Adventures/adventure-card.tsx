import React from 'react';
interface AdventureCardProps {
  adventure: {
    name: string;
    gm: string;
  };
  onClick: (adventure: string) => void;
}

export function AdventureCard({ adventure, onClick }: AdventureCardProps) {
  return (
    <div className="p-4 border" onClick={() => onClick(adventure.name)}>
      <h2>{adventure.name}</h2>
      <p>Masterized by : {adventure.gm}</p>
    </div>
  );
}
