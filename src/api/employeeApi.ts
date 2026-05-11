import { apiRequest } from './axiosConfig';
import type { Employee, EmployeeRequest, PageResponse } from '../types/employee.types';

export const employeeApi = {
  getAll: (page = 0, size = 25) =>
    apiRequest<PageResponse<Employee>>(`/employees?page=${page}&size=${size}&sort=lastName,asc`),
  search: (name: string) => apiRequest<Employee[]>(`/employees/search?name=${encodeURIComponent(name)}`),
  getByDepartment: (departmentId: string) =>
    apiRequest<Employee[]>(`/employees/department/${departmentId}`),
  getById: (id: string) => apiRequest<Employee>(`/employees/${id}`),
  create: (payload: EmployeeRequest) =>
    apiRequest<Employee>('/employees', { method: 'POST', body: payload }),
  update: (id: string, payload: EmployeeRequest) =>
    apiRequest<Employee>(`/employees/${id}`, { method: 'PUT', body: payload }),
  remove: (id: string) => apiRequest<void>(`/employees/${id}`, { method: 'DELETE' }),
};
