import { navigate } from '../../routes/AppRoutes';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';


const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  return (
    <nav className="navbar">
      <a className="brand" href="/" onClick={(event) => goTo(event, '/')}>
        <img className="brand-logo" src="/ibm-logo.png" alt="IBM" />
        <span>EMS Portal</span>
      </a>

      <button
        className="nav-menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>

      <div id="primary-navigation" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
        {!isAuthenticated ? (
          <>
            <a href="/login" onClick={(event) => goTo(event, '/login')}>
              Login
            </a>
          </>
        ) : (
          <>
            <a href="/employees" onClick={(event) => goTo(event, '/employees')}>
              Employees
            </a>
            <a href="/departments" onClick={(event) => goTo(event, '/departments')}>
              Departments
            </a>
            <a href="/projects" onClick={(event) => goTo(event, '/projects')}>
              Projects
            </a>
            <a href="/roles" onClick={(event) => goTo(event, '/roles')}>
              Roles
            </a>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
