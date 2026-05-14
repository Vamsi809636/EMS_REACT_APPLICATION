import { useState } from 'react';
import { employeeApi } from '../../api/employeeApi';
import EmployeeTable from '../../components/employee/EmployeeTable';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useEmployees } from '../../hooks/useEmployees';
import { navigate } from '../../routes/AppRoutes';
import type { Employee } from '../../types/employee.types';

const EmployeesPage = () => {
  const { employees, loading, loadEmployees } = useEmployees();
  const [error, setError] = useState('');
  const [searchType] = useState<'id' | 'name'>('id');
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Employee[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const findEmployee = async (event: React.FormEvent) => {
    event.preventDefault();
    const query = employeeSearch.trim();

    if (!query) {
      setError(searchType === 'id' ? 'Please enter an employee ID' : 'Please enter an employee name');
      return;
    }

    setError('');

    if (searchType === 'id') {
      navigate(`/employees/${encodeURIComponent(query)}`);
      return;
    }

    setSearchLoading(true);
    setHasSearched(true);

    try {
      const results = await employeeApi.getEmployeeByName(query);
      setSearchResults(results);
      if (results.length === 0) {
        setError('No employee found with that name');
      }
    } catch (err) {
      setSearchResults([]);
      setError(err instanceof Error ? err.message : 'No employee found with that name');
    } finally {
      setSearchLoading(false);
    }
  };

  const clearSearch = () => {
    setEmployeeSearch('');
    setSearchResults([]);
    setHasSearched(false);
    setError('');
  };

  const remove = async (id: string) => {
    if (!window.confirm('Delete this employee?')) return;

    try {
      setError('');
      await employeeApi.deleteById(id);
      console.log('Employee Deleted Successfully');

      await loadEmployees();
      setSearchResults((current) => current.filter((employee) => employee.id !== id));
      setShowDeleteSuccess(true);
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
        <a className="btn btn-primary btn-add" href="/employees/new">Add Employee</a>
      </section>
      {error && <div className="alert">{error}</div>}
      <form className="lookup-panel lookup-panel-employee" onSubmit={findEmployee}>
       
        <label className="field">
          <span>{ 'Get Employee Details' }</span>
          <input
            value={employeeSearch}
            onChange={(event) => setEmployeeSearch(event.target.value)}
            placeholder={'Enter employee ID'}
          />
        </label>
        <div className="lookup-actions">
          <button className="btn btn-primary btn-compact" type="submit" disabled={searchLoading}>
            {searchLoading ? 'Searching...' : 'Get Details'}
          </button>
          <button className="btn btn-secondary btn-compact" type="button" onClick={clearSearch}>
            Clear
          </button>
        </div>
      </form>
      {hasSearched ? (
        <section className="result-panel">
          <h2>Employee Details</h2>
          {searchLoading ? <Loader /> : <EmployeeTable employees={searchResults} onDelete={remove} />}
        </section>
      ) : loading ? (
        <Loader />
      ) : (
        <EmployeeTable employees={employees} onDelete={remove} />
      )}
      <Modal
        open={showDeleteSuccess}
        title="Employee Deleted Successfully"
        onClose={() => setShowDeleteSuccess(false)}
      >
        <p className="modal-message">The employee record has been removed.</p>
      </Modal>
    </DashboardLayout>
  );
};

export default EmployeesPage;
