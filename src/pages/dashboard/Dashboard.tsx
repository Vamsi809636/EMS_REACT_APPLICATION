import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../hooks/useAuth';
import { navigate } from '../../routes/AppRoutes';

const Dashboard = () => {
  const { isAuthenticated, username } = useAuth();
  const primaryPath = isAuthenticated ? '/employees' : '/login';

  const quickActions = [
    {
      path: '/employees',
      label: 'People',
      title: 'Employee Directory',
      text: 'Review profiles, contacts, salary records, and employment status.',
      count: '01',
    },
    {
      path: '/departments',
      label: 'Teams',
      title: 'Department Hub',
      text: 'Keep organizational units, managers, and team descriptions aligned.',
      count: '02',
    },
    {
      path: '/projects',
      label: 'Delivery',
      title: 'Project Tracker',
      text: 'Track project timelines, staffing, and lifecycle status in one place.',
      count: '03',
    },
    {
      path: '/roles',
      label: 'Access',
      title: 'Role Management',
      text: 'Maintain role levels, responsibilities, and access-ready job data.',
      count: '04',
    },
  ];

  return (
    <DashboardLayout>
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="eyebrow">Employee Management System</span>
          <h1>Welcome to IBM EMS </h1>
          <p>
            Manage people, teams, roles, and project staffing in one focused workspace for HR
            admins and project managers.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={primaryPath} onClick={(event) => route(event, primaryPath)}>
              {isAuthenticated ? 'Open Employees' : 'Login to Continue'}
            </a>
            {isAuthenticated && <span className="signed-in">Signed in as {username}</span>}
          </div>
          <div className="home-metrics" aria-label="Workspace overview">
            <div>
              <strong>4</strong>
              <span>Core modules</span>
            </div>
            
            <div>
              <strong>Secure</strong>
              <span>Admin access</span>
            </div>
          </div>
        </div>
        <div className="home-hero-panel" aria-label="EMS workspace preview">
          <div className="hero-panel-top">
            <img src="/ibm-logo.png" alt="IBM" />
            <span>Live Workspace</span>
          </div>
          <div className="hero-panel-row is-active">
            <span>Employees</span>
            <strong>Directory ready</strong>
          </div>
          <div className="hero-panel-row">
            <span>Departments</span>
            <strong>Teams organized</strong>
          </div>
          <div className="hero-panel-row">
            <span>Projects</span>
            <strong>Staffing visible</strong>
          </div>
          <div className="hero-panel-footer">
            <span>Today</span>
            <strong>HR operations dashboard</strong>
          </div>
        </div>
      </section>
      <section className="quick-actions" aria-label="Quick actions">
        {quickActions.map((action) => (
          <a key={action.path} href={action.path} onClick={(event) => route(event, action.path)}>
            <span className="quick-count">{action.count}</span>
            <span className="quick-label">{action.label}</span>
            <strong>{action.title}</strong>
            <p>{action.text}</p>
          </a>
        ))}
      </section>
    </DashboardLayout>
  );
};

const route = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
  event.preventDefault();
  navigate(path);
};

export default Dashboard;
