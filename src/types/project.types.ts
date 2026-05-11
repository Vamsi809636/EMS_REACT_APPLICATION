export type ProjectStatus = 'PLANNED' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';

export interface Project {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  status: ProjectStatus;
}

export interface ProjectRequest {
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  status: ProjectStatus;
}

export interface AssignEmployeeRequest {
  employeeId: string;
  projectRole: string;
  assignedDate?: string;
}
