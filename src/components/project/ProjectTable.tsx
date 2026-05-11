import Button from '../common/Button';
import { formatDate } from '../../utils/formatDate';
import type { Project } from '../../types/project.types';

interface Props {
  projects: Project[];
  onDelete: (id: string) => void;
}

const ProjectTable = ({ projects, onDelete }: Props) => (
  <div className="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Start</th>
          <th>End</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td><span className="status-pill">{project.status}</span></td>
            <td>{formatDate(project.startDate)}</td>
            <td>{formatDate(project.endDate)}</td>
            <td>{project.description || '-'}</td>
            <td className="actions">
              <a className="link-button" href={`/projects/${project.id}/edit`}>Edit</a>
              <Button type="button" variant="danger" onClick={() => onDelete(project.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProjectTable;
