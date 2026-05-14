import type { Department } from '../../types/department.types';

const DepartmentDetails = ({ department }: { department: Department }) => (
  <section className="details-grid">
    <div><span>Department ID</span><strong>{department.id}</strong></div>
    <div><span>Name</span><strong>{department.name}</strong></div>
    <div className="detail-wide"><span>Description</span><strong>{department.description || '-'}</strong></div>
  </section>
);

export default DepartmentDetails;
