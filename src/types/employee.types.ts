export type EmployeeStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE' | 'TERMINATED';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  salary?: number;
  hireDate: string;
  status: EmployeeStatus;
  departmentId?: string;
  departmentName?: string;
  roleId?: string;
  roleName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmployeeRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  salary: number;
  hireDate: string;
  status: EmployeeStatus;
  departmentId: string;
  roleId: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
