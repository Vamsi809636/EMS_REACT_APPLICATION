import { useEffect, useState } from 'react';
import { departmentApi } from '../../api/departmentApi';
import DepartmentTable from '../../components/department/DepartmentTable';
import Loader from '../../components/common/Loader';
import DashboardLayout from '../../components/layout/DashboardLayout';
import type { Department } from '../../types/department.types';

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentName, setDepartmentName] = useState('');
  const [matchedDepartments, setMatchedDepartments] = useState<Department[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setDepartments(await departmentApi.getAll());
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const findByName = async (event: React.FormEvent) => {
    event.preventDefault();

    const name = departmentName.trim();

    if (!name) {
      setError('Please enter a department name');
      setMatchedDepartments([]);
      setHasSearched(false);
      return;
    }

    setError('');
    setHasSearched(true);

    try {
      const department = await departmentApi.getByName(name);
      setMatchedDepartments([department]);
    } catch (err) {
      setMatchedDepartments([]);
      setError(
        err instanceof Error
          ? err.message
          : 'No department found with that name'
      );
    }
  };

  const clearSearch = () => {
    setDepartmentName('');
    setMatchedDepartments([]);
    setHasSearched(false);
    setError('');
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this department?')) return;

    try {
      await departmentApi.remove(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <DashboardLayout>
      <section className="page-header">
        <div>
          <h1>Departments</h1>
          <p>Maintain organization departments.</p>
        </div>

        <a className="btn btn-primary" href="/departments/new">
          Add Department
        </a>
      </section>

      {error && <div className="alert">{error}</div>}

      <form
        className="lookup-panel lookup-panel-single"
        onSubmit={findByName}
      >
        <label className="field">
          <span>Get Department Details By Department Name</span>

          <input
            value={departmentName}
            onChange={(event) => setDepartmentName(event.target.value)}
            placeholder="Enter department name"
          />
        </label>

        <div className="lookup-actions">
          <button className="btn btn-primary" type="submit">
            Get Details
          </button>

          <button
            className="btn btn-secondary"
            type="button"
            onClick={clearSearch}
          >
            Clear
          </button>
        </div>
      </form>

      {hasSearched ? (
        <section className="result-panel">
          <h2>Department Details</h2>

          {matchedDepartments.length > 0 && (
            <DepartmentTable
              departments={matchedDepartments}
              onDelete={remove}
            />
          )}
        </section>
      ) : loading ? (
        <Loader />
      ) : (
        <DepartmentTable
          departments={departments}
          onDelete={remove}
        />
      )}
    </DashboardLayout>
  );
};

export default DepartmentsPage;