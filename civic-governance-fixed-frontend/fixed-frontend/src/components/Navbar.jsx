import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            🏛️ Nagara Paarvai 360
          </Link>
          
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                {user.role === 'CITIZEN' && (
                  <>
                    <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
                    <Link to="/report" className="hover:text-blue-200">Report Issue</Link>
                    <Link to="/my-complaints" className="hover:text-blue-200">My Complaints</Link>
                    <Link to="/assets" className="hover:text-blue-200">Assets</Link>
                  </>
                )}
                
                {user.role === 'OFFICER' && (
                  <>
                    <Link to="/officer/dashboard" className="hover:text-blue-200">Dashboard</Link>
                    <Link to="/officer/complaints" className="hover:text-blue-200">Assigned Complaints</Link>
                    <Link to="/officer/assets" className="hover:text-blue-200">Manage Assets</Link>
                  </>
                )}
                
                {user.role === 'ADMIN' && (
                  <>
                    <Link to="/admin/dashboard" className="hover:text-blue-200">Dashboard</Link>
                    <Link to="/admin/complaints" className="hover:text-blue-200">All Complaints</Link>
                    <Link to="/admin/assets" className="hover:text-blue-200">Assets</Link>
                    <Link to="/admin/users" className="hover:text-blue-200">Users</Link>
                  </>
                )}
                
                <Link to="/public" className="hover:text-blue-200">Public Portal</Link>
                
                <div className="flex items-center space-x-3">
                  <span className="text-sm">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/public" className="hover:text-blue-200">Public Portal</Link>
                <Link to="/login" className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
