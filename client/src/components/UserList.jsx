import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleView = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
      setSelectedUser(res.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNum) => {
  setCurrentPage(pageNum); 
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers); // `users` should be your user list state
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "UserList");
  
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  
    saveAs(data, "user_list.xlsx");
  };
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")); // assuming you saved it on login
  const loggedInRole = loggedInUser?.role || ""; // fallback to empty string
  
  return (
    <div class="d-flex">
      {/* Left: User Table */}
      <div style={styles.leftPane}>
        <h2>User List</h2>
       
          <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            marginBottom: '10px',
            padding: '8px',
            width: '300px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />

       
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Date of Joining</th>
                <th style={styles.th}>Details</th>
                <th style={styles.th}>Update</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map(user => (
                <tr key={user._id}>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.role}</td>
                  <td style={styles.td}>{new Date(user.dateOfJoining).toLocaleDateString('en-GB')}</td>
                  <td style={styles.td}>
                    <button className="btn btn-success" onClick={() => handleView(user._id)}>
                      View
                    </button>
                    </td>
                    <td style={styles.td}>
                    {/* Show Edit only if logged in user is Admin */}
                      {loggedInRole === 'admin' && (  
                        <Link to={`/users/update/${user._id}`} style={styles.actionLink}>Edit</Link>
                      )}
                    </td>   
                </tr>
              ))}
            </tbody>
          </table> 
        )}

        <div style={{ marginTop: '20px' }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button className="btn btn-primary mb-3"
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
              
            >
              {index + 1}
            </button>
          ))}
        <div class="text-end">
          <button className="btn btn-primary mb-3" onClick={()=>handleExport()}>
            Export to Excel
          </button>
        </div>
        </div>

       

      </div>
      

      {/* Right: User Details */}
      <div style={styles.rightPane}>
        {selectedUser ? (
          <div>
            <h2>User Details</h2>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            {/* Add more fields if available */}
          </div>
        ) : (
          <p>Select a user to view details</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    padding: '20px',
    gap: '30px',
  },
  leftPane: {
    flex: 1,
  },
  rightPane: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    minHeight: '200px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f0f0f0',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  viewBtn: {
    padding: '6px 12px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default UserList;
