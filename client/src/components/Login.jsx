import { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      // Save user info to localStorage
    
        
      onLogin(res.data.user);
      localStorage.setItem("loggedInUser", JSON.stringify(res.data.user));
    // Redirect or update state if needed
        setIsAuthenticated(true);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  

  return (
   
    <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="border p-4 rounded shadow-sm" style={{ minWidth: '300px' }}>
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
            <div className="mb-3">
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                />
            </div>
            <div className="mb-3">
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary w-100">
                Login
            </button>
            </form>
        </div>
</div>

    
  );
};


export default Login;
