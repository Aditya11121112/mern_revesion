import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [getuser, setgetUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Make a request to the protected route to get user info
        const response = await axios.get('http://localhost:4000/api/v1/dashboard', { withCredentials: true });
        setUser(response.data.resp); // Set user info to state
      } catch (error) {
        if (error.response?.status === 401) {
          alert('Token is not provided. Please log in again.');
        } else {
          alert('An error occurred. Please try again.');
        }
        navigate('/login'); // Redirect to login page
      }
    };

    checkAuthentication();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/api/v1/logout', {}, { withCredentials: true });
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleGetProfile = async () => {
    
    navigate('/profile');
  };

  const handleGetUsers = async() => {
    
   
    navigate('/users');
  };

  return (
    <div className="common-buttons">
      {user?.role === 'admin' ? (
        <>
          
          <button onClick={handleGetUsers}>Get Users</button>
        </>
      ) : (
        <button onClick={handleGetProfile}>Get Profile</button>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
