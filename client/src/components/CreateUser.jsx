import { useState } from 'react';
import axios from 'axios';

const CreateUser = ({ onUserCreated }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/users', newUser);
      alert('User created successfully');
      onUserCreated(res.data); // Pass the new user to the parent (App.jsx) to update the list
      setNewUser({
        name: '',
        email: '',
        role: '',
      }); // Clear the form fields after successful post
    } catch (err) {
      console.error('Error creating user:', err.message);
      alert('Failed to create user');
    }
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="role"
          value={newUser.role}
          onChange={handleChange}
          placeholder="Role"
        />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
