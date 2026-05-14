import { useState } from 'react';
import { projectApi } from '../../api/projectApi';
import ProjectForm from '../../components/project/ProjectForm';
import Modal from '../../components/common/Modal';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { navigate } from '../../routes/AppRoutes';
import type { ProjectRequest } from '../../types/project.types';

const AddProject = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const submit = async (payload: ProjectRequest) => {
    await projectApi.create(payload);
    console.log('Project Created Successfully');
    setShowSuccess(true);
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
      <Modal
        open={showSuccess}
        title="Project Added Successfully"
        onClose={() => navigate('/projects')}
      >
        <p className="modal-message">The project record has been saved.</p>
      </Modal>
    </DashboardLayout>
  );
};

export default AddProject;
