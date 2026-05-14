import Button from '../common/Button';
import type { Department } from '../../types/department.types';

interface Props {
  departments: Department[];
  onDelete: (name: string) => void;
}

const DepartmentTable = ({ departments, onDelete }: Props) => (
  <div className="table-wrap department-table-wrap">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {departments.map((department) => (
          <tr key={department.id}>
            <td data-label="Name">{department.name}</td>
            
            <td className="actions" data-label="Actions">
              <a className="link-button" href={`/departments/${department.id}`}>
                View
              </a>
              <a className="link-button" href={`/departments/${department.id}/edit`}>
                Edit
              </a>
              <Button type="button" variant="danger" onClick={() => onDelete(department.name)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DepartmentTable;
