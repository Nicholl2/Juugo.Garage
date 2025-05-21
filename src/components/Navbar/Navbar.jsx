import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('user');
    if (status === 'true' && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setShowDropdown(false);
    navigate('/');
  };

  const handleHomeClick = () => {
    // Jika sudah login, arahkan ke dashboard
    // Jika belum login, arahkan ke landing page
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setShowDropdown(!showDropdown)}>
        <img src={logo} alt="Juugo" />
        <h2>JUUGO</h2>
        {showDropdown && (
          <div className="dropdown-menu">
            {isLoggedIn ? (
              <>
                <p>👋 Halo, {user?.username || 'User'}!</p>
                <button onClick={handleLogout}>🔓 Logout</button>
              </>
            ) : (
              <button onClick={() => navigate('/login')}>👤 Login</button>
            )}
            <button onClick={() => navigate('/settings')}>⚙️ Settings</button>
          </div>
        )}
      </div>
      <ul className="nav-links">
        <li>
          <span onClick={handleHomeClick} style={{ cursor: 'pointer' }}>Home</span>
        </li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

// import React, { useState, useEffect, useRef } from 'react';
// import './Navbar.css';
// import logo from '../../assets/logo.png';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const dropdownRef = useRef();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const status = localStorage.getItem('isLoggedIn');
//     if (status === 'true') setIsLoggedIn(true);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleLogoClick = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleLogin = () => {
//     navigate('/login');
//     setShowDropdown(false);
//   };

//   const handleLogout = () => {
//     localStorage.setItem('isLoggedIn', 'false');
//     setIsLoggedIn(false);
//     setShowDropdown(false);
//     navigate('/');
//   };

//   const handleSettings = () => {
//     navigate('/settings');
//     setShowDropdown(false);
//   };

//   return (
//     <nav className="navbar">
//       <div className="logo" onClick={handleLogoClick} ref={dropdownRef}>
//         <img src={logo} alt="Juugo" />
//         <h2>JUUGO</h2>
//         {showDropdown && (
//           <div className="dropdown-menu">
//             {isLoggedIn ? (
//               <button onClick={handleLogout}>🔓 Logout</button>
//             ) : (
//               <button onClick={handleLogin}>👤 Login</button>
//             )}
//             <button onClick={handleSettings}>⚙️ Settings</button>
//           </div>
//         )}
//       </div>

//       <ul className="nav-links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/products">Products</Link></li>
//         <li><Link to="/services">Services</Link></li>
//         <li><Link to="/contact">Contact</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
