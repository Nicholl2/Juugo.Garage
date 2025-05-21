import React, { useState } from 'react';
import { useEffect } from 'react';
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
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Login berhasil!');
        navigate('/landing'); // Ganti dengan rute yang sesuai
      } else {
        alert(result.message || 'Login gagal.');
      }
    } catch (error) {
      console.error('Error saat login:', error);
      alert('Terjadi kesalahan.');
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
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="nama@mail.com"
            value={formData.email}
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
          Belum punya akun? <strong onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>Daftar</strong>
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;





// import React from 'react';
// import './LoginPage.css';
// import Footer from '../components/Footer/Footer';
// import Navbar from '../components/Navbar/Navbar';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const navigate = useNavigate();

//   const handleRegisterClick = () => {
//     navigate('/register');
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
    
//     const loginSuccess = true; 

//     if (loginSuccess) {
//       navigate('/landing'); 
//     } else {
//       alert("Login gagal. Coba lagi.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <Navbar />

//       <main className="login-main">
//         <h2>Welcome to <strong>Juugo.Garage</strong></h2>
//         <p>Login to explore more about us<br />Your one-stop shop for all your motorcycle service needs</p>

//         <form className="login-form" onSubmit={handleLogin}>
//           <input type="text" placeholder="Username" required />
//           <input type="email" placeholder="nama@mail.com" required />
//           <input type="password" placeholder="Password" required />
//           <button type="submit">Login</button>
//         </form>

//         <p className="register-text">
//           Belum punya akun? <strong onClick={handleRegisterClick} style={{ cursor: 'pointer' }}>Daftar</strong>
//         </p>
//       </main>

//       <Footer>
//         <p>© 2025 Juugo-Garage. All rights reserved.</p>
//         <p>Contact: info@juugo-garage.com</p>
//       </Footer>
//     </div>
//   );
// };

// export default LoginPage;






// import React from 'react';
// import './LoginPage.css';
// import Footer from '../components/Footer/Footer';
// import Navbar from '../components/Navbar/Navbar';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const navigate = useNavigate();

//   const handleRegisterClick = () => {
//     navigate('/register');
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
    
//     const loginSuccess = true; 

//     if (loginSuccess) {
//       navigate('/landing'); 
//     } else {
//       alert("Login gagal. Coba lagi.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <Navbar />

//       <main className="login-main">
//         <h2>Welcome to <strong>Juugo.Garage</strong></h2>
//         <p>Login to explore more about us<br />Your one-stop shop for all your motorcycle service needs</p>

//         <form className="login-form" onSubmit={handleLogin}>
//           <input type="text" placeholder="Username" required />
//           <input type="email" placeholder="nama@mail.com" required />
//           <input type="password" placeholder="Password" required />
//           <button type="submit">Login</button>
//         </form>

//         <p className="register-text">
//           Belum punya akun? <strong onClick={handleRegisterClick} style={{ cursor: 'pointer' }}>Daftar</strong>
//         </p>
//       </main>

//       <Footer>
//         <p>© 2025 Juugo-Garage. All rights reserved.</p>
//         <p>Contact: info@juugo-garage.com</p>
//       </Footer>
//     </div>
//   );
// };

// export default LoginPage;
