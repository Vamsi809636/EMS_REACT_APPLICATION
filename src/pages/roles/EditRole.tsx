import { useEffect, useState } from 'react';
import { roleApi } from '../../api/roleApi';
import RoleForm from '../../components/role/RoleForm';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { navigate } from '../../routes/AppRoutes';
import type { Role, RoleRequest } from '../../types/role.types';

const EditRole = ({ id }: { id: string }) => {
  const [role, setRole] = useState<Role | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    roleApi.getById(id).then(setRole);
  }, [id]);

  const submit = async (payload: RoleRequest) => {
    await roleApi.update(id, payload);
    console.log('Role Data Updated Successfully');
    setShowSuccess(true);
  };

  return (
    <DashboardLayout>
      <section className="page-header">
        <h1>Edit Role</h1>
        <button className="btn btn-back" type="button" onClick={() => navigate('/roles')}>
          Back
        </button>
      </section>
      {role ? <RoleForm initialValue={role} onSubmit={submit} /> : <Loader />}
      <Modal
        open={showSuccess}
        title="Role details updated successfully"
        onClose={() => navigate('/roles')}
      >
        <p className="modal-message">The role record has been updated.</p>
      </Modal>
    </DashboardLayout>
  );
};

export default EditRole;
