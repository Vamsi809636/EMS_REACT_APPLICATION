
export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface User {
    username: string;
    role: 'ADMIN' | 'USER';
    exp?: number;
}

// Auth context state
export interface AuthState {
    token: string | null;
    user: User | null;
}

export interface TokenResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  username: string;
}
