import { useEffect, useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import { departmentApi } from '../../api/departmentApi';
import { roleApi } from '../../api/roleApi';
import { EMPLOYEE_STATUSES } from '../../utils/constants';
import type { Department } from '../../types/department.types';
import type { Employee, EmployeeRequest, EmployeeStatus } from '../../types/employee.types';
import type { Role } from '../../types/role.types';

interface Props {
  initialValue?: Employee;
  onSubmit: (payload: EmployeeRequest) => Promise<void>;
  error?: string;
}

const EmployeeForm = ({ initialValue, onSubmit, error }: Props) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [optionsError, setOptionsError] = useState('');
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<EmployeeRequest>({
    firstName: initialValue?.firstName ?? '',
    lastName: initialValue?.lastName ?? '',
    email: initialValue?.email ?? '',
    phone: initialValue?.phone ?? '',
    salary: initialValue?.salary ?? 1,
    hireDate: initialValue?.hireDate ?? '',
    status: initialValue?.status ?? 'ACTIVE',
    departmentId: initialValue?.departmentId ?? '',
    roleId: initialValue?.roleId ?? '',
  });

  useEffect(() => {
    Promise.all([departmentApi.getAll(), roleApi.getAll()])
      .then(([deptList, roleList]) => {
        setDepartments(deptList);
        setRoles(roleList);
        setForm((current) => ({
          ...current,
          departmentId: current.departmentId || deptList[0]?.id || '',
          roleId: current.roleId || roleList[0]?.id || '',
        }));
      })
      .catch((err) => {
        setOptionsError(err instanceof Error ? err.message : 'Unable to load departments and roles');
      })
      .finally(() => setLoadingOptions(false));
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        ...form,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone?.trim() || undefined,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={submit}>
      {(error || optionsError) && <div className="alert field-full">{error || optionsError}</div>}
      <Input label="First Name" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
      <Input label="Last Name" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
      <Input label="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <Input
        label="Salary"
        type="number"
        min={1}
        step="0.01"
        required
        value={form.salary}
        onChange={(e) => setForm({ ...form, salary: Number(e.target.value) })}
      />
      <Input label="Hire Date" type="date" required value={form.hireDate} onChange={(e) => setForm({ ...form, hireDate: e.target.value })} />
      <label className="field">
        <span>Status</span>
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as EmployeeStatus })}>
          {EMPLOYEE_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Department</span>
        <select required value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value })}>
          <option value="" disabled>
            {loadingOptions ? 'Loading departments...' : 'Select department'}
          </option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Role</span>
        <select required value={form.roleId} onChange={(e) => setForm({ ...form, roleId: e.target.value })}>
          <option value="" disabled>
            {loadingOptions ? 'Loading roles...' : 'Select role'}
          </option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </label>
      <Button type="submit" disabled={saving || loadingOptions || !form.departmentId || !form.roleId}>
        {saving ? 'Saving...' : 'Save Employee'}
      </Button>
    </form>
  );
};

export default EmployeeForm;
