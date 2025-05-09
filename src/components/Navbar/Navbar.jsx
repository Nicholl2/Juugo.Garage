import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dropdownRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn');
    if (status === 'true') setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogoClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogin = () => {
    navigate('/login');
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate('/');
  };

  const handleSettings = () => {
    navigate('/settings');
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={handleLogoClick} ref={dropdownRef}>
        <img src={logo} alt="Juugo" />
        <h2>JUUGO</h2>
        {showDropdown && (
          <div className="dropdown-menu">
            {isLoggedIn ? (
              <button onClick={handleLogout}>🔓 Logout</button>
            ) : (
              <button onClick={handleLogin}>👤 Login</button>
            )}
            <button onClick={handleSettings}>⚙️ Settings</button>
          </div>
        )}
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
