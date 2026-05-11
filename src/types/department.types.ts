export interface Department {
  id: string;
  name: string;
  description?: string;
}

export interface DepartmentRequest {
  name: string;
  description?: string;
}
