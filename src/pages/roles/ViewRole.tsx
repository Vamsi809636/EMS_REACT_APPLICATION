import { useEffect, useState } from 'react';
import { roleApi } from '../../api/roleApi';
import RoleDetails from '../../components/role/RoleDetails';
import Loader from '../../components/common/Loader';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { navigate } from '../../routes/AppRoutes';
import type { Role } from '../../types/role.types';

const ViewRole = ({ id }: { id: string }) => {
  const [role, setRole] = useState<Role | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    setRole(null);
    roleApi
      .getById(id)
      .then((data) => {
        setRole(data);
        console.log('Role Data Retrieved Successfully');
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unable to load role details');
      });
  }, [id]);

  return (
    <DashboardLayout>
      <section className="page-header">
        <div>
          <h1>Role Details</h1>
          <p>Role ID: {id}</p>
        </div>
        <button className="btn btn-back" type="button" onClick={() => navigate('/roles')}>
          Back
        </button>
      </section>
      {error && <div className="alert">{error}</div>}
      {!error && (role ? <RoleDetails role={role} /> : <Loader />)}
    </DashboardLayout>
  );
};

export default ViewRole;
