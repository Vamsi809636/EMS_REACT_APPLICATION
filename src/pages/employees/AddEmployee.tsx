import { useState } from 'react';
import { employeeApi } from '../../api/employeeApi';
import EmployeeForm from '../../components/employee/EmployeeForm';
import Modal from '../../components/common/Modal';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { navigate } from '../../routes/AppRoutes';
import type { EmployeeRequest } from '../../types/employee.types';

const AddEmployee = () => {
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const submit = async (payload: EmployeeRequest) => {
    setError('');
    try {
      await employeeApi.create(payload);
      console.log('Employee Created Successfully');
      setShowSuccess(true);
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
      <Modal
        open={showSuccess}
        title="Employee Added Successfully!!"
        onClose={() => navigate('/employees')}
      >
        <p className="modal-message">The employee record has been saved.</p>
      </Modal>
    </DashboardLayout>
  );
};

export default AddEmployee;

