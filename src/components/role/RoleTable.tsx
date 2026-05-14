import Button from '../common/Button';
import type { Role } from '../../types/role.types';

interface Props {
  roles: Role[];
  onDelete: (name: string) => void;
}

const RoleTable = ({ roles, onDelete }: Props) => (
  <div className="table-wrap role-table-wrap">
    <table>
      <thead>
        <tr>
          <th>Name</th>
         
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {roles.map((role) => (
          <tr key={role.id}>
            <td data-label="Name">{role.name}</td>
            
            <td className="actions" data-label="Actions">
              <a className="link-button" href={`/roles/${role.id}`}>
                View
              </a>
              <a className="link-button" href={`/roles/${role.id}/edit`}>
                Edit
              </a>
              <Button type="button" variant="danger" onClick={() => onDelete(role.name)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RoleTable;
