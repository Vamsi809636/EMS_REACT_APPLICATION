import EmployeeCard from './EmployeeCard';
import type { Employee } from '../../types/employee.types';

const EmployeeDetails = ({ employee }: { employee: Employee }) => <EmployeeCard employee={employee} />;

export default EmployeeDetails;
