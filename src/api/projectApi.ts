import { apiRequest } from './axiosConfig';
import type { Employee } from '../types/employee.types';
import type { AssignEmployeeRequest, Project, ProjectRequest, ProjectStatus } from '../types/project.types';

export const projectApi = {
  getAll: (status?: ProjectStatus | '') =>
    apiRequest<Project[]>(status ? `/projects?status=${status}` : '/projects'),
  getById: (id: string) => apiRequest<Project>(`/projects/${id}`),
  create: (payload: ProjectRequest) =>
    apiRequest<Project>('/projects', { method: 'POST', body: payload }),
  update: (id: string, payload: ProjectRequest) =>
    apiRequest<Project>(`/projects/${id}`, { method: 'PUT', body: payload }),
  remove: (id: string) => apiRequest<void>(`/projects/${id}`, { method: 'DELETE' }),
  assignEmployee: (projectId: string, payload: AssignEmployeeRequest) =>
    apiRequest<void>(`/projects/${projectId}/employees`, { method: 'POST', body: payload }),
  removeEmployee: (projectId: string, employeeId: string) =>
    apiRequest<void>(`/projects/${projectId}/employees/${employeeId}`, { method: 'DELETE' }),
  getEmployees: (projectId: string) => apiRequest<Employee[]>(`/projects/${projectId}/employees`),
  getEmployeeProjects: (employeeId: string) =>
    apiRequest<Project[]>(`/projects/employee/${employeeId}`),
};
