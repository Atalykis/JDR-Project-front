import { useEffect, useState } from 'react';

async function getUserInfo(token: string) {
  const response: any = await fetch('http://localhost:3000/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  return response.json();
}

export function useUserInfo(token: string) {
  const [userInfo, setUserInfo] = useState({ name: '' });

  useEffect(() => {
    getUserInfo(token).then(setUserInfo);
  }, [token, setUserInfo]);

  return userInfo;
}
