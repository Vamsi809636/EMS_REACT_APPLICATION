import { useEffect, useState } from 'react';
import { projectApi } from '../../api/projectApi';
import ProjectTable from '../../components/project/ProjectTable';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { PROJECT_STATUSES } from '../../utils/constants';
import type { Project, ProjectStatus } from '../../types/project.types';

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<ProjectStatus | ''>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Project[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const load = async () => {
    setLoading(true);
    setProjects(await projectApi.getAllProjects(status));
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, [status]);

  const findProject = async (event: React.FormEvent) => {
    event.preventDefault();
    const query = projectSearch.trim();

    if (!query) {
      setError('Please enter a project name');
      return;
    }

    setError('');
    setSearchLoading(true);
    setHasSearched(true);

    try {
      const project = await projectApi.getProjectByName(query);
      setSearchResults([project]);
      console.log('Project Data Retrieved Successfully');
    } catch (err) {
      setSearchResults([]);
      setError(err instanceof Error ? err.message : 'No project found with that name');
    } finally {
      setSearchLoading(false);
    }
  };

  const clearSearch = () => {
    setProjectSearch('');
    setSearchResults([]);
    setHasSearched(false);
    setError('');
  };

  const remove = async (name: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      await projectApi.deleteProjectByName(name);
      console.log('Project Deleted Successfully');
      await load();
      setSearchResults((current) => current.filter((project) => project.name !== name));
      setShowDeleteSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <DashboardLayout>
      <section className="page-header">
        <div><h1>Projects</h1><p>Track project lifecycle and staffing.</p></div>
        <a className="btn btn-primary btn-add" href="/projects/new">Add Project</a>
      </section>
      <section className="page-tools">
        <label className="field compact-field">
          <span>Status Filter</span>
          <select value={status} onChange={(e) => setStatus(e.target.value as ProjectStatus | '')}>
            <option value="">All</option>
            {PROJECT_STATUSES.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <form className="lookup-panel lookup-panel-single search-panel" onSubmit={findProject}>
          <label className="field">
            <span>Get Project Details</span>
            <input
              value={projectSearch}
              onChange={(event) => setProjectSearch(event.target.value)}
              placeholder="Enter project name"
            />
          </label>
          <div className="lookup-actions">
            <button className="btn btn-primary btn-compact" type="submit" disabled={searchLoading}>
              {searchLoading ? 'Searching...' : 'Get Details'}
            </button>
            <button className="btn btn-secondary btn-compact" type="button" onClick={clearSearch}>
              Clear
            </button>
          </div>
        </form>
      </section>
      {error && <div className="alert">{error}</div>}
      {hasSearched ? (
        <section className="result-panel">
          <h2>Project Details</h2>
          {searchLoading ? <Loader /> : <ProjectTable projects={searchResults} onDelete={remove} />}
        </section>
      ) : loading ? (
        <Loader />
      ) : (
        <ProjectTable projects={projects} onDelete={remove} />
      )}
      <Modal
        open={showDeleteSuccess}
        title="Project Deleted Successfully"
        onClose={() => setShowDeleteSuccess(false)}
      >
        <p className="modal-message">The project record has been removed.</p>
      </Modal>
    </DashboardLayout>
  );
};

export default ProjectsPage;
