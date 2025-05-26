import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar'; 
import './Settings.css';
import avatar from '../assets/sigma.jpg';

const Settings = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    document.title = 'Settings | Juugo.Garage';

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('user');

    if (isLoggedIn !== 'true' || !userData) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(userData);
    setFormData({
      username: user.username || '',
      email: user.email || '',
      password: '',
      confirmPassword: ''
    });
    setUserId(user.id_users);

    console.log('👤 User ID setelah setUserId:', user.id_users);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.email) {
      setError('Username and email are required');
      return false;
    }

    if (formData.password && formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    setError('');
    return true;
  };

  const handleUpdate = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    setError('Password dan konfirmasi password tidak sama');
    return;
  }

  try {
    const payload = {
      username: formData.username,
      email: formData.email
    };

    if (formData.password && formData.password.trim() !== '') {
      payload.password = formData.password;
    }

    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Update gagal');
    }

    // Update localStorage dari data user yang dikirim backend
    localStorage.setItem('user', JSON.stringify(data.user));

    alert('Profil berhasil diperbarui!');
    setError('');
  } catch (error) {
    setError(error.message || 'Terjadi kesalahan saat mengupdate profil');
  }
};
 
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setShowDeletePopup(false);
      navigate('/');
    } catch (error) {
      console.error('Delete error:', error);
      setError(error.message || 'Something went wrong');
      setShowDeletePopup(false);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password && formData.password !== formData.confirmPassword) {
    setMessage('Password dan konfirmasi tidak cocok');
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        ...(formData.password && { password: formData.password }) // hanya kirim password jika diisi
      })
    });

    const result = await response.json();
    setMessage(result.message || 'Update berhasil');
  } catch (err) {
    console.error(err);
    setMessage('Terjadi kesalahan saat update');
  }
};


  return (
  <>
    <Navbar />

    {/* POPUP HARUS DI LUAR DARI settings-container */}
    {showDeletePopup && (
    <div className="delete-popup-overlay">
      <div className="delete-popup">
        <h3>Delete Account?</h3>
        <p className="delete-warning">⚠️ Akun akan dihapus <strong>PERMANEN</strong> dan tidak dapat dikembalikan!</p>
        <div className="popup-buttons">
          <button 
            className="btn-secondary" 
            onClick={() => setShowDeletePopup(false)}
          >
            Decline
          </button>
          <button 
            className="btn-danger" 
            onClick={handleDelete}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )}

    <div className="settings-container">
      {error && <div className="error-banner">{error}</div>}

      <div className="settings-header">
        <div className="settings-avatar">
          <img src={avatar} alt="User avatar" />
          <h2>{formData.username || 'User'}</h2>
          <span className="badge">Customer</span>
        </div>
      </div>

      <form className="settings-form" onSubmit={handleUpdate}>
        <h2>Edit Profile</h2>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password (leave blank to keep current)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Save Changes
          </button>
        </div>
      </form>

      <div className="danger-zone">
        <h3>Danger Zone</h3>
        <p>Permanently delete your account and all data</p>
        <button className="btn-danger" onClick={() => setShowDeletePopup(true)}>
          Delete Account
        </button>
      </div>
    </div>
  </>
);
};

export default Settings;

