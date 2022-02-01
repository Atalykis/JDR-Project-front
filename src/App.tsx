import React, { useState } from 'react';
import { Authentication } from './views/Authentication';
import { Adventure } from './views/Adventure';
import { Main } from './views/Main';

export default function App() {
  const [token, setToken] = useState<string | null>(null);

  return !token ? <Authentication onToken={setToken} /> : <Adventure token={token} adventure="TheBizarreAdventure" />;
}
