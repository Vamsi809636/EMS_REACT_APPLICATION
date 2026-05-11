import { formatDate } from '../../utils/formatDate';
import type { Employee } from '../../types/employee.types';

const EmployeeCard = ({ employee }: { employee: Employee }) => (
  <section className="details-grid">
    <div><span>Name</span><strong>{employee.fullName}</strong></div>
    <div><span>Email</span><strong>{employee.email}</strong></div>
    <div><span>Phone</span><strong>{employee.phone || '-'}</strong></div>
    <div><span>Salary</span><strong>{employee.salary ?? 'Restricted'}</strong></div>
    <div><span>Status</span><strong>{employee.status}</strong></div>
    <div><span>Hire Date</span><strong>{formatDate(employee.hireDate)}</strong></div>
    <div><span>Department</span><strong>{employee.departmentName || '-'}</strong></div>
    <div><span>Role</span><strong>{employee.roleName || '-'}</strong></div>
  </section>
);

export default EmployeeCard;
