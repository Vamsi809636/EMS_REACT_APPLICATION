import { projectApi } from '../../api/projectApi';
import ProjectForm from '../../components/project/ProjectForm';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { navigate } from '../../routes/AppRoutes';
import type { ProjectRequest } from '../../types/project.types';

const AddProject = () => {
  const submit = async (payload: ProjectRequest) => {
    await projectApi.create(payload);
    navigate('/projects');
  };

  return (
    <DashboardLayout>
      <section className="page-header">
        <h1>Add Project</h1>
        <button className="btn btn-back" type="button" onClick={() => navigate('/projects')}>
          Back
        </button>
      </section>
      <ProjectForm onSubmit={submit} />
    </DashboardLayout>
  );
};

export default AddProject;
