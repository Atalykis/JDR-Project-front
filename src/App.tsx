import React, { useState } from 'react';
import { Authentication } from './views/Authentication';
import { Adventure } from './views/Adventure';
import { CharacterForm } from './views/Adventure/character-form';
import { Main } from './views/Main';
import { Route, Routes } from 'react-router-dom';
import { Room } from './views/Room';

export default function App() {
  const [token, setToken] = useState<string | null>(null);

  return (
    <div>
      <Routes>
        <Route path="/authentication" element={<Authentication onToken={setToken} />}></Route>
        <Route path="/adventure" element={<Adventure token={token!} adventure="TheBizarreAdventure" />}></Route>
        <Route path="/room" element={<Room token={token!} room="TheBizarreRoom"></Room>}></Route>
        <Route path="/character-creation" element={<CharacterForm token={token!} adventure="TheBizarreAdventure" />}></Route>
        <Route path="/" element={<Authentication onToken={setToken} />}></Route>
      </Routes>
    </div>
  );
}
