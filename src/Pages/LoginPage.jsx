import React, { useState } from 'react';
import './LoginPage.css';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert('Email dan password wajib diisi!');
    }

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Login berhasil!');
        console.log(data.user); // simpan ke state/global/localStorage sesuai kebutuhan
        // navigate('/dashboard');
      } else {
        alert(data.message || 'Login gagal!');
      }
    } catch (err) {
      console.error('Error saat login:', err);
      alert('Terjadi kesalahan saat login.');
    }
  };

  return (
    <div className="login-container">
      <Navbar />

      <main className="login-main">
        <h2>Welcome to <strong>Juugo.Garage</strong></h2>
        <p>Login to explore more about us<br />Your one-stop shop for all your motorcycle service needs</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="nama@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>

        <p className="register-text">
          Belum punya akun?{' '}
          <strong onClick={handleRegisterClick} style={{ cursor: 'pointer' }}>
            Daftar
          </strong>
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
