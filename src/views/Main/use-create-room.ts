export function useCreateRoom(token: string) {
  return async (name: string, adventure: string) => {
    const response: any = await fetch('http://localhost:3000/room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ name: name, adventure: adventure }),
    });
    const room = await response.text();
    console.log(room);
  };
}
