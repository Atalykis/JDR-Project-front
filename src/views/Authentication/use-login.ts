import { gql, useMutation } from '@apollo/client';
import { useMemo } from 'react';

export function useLogin(onToken: (token: string) => void, callback: () => any) {
  return async (username: string, password: string) => {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 200 || response.status === 201) {
      const token = await response.text();
      onToken(token);
      callback();
    }
  };
}

// const LOGIN = gql`
//   mutation UserLogin($username: String!, $password: String!) {
//     login(username: $username, password: $password) {
//       token
//     }
//   }
// `;

// export function useLogin() {
//   const [login] = useMutation(LOGIN);

//   return useMemo(() => login, [login]);
// }
