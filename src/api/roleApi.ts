import { apiRequest } from './axiosConfig';
import type { Role, RoleRequest } from '../types/role.types';

export const roleApi = {
  getAll: () => apiRequest<Role[]>('/roles'),
  getById: (id: string) => apiRequest<Role>(`/roles/${id}`),
  create: (payload: RoleRequest) => apiRequest<Role>('/roles', { method: 'POST', body: payload }),
  update: (id: string, payload: RoleRequest) =>
    apiRequest<Role>(`/roles/${id}`, { method: 'PUT', body: payload }),
  remove: (id: string) => apiRequest<void>(`/roles/${id}`, { method: 'DELETE' }),
};
