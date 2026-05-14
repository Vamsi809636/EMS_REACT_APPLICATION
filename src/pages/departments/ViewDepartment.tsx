import { useState } from 'react';
import DepartmentDetails from '../../components/department/DepartmentDetails';
import Loader from '../../components/common/Loader';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { navigate } from '../../routes/AppRoutes';
import type { Department } from '../../types/department.types';

const ViewDepartment = ({ id }: { id: string }) => {
  const [department] = useState<Department | null>(null);
  const [error] = useState('');

  

  return (
    <DashboardLayout>
      <section className="page-header">
        <div>
          <h1>Department Details</h1>
          <p>Department ID: {id}</p>
        </div>
        <button className="btn btn-back" type="button" onClick={() => navigate('/departments')}>
          Back
        </button>
      </section>
      {error && <div className="alert">{error}</div>}
      {!error && (department ? <DepartmentDetails department={department} /> : <Loader />)}
    </DashboardLayout>
  );
};

export default ViewDepartment;
