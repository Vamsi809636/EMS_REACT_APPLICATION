import { useEffect, useState } from 'react';
import { employeeApi } from '../../api/employeeApi';
import EmployeeDetails from '../../components/employee/EmployeeDetails';
import Loader from '../../components/common/Loader';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { navigate } from '../../routes/AppRoutes';
import type { Employee } from '../../types/employee.types';

const ViewEmployee = ({ id }: { id: string }) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    setEmployee(null);
    employeeApi
      .getEmployeeById(id)
      .then((data) => {
        setEmployee(data);
        console.log('Employee Data Retrieved Successfully');
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unable to load employee details');
      });
  }, [id]);

  return (
    <DashboardLayout>
      <section className="page-header">
        <div>
          <h1>Employee Details</h1>
          <p>Employee ID: {id}</p>
        </div>
        <button className="btn btn-back" type="button" onClick={() => navigate('/employees')}>
          Back
        </button>
      </section>
      {error && <div className="alert">{error}</div>}
      {!error && (employee ? <EmployeeDetails employee={employee} /> : <Loader />)}
    </DashboardLayout>
  );
};

export default ViewEmployee;
