import { navigate } from '../../routes/AppRoutes';
import { useAuth } from '../../hooks/useAuth';


const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <a className="brand" href="/" onClick={(event) => route(event, '/')}>
        <img className="brand-logo" src="/ibm-logo.png" alt="IBM" />
      </a>

      <div className="nav-links">
        {!isAuthenticated ? (
          <>
            <a href="/login" onClick={(event) => route(event, '/login')}>
              Login
            </a>
          </>
        ) : (
          <>
            <a href="/employees" onClick={(event) => route(event, '/employees')}>
              Employees
            </a>
            <a href="/departments" onClick={(event) => route(event, '/departments')}>
              Departments
            </a>
            <a href="/projects" onClick={(event) => route(event, '/projects')}>
              Projects
            </a>
            <a href="/roles" onClick={(event) => route(event, '/roles')}>
              Roles
            </a>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

const route = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
  event.preventDefault();
  navigate(path);
};

export default Navbar;
