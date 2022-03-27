export function useJoinRoom(token: string, callback: () => any) {
  return async (room: string, character: { name: string; owner: string; adventure: string }) => {
    const response: any = await fetch('http://localhost:3000/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ room: room, character: character }),
    });
    const joined = await response.text();
    callback();
  };
}
