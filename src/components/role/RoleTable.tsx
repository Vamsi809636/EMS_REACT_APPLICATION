import Button from '../common/Button';
import type { Role } from '../../types/role.types';

interface Props {
  roles: Role[];
  onDelete: (id: string) => void;
}

const RoleTable = ({ roles, onDelete }: Props) => (
  <div className="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {roles.map((role) => (
          <tr key={role.id}>
            <td>{role.name}</td>
            <td>{role.level}</td>
            <td>{role.description || '-'}</td>
            <td className="actions">
              <a className="link-button" href={`/roles/${role.id}/edit`}>
                Edit
              </a>
              <Button type="button" variant="danger" onClick={() => onDelete(role.id)}>
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
