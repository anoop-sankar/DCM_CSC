import { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = ({ userId }) => {
  const [user, setUser] = useState(null); // To store the user data
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        setError('Error fetching user details');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]); // Dependency array ensures effect runs when userId changes

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default UserDetails;
