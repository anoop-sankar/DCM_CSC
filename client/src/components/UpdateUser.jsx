import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateUser = ({ userId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setFormData({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
        });
      } catch (err) {
        console.error('Error fetching user for update:', err.message);
      }
    };

    fetchUser();
  }, [userId]); // Fetch user data for update on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/users/${userId}`, formData);
      alert('User updated successfully');
    } catch (err) {
      console.error('Error updating user:', err.message);
      alert('Failed to update user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="role"
        value={formData.role}
        onChange={handleChange}
        placeholder="Role"
      />
      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUser;
