export function useLogin(onToken: (token: string) => void) {
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
    }
  };
}
