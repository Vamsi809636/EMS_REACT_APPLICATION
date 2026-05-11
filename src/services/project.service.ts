import { projectApi } from '../api/projectApi';
import type {
  AssignEmployeeRequest,
  ProjectRequest,
  ProjectStatus,
} from '../types/project.types';

export const projectService = {
  getProjects: (status?: ProjectStatus | '') => projectApi.getAll(status),

  getProjectById: (id: string) => {
    if (!id.trim()) {
      throw new Error('Project ID is required');
    }

    return projectApi.getById(id.trim());
  },

  createProject: (data: ProjectRequest) => {
    const payload = normalizeProject(data);
    validateProject(payload);

    return projectApi.create(payload);
  },

  updateProject: (id: string, data: ProjectRequest) => {
    if (!id.trim()) {
      throw new Error('Project ID is required');
    }

    const payload = normalizeProject(data);
    validateProject(payload);

    return projectApi.update(id.trim(), payload);
  },

  deleteProject: (id: string) => {
    if (!id.trim()) {
      throw new Error('Project ID is required');
    }

    return projectApi.remove(id.trim());
  },

  assignEmployee: (projectId: string, data: AssignEmployeeRequest) => {
    if (!projectId.trim()) {
      throw new Error('Project ID is required');
    }

    const payload = {
      employeeId: data.employeeId.trim(),
      projectRole: data.projectRole.trim(),
      assignedDate: data.assignedDate || undefined,
    };

    if (!payload.employeeId) {
      throw new Error('Employee ID is required');
    }

    if (!payload.projectRole) {
      throw new Error('Project role is required');
    }

    return projectApi.assignEmployee(projectId.trim(), payload);
  },

  removeEmployee: (projectId: string, employeeId: string) => {
    if (!projectId.trim() || !employeeId.trim()) {
      throw new Error('Project ID and Employee ID are required');
    }

    return projectApi.removeEmployee(projectId.trim(), employeeId.trim());
  },

  getProjectEmployees: (projectId: string) => {
    if (!projectId.trim()) {
      throw new Error('Project ID is required');
    }

    return projectApi.getEmployees(projectId.trim());
  },

  getEmployeeProjects: (employeeId: string) => {
    if (!employeeId.trim()) {
      throw new Error('Employee ID is required');
    }

    return projectApi.getEmployeeProjects(employeeId.trim());
  },
};

const normalizeProject = (data: ProjectRequest): ProjectRequest => ({
  name: data.name.trim(),
  description: data.description?.trim() || undefined,
  startDate: data.startDate,
  endDate: data.endDate || undefined,
  status: data.status,
});

const validateProject = (data: ProjectRequest) => {
  if (!data.name) {
    throw new Error('Project name is required');
  }

  if (!data.startDate) {
    throw new Error('Start date is required');
  }

  if (!data.status) {
    throw new Error('Project status is required');
  }

  if (data.endDate && data.endDate < data.startDate) {
    throw new Error('End date must be after start date');
  }
};
