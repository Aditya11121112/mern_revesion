// App.jsx
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/login/login.jsx';
import RegistrationForm from './components/register/register.jsx';
import Dashboard from './components/dashboard/dashboard.jsx';
import Users from './components/users/users.jsx'; // Ensure this import path is correct
import './App.css';
import Profile from './components/profile/profile.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App; // Ensure this line exports the App component as default
