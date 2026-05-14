import { useState } from 'react';
import { roleApi } from '../../api/roleApi';
import RoleForm from '../../components/role/RoleForm';
import Modal from '../../components/common/Modal';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { navigate } from '../../routes/AppRoutes';
import type { RoleRequest } from '../../types/role.types';

const AddRole = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const submit = async (payload: RoleRequest) => {
    await roleApi.create(payload);
    console.log('Role Created Successfully');
    setShowSuccess(true);
  };

  return (
    <DashboardLayout>
      <section className="page-header">
        <h1>Add Role</h1>
        <button className="btn btn-back" type="button" onClick={() => navigate('/roles')}>
          Back
        </button>
      </section>
      <RoleForm onSubmit={submit} />
      <Modal
        open={showSuccess}
        title="Role Added Successfully"
        onClose={() => navigate('/roles')}
      >
        <p className="modal-message">The role record has been saved.</p>
      </Modal>
    </DashboardLayout>
  );
};

export default AddRole;
