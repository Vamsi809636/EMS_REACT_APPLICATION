import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../hooks/useAuth';
import { navigate } from '../../routes/AppRoutes';

const Dashboard = () => {
  const { isAuthenticated, username } = useAuth();
  const primaryPath = isAuthenticated ? '/employees' : '/login';

  return (
    <DashboardLayout>
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="eyebrow">Employee Management System</span>
          <h1>Manage people, teams, roles, and project staffing in one place.</h1>
          <p>
            A focused workspace for HR admins and project managers to maintain employee records,
            organize departments, define roles, and track project assignments.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={primaryPath} onClick={(event) => route(event, primaryPath)}>
              {isAuthenticated ? 'Open Employees' : 'Login to Continue'}
            </a>
            {isAuthenticated && <span className="signed-in">Signed in as {username}</span>}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

const route = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
  event.preventDefault();
  navigate(path);
};

export default Dashboard;
