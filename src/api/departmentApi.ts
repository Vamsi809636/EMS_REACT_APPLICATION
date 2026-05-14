import { apiRequest } from './axiosConfig';
import type { Department, DepartmentRequest } from '../types/department.types';

export const departmentApi = {
  getAllDepartments: () => apiRequest<Department[]>('/departments'),
 
  getDepartmentByName: (name: string) =>
    apiRequest<Department>(`/departments/name/${encodeURIComponent(name)}`),
  deleteDepartmentByName: async (name: string) => {
    const department = await departmentApi.getDepartmentByName(name);
    return apiRequest<void>(`/departments/${department.id}`, { method: 'DELETE' });
  },
  getAll: () => departmentApi.getAllDepartments(),
  getByName: (name: string) => departmentApi.getDepartmentByName(name),
  create: (payload: DepartmentRequest) =>
    apiRequest<Department>('/departments', { method: 'POST', body: payload }),
  update: (id: string, payload: DepartmentRequest) =>
    apiRequest<Department>(`/departments/${id}`, { method: 'PUT', body: payload }),
  remove: (id: string) => apiRequest<void>(`/departments/${id}`, { method: 'DELETE' }),
};
