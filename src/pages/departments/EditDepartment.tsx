import { useEffect, useState } from 'react';
import { departmentApi } from '../../api/departmentApi';
import DepartmentForm from '../../components/department/DepartmentForm';
import Loader from '../../components/common/Loader';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { navigate } from '../../routes/AppRoutes';
import type { Department, DepartmentRequest } from '../../types/department.types';

const EditDepartment = ({ id }: { id: string }) => {
  const [department, setDepartment] = useState<Department | null>(null);

  useEffect(() => {
    departmentApi.getById(id).then(setDepartment);
  }, [id]);

  const submit = async (payload: DepartmentRequest) => {
    await departmentApi.update(id, payload);
    navigate('/departments');
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
    </DashboardLayout>
  );
};

export default EditDepartment;
