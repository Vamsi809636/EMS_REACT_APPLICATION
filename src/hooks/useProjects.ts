import { useCallback, useEffect, useState } from 'react';
import { projectApi } from '../api/projectApi';
import type { Project, ProjectStatus } from '../types/project.types';

export const useProjects = (status?: ProjectStatus | '') => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      setProjects(await projectApi.getAll(status));
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  return { projects, loading, loadProjects };
};
