import React, { useState } from 'react';
import { Authentication } from './views/Authentication';
import { Adventure } from './views/Adventure';
import { Main } from './views/Main';

export default function App() {
  const [token, setToken] = useState<string | null>(null);

  return !token ? <Authentication onToken={setToken} /> : <Adventure token={token} adventure="TheBizarreAdventure" />;
}

// import React, { useEffect, useState } from 'react';
// import { Authentication } from './views/Authentication';
// import { Adventure } from './views/Adventure';
// import { Main } from './views/Main';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { CreateCharacter } from './views/Adventure/create-character';
// import { useNavigate } from 'react-router-dom';

// export default function Rooter() {
//   const [token, setToken] = useState<string | null>(null);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Custom token={token} />}></Route>
//         <Route path="/authentication" element={<Authentication onToken={setToken} />} />
//         <Route path="/adventure" element={<Adventure token={token!} adventure={'TheBizarreAdventure'} />} />
//         <Route path="/charactercreation" element={<CreateCharacter />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// const Custom = ({ token }: { token: string | null }) => {
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!token) {
//       navigate('/authentication');
//     }
//     navigate('/adventure');
//   }, []);

//   return <div>SA MERE LA TCHOIN</div>;
// };
