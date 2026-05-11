import { roleApi } from '../api/roleApi';
import type { RoleRequest } from '../types/role.types';

export const roleService = {
  getRoles: () => roleApi.getAll(),

  getRoleById: (id: string) => {
    if (!id.trim()) {
      throw new Error('Role ID is required');
    }

    return roleApi.getById(id);
  },

  createRole: (data: RoleRequest) => {
    const payload = {
      ...data,
      name: data.name.trim().toUpperCase(),
      description: data.description?.trim() || undefined,
      level: Number(data.level),
    };

    if (payload.level < 1 || payload.level > 10) {
      throw new Error('Role level must be between 1 and 10');
    }

    return roleApi.create(payload);
  },

  updateRole: (id: string, data: RoleRequest) => {
    return roleApi.update(id, {
      ...data,
      name: data.name.trim().toUpperCase(),
      description: data.description?.trim() || undefined,
      level: Number(data.level),
    });
  },

  deleteRole: (id: string) => roleApi.remove(id),
};
