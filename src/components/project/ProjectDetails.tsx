import { formatDate } from '../../utils/formatDate';
import type { Project } from '../../types/project.types';

const ProjectDetails = ({ project }: { project: Project }) => (
  <section className="details-grid">
    <div><span>Project ID</span><strong>{project.id}</strong></div>
    <div><span>Name</span><strong>{project.name}</strong></div>
    <div><span>Status</span><strong>{project.status}</strong></div>
    <div><span>Start Date</span><strong>{formatDate(project.startDate)}</strong></div>
    <div><span>End Date</span><strong>{formatDate(project.endDate)}</strong></div>
    <div className="detail-wide"><span>Description</span><strong>{project.description || '-'}</strong></div>
  </section>
);

export default ProjectDetails;
