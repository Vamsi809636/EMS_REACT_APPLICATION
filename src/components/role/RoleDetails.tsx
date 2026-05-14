import type { Role } from '../../types/role.types';

const RoleDetails = ({ role }: { role: Role }) => (
  <section className="details-grid">
    <div><span>Role ID</span><strong>{role.id}</strong></div>
    <div><span>Name</span><strong>{role.name}</strong></div>
    <div className="detail-wide"><span>Description</span><strong>{role.description || '-'}</strong></div>
  </section>
);

export default RoleDetails;
