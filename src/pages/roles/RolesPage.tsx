import { useEffect, useState } from 'react';
import { roleApi } from '../../api/roleApi';
import RoleTable from '../../components/role/RoleTable';
import Loader from '../../components/common/Loader';
import DashboardLayout from '../../components/layout/DashboardLayout';
import type { Role } from '../../types/role.types';

const RolesPage = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setRoles(await roleApi.getAll());
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm('Delete this role?')) return;
    try {
      await roleApi.remove(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <DashboardLayout>
      <section className="page-header">
        <div><h1>Roles</h1><p>Manage designations and seniority levels.</p></div>
        <a className="btn btn-primary" href="/roles/new">Add Role</a>
      </section>
      {error && <div className="alert">{error}</div>}
      {loading ? <Loader /> : <RoleTable roles={roles} onDelete={remove} />}
    </DashboardLayout>
  );
};

export default RolesPage;
