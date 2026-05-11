import { apiRequest } from './axiosConfig';
import type { Department, DepartmentRequest } from '../types/department.types';

export const departmentApi = {
  getAll: () => apiRequest<Department[]>('/departments'),
  getByName: (name: string) =>
  apiRequest<Department>(`/departments/name/${name}`),
  create: (payload: DepartmentRequest) =>
    apiRequest<Department>('/departments', { method: 'POST', body: payload }),
  update: (id: string, payload: DepartmentRequest) =>
    apiRequest<Department>(`/departments/${id}`, { method: 'PUT', body: payload }),
  remove: (id: string) => apiRequest<void>(`/departments/${id}`, { method: 'DELETE' }),
};
