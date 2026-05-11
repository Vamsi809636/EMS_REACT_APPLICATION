import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';
import { authApi } from '../api/authApi';
import { tokenManager } from '../utils/tokenManager';

interface AuthContextValue {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(tokenManager.getToken());
  const [username, setUsername] = useState(tokenManager.getUsername());

  const login = useCallback(async (usernameValue: string, password: string) => {
    const response = await authApi.login({ username: usernameValue, password });
    tokenManager.setSession(response.token, response.username);
    setToken(response.token);
    setUsername(response.username);
  }, []);

  const logout = useCallback(() => {
    tokenManager.clearSession();
    setToken(null);
    setUsername(null);
    window.history.pushState({}, '', '/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      username,
      login,
      logout,
    }),
    [login, logout, token, username],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
