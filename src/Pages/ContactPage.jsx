import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import avatar from '../assets/avatar.png';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <Navbar />
      <main className="contact-main">
        <img src={avatar} alt="Avatar" className="contact-avatar" />
        <div className="contact-details">
          <p><strong>WhatsApp:</strong> 085702286413</p>
          <p><strong>Email:</strong> juugogarage@gmail.com</p>
          <p><strong>Facebook:</strong> juugo.garage</p>
          <p><strong>Instagram:</strong> @juugo.garage</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
