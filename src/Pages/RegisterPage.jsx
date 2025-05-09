import React, { useState } from 'react';
import './RegisterPage.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Mengirim data:', formData); 
  
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const result = await response.json();
      console.log('Respon dari server:', result); 
  
      if (response.ok) {
        alert('Registrasi berhasil!');
        navigate('/login');
      } else {
        alert('Gagal registrasi. Coba lagi.');
      }
    } catch (error) {
      console.error('Error saat register:', error);
      alert('Terjadi kesalahan.');
    }
  };
  

  return (
    <div className="register-container">
      <Navbar />
      <main className="register-main">
        <h2>Register</h2>
        <p>Enter your credentials to access your account</p>

        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
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
