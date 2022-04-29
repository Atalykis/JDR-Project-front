// import React, { useState, useEffect } from 'react';
// import { Authentication } from './views/Authentication';
// import { Adventure } from './views/Adventure';
// import { CharacterForm } from './views/Adventure/character-form';
// import { Main } from './views/Main';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import { Room } from './views/Room';
// import { DrawingBoard } from './views/Board';

// const AetherallToken =
//   '713b4876600c9f3a66746122a80f7689d0263aa4e5e926b8b7f79de8434dcc06b299236075ec3a6b1bb3ca1e0371051bcbedeb2545fa3c00ffd0e2b59bb1b301c90c487e1ff001d448a7ca171defb47928dec98f1ea1373a1d5b5087bf8d35e05292a42c9ab90d6f6a';
// const AtalykisToken =
//   '9ceae0f5ee7bdbd23c830713e7ab0086a64ffc8555ff4acfb03c6b44221b875886606524f38cfda83c39d19128153407bcdfc45ad6693e00c30aa0973a36d6943a80456cb33c0589ef3b8bd9d107dfd422540d4b80aaecc7c237ece4d84cf2b238226c0c4d8dd21f';
// export default function App() {
//   // return <Room token={token!} room="TheBizarreRoom"></Room>;
//   const [token, setToken] = useState<string | undefined>(AtalykisToken);
//   if (!token)
//     return (
//       <>
//         <Authentication onToken={setToken} />,
//         <div className="my-5 flex justify-center">
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline"
//             onClick={() => setToken(undefined)}
//           >
//             logout
//           </button>
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             onClick={() => setToken(AetherallToken)}
//           >
//             login as Aetherall
//           </button>
//         </div>
//         ,
//       </>
//     );

//   return (
//     <div>
//       <div className="my-5 flex justify-center">
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline"
//           onClick={() => setToken(undefined)}
//         >
//           logout
//         </button>
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           onClick={() => setToken(AetherallToken)}
//         >
//           login as Aetherall
//         </button>
//       </div>
//       <Routes>
//         {/* <Route path="/authentication" element={<Authentication onToken={setToken} />}></Route> */}
//         <Route path="/adventure" element={<Adventure token={token!} adventure="TheBizarreAdventure" />}></Route>
//         <Route path="/room" element={<Room token={token!} room="TheBizarreRoom"></Room>}></Route>
//         <Route path="/character-creation" element={<CharacterForm token={token!} adventure="TheBizarreAdventure" />}></Route>
//         <Route path="/" element={<Adventure token={token!} adventure="TheBizarreAdventure" />}></Route>
//       </Routes>
//     </div>
//   );
// }
