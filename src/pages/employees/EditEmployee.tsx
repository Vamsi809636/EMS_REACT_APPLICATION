import { useEffect, useState } from 'react';
import { employeeApi } from '../../api/employeeApi';
import EmployeeForm from '../../components/employee/EmployeeForm';
import Loader from '../../components/common/Loader';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { navigate } from '../../routes/AppRoutes';
import type { Employee, EmployeeRequest } from '../../types/employee.types';

const EditEmployee = ({ id }: { id: string }) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    employeeApi.getById(id).then(setEmployee);
  }, [id]);

  const submit = async (payload: EmployeeRequest) => {
    setError('');
    try {
      await employeeApi.update(id, payload);
      navigate('/employees');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update employee');
    }
  };

  return (
    <DashboardLayout>
      <section className="page-header">
        <h1>Edit Employee</h1>
        <button className="btn btn-back" type="button" onClick={() => navigate('/employees')}>
          Back
        </button>
      </section>
      {employee ? <EmployeeForm initialValue={employee} onSubmit={submit} error={error} /> : <Loader />}
    </DashboardLayout>
  );
};

export default EditEmployee;
