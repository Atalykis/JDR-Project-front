import React, { useState, useEffect } from 'react';

import { useRegister } from './use-register';
import { useLogin } from './use-login';
import { useNavigate } from 'react-router-dom';
import { Input } from '../Basic-component/input';
import { Button } from '../Basic-component/button';


export function Authentication({ onToken }: { onToken: (token: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const register = useRegister(onToken, () => {});
  const login = useLogin(onToken, () => {});

  // const goToAdventure = () => {
  //   navigate('/adventure');
  // };

  return (
    <div>
      <form className="flex">
        <Input id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
        <Input id="password" type="password" placeholder="***" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
        <Button onClick={() => register(username, password)}>Register</Button>
        <Button onClick={() => login(username, password)}>Login</Button>
      </form>
    </div>
  );
}

// <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-slate-100">
//   <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//     <div className="mb-4">
//       <label className="block text-gray-700 text-sm font-bold mb-2" html-for="username">
//         Username
//       </label>
//       <input
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         id="username"
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(event) => setUsername(event.currentTarget.value)}
//       />
//     </div>
//     <div className="mb-6">
//       <label className="block text-gray-700 text-sm font-bold mb-2" html-for="password">
//         Password
//       </label>
//       <input
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//         id="password"
//         type="password"
//         placeholder="******************"
//         value={password}
//         onChange={(event) => setPassword(event.currentTarget.value)}
//       />
//     </div>
//     <div className="flex items-center justify-between">
//       <button
//         onClick={() => register(username, password)}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         type="button"
//       >
//         Register
//       </button>
//       <button
//         onClick={() => login(username, password)}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         type="button"
//       >
//         Login
//       </button>
//     </div>
//   </form>
// </div>
