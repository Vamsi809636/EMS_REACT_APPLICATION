import { useEffect, useState } from 'react';
import { projectApi } from '../../api/projectApi';
import ProjectDetails from '../../components/project/ProjectDetails';
import Loader from '../../components/common/Loader';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { navigate } from '../../routes/AppRoutes';
import type { Project } from '../../types/project.types';

const ViewProject = ({ id }: { id: string }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    setProject(null);
    projectApi
      .getById(id)
      .then((data) => {
        setProject(data);
        console.log('Project Data Retrieved Successfully');
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unable to load project details');
      });
  }, [id]);

  return (
    <DashboardLayout>
      <section className="page-header">
        <div>
          <h1>Project Details</h1>
          <p>Project ID: {id}</p>
        </div>
        <button className="btn btn-back" type="button" onClick={() => navigate('/projects')}>
          Back
        </button>
      </section>
      {error && <div className="alert">{error}</div>}
      {!error && (project ? <ProjectDetails project={project} /> : <Loader />)}
    </DashboardLayout>
  );
};

export default ViewProject;
