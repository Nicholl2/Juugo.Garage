import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  useEffect(() => {
    document.title = 'Login Page | Juugo.Garage';
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetData, setResetData] = useState({
    identifier: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [resetMessage, setResetMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetChange = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: formData.identifier.trim(),
          password: formData.password
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login gagal');
      }

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('user_id', data.user.id_users);
      navigate('/Dashboard');

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Terjadi kesalahan server');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetMessage('');

    if (resetData.newPassword !== resetData.confirmPassword) {
      return setResetMessage('Password baru dan konfirmasi password tidak sama');
    }

    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: resetData.identifier.trim(),
          newPassword: resetData.newPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Gagal mengubah password');
      }

      setResetMessage('Password berhasil diubah! Silakan login dengan password baru Anda');
      setShowResetForm(false);
      setResetData({
        identifier: '',
        newPassword: '',
        confirmPassword: ''
      });

    } catch (err) {
      console.error('Reset password error:', err);
      setResetMessage(err.message || 'Terjadi kesalahan saat mengubah password');
    }
  };

  return (
    <div className="login-container">
      <Navbar />
      
      <main className="login-main">
  <h2>Welcome to <strong>Juugo.Garage</strong></h2>
  
  {!showResetForm ? (
    <>
      <p>Login menggunakan username atau email</p>

      {error && <div className="login-error">{error}</div>}

      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          name="identifier"
          placeholder="Username atau Email"
          value={formData.identifier}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Diperbarui - tanpa inline style */}
      <p className="forgot-password" onClick={() => setShowResetForm(true)}>
        Lupa password?
      </p>

      <p className="register-text">
        Belum punya akun?{' '}
        <strong onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>
          Daftar
        </strong>
      </p>
    </>
  ) : (
    <>
      <h3>Reset Password</h3>
      <p>Masukkan username atau email Anda</p>

      {resetMessage && (
        <div className={`login-error ${resetMessage.includes('berhasil') ? 'success-message' : ''}`}>
          {resetMessage}
        </div>
      )}

      <form className="login-form" onSubmit={handleResetPassword}>
        <input
          type="text"
          name="identifier"
          placeholder="Username atau Email"
          value={resetData.identifier}
          onChange={handleResetChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Password Baru"
          value={resetData.newPassword}
          onChange={handleResetChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Konfirmasi Password Baru"
          value={resetData.confirmPassword}
          onChange={handleResetChange}
          required
        />
        <button type="submit">Reset Password</button>
      </form>

      {/* Diperbarui - tanpa inline style */}
      <p className="back-to-login" onClick={() => setShowResetForm(false)}>
        Kembali ke halaman login
      </p>
    </>
  )}
</main>


      <Footer />
    </div>
  );
};

export default LoginPage;