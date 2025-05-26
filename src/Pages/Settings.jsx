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
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This cannot be undone!');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Jika menggunakan JWT
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      alert('Account deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Delete error:', error);
      setError(error.message || 'Something went wrong');
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
          <button className="btn-danger" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar/Navbar'; 
// import './Settings.css';
// import avatar from '../assets/sigma.jpg';

// const Settings = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     document.title = 'Settings | Juugo.Garage';

//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     const userData = localStorage.getItem('user');

//     if (isLoggedIn !== 'true' || !userData) {
//       navigate('/login');
//       return;
//     }

//     const user = JSON.parse(userData);
//     setName(user.username || '');
//     setEmail(user.email || '');
//     setUserId(user.id_users);
//   }, [navigate]);

//   const handleUpdate = async () => {
//     if (!name || !email || !password) {
//       alert('All fields are required!');
//       return;
//     }

//     if (password.length < 8) {
//       alert('Password must be at least 8 characters');
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username: name, email, password }),
//       });

//       if (response.ok) {
//         const updatedUser = await response.json();
//         localStorage.setItem('user', JSON.stringify(updatedUser));
//         alert('Profile updated successfully!');
//       } else {
//         alert('Failed to update profile');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert('Something went wrong!');
//     }
//   };

//   const handleDelete = async () => {
//     const confirmDelete = window.confirm('Are you sure you want to delete your account?');
//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         localStorage.removeItem('isLoggedIn');
//         localStorage.removeItem('user');
//         alert('Account deleted!');
//         navigate('/');
//       } else {
//         alert('Failed to delete account');
//       }
//     } catch (error) {
//       console.error('Error deleting account:', error);
//       alert('Something went wrong!');
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="settings-container">
//         <div className="settings-header">
//           <div className="settings-avatar">
//             <img src={avatar} alt="User avatar" />
//             <h2>{name || 'User'}</h2>
//             <span className="badge">Customer</span>
//             <p>Update your profile information</p>
//             <div className="settings-header-buttons">
//               <button className="btn-outline" onClick={() => navigate('/')}>Cancel</button>
//               <button className="btn-primary" onClick={handleUpdate}>Save Changes</button>
//             </div>
//           </div>
//         </div>

//         <div className="settings-form">
//           <h2>Edit Profile</h2>
//           <p>Update your profile information</p>

//           <label>Username</label>
//           <input
//             type="text"
//             placeholder="Enter your username"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <label>Email</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="Enter your new password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <small>Password must be at least 8 characters</small>

//           <button className="btn-primary" onClick={handleUpdate}>
//             Update Profile
//           </button>

//           <div className="delete-section">
//             <p>Delete Account</p>
//             <button className="btn-danger" onClick={handleDelete}>
//               Yes, I want to delete my account
//             </button>
//           </div>
//         </div>
//       </div>

//       <footer style={{ textAlign: 'center', padding: '1rem' }}>
//         <p>© 2025 Juugo.Garage. All rights reserved.</p>
//       </footer>
//     </>
//   );
// };

// export default Settings;
