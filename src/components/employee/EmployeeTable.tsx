import Button from '../common/Button';

import type { Employee } from '../../types/employee.types';

interface Props {
  employees: Employee[];
  onDelete: (id: string) => void;
}

const EmployeeTable = ({ employees, onDelete }: Props) => (
  <div className="table-wrap employee-table-wrap">
    <table>
      <thead>
        <tr>
          
          <th>Name</th>
          
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td data-label="Name">{employee.fullName || `${employee.firstName} ${employee.lastName}`}</td>
           
            <td className="actions" data-label="Actions">
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
