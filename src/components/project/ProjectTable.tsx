import Button from '../common/Button';

import type { Project } from '../../types/project.types';

interface Props {
  projects: Project[];
  onDelete: (name: string) => void;
}

const ProjectTable = ({ projects, onDelete }: Props) => (
  <div className="table-wrap project-table-wrap">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td data-label="Name">{project.name}</td>
            
            <td className="actions" data-label="Actions">
              <a className="link-button" href={`/projects/${project.id}`}>View</a>
              <a className="link-button" href={`/projects/${project.id}/edit`}>Edit</a>
              <Button type="button" variant="danger" onClick={() => onDelete(project.name)}>
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
