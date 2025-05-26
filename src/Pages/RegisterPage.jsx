import React, { useState } from 'react';
import { useEffect } from 'react';
import './RegisterPage.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  useEffect(() => {
    document.title = 'Register | Juugo.Garage';
  }, []);
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Reset error saat user mulai mengetik
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!formData.username || !formData.email || !formData.password) {
      setError('Semua field wajib diisi!');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Gagal registrasi');
      }

      alert('Registrasi berhasil!');
      navigate('/login');
    } catch (error) {
      console.error('Error saat register:', error);
      setError(error.message || 'Terjadi kesalahan saat registrasi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Navbar />
      <main className="register-main">
        <h2>Register</h2>
        <p>Enter your credentials to access your account</p>

        {error && (
          <div className="register-error">
            {error}
          </div>
        )}

        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Register'}
          </button>
        </form>

        <p className="login-redirect">
          Sudah punya akun?{' '}
          <strong
            onClick={() => navigate('/login')}
            style={{ cursor: 'pointer' }}
          >
            Login
          </strong>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;