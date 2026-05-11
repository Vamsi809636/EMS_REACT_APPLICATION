const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';

export const tokenManager = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  getUsername: () => localStorage.getItem(USERNAME_KEY),
  setSession: (token: string, username: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, username);
    window.dispatchEvent(new Event('auth-change'));
  },
  clearSession: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('authToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem(USERNAME_KEY);
    window.dispatchEvent(new Event('auth-change'));
  },
};
