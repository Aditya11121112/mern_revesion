import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this is imported for navigation
import axios from 'axios';
import './users.css'; // Ensure you have CSS for the table styling

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Use navigate to redirect when necessary

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/api/v1/logout', {}, { withCredentials: true });
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/users', { withCredentials: true });
        console.log('Response received1:', response); // Debugging: Check the response data
        setUsers(response.data.resp);
      
      } catch (error) {
        console.error('Error fetching users:', error);

        // Log detailed error information
        if (error.response) {
          console.log('Error Status:', error.response.status);
          console.log('Error Data:', error.response.data);
          console.log('Error Headers:', error.response.headers);

          // Check for specific status codes to redirect appropriately
          if (error.response.status === 401) {
            alert('Authentication error. Please log in again.');
            navigate('/login');
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.log('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error setting up request:', error.message);
        }
      }
    };

    fetchUsers();
  }, [navigate]);

  return (
    <div className="users-table">
      <h2>Users List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleLogout}>Logout</button>
    </div>
    
  );
 
}

export default Users;
