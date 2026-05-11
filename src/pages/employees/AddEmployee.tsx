import { useState } from 'react';
import { employeeApi } from '../../api/employeeApi';
import EmployeeForm from '../../components/employee/EmployeeForm';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { navigate } from '../../routes/AppRoutes';
import type { EmployeeRequest } from '../../types/employee.types';

const AddEmployee = () => {
  const [error, setError] = useState('');

  const submit = async (payload: EmployeeRequest) => {
    setError('');
    try {
      await employeeApi.create(payload);
      navigate('/employees');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add employee');
    }
  };

  return (
    <DashboardLayout>
      <section className="page-header">
        <h1>Add Employee</h1>
        <button className="btn btn-back" type="button" onClick={() => navigate('/employees')}>
          Back
        </button>
      </section>
      <EmployeeForm onSubmit={submit} error={error} />
    </DashboardLayout>
  );
};

export default AddEmployee;
