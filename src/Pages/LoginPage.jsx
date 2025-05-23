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
    identifier: '', // Bisa berisi email atau username
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      credentials: 'include' // Untuk session/cookie jika diperlukan
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login gagal');
    }

    // Simpan data user
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('user_id', data.user.id_users);
    
    // Redirect ke halaman landing
    navigate('/Dashboard');

  } catch (err) {
    console.error('Login error:', err);
    setError(err.message || 'Terjadi kesalahan server');
  }
};

  return (
    <div className="login-container">
      <Navbar />
      
      <main className="login-main">
        <h2>Welcome to <strong>Juugo.Garage</strong></h2>
        <p>Login menggunakan username atau email</p>

        {error && <p className="error-message">{error}</p>}

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

        <p className="register-text">
          Belum punya akun?{' '}
          <strong onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>
            Daftar
          </strong>
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
