import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';
import UserDetails from './components/UserDetails';
import Navbar from './components/Navbar';
import Login from './components/Login';


function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  }; 
  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
      {!user ? (
          <Route path="*" element={<Login onLogin={setUser} />} />
        ) : (
          <>
        <Route path="/" element={<UserList />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/users/update/:id" element={<UpdateUser />} />
        </>
        )} 
      </Routes>
    </Router>
  );
}

export default App;
