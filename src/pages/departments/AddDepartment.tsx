import { useState } from 'react';
import { departmentApi } from '../../api/departmentApi';
import DepartmentForm from '../../components/department/DepartmentForm';
import Modal from '../../components/common/Modal';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { navigate } from '../../routes/AppRoutes';
import type { DepartmentRequest } from '../../types/department.types';

const AddDepartment = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const submit = async (payload: DepartmentRequest) => {
    await departmentApi.create(payload);
    console.log('Department Created Successfully');
    setShowSuccess(true);
  };

  return (
    <DashboardLayout>
      <section className="page-header">
        <h1>Add Department</h1>
        <button className="btn btn-back" type="button" onClick={() => navigate('/departments')}>
          Back
        </button>
      </section>
      <DepartmentForm onSubmit={submit} />
      <Modal
        open={showSuccess}
        title="Department Added Successfully"
        onClose={() => navigate('/departments')}
      >
        <p className="modal-message">The department record has been saved.</p>
      </Modal>
    </DashboardLayout>
  );
};

export default AddDepartment;
