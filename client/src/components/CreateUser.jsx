import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = { name, email, role, dateOfJoining };

    try {
      await axios.post('http://localhost:5000/api/users', newUser);
      navigate('/'); // Redirect to the homepage after successful creation
      console.log("Submitting:", newUser);
    } catch (err) {
      setError('Error creating user');
    }
  };

  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = async (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
  
      const users = XLSX.utils.sheet_to_json(sheet);
  
      // Loop and send POST request for each user
      for (const user of users) {
        try {
          const res = await fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
          });
  
          if (!res.ok) throw new Error('Failed to upload user');
        } catch (err) {
          console.error(`Error uploading user ${user.name}:`, err.message);
        }
      }
  
      alert('Excel data uploaded successfully!');
    };
  
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h2>Create New User</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select name="role" onChange={(e) => setRole(e.target.value)} required>
          <option value="">-- Select Role --</option>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
        <option value="Guest">Guest</option>
      </select>
        </div>
        <div>
        <label>Date of Joining:</label>
          <input type="date" 
             value={dateOfJoining} 
             onChange={(e) => setDateOfJoining(e.target.value)} 
             required 
          />

        </div>
        <button type="submit">Create User</button>

      </form>
      <div>        
        <label>Upload Excel:</label>
        <input type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} />
      </div>
    </div>
  );
};

export default CreateUser;
