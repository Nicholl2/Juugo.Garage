import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar'; 
import './Settings.css';
import avatar from '../assets/sigma.jpg';

const Settings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = 'Settings | Juugo.Garage';
  }, []);

  const handleUpdate = () => {
    alert('Profile updated successfully!');
  };

  const handleDelete = () => {
    const confirm = window.confirm('Are you sure you want to delete your account?');
    if (confirm) {
      alert('Account deleted!');
    }
  };

  return (
    <>
      <Navbar />
      <div className="settings-container">
        <div className="settings-header">
          <div className="settings-avatar">
            <img src= {avatar} alt="User avatar" />
            <h2>Tukiyem</h2>
            <span className="badge">Customer</span>
            <p>Update your profile information</p>
            <div className="settings-header-buttons">
              <button className="btn-outline">Cancel</button>
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>
        </div>

        <div className="settings-form">
          <h2>Edit Profile</h2>
          <p>Update your profile information</p>

          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <small>Password must be at least 8 characters</small>

          <button className="btn-primary" onClick={handleUpdate}>
            Update Profile
          </button>

          <div className="delete-section">
            <p>Delete Account</p>
            <button className="btn-danger" onClick={handleDelete}>
              Yes, I want to delete my account
            </button>
          </div>
        </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '1rem' }}>
        <p>© 2025 Juugo.Garage. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Settings;
