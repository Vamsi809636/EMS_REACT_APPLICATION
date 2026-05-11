export interface Role {
  id: string;
  name: string;
  description?: string;
  level: number;
}

export interface RoleRequest {
  name: string;
  description?: string;
  level: number;
}
