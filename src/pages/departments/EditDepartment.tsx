import { useState } from 'react';
import { departmentApi } from '../../api/departmentApi';
import DepartmentForm from '../../components/department/DepartmentForm';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { navigate } from '../../routes/AppRoutes';
import type { Department, DepartmentRequest } from '../../types/department.types';

const EditDepartment = ({ id }: { id: string }) => {
  const [department] = useState<Department | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  

  const submit = async (payload: DepartmentRequest) => {
    await departmentApi.update(id, payload);
    console.log('Department Data Updated Successfully');
    setShowSuccess(true);
  };

  return (
    <DashboardLayout>
      <section className="page-header">
        <h1>Edit Department</h1>
        <button className="btn btn-back" type="button" onClick={() => navigate('/departments')}>
          Back
        </button>
      </section>
      {department ? <DepartmentForm initialValue={department} onSubmit={submit} /> : <Loader />}
      <Modal
        open={showSuccess}
        title="Department details updated successfully"
        onClose={() => navigate('/departments')}
      >
        <p className="modal-message">The department record has been updated.</p>
      </Modal>
    </DashboardLayout>
  );
};

export default EditDepartment;
