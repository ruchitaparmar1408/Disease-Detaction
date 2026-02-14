import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="layout">
      <header className="layout-header">
        <Link to="/dashboard" className="layout-brand">
          <span className="layout-brand-icon">◆</span>
          Disease Detection
        </Link>
        <nav className="layout-nav">
          <NavLink to="/dashboard" end>Search</NavLink>
          <NavLink to="/search-by-image">Search by Image</NavLink>
        </nav>
        <div className="layout-user">
          <span className="layout-user-name">{user?.name}</span>
          <button type="button" className="layout-logout" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </header>
      <main className="layout-main">{children}</main>
    </div>
  );
}
