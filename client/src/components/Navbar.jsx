import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
const navigate = useNavigate();
  
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const userEmail = loggedInUser?.email || "";


  const handleLogout = () => {
    
    onLogout(); // clears login in App.jsx
    localStorage.removeItem("loggedInUser");
    setIsAuthenticated(false);
    navigate('/'); // redirects to login
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#eee' }}>
      <div>
        {user && (
          <>
            <Link to="/">Home</Link> |{" "}
            <Link to="/create">Create User</Link>
          </>
        )}
      </div>
      <div>
        {user && (
          <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Logout
          </button>
        )}
      </div>
      <div>
      {userEmail && (
        <li className="nav-item nav-link">
          <strong>{userEmail}</strong>
        </li>
)}

      </div>
    </nav>
  );
};

export default Navbar;
