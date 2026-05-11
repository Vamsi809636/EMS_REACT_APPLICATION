import Button from '../common/Button';
import type { Department } from '../../types/department.types';

interface Props {
  departments: Department[];
  onDelete: (id: string) => void;
}

const DepartmentTable = ({ departments, onDelete }: Props) => (
  <div className="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {departments.map((department) => (
          <tr key={department.id}>
            <td>{department.name}</td>
            <td>{department.description || '-'}</td>
            <td className="actions">
              <a className="link-button" href={`/departments/${department.id}/edit`}>
                Edit
              </a>
              <Button type="button" variant="danger" onClick={() => onDelete(department.id)}>
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
