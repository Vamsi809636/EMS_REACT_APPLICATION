import { useCallback, useEffect, useState } from 'react';
import { departmentApi } from '../api/departmentApi';
import type { Department } from '../types/department.types';

export const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);

  const loadDepartments = useCallback(async () => {
    setLoading(true);
    try {
      setDepartments(await departmentApi.getAll());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDepartments();
  }, [loadDepartments]);

  return { departments, loading, loadDepartments };
};
