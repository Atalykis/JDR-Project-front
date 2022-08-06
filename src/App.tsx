import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Adventure } from './views/Adventure';
import { useCharacters } from './views/Adventure/hooks/use-characters';
import { Adventures } from './views/Adventures';
import { Authentication } from './views/Authentication';
import { Button } from './views/Basic-component/button';

const AetherallToken =
  '713b4876600c9f3a66746122a80f7689d0263aa4e5e926b8b7f79de8434dcc06b299236075ec3a6b1bb3ca1e0371051bcbedeb2545fa3c00ffd0e2b59bb1b301c90c487e1ff001d448a7ca171defb47928dec98f1ea1373a1d5b5087bf8d35e05292a42c9ab90d6f6a';
const AtalykisToken =
  '42c3cd40e754247c254c7d1c46ff22fbcfbffbaf6bb713c8940341ee809053566e6cbb56265945880c5c04e67fffb4c55667235d3911dba4c43ef1f03f16bce0ed445fe8b92d3fdef65df422ef8a29e63128ec6b078a10e932593c7a6f12f00c775c39771efe9d7f';

function QuickAuth({ token, onToken }: { token: string; onToken: (token: string) => void }) {
  const currently = token === AetherallToken ? 'Aetherall' : token === AtalykisToken ? 'Atalykis' : undefined;

  return (
    <div>
      <Button onClick={() => onToken(AtalykisToken)}>Login as Atalykis</Button>
      <Button onClick={() => onToken(AetherallToken)}>Login as Aetherall</Button>
      {currently && <Button onClick={() => onToken('')}>Logout from {currently}</Button>}
    </div>
  );
}

export default function App() {
  const [token, setToken] = useState('');
  const [selectedAdventure, setSelectedAdventure] = useState('');


  return (
    <div>
      <Authentication onToken={setToken} />
      <QuickAuth token={token} onToken={setToken} />
      <div>
        <h1>Adventures :</h1>
        <Adventures token={token} onClick={(adventure: string) => setSelectedAdventure(adventure)} />
      </div>
      <div>{selectedAdventure && <Adventure token={token} adventure={selectedAdventure} />}</div>
    </div>
  );
}
