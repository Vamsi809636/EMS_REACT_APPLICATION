import Button from '../common/Button';
import { formatDate } from '../../utils/formatDate';
import type { Employee } from '../../types/employee.types';

interface Props {
  employees: Employee[];
  onDelete: (id: string) => void;
}

const EmployeeTable = ({ employees, onDelete }: Props) => (
  <div className="table-wrap">
    <table>
      <thead>
        <tr>
          
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Role</th>
          <th>Status</th>
          <th>Hire Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.fullName || `${employee.firstName} ${employee.lastName}`}</td>
            <td>{employee.email}</td>
            <td>{employee.departmentName || '-'}</td>
            <td>{employee.roleName || '-'}</td>
            <td><span className="status-pill">{employee.status}</span></td>
            <td>{formatDate(employee.hireDate)}</td>
            <td className="actions">
              <a className="link-button" href={`/employees/${employee.id}`}>
                View
              </a>
              <a className="link-button" href={`/employees/${employee.id}/edit`}>
                Edit
              </a>
              <Button type="button" variant="danger" onClick={() => onDelete(employee.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
