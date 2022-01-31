import React, { useState } from 'react';
import { Authentication } from './views/Authentication';
import { MainPage } from './views/main-page';

export default function App() {
  const [token, setToken] = useState<string | null>(null);

  return !token ? <Authentication onToken={setToken} /> : <MainPage token={token} />;
}
