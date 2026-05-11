import { roleApi } from '../../api/roleApi';
import RoleForm from '../../components/role/RoleForm';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { navigate } from '../../routes/AppRoutes';
import type { RoleRequest } from '../../types/role.types';

const AddRole = () => {
  const submit = async (payload: RoleRequest) => {
    await roleApi.create(payload);
    navigate('/roles');
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
    </DashboardLayout>
  );
};

export default AddRole;
