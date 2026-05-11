import { useState } from 'react';
import { employeeApi } from '../../api/employeeApi';
import EmployeeTable from '../../components/employee/EmployeeTable';
import Loader from '../../components/common/Loader';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useEmployees } from '../../hooks/useEmployees';
import { navigate } from '../../routes/AppRoutes';

const EmployeesPage = () => {
  const { employees, loading, loadEmployees } = useEmployees();
  const [error, setError] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  const findById = (event: React.FormEvent) => {
    event.preventDefault();
    const id = employeeId.trim();

    if (!id) {
      setError('Please enter an employee ID');
      return;
    }

    setError('');
    navigate(`/employees/${encodeURIComponent(id)}`);
  };

  const clearSearch = () => {
    setEmployeeId('');
    setError('');
  };

  const remove = async (id: string) => {
  console.log('Deleting employee:', id);

  if (!window.confirm('Delete this employee?')) return;

  try {
    setError('');

    const response = await employeeApi.remove(id);

    console.log('Delete success:', response);

    await loadEmployees();
  } catch (err) {
    console.error('Delete error:', err);

    setError(err instanceof Error ? err.message : 'Delete failed');
  }
};

  return (
    <DashboardLayout>
      <section className="page-header">
        <div>
          <h1>Employees</h1>
          <p>Onboard, update, and review employee records.</p>
        </div>
        <a className="btn btn-primary" href="/employees/new">Add Employee</a>
      </section>
      {error && <div className="alert">{error}</div>}
      <form className="lookup-panel lookup-panel-single" onSubmit={findById}>
        <label className="field">
          <span>Get Employee Details By Employee ID</span>
          <input
            value={employeeId}
            onChange={(event) => setEmployeeId(event.target.value)}
            placeholder="Enter employee ID"
          />
        </label>
        <div className="lookup-actions">
          <button className="btn btn-primary btn-compact" type="submit">
            Get Details
          </button>
          <button className="btn btn-secondary btn-compact" type="button" onClick={clearSearch}>
            Clear
          </button>
        </div>
      </form>
      {loading ? <Loader /> : <EmployeeTable employees={employees} onDelete={remove} />}
    </DashboardLayout>
  );
};

export default EmployeesPage;
