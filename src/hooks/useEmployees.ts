import { useCallback, useEffect, useState } from 'react';
import { employeeApi } from '../api/employeeApi';
import type { Employee } from '../types/employee.types';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const page = await employeeApi.getAll();
      setEmployees(page.content ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadEmployees();
  }, [loadEmployees]);

  return { employees, loading, loadEmployees };
};
