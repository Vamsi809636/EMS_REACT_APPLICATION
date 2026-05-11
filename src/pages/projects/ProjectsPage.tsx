import { useEffect, useState } from 'react';
import { projectApi } from '../../api/projectApi';
import ProjectTable from '../../components/project/ProjectTable';
import Loader from '../../components/common/Loader';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { PROJECT_STATUSES } from '../../utils/constants';
import type { Project, ProjectStatus } from '../../types/project.types';

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<ProjectStatus | ''>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setProjects(await projectApi.getAll(status));
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, [status]);

  const remove = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      await projectApi.remove(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <DashboardLayout>
      <section className="page-header">
        <div><h1>Projects</h1><p>Track project lifecycle and staffing.</p></div>
        <a className="btn btn-primary" href="/projects/new">Add Project</a>
      </section>
      <label className="field compact-field">
        <span>Status Filter</span>
        <select value={status} onChange={(e) => setStatus(e.target.value as ProjectStatus | '')}>
          <option value="">All</option>
          {PROJECT_STATUSES.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
      {error && <div className="alert">{error}</div>}
      {loading ? <Loader /> : <ProjectTable projects={projects} onDelete={remove} />}
    </DashboardLayout>
  );
};

export default ProjectsPage;
