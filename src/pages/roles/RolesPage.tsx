import { useEffect, useState } from 'react';
import { roleApi } from '../../api/roleApi';
import RoleTable from '../../components/role/RoleTable';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';
import DashboardLayout from '../../components/layout/DashboardLayout';
import type { Role } from '../../types/role.types';

const RolesPage = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [roleSearch, setRoleSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Role[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const load = async () => {
    setLoading(true);
    setRoles(await roleApi.getAllRoles());
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const findRole = async (event: React.FormEvent) => {
    event.preventDefault();
    const query = roleSearch.trim();

    if (!query) {
      setError('Please enter a role name');
      return;
    }

    setError('');
    setSearchLoading(true);
    setHasSearched(true);

    try {
      const role = await roleApi.getRoleByName(query);
      setSearchResults([role]);
      console.log('Role Data Retrieved Successfully');
    } catch (err) {
      setSearchResults([]);
      setError(err instanceof Error ? err.message : 'No role found with that name');
    } finally {
      setSearchLoading(false);
    }
  };

  const clearSearch = () => {
    setRoleSearch('');
    setSearchResults([]);
    setHasSearched(false);
    setError('');
  };

  const remove = async (name: string) => {
    if (!confirm('Delete this role?')) return;
    try {
      await roleApi.deleteRoleByName(name);
      console.log('Role Deleted Successfully');
      await load();
      setSearchResults((current) => current.filter((role) => role.name !== name));
      setShowDeleteSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <DashboardLayout>
      <section className="page-header">
        <div><h1>Roles</h1><p>Manage designations and role descriptions.</p></div>
        <a className="btn btn-primary btn-add" href="/roles/new">Add Role</a>
      </section>
      <form className="lookup-panel lookup-panel-single search-panel" onSubmit={findRole}>
        <label className="field">
          <span>Get Role Details</span>
          <input
            value={roleSearch}
            onChange={(event) => setRoleSearch(event.target.value)}
            placeholder="Enter role name"
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
      {error && <div className="alert">{error}</div>}
      {hasSearched ? (
        <section className="result-panel">
          <h2>Role Details</h2>
          {searchLoading ? <Loader /> : <RoleTable roles={searchResults} onDelete={remove} />}
        </section>
      ) : loading ? (
        <Loader />
      ) : (
        <RoleTable roles={roles} onDelete={remove} />
      )}
      <Modal
        open={showDeleteSuccess}
        title="Role Deleted Successfully"
        onClose={() => setShowDeleteSuccess(false)}
      >
        <p className="modal-message">The role record has been removed.</p>
      </Modal>
    </DashboardLayout>
  );
};

export default RolesPage;
