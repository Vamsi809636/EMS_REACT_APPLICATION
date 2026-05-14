import { apiRequest } from './axiosConfig';
import type { Role, RoleRequest } from '../types/role.types';

export const roleApi = {
  getAllRoles: () => apiRequest<Role[]>('/roles'),
  getRoleByName: async (name: string) => {
    const roles = await roleApi.getAllRoles();
    const role = roles.find(
      (item) => item.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (!role) {
      throw new Error('No role found with that name');
    }

    return role;
  },
  deleteRoleByName: async (name: string) => {
    const role = await roleApi.getRoleByName(name);
    return apiRequest<void>(`/roles/${role.id}`, { method: 'DELETE' });
  },
  getAll: () => roleApi.getAllRoles(),
  getById: (id: string) => apiRequest<Role>(`/roles/${id}`),
  create: (payload: RoleRequest) => apiRequest<Role>('/roles', { method: 'POST', body: payload }),
  update: (id: string, payload: RoleRequest) =>
    apiRequest<Role>(`/roles/${id}`, { method: 'PUT', body: payload }),
  remove: (id: string) => apiRequest<void>(`/roles/${id}`, { method: 'DELETE' }),
};
