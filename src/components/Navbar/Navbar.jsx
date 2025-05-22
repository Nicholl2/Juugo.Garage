import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dropdownRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Cek status login saat komponen mount
  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('user');
    if (status === 'true' && userData) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle klik di luar dropdown
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
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate('/');
  };

  const handleSettings = () => {
    navigate('/settings');
    setShowDropdown(false);
  };

  const handleHistory = () => {
    navigate('/history'); // Navigasi ke HistoryPage
    setShowDropdown(false);
  };

  const handleHomeClick = () => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    navigate(loggedIn ? '/dashboard' : '/');
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={handleLogoClick} ref={dropdownRef}>
        <img src={logo} alt="Juugo" />
        <h2>JUUGO</h2>
        {showDropdown && (
          <div className="dropdown-menu">
            {isLoggedIn ? (
              <>
                <p>👋 Halo, {JSON.parse(localStorage.getItem('user'))?.username || 'User'}!</p>
                <button onClick={handleHistory}>📜 History</button>
                <button onClick={handleLogout}>🔓 Logout</button>
              </>
            ) : (
              <button onClick={handleLogin}>👤 Login</button>
            )}
            <button onClick={handleSettings}>⚙️ Settings</button>
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
//   const [showHistory, setShowHistory] = useState(false); // State untuk history
//   const [historyData, setHistoryData] = useState([]); // Data riwayat
//   const navigate = useNavigate();

//   // Cek status login saat komponen mount
//   useEffect(() => {
//     const status = localStorage.getItem('isLoggedIn');
//     if (status === 'true') setIsLoggedIn(true);
//   }, []);

//   // Handle klik di luar dropdown
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

//   // Fetch history data
//   const fetchHistory = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/history');
//       const data = await response.json();
//       setHistoryData(data);
//     } catch (error) {
//       console.error('Error fetching history:', error);
//     }
//   };

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

//   const handleHomeClick = () => {
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//   navigate(isLoggedIn ? '/dashboard' : '/');
//   };

//   // Toggle history modal
//   const toggleHistory = () => {
//     if (!showHistory) {
//       fetchHistory();
//     }
//     setShowHistory(!showHistory);
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
//               <>
//                 <p>👋 Halo, {JSON.parse(localStorage.getItem('user'))?.username || 'User'}!</p>
//                 <button onClick={toggleHistory}>📜 History</button>
//                 <button onClick={handleLogout}>🔓 Logout</button>
//               </>
//             ) : (
//               <button onClick={handleLogin}>👤 Login</button>
//             )}
//             <button onClick={handleSettings}>⚙️ Settings</button>
//           </div>
//         )}
//       </div>

//       {/* History Modal */}
//       {showHistory && (
//         <div className="history-modal" onClick={() => setShowHistory(true)}>
//           <div className="history-content" onClick={(e) => e.stopPropagation()}>
//             <button className="close-btn" onClick={() => setShowHistory(false)}>
//               ✕
//             </button>
//             <h3>Service History</h3>
//             <div className="history-list">
//               {historyData.length > 0 ? (
//                 historyData.map((item, index) => (
//                   <div key={index} className="history-item">
//                     <p><strong>{item.service}</strong></p>
//                     <p>{item.date} • Rp {item.price}</p>
//                     <p>Status: {item.status}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p>No history available</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <ul className="nav-links">
//         <li>
//           <span onClick={handleHomeClick} style={{ cursor: 'pointer' }}>Home</span>
//         </li>
//         <li><Link to="/products">Products</Link></li>
//         <li><Link to="/services">Services</Link></li>
//         <li><Link to="/contact">Contact</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
// // import React, { useState, useEffect } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import './Navbar.css';
// // import logo from '../../assets/logo.png';

// // const Navbar = () => {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [user, setUser] = useState(null);
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const status = localStorage.getItem('isLoggedIn');
    
// //     const userData = localStorage.getItem('user');
// //     if (status === 'true' && userData) {
// //       setIsLoggedIn(true);
// //       setUser(JSON.parse(userData));
// //     }
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.removeItem('isLoggedIn');
// //     localStorage.removeItem('user');
// //     setIsLoggedIn(false);
// //     setUser(null);
// //     setShowDropdown(false);
// //     navigate('/');
// //   };

// //   const handleHomeClick = () => {
// //     // Jika sudah login, arahkan ke dashboard
// //     // Jika belum login, arahkan ke landing page
// //     if (isLoggedIn) {
// //       navigate('/dashboard');
// //     } else {
// //       navigate('/');
// //     }
// //   };

// //   return (
// //     <nav className="navbar">
// //       <div className="logo" onClick={() => setShowDropdown(!showDropdown)}>
// //         <img src={logo} alt="Juugo" />
// //         <h2>JUUGO</h2>
// //         {showDropdown && (
// //           <div className="dropdown-menu">
// //             {isLoggedIn ? (
// //               <>
// //                 <p>👋 Halo, {user?.username || 'User'}!</p>
// //                 <button onClick={handleLogout}>🔓 Logout</button>
// //               </>
// //             ) : (
// //               <button onClick={() => navigate('/login')}>👤 Login</button>
// //             )}
// //             <button onClick={() => navigate('/settings')}>⚙️ Settings</button>
// //           </div>
// //         )}
// //       </div>
// //       <ul className="nav-links">
// //         <li>
// //           <span onClick={handleHomeClick} style={{ cursor: 'pointer' }}>Home</span>
// //         </li>
// //         <li><Link to="/products">Products</Link></li>
// //         <li><Link to="/services">Services</Link></li>
// //         <li><Link to="/contact">Contact</Link></li>
// //       </ul>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// // import React, { useState, useEffect, useRef } from 'react';
// // import './Navbar.css';
// // import logo from '../../assets/logo.png';
// // import { Link, useNavigate } from 'react-router-dom';

// // const Navbar = () => {
// //   const dropdownRef = useRef();
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const status = localStorage.getItem('isLoggedIn');
// //     if (status === 'true') setIsLoggedIn(true);
// //   }, []);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setShowDropdown(false);
// //       }
// //     };

// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => {
// //       document.removeEventListener('mousedown', handleClickOutside);
// //     };
// //   }, []);

// //   const handleLogoClick = () => {
// //     setShowDropdown(!showDropdown);
// //   };

// //   const handleLogin = () => {
// //     navigate('/login');
// //     setShowDropdown(false);
// //   };

// //   const handleLogout = () => {
// //     localStorage.setItem('isLoggedIn', 'false');
// //     setIsLoggedIn(false);
// //     setShowDropdown(false);
// //     navigate('/');
// //   };

// //   const handleSettings = () => {
// //     navigate('/settings');
// //     setShowDropdown(false);
// //   };

// //   return (
// //     <nav className="navbar">
// //       <div className="logo" onClick={handleLogoClick} ref={dropdownRef}>
// //         <img src={logo} alt="Juugo" />
// //         <h2>JUUGO</h2>
// //         {showDropdown && (
// //           <div className="dropdown-menu">
// //             {isLoggedIn ? (
// //               <button onClick={handleLogout}>🔓 Logout</button>
// //             ) : (
// //               <button onClick={handleLogin}>👤 Login</button>
// //             )}
// //             <button onClick={handleSettings}>⚙️ Settings</button>
// //           </div>
// //         )}
// //       </div>

// //       <ul className="nav-links">
// //         <li><Link to="/">Home</Link></li>
// //         <li><Link to="/products">Products</Link></li>
// //         <li><Link to="/services">Services</Link></li>
// //         <li><Link to="/contact">Contact</Link></li>
// //       </ul>
// //     </nav>
// //   );
// // };

// // export default Navbar;
