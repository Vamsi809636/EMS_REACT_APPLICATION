import { apiRequest } from './axiosConfig';
import type { Employee, EmployeeRequest, PageResponse } from '../types/employee.types';


export const employeeApi = {
  getAllEmployees: (page = 0, size = 25) =>
    apiRequest<PageResponse<Employee>>(`/employees?page=${page}&size=${size}&sort=lastName,asc`),
  getEmployeeByName: async (name: string) => {
  const encodedName = encodeURIComponent(name.trim());

  const data = await apiRequest<Employee[]>(
    `/employees/search?name=${encodedName}`
  );

  return data;
},
  getEmployeeById: (id: string) => apiRequest<Employee>(`/employees/${id}`),
  
  deleteById: (id: string) => apiRequest<void>(`/employees/${id}`, { method: 'DELETE' }),
  getAll: (page = 0, size = 25) => employeeApi.getAllEmployees(page, size),
  search: (name: string) => employeeApi.getEmployeeByName(name),
  getByDepartment: (departmentId: string) =>
    apiRequest<Employee[]>(`/employees/department/${departmentId}`),
  getById: (id: string) => employeeApi.getEmployeeById(id),
  create: (payload: EmployeeRequest) =>
    apiRequest<Employee>('/employees', { method: 'POST', body: payload }),
  update: (id: string, payload: EmployeeRequest) =>
    apiRequest<Employee>(`/employees/${id}`, { method: 'PUT', body: payload }),
  remove: (id: string) => employeeApi.deleteById(id),
};
