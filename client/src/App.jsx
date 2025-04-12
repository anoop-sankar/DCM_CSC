import { useState, useEffect } from 'react';
import axios from 'axios';
import UserDetails from './components/UserDetails';
import UpdateUser from './components/UpdateUser';
import CreateUser from './components/CreateUser';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // for showing user details
  const [userToUpdate, setUserToUpdate] = useState(null); // for updating user

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err.message);
      }
    };
    
    fetchUsers();
  }, []); // Fetch users on mount

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
  };

  const handleUpdateUser = (userId) => {
    setUserToUpdate(userId);
  };

  const handleNewUserCreated = (newUser) => {
    // Add the newly created user to the users list
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/users/${userId}`);
      alert(res.data.message);  // Success message
      setUsers(users.filter(user => user._id !== userId)); // Remove deleted user
    } catch (err) {
      console.error('Error deleting user:', err.message);
      alert('Failed to delete user');
    }
  };

  return (
    <div>
      <h1>Users List</h1>
      
      {/* Create User Form */}
      <CreateUser onUserCreated={handleNewUserCreated} />

      {/* List of Users */}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.email}) - {user.role}
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            <button onClick={() => handleUserSelect(user._id)}>View Details</button>
            <button onClick={() => handleUpdateUser(user._id)}>Update User</button>
          </li>
        ))}
      </ul>

      {/* Display User Details */}
      {selectedUser && <UserDetails userId={selectedUser} />}
      
      {/* Update User Form */}
      {userToUpdate && <UpdateUser userId={userToUpdate} />}
    </div>
  );
};

export default App;
