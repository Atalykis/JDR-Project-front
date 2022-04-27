import { gql, useMutation } from '@apollo/client';
import { useMemo } from 'react';

export function useRegister(onToken: (token: string) => void, callback: () => any) {
  return async (username: string, password: string) => {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 201) {
      const token = await response.text();
      onToken(token);
      callback();
    }
  };
}

// const REGISTER = gql`
//   mutation UserRegistration($username: String!, $password: String!) {
//     register(username: $username, password: $password) {
//       username
//     }
//   }
// `;

// export function useRegister() {
//   const [register] = useMutation(REGISTER);

//   return useMemo(() => register, [register]);
// }
