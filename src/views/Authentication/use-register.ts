export function useRegister(onToken: (token: string) => void) {
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
    }
  };
}
