import { departmentApi } from '../api/departmentApi';
import type { DepartmentRequest } from '../types/department.types';

export const departmentService = {
  getDepartments: () => departmentApi.getAllDepartments(),


  createDepartment: (data: DepartmentRequest) => {
    const payload = {
      name: data.name.trim(),
      description: data.description?.trim() || undefined,
    };

    if (!payload.name) {
      throw new Error('Department name is required');
    }

    return departmentApi.create(payload);
  },

  updateDepartment: (id: string, data: DepartmentRequest) => {
    if (!id.trim()) {
      throw new Error('Department ID is required');
    }

    return departmentApi.update(id.trim(), {
      name: data.name.trim(),
      description: data.description?.trim() || undefined,
    });
  },

  deleteDepartment: (id: string) => {
    if (!id.trim()) {
      throw new Error('Department ID is required');
    }

    return departmentApi.remove(id.trim());
  },
};
