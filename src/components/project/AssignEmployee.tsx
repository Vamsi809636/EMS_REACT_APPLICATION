import { useEffect, useState } from 'react';
import { employeeApi } from '../../api/employeeApi';
import { projectApi } from '../../api/projectApi';
import Button from '../common/Button';
import Input from '../common/Input';
import type { Employee } from '../../types/employee.types';

const AssignEmployee = ({ projectId, onAssigned }: { projectId: string; onAssigned: () => void }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeId, setEmployeeId] = useState('');
  const [projectRole, setProjectRole] = useState('');
  const [assignedDate, setAssignedDate] = useState('');

  useEffect(() => {
    employeeApi.getAll().then((page) => {
      setEmployees(page.content ?? []);
      setEmployeeId(page.content?.[0]?.id ?? '');
    });
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    await projectApi.assignEmployee(projectId, {
      employeeId,
      projectRole,
      assignedDate: assignedDate || undefined,
    });
    setProjectRole('');
    setAssignedDate('');
    onAssigned();
  };

  return (
    <form className="inline-form" onSubmit={submit}>
      <label className="field">
        <span>Employee</span>
        <select required value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.fullName || employee.email}
            </option>
          ))}
        </select>
      </label>
      <Input label="Project Role" required value={projectRole} onChange={(e) => setProjectRole(e.target.value)} />
      <Input label="Assigned Date" type="date" value={assignedDate} onChange={(e) => setAssignedDate(e.target.value)} />
      <Button type="submit">Assign</Button>
    </form>
  );
};

export default AssignEmployee;
