import { useEffect, useState } from 'react';
import { projectApi } from '../../api/projectApi';
import ProjectForm from '../../components/project/ProjectForm';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { navigate } from '../../routes/AppRoutes';
import type { Project, ProjectRequest } from '../../types/project.types';

const EditProject = ({ id }: { id: string }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    projectApi.getById(id).then(setProject);
  }, [id]);

  const submit = async (payload: ProjectRequest) => {
    await projectApi.update(id, payload);
    console.log('Project Data Updated Successfully');
    setShowSuccess(true);
  };

  return (
    <DashboardLayout>
      <section className="page-header">
        <h1>Edit Project</h1>
        <button className="btn btn-back" type="button" onClick={() => navigate('/projects')}>
          Back
        </button>
      </section>
      {project ? <ProjectForm initialValue={project} onSubmit={submit} /> : <Loader />}
      <Modal
        open={showSuccess}
        title="Project details updated successfully"
        onClose={() => navigate('/projects')}
      >
        <p className="modal-message">The project record has been updated.</p>
      </Modal>
    </DashboardLayout>
  );
};

export default EditProject;
