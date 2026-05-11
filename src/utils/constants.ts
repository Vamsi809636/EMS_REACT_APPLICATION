export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1';

export const EMPLOYEE_STATUSES = ['ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED'] as const;

export const PROJECT_STATUSES = ['PLANNED', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'CANCELLED'] as const;
