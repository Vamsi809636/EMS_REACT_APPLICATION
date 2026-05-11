import { apiRequest } from './axiosConfig';
import type { LoginRequest, TokenResponse } from '../types/auth.types';

export const authApi = {
  login: (payload: LoginRequest) =>
    apiRequest<TokenResponse>('/auth/login', {
      method: 'POST',
      body: payload,
    }),
};
