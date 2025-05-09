import React from 'react';
import './LoginPage.css';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    const loginSuccess = true; 

    if (loginSuccess) {
      navigate('/landing'); 
    } else {
      alert("Login gagal. Coba lagi.");
    }
  };

  return (
    <div className="login-container">
      <Navbar />

      <main className="login-main">
        <h2>Welcome to <strong>Juugo.Garage</strong></h2>
        <p>Login to explore more about us<br />Your one-stop shop for all your motorcycle service needs</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="nama@mail.com" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>

        <p className="register-text">
          Belum punya akun? <strong onClick={handleRegisterClick} style={{ cursor: 'pointer' }}>Daftar</strong>
        </p>
      </main>

      <Footer>
        <p>© 2025 Juugo-Garage. All rights reserved.</p>
        <p>Contact: info@juugo-garage.com</p>
      </Footer>
    </div>
  );
};

export default LoginPage;
