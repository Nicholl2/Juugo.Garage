// New code for ContactPage.jsx //
import React from 'react';
import { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import avatar from '../assets/avatar.png';
import logo from '../assets/logo1.png';
import emailIcon from '../assets/email.png';
import addressIcon from '../assets/address.png';
import phoneIcon from '../assets/phone.png';
import './ContactPage.css';

const ContactPage = () => {
  useEffect(() => {
    document.title = 'Contact | Juugo Garage';
  }, []);
  return (
    <div className="contact-page">
      <Navbar />

      {/* Bagian Atas */}
      <div className="contact-header">
        <img src={logo} alt="Logo" className="company-logo" />
        <div className="company-info">
          <h3>Juugo Garage</h3>
          <span className="company-type">Motorcycle Workshop</span>
          <p>Your trusted partner for all motorcycle repair and maintenance needs</p>
        </div>
      </div>

      {/* Informasi Kontak */}
      <main className="contact-main">
        <h2>Contact Information</h2>
        <div className="personal-info">
          <img src={avatar} alt="Avatar" className="contact-avatar" />
          <h3 className="contact-name">Lek Sulis Vespa</h3>
          <p className="contact-role">Owner & Founder</p>
        </div>
        <div className="contact-icons">
          <div className="icon-wrapper">
            <div className="icon-circle">
              <img src={emailIcon} alt="Email" />
            </div>
            <p><strong>Email</strong><br />info@juugogarage.com</p>
          </div>
          <div className="icon-wrapper">
            <div className="icon-circle">
              <img src={addressIcon} alt="Address" />
            </div>
            <p><strong>Address</strong><br />Tembalang, Perempatan ngalur sitik, kidule lek sri</p>
          </div>
          <div className="icon-wrapper">
            <div className="icon-circle">
              <img src={phoneIcon} alt="Phone" />
            </div>
            <p><strong>Phone</strong><br />+628123456789</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;


// Default code for ContactPage.jsx //
// import React from 'react';
// import Navbar from '../components/Navbar/Navbar';
// import Footer from '../components/Footer/Footer';
// import avatar from '../assets/avatar.png';
// import './ContactPage.css';

// const ContactPage = () => {
//   return (
//     <div className="contact-page">
//       <Navbar />
//       <main className="contact-main">
//         <img src={avatar} alt="Avatar" className="contact-avatar" />
//         <div className="contact-details">
//           <p><strong>WhatsApp:</strong> 085702286413</p>
//           <p><strong>Email:</strong> juugogarage@gmail.com</p>
//           <p><strong>Facebook:</strong> juugo.garage</p>
//           <p><strong>Instagram:</strong> @juugo.garage</p>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default ContactPage;
