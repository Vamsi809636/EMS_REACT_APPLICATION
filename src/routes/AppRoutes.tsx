import { useEffect, useState } from 'react';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/auth/Login';
import EmployeesPage from '../pages/employees/EmployeesPage';
import AddEmployee from '../pages/employees/AddEmployee';
import EditEmployee from '../pages/employees/EditEmployee';
import ViewEmployee from '../pages/employees/ViewEmployee';
import DepartmentsPage from '../pages/departments/DepartmentsPage';
import AddDepartment from '../pages/departments/AddDepartment';
import EditDepartment from '../pages/departments/EditDepartment';
import ViewDepartment from '../pages/departments/ViewDepartment';
import ProjectsPage from '../pages/projects/ProjectsPage';
import AddProject from '../pages/projects/AddProject';
import EditProject from '../pages/projects/EditProject';
import ViewProject from '../pages/projects/ViewProject';
import RolesPage from '../pages/roles/RolesPage';
import AddRole from '../pages/roles/AddRole';
import EditRole from '../pages/roles/EditRole';
import ViewRole from '../pages/roles/ViewRole';

export const navigate = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const AppRoutes = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleRoute = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handleRoute);
    return () => window.removeEventListener('popstate', handleRoute);
  }, []);

  if (path === '/login') return <Login />;

  if (path === '/employees/new') {
    return (
      <ProtectedRoute>
        <AddEmployee />
      </ProtectedRoute>
    );
  }

  const employeeEdit = path.match(/^\/employees\/([^/]+)\/edit$/);
  if (employeeEdit) {
    return (
      <ProtectedRoute>
        <EditEmployee id={employeeEdit[1]} />
      </ProtectedRoute>
    );
  }

  const employeeView = path.match(/^\/employees\/([^/]+)$/);
  if (employeeView) {
    return (
      <ProtectedRoute>
        <ViewEmployee id={employeeView[1]} />
      </ProtectedRoute>
    );
  }

  if (path === '/employees') {
    return (
      <ProtectedRoute>
        <EmployeesPage />
      </ProtectedRoute>
    );
  }

  if (path === '/departments/new') {
    return (
      <ProtectedRoute>
        <AddDepartment />
      </ProtectedRoute>
    );
  }

  const departmentEdit = path.match(/^\/departments\/([^/]+)\/edit$/);
  if (departmentEdit) {
    return (
      <ProtectedRoute>
        <EditDepartment id={departmentEdit[1]} />
      </ProtectedRoute>
    );
  }

  const departmentView = path.match(/^\/departments\/([^/]+)$/);
  if (departmentView) {
    return (
      <ProtectedRoute>
        <ViewDepartment id={departmentView[1]} />
      </ProtectedRoute>
    );
  }

  if (path === '/departments') {
    return (
      <ProtectedRoute>
        <DepartmentsPage />
      </ProtectedRoute>
    );
  }

  if (path === '/projects/new') {
    return (
      <ProtectedRoute>
        <AddProject />
      </ProtectedRoute>
    );
  }

  const projectEdit = path.match(/^\/projects\/([^/]+)\/edit$/);
  if (projectEdit) {
    return (
      <ProtectedRoute>
        <EditProject id={projectEdit[1]} />
      </ProtectedRoute>
    );
  }

  const projectView = path.match(/^\/projects\/([^/]+)$/);
  if (projectView) {
    return (
      <ProtectedRoute>
        <ViewProject id={projectView[1]} />
      </ProtectedRoute>
    );
  }

  if (path === '/projects') {
    return (
      <ProtectedRoute>
        <ProjectsPage />
      </ProtectedRoute>
    );
  }

  if (path === '/roles/new') {
    return (
      <ProtectedRoute>
        <AddRole />
      </ProtectedRoute>
    );
  }

  const roleEdit = path.match(/^\/roles\/([^/]+)\/edit$/);
  if (roleEdit) {
    return (
      <ProtectedRoute>
        <EditRole id={roleEdit[1]} />
      </ProtectedRoute>
    );
  }

  const roleView = path.match(/^\/roles\/([^/]+)$/);
  if (roleView) {
    return (
      <ProtectedRoute>
        <ViewRole id={roleView[1]} />
      </ProtectedRoute>
    );
  }

  if (path === '/roles') {
    return (
      <ProtectedRoute>
        <RolesPage />
      </ProtectedRoute>
    );
  }

  return <Dashboard />;
};

export default AppRoutes;
