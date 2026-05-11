import { departmentApi } from '../../api/departmentApi';
import DepartmentForm from '../../components/department/DepartmentForm';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { navigate } from '../../routes/AppRoutes';
import type { DepartmentRequest } from '../../types/department.types';

const AddDepartment = () => {
  const submit = async (payload: DepartmentRequest) => {
    await departmentApi.create(payload);
    navigate('/departments');
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
    </DashboardLayout>
  );
};

export default AddDepartment;
