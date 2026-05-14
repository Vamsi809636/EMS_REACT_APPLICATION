import { apiRequest } from './axiosConfig';
import type { Employee } from '../types/employee.types';
import type { AssignEmployeeRequest, Project, ProjectRequest, ProjectStatus } from '../types/project.types';

export const projectApi = {
  getAllProjects: (status?: ProjectStatus | '') =>
    apiRequest<Project[]>(status ? `/projects?status=${status}` : '/projects'),
  getProjectByName: async (name: string) => {
    const projects = await projectApi.getAllProjects();
    const project = projects.find(
      (item) => item.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (!project) {
      throw new Error('No project found with that name');
    }

    return project;
  },
  deleteProjectByName: async (name: string) => {
    const project = await projectApi.getProjectByName(name);
    return apiRequest<void>(`/projects/${project.id}`, { method: 'DELETE' });
  },
  getAll: (status?: ProjectStatus | '') => projectApi.getAllProjects(status),
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

